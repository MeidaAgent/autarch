import { s as e } from "./rolldown-runtime.js";
import { n as t, t as n } from "./jsx-runtime.js";
import {
  A as r,
  D as i,
  E as a,
  F as o,
  I as s,
  L as c,
  M as l,
  N as u,
  R as d,
  S as f,
  T as p,
  _ as m,
  a as h,
  b as g,
  f as _,
  g as v,
  h as y,
  i as b,
  n as x,
  o as S,
  p as C,
  r as w,
  s as T,
  t as E,
  v as D,
  w as O,
  x as k,
  y as A,
  z as j,
} from "./UI.js";
import { t as M } from "./download.js";
import {
  MarketplaceContent as N,
  agentUrl as P,
  n as F,
  t as I,
} from "./MarketplaceContent.js";
var L = {
  name: `briefcase-business`,
  size: 24,
  node: [
    [`path`, { d: `M12 12h.01`, key: `1mp3jc` }],
    [`path`, { d: `M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2`, key: `1ksdt3` }],
    [`path`, { d: `M22 13a18.15 18.15 0 0 1-20 0`, key: `12hx5q` }],
    [
      `rect`,
      { width: `20`, height: `14`, x: `2`, y: `6`, rx: `2`, key: `i6l2r4` },
    ],
  ],
};
L.node;
var R = j(L),
  z = {
    name: `clock`,
    size: 24,
    node: [
      [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
      [`path`, { d: `M12 6v6l4 2`, key: `mmk7yg` }],
    ],
  };
z.node;
var B = j(z),
  V = {
    name: `external-link`,
    size: 24,
    node: [
      [`path`, { d: `M15 3h6v6`, key: `1q9fwt` }],
      [`path`, { d: `M10 14 21 3`, key: `gplh6r` }],
      [
        `path`,
        {
          d: `M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,
          key: `a6xqqp`,
        },
      ],
    ],
  };
V.node;
var ee = j(V),
  H = {
    name: `settings-2`,
    size: 24,
    node: [
      [`path`, { d: `M14 17H5`, key: `gfn3mx` }],
      [`path`, { d: `M19 7h-9`, key: `6i9tg` }],
      [`circle`, { cx: `17`, cy: `17`, r: `3`, key: `18b49y` }],
      [`circle`, { cx: `7`, cy: `7`, r: `3`, key: `dfmy0x` }],
    ],
  };
H.node;
var U = j(H),
  W = e(t(), 1),
  G = e(n(), 1),
  K = new Set([`Open`, `Funded`, `Submitted`]),
  q = (e) =>
    e
      ? new Date(e).toLocaleDateString(`en-US`, {
          month: `short`,
          day: `numeric`,
        })
      : `—`;
function te({
  state: e,
  agents: t,
  account: n,
  onCreate: r,
  onJob: a,
  onAgent: o,
  onHire: s,
  navigate: l,
  onSaved: u,
}) {
  let m = e.jobs || [],
    h = m.filter((e) => K.has(e.status));
  m.filter((e) => e.status === `Completed`);
  let g = h.reduce((e, t) => e + Number(t.budget || 0), 0),
    _ = [
      {
        label: `Active jobs`,
        value: h.length,
        detail: `Open, funded, or in review`,
        Icon: R,
        action: () => l(`jobs`),
      },
      {
        label: `Escrowed`,
        value: f(g),
        unit: `USDG`,
        detail: `Across active jobs`,
        Icon: O,
        action: () => l(`jobs`),
      },
      {
        label: `Available balance`,
        value: f(n?.balances?.availableUsdg || 0),
        unit: `USDG`,
        detail: n ? `Internal Autarch balance` : `Sign in to load balance`,
        Icon: p,
        action: () => l(`jobs`),
      },
      {
        label: `Saved agents`,
        value: e.saved.length,
        detail: `Your browser shortlist`,
        Icon: F,
        action: u,
      },
    ],
    v = (0, W.useMemo)(
      () =>
        [...m]
          .sort(
            (e, t) => new Date(t.createdAt || 0) - new Date(e.createdAt || 0),
          )
          .slice(0, 5),
      [m],
    );
  return (0, G.jsxs)(`div`, {
    className: `overview-premium`,
    children: [
      (0, G.jsxs)(`div`, {
        className: `overview-heading`,
        children: [
          (0, G.jsxs)(`div`, {
            children: [
              (0, G.jsxs)(`span`, {
                className: `eyebrow`,
                children: [(0, G.jsx)(`span`, {}), ` WORKSPACE / OVERVIEW`],
              }),
              (0, G.jsxs)(`h1`, {
                children: [
                  `Your work, in motion`,
                  (0, G.jsx)(`span`, { children: `.` }),
                ],
              }),
              (0, G.jsx)(`p`, {
                children: `Live jobs, agents, and balances from your Autarch account.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `overview-heading-actions`,
            children: [
              (0, G.jsxs)(`span`, {
                className: `overview-date`,
                children: [
                  (0, G.jsx)(B, { size: 12 }),
                  new Date().toLocaleDateString(`en-US`, {
                    month: `long`,
                    day: `numeric`,
                    year: `numeric`,
                  }),
                ],
              }),
              (0, G.jsxs)(`div`, {
                children: [
                  (0, G.jsxs)(E, {
                    secondary: !0,
                    onClick: () => l(`agents`),
                    children: [`Explore agents `, (0, G.jsx)(c, { size: 14 })],
                  }),
                  (0, G.jsxs)(E, {
                    onClick: r,
                    children: [(0, G.jsx)(i, { size: 15 }), `Create a job`],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, G.jsx)(`div`, {
        className: `premium-metrics`,
        children: _.map(
          ({ label: e, value: t, unit: n, detail: r, Icon: i, action: a }, o) =>
            (0, G.jsxs)(
              `section`,
              {
                className: `premium-surface premium-metric`,
                children: [
                  (0, G.jsxs)(`div`, {
                    className: `metric-label`,
                    children: [
                      (0, G.jsx)(`span`, { children: e }),
                      (0, G.jsx)(i, { size: 15 }),
                    ],
                  }),
                  (0, G.jsxs)(`button`, {
                    className: `metric-value`,
                    onClick: a,
                    children: [
                      t,
                      (0, G.jsx)(`small`, { children: n }),
                      (0, G.jsx)(c, { size: 16 }),
                    ],
                  }),
                  (0, G.jsxs)(`div`, {
                    className: `metric-bottom`,
                    children: [
                      (0, G.jsxs)(`span`, {
                        children: [(0, G.jsx)(`i`, {}), ` `, r],
                      }),
                      (0, G.jsxs)(`span`, {
                        className: `metric-number`,
                        children: [`0`, o + 1],
                      }),
                    ],
                  }),
                ],
              },
              e,
            ),
        ),
      }),
      (0, G.jsxs)(`div`, {
        className: `overview-columns`,
        children: [
          (0, G.jsx)(`div`, {
            className: `overview-primary`,
            children: (0, G.jsxs)(`section`, {
              className: `premium-surface work-ledger`,
              children: [
                (0, G.jsxs)(`div`, {
                  className: `premium-panel-head`,
                  children: [
                    (0, G.jsxs)(`div`, {
                      children: [
                        (0, G.jsx)(`span`, {
                          className: `panel-overline`,
                          children: `LIVE JOBS`,
                        }),
                        (0, G.jsxs)(`h2`, {
                          children: [
                            `Your job desk `,
                            (0, G.jsx)(`span`, { children: m.length }),
                          ],
                        }),
                      ],
                    }),
                    (0, G.jsxs)(`button`, {
                      className: `subtle-link`,
                      onClick: () => l(`jobs`),
                      children: [`View all `, (0, G.jsx)(c, { size: 14 })],
                    }),
                  ],
                }),
                (0, G.jsx)(`div`, {
                  className: `premium-job-list`,
                  children: v.length
                    ? v.map((e) => {
                        let n = t.find((t) => t.id === e.agent);
                        return (0, G.jsxs)(
                          `button`,
                          {
                            className: `premium-job-row`,
                            onClick: () => a(e),
                            children: [
                              (0, G.jsx)(A, { agent: n, size: 21 }),
                              (0, G.jsxs)(`span`, {
                                className: `premium-job-title`,
                                children: [
                                  (0, G.jsx)(`strong`, { children: e.title }),
                                  (0, G.jsxs)(`small`, {
                                    children: [
                                      n?.name || e.agent,
                                      (0, G.jsx)(`i`, {}),
                                      ` `,
                                      e.id,
                                    ],
                                  }),
                                ],
                              }),
                              (0, G.jsx)(`span`, {
                                className: `premium-job-progress`,
                                children: (0, G.jsx)(T, { value: e.status }),
                              }),
                              (0, G.jsxs)(`span`, {
                                className: `premium-job-budget`,
                                children: [
                                  (0, G.jsxs)(`b`, {
                                    children: [
                                      f(e.budget),
                                      ` `,
                                      (0, G.jsx)(`small`, { children: `USDG` }),
                                    ],
                                  }),
                                  (0, G.jsxs)(`span`, {
                                    children: [`Due `, q(e.deadline)],
                                  }),
                                ],
                              }),
                              (0, G.jsx)(d, { size: 14 }),
                            ],
                          },
                          e.id,
                        );
                      })
                    : (0, G.jsx)(x, {
                        title: `No live jobs yet`,
                        action: (0, G.jsx)(E, {
                          onClick: r,
                          children: `Create a job`,
                        }),
                        children: `Publish or select an active marketplace agent to begin.`,
                      }),
                }),
              ],
            }),
          }),
          (0, G.jsx)(`div`, {
            className: `overview-secondary`,
            children: (0, G.jsxs)(`section`, {
              className: `premium-surface escrow-overview`,
              children: [
                (0, G.jsxs)(`div`, {
                  className: `premium-panel-head`,
                  children: [
                    (0, G.jsxs)(`div`, {
                      children: [
                        (0, G.jsx)(`span`, {
                          className: `panel-overline`,
                          children: `ACCOUNT`,
                        }),
                        (0, G.jsx)(`h2`, { children: `Job escrow` }),
                      ],
                    }),
                    (0, G.jsx)(`img`, {
                      src: `../brand/usdg-official.png`,
                      alt: `USDG`,
                      className: `currency-token`,
                    }),
                  ],
                }),
                (0, G.jsx)(`div`, {
                  className: `escrow-chart`,
                  children: (0, G.jsxs)(`div`, {
                    children: [
                      (0, G.jsx)(`span`, { children: `ACTIVE ESCROW` }),
                      (0, G.jsx)(`strong`, { children: f(g) }),
                      (0, G.jsx)(`small`, { children: `USDG` }),
                    ],
                  }),
                }),
                (0, G.jsxs)(`div`, {
                  className: `escrow-note`,
                  children: [
                    (0, G.jsx)(p, { size: 13 }),
                    (0, G.jsxs)(`span`, {
                      children: [
                        `Balances are read from your`,
                        (0, G.jsx)(`br`, {}),
                        `signed Autarch account.`,
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, G.jsxs)(`div`, {
        className: `agent-discovery-heading`,
        children: [
          (0, G.jsxs)(`div`, {
            children: [
              (0, G.jsx)(`span`, {
                className: `panel-overline`,
                children: `LIVE MARKETPLACE`,
              }),
              (0, G.jsx)(`h2`, { children: `Available agents.` }),
            ],
          }),
          (0, G.jsxs)(`button`, {
            onClick: () => l(`agents`),
            children: [`Explore agent market `, (0, G.jsx)(d, { size: 15 })],
          }),
        ],
      }),
      t.length
        ? (0, G.jsx)(`div`, {
            className: `discovery-grid`,
            children: t
              .slice(0, 3)
              .map((e) =>
                (0, G.jsxs)(
                  `section`,
                  {
                    className: `premium-surface discovery-card`,
                    style: { "--agent-color": e.color },
                    children: [
                      (0, G.jsxs)(`div`, {
                        className: `discovery-top`,
                        children: [
                          (0, G.jsx)(A, { agent: e, size: 23 }),
                          (0, G.jsx)(`span`, { children: e.category }),
                          (0, G.jsx)(`button`, {
                            className: `icon-button`,
                            "aria-label": `View ` + e.name,
                            onClick: () => o(e),
                            children: (0, G.jsx)(c, { size: 16 }),
                          }),
                        ],
                      }),
                      (0, G.jsxs)(`button`, {
                        className: `discovery-name`,
                        onClick: () => o(e),
                        children: [
                          e.name,
                          (0, G.jsx)(`span`, { children: e.symbol }),
                        ],
                      }),
                      (0, G.jsx)(`p`, { children: e.description }),
                      (0, G.jsxs)(`div`, {
                        className: `discovery-bottom`,
                        children: [
                          (0, G.jsxs)(`span`, {
                            children: [
                              `From `,
                              (0, G.jsx)(`b`, { children: f(e.price) }),
                              ` USDG / job`,
                            ],
                          }),
                          (0, G.jsxs)(`button`, {
                            onClick: () => s(e),
                            children: [`Hire `, (0, G.jsx)(d, { size: 13 })],
                          }),
                        ],
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
          })
        : (0, G.jsx)(x, {
            title: `No active agents yet`,
            action: (0, G.jsx)(E, {
              secondary: !0,
              onClick: () => l(`launch`),
              children: `Publish an agent`,
            }),
            children: `New agent profiles will appear here as their owners publish them.`,
          }),
    ],
  });
}
function ne({
  agents: e,
  jobs: t,
  onClose: n,
  onJob: r,
  onAgent: i,
  navigate: o,
}) {
  let [l, u] = (0, W.useState)(``),
    d = l.trim().toLowerCase(),
    f = (e) => e.toLowerCase().includes(d),
    p = [
      ...t
        .filter((e) => f(e.title + ` ` + e.id + ` ` + e.status))
        .map((e) => ({
          id: e.id,
          label: e.title,
          meta: e.id + ` · ` + e.status,
          type: `Job`,
          icon: (0, G.jsx)(R, { size: 17 }),
          action: () => r(e),
        })),
      ...e
        .filter((e) => f(e.name + ` ` + e.category))
        .map((e) => ({
          id: e.id,
          label: e.name,
          meta: e.category,
          type: `Agent`,
          icon: (0, G.jsx)(A, { agent: e, size: 16 }),
          action: () => i(e),
        })),
      ...Object.entries(k)
        .filter(([e, t]) => f(t.title + ` ` + t.eyebrow))
        .map(([e, t]) => ({
          id: `doc-` + e,
          label: t.title,
          meta: t.eyebrow,
          type: `Guide`,
          icon: (0, G.jsx)(s, { size: 17 }),
          href: `/docs/` + e,
        })),
    ].slice(0, 9);
  return (0, G.jsx)(b, {
    title: `Search your workspace`,
    onClose: n,
    children: (0, G.jsxs)(`div`, {
      className: `command-search`,
      children: [
        (0, G.jsxs)(`label`, {
          children: [
            (0, G.jsx)(a, { size: 18 }),
            (0, G.jsx)(`input`, {
              autoFocus: !0,
              "aria-label": `Search jobs, agents, and guides`,
              placeholder: `Search jobs, agents, and guides…`,
              value: l,
              onChange: (e) => u(e.target.value),
            }),
            (0, G.jsx)(`kbd`, { children: `ESC` }),
          ],
        }),
        (0, G.jsx)(`div`, {
          className: `command-results`,
          children: p.length
            ? p.map((e) => {
                let t = e.href ? `a` : `button`;
                return (0, G.jsxs)(
                  t,
                  {
                    href: e.href,
                    onClick: e.action,
                    children: [
                      (0, G.jsx)(`span`, {
                        className: `command-result-icon`,
                        children: e.icon,
                      }),
                      (0, G.jsxs)(`span`, {
                        children: [
                          (0, G.jsx)(`strong`, { children: e.label }),
                          (0, G.jsx)(`small`, { children: e.meta }),
                        ],
                      }),
                      (0, G.jsx)(`span`, {
                        className: `command-result-type`,
                        children: e.type,
                      }),
                      (0, G.jsx)(c, { size: 14 }),
                    ],
                  },
                  e.id,
                );
              })
            : (0, G.jsxs)(`p`, {
                className: `command-empty`,
                children: [
                  `No results for “`,
                  l,
                  `”. Try an agent name or job ID.`,
                ],
              }),
        }),
        (0, G.jsxs)(`div`, {
          className: `command-foot`,
          children: [
            (0, G.jsx)(`span`, { children: `Tab to move · Enter to open` }),
            (0, G.jsx)(`span`, { children: `Autarch workspace` }),
          ],
        }),
      ],
    }),
  });
}
var re = `autarch.workspace.v2`,
  J = (e) => new Date(Date.now() + e * 864e5).toISOString().slice(0, 10),
  Y = () => ({ version: 2, saved: [] });
function ie() {
  try {
    let e = JSON.parse(localStorage.getItem(re));
    return e?.version === 2 && Array.isArray(e.saved) ? e : Y();
  } catch {
    return Y();
  }
}
var X = [
  [`overview`, `Overview`, I],
  [`agents`, `Agent market`, r],
  [`jobs`, `Your jobs`, R],
  [`launch`, `Launch an agent`, i],
  [`settings`, `Workspace settings`, U],
];
function Z() {
  let [e, t] = (0, W.useState)(ie),
    [n, r] = (0, W.useState)(``),
    [o, f] = (0, W.useState)(
      () => new URLSearchParams(location.search).get(`view`) || `overview`,
    ),
    [p, b] = (0, W.useState)(``),
    [w, T] = (0, W.useState)(
      () => new URLSearchParams(location.search).get(`filter`) || `All`,
    ),
    [O, k] = (0, W.useState)(null),
    [A, j] = (0, W.useState)(``),
    F = y(),
    [I, L] = (0, W.useState)([]),
    [R, z] = (0, W.useState)([]),
    [B, V] = (0, W.useState)(``),
    [ee, H] = (0, W.useState)(!1),
    U = I,
    K = F.apiSession ? R : [],
    q = async () => {
      (H(!0), V(``));
      try {
        let e = await m.agents();
        if ((L((e.data || []).map(v)), F.apiSession)) {
          let e = await m.jobs(`cookie`);
          z((e.data || []).map(D));
        }
      } catch (e) {
        V(e?.message || `Could not reach the Autarch API.`);
      } finally {
        H(!1);
      }
    };
  ((0, W.useEffect)(() => {
    q();
  }, [F.apiSession?.id]),
    (0, W.useEffect)(() => {
      let e = new URLSearchParams(location.search).get(`hire`);
      if (e && U.some((t) => t.id === e)) {
        k({ type: `create-job`, agent: e });
        let t = new URL(location.href);
        (t.searchParams.delete(`hire`),
          history.replaceState(null, ``, t.pathname + t.search));
      }
    }, []),
    (0, W.useEffect)(() => {
      document.title = `Autarch — Your workspace`;
      try {
        (localStorage.setItem(re, JSON.stringify(e)), r(``));
      } catch {
        r(
          `Browser storage is unavailable. Changes are in memory only; export your workspace before leaving.`,
        );
      }
    }, [e]),
    (0, W.useEffect)(() => {
      let e = () => {
        (f(new URLSearchParams(location.search).get(`view`) || `overview`),
          b(``),
          T(new URLSearchParams(location.search).get(`filter`) || `All`));
      };
      return (
        addEventListener(`popstate`, e),
        () => removeEventListener(`popstate`, e)
      );
    }, []),
    (0, W.useEffect)(() => {
      if (A) {
        let e = setTimeout(() => j(``), 5500);
        return () => clearTimeout(e);
      }
    }, [A]));
  let J = (e, t = `All`) => {
    (f(e),
      b(``),
      T(t),
      history.pushState(
        null,
        ``,
        `/app?view=${e}${t === `All` ? `` : `&filter=` + encodeURIComponent(t)}`,
      ),
      window.scrollTo(0, 0));
  };
  (0, W.useEffect)(() => {
    let e = (e) => {
      (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === `k` &&
        (e.preventDefault(),
        k((e) => (e?.type === `search` ? null : { type: `search` })));
    };
    return (
      window.addEventListener(`keydown`, e),
      () => window.removeEventListener(`keydown`, e)
    );
  }, []);
  let Y = (e) => j(e),
    Z = () => {
      let t = URL.createObjectURL(
          new Blob(
            [
              JSON.stringify(
                { ...e, exportedAt: new Date().toISOString() },
                null,
                2,
              ),
            ],
            { type: `application/json` },
          ),
        ),
        n = document.createElement(`a`);
      ((n.href = t),
        (n.download = `autarch-workspace-preferences.json`),
        n.click(),
        setTimeout(() => URL.revokeObjectURL(t), 1e3),
        Y(`Workspace preferences exported.`));
    },
    Q = (e) => k({ type: `create-job`, agent: e?.id });
  (K.filter((e) => [`Funded`, `Submitted`].includes(e.status)).reduce(
    (e, t) => e + t.budget,
    0,
  ),
    U.filter(
      (t) =>
        (w === `All` ||
          t.category === w ||
          (w === `Saved` && e.saved.includes(t.id))) &&
        (t.name + ` ` + t.description + ` ` + t.tags.join(` `))
          .toLowerCase()
          .includes(p.toLowerCase()),
    ));
  let pe = K.filter(
      (e) =>
        (w === `All` || e.status === w) &&
        (e.title + ` ` + e.id).toLowerCase().includes(p.toLowerCase()),
    ),
    $ = O?.type === `job` ? K.find((e) => e.id === O.id) : null,
    me = (e) =>
      t((t) => ({
        ...t,
        saved: t.saved.includes(e)
          ? t.saved.filter((t) => t !== e)
          : [...t.saved, e],
      })),
    he = async (e) => {
      (L((t) => [e, ...t]),
        Y(`Agent published to the live marketplace.`),
        J(`agents`));
    },
    ge = (e) => {
      (z((t) => [e, ...t]),
        Y(`Encrypted job created in Autarch.`),
        k({ type: `job`, id: e.id }));
    };
  return (0, G.jsxs)(`div`, {
    className: `workspace`,
    children: [
      (0, G.jsxs)(`aside`, {
        className: `app-sidebar`,
        children: [
          (0, G.jsx)(g, {}),
          (0, G.jsxs)(`div`, {
            className: `workspace-picker`,
            children: [
              (0, G.jsx)(`span`, {
                className: `workspace-avatar`,
                children: `A`,
              }),
              (0, G.jsxs)(`span`, {
                children: [
                  `Your workspace`,
                  (0, G.jsx)(`small`, {
                    children: F.apiSession ? `Signed in` : `Connect wallet`,
                  }),
                ],
              }),
              (0, G.jsx)(l, { size: 14 }),
            ],
          }),
          (0, G.jsx)(`span`, {
            className: `sidebar-label`,
            children: `WORKSPACE`,
          }),
          (0, G.jsx)(`nav`, {
            "aria-label": `Workspace navigation`,
            children: X.slice(0, 3).map(([e, t, n]) =>
              (0, G.jsxs)(
                `button`,
                {
                  className: o === e ? `active` : ``,
                  onClick: () => J(e),
                  "aria-current": o === e ? `page` : void 0,
                  children: [
                    (0, G.jsx)(n, { size: 17 }),
                    t,
                    e === `jobs` && (0, G.jsx)(`small`, { children: K.length }),
                  ],
                },
                e,
              ),
            ),
          }),
          (0, G.jsx)(`span`, { className: `sidebar-label`, children: `BUILD` }),
          (0, G.jsxs)(`nav`, {
            "aria-label": `Build and settings`,
            children: [
              X.slice(3).map(([e, t, n]) =>
                (0, G.jsxs)(
                  `button`,
                  {
                    className: o === e ? `active` : ``,
                    onClick: () => J(e),
                    children: [(0, G.jsx)(n, { size: 17 }), t],
                  },
                  e,
                ),
              ),
              (0, G.jsxs)(`a`, {
                href: `/docs`,
                children: [
                  (0, G.jsx)(s, { size: 17 }),
                  `Documentation`,
                  (0, G.jsx)(c, { size: 13 }),
                ],
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `sidebar-bottom`,
            children: [
              (0, G.jsxs)(`div`, {
                className: `sidebar-help`,
                children: [
                  (0, G.jsx)(`span`, {
                    children: `Good work starts with a clear brief.`,
                  }),
                  (0, G.jsxs)(`a`, {
                    href: `/docs/jobs`,
                    children: [
                      `Explore the job lifecycle `,
                      (0, G.jsx)(d, { size: 13 }),
                    ],
                  }),
                ],
              }),
              (0, G.jsx)(`a`, { href: `/`, children: `← Back to Autarch` }),
            ],
          }),
        ],
      }),
      (0, G.jsxs)(`div`, {
        className: `app-content`,
        children: [
          (0, G.jsxs)(`header`, {
            className: `app-topbar`,
            children: [
              (0, G.jsxs)(`span`, {
                className: `app-breadcrumb`,
                children: [
                  `Workspace `,
                  (0, G.jsx)(l, { size: 12 }),
                  ` `,
                  X.find((e) => e[0] === o)?.[1] || `Overview`,
                ],
              }),
              (0, G.jsxs)(`div`, {
                children: [
                  (0, G.jsxs)(`button`, {
                    className: `workspace-search-trigger`,
                    onClick: () => k({ type: `search` }),
                    "aria-label": `Search workspace`,
                    children: [
                      (0, G.jsx)(a, { size: 14 }),
                      (0, G.jsx)(`span`, { children: `Search anything…` }),
                      (0, G.jsx)(`kbd`, { children: `Ctrl K` }),
                    ],
                  }),
                  (0, G.jsxs)(`span`, {
                    className: `local-mode`,
                    children: [
                      (0, G.jsx)(`i`, {}),
                      F.apiSession ? `` : `Connect to begin`,
                    ],
                  }),
                  (0, G.jsx)(C, {}),
                  (0, G.jsx)(`button`, {
                    className: `icon-button export-workspace`,
                    "aria-label": `Export workspace preferences`,
                    title: `Export workspace preferences`,
                    onClick: Z,
                    children: (0, G.jsx)(M, { size: 15 }),
                  }),
                ],
              }),
            ],
          }),
          (0, G.jsx)(`nav`, {
            className: `app-mobile-nav`,
            "aria-label": `Mobile workspace navigation`,
            children: X.map(([e, t]) =>
              (0, G.jsx)(
                `button`,
                {
                  className: o === e ? `active` : ``,
                  onClick: () => J(e),
                  children: t,
                },
                e,
              ),
            ),
          }),
          (0, G.jsxs)(`main`, {
            className: `workspace-main`,
            children: [
              !F.apiSession &&
                (0, G.jsxs)(`div`, {
                  className: `sample-notice`,
                  children: [
                    (0, G.jsxs)(`span`, {
                      children: [
                        (0, G.jsx)(`i`, {}),
                        ` SIGNED SESSION REQUIRED`,
                      ],
                    }),
                    `Connect and sign in to create or view private jobs.`,
                  ],
                }),
              n && (0, G.jsx)(h, { error: !0, children: n }),
              B && (0, G.jsx)(h, { error: !0, children: B }),
              (o === `overview` || !X.some((e) => e[0] === o)) &&
                (0, G.jsx)(te, {
                  state: { ...e, jobs: K },
                  agents: U,
                  account: F.apiSession,
                  onCreate: () => Q(),
                  onJob: (e) => k({ type: `job`, id: e.id }),
                  onAgent: (e) => {
                    location.href = P(e);
                  },
                  onHire: Q,
                  navigate: J,
                  onSaved: () => J(`agents`, `Saved`),
                }),
              o === `agents` &&
                (0, G.jsx)(N, {
                  agents: U,
                  saved: e.saved,
                  onSave: me,
                  onHire: Q,
                  initialFilter: w,
                }),
              o === `jobs` &&
                (0, G.jsxs)(G.Fragment, {
                  children: [
                    (0, G.jsx)(S, {
                      eyebrow: `FROM BRIEF TO SETTLEMENT`,
                      title: `Your jobs.`,
                      action: (0, G.jsxs)(E, {
                        onClick: () => Q(),
                        disabled: !F.apiSession,
                        children: [(0, G.jsx)(i, { size: 15 }), `Create a job`],
                      }),
                      children: `Jobs shown here are loaded from your Autarch account.`,
                    }),
                    (0, G.jsxs)(`div`, {
                      className: `toolbar`,
                      children: [
                        (0, G.jsx)(ae, {
                          value: p,
                          onChange: b,
                          label: `Search jobs`,
                        }),
                        (0, G.jsx)(`select`, {
                          "aria-label": `Filter jobs by status`,
                          value: w,
                          onChange: (e) => T(e.target.value),
                          children: [
                            `All`,
                            `Open`,
                            `Funded`,
                            `Submitted`,
                            `Completed`,
                            `Rejected`,
                            `Expired`,
                          ].map((e) =>
                            (0, G.jsx)(`option`, { children: e }, e),
                          ),
                        }),
                      ],
                    }),
                    pe.length
                      ? (0, G.jsx)(oe, {
                          jobs: pe,
                          agents: U,
                          onSelect: (e) => k({ type: `job`, id: e.id }),
                        })
                      : (0, G.jsx)(x, {
                          title: F.apiSession
                            ? `No jobs yet`
                            : `Sign in to view jobs`,
                          children: F.apiSession
                            ? `Create a job when an agent is available in the marketplace.`
                            : `Your private jobs are available after wallet sign-in.`,
                        }),
                    F.apiSession &&
                      (0, G.jsx)(h, {
                        children: `Live jobs are private to their client, agent owner, and evaluator. Funding needs a sufficient internal USDG balance.`,
                      }),
                  ],
                }),
              o === `launch` &&
                (0, G.jsx)(fe, {
                  token: F.apiSession ? `cookie` : null,
                  onSave: he,
                }),
              o === `settings` &&
                (0, G.jsxs)(G.Fragment, {
                  children: [
                    (0, G.jsx)(S, {
                      eyebrow: `WORKSPACE SETTINGS`,
                      title: `Your account.`,
                      children: `Manage your current wallet connection, evaluator profile, and saved shortlist.`,
                    }),
                    (0, G.jsxs)(`div`, {
                      className: `settings-panel`,
                      children: [
                        (0, G.jsx)(`h2`, { children: `Shortlist` }),
                        (0, G.jsxs)(`p`, {
                          children: [
                            e.saved.length,
                            ` marketplace agents saved in this browser.`,
                          ],
                        }),
                        (0, G.jsxs)(E, {
                          onClick: Z,
                          children: [
                            (0, G.jsx)(M, { size: 15 }),
                            `Export preferences`,
                          ],
                        }),
                      ],
                    }),
                    (0, G.jsxs)(`div`, {
                      className: `settings-panel`,
                      children: [
                        (0, G.jsx)(`h2`, { children: `Connection status` }),
                        (0, G.jsx)(`p`, {
                          children: F.session.address
                            ? `Connected as ${F.session.address} on ${F.ready ? `Robinhood Chain` : `another network`}.`
                            : `Use Connect wallet to open the wallet provider.`,
                        }),
                        F.apiSession &&
                          (0, G.jsxs)(`p`, {
                            className: `mono muted`,
                            children: [`Account ID: `, F.apiSession.id],
                          }),
                        F.session.address &&
                          (0, G.jsx)(E, {
                            secondary: !0,
                            onClick: F.disconnect,
                            children: `Disconnect wallet`,
                          }),
                      ],
                    }),
                    F.apiSession && (0, G.jsx)(ue, { token: `cookie` }),
                    new URLSearchParams(location.search).get(`operator`) ===
                      `1` &&
                      F.apiSession &&
                      (0, G.jsx)(de, {
                        token: `cookie`,
                        currentUser: F.apiSession,
                        onNotice: Y,
                      }),
                  ],
                }),
            ],
          }),
          (0, G.jsxs)(`footer`, {
            className: `app-footer`,
            children: [
              (0, G.jsxs)(`span`, {
                children: [
                  `autarch `,
                  (0, G.jsx)(`i`, {}),
                  ` Agents work. You’re the autarch.`,
                ],
              }),
              (0, G.jsxs)(`div`, {
                children: [
                  (0, G.jsx)(`a`, {
                    href: `/docs/privacy`,
                    children: `Privacy`,
                  }),
                  (0, G.jsx)(`a`, {
                    href: `/docs/notice`,
                    children: `Product notice`,
                  }),
                  (0, G.jsx)(`a`, {
                    href: `/docs/status`,
                    children: `Product status`,
                  }),
                ],
              }),
              (0, G.jsx)(_, {}),
            ],
          }),
        ],
      }),
      A &&
        (0, G.jsxs)(`div`, {
          className: `toast`,
          role: `status`,
          children: [(0, G.jsx)(u, { size: 15 }), A],
        }),
      O?.type === `search` &&
        (0, G.jsx)(ne, {
          agents: U,
          jobs: K,
          onClose: () => k(null),
          onJob: (e) => k({ type: `job`, id: e.id }),
          onAgent: (e) => {
            location.href = P(e);
          },
          navigate: J,
        }),
      O?.type === `create-job` &&
        (0, G.jsx)(ce, {
          agents: U,
          defaultAgent: O.agent,
          token: F.apiSession ? `cookie` : null,
          onClose: () => k(null),
          onSave: ge,
        }),
      O?.type === `agent` &&
        (0, G.jsx)(se, {
          agent: O.agent,
          onClose: () => k(null),
          onHire: () => Q(O.agent),
        }),
      $ &&
        (0, G.jsx)(le, {
          job: $,
          agent: U.find((e) => e.id === $.agent),
          token: `cookie`,
          account: F.apiSession,
          onClose: () => k(null),
          onUpdated: async (e) => {
            (await q(), Y(e));
          },
        }),
    ],
  });
}
function ae({ value: e, onChange: t, label: n }) {
  return (0, G.jsxs)(`label`, {
    className: `search-field`,
    children: [
      (0, G.jsx)(a, { size: 16 }),
      (0, G.jsx)(`input`, {
        "aria-label": n,
        placeholder: n + `…`,
        value: e,
        onChange: (e) => t(e.target.value),
      }),
    ],
  });
}
function oe({ jobs: e, agents: t, onSelect: n }) {
  return (0, G.jsx)(`div`, {
    className: `table-scroll`,
    children: (0, G.jsxs)(`table`, {
      className: `job-table`,
      children: [
        (0, G.jsx)(`thead`, {
          children: (0, G.jsxs)(`tr`, {
            children: [
              (0, G.jsx)(`th`, { children: `Job` }),
              (0, G.jsx)(`th`, { children: `Agent` }),
              (0, G.jsx)(`th`, { children: `Status` }),
              (0, G.jsx)(`th`, { children: `Budget` }),
              (0, G.jsx)(`th`, {
                children: (0, G.jsx)(`span`, {
                  className: `sr-only`,
                  children: `Open`,
                }),
              }),
            ],
          }),
        }),
        (0, G.jsx)(`tbody`, {
          children: e.map((e) =>
            (0, G.jsxs)(
              `tr`,
              {
                children: [
                  (0, G.jsx)(`td`, {
                    children: (0, G.jsxs)(`button`, {
                      onClick: () => n(e),
                      children: [
                        (0, G.jsx)(`strong`, { children: e.title }),
                        (0, G.jsx)(`small`, { children: e.id }),
                      ],
                    }),
                  }),
                  (0, G.jsx)(`td`, {
                    children: (0, G.jsxs)(`span`, {
                      className: `table-agent`,
                      children: [
                        (0, G.jsx)(A, {
                          agent: t.find((t) => t.id === e.agent),
                          size: 14,
                        }),
                        t.find((t) => t.id === e.agent)?.name || e.agent,
                      ],
                    }),
                  }),
                  (0, G.jsx)(`td`, {
                    children: (0, G.jsx)(T, { value: e.status }),
                  }),
                  (0, G.jsxs)(`td`, {
                    className: `mono`,
                    children: [
                      f(e.budget),
                      ` `,
                      (0, G.jsx)(`small`, { children: `USDG` }),
                    ],
                  }),
                  (0, G.jsx)(`td`, {
                    children: (0, G.jsx)(`button`, {
                      className: `icon-button`,
                      "aria-label": `Open ` + e.title,
                      onClick: () => n(e),
                      children: (0, G.jsx)(c, { size: 15 }),
                    }),
                  }),
                ],
              },
              e.id,
            ),
          ),
        }),
      ],
    }),
  });
}
function se({ agent: e, onClose: t, onHire: n }) {
  return (0, G.jsx)(b, {
    title: e.name,
    onClose: t,
    children: (0, G.jsxs)(`div`, {
      className: `dialog-body`,
      children: [
        (0, G.jsxs)(`div`, {
          className: `agent-detail-intro`,
          children: [
            (0, G.jsx)(A, { agent: e, size: 32 }),
            (0, G.jsxs)(`div`, {
              children: [
                (0, G.jsx)(`span`, {
                  className: `eyebrow`,
                  children: e.draft ? `LOCAL PROFILE DRAFT` : `PUBLISHED AGENT`,
                }),
                (0, G.jsx)(`p`, { children: e.description }),
              ],
            }),
          ],
        }),
        (0, G.jsx)(`div`, {
          className: `agent-tags`,
          children: e.tags.map((e) => (0, G.jsx)(`span`, { children: e }, e)),
        }),
        (0, G.jsxs)(`div`, {
          className: `key-values`,
          children: [
            (0, G.jsxs)(`div`, {
              children: [
                (0, G.jsx)(`span`, { children: `Category` }),
                (0, G.jsx)(`b`, { children: e.category }),
              ],
            }),
            (0, G.jsxs)(`div`, {
              children: [
                (0, G.jsx)(`span`, { children: `Starting job fee` }),
                (0, G.jsxs)(`b`, { children: [f(e.price), ` USDG`] }),
              ],
            }),
            (0, G.jsxs)(`div`, {
              children: [
                (0, G.jsx)(`span`, { children: `Identity` }),
                (0, G.jsx)(`b`, {
                  children: e.draft
                    ? `Unpublished draft`
                    : `Illustrative profile`,
                }),
              ],
            }),
          ],
        }),
        (0, G.jsx)(`h3`, { children: `Define a good job` }),
        (0, G.jsx)(`p`, {
          children: `Specify the output, acceptance criteria, deadline, and evaluator before funding. Your first step is a private job brief.`,
        }),
        (0, G.jsxs)(E, {
          onClick: n,
          children: [
            `Create a job for `,
            e.name,
            ` `,
            (0, G.jsx)(d, { size: 14 }),
          ],
        }),
      ],
    }),
  });
}
function ce({ agents: e, defaultAgent: t, token: n, onClose: r, onSave: i }) {
  let [a, o] = (0, W.useState)({
      title: ``,
      brief: ``,
      criteria: ``,
      agent: t || e[0]?.id,
      evaluator: ``,
      budget: e.find((e) => e.id === t)?.price || 0,
      deadline: J(7),
    }),
    [s, c] = (0, W.useState)(``),
    [l, u] = (0, W.useState)(!1),
    [p, g] = (0, W.useState)([]);
  (0, W.useEffect)(() => {
    let e = !0;
    return (
      m
        .evaluators()
        .then((t) => {
          e && g(t.data || []);
        })
        .catch(() => {}),
      () => {
        e = !1;
      }
    );
  }, []);
  let _ = (e, t) => {
      (o({ ...a, [e]: t }), c(``));
    },
    v = e.find((e) => e.id === a.agent);
  return (0, G.jsx)(b, {
    title: `Create a job`,
    onClose: r,
    wide: !0,
    children: (0, G.jsxs)(`form`, {
      onSubmit: async (e) => {
        if ((e.preventDefault(), !n)) {
          c(`Sign in with your wallet before creating a job.`);
          return;
        }
        if (!v) {
          c(`Choose an active marketplace agent.`);
          return;
        }
        let t = a.criteria
          .split(
            `
`,
          )
          .map((e) => e.trim())
          .filter(Boolean);
        if (!t.length) {
          c(`Add at least one acceptance criterion.`);
          return;
        }
        u(!0);
        try {
          let e = new Date(`${a.deadline}T23:59:59.999Z`),
            r = new Date(e.getTime() + 6048e5),
            o = await m.createJob(n, {
              agentId: a.agent,
              evaluatorId: a.evaluator || void 0,
              title: a.title.trim(),
              brief: a.brief.trim(),
              acceptanceCriteria: t,
              budgetUsdg: +a.budget,
              deadlineAt: e.toISOString(),
              expiresAt: r.toISOString(),
            });
          i(D(o.data));
        } catch (e) {
          c(e?.message || `Could not create this job.`);
        } finally {
          u(!1);
        }
      },
      className: `dialog-body`,
      children: [
        (0, G.jsx)(h, {
          children: `Your brief is encrypted before storage. Choose an independent evaluator now so the job can settle after delivery.`,
        }),
        (0, G.jsx)(w, {
          label: `Job title`,
          children: (0, G.jsx)(`input`, {
            autoFocus: !0,
            required: !0,
            minLength: 5,
            maxLength: 100,
            value: a.title,
            onChange: (e) => _(`title`, e.target.value),
            placeholder: `What needs to get done?`,
          }),
        }),
        (0, G.jsx)(w, {
          label: `Private brief`,
          help: `Describe the inputs, output format, constraints, and delivery context.`,
          children: (0, G.jsx)(`textarea`, {
            required: !0,
            minLength: 30,
            maxLength: 4e3,
            rows: 4,
            value: a.brief,
            onChange: (e) => _(`brief`, e.target.value),
            placeholder: `Describe the output, sources, format, and relevant context.`,
          }),
        }),
        (0, G.jsx)(w, {
          label: `Acceptance criteria`,
          help: `One check per line. The evaluator uses these criteria when settling the job.`,
          children: (0, G.jsx)(`textarea`, {
            required: !0,
            rows: 3,
            value: a.criteria,
            onChange: (e) => _(`criteria`, e.target.value),
            placeholder: `Source-linked report
Covers the agreed scope
Delivered in the requested format`,
          }),
        }),
        (0, G.jsxs)(`div`, {
          className: `form-grid`,
          children: [
            (0, G.jsx)(w, {
              label: `Agent`,
              children: (0, G.jsxs)(`select`, {
                value: a.agent || ``,
                onChange: (e) => _(`agent`, e.target.value),
                children: [
                  (0, G.jsx)(`option`, {
                    value: ``,
                    disabled: !0,
                    children: `Select an active agent`,
                  }),
                  e.map((e) =>
                    (0, G.jsxs)(
                      `option`,
                      { value: e.id, children: [e.name, ` · `, e.category] },
                      e.id,
                    ),
                  ),
                ],
              }),
            }),
            (0, G.jsx)(w, {
              label: `Independent evaluator`,
              children: (0, G.jsxs)(`select`, {
                value: a.evaluator,
                onChange: (e) => _(`evaluator`, e.target.value),
                children: [
                  (0, G.jsx)(`option`, {
                    value: ``,
                    children: `No evaluator assigned`,
                  }),
                  p.map((e) => {
                    let t = Number(e.stake_usdg || 0);
                    return (0, G.jsxs)(
                      `option`,
                      {
                        value: e.user_id,
                        children: [
                          e.wallet_address.slice(0, 8),
                          `…`,
                          e.wallet_address.slice(-6),
                          ` · `,
                          f(t),
                          ` `,
                          `USDG staked`,
                        ],
                      },
                      e.user_id,
                    );
                  }),
                ],
              }),
            }),
            (0, G.jsx)(w, {
              label: `Job budget (USDG)`,
              children: (0, G.jsx)(`input`, {
                type: `number`,
                min: `0.01`,
                step: `0.01`,
                required: !0,
                value: a.budget,
                onChange: (e) => _(`budget`, e.target.value),
              }),
            }),
            (0, G.jsx)(w, {
              label: `Deadline`,
              children: (0, G.jsx)(`input`, {
                type: `date`,
                min: J(1),
                required: !0,
                value: a.deadline,
                onChange: (e) => _(`deadline`, e.target.value),
              }),
            }),
          ],
        }),
        !p.length &&
          (0, G.jsx)(h, {
            children: `No eligible independent evaluators are listed yet. You can create a job without one, but it cannot be settled until an evaluator is assigned.`,
          }),
        s && (0, G.jsx)(h, { error: !0, children: s }),
        (0, G.jsxs)(`div`, {
          className: `form-actions`,
          children: [
            (0, G.jsx)(E, {
              type: `button`,
              secondary: !0,
              onClick: r,
              children: `Cancel`,
            }),
            (0, G.jsxs)(E, {
              type: `submit`,
              disabled: l || !n,
              children: [
                l ? `Creating…` : `Create encrypted job`,
                ` `,
                (0, G.jsx)(d, { size: 14 }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function le({
  job: e,
  agent: t,
  token: n,
  account: r,
  onClose: i,
  onUpdated: a,
}) {
  let [o, s] = (0, W.useState)(null),
    [c, l] = (0, W.useState)(``),
    [p, g] = (0, W.useState)(``),
    [_, v] = (0, W.useState)(``),
    [x, S] = (0, W.useState)(``),
    [C, D] = (0, W.useState)(``),
    k = y(),
    A = async () => {
      l(``);
      try {
        let t = await m.job(n, e.id);
        s(t.data);
      } catch (e) {
        l(e?.message || `Could not load this private job.`);
      }
    };
  (0, W.useEffect)(() => {
    A();
  }, [e.id]);
  let j = async (e, t, n) => {
      (g(e), l(``));
      try {
        (await t(), await A(), await a(n));
      } catch (e) {
        l(e?.message || `The job action could not be completed.`);
      } finally {
        g(``);
      }
    },
    M = o || e,
    N = String(M.status || e.status).replace(/^./, (e) => e.toUpperCase()),
    P = o?.client_id === r?.id,
    F = o?.provider_id === r?.id,
    I =
      o?.evaluator_id === r?.id ||
      !!(o && !o.evaluator_id && o.client_id === r?.id),
    L = [];
  try {
    L = Array.isArray(M.acceptance_criteria)
      ? M.acceptance_criteria
      : typeof M.acceptance_criteria == `string`
        ? JSON.parse(M.acceptance_criteria || `[]`)
        : [];
  } catch {}
  return (0, G.jsx)(b, {
    title: e.title,
    onClose: i,
    wide: !0,
    children: (0, G.jsxs)(`div`, {
      className: `dialog-body`,
      children: [
        (0, G.jsxs)(`div`, {
          className: `job-detail-top`,
          children: [
            (0, G.jsx)(`span`, { className: `mono muted`, children: e.id }),
            (0, G.jsx)(T, { value: N }),
          ],
        }),
        !o && !c && (0, G.jsx)(h, { children: `Loading private job details…` }),
        (0, G.jsxs)(`div`, {
          className: `key-values grid-2`,
          children: [
            (0, G.jsxs)(`div`, {
              children: [
                (0, G.jsx)(`span`, { children: `Agent` }),
                (0, G.jsx)(`b`, {
                  children: o?.agent_name || t?.name || e.agent,
                }),
              ],
            }),
            (0, G.jsxs)(`div`, {
              children: [
                (0, G.jsx)(`span`, { children: `Budget` }),
                (0, G.jsxs)(`b`, {
                  children: [f(Number(M.budget_usdg ?? M.budget)), ` USDG`],
                }),
              ],
            }),
            (0, G.jsxs)(`div`, {
              children: [
                (0, G.jsx)(`span`, { children: `Deadline` }),
                (0, G.jsx)(`b`, {
                  children: String(M.deadline_at || e.deadline || `—`).slice(
                    0,
                    10,
                  ),
                }),
              ],
            }),
            (0, G.jsxs)(`div`, {
              children: [
                (0, G.jsx)(`span`, { children: `Your role` }),
                (0, G.jsx)(`b`, {
                  children: P
                    ? `Client`
                    : F
                      ? `Agent operator`
                      : I
                        ? `Evaluator`
                        : `Participant`,
                }),
              ],
            }),
          ],
        }),
        (0, G.jsx)(`h3`, { children: `Private brief` }),
        (0, G.jsx)(`p`, {
          className: `job-brief`,
          children: M.brief || `Loading…`,
        }),
        (0, G.jsx)(`h3`, { children: `Acceptance criteria` }),
        (0, G.jsx)(`ul`, {
          className: `job-criteria`,
          children: L.map((e, t) =>
            (0, G.jsxs)(
              `li`,
              { children: [(0, G.jsx)(u, { size: 13 }), e] },
              t,
            ),
          ),
        }),
        M.submission &&
          (0, G.jsxs)(G.Fragment, {
            children: [
              (0, G.jsx)(`h3`, { children: `Delivery` }),
              (0, G.jsx)(`p`, {
                className: `job-brief`,
                children: M.submission.deliverable,
              }),
              M.submission.evidence?.length > 0 &&
                (0, G.jsx)(`div`, {
                  className: `evidence-links`,
                  children: M.submission.evidence.map((e) =>
                    (0, G.jsxs)(
                      `a`,
                      {
                        href: e,
                        target: `_blank`,
                        rel: `noreferrer`,
                        children: [(0, G.jsx)(ee, { size: 13 }), e],
                      },
                      e,
                    ),
                  ),
                }),
            ],
          }),
        M.evaluation &&
          (0, G.jsxs)(G.Fragment, {
            children: [
              (0, G.jsxs)(`h3`, {
                children: [`Evaluation · `, M.evaluation.outcome],
              }),
              (0, G.jsx)(`p`, {
                className: `job-brief`,
                children: M.evaluation.rationale,
              }),
            ],
          }),
        c && (0, G.jsx)(h, { error: !0, children: c }),
        o &&
          (0, G.jsxs)(`div`, {
            className: `live-job-action`,
            children: [
              (0, G.jsx)(`h3`, { children: `Live job action` }),
              N === `Open` &&
                P &&
                (0, G.jsxs)(G.Fragment, {
                  children: [
                    (0, G.jsx)(`p`, {
                      children:
                        o.escrow_mode === `onchain`
                          ? `Your wallet will send the USDG budget and a quoted $1 ETH reserve to this job’s escrow wallet. The escrow wallet pays settlement gas and returns its remaining ETH to you.`
                          : `Fund ${f(Number(o.budget_usdg) + Number(o.evaluator_fee_usdg || 0))} USDG from your internal Autarch balance into escrow.`,
                    }),
                    (0, G.jsxs)(E, {
                      onClick: () =>
                        j(
                          `fund`,
                          () =>
                            o.escrow_mode === `onchain`
                              ? k.fundEscrow(e.id)
                              : m.fundJob(n, e.id),
                          `Job funded and moved into escrow.`,
                        ),
                      disabled: p === `fund`,
                      children: [
                        p === `fund` ? `Funding…` : `Fund job`,
                        ` `,
                        (0, G.jsx)(O, { size: 14 }),
                      ],
                    }),
                  ],
                }),
              N === `Funded` &&
                F &&
                (0, G.jsxs)(`form`, {
                  onSubmit: (t) => {
                    t.preventDefault();
                    let r = x
                      .split(/\n|,/)
                      .map((e) => e.trim())
                      .filter(Boolean);
                    j(
                      `submit`,
                      () =>
                        m.submitJob(n, e.id, { deliverable: _, evidence: r }),
                      `Delivery submitted for evaluation.`,
                    );
                  },
                  children: [
                    (0, G.jsx)(`p`, {
                      children: `Submit the final work. Autarch encrypts the delivery at rest.`,
                    }),
                    (0, G.jsx)(w, {
                      label: `Delivery`,
                      children: (0, G.jsx)(`textarea`, {
                        required: !0,
                        minLength: 1,
                        rows: 5,
                        value: _,
                        onChange: (e) => v(e.target.value),
                        placeholder: `Provide the completed work or a clear delivery summary.`,
                      }),
                    }),
                    (0, G.jsx)(w, {
                      label: `Evidence links`,
                      help: `Optional. One HTTPS URL per line.`,
                      children: (0, G.jsx)(`textarea`, {
                        rows: 2,
                        value: x,
                        onChange: (e) => S(e.target.value),
                        placeholder: `https://…`,
                      }),
                    }),
                    (0, G.jsxs)(E, {
                      type: `submit`,
                      disabled: p === `submit`,
                      children: [
                        p === `submit` ? `Submitting…` : `Submit delivery`,
                        ` `,
                        (0, G.jsx)(d, { size: 14 }),
                      ],
                    }),
                  ],
                }),
              N === `Submitted` &&
                I &&
                (0, G.jsxs)(`form`, {
                  onSubmit: (t) => {
                    (t.preventDefault(),
                      j(
                        `evaluate`,
                        () =>
                          m.evaluateJob(n, e.id, {
                            outcome: `accepted`,
                            rationale: C,
                          }),
                        `Job accepted and escrow settled.`,
                      ));
                  },
                  children: [
                    (0, G.jsx)(`p`, {
                      children: `Review the private delivery against the agreed criteria. Accepting releases escrow to the agent owner.`,
                    }),
                    (0, G.jsx)(w, {
                      label: `Evaluation rationale`,
                      children: (0, G.jsx)(`textarea`, {
                        required: !0,
                        minLength: 1,
                        rows: 4,
                        value: C,
                        onChange: (e) => D(e.target.value),
                        placeholder: `Explain how the delivery meets the criteria.`,
                      }),
                    }),
                    (0, G.jsxs)(`div`, {
                      className: `job-actions`,
                      children: [
                        (0, G.jsxs)(E, {
                          type: `submit`,
                          disabled: p === `accept`,
                          children: [
                            p === `accept` ? `Settling…` : `Accept and settle`,
                            ` `,
                            (0, G.jsx)(u, { size: 14 }),
                          ],
                        }),
                        (0, G.jsx)(E, {
                          type: `button`,
                          secondary: !0,
                          disabled: p === `reject` || !C.trim(),
                          onClick: () =>
                            j(
                              `reject`,
                              () =>
                                m.evaluateJob(n, e.id, {
                                  outcome: `rejected`,
                                  rationale: C,
                                }),
                              `Job rejected and escrow refunded to the client.`,
                            ),
                          children:
                            p === `reject` ? `Rejecting…` : `Reject and refund`,
                        }),
                      ],
                    }),
                  ],
                }),
              N === `Open` &&
                !P &&
                (0, G.jsx)(`p`, {
                  children: `Waiting for the client to fund this job.`,
                }),
              N === `Funded` &&
                !F &&
                (0, G.jsx)(`p`, {
                  children: `Escrow is funded. Waiting for the agent operator to submit delivery.`,
                }),
              N === `Submitted` &&
                !I &&
                (0, G.jsx)(`p`, {
                  children: o.evaluator_id
                    ? `Waiting for the assigned evaluator to settle this job.`
                    : `No evaluator is assigned, so this submitted job cannot settle yet.`,
                }),
              [`Completed`, `Rejected`, `Expired`, `Cancelled`].includes(N) &&
                (0, G.jsxs)(`p`, {
                  children: [
                    `This job is closed.`,
                    ` `,
                    o.escrow_mode === `onchain`
                      ? `Settlement transaction hashes are retained in Autarch’s escrow record.`
                      : `Its final status is recorded in the Autarch ledger.`,
                  ],
                }),
            ],
          }),
      ],
    }),
  });
}
function ue({ token: e }) {
  let [t, n] = (0, W.useState)(null),
    [r, i] = (0, W.useState)(``),
    [a, o] = (0, W.useState)(!1),
    [s, c] = (0, W.useState)(``),
    [l, u] = (0, W.useState)(!1);
  return (
    (0, W.useEffect)(() => {
      let t = !0;
      return (
        m
          .evaluatorProfile(e)
          .then((e) => {
            if (!t) return;
            let r = e.data;
            (n(r), i((r?.specialties || []).join(`, `)), o(!!r?.active));
          })
          .catch(
            (e) => t && c(e?.message || `Could not load evaluator profile.`),
          ),
        () => {
          t = !1;
        }
      );
    }, [e]),
    (0, G.jsxs)(`form`, {
      className: `settings-panel`,
      onSubmit: async (t) => {
        (t.preventDefault(), u(!0), c(``));
        try {
          let t = await m.updateEvaluatorProfile(e, {
            specialties: r
              .split(`,`)
              .map((e) => e.trim())
              .filter(Boolean),
            active: a,
          });
          n(t.data);
        } catch (e) {
          c(e?.message || `Could not save evaluator profile.`);
        } finally {
          u(!1);
        }
      },
      children: [
        (0, G.jsx)(`h2`, { children: `Evaluator profile` }),
        (0, G.jsx)(`p`, {
          children: `Activate this only if you are available to independently review delivery. Listing requires operator-assigned stake of at least 5,000 USDG.`,
        }),
        (0, G.jsx)(w, {
          label: `Specialties`,
          help: `Comma-separated, for example: Research, Data analysis`,
          children: (0, G.jsx)(`input`, {
            value: r,
            onChange: (e) => i(e.target.value),
            placeholder: `Research, Automation`,
          }),
        }),
        (0, G.jsxs)(`label`, {
          className: `check-field`,
          children: [
            (0, G.jsx)(`input`, {
              type: `checkbox`,
              checked: a,
              onChange: (e) => o(e.target.checked),
            }),
            `Available to evaluate jobs`,
          ],
        }),
        t &&
          (0, G.jsxs)(`p`, {
            className: `mono muted`,
            children: [`Profile status: `, t.active ? `active` : `inactive`],
          }),
        s && (0, G.jsx)(h, { error: !0, children: s }),
        (0, G.jsxs)(E, {
          type: `submit`,
          disabled: l,
          children: [
            l ? `Saving…` : `Save evaluator profile`,
            ` `,
            (0, G.jsx)(p, { size: 14 }),
          ],
        }),
      ],
    })
  );
}
function de({ token: e, currentUser: t, onNotice: n }) {
  let [r, i] = (0, W.useState)(t.id),
    [a, o] = (0, W.useState)(`1000`),
    [s, c] = (0, W.useState)(`test-credit-` + Date.now()),
    [l, u] = (0, W.useState)(t.id),
    [d, f] = (0, W.useState)(`5000`),
    [p, g] = (0, W.useState)(`test-stake-` + Date.now()),
    [_, v] = (0, W.useState)(``),
    [y, b] = (0, W.useState)(``),
    x = async (e, t, r) => {
      (b(e), v(``));
      try {
        (await t(), n(r));
      } catch (e) {
        v(e?.message || `Operator action was denied.`);
      } finally {
        b(``);
      }
    };
  return (0, G.jsxs)(`section`, {
    className: `settings-panel operator-panel`,
    children: [
      (0, G.jsx)(`span`, {
        className: `eyebrow`,
        children: `OPERATOR-ONLY TEST CONTROLS`,
      }),
      (0, G.jsx)(`h2`, { children: `Test ledger setup` }),
      (0, G.jsx)(`p`, {
        children: `These controls are not part of normal navigation. Every request is checked again by the backend admin-wallet allowlist and recorded in the audit ledger. USDG here is internal test credit, never an on-chain transfer.`,
      }),
      (0, G.jsxs)(`div`, {
        className: `form-grid`,
        children: [
          (0, G.jsxs)(`form`, {
            onSubmit: (t) => {
              (t.preventDefault(),
                x(
                  `credit`,
                  () =>
                    m.creditTestBalance(e, {
                      userId: r,
                      amountUsdg: +a,
                      reference: s,
                    }),
                  `Test USDG credited to the selected account.`,
                ));
            },
            children: [
              (0, G.jsx)(w, {
                label: `Account ID to credit`,
                children: (0, G.jsx)(`input`, {
                  required: !0,
                  value: r,
                  onChange: (e) => i(e.target.value),
                }),
              }),
              (0, G.jsx)(w, {
                label: `Credit amount (USDG)`,
                children: (0, G.jsx)(`input`, {
                  type: `number`,
                  min: `0.01`,
                  step: `0.01`,
                  value: a,
                  onChange: (e) => o(e.target.value),
                }),
              }),
              (0, G.jsx)(w, {
                label: `Audit reference`,
                children: (0, G.jsx)(`input`, {
                  required: !0,
                  minLength: 8,
                  value: s,
                  onChange: (e) => c(e.target.value),
                }),
              }),
              (0, G.jsx)(E, {
                type: `submit`,
                disabled: y === `credit`,
                children: y === `credit` ? `Crediting…` : `Credit test USDG`,
              }),
            ],
          }),
          (0, G.jsxs)(`form`, {
            onSubmit: (t) => {
              (t.preventDefault(),
                x(
                  `stake`,
                  () =>
                    m.setEvaluatorStake(e, {
                      userId: l,
                      stakeUsdg: +d,
                      reference: p,
                    }),
                  `Evaluator test stake updated.`,
                ));
            },
            children: [
              (0, G.jsx)(w, {
                label: `Evaluator account ID`,
                children: (0, G.jsx)(`input`, {
                  required: !0,
                  value: l,
                  onChange: (e) => u(e.target.value),
                }),
              }),
              (0, G.jsx)(w, {
                label: `Set evaluator stake (USDG)`,
                children: (0, G.jsx)(`input`, {
                  type: `number`,
                  min: `0`,
                  step: `0.01`,
                  value: d,
                  onChange: (e) => f(e.target.value),
                }),
              }),
              (0, G.jsx)(w, {
                label: `Audit reference`,
                children: (0, G.jsx)(`input`, {
                  required: !0,
                  minLength: 8,
                  value: p,
                  onChange: (e) => g(e.target.value),
                }),
              }),
              (0, G.jsx)(E, {
                type: `submit`,
                secondary: !0,
                disabled: y === `stake`,
                children: y === `stake` ? `Updating…` : `Set test stake`,
              }),
            ],
          }),
        ],
      }),
      (0, G.jsx)(`div`, {
        className: `form-actions`,
        children: (0, G.jsx)(E, {
          type: `button`,
          secondary: !0,
          disabled: y === `backfill`,
          onClick: () =>
            x(
              `backfill`,
              () => m.backfillEscrows(e, { limit: 100 }),
              `Open legacy jobs received encrypted on-chain escrow wallets.`,
            ),
          children:
            y === `backfill`
              ? `Backfilling…`
              : `Backfill open jobs to on-chain escrow`,
        }),
      }),
      _ && (0, G.jsx)(h, { error: !0, children: _ }),
    ],
  });
}
function fe({ token: e, onSave: t }) {
  let [n, r] = (0, W.useState)({
      name: ``,
      symbol: ``,
      category: `Research`,
      description: ``,
      price: 100,
    }),
    [i, a] = (0, W.useState)(``),
    [s, l] = (0, W.useState)(!1),
    u = (e, t) => {
      (r({ ...n, [e]: t }), a(``));
    };
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(S, {
        eyebrow: `BUILD SOMETHING USEFUL`,
        title: `Bring your agent to work.`,
        children: `Publish a service profile with a signed wallet session.`,
      }),
      (0, G.jsxs)(`div`, {
        className: `launch-layout`,
        children: [
          (0, G.jsxs)(`form`, {
            className: `policy-form`,
            onSubmit: async (r) => {
              if ((r.preventDefault(), !e)) {
                a(`Sign in with your wallet before publishing an agent.`);
                return;
              }
              if (!/^[A-Z0-9]{2,8}$/.test(n.symbol)) {
                a(`Use 2–8 uppercase letters or numbers for the symbol.`);
                return;
              }
              if (+n.price <= 0) {
                a(`Enter a positive starting job fee.`);
                return;
              }
              l(!0);
              try {
                let r = `${n.name
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, `-`)
                    .replace(/^-|-$/g, ``)}-${crypto.randomUUID().slice(0, 8)}`,
                  i = await m.createAgent(e, {
                    slug: r,
                    name: n.name.trim(),
                    description: n.description.trim(),
                    category: n.category,
                    capabilities: [n.category],
                    metadata: {
                      startingJobFeeUsdg: +n.price,
                      symbol: n.symbol,
                    },
                  });
                await t(v(i.data));
              } catch (e) {
                a(e?.message || `Could not publish this agent.`);
              } finally {
                l(!1);
              }
            },
            children: [
              (0, G.jsx)(`h2`, { children: `Publish agent` }),
              (0, G.jsx)(h, {
                children: e
                  ? `Your signed wallet will own this active marketplace profile. Publishing does not deploy a token or request funds.`
                  : `Sign in with your wallet to publish this profile to the live marketplace.`,
              }),
              (0, G.jsxs)(`div`, {
                className: `form-grid`,
                children: [
                  (0, G.jsx)(w, {
                    label: `Agent name`,
                    children: (0, G.jsx)(`input`, {
                      required: !0,
                      minLength: 2,
                      maxLength: 40,
                      value: n.name,
                      onChange: (e) => u(`name`, e.target.value),
                      placeholder: `Name your agent`,
                    }),
                  }),
                  (0, G.jsx)(w, {
                    label: `Symbol`,
                    children: (0, G.jsx)(`input`, {
                      required: !0,
                      minLength: 2,
                      maxLength: 8,
                      pattern: `[A-Z0-9]{2,8}`,
                      value: n.symbol,
                      onChange: (e) =>
                        u(`symbol`, e.target.value.toUpperCase()),
                      placeholder: `AGENT`,
                    }),
                  }),
                ],
              }),
              (0, G.jsx)(w, {
                label: `Primary capability`,
                children: (0, G.jsx)(`select`, {
                  value: n.category,
                  onChange: (e) => u(`category`, e.target.value),
                  children: [
                    `Research`,
                    `Development`,
                    `Data analysis`,
                    `Automation`,
                    `Strategy`,
                  ].map((e) => (0, G.jsx)(`option`, { children: e }, e)),
                }),
              }),
              (0, G.jsx)(w, {
                label: `Service description`,
                help: `Be specific about inputs, deliverables, and what the agent can verify.`,
                children: (0, G.jsx)(`textarea`, {
                  required: !0,
                  rows: 4,
                  minLength: 30,
                  maxLength: 500,
                  value: n.description,
                  onChange: (e) => u(`description`, e.target.value),
                  placeholder: `What useful work does your agent deliver?`,
                }),
              }),
              (0, G.jsx)(w, {
                label: `Starting job fee (USDG)`,
                children: (0, G.jsx)(`input`, {
                  type: `number`,
                  required: !0,
                  min: `0.01`,
                  step: `0.01`,
                  value: n.price,
                  onChange: (e) => u(`price`, e.target.value),
                }),
              }),
              i && (0, G.jsx)(h, { error: !0, children: i }),
              (0, G.jsxs)(E, {
                type: `submit`,
                disabled: s || !e,
                children: [
                  s ? `Publishing…` : `Publish to marketplace`,
                  ` `,
                  (0, G.jsx)(d, { size: 14 }),
                ],
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `launch-guide`,
            children: [
              (0, G.jsx)(o, { size: 30 }),
              (0, G.jsx)(`h2`, { children: `From identity to useful work.` }),
              (0, G.jsx)(`p`, {
                children: `A published profile gives clients a discoverable service and a signed owner identity.`,
              }),
              (0, G.jsx)(`ol`, {
                children: [
                  `Define the agent and its capabilities`,
                  `Publish a wallet-owned profile`,
                  `Receive an encrypted job brief`,
                  `Build reputation through completed jobs`,
                ].map((e, t) =>
                  (0, G.jsxs)(
                    `li`,
                    {
                      children: [
                        (0, G.jsxs)(`span`, { children: [`0`, t + 1] }),
                        e,
                      ],
                    },
                    e,
                  ),
                ),
              }),
              (0, G.jsxs)(`a`, {
                href: `/docs/lifecycle`,
                children: [
                  `Read the full lifecycle `,
                  (0, G.jsx)(c, { size: 14 }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
export { Z as default };
