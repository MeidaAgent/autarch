const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'liege_agents_super_secret_key_123';

app.use(cors());
app.use(express.json());

// Database initialization
let db;
async function initDB() {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      address TEXT PRIMARY KEY,
      nonce TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS agents (
      id TEXT PRIMARY KEY,
      creator_address TEXT,
      name TEXT,
      description TEXT,
      status TEXT,
      price REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      creator_address TEXT,
      agent_id TEXT,
      evaluator_id TEXT,
      title TEXT,
      brief TEXT,
      acceptance_criteria TEXT,
      budget_usdg REAL,
      deadline_at DATETIME,
      expires_at DATETIME,
      status TEXT,
      funding_amount REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS evaluators (
      address TEXT PRIMARY KEY,
      name TEXT,
      bio TEXT,
      reputation INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS ledger (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      address TEXT,
      amount REAL,
      type TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Auth Middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: { code: 401, message: 'Unauthorized' } });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: { code: 401, message: 'Invalid token' } });
  }
};

// --- API ROUTES ---

app.post('/api/v1/auth/nonce', async (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ error: { message: 'Address required' } });
  
  const nonce = crypto.randomBytes(16).toString('hex');
  const message = `Sign this message to authenticate with Autarch.\n\nNonce: ${nonce}`;
  
  await db.run('INSERT OR REPLACE INTO users (address, nonce) VALUES (?, ?)', [address, nonce]);
  
  res.json({ data: { nonce, message } });
});

app.post('/api/v1/auth/verify', async (req, res) => {
  const { address, nonce, signature } = req.body;
  
  const user = await db.get('SELECT * FROM users WHERE address = ?', [address]);
  if (!user || user.nonce !== nonce) {
    return res.status(401).json({ error: { message: 'Invalid nonce' } });
  }

  try {
    const message = `Sign this message to authenticate with Autarch.\n\nNonce: ${nonce}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: { message: 'Signature verification failed' } });
    }

    const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ data: { token, address } });
  } catch (err) {
    res.status(400).json({ error: { message: 'Invalid signature format' } });
  }
});

app.get('/api/v1/me', authenticate, async (req, res) => {
  res.json({ data: { address: req.user.address } });
});

app.get('/api/v1/me/ledger', authenticate, async (req, res) => {
  const ledger = await db.all('SELECT * FROM ledger WHERE address = ? ORDER BY created_at DESC', [req.user.address]);
  res.json({ data: ledger });
});

app.get('/api/v1/agents', async (req, res) => {
  const agents = await db.all('SELECT * FROM agents ORDER BY created_at DESC');
  res.json({ data: agents });
});

app.post('/api/v1/agents', authenticate, async (req, res) => {
  const id = crypto.randomUUID();
  const { name, description, price } = req.body;
  await db.run('INSERT INTO agents (id, creator_address, name, description, status, price) VALUES (?, ?, ?, ?, ?, ?)',
    [id, req.user.address, name, description, 'ACTIVE', price || 0]);
  res.json({ data: { id, name, status: 'ACTIVE' } });
});

app.get('/api/v1/agents/:id', async (req, res) => {
  const agent = await db.get('SELECT * FROM agents WHERE id = ?', [req.params.id]);
  if (!agent) return res.status(404).json({ error: { message: 'Agent not found' } });
  res.json({ data: agent });
});

app.get('/api/v1/jobs', authenticate, async (req, res) => {
  const jobs = await db.all('SELECT * FROM jobs WHERE creator_address = ? ORDER BY created_at DESC', [req.user.address]);
  res.json({ data: jobs });
});

app.post('/api/v1/jobs', authenticate, async (req, res) => {
  const id = crypto.randomUUID();
  const { agentId, evaluatorId, title, brief, acceptanceCriteria, budgetUsdg, deadlineAt, expiresAt } = req.body;
  await db.run('INSERT INTO jobs (id, creator_address, agent_id, evaluator_id, title, brief, acceptance_criteria, budget_usdg, deadline_at, expires_at, status, funding_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [id, req.user.address, agentId, evaluatorId, title, brief, acceptanceCriteria, budgetUsdg, deadlineAt, expiresAt, 'PENDING_FUNDING', 0]);
  res.json({ data: { id, status: 'PENDING_FUNDING' } });
});

app.get('/api/v1/jobs/:id', authenticate, async (req, res) => {
  const job = await db.get('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
  if (!job) return res.status(404).json({ error: { message: 'Job not found' } });
  res.json({ data: job });
});

app.post('/api/v1/jobs/:id/funding-quote', authenticate, async (req, res) => {
  res.json({ data: { quote: 100, currency: 'USDC' } }); // Mock quote
});

app.post('/api/v1/jobs/:id/fund', authenticate, async (req, res) => {
  await db.run('UPDATE jobs SET status = ?, funding_amount = ? WHERE id = ?', ['FUNDED', req.body.amount || 100, req.params.id]);
  await db.run('INSERT INTO ledger (address, amount, type) VALUES (?, ?, ?)', [req.user.address, -(req.body.amount || 100), 'JOB_FUNDING']);
  res.json({ data: { success: true, status: 'FUNDED' } });
});

app.post('/api/v1/jobs/:id/submit', authenticate, async (req, res) => {
  await db.run('UPDATE jobs SET status = ? WHERE id = ?', ['SUBMITTED', req.params.id]);
  res.json({ data: { success: true, status: 'SUBMITTED' } });
});

app.post('/api/v1/jobs/:id/evaluate', authenticate, async (req, res) => {
  await db.run('UPDATE jobs SET status = ? WHERE id = ?', ['EVALUATED', req.params.id]);
  res.json({ data: { success: true, status: 'EVALUATED' } });
});

app.get('/api/v1/evaluators', async (req, res) => {
  const evaluators = await db.all('SELECT * FROM evaluators ORDER BY reputation DESC');
  res.json({ data: evaluators });
});

app.get('/api/v1/evaluators/me', authenticate, async (req, res) => {
  let evaluator = await db.get('SELECT * FROM evaluators WHERE address = ?', [req.user.address]);
  if (!evaluator) {
    evaluator = { address: req.user.address, name: 'New Evaluator', bio: '', reputation: 0 };
    await db.run('INSERT INTO evaluators (address, name, bio, reputation) VALUES (?, ?, ?, ?)', [evaluator.address, evaluator.name, evaluator.bio, evaluator.reputation]);
  }
  res.json({ data: evaluator });
});

app.put('/api/v1/evaluators/me', authenticate, async (req, res) => {
  const { name, bio } = req.body;
  await db.run('UPDATE evaluators SET name = ?, bio = ? WHERE address = ?', [name, bio, req.user.address]);
  res.json({ data: { success: true } });
});

// --- STATIC FILE SERVING ---

// Serve the frontend
const frontendPath = path.join(__dirname, 'liegeagents-download', 'www.liegeagents.com');
app.use(express.static(frontendPath));

// Handle React Router SPA fallback for /app routes
app.use('/app', (req, res) => {
  res.sendFile(path.join(frontendPath, 'app', 'index.html'));
});

// Fallback for other routes (if any)
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend API and Frontend running on http://localhost:${PORT}`);
  });
}).catch(console.error);
