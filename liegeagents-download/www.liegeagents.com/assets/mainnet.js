const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/secp256k1.js",
      "assets/rolldown-runtime.js",
      "assets/utils.js",
    ]),
) => i.map((i) => d[i]);
import { t as e } from "./index.js";
import {
  $ as t,
  A as n,
  C as r,
  D as i,
  E as a,
  F as o,
  H as s,
  I as c,
  J as l,
  K as u,
  L as d,
  M as f,
  N as p,
  O as m,
  P as h,
  Q as g,
  R as _,
  S as v,
  T as y,
  U as b,
  V as x,
  W as S,
  X as C,
  Y as w,
  Z as ee,
  _ as te,
  a as ne,
  at as re,
  b as ie,
  ct as ae,
  d as oe,
  dt as se,
  et as ce,
  f as le,
  g as T,
  gt as E,
  h as ue,
  ht as de,
  i as fe,
  j as pe,
  k as me,
  lt as he,
  m as ge,
  mt as _e,
  o as ve,
  ot as ye,
  p as be,
  pt as xe,
  q as Se,
  rt as Ce,
  s as we,
  st as Te,
  tt as Ee,
  ut as De,
  v as Oe,
  w as D,
  x as ke,
  y as Ae,
  z as O,
} from "./localBatchGatewayRequest.js";
import {
  A as je,
  C as Me,
  I as Ne,
  L as Pe,
  V as Fe,
  b as Ie,
  f as Le,
  g as Re,
  h as ze,
  i as Be,
  j as Ve,
  k as He,
  l as Ue,
  m as We,
  n as Ge,
  p as Ke,
  t as k,
  v as qe,
  w as Je,
  y as A,
} from "./encodeFunctionData.js";
import {
  E as Ye,
  T as Xe,
  _ as Ze,
  a as Qe,
  b as $e,
  c as j,
  h as M,
  i as et,
  m as tt,
  n as nt,
  p as N,
  r as P,
  s as F,
  t as I,
  u as rt,
  w as L,
} from "./stringify.js";
import {
  C as it,
  _ as at,
  m as ot,
  n as st,
  r as ct,
  t as lt,
} from "./createBatchScheduler.js";
import { a as ut, c as dt, l as ft, o as pt, s as mt } from "./http.js";
import { r as ht, t as gt } from "./secp256k1.js";
import { n as _t, t as vt } from "./hashTypedData.js";
import { t as yt } from "./formatUnits.js";
function R(e, t, n) {
  let r = e[t.name];
  if (typeof r == `function`) return r;
  let i = e[n];
  return typeof i == `function` ? i : (n) => t(e, n);
}
var bt = class extends L {
    constructor(e) {
      super(`Filter type "${e}" is not supported.`, {
        name: `FilterTypeNotSupportedError`,
      });
    }
  },
  xt = `/docs/contract/encodeEventTopics`;
function St(e) {
  let { abi: t, eventName: n, args: r } = e,
    i = t[0];
  if (n) {
    let e = Ge({ abi: t, name: n });
    if (!e) throw new He(n, { docsPath: xt });
    i = e;
  }
  if (i.type !== `event`) throw new He(void 0, { docsPath: xt });
  let a = [];
  if (r && `inputs` in i) {
    let e = i.inputs?.filter((e) => `indexed` in e && e.indexed),
      t = Array.isArray(r)
        ? r
        : Object.values(r).length > 0
          ? (e?.map((e) => r[e.name]) ?? [])
          : [];
    t.length > 0 &&
      (a =
        e?.map((e, n) =>
          Array.isArray(t[n])
            ? t[n].map((r, i) => Ct({ param: e, value: t[n][i] }))
            : t[n] !== void 0 && t[n] !== null
              ? Ct({ param: e, value: t[n] })
              : null,
        ) ?? []);
  }
  if (i.anonymous) return a;
  let o = Fe(i);
  return [qe(o), ...a];
}
function Ct({ param: e, value: t }) {
  if (e.type === `string` || e.type === `bytes`) return A(Qe(t));
  if (e.type === `tuple` || e.type.match(/^(.*)\[(\d+)?\]$/))
    throw new bt(e.type);
  return Be([e], [t]);
}
function wt(e, { method: t }) {
  let n = {};
  return (
    e.transport.type === `fallback` &&
      e.transport.onResponse?.(
        ({ method: e, response: r, status: i, transport: a }) => {
          i === `success` && t === e && (n[r] = a.request);
        },
      ),
    (t) => n[t] || e.request
  );
}
async function Tt(e, t) {
  let {
      address: n,
      abi: r,
      args: i,
      eventName: a,
      fromBlock: o,
      strict: s,
      toBlock: c,
    } = t,
    l = wt(e, { method: `eth_newFilter` }),
    u = a ? St({ abi: r, args: i, eventName: a }) : void 0,
    d = await e.request({
      method: `eth_newFilter`,
      params: [
        {
          address: n,
          fromBlock: typeof o == `bigint` ? j(o) : o,
          toBlock: typeof c == `bigint` ? j(c) : c,
          topics: u,
        },
      ],
    });
  return {
    abi: r,
    args: i,
    eventName: a,
    id: d,
    request: l(d),
    strict: !!s,
    type: `event`,
  };
}
var Et = 3;
function z(
  e,
  { abi: n, address: r, args: i, docsPath: a, functionName: o, sender: s },
) {
  let c =
      e instanceof ce
        ? e
        : e instanceof L
          ? e.walk((e) => `data` in e) || e.walk()
          : {},
    { code: l, data: u, details: d, message: f, shortMessage: p } = c,
    m =
      e instanceof Je
        ? new t({ functionName: o, cause: e })
        : ([Et, dt.code].includes(l) && (u || d || f || p)) ||
            (l === ft.code && d === `execution reverted` && u)
          ? new g({
              abi: n,
              data: typeof u == `object` ? u.data : u,
              functionName: o,
              message: c instanceof at ? d : (p ?? f),
              cause: e,
            })
          : e;
  return new ee(m, {
    abi: n,
    args: i,
    contractAddress: r,
    docsPath: a,
    functionName: o,
    sender: s,
  });
}
function Dt(e) {
  let t = A(`0x${e.substring(4)}`).substring(26);
  return ze(`0x${t}`);
}
async function Ot({ hash: t, signature: n }) {
  let r = Ye(t) ? t : rt(t),
    { secp256k1: i } = await e(
      async () => {
        let { secp256k1: e } = await import(`./secp256k1.js`).then((e) => e.n);
        return { secp256k1: e };
      },
      __vite__mapDeps([0, 1, 2]),
    );
  return `0x${(() => {
    if (typeof n == `object` && `r` in n && `s` in n) {
      let { r: e, s: t, v: r, yParity: a } = n,
        o = kt(Number(a ?? r));
      return new i.Signature(N(e), N(t)).addRecoveryBit(o);
    }
    let e = Ye(n) ? n : rt(n);
    if (Xe(e) !== 65) throw Error(`invalid signature length`);
    let t = kt(M(`0x${e.slice(130)}`));
    return i.Signature.fromCompact(e.substring(2, 130)).addRecoveryBit(t);
  })()
    .recoverPublicKey(r.substring(2))
    .toHex(!1)}`;
}
function kt(e) {
  if (e === 0 || e === 1) return e;
  if (e === 27) return 0;
  if (e === 28) return 1;
  throw Error(`Invalid yParityOrV value`);
}
async function At({ hash: e, signature: t }) {
  return Dt(await Ot({ hash: e, signature: t }));
}
function jt(e, t = `hex`) {
  let n = Mt(e),
    r = _e(new Uint8Array(n.length));
  return (n.encode(r), t === `hex` ? F(r.bytes) : r.bytes);
}
function Mt(e) {
  return Array.isArray(e) ? Nt(e.map((e) => Mt(e))) : Pt(e);
}
function Nt(e) {
  let t = e.reduce((e, t) => e + t.length, 0),
    n = Ft(t);
  return {
    length: t <= 55 ? 1 + t : 1 + n + t,
    encode(r) {
      t <= 55
        ? r.pushByte(192 + t)
        : (r.pushByte(247 + n),
          n === 1
            ? r.pushUint8(t)
            : n === 2
              ? r.pushUint16(t)
              : n === 3
                ? r.pushUint24(t)
                : r.pushUint32(t));
      for (let { encode: t } of e) t(r);
    },
  };
}
function Pt(e) {
  let t = typeof e == `string` ? P(e) : e,
    n = Ft(t.length);
  return {
    length:
      t.length === 1 && t[0] < 128
        ? 1
        : t.length <= 55
          ? 1 + t.length
          : 1 + n + t.length,
    encode(e) {
      t.length === 1 && t[0] < 128
        ? e.pushBytes(t)
        : t.length <= 55
          ? (e.pushByte(128 + t.length), e.pushBytes(t))
          : (e.pushByte(183 + n),
            n === 1
              ? e.pushUint8(t.length)
              : n === 2
                ? e.pushUint16(t.length)
                : n === 3
                  ? e.pushUint24(t.length)
                  : e.pushUint32(t.length),
            e.pushBytes(t));
    },
  };
}
function Ft(e) {
  if (e < 2 ** 8) return 1;
  if (e < 2 ** 16) return 2;
  if (e < 2 ** 24) return 3;
  if (e < 2 ** 32) return 4;
  throw new L(`Length is too large.`);
}
function It(e) {
  let { chainId: t, nonce: n, to: r } = e,
    i = e.contractAddress ?? e.address,
    a = A(Ke([`0x05`, jt([t ? j(t) : `0x`, i, n ? j(n) : `0x`])]));
  return r === `bytes` ? P(a) : a;
}
async function Lt(e) {
  let { authorization: t, signature: n } = e;
  return At({ hash: It(t), signature: n ?? t });
}
var Rt = class extends L {
  constructor(
    e,
    {
      account: t,
      docsPath: n,
      chain: r,
      data: i,
      gas: a,
      gasPrice: o,
      maxFeePerGas: s,
      maxPriorityFeePerGas: c,
      nonce: l,
      to: u,
      value: d,
    },
  ) {
    let f = De({
      from: t?.address,
      to: u,
      value: d !== void 0 && `${se(d)} ${r?.nativeCurrency?.symbol || `ETH`}`,
      data: i,
      gas: a,
      gasPrice: o !== void 0 && `${it(o)} gwei`,
      maxFeePerGas: s !== void 0 && `${it(s)} gwei`,
      maxPriorityFeePerGas: c !== void 0 && `${it(c)} gwei`,
      nonce: l,
    });
    (super(e.shortMessage, {
      cause: e,
      docsPath: n,
      metaMessages: [
        ...(e.metaMessages ? [...e.metaMessages, ` `] : []),
        `Estimate Gas Arguments:`,
        f,
      ].filter(Boolean),
      name: `EstimateGasExecutionError`,
    }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.cause = e));
  }
};
function zt(e, { docsPath: t, ...n }) {
  return new Rt(
    (() => {
      let t = w(e, n);
      return t instanceof ot ? e : t;
    })(),
    { docsPath: t, ...n },
  );
}
function Bt(e, t) {
  return ({ exclude: n, format: r }) => ({
    exclude: n,
    format: (e, i) => {
      let a = t(e, i);
      if (n) for (let e of n) delete a[e];
      return { ...a, ...r(e, i) };
    },
    type: e,
  });
}
var Vt = class extends L {
    constructor() {
      super("`baseFeeMultiplier` must be greater than 1.", {
        name: `BaseFeeScalarError`,
      });
    }
  },
  Ht = class extends L {
    constructor() {
      super(`Chain does not support EIP-1559 fees.`, {
        name: `Eip1559FeesNotSupportedError`,
      });
    }
  },
  Ut = class extends L {
    constructor({ maxPriorityFeePerGas: e }) {
      super(
        `\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${it(e)} gwei).`,
        { name: `MaxFeePerGasTooLowError` },
      );
    }
  },
  Wt = class extends L {
    constructor({ blockHash: e, blockNumber: t }) {
      let n = `Block`;
      (e && (n = `Block at hash "${e}"`),
        t && (n = `Block at number "${t}"`),
        super(`${n} could not be found.`, { name: `BlockNotFoundError` }));
    }
  },
  Gt = {
    "0x0": `legacy`,
    "0x1": `eip2930`,
    "0x2": `eip1559`,
    "0x3": `eip4844`,
    "0x4": `eip7702`,
  };
function Kt(e, t) {
  let n = {
    ...e,
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    ...(e.blockTimestamp != null && {
      blockTimestamp: BigInt(e.blockTimestamp),
    }),
    chainId: e.chainId ? M(e.chainId) : void 0,
    gas: e.gas ? BigInt(e.gas) : void 0,
    gasPrice: e.gasPrice ? BigInt(e.gasPrice) : void 0,
    maxFeePerBlobGas: e.maxFeePerBlobGas ? BigInt(e.maxFeePerBlobGas) : void 0,
    maxFeePerGas: e.maxFeePerGas ? BigInt(e.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: e.maxPriorityFeePerGas
      ? BigInt(e.maxPriorityFeePerGas)
      : void 0,
    nonce: e.nonce ? M(e.nonce) : void 0,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    type: e.type ? Gt[e.type] : void 0,
    typeHex: e.type ? e.type : void 0,
    value: e.value ? BigInt(e.value) : void 0,
    v: e.v ? BigInt(e.v) : void 0,
  };
  return (
    e.authorizationList && (n.authorizationList = Jt(e.authorizationList)),
    (n.yParity = (() => {
      if (e.yParity) return Number(e.yParity);
      if (typeof n.v == `bigint`) {
        if (n.v === 0n || n.v === 27n) return 0;
        if (n.v === 1n || n.v === 28n) return 1;
        if (n.v >= 35n) return +(n.v % 2n == 0n);
      }
    })()),
    n.type === `legacy` &&
      (delete n.accessList,
      delete n.maxFeePerBlobGas,
      delete n.maxFeePerGas,
      delete n.maxPriorityFeePerGas,
      delete n.yParity),
    n.type === `eip2930` &&
      (delete n.maxFeePerBlobGas,
      delete n.maxFeePerGas,
      delete n.maxPriorityFeePerGas),
    n.type === `eip1559` && delete n.maxFeePerBlobGas,
    n
  );
}
var qt = Bt(`transaction`, Kt);
function Jt(e) {
  return e.map((e) => ({
    address: e.address,
    chainId: Number(e.chainId),
    nonce: Number(e.nonce),
    r: e.r,
    s: e.s,
    yParity: Number(e.yParity),
  }));
}
function Yt(e, t) {
  let n = (e.transactions ?? []).map((e) => (typeof e == `string` ? e : Kt(e)));
  return {
    ...e,
    baseFeePerGas: e.baseFeePerGas ? BigInt(e.baseFeePerGas) : null,
    blobGasUsed: e.blobGasUsed ? BigInt(e.blobGasUsed) : void 0,
    difficulty: e.difficulty ? BigInt(e.difficulty) : void 0,
    excessBlobGas: e.excessBlobGas ? BigInt(e.excessBlobGas) : void 0,
    gasLimit: e.gasLimit ? BigInt(e.gasLimit) : void 0,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : void 0,
    hash: e.hash ? e.hash : null,
    logsBloom: e.logsBloom ? e.logsBloom : null,
    nonce: e.nonce ? e.nonce : null,
    number: e.number ? BigInt(e.number) : null,
    size: e.size ? BigInt(e.size) : void 0,
    timestamp: e.timestamp ? BigInt(e.timestamp) : void 0,
    transactions: n,
    totalDifficulty: e.totalDifficulty ? BigInt(e.totalDifficulty) : null,
  };
}
var Xt = Bt(`block`, Yt);
async function B(
  e,
  {
    blockHash: t,
    blockNumber: n,
    blockTag: r = e.experimental_blockTag ?? `latest`,
    includeTransactions: i,
  } = {},
) {
  let a = i ?? !1,
    o = n === void 0 ? void 0 : j(n),
    s = null;
  if (
    ((s = t
      ? await e.request(
          { method: `eth_getBlockByHash`, params: [t, a] },
          { dedupe: !0 },
        )
      : await e.request(
          { method: `eth_getBlockByNumber`, params: [o || r, a] },
          { dedupe: !!o },
        )),
    !s)
  )
    throw new Wt({ blockHash: t, blockNumber: n });
  return (e.chain?.formatters?.block?.format || Yt)(s, `getBlock`);
}
async function Zt(e) {
  let t = await e.request({ method: `eth_gasPrice` });
  return BigInt(t);
}
async function Qt(e, t) {
  return $t(e, t);
}
async function $t(e, t) {
  let { block: n, chain: r = e.chain, request: i } = t || {};
  try {
    let t = r?.fees?.maxPriorityFeePerGas ?? r?.fees?.defaultPriorityFee;
    if (typeof t == `function`) {
      let r = await t({
        block: n || (await R(e, B, `getBlock`)({})),
        client: e,
        request: i,
      });
      if (r === null) throw Error();
      return r;
    }
    if (t !== void 0) return t;
    let a = await e.request({ method: `eth_maxPriorityFeePerGas` });
    return N(a);
  } catch {
    let [t, r] = await Promise.all([
      n ? Promise.resolve(n) : R(e, B, `getBlock`)({}),
      R(e, Zt, `getGasPrice`)({}),
    ]);
    if (typeof t.baseFeePerGas != `bigint`) throw new Ht();
    let i = r - t.baseFeePerGas;
    return i < 0n ? 0n : i;
  }
}
async function en(e, t) {
  return tn(e, t);
}
async function tn(e, t) {
  let {
      block: n,
      chain: r = e.chain,
      request: i,
      type: a = `eip1559`,
    } = t || {},
    o = await (async () =>
      typeof r?.fees?.baseFeeMultiplier == `function`
        ? r.fees.baseFeeMultiplier({ block: n, client: e, request: i })
        : (r?.fees?.baseFeeMultiplier ?? 1.2))();
  if (o < 1) throw new Vt();
  let s = 10 ** (o.toString().split(`.`)[1]?.length ?? 0),
    c = (e) => (e * BigInt(Math.round(o * s))) / BigInt(s),
    l = n || (await R(e, B, `getBlock`)({}));
  if (typeof r?.fees?.estimateFeesPerGas == `function`) {
    let t = await r.fees.estimateFeesPerGas({
      block: n,
      client: e,
      multiply: c,
      request: i,
      type: a,
    });
    if (t !== null) return t;
  }
  if (a === `eip1559`) {
    if (typeof l.baseFeePerGas != `bigint`) throw new Ht();
    let t =
        typeof i?.maxPriorityFeePerGas == `bigint`
          ? i.maxPriorityFeePerGas
          : await $t(e, { block: l, chain: r, request: i }),
      n = c(l.baseFeePerGas);
    return { maxFeePerGas: i?.maxFeePerGas ?? n + t, maxPriorityFeePerGas: t };
  }
  return { gasPrice: i?.gasPrice ?? c(await R(e, Zt, `getGasPrice`)({})) };
}
async function nn(
  e,
  {
    address: t,
    blockHash: n,
    blockNumber: r,
    blockTag: i = `latest`,
    requireCanonical: a,
  },
) {
  let o = b({ blockHash: n, blockNumber: r, blockTag: i, requireCanonical: a }),
    s = await e.request(
      { method: `eth_getTransactionCount`, params: [t, o] },
      { dedupe: typeof r == `bigint` || n !== void 0 },
    );
  return M(s);
}
function rn(e) {
  let { kzg: t } = e,
    n = e.to ?? (typeof e.blobs[0] == `string` ? `hex` : `bytes`),
    r = typeof e.blobs[0] == `string` ? e.blobs.map((e) => P(e)) : e.blobs,
    i = [];
  for (let e of r) i.push(Uint8Array.from(t.blobToKzgCommitment(e)));
  return n === `bytes` ? i : i.map((e) => F(e));
}
function an(e) {
  let { kzg: t } = e,
    n = e.to ?? (typeof e.blobs[0] == `string` ? `hex` : `bytes`),
    r = typeof e.blobs[0] == `string` ? e.blobs.map((e) => P(e)) : e.blobs,
    i =
      typeof e.commitments[0] == `string`
        ? e.commitments.map((e) => P(e))
        : e.commitments,
    a = [];
  for (let e = 0; e < r.length; e++) {
    let n = r[e],
      o = i[e];
    a.push(Uint8Array.from(t.computeBlobKzgProof(n, o)));
  }
  return n === `bytes` ? a : a.map((e) => F(e));
}
var on = ht;
function sn(e, t) {
  let n = t || `hex`,
    r = on(Ye(e, { strict: !1 }) ? Qe(e) : e);
  return n === `bytes` ? r : rt(r);
}
function cn(e) {
  let { commitment: t, version: n = 1 } = e,
    r = e.to ?? (typeof t == `string` ? `hex` : `bytes`),
    i = sn(t, `bytes`);
  return (i.set([n], 0), r === `bytes` ? i : F(i));
}
function ln(e) {
  let { commitments: t, version: n } = e,
    r = e.to ?? (typeof t[0] == `string` ? `hex` : `bytes`),
    i = [];
  for (let e of t) i.push(cn({ commitment: e, to: r, version: n }));
  return i;
}
var un = 6,
  dn = 4096,
  fn = 32 * dn,
  pn = fn * un - 1 - 1 * dn * un,
  mn = class extends L {
    constructor({ maxSize: e, size: t }) {
      super(`Blob size is too large.`, {
        metaMessages: [`Max: ${e} bytes`, `Given: ${t} bytes`],
        name: `BlobSizeTooLargeError`,
      });
    }
  },
  hn = class extends L {
    constructor() {
      super(`Blob data must not be empty.`, { name: `EmptyBlobError` });
    }
  },
  gn = class extends L {
    constructor({ hash: e, size: t }) {
      super(`Versioned hash "${e}" size is invalid.`, {
        metaMessages: [`Expected: 32`, `Received: ${t}`],
        name: `InvalidVersionedHashSizeError`,
      });
    }
  },
  _n = class extends L {
    constructor({ hash: e, version: t }) {
      super(`Versioned hash "${e}" version is invalid.`, {
        metaMessages: [`Expected: 1`, `Received: ${t}`],
        name: `InvalidVersionedHashVersionError`,
      });
    }
  };
function vn(e) {
  let t = e.to ?? (typeof e.data == `string` ? `hex` : `bytes`),
    n = typeof e.data == `string` ? P(e.data) : e.data,
    r = Xe(n);
  if (!r) throw new hn();
  if (r > 761855) throw new mn({ maxSize: pn, size: r });
  let i = [],
    a = !0,
    o = 0;
  for (; a;) {
    let e = _e(new Uint8Array(fn)),
      t = 0;
    for (; t < dn;) {
      let r = n.slice(o, o + 31);
      if ((e.pushByte(0), e.pushBytes(r), r.length < 31)) {
        (e.pushByte(128), (a = !1));
        break;
      }
      (t++, (o += 31));
    }
    i.push(e);
  }
  return t === `bytes` ? i.map((e) => e.bytes) : i.map((e) => F(e.bytes));
}
function yn(e) {
  let { data: t, kzg: n, to: r } = e,
    i = e.blobs ?? vn({ data: t, to: r }),
    a = e.commitments ?? rn({ blobs: i, kzg: n, to: r }),
    o = e.proofs ?? an({ blobs: i, commitments: a, kzg: n, to: r }),
    s = [];
  for (let e = 0; e < i.length; e++)
    s.push({ blob: i[e], commitment: a[e], proof: o[e] });
  return s;
}
function bn(e) {
  if (e.type) return e.type;
  if (e.authorizationList !== void 0) return `eip7702`;
  if (
    e.blobs !== void 0 ||
    e.blobVersionedHashes !== void 0 ||
    e.maxFeePerBlobGas !== void 0 ||
    e.sidecars !== void 0
  )
    return `eip4844`;
  if (e.maxFeePerGas !== void 0 || e.maxPriorityFeePerGas !== void 0)
    return `eip1559`;
  if (e.gasPrice !== void 0)
    return e.accessList === void 0 ? `legacy` : `eip2930`;
  throw new Ce({ transaction: e });
}
function xn(e, { docsPath: t, ...n }) {
  let r = (() => {
    let t = w(e, n);
    return t instanceof ot ? e : t;
  })();
  return new re(r, { docsPath: t, ...n });
}
async function Sn(e) {
  let t = await e.request({ method: `eth_chainId` }, { dedupe: !0 });
  return M(t);
}
async function Cn(e, t) {
  let {
      account: n = e.account,
      accessList: r,
      authorizationList: i,
      chain: a = e.chain,
      blobVersionedHashes: o,
      blobs: s,
      data: c,
      gas: u,
      gasPrice: d,
      maxFeePerBlobGas: f,
      maxFeePerGas: p,
      maxPriorityFeePerGas: m,
      nonce: h,
      nonceManager: g,
      to: _,
      type: v,
      value: y,
      ...b
    } = t,
    x = await (async () => {
      if (!n || !g || h !== void 0) return h;
      let t = E(n),
        r = a ? a.id : await R(e, Sn, `getChainId`)({});
      return await g.consume({ address: t.address, chainId: r, client: e });
    })();
  S(t);
  let C = a?.formatters?.transactionRequest?.format,
    w = (C || Se)(
      {
        ...l(b, { format: C }),
        account: n ? E(n) : void 0,
        accessList: r,
        authorizationList: i,
        blobs: s,
        blobVersionedHashes: o,
        data: c,
        gas: u,
        gasPrice: d,
        maxFeePerBlobGas: f,
        maxFeePerGas: p,
        maxPriorityFeePerGas: m,
        nonce: x,
        to: _,
        type: v,
        value: y,
      },
      `fillTransaction`,
    );
  try {
    let n = await e.request({ method: `eth_fillTransaction`, params: [w] }),
      r = (a?.formatters?.transaction?.format || Kt)(n.tx);
    (delete r.blockHash,
      delete r.blockNumber,
      delete r.r,
      delete r.s,
      delete r.transactionIndex,
      delete r.v,
      delete r.yParity,
      (r.data = r.input));
    let i = r.feePayerSignature !== void 0 && r.feePayerSignature !== null;
    if (i && x !== void 0 && r.nonce !== x)
      throw new Ee({ filledNonce: r.nonce, requestedNonce: x });
    if (!i) {
      ((r.gas &&= t.gas ?? r.gas),
        (r.gasPrice &&= t.gasPrice ?? r.gasPrice),
        (r.maxFeePerBlobGas &&= t.maxFeePerBlobGas ?? r.maxFeePerBlobGas),
        (r.maxFeePerGas &&= t.maxFeePerGas ?? r.maxFeePerGas),
        (r.maxPriorityFeePerGas &&=
          t.maxPriorityFeePerGas ?? r.maxPriorityFeePerGas),
        r.nonce !== void 0 && (r.nonce = t.nonce ?? r.nonce));
      let n = await (async () => {
        if (typeof a?.fees?.baseFeeMultiplier == `function`) {
          let n = await R(e, B, `getBlock`)({});
          return a.fees.baseFeeMultiplier({ block: n, client: e, request: t });
        }
        return a?.fees?.baseFeeMultiplier ?? 1.2;
      })();
      if (n < 1) throw new Vt();
      let i = 10 ** (n.toString().split(`.`)[1]?.length ?? 0),
        o = (e) => (e * BigInt(Math.round(n * i))) / BigInt(i);
      (r.maxFeePerGas &&
        !t.maxFeePerGas &&
        (r.maxFeePerGas = o(r.maxFeePerGas)),
        r.gasPrice && !t.gasPrice && (r.gasPrice = o(r.gasPrice)));
    }
    return {
      raw: n.raw,
      transaction: { from: w.from, ...r },
      ...(n.capabilities ? { capabilities: n.capabilities } : {}),
    };
  } catch (n) {
    throw xn(n, { ...t, chain: e.chain });
  }
}
var wn = [`blobVersionedHashes`, `chainId`, `fees`, `gas`, `nonce`, `type`],
  Tn = new Map(),
  En = new nt(128);
async function Dn(e, t) {
  let n = t;
  ((n.account ??= e.account), (n.parameters ??= wn));
  let { account: r, chain: i = e.chain, nonceManager: a, parameters: o } = n,
    s = (() => {
      if (typeof i?.prepareTransactionRequest == `function`)
        return {
          fn: i.prepareTransactionRequest,
          runAt: [`beforeFillTransaction`],
        };
      if (Array.isArray(i?.prepareTransactionRequest))
        return {
          fn: i.prepareTransactionRequest[0],
          runAt: i.prepareTransactionRequest[1].runAt,
        };
    })(),
    c;
  async function l() {
    return (
      c ||
      (n.chainId === void 0
        ? i
          ? i.id
          : ((c = await R(e, Sn, `getChainId`)({})), c)
        : n.chainId)
    );
  }
  let u = r && E(r),
    d = n.nonce;
  if (s?.fn && s.runAt?.includes(`beforeFillTransaction`)) {
    ((n = await s.fn(
      { ...n, chain: i },
      { client: e, phase: `beforeFillTransaction` },
    )),
      (d ??= n.nonce));
    let t = n.account ?? n.from;
    u = t ? E(t) : void 0;
  }
  if (o.includes(`nonce`) && d === void 0 && u && a) {
    let t = await l();
    d = await a.consume({ address: u.address, chainId: t, client: e });
  }
  let f =
    !(
      (o.includes(`blobVersionedHashes`) || o.includes(`sidecars`)) &&
      n.kzg &&
      n.blobs
    ) &&
    ((o.length > 0 &&
      `feePayer` in n &&
      n.feePayer &&
      !(`feePayerSignature` in n && n.feePayerSignature)) ||
      (!(En.get(e.uid) === !1 || ![`fees`, `gas`].some((e) => o.includes(e))) &&
        ((o.includes(`chainId`) && typeof n.chainId != `number`) ||
          (o.includes(`nonce`) && typeof d != `number`) ||
          (o.includes(`fees`) &&
            typeof n.gasPrice != `bigint` &&
            (typeof n.maxFeePerGas != `bigint` ||
              typeof n.maxPriorityFeePerGas != `bigint`)) ||
          (o.includes(`gas`) && typeof n.gas != `bigint`))))
      ? await R(
          e,
          Cn,
          `fillTransaction`,
        )({ ...n, nonce: d })
          .then((t) => {
            let {
                chainId: r,
                from: i,
                gas: a,
                gasPrice: o,
                nonce: s,
                maxFeePerBlobGas: c,
                maxFeePerGas: l,
                maxPriorityFeePerGas: u,
                type: d,
                ...f
              } = t.transaction,
              p = `feeToken` in f ? f.feeToken : void 0,
              m =
                `feePayerSignature` in f &&
                f.feePayerSignature !== null &&
                f.feePayerSignature !== void 0,
              h = p != null && (!(`feeToken` in n) || m);
            return (
              En.set(e.uid, !0),
              {
                ...n,
                ...(i ? { from: i } : {}),
                ...(d && !n.type ? { type: d } : {}),
                ...(r === void 0 ? {} : { chainId: r }),
                ...(a === void 0 ? {} : { gas: a }),
                ...(o === void 0 ? {} : { gasPrice: o }),
                ...(s === void 0 ? {} : { nonce: s }),
                ...(c !== void 0 && n.type !== `legacy` && n.type !== `eip2930`
                  ? { maxFeePerBlobGas: c }
                  : {}),
                ...(l !== void 0 && n.type !== `legacy` && n.type !== `eip2930`
                  ? { maxFeePerGas: l }
                  : {}),
                ...(u !== void 0 && n.type !== `legacy` && n.type !== `eip2930`
                  ? { maxPriorityFeePerGas: u }
                  : {}),
                ...(`nonceKey` in f && f.nonceKey !== void 0
                  ? { nonceKey: f.nonceKey }
                  : {}),
                ...(`keyAuthorization` in f &&
                f.keyAuthorization !== void 0 &&
                f.keyAuthorization !== null &&
                !(`keyAuthorization` in n)
                  ? { keyAuthorization: f.keyAuthorization }
                  : {}),
                ...(`feePayerSignature` in f &&
                f.feePayerSignature !== void 0 &&
                f.feePayerSignature !== null
                  ? { feePayerSignature: f.feePayerSignature }
                  : {}),
                ...(h ? { feeToken: p } : {}),
                ...(t.capabilities ? { _capabilities: t.capabilities } : {}),
              }
            );
          })
          .catch((t) => {
            let r = t;
            if (r.name !== `TransactionExecutionError`) return n;
            if (
              r.walk?.((e) => e instanceof Ee) ||
              r.walk?.((e) => e.name === `ExecutionRevertedError`)
            )
              throw t;
            return (
              r.walk?.((e) => {
                let t = e;
                return (
                  t.name === `MethodNotFoundRpcError` ||
                  t.name === `MethodNotSupportedRpcError` ||
                  t.message?.includes(`eth_fillTransaction is not available`)
                );
              }) && En.set(e.uid, !1),
              n
            );
          })
      : n;
  ((d ??= f.nonce),
    (n = {
      ...f,
      ...(u ? { from: u?.address } : {}),
      ...(d === void 0 ? {} : { nonce: d }),
    }));
  let { blobs: p, gas: m, kzg: h, type: g } = n;
  s?.fn &&
    s.runAt?.includes(`beforeFillParameters`) &&
    (n = await s.fn(
      { ...n, chain: i },
      { client: e, phase: `beforeFillParameters` },
    ));
  let _;
  async function v() {
    return _ || ((_ = await R(e, B, `getBlock`)({ blockTag: `latest` })), _);
  }
  if (
    (o.includes(`nonce`) &&
      d === void 0 &&
      u &&
      !a &&
      (n.nonce = await R(
        e,
        nn,
        `getTransactionCount`,
      )({ address: u.address, blockTag: `pending` })),
    (o.includes(`blobVersionedHashes`) || o.includes(`sidecars`)) && p && h)
  ) {
    let e = rn({ blobs: p, kzg: h });
    if (o.includes(`blobVersionedHashes`)) {
      let t = ln({ commitments: e, to: `hex` });
      n.blobVersionedHashes = t;
    }
    if (o.includes(`sidecars`)) {
      let t = yn({
        blobs: p,
        commitments: e,
        proofs: an({ blobs: p, commitments: e, kzg: h }),
        to: `hex`,
      });
      n.sidecars = t;
    }
  }
  if (
    (o.includes(`chainId`) && (n.chainId = await l()),
    (o.includes(`fees`) || o.includes(`type`)) && g === void 0)
  )
    try {
      n.type = bn(n);
    } catch {
      let t = Tn.get(e.uid);
      (t === void 0 &&
        ((t = typeof (await v())?.baseFeePerGas == `bigint`), Tn.set(e.uid, t)),
        (n.type = t ? `eip1559` : `legacy`));
    }
  if (o.includes(`fees`))
    if (n.type !== `legacy` && n.type !== `eip2930`) {
      if (n.maxFeePerGas === void 0 || n.maxPriorityFeePerGas === void 0) {
        let { maxFeePerGas: t, maxPriorityFeePerGas: r } = await tn(e, {
          block: await v(),
          chain: i,
          request: n,
        });
        if (
          n.maxPriorityFeePerGas === void 0 &&
          n.maxFeePerGas &&
          n.maxFeePerGas < r
        )
          throw new Ut({ maxPriorityFeePerGas: r });
        ((n.maxPriorityFeePerGas = r), (n.maxFeePerGas = t));
      }
    } else {
      if (n.maxFeePerGas !== void 0 || n.maxPriorityFeePerGas !== void 0)
        throw new Ht();
      if (n.gasPrice === void 0) {
        let { gasPrice: t } = await tn(e, {
          block: await v(),
          chain: i,
          request: n,
          type: `legacy`,
        });
        n.gasPrice = t;
      }
    }
  return (
    o.includes(`gas`) &&
      m === void 0 &&
      (n.gas = await R(
        e,
        On,
        `estimateGas`,
      )({
        ...n,
        account: u,
        prepare: u?.type === `local` ? [] : [`blobVersionedHashes`],
      })),
    s?.fn &&
      s.runAt?.includes(`afterFillParameters`) &&
      (n = await s.fn(
        { ...n, chain: i },
        { client: e, phase: `afterFillParameters` },
      )),
    S(n),
    delete n.parameters,
    n
  );
}
async function On(e, t) {
  let { account: n = e.account, prepare: r = !0 } = t,
    i = n ? E(n) : void 0,
    a = (() => {
      if (Array.isArray(r)) return r;
      if (i?.type !== `local`) return [`blobVersionedHashes`];
    })();
  try {
    let n = await (async () => {
        if (t.to) return t.to;
        if (t.authorizationList && t.authorizationList.length > 0)
          return await Lt({ authorization: t.authorizationList[0] }).catch(
            () => {
              throw new L(
                "`to` is required. Could not infer from `authorizationList`",
              );
            },
          );
      })(),
      {
        accessList: o,
        authorizationList: s,
        blobs: c,
        blobVersionedHashes: d,
        blockNumber: f,
        blockTag: p,
        data: m,
        gas: h,
        gasPrice: g,
        maxFeePerBlobGas: _,
        maxFeePerGas: v,
        maxPriorityFeePerGas: y,
        nonce: b,
        value: x,
        stateOverride: C,
        ...w
      } = r ? await Dn(e, { ...t, parameters: a, to: n }) : t;
    if (h && t.gas !== h) return h;
    let ee = (typeof f == `bigint` ? j(f) : void 0) || p,
      te = u(C);
    S(t);
    let ne = e.chain?.formatters?.transactionRequest?.format,
      re = (ne || Se)(
        {
          ...l(w, { format: ne }),
          account: i,
          accessList: o,
          authorizationList: s,
          blobs: c,
          blobVersionedHashes: d,
          data: m,
          gasPrice: g,
          maxFeePerBlobGas: _,
          maxFeePerGas: v,
          maxPriorityFeePerGas: y,
          nonce: b,
          to: n,
          value: x,
        },
        `estimateGas`,
      );
    return BigInt(
      await e.request({
        method: `eth_estimateGas`,
        params: te
          ? [re, ee ?? e.experimental_blockTag ?? `latest`, te]
          : ee
            ? [re, ee]
            : [re],
      }),
    );
  } catch (n) {
    throw zt(n, { ...t, account: i, chain: e.chain });
  }
}
async function kn(e, t) {
  let {
      abi: n,
      address: r,
      args: i,
      functionName: a,
      dataSuffix: o = typeof e.dataSuffix == `string`
        ? e.dataSuffix
        : e.dataSuffix?.value,
      ...s
    } = t,
    c = k({ abi: n, args: i, functionName: a });
  try {
    return await R(
      e,
      On,
      `estimateGas`,
    )({ data: `${c}${o ? o.replace(`0x`, ``) : ``}`, to: r, ...s });
  } catch (e) {
    throw z(e, {
      abi: n,
      address: r,
      args: i,
      docsPath: `/docs/contract/estimateContractGas`,
      functionName: a,
      sender: (s.account ? E(s.account) : void 0)?.address,
    });
  }
}
function V(e, { args: t, eventName: n } = {}) {
  return {
    ...e,
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    blockTimestamp: e.blockTimestamp
      ? BigInt(e.blockTimestamp)
      : e.blockTimestamp === null
        ? null
        : void 0,
    logIndex: e.logIndex ? Number(e.logIndex) : null,
    transactionHash: e.transactionHash ? e.transactionHash : null,
    transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    ...(n ? { args: t, eventName: n } : {}),
  };
}
var An = `/docs/contract/decodeEventLog`;
function jn(e) {
  let { abi: t, data: n, strict: r, topics: i } = e,
    a = r ?? !0,
    [o, ...s] = i;
  if (!o) throw new je({ docsPath: An });
  let c = t.find((e) => e.type === `event` && o === qe(Fe(e)));
  if (!(c && `name` in c) || c.type !== `event`)
    throw new Ve(o, { docsPath: An });
  let { name: l, inputs: u } = c,
    d = u?.some((e) => !(`name` in e && e.name)),
    f = d ? [] : {},
    p = u.map((e, t) => [e, t]).filter(([e]) => `indexed` in e && e.indexed),
    m = [];
  for (let e = 0; e < p.length; e++) {
    let [t, n] = p[e],
      r = s[e];
    if (!r) {
      if (a) throw new Pe({ abiItem: c, param: t });
      m.push([t, n]);
      continue;
    }
    f[d ? n : t.name || n] = Mn({ param: t, value: r });
  }
  let h = u.filter((e) => !(`indexed` in e && e.indexed)),
    g = a ? h : [...m.map(([e]) => e), ...h];
  if (g.length > 0) {
    if (n && n !== `0x`)
      try {
        let e = xe(g, n);
        if (e) {
          let t = 0;
          if (!a) for (let [n, r] of m) f[d ? r : n.name || r] = e[t++];
          if (d)
            for (let n = 0; n < u.length; n++)
              f[n] === void 0 && t < e.length && (f[n] = e[t++]);
          else for (let n = 0; n < h.length; n++) f[h[n].name] = e[t++];
        }
      } catch (e) {
        if (a)
          throw e instanceof Me || e instanceof de
            ? new Ne({ abiItem: c, data: n, params: g, size: Xe(n) })
            : e;
      }
    else if (a) throw new Ne({ abiItem: c, data: `0x`, params: g, size: 0 });
  }
  return { eventName: l, args: Object.values(f).length > 0 ? f : void 0 };
}
function Mn({ param: e, value: t }) {
  return e.type === `string` ||
    e.type === `bytes` ||
    e.type === `tuple` ||
    e.type.match(/^(.*)\[(\d+)?\]$/)
    ? t
    : (xe([e], t) || [])[0];
}
function Nn(e) {
  let { abi: t, args: n, logs: r, strict: i = !0 } = e,
    a = (() => {
      if (e.eventName)
        return Array.isArray(e.eventName) ? e.eventName : [e.eventName];
    })(),
    o = t
      .filter((e) => e.type === `event`)
      .map((e) => ({ abi: e, selector: qe(e) }));
  return r
    .map((e) => {
      let t = typeof e.blockNumber == `string` ? V(e) : e,
        r = o.filter((e) => t.topics[0] === e.selector);
      if (r.length === 0) return null;
      let s, c;
      for (let e of r)
        try {
          ((s = jn({ ...t, abi: [e.abi], strict: !0 })), (c = e));
          break;
        } catch {}
      if (!s && !i) {
        c = r[0];
        try {
          s = jn({ data: t.data, topics: t.topics, abi: [c.abi], strict: !1 });
        } catch {
          let e = c.abi.inputs?.some((e) => !(`name` in e && e.name));
          return { ...t, args: e ? [] : {}, eventName: c.abi.name };
        }
      }
      return !s ||
        !c ||
        (a && !a.includes(s.eventName)) ||
        !Pn({ args: s.args, inputs: c.abi.inputs, matchArgs: n })
        ? null
        : { ...s, ...t };
    })
    .filter(Boolean);
}
function Pn(e) {
  let { args: t, inputs: n, matchArgs: r } = e;
  if (!r) return !0;
  if (!t) return !1;
  function i(e, t, n) {
    try {
      return e.type === `address`
        ? s(t, n)
        : e.type === `string` || e.type === `bytes`
          ? A(Qe(t)) === n
          : t === n;
    } catch {
      return !1;
    }
  }
  return Array.isArray(t) && Array.isArray(r)
    ? r.every((e, r) => {
        if (e == null) return !0;
        let a = n[r];
        return a ? (Array.isArray(e) ? e : [e]).some((e) => i(a, e, t[r])) : !1;
      })
    : typeof t == `object` &&
        !Array.isArray(t) &&
        typeof r == `object` &&
        !Array.isArray(r) &&
        Object.entries(r).every(([e, r]) => {
          if (r == null) return !0;
          let a = n.find((t) => t.name === e);
          return a
            ? (Array.isArray(r) ? r : [r]).some((n) => i(a, n, t[e]))
            : !1;
        });
}
async function Fn(
  e,
  {
    address: t,
    blockHash: n,
    fromBlock: r,
    toBlock: i,
    event: a,
    events: o,
    args: s,
    strict: c,
  } = {},
) {
  let l = c ?? !1,
    u = o ?? (a ? [a] : void 0),
    d = [];
  u &&
    ((d = [
      u.flatMap((e) =>
        St({ abi: [e], eventName: e.name, args: o ? void 0 : s }),
      ),
    ]),
    a && (d = d[0]));
  let f;
  f = n
    ? await e.request({
        method: `eth_getLogs`,
        params: [{ address: t, topics: d, blockHash: n }],
      })
    : await e.request({
        method: `eth_getLogs`,
        params: [
          {
            address: t,
            topics: d,
            fromBlock: typeof r == `bigint` ? j(r) : r,
            toBlock: typeof i == `bigint` ? j(i) : i,
          },
        ],
      });
  let p = f.map((e) => V(e));
  return u ? Nn({ abi: u, args: s, logs: p, strict: l }) : p;
}
async function In(e, t) {
  let {
      abi: n,
      address: r,
      args: i,
      blockHash: a,
      eventName: o,
      fromBlock: s,
      toBlock: c,
      strict: l,
    } = t,
    u = o ? Ge({ abi: n, name: o }) : void 0,
    d = u ? void 0 : n.filter((e) => e.type === `event`);
  return R(
    e,
    Fn,
    `getLogs`,
  )({
    address: r,
    args: i,
    blockHash: a,
    event: u,
    events: d,
    fromBlock: s,
    toBlock: c,
    strict: l,
  });
}
function Ln(e, t) {
  if (U(e) > t) throw new rr({ givenSize: U(e), maxSize: t });
}
function Rn(e, t) {
  if (typeof t == `number` && t > 0 && t > U(e) - 1)
    throw new ir({ offset: t, position: `start`, size: U(e) });
}
function zn(e, t, n) {
  if (typeof t == `number` && typeof n == `number` && U(e) !== n - t)
    throw new ir({ offset: n, position: `end`, size: U(e) });
}
var H = { zero: 48, nine: 57, A: 65, F: 70, a: 97, f: 102 };
function Bn(e) {
  if (e >= H.zero && e <= H.nine) return e - H.zero;
  if (e >= H.A && e <= H.F) return e - (H.A - 10);
  if (e >= H.a && e <= H.f) return e - (H.a - 10);
}
function Vn(e, t = {}) {
  let { dir: n, size: r = 32 } = t;
  if (r === 0) return e;
  if (e.length > r)
    throw new ar({ size: e.length, targetSize: r, type: `Bytes` });
  let i = new Uint8Array(r);
  for (let t = 0; t < r; t++) {
    let a = n === `right`;
    i[a ? t : r - t - 1] = e[a ? t : e.length - t - 1];
  }
  return i;
}
function Hn(e, t = {}) {
  let { dir: n = `left` } = t,
    r = e,
    i = 0;
  for (
    let e = 0;
    e < r.length - 1 &&
    r[n === `left` ? e : r.length - e - 1].toString() === `0`;
    e++
  )
    i++;
  return ((r = n === `left` ? r.slice(i) : r.slice(0, r.length - i)), r);
}
var Un = new TextDecoder(),
  Wn = new TextEncoder();
function Gn(e) {
  return e instanceof Uint8Array ? e : typeof e == `string` ? qn(e) : Kn(e);
}
function Kn(e) {
  return e instanceof Uint8Array ? e : new Uint8Array(e);
}
function qn(e, t = {}) {
  let { size: n } = t,
    r = e;
  n && (_(e, n), (r = pe(e, n)));
  let i = r.slice(2);
  i.length % 2 && (i = `0${i}`);
  let a = i.length / 2,
    o = new Uint8Array(a);
  for (let e = 0, t = 0; e < a; e++) {
    let n = Bn(i.charCodeAt(t++)),
      r = Bn(i.charCodeAt(t++));
    if (n === void 0 || r === void 0)
      throw new O(
        `Invalid byte sequence ("${i[t - 2]}${i[t - 1]}" in "${i}").`,
      );
    o[e] = (n << 4) | r;
  }
  return o;
}
function Jn(e, t = {}) {
  let { size: n } = t,
    r = Wn.encode(e);
  return typeof n == `number` ? (Ln(r, n), Yn(r, n)) : r;
}
function Yn(e, t) {
  return Vn(e, { dir: `right`, size: t });
}
function U(e) {
  return e.length;
}
function Xn(e, t, n, r = {}) {
  let { strict: i } = r;
  Rn(e, t);
  let a = e.slice(t, n);
  return (i && zn(a, t, n), a);
}
function Zn(e, t = {}) {
  let { size: n } = t;
  n !== void 0 && Ln(e, n);
  let r = i(e, t);
  return h(r, t);
}
function Qn(e, t = {}) {
  let { size: n } = t,
    r = e;
  if ((n !== void 0 && (Ln(r, n), (r = er(r))), r.length > 1 || r[0] > 1))
    throw new nr(r);
  return !!r[0];
}
function W(e, t = {}) {
  let { size: n } = t;
  n !== void 0 && Ln(e, n);
  let r = i(e, t);
  return o(r, t);
}
function $n(e, t = {}) {
  let { size: n } = t,
    r = e;
  return (n !== void 0 && (Ln(r, n), (r = tr(r))), Un.decode(r));
}
function er(e) {
  return Hn(e, { dir: `left` });
}
function tr(e) {
  return Hn(e, { dir: `right` });
}
var nr = class extends O {
    constructor(e) {
      (super(`Bytes value \`${e}\` is not a valid boolean.`, {
        metaMessages: [
          "The bytes array must contain a single byte of either a `0` or `1` value.",
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Bytes.InvalidBytesBooleanError`,
        }));
    }
  },
  rr = class extends O {
    constructor({ givenSize: e, maxSize: t }) {
      (super(`Size cannot exceed \`${t}\` bytes. Given size: \`${e}\` bytes.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Bytes.SizeOverflowError`,
        }));
    }
  },
  ir = class extends O {
    constructor({ offset: e, position: t, size: n }) {
      (super(
        `Slice ${t === `start` ? `starting` : `ending`} at offset \`${e}\` is out-of-bounds (size: \`${n}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Bytes.SliceOffsetOutOfBoundsError`,
        }));
    }
  },
  ar = class extends O {
    constructor({ size: e, targetSize: t, type: n }) {
      (super(
        `${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${t}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Bytes.SizeExceedsPaddingSizeError`,
        }));
    }
  };
async function G(e, t) {
  let { abi: n, address: r, args: i, functionName: a, ...o } = t,
    s = k({ abi: n, args: i, functionName: a });
  try {
    let { data: t } = await R(e, fe, `call`)({ ...o, data: s, to: r });
    return x({ abi: n, args: i, functionName: a, data: t || `0x` });
  } catch (e) {
    throw z(e, {
      abi: n,
      address: r,
      args: i,
      docsPath: `/docs/contract/readContract`,
      functionName: a,
    });
  }
}
async function or(e, t) {
  let {
      abi: n,
      address: r,
      args: i,
      functionName: a,
      dataSuffix: o = typeof e.dataSuffix == `string`
        ? e.dataSuffix
        : e.dataSuffix?.value,
      ...s
    } = t,
    c = s.account ? E(s.account) : e.account,
    l = k({ abi: n, args: i, functionName: a });
  try {
    let { data: u } = await R(
      e,
      fe,
      `call`,
    )({
      batch: !1,
      data: `${l}${o ? o.replace(`0x`, ``) : ``}`,
      to: r,
      ...s,
      account: c,
    });
    return {
      result: x({ abi: n, args: i, functionName: a, data: u || `0x` }),
      request: {
        abi: n.filter((e) => `name` in e && e.name === t.functionName),
        address: r,
        args: i,
        dataSuffix: o,
        functionName: a,
        ...s,
        account: c,
      },
    };
  } catch (e) {
    throw z(e, {
      abi: n,
      address: r,
      args: i,
      docsPath: `/docs/contract/simulateContract`,
      functionName: a,
      sender: c?.address,
    });
  }
}
var sr = new Map(),
  cr = new Map(),
  lr = 0;
function K(e, t, n) {
  let r = ++lr,
    i = () => sr.get(e) || [],
    a = () => {
      let t = i().filter((e) => e.id !== r);
      if (t.length === 0) {
        (sr.delete(e), cr.delete(e));
        return;
      }
      sr.set(e, t);
    },
    o = () => {
      let t = i();
      if (!t.some((e) => e.id === r)) return;
      let n = cr.get(e);
      if (t.length === 1 && n) {
        let e = n();
        e instanceof Promise && e.catch(() => {});
      }
      a();
    },
    s = i();
  if ((sr.set(e, [...s, { id: r, fns: t }]), s && s.length > 0)) return o;
  let c = {};
  for (let e in t)
    c[e] = (...t) => {
      let n = i();
      if (n.length !== 0) for (let r of n) r.fns[e]?.(...t);
    };
  let l = n(c);
  return (typeof l == `function` && cr.set(e, l), o);
}
function ur(e, { emitOnBegin: t, initialWaitTime: n, interval: r }) {
  let i = !0,
    a = () => (i = !1);
  return (
    (async () => {
      let o;
      t && (o = await e({ unpoll: a }));
      let s = (await n?.(o)) ?? r;
      await mt(s);
      let c = async () => {
        i && (await e({ unpoll: a }), await mt(r), c());
      };
      c();
    })(),
    a
  );
}
var dr = new Map(),
  fr = new Map();
function pr(e) {
  let t = (e, t) => ({
      clear: () => t.delete(e),
      get: () => t.get(e),
      set: (n) => t.set(e, n),
    }),
    n = t(e, dr),
    r = t(e, fr);
  return {
    clear: () => {
      (n.clear(), r.clear());
    },
    promise: n,
    response: r,
  };
}
async function mr(e, { cacheKey: t, cacheTime: n = 1 / 0 }) {
  let r = pr(t),
    i = r.response.get();
  if (i && n > 0 && Date.now() - i.created.getTime() < n) return i.data;
  let a = r.promise.get();
  a || ((a = e()), r.promise.set(a));
  try {
    let e = await a;
    return (r.response.set({ created: new Date(), data: e }), e);
  } finally {
    r.promise.clear();
  }
}
var hr = (e) => `blockNumber.${e}`;
async function gr(e, { cacheTime: t = e.cacheTime } = {}) {
  let n = await mr(() => e.request({ method: `eth_blockNumber` }), {
    cacheKey: hr(e.uid),
    cacheTime: t,
  });
  return BigInt(n);
}
async function _r(e, { filter: t }) {
  let n = `strict` in t && t.strict,
    r = await t.request({ method: `eth_getFilterChanges`, params: [t.id] });
  if (typeof r[0] == `string`) return r;
  let i = r.map((e) => V(e));
  return !(`abi` in t) || !t.abi ? i : Nn({ abi: t.abi, logs: i, strict: n });
}
async function vr(e, { filter: t }) {
  return t.request({ method: `eth_uninstallFilter`, params: [t.id] });
}
function yr(e, t) {
  let {
    abi: n,
    address: r,
    args: i,
    batch: a = !0,
    eventName: o,
    fromBlock: s,
    onError: c,
    onLogs: l,
    poll: u,
    pollingInterval: d = e.pollingInterval,
    strict: f,
  } = t;
  return (
    u === void 0
      ? typeof s == `bigint` ||
        (e.transport.type !== `webSocket` &&
          e.transport.type !== `ipc` &&
          (e.transport.type !== `fallback` ||
            (e.transport.transports[0].config.type !== `webSocket` &&
              e.transport.transports[0].config.type !== `ipc`)))
      : u
  )
    ? (() => {
        let t = f ?? !1;
        return K(
          I([`watchContractEvent`, r, i, a, e.uid, o, d, t, s]),
          { onLogs: l, onError: c },
          (c) => {
            let l;
            s !== void 0 && (l = s - 1n);
            let u,
              f = !1,
              p = ur(
                async () => {
                  if (!f) {
                    try {
                      u = await R(
                        e,
                        Tt,
                        `createContractEventFilter`,
                      )({
                        abi: n,
                        address: r,
                        args: i,
                        eventName: o,
                        strict: t,
                        fromBlock: s,
                      });
                    } catch {}
                    f = !0;
                    return;
                  }
                  try {
                    let s;
                    if (u)
                      s = await R(e, _r, `getFilterChanges`)({ filter: u });
                    else {
                      let a = await R(e, gr, `getBlockNumber`)({});
                      ((s =
                        l && l < a
                          ? await R(
                              e,
                              In,
                              `getContractEvents`,
                            )({
                              abi: n,
                              address: r,
                              args: i,
                              eventName: o,
                              fromBlock: l + 1n,
                              toBlock: a,
                              strict: t,
                            })
                          : []),
                        (l = a));
                    }
                    if (s.length === 0) return;
                    if (a) c.onLogs(s);
                    else for (let e of s) c.onLogs([e]);
                  } catch (e) {
                    (u && e instanceof ft && (f = !1), c.onError?.(e));
                  }
                },
                { emitOnBegin: !0, interval: d },
              );
            return async () => {
              (u && (await R(e, vr, `uninstallFilter`)({ filter: u })), p());
            };
          },
        );
      })()
    : (() => {
        let t = f ?? !1,
          s = I([`watchContractEvent`, r, i, a, e.uid, o, d, t]),
          u = !0,
          p = () => (u = !1);
        return K(
          s,
          { onLogs: l, onError: c },
          (t) => (
            (async () => {
              try {
                let a = (() => {
                    if (e.transport.type === `fallback`) {
                      let t = e.transport.transports.find(
                        (e) =>
                          e.config.type === `webSocket` ||
                          e.config.type === `ipc`,
                      );
                      return t ? t.value : e.transport;
                    }
                    return e.transport;
                  })(),
                  s = o ? St({ abi: n, eventName: o, args: i }) : [],
                  { unsubscribe: c } = await a.subscribe({
                    params: [`logs`, { address: r, topics: s }],
                    onData(e) {
                      if (!u) return;
                      let r = e.result;
                      try {
                        let { eventName: e, args: i } = jn({
                            abi: n,
                            data: r.data,
                            topics: r.topics,
                            strict: f,
                          }),
                          a = V(r, { args: i, eventName: e });
                        t.onLogs([a]);
                      } catch (e) {
                        let n, i;
                        if (e instanceof Ne || e instanceof Pe) {
                          if (f) return;
                          ((n = e.abiItem.name),
                            (i = e.abiItem.inputs?.some(
                              (e) => !(`name` in e && e.name),
                            )));
                        }
                        let a = V(r, { args: i ? [] : {}, eventName: n });
                        t.onLogs([a]);
                      }
                    },
                    onError(e) {
                      t.onError?.(e);
                    },
                  });
                ((p = c), u || p());
              } catch (e) {
                c?.(e);
              }
            })(),
            () => p()
          ),
        );
      })();
}
var br = class extends L {
    constructor({ docsPath: e } = {}) {
      super(
        [
          `Could not find an Account to execute with this Action.`,
          "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the Client.",
        ].join(`
`),
        { docsPath: e, docsSlug: `account`, name: `AccountNotFoundError` },
      );
    }
  },
  xr = class extends L {
    constructor({ docsPath: e, metaMessages: t, type: n }) {
      super(`Account type "${n}" is not supported.`, {
        docsPath: e,
        metaMessages: t,
        name: `AccountTypeNotSupportedError`,
      });
    }
  };
async function Sr(e, { serializedTransaction: t }) {
  return e.request(
    { method: `eth_sendRawTransaction`, params: [t] },
    { retryCount: 0 },
  );
}
var Cr = { "0x0": `reverted`, "0x1": `success` };
function wr(e, t) {
  let n = {
    ...e,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    contractAddress: e.contractAddress ? e.contractAddress : null,
    cumulativeGasUsed: e.cumulativeGasUsed ? BigInt(e.cumulativeGasUsed) : null,
    effectiveGasPrice: e.effectiveGasPrice ? BigInt(e.effectiveGasPrice) : null,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : null,
    logs: e.logs ? e.logs.map((e) => V(e)) : null,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? M(e.transactionIndex) : null,
    status: e.status ? Cr[e.status] : null,
    type: e.type ? Gt[e.type] || e.type : null,
  };
  return (
    e.blobGasPrice && (n.blobGasPrice = BigInt(e.blobGasPrice)),
    e.blobGasUsed && (n.blobGasUsed = BigInt(e.blobGasUsed)),
    n
  );
}
var Tr = Bt(`transactionReceipt`, wr);
function Er(e) {
  let {
      batch: t,
      chain: n,
      ccipRead: r,
      dataSuffix: i,
      key: a = `base`,
      name: o = `Base Client`,
      tokens: s,
      type: c = `base`,
    } = e,
    l =
      e.experimental_blockTag ??
      (typeof n?.experimental_preconfirmationTime == `number`
        ? `pending`
        : void 0),
    u = n?.blockTime ?? 12e3,
    d = Math.min(Math.max(Math.floor(u / 2), 500), 4e3),
    f = e.pollingInterval ?? d,
    p = e.cacheTime ?? f,
    m = e.account ? E(e.account) : void 0,
    {
      config: h,
      request: g,
      value: _,
    } = e.transport({ account: m, chain: n, pollingInterval: f }),
    v = {
      account: m,
      batch: t,
      cacheTime: p,
      ccipRead: r,
      chain: n,
      dataSuffix: i,
      key: a,
      name: o,
      pollingInterval: f,
      request: g,
      tokens: s,
      transport: { ...h, ..._ },
      type: c,
      uid: ut(),
      ...(l ? { experimental_blockTag: l } : {}),
    };
  function y(e) {
    return (t) => {
      let n = t(e);
      for (let e in v) delete n[e];
      let r = { ...e, ...n };
      for (let t in n) {
        let i = e[t],
          a = n[t];
        Dr(i) && Dr(a) && (r[t] = { ...i, ...a });
      }
      return Object.assign(r, { extend: y(r) });
    };
  }
  return Object.assign(v, { extend: y(v) });
}
function Dr(e) {
  if (typeof e != `object` || !e) return !1;
  let t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Or(e, t) {
  let n = (n = {}) => t(e, n);
  for (let r of [
    `call`,
    `calls`,
    `callWithPeriod`,
    `estimateGas`,
    `prepare`,
    `prepareRecipient`,
    `predict`,
    `simulate`,
  ])
    if (Object.hasOwn(t, r)) {
      let i = t[r];
      n[r] = (t = {}) => (i.length === 1 ? i(t) : i(e, t));
    }
  for (let e of [`extractEvent`, `extractEvents`])
    Object.hasOwn(t, e) && (n[e] = t[e]);
  return n;
}
function kr(e) {
  if (!(e instanceof L)) return !1;
  let t = e.walk((e) => e instanceof g);
  return t instanceof g
    ? t.data?.errorName === `HttpError` ||
        t.data?.errorName === `ResolverError` ||
        t.data?.errorName === `ResolverNotContract` ||
        t.data?.errorName === `ResolverNotFound` ||
        t.data?.errorName === `ReverseAddressMismatch` ||
        t.data?.errorName === `UnsupportedResolverProfile`
    : !1;
}
function Ar(e) {
  if (e.length !== 66 || e.indexOf(`[`) !== 0 || e.indexOf(`]`) !== 65)
    return null;
  let t = `0x${e.slice(1, 65)}`;
  return Ye(t) ? t : null;
}
function jr(e) {
  let t = new Uint8Array(32).fill(0);
  if (!e) return F(t);
  let n = e.split(`.`);
  for (let e = n.length - 1; e >= 0; --e) {
    let r = Ar(n[e]),
      i = r ? Qe(r) : A(et(n[e]), `bytes`);
    t = A(Le([t, i]), `bytes`);
  }
  return F(t);
}
function Mr(e) {
  return `[${e.slice(2)}]`;
}
function Nr(e) {
  let t = new Uint8Array(32).fill(0);
  return e ? Ar(e) || A(et(e)) : F(t);
}
function Pr(e) {
  let t = e.replace(/^\.|\.$/gm, ``);
  if (t.length === 0) return new Uint8Array(1);
  let n = new Uint8Array(et(t).byteLength + 2),
    r = 0,
    i = t.split(`.`);
  for (let e = 0; e < i.length; e++) {
    let t = et(i[e]);
    (t.byteLength > 255 && (t = et(Mr(Nr(i[e])))),
      (n[r] = t.length),
      n.set(t, r + 1),
      (r += t.length + 1));
  }
  return n.byteLength === r + 1 ? n : n.slice(0, r + 1);
}
async function Fr(e, t) {
  let {
      blockNumber: n,
      blockTag: r,
      coinType: i,
      name: a,
      gatewayUrls: o,
      strict: s,
    } = t,
    { chain: c } = e,
    l = (() => {
      if (t.universalResolverAddress) return t.universalResolverAddress;
      if (!c)
        throw Error(
          `client chain not configured. universalResolverAddress is required.`,
        );
      return ve({ blockNumber: n, chain: c, contract: `ensUniversalResolver` });
    })(),
    u = c?.ensTlds;
  if (u && !u.some((e) => a.endsWith(e))) return null;
  let d = i == null ? [jr(a)] : [jr(a), BigInt(i)];
  try {
    let t = k({ abi: ge, functionName: `addr`, args: d }),
      s = {
        address: l,
        abi: ie,
        functionName: `resolveWithGateways`,
        args: [rt(Pr(a)), t, o ?? [`x-batch-gateway:true`]],
        blockNumber: n,
        blockTag: r,
      },
      c = await R(e, G, `readContract`)(s);
    if (c[0] === `0x`) return null;
    let u = Ir({ coinType: i, data: c[0], args: d });
    return u === `0x` || Ze(u) === `0x00` ? null : u;
  } catch (e) {
    if (s) throw e;
    if (kr(e)) return null;
    throw e;
  }
}
function Ir({ coinType: e, data: t, args: n }) {
  try {
    return x({ abi: ge, args: n, functionName: `addr`, data: t });
  } catch (n) {
    if (e == null) throw n;
    let r = Ze(t);
    if (Xe(r) === 20) return Re(r);
    throw n;
  }
}
var Lr = class extends L {
    constructor({ data: e }) {
      super(
        `Unable to extract image from metadata. The metadata may be malformed or invalid.`,
        {
          metaMessages: [
            "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
            ``,
            `Provided data: ${JSON.stringify(e)}`,
          ],
          name: `EnsAvatarInvalidMetadataError`,
        },
      );
    }
  },
  Rr = class extends L {
    constructor({ reason: e }) {
      super(`ENS NFT avatar URI is invalid. ${e}`, {
        name: `EnsAvatarInvalidNftUriError`,
      });
    }
  },
  zr = class extends L {
    constructor({ uri: e }) {
      super(
        `Unable to resolve ENS avatar URI "${e}". The URI may be malformed, invalid, or does not respond with a valid image.`,
        { name: `EnsAvatarUriResolutionError` },
      );
    }
  },
  Br = class extends L {
    constructor({ namespace: e }) {
      super(
        `ENS NFT avatar namespace "${e}" is not supported. Must be "erc721" or "erc1155".`,
        { name: `EnsAvatarUnsupportedNamespaceError` },
      );
    }
  },
  Vr =
    /(?<protocol>https?:\/\/[^/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/,
  Hr =
    /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/,
  Ur = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/,
  Wr = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
async function Gr(e) {
  try {
    let t = await fetch(e, { method: `HEAD` });
    return (
      t.status === 200 && t.headers.get(`content-type`)?.startsWith(`image/`)
    );
  } catch (t) {
    return (typeof t == `object` && t.response !== void 0) ||
      !Object.hasOwn(globalThis, `Image`)
      ? !1
      : new Promise((t) => {
          let n = new Image();
          ((n.onload = () => {
            t(!0);
          }),
            (n.onerror = () => {
              t(!1);
            }),
            (n.src = e));
        });
  }
}
function Kr(e, t) {
  return e ? (e.endsWith(`/`) ? e.slice(0, -1) : e) : t;
}
function qr({ uri: e, gatewayUrls: t }) {
  let n = Ur.test(e);
  if (n) return { uri: e, isOnChain: !0, isEncoded: n };
  let r = Kr(t?.ipfs, `https://ipfs.io`),
    i = Kr(t?.arweave, `https://arweave.net`),
    {
      protocol: a,
      subpath: o,
      target: s,
      subtarget: c = ``,
    } = e.match(Vr)?.groups || {},
    l = a === `ipns:/` || o === `ipns/`,
    u = a === `ipfs:/` || o === `ipfs/` || Hr.test(e);
  if (e.startsWith(`http`) && !l && !u) {
    let n = e;
    return (
      t?.arweave && (n = e.replace(/https:\/\/arweave.net/g, t?.arweave)),
      { uri: n, isOnChain: !1, isEncoded: !1 }
    );
  }
  if ((l || u) && s)
    return {
      uri: `${r}/${l ? `ipns` : `ipfs`}/${s}${c}`,
      isOnChain: !1,
      isEncoded: !1,
    };
  if (a === `ar:/` && s)
    return { uri: `${i}/${s}${c || ``}`, isOnChain: !1, isEncoded: !1 };
  let d = e.replace(Wr, ``);
  if (
    (d.startsWith(`<svg`) && (d = `data:image/svg+xml;base64,${btoa(d)}`),
    d.startsWith(`data:`) || d.startsWith(`{`))
  )
    return { uri: d, isOnChain: !0, isEncoded: !1 };
  throw new zr({ uri: e });
}
function Jr(e) {
  if (
    typeof e != `object` ||
    (!(`image` in e) && !(`image_url` in e) && !(`image_data` in e))
  )
    throw new Lr({ data: e });
  return e.image || e.image_url || e.image_data;
}
async function Yr({ gatewayUrls: e, uri: t }) {
  try {
    return await Xr({
      gatewayUrls: e,
      uri: Jr(await fetch(t).then((e) => e.json())),
    });
  } catch {
    throw new zr({ uri: t });
  }
}
async function Xr({ gatewayUrls: e, uri: t }) {
  let { uri: n, isOnChain: r } = qr({ uri: t, gatewayUrls: e });
  if (r || (await Gr(n))) return n;
  throw new zr({ uri: t });
}
function Zr(e) {
  let t = e;
  t.startsWith(`did:nft:`) &&
    (t = t.replace(`did:nft:`, ``).replace(/_/g, `/`));
  let [n, r, i] = t.split(`/`),
    [a, o] = n.split(`:`),
    [s, c] = r.split(`:`);
  if (!a || a.toLowerCase() !== `eip155`)
    throw new Rr({ reason: `Only EIP-155 supported` });
  if (!o) throw new Rr({ reason: `Chain ID not found` });
  if (!c) throw new Rr({ reason: `Contract address not found` });
  if (!i) throw new Rr({ reason: `Token ID not found` });
  if (!s) throw new Rr({ reason: `ERC namespace not found` });
  return {
    chainID: Number.parseInt(o, 10),
    namespace: s.toLowerCase(),
    contractAddress: c,
    tokenID: i,
  };
}
async function Qr(e, { nft: t }) {
  if (t.namespace === `erc721`)
    return G(e, {
      address: t.contractAddress,
      abi: [
        {
          name: `tokenURI`,
          type: `function`,
          stateMutability: `view`,
          inputs: [{ name: `tokenId`, type: `uint256` }],
          outputs: [{ name: ``, type: `string` }],
        },
      ],
      functionName: `tokenURI`,
      args: [BigInt(t.tokenID)],
    });
  if (t.namespace === `erc1155`)
    return G(e, {
      address: t.contractAddress,
      abi: [
        {
          name: `uri`,
          type: `function`,
          stateMutability: `view`,
          inputs: [{ name: `_id`, type: `uint256` }],
          outputs: [{ name: ``, type: `string` }],
        },
      ],
      functionName: `uri`,
      args: [BigInt(t.tokenID)],
    });
  throw new Br({ namespace: t.namespace });
}
async function $r(e, { gatewayUrls: t, record: n }) {
  return /eip155:/i.test(n)
    ? ei(e, { gatewayUrls: t, record: n })
    : Xr({ uri: n, gatewayUrls: t });
}
async function ei(e, { gatewayUrls: t, record: n }) {
  let r = Zr(n),
    {
      uri: i,
      isOnChain: a,
      isEncoded: o,
    } = qr({ uri: await Qr(e, { nft: r }), gatewayUrls: t });
  if (a && (i.includes(`data:application/json;base64,`) || i.startsWith(`{`))) {
    let e = o ? atob(i.replace(`data:application/json;base64,`, ``)) : i;
    return Xr({ uri: Jr(JSON.parse(e)), gatewayUrls: t });
  }
  let s = r.tokenID;
  return (
    r.namespace === `erc1155` && (s = s.replace(`0x`, ``).padStart(64, `0`)),
    Yr({ gatewayUrls: t, uri: i.replace(/(?:0x)?{id}/, s) })
  );
}
async function ti(e, t) {
  let {
      blockNumber: n,
      blockTag: r,
      key: i,
      name: a,
      gatewayUrls: o,
      strict: s,
    } = t,
    { chain: c } = e,
    l = (() => {
      if (t.universalResolverAddress) return t.universalResolverAddress;
      if (!c)
        throw Error(
          `client chain not configured. universalResolverAddress is required.`,
        );
      return ve({ blockNumber: n, chain: c, contract: `ensUniversalResolver` });
    })(),
    u = c?.ensTlds;
  if (u && !u.some((e) => a.endsWith(e))) return null;
  try {
    let t = {
        address: l,
        abi: ie,
        args: [
          rt(Pr(a)),
          k({ abi: Ae, functionName: `text`, args: [jr(a), i] }),
          o ?? [`x-batch-gateway:true`],
        ],
        functionName: `resolveWithGateways`,
        blockNumber: n,
        blockTag: r,
      },
      s = await R(e, G, `readContract`)(t);
    if (s[0] === `0x`) return null;
    let c = x({ abi: Ae, functionName: `text`, data: s[0] });
    return c === `` ? null : c;
  } catch (e) {
    if (s) throw e;
    if (kr(e)) return null;
    throw e;
  }
}
async function ni(
  e,
  {
    blockNumber: t,
    blockTag: n,
    assetGatewayUrls: r,
    name: i,
    gatewayUrls: a,
    strict: o,
    universalResolverAddress: s,
  },
) {
  let c = await R(
    e,
    ti,
    `getEnsText`,
  )({
    blockNumber: t,
    blockTag: n,
    key: `avatar`,
    name: i,
    universalResolverAddress: s,
    gatewayUrls: a,
    strict: o,
  });
  if (!c) return null;
  try {
    return await $r(e, { record: c, gatewayUrls: r });
  } catch {
    return null;
  }
}
async function ri(e, t) {
  let {
      address: n,
      blockNumber: r,
      blockTag: i,
      coinType: a = 60n,
      gatewayUrls: o,
      strict: s,
    } = t,
    { chain: c } = e,
    l = (() => {
      if (t.universalResolverAddress) return t.universalResolverAddress;
      if (!c)
        throw Error(
          `client chain not configured. universalResolverAddress is required.`,
        );
      return ve({ blockNumber: r, chain: c, contract: `ensUniversalResolver` });
    })();
  try {
    let t = {
        address: l,
        abi: ke,
        args: [n, a, o ?? [`x-batch-gateway:true`]],
        functionName: `reverseWithGateways`,
        blockNumber: r,
        blockTag: i,
      },
      [s] = await R(e, G, `readContract`)(t);
    return s || null;
  } catch (e) {
    if (s) throw e;
    if (kr(e)) return null;
    throw e;
  }
}
async function ii(e, t) {
  let { blockNumber: n, blockTag: r, name: i } = t,
    { chain: a } = e,
    o = (() => {
      if (t.universalResolverAddress) return t.universalResolverAddress;
      if (!a)
        throw Error(
          `client chain not configured. universalResolverAddress is required.`,
        );
      return ve({ blockNumber: n, chain: a, contract: `ensUniversalResolver` });
    })(),
    s = a?.ensTlds;
  if (s && !s.some((e) => i.endsWith(e)))
    throw Error(
      `${i} is not a valid ENS TLD (${s?.join(`, `)}) for chain "${a.name}" (id: ${a.id}).`,
    );
  let [c] = await R(
    e,
    G,
    `readContract`,
  )({
    address: o,
    abi: [
      {
        inputs: [{ type: `bytes` }],
        name: `findResolver`,
        outputs: [
          { type: `address` },
          { type: `bytes32` },
          { type: `uint256` },
        ],
        stateMutability: `view`,
        type: `function`,
      },
    ],
    functionName: `findResolver`,
    args: [rt(Pr(i))],
    blockNumber: n,
    blockTag: r,
  });
  return c;
}
async function ai(e, t) {
  let {
      account: n = e.account,
      blockNumber: r,
      blockTag: i = `latest`,
      blobs: a,
      data: o,
      gas: s,
      gasPrice: c,
      maxFeePerBlobGas: u,
      maxFeePerGas: d,
      maxPriorityFeePerGas: f,
      to: p,
      value: m,
      ...h
    } = t,
    g = n ? E(n) : void 0;
  try {
    S(t);
    let n = (typeof r == `bigint` ? j(r) : void 0) || i,
      _ = e.chain?.formatters?.transactionRequest?.format,
      v = (_ || Se)(
        {
          ...l(h, { format: _ }),
          account: g,
          blobs: a,
          data: o,
          gas: s,
          gasPrice: c,
          maxFeePerBlobGas: u,
          maxFeePerGas: d,
          maxPriorityFeePerGas: f,
          to: p,
          value: m,
        },
        `createAccessList`,
      ),
      y = await e.request({ method: `eth_createAccessList`, params: [v, n] });
    if (y.error) throw new L(y.error, { details: y.error });
    return { accessList: y.accessList, gasUsed: BigInt(y.gasUsed) };
  } catch (n) {
    throw ne(n, { ...t, account: g, chain: e.chain });
  }
}
async function oi(e) {
  let t = wt(e, { method: `eth_newBlockFilter` }),
    n = await e.request({ method: `eth_newBlockFilter` });
  return { id: n, request: t(n), type: `block` };
}
async function si(
  e,
  {
    address: t,
    args: n,
    event: r,
    events: i,
    fromBlock: a,
    strict: o,
    toBlock: s,
  } = {},
) {
  let c = i ?? (r ? [r] : void 0),
    l = wt(e, { method: `eth_newFilter` }),
    u = [];
  c &&
    ((u = [c.flatMap((e) => St({ abi: [e], eventName: e.name, args: n }))]),
    r && (u = u[0]));
  let d = await e.request({
    method: `eth_newFilter`,
    params: [
      {
        address: t,
        fromBlock: typeof a == `bigint` ? j(a) : a,
        toBlock: typeof s == `bigint` ? j(s) : s,
        ...(u.length ? { topics: u } : {}),
      },
    ],
  });
  return {
    abi: c,
    args: n,
    eventName: r ? r.name : void 0,
    fromBlock: a,
    id: d,
    request: l(d),
    strict: !!o,
    toBlock: s,
    type: `event`,
  };
}
async function ci(e) {
  let t = wt(e, { method: `eth_newPendingTransactionFilter` }),
    n = await e.request({ method: `eth_newPendingTransactionFilter` });
  return { id: n, request: t(n), type: `transaction` };
}
async function li(
  e,
  {
    address: t,
    blockHash: n,
    blockNumber: r,
    blockTag: i = e.experimental_blockTag ?? `latest`,
    requireCanonical: a,
  },
) {
  let o = b({ blockHash: n, blockNumber: r, blockTag: i, requireCanonical: a });
  if (e.batch?.multicall && e.chain?.contracts?.multicall3) {
    let o = e.chain.contracts.multicall3.address,
      s = k({ abi: Oe, functionName: `getEthBalance`, args: [t] }),
      { data: c } = await R(
        e,
        fe,
        `call`,
      )({
        to: o,
        data: s,
        blockHash: n,
        blockNumber: r,
        blockTag: i,
        requireCanonical: a,
      });
    return x({
      abi: Oe,
      functionName: `getEthBalance`,
      args: [t],
      data: c || `0x`,
    });
  }
  let s = await e.request({ method: `eth_getBalance`, params: [t, o] });
  return BigInt(s);
}
async function ui(e) {
  let t = await e.request({ method: `eth_blobBaseFee` });
  return BigInt(t);
}
async function di(
  e,
  {
    blockHash: t,
    blockNumber: n,
    blockTag: r = e.experimental_blockTag ?? `latest`,
  } = {},
) {
  let i = n === void 0 ? void 0 : j(n),
    a = await e.request(
      { method: `eth_getBlockReceipts`, params: [t || i || r] },
      { dedupe: !!(t || i) },
    );
  if (!a) throw new Wt({ blockHash: t, blockNumber: n });
  let o = e.chain?.formatters?.transactionReceipt?.format || wr;
  return a.map((e) => o(e, `getBlockReceipts`));
}
async function fi(
  e,
  { blockHash: t, blockNumber: n, blockTag: r = `latest` } = {},
) {
  let i = n === void 0 ? void 0 : j(n),
    a;
  return (
    (a = t
      ? await e.request(
          { method: `eth_getBlockTransactionCountByHash`, params: [t] },
          { dedupe: !0 },
        )
      : await e.request(
          { method: `eth_getBlockTransactionCountByNumber`, params: [i || r] },
          { dedupe: !!i },
        )),
    M(a)
  );
}
async function pi(
  e,
  {
    address: t,
    blockHash: n,
    blockNumber: r,
    blockTag: i = `latest`,
    requireCanonical: a,
  },
) {
  let o = b({ blockHash: n, blockNumber: r, blockTag: i, requireCanonical: a }),
    s = await e.request(
      { method: `eth_getCode`, params: [t, o] },
      { dedupe: typeof r == `bigint` || n !== void 0 },
    );
  if (s !== `0x`) return s;
}
async function mi(e, { address: t, blockNumber: n, blockTag: r = `latest` }) {
  let i = await pi(e, {
    address: t,
    ...(n === void 0 ? { blockTag: r } : { blockNumber: n }),
  });
  if (i && Xe(i) === 23 && i.startsWith(`0xef0100`)) return Re(Ue(i, 3, 23));
}
var hi = class extends L {
  constructor({ address: e }) {
    super(`No EIP-712 domain found on contract "${e}".`, {
      metaMessages: [
        `Ensure that:`,
        `- The contract is deployed at the address "${e}".`,
        "- `eip712Domain()` function exists on the contract.",
        "- `eip712Domain()` function matches signature to ERC-5267 specification.",
      ],
      name: `Eip712DomainNotFoundError`,
    });
  }
};
async function gi(e, t) {
  let { address: n, factory: r, factoryData: i } = t;
  try {
    let [t, a, o, s, c, l, u] = await R(
      e,
      G,
      `readContract`,
    )({
      abi: _i,
      address: n,
      functionName: `eip712Domain`,
      factory: r,
      factoryData: i,
    });
    return {
      domain: {
        name: a,
        version: o,
        chainId: Number(s),
        verifyingContract: c,
        salt: l,
      },
      extensions: u,
      fields: t,
    };
  } catch (e) {
    let t = e;
    throw t.name === `ContractFunctionExecutionError` &&
      t.cause.name === `ContractFunctionZeroDataError`
      ? new hi({ address: n })
      : t;
  }
}
var _i = [
  {
    inputs: [],
    name: `eip712Domain`,
    outputs: [
      { name: `fields`, type: `bytes1` },
      { name: `name`, type: `string` },
      { name: `version`, type: `string` },
      { name: `chainId`, type: `uint256` },
      { name: `verifyingContract`, type: `address` },
      { name: `salt`, type: `bytes32` },
      { name: `extensions`, type: `uint256[]` },
    ],
    stateMutability: `view`,
    type: `function`,
  },
];
function vi(e) {
  return {
    baseFeePerGas: e.baseFeePerGas.map((e) => BigInt(e)),
    gasUsedRatio: e.gasUsedRatio,
    oldestBlock: BigInt(e.oldestBlock),
    reward: e.reward?.map((e) => e.map((e) => BigInt(e))),
  };
}
async function yi(
  e,
  {
    blockCount: t,
    blockNumber: n,
    blockTag: r = `latest`,
    rewardPercentiles: i,
  },
) {
  let a = typeof n == `bigint` ? j(n) : void 0;
  return vi(
    await e.request(
      { method: `eth_feeHistory`, params: [j(t), a || r, i] },
      { dedupe: !!a },
    ),
  );
}
async function bi(e, { filter: t }) {
  let n = t.strict ?? !1,
    r = (await t.request({ method: `eth_getFilterLogs`, params: [t.id] })).map(
      (e) => V(e),
    );
  return t.abi ? Nn({ abi: t.abi, logs: r, strict: n }) : r;
}
async function xi({ address: e, authorization: t, signature: n }) {
  return s(Re(e), await Lt({ authorization: t, signature: n }));
}
function Si(e) {
  let t = { formatters: void 0, fees: void 0, serializers: void 0, ...e };
  function n(e) {
    return (t) => {
      let r = typeof t == `function` ? t(e) : t,
        i = { ...e, ...r };
      return Object.assign(i, { extend: n(i) });
    };
  }
  return Object.assign(t, { extend: n(t) });
}
var Ci = `1.3.0`,
  q = class e extends Error {
    constructor(t, n = {}) {
      let r =
          n.cause instanceof e
            ? n.cause.details
            : n.cause?.message
              ? n.cause.message
              : n.details,
        i = (n.cause instanceof e && n.cause.docsPath) || n.docsPath,
        a = [
          t || `An error occurred.`,
          ``,
          ...(n.metaMessages ? [...n.metaMessages, ``] : []),
          ...(i ? [`Docs: https://abitype.dev${i}`] : []),
          ...(r ? [`Details: ${r}`] : []),
          `Version: abitype@${Ci}`,
        ].join(`
`);
      (super(a),
        Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "docsPath", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "metaMessages", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `AbiTypeError`,
        }),
        n.cause && (this.cause = n.cause),
        (this.details = r),
        (this.docsPath = i),
        (this.metaMessages = n.metaMessages),
        (this.shortMessage = t));
    }
  };
function J(e, t) {
  return e.exec(t)?.groups;
}
var wi = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
  Ti =
    /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/,
  Ei = /^\(.+?\).*?$/,
  Di = /^tuple(?<array>(\[(\d*)\])*)$/;
function Oi(e) {
  let t = e.type;
  if (Di.test(e.type) && `components` in e) {
    t = `(`;
    let n = e.components.length;
    for (let r = 0; r < n; r++) {
      let i = e.components[r];
      ((t += Oi(i)), r < n - 1 && (t += `, `));
    }
    let r = J(Di, e.type);
    return ((t += `)${r?.array || ``}`), Oi({ ...e, type: t }));
  }
  return (
    `indexed` in e && e.indexed && (t = `${t} indexed`),
    e.name ? `${t} ${e.name}` : t
  );
}
function ki(e) {
  let t = ``,
    n = e.length;
  for (let r = 0; r < n; r++) {
    let i = e[r];
    ((t += Oi(i)), r !== n - 1 && (t += `, `));
  }
  return t;
}
function Ai(e) {
  return e.type === `function`
    ? `function ${e.name}(${ki(e.inputs)})${e.stateMutability && e.stateMutability !== `nonpayable` ? ` ${e.stateMutability}` : ``}${e.outputs?.length ? ` returns (${ki(e.outputs)})` : ``}`
    : e.type === `event`
      ? `event ${e.name}(${ki(e.inputs)})`
      : e.type === `error`
        ? `error ${e.name}(${ki(e.inputs)})`
        : e.type === `constructor`
          ? `constructor(${ki(e.inputs)})${e.stateMutability === `payable` ? ` payable` : ``}`
          : e.type === `fallback`
            ? `fallback() external${e.stateMutability === `payable` ? ` payable` : ``}`
            : `receive() external payable`;
}
var ji = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function Mi(e) {
  return ji.test(e);
}
function Ni(e) {
  return J(ji, e);
}
var Pi = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function Fi(e) {
  return Pi.test(e);
}
function Ii(e) {
  return J(Pi, e);
}
var Li =
  /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function Ri(e) {
  return Li.test(e);
}
function zi(e) {
  return J(Li, e);
}
var Bi = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function Vi(e) {
  return Bi.test(e);
}
function Hi(e) {
  return J(Bi, e);
}
var Ui =
  /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function Wi(e) {
  return Ui.test(e);
}
function Gi(e) {
  return J(Ui, e);
}
var Ki = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
function qi(e) {
  return Ki.test(e);
}
function Ji(e) {
  return J(Ki, e);
}
var Yi = /^receive\(\) external payable$/;
function Xi(e) {
  return Yi.test(e);
}
var Zi = new Set([`memory`, `indexed`, `storage`, `calldata`]),
  Qi = new Set([`indexed`]),
  $i = new Set([`calldata`, `memory`, `storage`]),
  ea = class extends q {
    constructor({ signature: e }) {
      (super(`Failed to parse ABI item.`, {
        details: `parseAbiItem(${JSON.stringify(e, null, 2)})`,
        docsPath: `/api/human#parseabiitem-1`,
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `InvalidAbiItemError`,
        }));
    }
  },
  ta = class extends q {
    constructor({ type: e }) {
      (super(`Unknown type.`, {
        metaMessages: [
          `Type "${e}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `UnknownTypeError`,
        }));
    }
  },
  na = class extends q {
    constructor({ type: e }) {
      (super(`Unknown type.`, {
        metaMessages: [`Type "${e}" is not a valid ABI type.`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `UnknownSolidityTypeError`,
        }));
    }
  },
  ra = class extends q {
    constructor({ params: e }) {
      (super(`Failed to parse ABI parameters.`, {
        details: `parseAbiParameters(${JSON.stringify(e, null, 2)})`,
        docsPath: `/api/human#parseabiparameters-1`,
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `InvalidAbiParametersError`,
        }));
    }
  },
  ia = class extends q {
    constructor({ param: e }) {
      (super(`Invalid ABI parameter.`, { details: e }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `InvalidParameterError`,
        }));
    }
  },
  aa = class extends q {
    constructor({ param: e, name: t }) {
      (super(`Invalid ABI parameter.`, {
        details: e,
        metaMessages: [
          `"${t}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `SolidityProtectedKeywordError`,
        }));
    }
  },
  oa = class extends q {
    constructor({ param: e, type: t, modifier: n }) {
      (super(`Invalid ABI parameter.`, {
        details: e,
        metaMessages: [
          `Modifier "${n}" not allowed${t ? ` in "${t}" type` : ``}.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `InvalidModifierError`,
        }));
    }
  },
  sa = class extends q {
    constructor({ param: e, type: t, modifier: n }) {
      (super(`Invalid ABI parameter.`, {
        details: e,
        metaMessages: [
          `Modifier "${n}" not allowed${t ? ` in "${t}" type` : ``}.`,
          `Data location can only be specified for array, struct, or mapping types, but "${n}" was given.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `InvalidFunctionModifierError`,
        }));
    }
  },
  ca = class extends q {
    constructor({ abiParameter: e }) {
      (super(`Invalid ABI parameter.`, {
        details: JSON.stringify(e, null, 2),
        metaMessages: [`ABI parameter type is invalid.`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `InvalidAbiTypeParameterError`,
        }));
    }
  },
  la = class extends q {
    constructor({ signature: e, type: t }) {
      (super(`Invalid ${t} signature.`, { details: e }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `InvalidSignatureError`,
        }));
    }
  },
  ua = class extends q {
    constructor({ signature: e }) {
      (super(`Unknown signature.`, { details: e }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `UnknownSignatureError`,
        }));
    }
  },
  da = class extends q {
    constructor({ signature: e }) {
      (super(`Invalid struct signature.`, {
        details: e,
        metaMessages: [`No properties exist.`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `InvalidStructSignatureError`,
        }));
    }
  },
  fa = class extends q {
    constructor({ type: e }) {
      (super(`Circular reference detected.`, {
        metaMessages: [`Struct "${e}" is a circular reference.`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `CircularReferenceError`,
        }));
    }
  },
  pa = class extends q {
    constructor({ current: e, depth: t }) {
      (super(`Unbalanced parentheses.`, {
        metaMessages: [
          `"${e.trim()}" has too many ${t > 0 ? `opening` : `closing`} parentheses.`,
        ],
        details: `Depth "${t}"`,
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `InvalidParenthesisError`,
        }));
    }
  };
function ma(e, t, n) {
  let r = ``;
  if (n)
    for (let e of Object.entries(n)) {
      if (!e) continue;
      let t = ``;
      for (let n of e[1]) t += `[${n.type}${n.name ? `:${n.name}` : ``}]`;
      r += `(${e[0]}{${t}})`;
    }
  return t ? `${t}:${e}${r}` : `${e}${r}`;
}
var ha = new Map([
  [`address`, { type: `address` }],
  [`bool`, { type: `bool` }],
  [`bytes`, { type: `bytes` }],
  [`bytes32`, { type: `bytes32` }],
  [`int`, { type: `int256` }],
  [`int256`, { type: `int256` }],
  [`string`, { type: `string` }],
  [`uint`, { type: `uint256` }],
  [`uint8`, { type: `uint8` }],
  [`uint16`, { type: `uint16` }],
  [`uint24`, { type: `uint24` }],
  [`uint32`, { type: `uint32` }],
  [`uint64`, { type: `uint64` }],
  [`uint96`, { type: `uint96` }],
  [`uint112`, { type: `uint112` }],
  [`uint160`, { type: `uint160` }],
  [`uint192`, { type: `uint192` }],
  [`uint256`, { type: `uint256` }],
  [`address owner`, { type: `address`, name: `owner` }],
  [`address to`, { type: `address`, name: `to` }],
  [`bool approved`, { type: `bool`, name: `approved` }],
  [`bytes _data`, { type: `bytes`, name: `_data` }],
  [`bytes data`, { type: `bytes`, name: `data` }],
  [`bytes signature`, { type: `bytes`, name: `signature` }],
  [`bytes32 hash`, { type: `bytes32`, name: `hash` }],
  [`bytes32 r`, { type: `bytes32`, name: `r` }],
  [`bytes32 root`, { type: `bytes32`, name: `root` }],
  [`bytes32 s`, { type: `bytes32`, name: `s` }],
  [`string name`, { type: `string`, name: `name` }],
  [`string symbol`, { type: `string`, name: `symbol` }],
  [`string tokenURI`, { type: `string`, name: `tokenURI` }],
  [`uint tokenId`, { type: `uint256`, name: `tokenId` }],
  [`uint8 v`, { type: `uint8`, name: `v` }],
  [`uint256 balance`, { type: `uint256`, name: `balance` }],
  [`uint256 tokenId`, { type: `uint256`, name: `tokenId` }],
  [`uint256 value`, { type: `uint256`, name: `value` }],
  [
    `event:address indexed from`,
    { type: `address`, name: `from`, indexed: !0 },
  ],
  [`event:address indexed to`, { type: `address`, name: `to`, indexed: !0 }],
  [
    `event:uint indexed tokenId`,
    { type: `uint256`, name: `tokenId`, indexed: !0 },
  ],
  [
    `event:uint256 indexed tokenId`,
    { type: `uint256`, name: `tokenId`, indexed: !0 },
  ],
]);
function ga(e, t = {}) {
  if (Ri(e)) return _a(e, t);
  if (Fi(e)) return va(e, t);
  if (Mi(e)) return ya(e, t);
  if (Wi(e)) return ba(e, t);
  if (qi(e)) return xa(e);
  if (Xi(e)) return { type: `receive`, stateMutability: `payable` };
  throw new ua({ signature: e });
}
function _a(e, t = {}) {
  let n = zi(e);
  if (!n) throw new la({ signature: e, type: `function` });
  let r = X(n.parameters),
    i = [],
    a = r.length;
  for (let e = 0; e < a; e++)
    i.push(Y(r[e], { modifiers: $i, structs: t, type: `function` }));
  let o = [];
  if (n.returns) {
    let e = X(n.returns),
      r = e.length;
    for (let n = 0; n < r; n++)
      o.push(Y(e[n], { modifiers: $i, structs: t, type: `function` }));
  }
  return {
    name: n.name,
    type: `function`,
    stateMutability: n.stateMutability ?? `nonpayable`,
    inputs: i,
    outputs: o,
  };
}
function va(e, t = {}) {
  let n = Ii(e);
  if (!n) throw new la({ signature: e, type: `event` });
  let r = X(n.parameters),
    i = [],
    a = r.length;
  for (let e = 0; e < a; e++)
    i.push(Y(r[e], { modifiers: Qi, structs: t, type: `event` }));
  return { name: n.name, type: `event`, inputs: i };
}
function ya(e, t = {}) {
  let n = Ni(e);
  if (!n) throw new la({ signature: e, type: `error` });
  let r = X(n.parameters),
    i = [],
    a = r.length;
  for (let e = 0; e < a; e++) i.push(Y(r[e], { structs: t, type: `error` }));
  return { name: n.name, type: `error`, inputs: i };
}
function ba(e, t = {}) {
  let n = Gi(e);
  if (!n) throw new la({ signature: e, type: `constructor` });
  let r = X(n.parameters),
    i = [],
    a = r.length;
  for (let e = 0; e < a; e++)
    i.push(Y(r[e], { structs: t, type: `constructor` }));
  return {
    type: `constructor`,
    stateMutability: n.stateMutability ?? `nonpayable`,
    inputs: i,
  };
}
function xa(e) {
  let t = Ji(e);
  if (!t) throw new la({ signature: e, type: `fallback` });
  return {
    type: `fallback`,
    stateMutability: t.stateMutability ?? `nonpayable`,
  };
}
var Sa =
    /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  Ca =
    /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  wa = /^u?int$/;
function Y(e, t) {
  let n = ma(e, t?.type, t?.structs);
  if (ha.has(n)) return ha.get(n);
  let r = Ei.test(e),
    i = J(r ? Ca : Sa, e);
  if (!i) throw new ia({ param: e });
  if (i.name && Da(i.name)) throw new aa({ param: e, name: i.name });
  let a = i.name ? { name: i.name } : {},
    o = i.modifier === `indexed` ? { indexed: !0 } : {},
    s = t?.structs ?? {},
    c,
    l = {};
  if (r) {
    c = `tuple`;
    let e = X(i.type),
      t = [],
      n = e.length;
    for (let r = 0; r < n; r++) t.push(Y(e[r], { structs: s }));
    l = { components: t };
  } else if (i.type in s) ((c = `tuple`), (l = { components: s[i.type] }));
  else if (wa.test(i.type)) c = `${i.type}256`;
  else if (i.type === `address payable`) c = `address`;
  else if (((c = i.type), t?.type !== `struct` && !Ta(c)))
    throw new na({ type: c });
  if (i.modifier) {
    if (!t?.modifiers?.has?.(i.modifier))
      throw new oa({ param: e, type: t?.type, modifier: i.modifier });
    if ($i.has(i.modifier) && !Oa(c, !!i.array))
      throw new sa({ param: e, type: t?.type, modifier: i.modifier });
  }
  let u = { type: `${c}${i.array ?? ``}`, ...a, ...o, ...l };
  return (ha.set(n, u), u);
}
function X(e, t = [], n = ``, r = 0) {
  let i = e.trim().length;
  for (let a = 0; a < i; a++) {
    let i = e[a],
      o = e.slice(a + 1);
    switch (i) {
      case `,`:
        return r === 0 ? X(o, [...t, n.trim()]) : X(o, t, `${n}${i}`, r);
      case `(`:
        return X(o, t, `${n}${i}`, r + 1);
      case `)`:
        return X(o, t, `${n}${i}`, r - 1);
      default:
        return X(o, t, `${n}${i}`, r);
    }
  }
  if (n === ``) return t;
  if (r !== 0) throw new pa({ current: n, depth: r });
  return (t.push(n.trim()), t);
}
function Ta(e) {
  return (
    e === `address` ||
    e === `bool` ||
    e === `function` ||
    e === `string` ||
    wi.test(e) ||
    Ti.test(e)
  );
}
var Ea =
  /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function Da(e) {
  return (
    e === `address` ||
    e === `bool` ||
    e === `function` ||
    e === `string` ||
    e === `tuple` ||
    wi.test(e) ||
    Ti.test(e) ||
    Ea.test(e)
  );
}
function Oa(e, t) {
  return t || e === `bytes` || e === `string` || e === `tuple`;
}
function ka(e) {
  let t = {},
    n = e.length;
  for (let r = 0; r < n; r++) {
    let n = e[r];
    if (!Vi(n)) continue;
    let i = Hi(n);
    if (!i) throw new la({ signature: n, type: `struct` });
    let a = i.properties.split(`;`),
      o = [],
      s = a.length;
    for (let e = 0; e < s; e++) {
      let t = a[e].trim();
      if (!t) continue;
      let n = Y(t, { type: `struct` });
      o.push(n);
    }
    if (!o.length) throw new da({ signature: n });
    t[i.name] = o;
  }
  let r = {},
    i = Object.entries(t),
    a = i.length;
  for (let e = 0; e < a; e++) {
    let [n, a] = i[e];
    r[n] = ja(a, t);
  }
  return r;
}
var Aa = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function ja(e = [], t = {}, n = new Set()) {
  let r = [],
    i = e.length;
  for (let a = 0; a < i; a++) {
    let i = e[a];
    if (Ei.test(i.type)) r.push(i);
    else {
      let e = J(Aa, i.type);
      if (!e?.type) throw new ca({ abiParameter: i });
      let { array: a, type: o } = e;
      if (o in t) {
        if (n.has(o)) throw new fa({ type: o });
        r.push({
          ...i,
          type: `tuple${a ?? ``}`,
          components: ja(t[o], t, new Set([...n, o])),
        });
      } else if (Ta(o)) r.push(i);
      else throw new ta({ type: o });
    }
  }
  return r;
}
function Ma(e) {
  let t;
  if (typeof e == `string`) t = ga(e);
  else {
    let n = ka(e),
      r = e.length;
    for (let i = 0; i < r; i++) {
      let r = e[i];
      if (!Vi(r)) {
        t = ga(r, n);
        break;
      }
    }
  }
  if (!t) throw new ea({ signature: e });
  return t;
}
function Na(e) {
  let t = [];
  if (typeof e == `string`) {
    let n = X(e),
      r = n.length;
    for (let e = 0; e < r; e++) t.push(Y(n[e], { modifiers: Zi }));
  } else {
    let n = ka(e),
      r = e.length;
    for (let i = 0; i < r; i++) {
      let r = e[i];
      if (Vi(r)) continue;
      let a = X(r),
        o = a.length;
      for (let e = 0; e < o; e++)
        t.push(Y(a[e], { modifiers: Zi, structs: n }));
    }
  }
  if (t.length === 0) throw new ra({ params: e });
  return t;
}
var Pa = {
  checksum: new (class extends Map {
    constructor(e) {
      (super(),
        Object.defineProperty(this, "maxSize", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.maxSize = e));
    }
    get(e) {
      let t = super.get(e);
      return (
        super.has(e) && t !== void 0 && (this.delete(e), super.set(e, t)),
        t
      );
    }
    set(e, t) {
      if ((super.set(e, t), this.maxSize && this.size > this.maxSize)) {
        let e = this.keys().next().value;
        e && this.delete(e);
      }
      return this;
    }
  })(8192),
}.checksum;
function Fa(e, t = {}) {
  let { as: n = typeof e == `string` ? `Hex` : `Bytes` } = t,
    r = Ie(Gn(e));
  return n === `Bytes` ? r : i(r);
}
var Ia = /^0x[a-fA-F0-9]{40}$/;
function La(e, t = {}) {
  let { strict: n = !0 } = t;
  if (!Ia.test(e)) throw new Ba({ address: e, cause: new Va() });
  if (n) {
    if (e.toLowerCase() === e) return;
    if (Ra(e) !== e) throw new Ba({ address: e, cause: new Ha() });
  }
}
function Ra(e) {
  if (Pa.has(e)) return Pa.get(e);
  La(e, { strict: !1 });
  let t = e.substring(2).toLowerCase(),
    n = Fa(Jn(t), { as: `Bytes` }),
    r = t.split(``);
  for (let e = 0; e < 40; e += 2)
    (n[e >> 1] >> 4 >= 8 && r[e] && (r[e] = r[e].toUpperCase()),
      (n[e >> 1] & 15) >= 8 && r[e + 1] && (r[e + 1] = r[e + 1].toUpperCase()));
  let i = `0x${r.join(``)}`;
  return (Pa.set(e, i), i);
}
function za(e, t = {}) {
  let { strict: n = !0 } = t ?? {};
  try {
    return (La(e, { strict: n }), !0);
  } catch {
    return !1;
  }
}
var Ba = class extends O {
    constructor({ address: e, cause: t }) {
      (super(`Address "${e}" is invalid.`, { cause: t }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Address.InvalidAddressError`,
        }));
    }
  },
  Va = class extends O {
    constructor() {
      (super(`Address is not a 20 byte (40 hexadecimal character) value.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Address.InvalidInputError`,
        }));
    }
  },
  Ha = class extends O {
    constructor() {
      (super(`Address does not match its checksum counterpart.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Address.InvalidChecksumError`,
        }));
    }
  },
  Ua = /^(.*)\[([0-9]*)\]$/,
  Wa = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
  Ga =
    /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
(2n ** (8n - 1n) - 1n,
  2n ** (16n - 1n) - 1n,
  2n ** (24n - 1n) - 1n,
  2n ** (32n - 1n) - 1n,
  2n ** (40n - 1n) - 1n,
  2n ** (48n - 1n) - 1n,
  2n ** (56n - 1n) - 1n,
  2n ** (64n - 1n) - 1n,
  2n ** (72n - 1n) - 1n,
  2n ** (80n - 1n) - 1n,
  2n ** (88n - 1n) - 1n,
  2n ** (96n - 1n) - 1n,
  2n ** (104n - 1n) - 1n,
  2n ** (112n - 1n) - 1n,
  2n ** (120n - 1n) - 1n,
  2n ** (128n - 1n) - 1n,
  2n ** (136n - 1n) - 1n,
  2n ** (144n - 1n) - 1n,
  2n ** (152n - 1n) - 1n,
  2n ** (160n - 1n) - 1n,
  2n ** (168n - 1n) - 1n,
  2n ** (176n - 1n) - 1n,
  2n ** (184n - 1n) - 1n,
  2n ** (192n - 1n) - 1n,
  2n ** (200n - 1n) - 1n,
  2n ** (208n - 1n) - 1n,
  2n ** (216n - 1n) - 1n,
  2n ** (224n - 1n) - 1n,
  2n ** (232n - 1n) - 1n,
  2n ** (240n - 1n) - 1n,
  2n ** (248n - 1n) - 1n,
  2n ** (256n - 1n) - 1n,
  -(2n ** (8n - 1n)),
  -(2n ** (16n - 1n)),
  -(2n ** (24n - 1n)),
  -(2n ** (32n - 1n)),
  -(2n ** (40n - 1n)),
  -(2n ** (48n - 1n)),
  -(2n ** (56n - 1n)),
  -(2n ** (64n - 1n)),
  -(2n ** (72n - 1n)),
  -(2n ** (80n - 1n)),
  -(2n ** (88n - 1n)),
  -(2n ** (96n - 1n)),
  -(2n ** (104n - 1n)),
  -(2n ** (112n - 1n)),
  -(2n ** (120n - 1n)),
  -(2n ** (128n - 1n)),
  -(2n ** (136n - 1n)),
  -(2n ** (144n - 1n)),
  -(2n ** (152n - 1n)),
  -(2n ** (160n - 1n)),
  -(2n ** (168n - 1n)),
  -(2n ** (176n - 1n)),
  -(2n ** (184n - 1n)),
  -(2n ** (192n - 1n)),
  -(2n ** (200n - 1n)),
  -(2n ** (208n - 1n)),
  -(2n ** (216n - 1n)),
  -(2n ** (224n - 1n)),
  -(2n ** (232n - 1n)),
  -(2n ** (240n - 1n)),
  -(2n ** (248n - 1n)),
  -(2n ** (256n - 1n)));
var Ka = 2n ** 256n - 1n;
function qa(e, t, n) {
  let { checksumAddress: r, staticPosition: i } = n,
    a = mo(t.type);
  if (a) {
    let [n, o] = a;
    return Za(
      e,
      { ...t, type: o },
      { checksumAddress: r, length: n, staticPosition: i },
    );
  }
  if (t.type === `tuple`)
    return to(e, t, { checksumAddress: r, staticPosition: i });
  if (t.type === `address`) return Xa(e, { checksum: r });
  if (t.type === `bool`) return Qa(e);
  if (t.type.startsWith(`bytes`)) return $a(e, t, { staticPosition: i });
  if (t.type.startsWith(`uint`) || t.type.startsWith(`int`)) return eo(e, t);
  if (t.type === `string`) return no(e, { staticPosition: i });
  throw new jo(t.type);
}
var Ja = 32,
  Ya = 32;
function Xa(e, t = {}) {
  let { checksum: n = !1 } = t,
    r = e.readBytes(32);
  return [((e) => (n ? Ra(e) : e))(i(Xn(r, -20))), 32];
}
function Za(e, t, n) {
  let { checksumAddress: r, length: i, staticPosition: a } = n;
  if (i === null) {
    let n = a + W(e.readBytes(Ya)),
      i = n + Ja;
    e.setPosition(n);
    let o = W(e.readBytes(Ja)),
      s = ho(t),
      c = 0,
      l = [];
    for (let n = 0; n < o; ++n) {
      e.setPosition(i + (s ? n * 32 : c));
      let [a, o] = qa(e, t, { checksumAddress: r, staticPosition: i });
      ((c += o), l.push(a), o === 0 && (e.assertReadLimit(), e._touch()));
    }
    return (e.setPosition(a + 32), [l, 32]);
  }
  if (ho(t)) {
    let n = a + W(e.readBytes(Ya)),
      o = [];
    for (let a = 0; a < i; ++a) {
      e.setPosition(n + a * 32);
      let [i] = qa(e, t, { checksumAddress: r, staticPosition: n });
      o.push(i);
    }
    return (e.setPosition(a + 32), [o, 32]);
  }
  let o = 0,
    s = [];
  for (let n = 0; n < i; ++n) {
    let [n, i] = qa(e, t, { checksumAddress: r, staticPosition: a + o });
    ((o += i), s.push(n), i === 0 && (e.assertReadLimit(), e._touch()));
  }
  return [s, o];
}
function Qa(e) {
  return [Qn(e.readBytes(32), { size: 32 }), 32];
}
function $a(e, t, { staticPosition: n }) {
  let [r, a] = t.type.split(`bytes`);
  if (!a) {
    let t = W(e.readBytes(32));
    e.setPosition(n + t);
    let r = W(e.readBytes(32));
    if (r === 0) return (e.setPosition(n + 32), [`0x`, 32]);
    let a = e.readBytes(r);
    return (e.setPosition(n + 32), [i(a), 32]);
  }
  return [i(e.readBytes(Number.parseInt(a, 10), 32)), 32];
}
function eo(e, t) {
  let n = t.type.startsWith(`int`),
    r = Number.parseInt(t.type.split(`int`)[1] || `256`, 10),
    i = e.readBytes(32);
  return [r > 48 ? Zn(i, { signed: n }) : W(i, { signed: n }), 32];
}
function to(e, t, n) {
  let { checksumAddress: r, staticPosition: i } = n,
    a = t.components.length === 0 || t.components.some(({ name: e }) => !e),
    o = a ? [] : {},
    s = 0;
  if (ho(t)) {
    let n = i + W(e.readBytes(Ya));
    for (let i = 0; i < t.components.length; ++i) {
      let c = t.components[i];
      e.setPosition(n + s);
      let [l, u] = qa(e, c, { checksumAddress: r, staticPosition: n });
      ((s += u), (o[a ? i : c?.name] = l));
    }
    return (e.setPosition(i + 32), [o, 32]);
  }
  for (let n = 0; n < t.components.length; ++n) {
    let c = t.components[n],
      [l, u] = qa(e, c, { checksumAddress: r, staticPosition: i });
    ((o[a ? n : c?.name] = l), (s += u));
  }
  return [o, s];
}
function no(e, { staticPosition: t }) {
  let n = t + W(e.readBytes(32));
  e.setPosition(n);
  let r = W(e.readBytes(32));
  if (r === 0) return (e.setPosition(t + 32), [``, 32]);
  let i = $n(er(e.readBytes(r, 32)));
  return (e.setPosition(t + 32), [i, 32]);
}
function ro({ checksumAddress: e, parameters: t, values: n }) {
  let r = [];
  for (let i = 0; i < t.length; i++)
    r.push(io({ checksumAddress: e, parameter: t[i], value: n[i] }));
  return r;
}
function io({ checksumAddress: e = !1, parameter: t, value: n }) {
  let r = t,
    i = mo(r.type);
  if (i) {
    let [t, a] = i;
    return so(n, {
      checksumAddress: e,
      length: t,
      parameter: { ...r, type: a },
    });
  }
  if (r.type === `tuple`) return po(n, { checksumAddress: e, parameter: r });
  if (r.type === `address`) return oo(n, { checksum: e });
  if (r.type === `bool`) return lo(n);
  if (r.type.startsWith(`uint`) || r.type.startsWith(`int`)) {
    let e = r.type.startsWith(`int`),
      [, , t = `256`] = Ga.exec(r.type) ?? [];
    return uo(n, { signed: e, size: Number(t) });
  }
  if (r.type.startsWith(`bytes`)) return co(n, { type: r.type });
  if (r.type === `string`) return fo(n);
  throw new jo(r.type);
}
function ao(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    let { dynamic: r, encoded: i } = e[n];
    t += r ? 32 : f(i);
  }
  let n = [],
    r = [],
    i = 0;
  for (let a = 0; a < e.length; a++) {
    let { dynamic: o, encoded: s } = e[a];
    o ? (n.push(m(t + i, { size: 32 })), r.push(s), (i += f(s))) : n.push(s);
  }
  return D(...n, ...r);
}
function oo(e, t) {
  let { checksum: r = !1 } = t;
  return (La(e, { strict: r }), { dynamic: !1, encoded: n(e.toLowerCase()) });
}
function so(e, t) {
  let { checksumAddress: n, length: r, parameter: i } = t,
    a = r === null;
  if (!Array.isArray(e)) throw new Ao(e);
  if (!a && e.length !== r)
    throw new Do({
      expectedLength: r,
      givenLength: e.length,
      type: `${i.type}[${r}]`,
    });
  let o = e.length === 0 && ho(i),
    s = [];
  for (let t = 0; t < e.length; t++) {
    let r = io({ checksumAddress: n, parameter: i, value: e[t] });
    (r.dynamic && (o = !0), s.push(r));
  }
  if (a || o) {
    let e = ao(s);
    if (a) {
      let t = m(s.length, { size: 32 });
      return { dynamic: !0, encoded: s.length > 0 ? D(t, e) : t };
    }
    if (o) return { dynamic: !0, encoded: e };
  }
  return { dynamic: !1, encoded: D(...s.map(({ encoded: e }) => e)) };
}
function co(e, { type: t }) {
  let [, r] = t.split(`bytes`),
    i = f(e);
  if (!r) {
    let t = e;
    return (
      i % 32 != 0 && (t = pe(t, Math.ceil((e.length - 2) / 2 / 32) * 32)),
      { dynamic: !0, encoded: D(n(m(i, { size: 32 })), t) }
    );
  }
  if (i !== Number.parseInt(r, 10))
    throw new Oo({ expectedSize: Number.parseInt(r, 10), value: e });
  return { dynamic: !1, encoded: pe(e) };
}
function lo(e) {
  if (typeof e != `boolean`)
    throw new O(
      `Invalid boolean value: "${e}" (type: ${typeof e}). Expected: \`true\` or \`false\`.`,
    );
  return { dynamic: !1, encoded: n(a(e)) };
}
function uo(e, { signed: t, size: n }) {
  if (typeof n == `number`) {
    let i = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n,
      a = t ? -i - 1n : 0n;
    if (e > i || e < a)
      throw new r({
        max: i.toString(),
        min: a.toString(),
        signed: t,
        size: n / 8,
        value: e.toString(),
      });
  }
  return { dynamic: !1, encoded: m(e, { size: 32, signed: t }) };
}
function fo(e) {
  let t = me(e),
    n = Math.ceil(f(t) / 32),
    r = [];
  for (let e = 0; e < n; e++) r.push(pe(p(t, e * 32, (e + 1) * 32)));
  return { dynamic: !0, encoded: D(pe(m(f(t), { size: 32 })), ...r) };
}
function po(e, t) {
  let { checksumAddress: n, parameter: r } = t,
    i = !1,
    a = [];
  for (let t = 0; t < r.components.length; t++) {
    let o = r.components[t],
      s = io({
        checksumAddress: n,
        parameter: o,
        value: e[Array.isArray(e) ? t : o.name],
      });
    (a.push(s), s.dynamic && (i = !0));
  }
  return {
    dynamic: i,
    encoded: i ? ao(a) : D(...a.map(({ encoded: e }) => e)),
  };
}
function mo(e) {
  let t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
}
function ho(e) {
  let { type: t } = e;
  if (t === `string` || t === `bytes` || t.endsWith(`[]`)) return !0;
  if (t === `tuple`) return e.components?.some(ho);
  let n = mo(e.type);
  return !!(n && ho({ ...e, type: n[1] }));
}
var go = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: 1 / 0,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new bo({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit,
      });
  },
  assertPosition(e) {
    if (e < 0 || e > this.bytes.length - 1)
      throw new yo({ length: this.bytes.length, position: e });
  },
  decrementPosition(e) {
    if (e < 0) throw new vo({ offset: e });
    let t = this.position - e;
    (this.assertPosition(t), (this.position = t));
  },
  getReadCount(e) {
    return this.positionReadCount.get(e || this.position) || 0;
  },
  incrementPosition(e) {
    if (e < 0) throw new vo({ offset: e });
    let t = this.position + e;
    (this.assertPosition(t), (this.position = t));
  },
  inspectByte(e) {
    let t = e ?? this.position;
    return (this.assertPosition(t), this.bytes[t]);
  },
  inspectBytes(e, t) {
    let n = t ?? this.position;
    return (this.assertPosition(n + e - 1), this.bytes.subarray(n, n + e));
  },
  inspectUint8(e) {
    let t = e ?? this.position;
    return (this.assertPosition(t), this.bytes[t]);
  },
  inspectUint16(e) {
    let t = e ?? this.position;
    return (this.assertPosition(t + 1), this.dataView.getUint16(t));
  },
  inspectUint24(e) {
    let t = e ?? this.position;
    return (
      this.assertPosition(t + 2),
      (this.dataView.getUint16(t) << 8) + this.dataView.getUint8(t + 2)
    );
  },
  inspectUint32(e) {
    let t = e ?? this.position;
    return (this.assertPosition(t + 3), this.dataView.getUint32(t));
  },
  pushByte(e) {
    (this.assertPosition(this.position),
      (this.bytes[this.position] = e),
      this.position++);
  },
  pushBytes(e) {
    (this.assertPosition(this.position + e.length - 1),
      this.bytes.set(e, this.position),
      (this.position += e.length));
  },
  pushUint8(e) {
    (this.assertPosition(this.position),
      (this.bytes[this.position] = e),
      this.position++);
  },
  pushUint16(e) {
    (this.assertPosition(this.position + 1),
      this.dataView.setUint16(this.position, e),
      (this.position += 2));
  },
  pushUint24(e) {
    (this.assertPosition(this.position + 2),
      this.dataView.setUint16(this.position, e >> 8),
      this.dataView.setUint8(this.position + 2, e & 255),
      (this.position += 3));
  },
  pushUint32(e) {
    (this.assertPosition(this.position + 3),
      this.dataView.setUint32(this.position, e),
      (this.position += 4));
  },
  readByte() {
    (this.assertReadLimit(), this._touch());
    let e = this.inspectByte();
    return (this.position++, e);
  },
  readBytes(e, t) {
    (this.assertReadLimit(), this._touch());
    let n = this.inspectBytes(e);
    return ((this.position += t ?? e), n);
  },
  readUint8() {
    (this.assertReadLimit(), this._touch());
    let e = this.inspectUint8();
    return ((this.position += 1), e);
  },
  readUint16() {
    (this.assertReadLimit(), this._touch());
    let e = this.inspectUint16();
    return ((this.position += 2), e);
  },
  readUint24() {
    (this.assertReadLimit(), this._touch());
    let e = this.inspectUint24();
    return ((this.position += 3), e);
  },
  readUint32() {
    (this.assertReadLimit(), this._touch());
    let e = this.inspectUint32();
    return ((this.position += 4), e);
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(e) {
    let t = this.position;
    return (
      this.assertPosition(e),
      (this.position = e),
      () => (this.position = t)
    );
  },
  _touch() {
    if (this.recursiveReadLimit === 1 / 0) return;
    let e = this.getReadCount();
    (this.positionReadCount.set(this.position, e + 1),
      e > 0 && this.recursiveReadCount++);
  },
};
function _o(e, { recursiveReadLimit: t = 8192 } = {}) {
  let n = Object.create(go);
  return (
    (n.bytes = e),
    (n.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength)),
    (n.positionReadCount = new Map()),
    (n.recursiveReadLimit = t),
    n
  );
}
var vo = class extends O {
    constructor({ offset: e }) {
      (super(`Offset \`${e}\` cannot be negative.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Cursor.NegativeOffsetError`,
        }));
    }
  },
  yo = class extends O {
    constructor({ length: e, position: t }) {
      (super(`Position \`${t}\` is out of bounds (\`0 < position < ${e}\`).`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Cursor.PositionOutOfBoundsError`,
        }));
    }
  },
  bo = class extends O {
    constructor({ count: e, limit: t }) {
      (super(
        `Recursive read limit of \`${t}\` exceeded (recursive read count: \`${e}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Cursor.RecursiveReadLimitExceededError`,
        }));
    }
  };
function xo(e, t, n = {}) {
  let { as: r = `Array`, checksumAddress: a = !1 } = n,
    o = typeof t == `string` ? qn(t) : t,
    s = _o(o);
  if (U(o) === 0 && e.length > 0) throw new Eo();
  if (U(o) && U(o) < 32)
    throw new To({
      data: typeof t == `string` ? t : i(t),
      parameters: e,
      size: U(o),
    });
  let c = 0,
    l = r === `Array` ? [] : {};
  for (let t = 0; t < e.length; ++t) {
    let n = e[t];
    c < o.length && s.setPosition(c);
    let [i, u] = qa(s, n, { checksumAddress: a, staticPosition: 0 });
    ((c += u), r === `Array` ? l.push(i) : (l[n.name ?? t] = i));
  }
  return l;
}
function So(e, t, n) {
  let { checksumAddress: r = !1 } = n ?? {};
  if (e.length !== t.length)
    throw new ko({ expectedLength: e.length, givenLength: t.length });
  let i = ao(ro({ checksumAddress: r, parameters: e, values: t }));
  return i.length === 0 ? `0x` : i;
}
function Co(e, t) {
  if (e.length !== t.length)
    throw new ko({ expectedLength: e.length, givenLength: t.length });
  let n = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r],
      a = t[r];
    n.push(Co.encode(i, a));
  }
  return D(...n);
}
(function (e) {
  function t(e, r, i = !1) {
    if (e === `address`) {
      let e = r;
      return (La(e), n(e.toLowerCase(), i ? 32 : 0));
    }
    if (e === `string`) return me(r);
    if (e === `bytes`) return r;
    if (e === `bool`) return n(a(r), i ? 32 : 1);
    let o = e.match(Ga);
    if (o) {
      let [e, t, n = `256`] = o,
        a = Number.parseInt(n, 10) / 8;
      return m(r, { size: i ? 32 : a, signed: t === `int` });
    }
    let s = e.match(Wa);
    if (s) {
      let [e, t] = s;
      if (Number.parseInt(t, 10) !== (r.length - 2) / 2)
        throw new Oo({ expectedSize: Number.parseInt(t, 10), value: r });
      return pe(r, i ? 32 : 0);
    }
    let c = e.match(Ua);
    if (c && Array.isArray(r)) {
      let [e, n] = c,
        i = [];
      for (let e = 0; e < r.length; e++) i.push(t(n, r[e], !0));
      return i.length === 0 ? `0x` : D(...i);
    }
    throw new jo(e);
  }
  e.encode = t;
})((Co ||= {}));
function wo(e) {
  return (Array.isArray(e) && typeof e[0] == `string`) || typeof e == `string`
    ? Na(e)
    : e;
}
var To = class extends O {
    constructor({ data: e, parameters: t, size: n }) {
      (super(`Data size of ${n} bytes is too small for given parameters.`, {
        metaMessages: [`Params: (${ki(t)})`, `Data:   ${e} (${n} bytes)`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `AbiParameters.DataSizeTooSmallError`,
        }));
    }
  },
  Eo = class extends O {
    constructor() {
      (super(`Cannot decode zero data ("0x") with ABI parameters.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `AbiParameters.ZeroDataError`,
        }));
    }
  },
  Do = class extends O {
    constructor({ expectedLength: e, givenLength: t, type: n }) {
      (super(
        `Array length mismatch for type \`${n}\`. Expected: \`${e}\`. Given: \`${t}\`.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `AbiParameters.ArrayLengthMismatchError`,
        }));
    }
  },
  Oo = class extends O {
    constructor({ expectedSize: e, value: t }) {
      (super(
        `Size of bytes "${t}" (bytes${f(t)}) does not match expected size (bytes${e}).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `AbiParameters.BytesSizeMismatchError`,
        }));
    }
  },
  ko = class extends O {
    constructor({ expectedLength: e, givenLength: t }) {
      (super(
        [
          `ABI encoding parameters/values length mismatch.`,
          `Expected length (parameters): ${e}`,
          `Given length (values): ${t}`,
        ].join(`
`),
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `AbiParameters.LengthMismatchError`,
        }));
    }
  },
  Ao = class extends O {
    constructor(e) {
      (super(`Value \`${e}\` is not a valid array.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `AbiParameters.InvalidArrayError`,
        }));
    }
  },
  jo = class extends O {
    constructor(e) {
      (super(`Type \`${e}\` is not a valid ABI Type.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `AbiParameters.InvalidTypeError`,
        }));
    }
  };
function Mo(e, t = {}) {
  let { recovered: n } = t;
  if (e.r === void 0 || e.s === void 0 || (n && e.yParity === void 0))
    throw new Vo({ signature: e });
  if (e.r < 0n || e.r > Ka) throw new Ho({ value: e.r });
  if (e.s < 0n || e.s > Ka) throw new Uo({ value: e.s });
  if (typeof e.yParity == `number` && e.yParity !== 0 && e.yParity !== 1)
    throw new Wo({ value: e.yParity });
}
function No(e) {
  return Po(i(e));
}
function Po(e) {
  if (e.length !== 130 && e.length !== 132) throw new Bo({ signature: e });
  let t = BigInt(p(e, 0, 32)),
    n = BigInt(p(e, 32, 64)),
    r = (() => {
      let t = Number(`0x${e.slice(130)}`);
      if (!Number.isNaN(t))
        try {
          return zo(t);
        } catch {
          throw new Wo({ value: t });
        }
    })();
  return r === void 0 ? { r: t, s: n } : { r: t, s: n, yParity: r };
}
function Fo(e) {
  if (e.r !== void 0 && e.s !== void 0) return Io(e);
}
function Io(e) {
  let t =
    typeof e == `string`
      ? Po(e)
      : e instanceof Uint8Array
        ? No(e)
        : typeof e.r == `string`
          ? Ro(e)
          : e.v
            ? Lo(e)
            : {
                r: e.r,
                s: e.s,
                ...(e.yParity === void 0 ? {} : { yParity: e.yParity }),
              };
  return (Mo(t), t);
}
function Lo(e) {
  return { r: e.r, s: e.s, yParity: zo(e.v) };
}
function Ro(e) {
  let t = (() => {
    let t = e.v ? Number(e.v) : void 0,
      n = e.yParity ? Number(e.yParity) : void 0;
    if (
      (typeof t == `number` && typeof n != `number` && (n = zo(t)),
      typeof n != `number`)
    )
      throw new Wo({ value: e.yParity });
    return n;
  })();
  return { r: BigInt(e.r), s: BigInt(e.s), yParity: t };
}
function zo(e) {
  if (e === 0 || e === 27) return 0;
  if (e === 1 || e === 28) return 1;
  if (e >= 35) return +(e % 2 == 0);
  throw new Go({ value: e });
}
var Bo = class extends O {
    constructor({ signature: e }) {
      (super(`Value \`${e}\` is an invalid signature size.`, {
        metaMessages: [
          `Expected: 64 bytes or 65 bytes.`,
          `Received ${f(y(e))} bytes.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Signature.InvalidSerializedSizeError`,
        }));
    }
  },
  Vo = class extends O {
    constructor({ signature: e }) {
      (super(
        `Signature \`${d(e)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Signature.MissingPropertiesError`,
        }));
    }
  },
  Ho = class extends O {
    constructor({ value: e }) {
      (super(
        `Value \`${e}\` is an invalid r value. r must be a positive integer less than 2^256.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Signature.InvalidRError`,
        }));
    }
  },
  Uo = class extends O {
    constructor({ value: e }) {
      (super(
        `Value \`${e}\` is an invalid s value. s must be a positive integer less than 2^256.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Signature.InvalidSError`,
        }));
    }
  },
  Wo = class extends O {
    constructor({ value: e }) {
      (super(
        `Value \`${e}\` is an invalid y-parity value. Y-parity must be 0 or 1.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Signature.InvalidYParityError`,
        }));
    }
  },
  Go = class extends O {
    constructor({ value: e }) {
      (super(`Value \`${e}\` is an invalid v value. v must be 27, 28 or >=35.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `Signature.InvalidVError`,
        }));
    }
  };
function Ko(e, t = {}) {
  return typeof e.chainId == `string` ? qo(e) : { ...e, ...t.signature };
}
function qo(e) {
  let { address: t, chainId: n, nonce: r } = e,
    i = Fo(e);
  return { address: t, chainId: Number(n), nonce: BigInt(r), ...i };
}
var Jo = wo(
  `(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data`,
);
function Yo(e) {
  if (typeof e == `string`) {
    if (
      p(e, -32) !==
      `0x8010801080108010801080108010801080108010801080108010801080108010`
    )
      throw new Qo(e);
  } else Mo(e.authorization);
}
function Xo(e) {
  Yo(e);
  let t = o(p(e, -64, -32)),
    n = p(e, -t - 64, -64),
    r = p(e, 0, -t - 64),
    [i, a, s] = xo(Jo, n);
  return {
    authorization: Ko({
      address: i.delegation,
      chainId: Number(i.chainId),
      nonce: i.nonce,
      yParity: i.yParity,
      r: i.r,
      s: i.s,
    }),
    signature: r,
    ...(s && s !== `0x` ? { data: s, to: a } : {}),
  };
}
function Zo(e) {
  try {
    return (Yo(e), !0);
  } catch {
    return !1;
  }
}
var Qo = class extends O {
  constructor(e) {
    (super(`Value \`${e}\` is an invalid ERC-8010 wrapped signature.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: `SignatureErc8010.InvalidWrappedSignatureError`,
      }));
  }
};
function $o(e) {
  return e.map((e) => ({ ...e, value: BigInt(e.value) }));
}
function es(e) {
  return {
    ...e,
    balance: e.balance ? BigInt(e.balance) : void 0,
    nonce: e.nonce ? M(e.nonce) : void 0,
    storageProof: e.storageProof ? $o(e.storageProof) : void 0,
  };
}
async function ts(
  e,
  {
    address: t,
    blockHash: n,
    blockNumber: r,
    blockTag: i = `latest`,
    requireCanonical: a,
    storageKeys: o,
  },
) {
  let s = b({ blockHash: n, blockNumber: r, blockTag: i, requireCanonical: a });
  return es(await e.request({ method: `eth_getProof`, params: [t, o, s] }));
}
async function ns(e, { hash: t }) {
  let n = await e.request(
    { method: `eth_getRawTransactionByHash`, params: [t] },
    { dedupe: !0 },
  );
  if (!n) throw new ye({ hash: t });
  return n;
}
async function rs(
  e,
  {
    address: t,
    blockHash: n,
    blockNumber: r,
    blockTag: i = `latest`,
    requireCanonical: a,
    slot: o,
  },
) {
  let s = b({ blockHash: n, blockNumber: r, blockTag: i, requireCanonical: a });
  return await e.request({ method: `eth_getStorageAt`, params: [t, o, s] });
}
async function is(
  e,
  {
    blockHash: t,
    blockNumber: n,
    blockTag: r = `latest`,
    requireCanonical: i,
    requests: a,
  },
) {
  let o = b({ blockHash: t, blockNumber: n, blockTag: r, requireCanonical: i });
  return e.request({ method: `eth_getStorageValues`, params: [a, o] });
}
async function as(
  e,
  {
    blockHash: t,
    blockNumber: n,
    blockTag: r,
    hash: i,
    index: a,
    sender: o,
    nonce: s,
  },
) {
  let c = r || `latest`,
    l = n === void 0 ? void 0 : j(n),
    u = null;
  if (
    (i
      ? (u = await e.request(
          { method: `eth_getTransactionByHash`, params: [i] },
          { dedupe: !0 },
        ))
      : t
        ? (u = await e.request(
            {
              method: `eth_getTransactionByBlockHashAndIndex`,
              params: [t, j(a)],
            },
            { dedupe: !0 },
          ))
        : (l || c) && typeof a == `number`
          ? (u = await e.request(
              {
                method: `eth_getTransactionByBlockNumberAndIndex`,
                params: [l || c, j(a)],
              },
              { dedupe: !!l },
            ))
          : o &&
            typeof s == `number` &&
            (u = await e.request(
              {
                method: `eth_getTransactionBySenderAndNonce`,
                params: [o, j(s)],
              },
              { dedupe: !0 },
            )),
    !u)
  )
    throw new ye({
      blockHash: t,
      blockNumber: n,
      blockTag: c,
      hash: i,
      index: a,
    });
  return (e.chain?.formatters?.transaction?.format || Kt)(u, `getTransaction`);
}
async function os(e, { hash: t, transactionReceipt: n }) {
  let [r, i] = await Promise.all([
      R(e, gr, `getBlockNumber`)({}),
      t ? R(e, as, `getTransaction`)({ hash: t }) : void 0,
    ]),
    a = n?.blockNumber || i?.blockNumber;
  return a ? r - a + 1n : 0n;
}
async function ss(e, { hash: t }) {
  let n = await e.request(
    { method: `eth_getTransactionReceipt`, params: [t] },
    { dedupe: !0 },
  );
  if (!n) throw new Te({ hash: t });
  return (e.chain?.formatters?.transactionReceipt?.format || wr)(
    n,
    `getTransactionReceipt`,
  );
}
async function cs(e, t) {
  let {
      account: n,
      authorizationList: r,
      allowFailure: i = !0,
      blockHash: a,
      blockNumber: o,
      blockOverrides: s,
      blockTag: c,
      requireCanonical: l,
      stateOverride: u,
    } = t,
    d = t.contracts,
    f = typeof e.batch?.multicall == `object` ? e.batch.multicall : {},
    p = t.batchSize ?? f.batchSize ?? 1024,
    m = t.deployless ?? f.deployless ?? !1,
    h = (() => {
      if (t.multicallAddress) return t.multicallAddress;
      if (m) return null;
      if (e.chain)
        return ve({ blockNumber: o, chain: e.chain, contract: `multicall3` });
      throw Error(`client chain not configured. multicallAddress is required.`);
    })(),
    g = [[]],
    _ = 0,
    v = 0;
  for (let e = 0; e < d.length; e++) {
    let { abi: t, address: r, args: a, functionName: o } = d[e];
    try {
      let e = k({ abi: t, args: a, functionName: o });
      ((v += (e.length - 2) / 2),
        p > 0 &&
          v > p &&
          g[_].length > 0 &&
          (_++, (v = (e.length - 2) / 2), (g[_] = [])),
        (g[_] = [...g[_], { allowFailure: !0, callData: e, target: r }]));
    } catch (e) {
      let s = z(e, {
        abi: t,
        address: r,
        args: a,
        docsPath: `/docs/contract/multicall`,
        functionName: o,
        sender: n,
      });
      if (!i) throw s;
      g[_] = [...g[_], { allowFailure: !0, callData: `0x`, target: r }];
    }
  }
  let y = !!e.batch?.multicall,
    b = y ? g.flatMap((e) => e.map((e) => [e])) : g,
    S = await Promise.allSettled(
      b.map((t) =>
        y
          ? ls(e, {
              account: n,
              authorizationList: r,
              batchSize: p,
              blockHash: a,
              blockNumber: o,
              blockOverrides: s,
              blockTag: c,
              call: t[0],
              multicallAddress: h,
              requireCanonical: l,
              stateOverride: u,
            }).then((e) => [e])
          : R(
              e,
              G,
              `readContract`,
            )({
              ...(h === null ? { code: be } : { address: h }),
              abi: Oe,
              account: n,
              args: [t],
              authorizationList: r,
              blockHash: a,
              blockNumber: o,
              blockOverrides: s,
              blockTag: c,
              functionName: `aggregate3`,
              requireCanonical: l,
              stateOverride: u,
            }),
      ),
    ),
    C = [];
  for (let e = 0; e < S.length; e++) {
    let t = S[e];
    if (t.status === `rejected`) {
      if (!i) throw t.reason;
      for (let n = 0; n < b[e].length; n++)
        C.push({ status: `failure`, error: t.reason, result: void 0 });
      continue;
    }
    let n = t.value;
    for (let t = 0; t < n.length; t++) {
      let { returnData: r, success: a } = n[t],
        { callData: o } = b[e][t],
        { abi: s, address: c, functionName: l, args: u } = d[C.length];
      try {
        if (o === `0x`) throw new Je();
        if (!a) throw new ce({ data: r });
        let e = x({ abi: s, args: u, data: r, functionName: l });
        C.push(i ? { result: e, status: `success` } : e);
      } catch (e) {
        let t = z(e, {
          abi: s,
          address: c,
          args: u,
          docsPath: `/docs/contract/multicall`,
          functionName: l,
        });
        if (!i) throw t;
        C.push({ error: t, result: void 0, status: `failure` });
      }
    }
  }
  if (C.length !== d.length) throw new L(`multicall results mismatch`);
  return C;
}
async function ls(e, t) {
  let { batchSize: n, call: r, multicallAddress: i, ...a } = t,
    { wait: o = 0 } =
      typeof e.batch?.multicall == `object` ? e.batch.multicall : {},
    { schedule: s } = lt({
      id: I([`multicall`, e.uid, n, i, a]),
      wait: o,
      shouldSplitBatch(e) {
        return (
          n !== 0 &&
          e.reduce((e, { callData: t }) => e + (t.length - 2) / 2, 0) > n
        );
      },
      fn: (t) =>
        R(
          e,
          G,
          `readContract`,
        )({
          ...(i === null ? { code: be } : { address: i }),
          ...a,
          abi: Oe,
          args: [t],
          functionName: `aggregate3`,
        }),
    }),
    [c] = await s(r);
  return c;
}
async function us(e, t) {
  let {
    blockNumber: n,
    blockTag: r = e.experimental_blockTag ?? `latest`,
    blocks: i,
    returnFullTransactions: a,
    traceTransfers: o,
    validation: s,
  } = t;
  try {
    let t = [];
    for (let e of i) {
      let n = e.blockOverrides ? v(e.blockOverrides) : void 0,
        r = e.calls.map((e) => {
          let t = e,
            n = t.account ? E(t.account) : void 0,
            r = t.abi ? k(t) : t.data,
            i = {
              ...t,
              account: n,
              data: t.dataSuffix ? Le([r || `0x`, t.dataSuffix]) : r,
              from: t.from ?? n?.address,
            };
          return (S(i), Se(i));
        }),
        i = e.stateOverrides ? u(e.stateOverrides) : void 0;
      t.push({ blockOverrides: n, calls: r, stateOverrides: i });
    }
    let c = (typeof n == `bigint` ? j(n) : void 0) || r;
    return (
      await e.request({
        method: `eth_simulateV1`,
        params: [
          {
            blockStateCalls: t,
            returnFullTransactions: a,
            traceTransfers: o,
            validation: s,
          },
          c,
        ],
      })
    ).map((e, t) => ({
      ...Yt(e),
      calls: e.calls.map((e, n) => {
        let { abi: r, args: a, functionName: o, to: s } = i[t].calls[n],
          c = e.error?.data ?? e.returnData,
          l = BigInt(e.gasUsed),
          u = e.maxUsedGas === void 0 ? void 0 : BigInt(e.maxUsedGas),
          d = e.logs?.map((e) => V(e)),
          f = e.status === `0x1` ? `success` : `failure`,
          p =
            r && f === `success` && c !== `0x`
              ? x({ abi: r, data: c, functionName: o })
              : null,
          m = (() => {
            if (f === `success`) return;
            let e;
            if (
              (c === `0x` ? (e = new Je()) : c && (e = new ce({ data: c })), e)
            )
              return z(e, {
                abi: r ?? [],
                address: s ?? `0x`,
                args: a,
                functionName: o ?? `<unknown>`,
              });
          })();
        return {
          data: c,
          gasUsed: l,
          logs: d,
          ...(u === void 0 ? {} : { maxUsedGas: u }),
          status: f,
          ...(f === `success` ? { result: p } : { error: m }),
        };
      }),
    }));
  } catch (e) {
    let t = e,
      n = w(t, {});
    throw n instanceof ot ? t : n;
  }
}
function ds(e) {
  let t = !0,
    n = ``,
    r = 0,
    i = ``,
    a = !1;
  for (let o = 0; o < e.length; o++) {
    let s = e[o];
    if (
      ([`(`, `)`, `,`].includes(s) && (t = !0),
      s === `(` && r++,
      s === `)` && r--,
      t)
    ) {
      if (r === 0) {
        if (s === ` ` && [`event`, `function`, `error`, ``].includes(i)) i = ``;
        else if (((i += s), s === `)`)) {
          a = !0;
          break;
        }
        continue;
      }
      if (s === ` `) {
        e[o - 1] !== `,` && n !== `,` && n !== `,(` && ((n = ``), (t = !1));
        continue;
      }
      ((i += s), (n += s));
    }
  }
  if (!a) throw new O(`Unable to normalize signature.`);
  return i;
}
function fs(e, t) {
  let n = typeof e,
    r = t.type;
  switch (r) {
    case `address`:
      return za(e, { strict: !1 });
    case `bool`:
      return n === `boolean`;
    case `function`:
      return n === `string`;
    case `string`:
      return n === `string`;
    default:
      return r === `tuple` && `components` in t
        ? Object.values(t.components).every((t, n) =>
            fs(Object.values(e)[n], t),
          )
        : /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
              r,
            )
          ? n === `number` || n === `bigint`
          : /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(r)
            ? n === `string` || e instanceof Uint8Array
            : /[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(r)
              ? Array.isArray(e) &&
                e.every((e) =>
                  fs(e, { ...t, type: r.replace(/(\[[0-9]{0,}\])$/, ``) }),
                )
              : !1;
  }
}
function ps(e, t, n) {
  for (let r in e) {
    let i = e[r],
      a = t[r];
    if (
      i.type === `tuple` &&
      a.type === `tuple` &&
      `components` in i &&
      `components` in a
    )
      return ps(i.components, a.components, n[r]);
    let o = [i.type, a.type];
    if (
      (o.includes(`address`) && o.includes(`bytes20`)) ||
      (((o.includes(`address`) && o.includes(`string`)) ||
        (o.includes(`address`) && o.includes(`bytes`))) &&
        za(n[r], { strict: !1 }))
    )
      return o;
  }
}
function ms(e, t = {}) {
  let { prepare: n = !0 } = t,
    r = Array.isArray(e) || typeof e == `string` ? Ma(e) : e;
  return { ...r, ...(n ? { hash: Z(r) } : {}) };
}
function hs(e, t, n) {
  let { args: r = [], prepare: i = !0 } = n ?? {},
    a = c(t, { strict: !1 }),
    o = e.filter((e) =>
      a
        ? e.type === `function` || e.type === `error`
          ? gs(e) === p(t, 0, 4)
          : e.type === `event` && Z(e) === t
        : `name` in e && e.name === t,
    );
  if (o.length === 0) throw new ys({ name: t });
  if (o.length === 1) return { ...o[0], ...(i ? { hash: Z(o[0]) } : {}) };
  let s;
  for (let e of o)
    if (`inputs` in e) {
      if (!r || r.length === 0) {
        if (!e.inputs || e.inputs.length === 0)
          return { ...e, ...(i ? { hash: Z(e) } : {}) };
        continue;
      }
      if (
        e.inputs &&
        e.inputs.length !== 0 &&
        e.inputs.length === r.length &&
        r.every((t, n) => {
          let r = `inputs` in e && e.inputs[n];
          return r ? fs(t, r) : !1;
        })
      ) {
        if (s && `inputs` in s && s.inputs) {
          let t = ps(e.inputs, s.inputs, r);
          if (t)
            throw new vs(
              { abiItem: e, type: t[0] },
              { abiItem: s, type: t[1] },
            );
        }
        s = e;
      }
    }
  let l = (() => {
    if (s) return s;
    let [e, ...t] = o;
    return { ...e, overloads: t };
  })();
  if (!l) throw new ys({ name: t });
  return { ...l, ...(i ? { hash: Z(l) } : {}) };
}
function gs(...e) {
  let t = (() => {
    if (Array.isArray(e[0])) {
      let [t, n] = e;
      return hs(t, n);
    }
    return e[0];
  })();
  return p(Z(t), 0, 4);
}
function _s(...e) {
  let t = (() => {
    if (Array.isArray(e[0])) {
      let [t, n] = e;
      return hs(t, n);
    }
    return e[0];
  })();
  return ds(typeof t == `string` ? t : Ai(t));
}
function Z(...e) {
  let t = (() => {
    if (Array.isArray(e[0])) {
      let [t, n] = e;
      return hs(t, n);
    }
    return e[0];
  })();
  return typeof t != `string` && `hash` in t && t.hash ? t.hash : Fa(me(_s(t)));
}
var vs = class extends O {
    constructor(e, t) {
      (super(`Found ambiguous types in overloaded ABI Items.`, {
        metaMessages: [
          `\`${e.type}\` in \`${ds(Ai(e.abiItem))}\`, and`,
          `\`${t.type}\` in \`${ds(Ai(t.abiItem))}\``,
          ``,
          `These types encode differently and cannot be distinguished at runtime.`,
          `Remove one of the ambiguous items in the ABI.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `AbiItem.AmbiguityError`,
        }));
    }
  },
  ys = class extends O {
    constructor({ name: e, data: t, type: n = `item` }) {
      let r = e ? ` with name "${e}"` : t ? ` with data "${t}"` : ``;
      (super(`ABI ${n}${r} not found.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `AbiItem.NotFoundError`,
        }));
    }
  };
function bs(...e) {
  let [t, n] = (() => {
      if (Array.isArray(e[0])) {
        let [t, n] = e;
        return [Ss(t), n];
      }
      return e;
    })(),
    { bytecode: r, args: i } = n;
  return D(r, t.inputs?.length && i?.length ? So(t.inputs, i) : `0x`);
}
function xs(e) {
  return ms(e);
}
function Ss(e) {
  let t = e.find((e) => e.type === `constructor`);
  if (!t) throw new ys({ name: `constructor` });
  return t;
}
function Cs(e, t = {}) {
  return ms(e, t);
}
function ws(e) {
  return Z(e);
}
function Ts(...e) {
  let [t, n, r = {}] = (() => {
      if (Array.isArray(e[0])) {
        let [t, n, r, i] = e;
        return [Ds(t, n), r, i];
      }
      return e;
    })(),
    i = xo(t.outputs, n, r);
  if (!(i && Object.keys(i).length === 0))
    return i && Object.keys(i).length === 1
      ? Array.isArray(i)
        ? i[0]
        : Object.values(i)[0]
      : i;
}
function Q(...e) {
  let [t, n = []] = (() => {
      if (Array.isArray(e[0])) {
        let [t, n, r] = e;
        return [Ds(t, n, { args: r }), r];
      }
      let [t, n] = e;
      return [t, n];
    })(),
    { overloads: r } = t,
    i = r ? Ds([t, ...r], t.name, { args: n }) : t,
    a = Os(i),
    o = n.length > 0 ? So(i.inputs, n) : void 0;
  return o ? D(a, o) : a;
}
function Es(e, t = {}) {
  return ms(e, t);
}
function Ds(e, t, n) {
  let r = hs(e, t, n);
  if (r.type !== `function`) throw new ys({ name: t, type: `function` });
  return r;
}
function Os(e) {
  return gs(e);
}
var ks = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`,
  As = `0x0000000000000000000000000000000000000000`,
  js = `0x6080604052348015600e575f80fd5b5061016d8061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063f8b2cb4f1461002d575b5f80fd5b610047600480360381019061004291906100db565b61005d565b604051610054919061011e565b60405180910390f35b5f8173ffffffffffffffffffffffffffffffffffffffff16319050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100aa82610081565b9050919050565b6100ba816100a0565b81146100c4575f80fd5b50565b5f813590506100d5816100b1565b92915050565b5f602082840312156100f0576100ef61007d565b5b5f6100fd848285016100c7565b91505092915050565b5f819050919050565b61011881610106565b82525050565b5f6020820190506101315f83018461010f565b9291505056fea26469706673582212203b9fe929fe995c7cf9887f0bdba8a36dd78e8b73f149b17d2d9ad7cd09d2dc6264736f6c634300081a0033`,
  Ms = `0x608060405234801561000f575f5ffd5b5060043610610029575f3560e01c8063fd00430c1461002d575b5f5ffd5b6100476004803603810190610042919061012b565b610049565b005b80825f375f5f825f865afa610060573d5f5f3e3d5ffd5b3d5f5f3e3d5ff35b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61009982610070565b9050919050565b6100a98161008f565b81146100b3575f5ffd5b50565b5f813590506100c4816100a0565b92915050565b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f8401126100eb576100ea6100ca565b5b8235905067ffffffffffffffff811115610108576101076100ce565b5b602083019150836001820283011115610124576101236100d2565b5b9250929050565b5f5f5f6040848603121561014257610141610068565b5b5f61014f868287016100b6565b935050602084013567ffffffffffffffff8111156101705761016f61006c565b5b61017c868287016100d6565b9250925050925092509256fea2646970667358221220635ed99185cacf3f2acba6921f23687c969cec2bbaf5f9ad599f507e6e105e6964736f6c63430008230033`,
  Ns = 1000000n,
  Ps = 3735928559n,
  Fs = ws(
    Cs(
      `event Transfer(address indexed from, address indexed to, uint256 value)`,
    ),
  ),
  Is = Es(`function balanceOf(address) returns (uint256)`),
  Ls = Es(`function decimals() returns (uint256)`),
  Rs = Es(`function tokenURI(uint256) returns (string)`),
  zs = Es(`function symbol() returns (string)`),
  Bs = Es(`function query(address target, bytes data)`);
async function Vs(e, t) {
  let {
      blockNumber: n,
      blockTag: r,
      calls: i,
      stateOverrides: a,
      traceAssetChanges: o,
      traceTransfers: s,
      validation: c,
    } = t,
    l = t.account ? E(t.account) : void 0;
  if (o && !l)
    throw new L("`account` is required when `traceAssetChanges` is true");
  let u = l
      ? bs(xs(`constructor(bytes, bytes)`), {
          bytecode: oe,
          args: [js, Q(Es(`function getBalance(address)`), [l.address])],
        })
      : void 0,
    d = r ?? e.experimental_blockTag ?? `latest`,
    f = n;
  if (o && typeof f != `bigint` && d !== `earliest` && d !== `pending`)
    if (d === `latest`) f = await gr(e, { cacheTime: 0 });
    else {
      let t = await B(e, { blockTag: d });
      if (typeof t.number != `bigint`)
        throw new L(`Block tag \`${d}\` did not resolve to a number.`);
      f = t.number;
    }
  let p = typeof f == `bigint` ? { blockNumber: f } : { blockTag: d },
    m = o
      ? await us(e, {
          ...p,
          blocks: [
            {
              calls: i.map((e) => ({ ...e, from: l.address })),
              stateOverrides: a,
            },
          ],
          traceTransfers: s,
          validation: c,
        })
      : void 0,
    h = m
      ? [
          ...new Set([
            ...Us(
              m[0].calls.flatMap((e) => e.logs ?? []),
              l.address,
            ),
            ...t.calls.map((e) => e.to?.toLowerCase()),
          ]),
        ].filter(
          (e) =>
            !!e &&
            e !== `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee` &&
            e !== `0x0000000000000000000000000000000000000000`,
        )
      : [],
    g = qs([
      ...(l ? [l.address] : []),
      ...h,
      ...(a?.map(({ address: e }) => e) ?? []),
    ]),
    _ = [{ address: g, code: Ms }],
    [v, y] = await Promise.all([
      o
        ? Promise.all([
            Ks(e, { account: l.address, ...p, data: u, stateOverride: a }),
            ...h.map((t) =>
              Ks(e, {
                account: l.address,
                address: t,
                ...p,
                data: Q(Is, [l.address]),
                staticCallAddress: g,
                stateOverride: a,
              }),
            ),
          ])
        : [],
      us(e, {
        ...p,
        blocks: [
          {
            calls: [...i, { to: As }].map((e) => ({ ...e, from: l?.address })),
            stateOverrides: a,
          },
          ...(o
            ? [
                { calls: [{ data: u }] },
                {
                  calls: h.map((e) => ({
                    to: g,
                    gas: Ns,
                    data: Hs(e, Q(Is, [l.address])),
                  })),
                  stateOverrides: _,
                },
                {
                  calls: h.map((e) => ({ to: g, gas: Ns, data: Hs(e, Q(Ls)) })),
                  stateOverrides: _,
                },
                {
                  calls: h.map((e) => ({
                    to: g,
                    gas: Ns,
                    data: Hs(e, Q(Rs, [0n])),
                  })),
                  stateOverrides: _,
                },
                {
                  calls: h.map((e) => ({ to: g, gas: Ns, data: Hs(e, Q(zs)) })),
                  stateOverrides: _,
                },
              ]
            : []),
        ],
        traceTransfers: s,
        validation: c,
      }),
    ]),
    b = y[0],
    [x, S, C, w, ee] = o ? y.slice(1) : [],
    { calls: te, ...ne } = b,
    re = te.slice(0, -1),
    ie = v.map((e) => (Ws(e) ? N(e.data) : null)),
    ae = x?.calls ?? [],
    se = S?.calls ?? [],
    ce = [...ae, ...se].map((e) => (Ws(e) ? N(e.data) : null)),
    le = (C?.calls ?? []).map((e) => Gs(e, Ls)),
    T = (ee?.calls ?? []).map((e) => Gs(e, zs)),
    ue = (w?.calls ?? []).map((e) => Gs(e, Rs)),
    de = [];
  for (let [e, t] of ce.entries()) {
    let n = ie[e],
      r = v[e],
      i =
        typeof n == `bigint`
          ? n
          : e > 0 && r?.status === `success` && r.data === `0x`
            ? 0n
            : null;
    if (typeof t != `bigint` || typeof i != `bigint`) continue;
    let a = le[e - 1],
      o = T[e - 1],
      s = ue[e - 1],
      c =
        e === 0
          ? { address: ks, decimals: 18, symbol: `ETH` }
          : {
              address: h[e - 1],
              decimals: s || a ? Number(a ?? 1) : void 0,
              symbol: o ?? void 0,
            };
    de.push({ token: c, value: { pre: i, post: t, diff: t - i } });
  }
  return { assetChanges: de, block: ne, results: re };
}
function Hs(e, t) {
  return Q(Bs, [e, t]);
}
function Us(e, t) {
  let n = $e(t.toLowerCase(), { size: 32 });
  return e
    .filter((e) =>
      e.topics[0]?.toLowerCase() !== Fs ||
      e.address.toLowerCase() === `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`
        ? !1
        : e.topics[1]?.toLowerCase() === n || e.topics[2]?.toLowerCase() === n,
    )
    .map((e) => e.address.toLowerCase());
}
function Ws(e) {
  return e.status === `success` && /^0x[\da-f]{64}$/i.test(e.data);
}
function Gs(e, t) {
  if (e.status === `failure` || e.data === `0x`) return null;
  try {
    return Ts(t, e.data);
  } catch {
    return null;
  }
}
async function Ks(e, t) {
  let {
    account: n,
    address: r,
    blockNumber: i,
    blockTag: a,
    data: o,
    staticCallAddress: s,
    stateOverride: c,
  } = t;
  try {
    return {
      data:
        (
          await fe(
            { ...e, ccipRead: !1 },
            {
              account: r ? `0x0000000000000000000000000000000000000000` : n,
              data: r ? Hs(r, o) : o,
              stateOverride:
                r && s ? [...(c ?? []), { address: s, code: Ms }] : c,
              ...(r ? { gas: Ns, to: s } : {}),
              ...(typeof i == `bigint` ? { blockNumber: i } : { blockTag: a }),
            },
          )
        ).data ?? `0x`,
      status: `success`,
    };
  } catch (e) {
    if (!(e instanceof C) || !(e.cause instanceof ct)) throw e;
    return { data: `0x`, status: `failure` };
  }
}
function qs(e) {
  let t = new Set(e.map((e) => e.toLowerCase())),
    n = Ps;
  for (; t.has(`0x${n.toString(16).padStart(40, `0`)}`);) n++;
  return `0x${n.toString(16).padStart(40, `0`)}`;
}
var Js = `0x6492649264926492649264926492649264926492649264926492649264926492`;
function Ys(e) {
  if (
    p(e, -32) !==
    `0x6492649264926492649264926492649264926492649264926492649264926492`
  )
    throw new Qs(e);
}
function Xs(e) {
  let { data: t, signature: n, to: r } = e;
  return D(So(wo(`address, bytes, bytes`), [r, t, n]), Js);
}
function Zs(e) {
  try {
    return (Ys(e), !0);
  } catch {
    return !1;
  }
}
var Qs = class extends O {
  constructor(e) {
    (super(`Value \`${e}\` is an invalid ERC-6492 wrapped signature.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: `SignatureErc6492.InvalidWrappedSignatureError`,
      }));
  }
};
function $s({ r: e, s: t, to: n = `hex`, v: r, yParity: i }) {
  let a = (() => {
      if (i === 0 || i === 1) return i;
      if (r && (r === 27n || r === 28n || r >= 35n)) return +(r % 2n == 0n);
      throw Error("Invalid `v` or `yParity` value");
    })(),
    o = `0x${new gt.Signature(N(e), N(t)).toCompactHex()}${a === 0 ? `1b` : `1c`}`;
  return n === `hex` ? o : P(o);
}
async function ec(e, t) {
  let {
    address: n,
    chain: r = e.chain,
    hash: i,
    erc6492VerifierAddress: a = t.universalSignatureVerifierAddress ??
      r?.contracts?.erc6492Verifier?.address,
    multicallAddress: o = t.multicallAddress ??
      r?.contracts?.multicall3?.address,
    mode: c = `auto`,
  } = t;
  if (r?.verifyHash) return await r.verifyHash(e, t);
  let l = (() => {
    let e = t.signature;
    return Ye(e)
      ? e
      : typeof e == `object` && `r` in e && `s` in e
        ? $s(e)
        : F(e);
  })();
  try {
    if (c === `eoa`)
      try {
        if (s(Re(n), await At({ hash: i, signature: l }))) return !0;
      } catch {}
    return Zo(l)
      ? await tc(e, { ...t, multicallAddress: o, signature: l })
      : await nc(e, { ...t, verifierAddress: a, signature: l });
  } catch (e) {
    if (c !== `eoa`)
      try {
        if (s(Re(n), await At({ hash: i, signature: l }))) return !0;
      } catch {}
    if (e instanceof $) return !1;
    throw e;
  }
}
async function tc(e, t) {
  let {
      address: n,
      blockHash: r,
      blockNumber: i,
      blockTag: a,
      hash: o,
      multicallAddress: s,
      requireCanonical: c,
    } = t,
    { authorization: l, data: u, signature: d, to: f } = Xo(t.signature);
  if (
    (await pi(e, {
      address: n,
      blockHash: r,
      blockNumber: i,
      blockTag: a,
      requireCanonical: c,
    })) === Ke([`0xef0100`, l.address])
  )
    return await rc(e, { ...t, signature: d });
  let p = {
    address: l.address,
    chainId: Number(l.chainId),
    nonce: Number(l.nonce),
    r: j(l.r, { size: 32 }),
    s: j(l.s, { size: 32 }),
    yParity: l.yParity,
  };
  if (!(await xi({ address: n, authorization: p }))) throw new $();
  let m = await R(
    e,
    G,
    `readContract`,
  )({
    ...(s ? { address: s } : { code: be }),
    authorizationList: [p],
    abi: Oe,
    blockHash: r,
    blockNumber: i,
    blockTag: `pending`,
    functionName: `aggregate3`,
    requireCanonical: c,
    args: [
      [
        ...(u ? [{ allowFailure: !0, target: f ?? n, callData: u }] : []),
        {
          allowFailure: !0,
          target: n,
          callData: k({
            abi: ue,
            functionName: `isValidSignature`,
            args: [o, d],
          }),
        },
      ],
    ],
  });
  if (m[m.length - 1]?.returnData?.startsWith(`0x1626ba7e`)) return !0;
  throw new $();
}
async function nc(e, t) {
  let {
      address: n,
      factory: r,
      factoryData: i,
      hash: a,
      signature: o,
      verifierAddress: s,
      ...c
    } = t,
    l = await (async () =>
      (!r && !i) || Zs(o) ? o : Xs({ data: i, signature: o, to: r }))(),
    u = s
      ? {
          to: s,
          data: k({ abi: te, functionName: `isValidSig`, args: [n, a, l] }),
          ...c,
        }
      : { data: we({ abi: te, args: [n, a, l], bytecode: le }), ...c },
    { data: d } = await R(
      e,
      fe,
      `call`,
    )(u).catch((e) => {
      throw e instanceof C ? new $() : e;
    });
  if (tt(d ?? `0x0`)) return !0;
  throw new $();
}
async function rc(e, t) {
  let {
    address: n,
    blockHash: r,
    blockNumber: i,
    blockTag: a,
    hash: o,
    requireCanonical: s,
    signature: c,
  } = t;
  if (
    (
      await R(
        e,
        G,
        `readContract`,
      )({
        address: n,
        abi: ue,
        args: [o, c],
        blockHash: r,
        blockNumber: i,
        blockTag: a,
        functionName: `isValidSignature`,
        requireCanonical: s,
      }).catch((e) => {
        throw e instanceof ee ? new $() : e;
      })
    ).startsWith(`0x1626ba7e`)
  )
    return !0;
  throw new $();
}
var $ = class extends Error {};
async function ic(
  e,
  { address: t, message: n, factory: r, factoryData: i, signature: a, ...o },
) {
  let s = _t(n);
  return R(
    e,
    ec,
    `verifyHash`,
  )({ address: t, factory: r, factoryData: i, hash: s, signature: a, ...o });
}
async function ac(e, t) {
  let {
      address: n,
      factory: r,
      factoryData: i,
      signature: a,
      message: o,
      primaryType: s,
      types: c,
      domain: l,
      ...u
    } = t,
    d = vt({ message: o, primaryType: s, types: c, domain: l });
  return R(
    e,
    ec,
    `verifyHash`,
  )({ address: n, factory: r, factoryData: i, hash: d, signature: a, ...u });
}
function oc(
  e,
  {
    emitOnBegin: t = !1,
    emitMissed: n = !1,
    onBlockNumber: r,
    onError: i,
    poll: a,
    pollingInterval: o = e.pollingInterval,
  },
) {
  let s =
      a === void 0
        ? e.transport.type !== `webSocket` &&
          e.transport.type !== `ipc` &&
          (e.transport.type !== `fallback` ||
            (e.transport.transports[0].config.type !== `webSocket` &&
              e.transport.transports[0].config.type !== `ipc`))
        : a,
    c;
  return s
    ? K(
        I([`watchBlockNumber`, e.uid, t, n, o]),
        { onBlockNumber: r, onError: i },
        (r) =>
          ur(
            async () => {
              try {
                let t = await R(e, gr, `getBlockNumber`)({ cacheTime: 0 });
                if (c !== void 0) {
                  if (t === c) return;
                  if (t - c > 1 && n)
                    for (let e = c + 1n; e < t; e++)
                      (r.onBlockNumber(e, c), (c = e));
                }
                (c === void 0 || t > c) && (r.onBlockNumber(t, c), (c = t));
              } catch (e) {
                r.onError?.(e);
              }
            },
            { emitOnBegin: t, interval: o },
          ),
      )
    : K(
        I([`watchBlockNumber`, e.uid, t, n]),
        { onBlockNumber: r, onError: i },
        (t) => {
          let n = !0,
            r = () => (n = !1);
          return (
            (async () => {
              try {
                let { unsubscribe: i } = await (() => {
                  if (e.transport.type === `fallback`) {
                    let t = e.transport.transports.find(
                      (e) =>
                        e.config.type === `webSocket` ||
                        e.config.type === `ipc`,
                    );
                    return t ? t.value : e.transport;
                  }
                  return e.transport;
                })().subscribe({
                  params: [`newHeads`],
                  onData(e) {
                    if (!n) return;
                    let r = N(e.result?.number);
                    (t.onBlockNumber(r, c), (c = r));
                  },
                  onError(e) {
                    t.onError?.(e);
                  },
                });
                ((r = i), n || r());
              } catch (e) {
                i?.(e);
              }
            })(),
            () => r()
          );
        },
      );
}
async function sc(e, t) {
  let {
      checkReplacement: n = e.chain?.supportsTransactionReplacementDetection ??
        !0,
      confirmations: r = 1,
      hash: i,
      onReplaced: a,
      retryCount: o = 6,
      retryDelay: s = ({ count: e }) => ~~(1 << e) * 200,
      timeout: c = 18e4,
    } = t,
    l = I([`waitForTransactionReceipt`, e.uid, i]),
    u = t.pollingInterval
      ? t.pollingInterval
      : e.chain?.experimental_preconfirmationTime
        ? e.chain.experimental_preconfirmationTime
        : e.pollingInterval,
    d,
    f,
    p,
    m = !1,
    h,
    g,
    { promise: _, resolve: v, reject: y } = st(),
    b = c
      ? setTimeout(() => {
          (g?.(), h?.(), y(new he({ hash: i })));
        }, c)
      : void 0;
  return (
    (h = K(l, { onReplaced: a, resolve: v, reject: y }, async (t) => {
      if (
        ((p = await R(
          e,
          ss,
          `getTransactionReceipt`,
        )({ hash: i }).catch(() => void 0)),
        p && r <= 1)
      ) {
        (clearTimeout(b), t.resolve(p), h?.());
        return;
      }
      g = R(
        e,
        oc,
        `watchBlockNumber`,
      )({
        emitMissed: !0,
        emitOnBegin: !0,
        poll: !0,
        pollingInterval: u,
        async onBlockNumber(a) {
          let c = (e) => {
              (clearTimeout(b), g?.(), e(), h?.());
            },
            l = a;
          if (!m)
            try {
              if (p) {
                if (r > 1 && (!p.blockNumber || l - p.blockNumber + 1n < r))
                  return;
                c(() => t.resolve(p));
                return;
              }
              if (
                (n &&
                  !d &&
                  ((m = !0),
                  await pt(
                    async () => {
                      ((d = await R(e, as, `getTransaction`)({ hash: i })),
                        d.blockNumber && (l = d.blockNumber));
                    },
                    { delay: s, retryCount: o },
                  ),
                  (m = !1)),
                (p = await R(e, ss, `getTransactionReceipt`)({ hash: i })),
                r > 1 && (!p.blockNumber || l - p.blockNumber + 1n < r))
              )
                return;
              c(() => t.resolve(p));
            } catch (n) {
              if (n instanceof ye || n instanceof Te) {
                if (!d) {
                  m = !1;
                  return;
                }
                try {
                  ((f = d), (m = !0));
                  let n = await pt(
                    () =>
                      R(
                        e,
                        B,
                        `getBlock`,
                      )({ blockNumber: l, includeTransactions: !0 }),
                    {
                      delay: s,
                      retryCount: o,
                      shouldRetry: ({ error: e }) => e instanceof Wt,
                    },
                  );
                  m = !1;
                  let i = n.transactions.find(
                    ({ from: e, nonce: t }) => e === f.from && t === f.nonce,
                  );
                  if (
                    !i ||
                    ((p = await R(
                      e,
                      ss,
                      `getTransactionReceipt`,
                    )({ hash: i.hash })),
                    r > 1 && (!p.blockNumber || l - p.blockNumber + 1n < r))
                  )
                    return;
                  let a = `replaced`;
                  (i.to === f.to && i.value === f.value && i.input === f.input
                    ? (a = `repriced`)
                    : i.from === i.to && i.value === 0n && (a = `cancelled`),
                    c(() => {
                      (t.onReplaced?.({
                        reason: a,
                        replacedTransaction: f,
                        transaction: i,
                        transactionReceipt: p,
                      }),
                        t.resolve(p));
                    }));
                } catch (e) {
                  c(() => t.reject(e));
                }
              } else c(() => t.reject(n));
            }
        },
      });
    })),
    _
  );
}
var cc = [`size`, `totalDifficulty`, `transactions`, `uncles`, `withdrawals`];
function lc(e, { onBlockHeader: t, onError: n }) {
  let r;
  return K(
    I([`watchBlockHeaders`, e.uid]),
    { onBlockHeader: t, onError: n },
    (t) => {
      let n = !0,
        i = !1,
        a = () => (n = !1);
      return (
        (async () => {
          try {
            let { unsubscribe: o } = await (() => {
              if (e.transport.type === `fallback`) {
                let t = e.transport.transports.find(
                  (e) =>
                    e.config.type === `webSocket` || e.config.type === `ipc`,
                );
                return t ? t.value : e.transport;
              }
              return e.transport;
            })().subscribe({
              params: [`newHeads`],
              onData(i) {
                if (!n) return;
                let a = (e.chain?.formatters?.block?.format || Yt)(
                  i.result,
                  `watchBlockHeaders`,
                );
                for (let e of cc) delete a[e];
                (t.onBlockHeader(a, r), (r = a));
              },
              onError(e) {
                i && t.onError?.(e);
              },
            });
            ((i = !0), (a = o), n || a());
          } catch (e) {
            t.onError?.(e);
          }
        })(),
        () => a()
      );
    },
  );
}
function uc(
  e,
  {
    blockTag: t = e.experimental_blockTag ?? `latest`,
    emitMissed: n = !1,
    emitOnBegin: r = !1,
    onBlock: i,
    onError: a,
    includeTransactions: o,
    poll: s,
    pollingInterval: c = e.pollingInterval,
  },
) {
  let l =
      s === void 0
        ? e.transport.type !== `webSocket` &&
          e.transport.type !== `ipc` &&
          (e.transport.type !== `fallback` ||
            (e.transport.transports[0].config.type !== `webSocket` &&
              e.transport.transports[0].config.type !== `ipc`))
        : s,
    u = o ?? !1,
    d;
  return l
    ? K(
        I([`watchBlocks`, e.uid, t, n, r, u, c]),
        { onBlock: i, onError: a },
        (i) =>
          ur(
            async () => {
              try {
                let r = await R(
                  e,
                  B,
                  `getBlock`,
                )({ blockTag: t, includeTransactions: u });
                if (r.number !== null && d?.number != null) {
                  if (r.number === d.number) return;
                  if (r.number - d.number > 1 && n)
                    for (let t = d?.number + 1n; t < r.number; t++) {
                      let n = await R(
                        e,
                        B,
                        `getBlock`,
                      )({ blockNumber: t, includeTransactions: u });
                      (i.onBlock(n, d), (d = n));
                    }
                }
                (d?.number == null ||
                  (t === `pending` && r?.number == null) ||
                  (r.number !== null && r.number > d.number)) &&
                  (i.onBlock(r, d), (d = r));
              } catch (e) {
                i.onError?.(e);
              }
            },
            { emitOnBegin: r, interval: c },
          ),
      )
    : (() => {
        let n = !0,
          o = !0,
          s = () => (n = !1);
        return (
          (async () => {
            try {
              r &&
                R(
                  e,
                  B,
                  `getBlock`,
                )({ blockTag: t, includeTransactions: u })
                  .then((e) => {
                    n && (o &&= (i(e, void 0), !1));
                  })
                  .catch(a);
              let { unsubscribe: c } = await (() => {
                if (e.transport.type === `fallback`) {
                  let t = e.transport.transports.find(
                    (e) =>
                      e.config.type === `webSocket` || e.config.type === `ipc`,
                  );
                  return t ? t.value : e.transport;
                }
                return e.transport;
              })().subscribe({
                params: [`newHeads`],
                async onData(t) {
                  if (!n) return;
                  let r = await R(
                    e,
                    B,
                    `getBlock`,
                  )({
                    blockNumber: t.result?.number,
                    includeTransactions: u,
                  }).catch(() => {});
                  n && (i(r, d), (o = !1), (d = r));
                },
                onError(e) {
                  a?.(e);
                },
              });
              ((s = c), n || s());
            } catch (e) {
              a?.(e);
            }
          })(),
          () => s()
        );
      })();
}
function dc(
  e,
  {
    address: t,
    args: n,
    batch: r = !0,
    event: i,
    events: a,
    fromBlock: o,
    onError: s,
    onLogs: c,
    poll: l,
    pollingInterval: u = e.pollingInterval,
    strict: d,
  },
) {
  let f =
      l === void 0
        ? typeof o == `bigint` ||
          (e.transport.type !== `webSocket` &&
            e.transport.type !== `ipc` &&
            (e.transport.type !== `fallback` ||
              (e.transport.transports[0].config.type !== `webSocket` &&
                e.transport.transports[0].config.type !== `ipc`)))
        : l,
    p = d ?? !1;
  return f
    ? K(
        I([`watchEvent`, t, n, r, e.uid, i, u, o]),
        { onLogs: c, onError: s },
        (s) => {
          let c;
          o !== void 0 && (c = o - 1n);
          let l,
            d = !1,
            f = ur(
              async () => {
                if (!d) {
                  try {
                    l = await R(
                      e,
                      si,
                      `createEventFilter`,
                    )({
                      address: t,
                      args: n,
                      event: i,
                      events: a,
                      strict: p,
                      fromBlock: o,
                    });
                  } catch {}
                  d = !0;
                  return;
                }
                try {
                  let o;
                  if (l) o = await R(e, _r, `getFilterChanges`)({ filter: l });
                  else {
                    let r = await R(e, gr, `getBlockNumber`)({});
                    ((o =
                      c && c !== r
                        ? await R(
                            e,
                            Fn,
                            `getLogs`,
                          )({
                            address: t,
                            args: n,
                            event: i,
                            events: a,
                            fromBlock: c + 1n,
                            toBlock: r,
                          })
                        : []),
                      (c = r));
                  }
                  if (o.length === 0) return;
                  if (r) s.onLogs(o);
                  else for (let e of o) s.onLogs([e]);
                } catch (e) {
                  (l && e instanceof ft && (d = !1), s.onError?.(e));
                }
              },
              { emitOnBegin: !0, interval: u },
            );
          return async () => {
            (l && (await R(e, vr, `uninstallFilter`)({ filter: l })), f());
          };
        },
      )
    : (() => {
        let r = !0,
          o = () => (r = !1);
        return (
          (async () => {
            try {
              let l = (() => {
                  if (e.transport.type === `fallback`) {
                    let t = e.transport.transports.find(
                      (e) =>
                        e.config.type === `webSocket` ||
                        e.config.type === `ipc`,
                    );
                    return t ? t.value : e.transport;
                  }
                  return e.transport;
                })(),
                u = a ?? (i ? [i] : void 0),
                f = [];
              u &&
                ((f = [
                  u.flatMap((e) =>
                    St({ abi: [e], eventName: e.name, args: n }),
                  ),
                ]),
                i && (f = f[0]));
              let { unsubscribe: m } = await l.subscribe({
                params: [`logs`, { address: t, topics: f }],
                onData(e) {
                  if (!r) return;
                  let t = e.result;
                  try {
                    let { eventName: e, args: n } = jn({
                      abi: u ?? [],
                      data: t.data,
                      topics: t.topics,
                      strict: p,
                    });
                    c([V(t, { args: n, eventName: e })]);
                  } catch (e) {
                    let n, r;
                    if (e instanceof Ne || e instanceof Pe) {
                      if (d) return;
                      ((n = e.abiItem.name),
                        (r = e.abiItem.inputs?.some(
                          (e) => !(`name` in e && e.name),
                        )));
                    }
                    c([V(t, { args: r ? [] : {}, eventName: n })]);
                  }
                },
                onError(e) {
                  s?.(e);
                },
              });
              ((o = m), r || o());
            } catch (e) {
              s?.(e);
            }
          })(),
          () => o()
        );
      })();
}
function fc(
  e,
  {
    batch: t = !0,
    onError: n,
    onTransactions: r,
    poll: i,
    pollingInterval: a = e.pollingInterval,
  },
) {
  return (
    i === void 0
      ? e.transport.type !== `webSocket` && e.transport.type !== `ipc`
      : i
  )
    ? K(
        I([`watchPendingTransactions`, e.uid, t, a]),
        { onTransactions: r, onError: n },
        (n) => {
          let r,
            i = ur(
              async () => {
                try {
                  if (!r)
                    try {
                      r = await R(e, ci, `createPendingTransactionFilter`)({});
                      return;
                    } catch (e) {
                      throw (i(), e);
                    }
                  let a = await R(e, _r, `getFilterChanges`)({ filter: r });
                  if (a.length === 0) return;
                  if (t) n.onTransactions(a);
                  else for (let e of a) n.onTransactions([e]);
                } catch (e) {
                  n.onError?.(e);
                }
              },
              { emitOnBegin: !0, interval: a },
            );
          return async () => {
            (r && (await R(e, vr, `uninstallFilter`)({ filter: r })), i());
          };
        },
      )
    : (() => {
        let t = !0,
          i = () => (t = !1);
        return (
          (async () => {
            try {
              let { unsubscribe: a } = await e.transport.subscribe({
                params: [`newPendingTransactions`],
                onData(e) {
                  if (!t) return;
                  let n = e.result;
                  r([n]);
                },
                onError(e) {
                  n?.(e);
                },
              });
              ((i = a), t || i());
            } catch (e) {
              n?.(e);
            }
          })(),
          () => i()
        );
      })();
}
var pc = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
function mc(e) {
  return pc.test(e) ? !Number.isNaN(new Date(e).getTime()) : !1;
}
function hc(e) {
  return mc(e) ? new Date(e) : new Date(NaN);
}
function gc(e) {
  let { scheme: t, statement: n, ...r } = e.match(_c)?.groups ?? {},
    {
      chainId: i,
      expirationTime: a,
      issuedAt: o,
      notBefore: s,
      requestId: c,
      ...l
    } = e.match(vc)?.groups ?? {},
    u = e
      .split(`Resources:`)[1]
      ?.split(
        `
- `,
      )
      .slice(1);
  return {
    ...r,
    ...l,
    ...(i ? { chainId: Number(i) } : {}),
    ...(a ? { expirationTime: hc(a) } : {}),
    ...(o ? { issuedAt: hc(o) } : {}),
    ...(s ? { notBefore: hc(s) } : {}),
    ...(c ? { requestId: c } : {}),
    ...(u ? { resources: u } : {}),
    ...(t ? { scheme: t } : {}),
    ...(n ? { statement: n } : {}),
  };
}
var _c =
    /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+\-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/,
  vc =
    /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;
function yc(e) {
  let {
    address: t,
    domain: n,
    message: r,
    nonce: i,
    scheme: a,
    time: o = new Date(),
  } = e;
  if (
    (n && r.domain !== n) ||
    (i && r.nonce !== i) ||
    (a && r.scheme !== a) ||
    Number.isNaN(o.getTime()) ||
    (r.expirationTime &&
      (Number.isNaN(r.expirationTime.getTime()) || o >= r.expirationTime)) ||
    (r.notBefore && (Number.isNaN(r.notBefore.getTime()) || o < r.notBefore))
  )
    return !1;
  try {
    if (!r.address || !We(r.address, { strict: !1 }) || (t && !s(r.address, t)))
      return !1;
  } catch {
    return !1;
  }
  return !0;
}
async function bc(e, t) {
  let {
      address: n,
      domain: r,
      message: i,
      nonce: a,
      scheme: o,
      signature: s,
      time: c = new Date(),
      ...l
    } = t,
    u = gc(i);
  if (
    !u.address ||
    !yc({ address: n, domain: r, message: u, nonce: a, scheme: o, time: c })
  )
    return !1;
  let d = _t(i);
  return ec(e, { address: u.address, hash: d, signature: s, ...l });
}
function xc(e, t) {
  return { amount: e, decimals: t, formatted: yt(e, t) };
}
function Sc(e, t) {
  let { decimals: n, token: r } = t,
    i = Cc(e, r);
  if (i) return { address: i.address, decimals: n ?? i.decimals };
  if (We(r, { strict: !1 })) return { address: r, decimals: n ?? Ec(e, r) };
  throw Error(
    `Token "${r}" is not a declared ERC-20 token on the client's \`tokens\` array (with an address for the client's chain), and is not a valid address.`,
  );
}
function Cc(e, t) {
  let n = e.tokens,
    r = e.chain?.id;
  if (!n || r === void 0) return;
  let i = Tc(n, t);
  if (i) return wc(i, r);
  if (We(t, { strict: !1 }))
    for (let e of n) {
      let n = wc(e, r);
      if (n && s(n.address, t)) return n;
    }
}
function wc(e, t) {
  let n = e.addresses[t];
  if (n)
    return {
      address: n,
      currency: e.currency,
      decimals: e.decimals,
      name: e.name,
      popular: e.popular,
      symbol: e.symbol,
    };
}
function Tc(e, t) {
  let n = t.toLowerCase();
  for (let t of e) if (t.symbol?.toLowerCase() === n) return t;
}
function Ec(e, t) {
  let n = e.tokens,
    r = e.chain?.id;
  if (n && r !== void 0)
    for (let e of n) {
      let n = wc(e, r);
      if (n && s(n.address, t)) return n.decimals;
    }
}
async function Dc(e, t) {
  let { address: n, decimals: r } = Sc(e, t);
  return r === void 0
    ? {
        address: n,
        decimals: await G(e, { abi: T, address: n, functionName: `decimals` }),
      }
    : { address: n, decimals: r };
}
function Oc(e) {
  return { ...e, data: k(e), to: e.address };
}
async function kc(
  e,
  { serializedTransaction: t, throwOnReceiptRevert: n, timeout: r },
) {
  let i = await e.request(
      { method: `eth_sendRawTransactionSync`, params: r ? [t, r] : [t] },
      { retryCount: 0 },
    ),
    a = (e.chain?.formatters?.transactionReceipt?.format || wr)(i);
  if (a.status === `reverted` && n) throw new ae({ receipt: a });
  return a;
}
async function Ac(e, t) {
  let { account: n, decimals: r, spender: i, token: a, ...o } = t,
    [s, { decimals: c }] = await Promise.all([
      G(e, { ...o, ...Ac.call(e, { account: n, spender: i, token: a }) }),
      Dc(e, { decimals: r, token: a }),
    ]);
  return xc(s, c);
}
(function (e) {
  function t(e, t) {
    return Oc({
      address: Sc(e, t).address,
      abi: T,
      functionName: `allowance`,
      args: [t.account, t.spender],
    });
  }
  e.call = t;
})((Ac ||= {}));
async function jc(e, t) {
  let { account: n = e.account, decimals: r, token: i, ...a } = t;
  if (!n) throw new br();
  let o = E(n).address,
    [s, { decimals: c }] = await Promise.all([
      G(e, { ...a, ...jc.call(e, { account: o, token: i }) }),
      Dc(e, { decimals: r, token: i }),
    ]);
  return xc(s, c);
}
(function (e) {
  function t(e, t) {
    let n = t.account ?? e.account;
    if (!n) throw new br();
    let r = E(n).address;
    return Oc({
      address: Sc(e, t).address,
      abi: T,
      functionName: `balanceOf`,
      args: [r],
    });
  }
  e.call = t;
})((jc ||= {}));
async function Mc(e, t) {
  let { token: n, ...r } = t,
    { address: i } = Sc(e, { token: n }),
    a = Cc(e, n),
    [o, s, c] = await Promise.all([
      a?.decimals ??
        G(e, { ...r, abi: T, address: i, functionName: `decimals` }),
      a?.name ?? G(e, { ...r, abi: T, address: i, functionName: `name` }),
      a?.symbol ?? G(e, { ...r, abi: T, address: i, functionName: `symbol` }),
    ]);
  return { decimals: o, name: s, symbol: c };
}
async function Nc(e, t) {
  let { decimals: n, token: r, ...i } = t,
    [a, { decimals: o }] = await Promise.all([
      G(e, { ...i, ...Nc.call(e, { token: r }) }),
      Dc(e, { decimals: n, token: r }),
    ]);
  return xc(a, o);
}
(function (e) {
  function t(e, t) {
    return Oc({
      address: Sc(e, t).address,
      abi: T,
      args: [],
      functionName: `totalSupply`,
    });
  }
  e.call = t;
})((Nc ||= {}));
function Pc(e) {
  return {
    call: (t) => fe(e, t),
    createAccessList: (t) => ai(e, t),
    createBlockFilter: () => oi(e),
    createContractEventFilter: (t) => Tt(e, t),
    createEventFilter: (t) => si(e, t),
    createPendingTransactionFilter: () => ci(e),
    estimateContractGas: (t) => kn(e, t),
    estimateGas: (t) => On(e, t),
    getBalance: (t) => li(e, t),
    getBlobBaseFee: () => ui(e),
    getBlock: (t) => B(e, t),
    getBlockNumber: (t) => gr(e, t),
    getBlockReceipts: (t) => di(e, t),
    getBlockTransactionCount: (t) => fi(e, t),
    getBytecode: (t) => pi(e, t),
    getChainId: () => Sn(e),
    getCode: (t) => pi(e, t),
    getContractEvents: (t) => In(e, t),
    getDelegation: (t) => mi(e, t),
    getEip712Domain: (t) => gi(e, t),
    getEnsAddress: (t) => Fr(e, t),
    getEnsAvatar: (t) => ni(e, t),
    getEnsName: (t) => ri(e, t),
    getEnsResolver: (t) => ii(e, t),
    getEnsText: (t) => ti(e, t),
    getFeeHistory: (t) => yi(e, t),
    estimateFeesPerGas: (t) => en(e, t),
    getFilterChanges: (t) => _r(e, t),
    getFilterLogs: (t) => bi(e, t),
    getGasPrice: () => Zt(e),
    getLogs: (t) => Fn(e, t),
    getProof: (t) => ts(e, t),
    estimateMaxPriorityFeePerGas: (t) => Qt(e, t),
    fillTransaction: (t) => Cn(e, t),
    getRawTransaction: (t) => ns(e, t),
    getStorageAt: (t) => rs(e, t),
    getStorageValues: (t) => is(e, t),
    getTransaction: (t) => as(e, t),
    getTransactionConfirmations: (t) => os(e, t),
    getTransactionCount: (t) => nn(e, t),
    getTransactionReceipt: (t) => ss(e, t),
    multicall: (t) => cs(e, t),
    prepareTransactionRequest: (t) => Dn(e, t),
    readContract: (t) => G(e, t),
    sendRawTransaction: (t) => Sr(e, t),
    sendRawTransactionSync: (t) => kc(e, t),
    simulate: (t) => us(e, t),
    simulateBlocks: (t) => us(e, t),
    simulateCalls: (t) => Vs(e, t),
    simulateContract: (t) => or(e, t),
    verifyHash: (t) => ec(e, t),
    verifyMessage: (t) => ic(e, t),
    verifySiweMessage: (t) => bc(e, t),
    verifyTypedData: (t) => ac(e, t),
    uninstallFilter: (t) => vr(e, t),
    waitForTransactionReceipt: (t) => sc(e, t),
    watchBlockHeaders: (t) => lc(e, t),
    watchBlocks: (t) => uc(e, t),
    watchBlockNumber: (t) => oc(e, t),
    watchContractEvent: (t) => yr(e, t),
    watchEvent: (t) => dc(e, t),
    watchPendingTransactions: (t) => fc(e, t),
    token: Fc(e),
  };
}
function Fc(e) {
  return {
    getAllowance: Or(e, Ac),
    getBalance: Or(e, jc),
    getMetadata: Or(e, Mc),
    getTotalSupply: Or(e, Nc),
  };
}
var Ic = Si({
  id: 1,
  name: `Ethereum`,
  nativeCurrency: { name: `Ether`, symbol: `ETH`, decimals: 18 },
  blockTime: 12e3,
  rpcUrls: { default: { http: [`https://ethereum.reth.rs/rpc`] } },
  blockExplorers: {
    default: {
      name: `Etherscan`,
      url: `https://etherscan.io`,
      apiUrl: `https://api.etherscan.io/api`,
    },
  },
  contracts: {
    ensUniversalResolver: {
      address: `0xeeeeeeee14d718c2b47d9923deab1335e144eeee`,
      blockCreated: 23085558,
    },
    multicall3: {
      address: `0xca11bde05977b3631167028862be2a173976ca11`,
      blockCreated: 14353601,
    },
  },
});
export {
  ln as A,
  z as B,
  Sn as C,
  hn as D,
  yn as E,
  Xt as F,
  qt as I,
  Kt as L,
  rn as M,
  nn as N,
  gn as O,
  en as P,
  Lt as R,
  Dn as S,
  bn as T,
  R as V,
  ur as _,
  Si as a,
  V as b,
  ri as c,
  Tr as d,
  wr as f,
  xr as g,
  br as h,
  cs as i,
  an as j,
  _n as k,
  ni as l,
  Sr as m,
  Pc as n,
  pi as o,
  Cr as p,
  sc as r,
  li as s,
  Ic as t,
  Er as u,
  K as v,
  xn as w,
  wn as x,
  G as y,
  jt as z,
};
