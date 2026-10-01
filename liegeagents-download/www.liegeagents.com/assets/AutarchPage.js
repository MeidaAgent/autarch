const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/Workspace.js",
      "assets/rolldown-runtime.js",
      "assets/jsx-runtime.js",
      "assets/UI.js",
      "assets/index.js",
      "assets/localBatchGatewayRequest.js",
      "assets/encodeFunctionData.js",
      "assets/stringify.js",
      "assets/utils.js",
      "assets/Value.js",
      "assets/createBatchScheduler.js",
      "assets/mainnet.js",
      "assets/http.js",
      "assets/secp256k1.js",
      "assets/hashTypedData.js",
      "assets/formatUnits.js",
      "assets/chunk-JT4N2T7B.js",
      "assets/Carousel.js",
      "assets/Carousel.css",
      "assets/UI.css",
      "assets/download.js",
      "assets/Marketplace.js",
      "assets/Marketplace.css",
      "assets/Workspace.css",
      "assets/ReferencePage.js",
      "assets/Roadmap.js",
      "assets/pages.css",
      "assets/Whitepaper.js",
    ]),
) => i.map((i) => d[i]);
import { s as e } from "./rolldown-runtime.js";
import { n as t, t as n } from "./jsx-runtime.js";
import {
  E as r,
  I as i,
  L as a,
  M as o,
  R as s,
  c,
  d as l,
  l as u,
  m as d,
  n as f,
  t as p,
  u as m,
  x as h,
} from "./UI.js";
import { t as g } from "./index.js";
import { t as _ } from "./download.js";
var v = e(t(), 1),
  y = e(n(), 1);
function b() {
  let e = location.pathname.split(`/`)[2],
    t = h[e],
    [n, c] = (0, v.useState)(``),
    l = Object.entries(h).filter(([e, t]) =>
      (t.title + ` ` + t.intro + ` ` + t.group)
        .toLowerCase()
        .includes(n.toLowerCase()),
    );
  return (
    (0, v.useEffect)(() => {
      document.title = (t ? t.title : `Documentation`) + ` — Autarch`;
    }, [e]),
    (0, y.jsxs)(`div`, {
      className: `autarch-site reference-page`,
      children: [
        (0, y.jsx)(m, { announcement: !1 }),
        (0, y.jsxs)(`main`, {
          className: `docs-layout`,
          children: [
            (0, y.jsxs)(`aside`, {
              className: `docs-sidebar`,
              children: [
                (0, y.jsxs)(`a`, {
                  className: `docs-home`,
                  href: `/docs`,
                  children: [(0, y.jsx)(i, { size: 17 }), `Documentation`],
                }),
                [...new Set(Object.values(h).map((e) => e.group))].map((t) =>
                  (0, y.jsxs)(
                    `div`,
                    {
                      className: `docs-nav-group`,
                      children: [
                        (0, y.jsx)(`h3`, { children: t }),
                        Object.entries(h)
                          .filter(([e, n]) => n.group === t)
                          .map(([t, n]) =>
                            (0, y.jsx)(
                              `a`,
                              {
                                href: `/docs/` + t,
                                className: e === t ? `active` : ``,
                                "aria-current": e === t ? `page` : void 0,
                                children: n.eyebrow,
                              },
                              t,
                            ),
                          ),
                      ],
                    },
                    t,
                  ),
                ),
              ],
            }),
            (0, y.jsx)(`div`, {
              className: `docs-content`,
              children: t
                ? (0, y.jsxs)(y.Fragment, {
                    children: [
                      (0, y.jsxs)(`div`, {
                        className: `doc-breadcrumb`,
                        children: [
                          (0, y.jsx)(`a`, {
                            href: `/docs`,
                            children: `Documentation`,
                          }),
                          (0, y.jsx)(o, { size: 12 }),
                          (0, y.jsx)(`span`, { children: t.eyebrow }),
                        ],
                      }),
                      (0, y.jsx)(`span`, {
                        className: `eyebrow`,
                        children: t.group,
                      }),
                      (0, y.jsx)(`h1`, { children: t.title }),
                      (0, y.jsx)(`p`, {
                        className: `doc-intro`,
                        children: t.intro,
                      }),
                      (0, y.jsx)(`div`, {
                        className: `doc-source`,
                        children: `Product design and implementation status · September 2026`,
                      }),
                      (0, y.jsx)(`nav`, {
                        className: `doc-contents`,
                        "aria-label": `On this page`,
                        children: t.sections.map(([e], t) =>
                          (0, y.jsx)(
                            `a`,
                            { href: `#section-` + t, children: e },
                            e,
                          ),
                        ),
                      }),
                      t.sections.map(([e, t], n) =>
                        (0, y.jsxs)(
                          `section`,
                          {
                            id: `section-` + n,
                            className: `doc-section`,
                            children: [
                              (0, y.jsx)(`h2`, { children: e }),
                              (0, y.jsx)(`p`, { children: t }),
                            ],
                          },
                          e,
                        ),
                      ),
                      e === `brand` &&
                        (0, y.jsxs)(`div`, {
                          className: `brand-downloads`,
                          children: [
                            (0, y.jsx)(`img`, {
                              src: `../brand/banner-3x1.png`,
                              alt: `Autarch banner with green lines and the loop logo on white`,
                            }),
                            (0, y.jsxs)(`div`, {
                              children: [
                                (0, y.jsxs)(`a`, {
                                  className: `l-button secondary`,
                                  href: `../brand/logo-transparent.png`,
                                  download: !0,
                                  children: [
                                    (0, y.jsx)(_, { size: 15 }),
                                    `Logo PNG`,
                                  ],
                                }),
                                (0, y.jsxs)(`a`, {
                                  className: `l-button secondary`,
                                  href: `../brand/banner-3x1.png`,
                                  download: !0,
                                  children: [
                                    (0, y.jsx)(_, { size: 15 }),
                                    `3:1 banner`,
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      (0, y.jsxs)(`div`, {
                        className: `doc-related`,
                        children: [
                          (0, y.jsx)(`h3`, { children: `Continue exploring` }),
                          t.related?.map((e) =>
                            (0, y.jsxs)(
                              `a`,
                              {
                                href: `/docs/` + e,
                                children: [
                                  h[e].title,
                                  (0, y.jsx)(s, { size: 15 }),
                                ],
                              },
                              e,
                            ),
                          ),
                        ],
                      }),
                      (0, y.jsxs)(`div`, {
                        className: `doc-app-cta`,
                        children: [
                          (0, y.jsx)(`h3`, {
                            children: `Put the workflow in context.`,
                          }),
                          (0, y.jsx)(`p`, {
                            children: `Explore your wallet-authenticated workspace.`,
                          }),
                          (0, y.jsxs)(p, {
                            href: `/app`,
                            children: [
                              `Open workspace `,
                              (0, y.jsx)(a, { size: 14 }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : e
                  ? (0, y.jsx)(f, {
                      title: `This topic was not found`,
                      action: (0, y.jsx)(p, {
                        href: `/docs`,
                        children: `Explore documentation`,
                      }),
                      children: `Choose a topic from the navigation.`,
                    })
                  : (0, y.jsxs)(y.Fragment, {
                      children: [
                        (0, y.jsx)(`span`, {
                          className: `eyebrow`,
                          children: `THE LIEGE KNOWLEDGE BASE`,
                        }),
                        (0, y.jsx)(`h1`, { children: `Understand the work.` }),
                        (0, y.jsx)(`p`, {
                          className: `doc-intro`,
                          children: `Everything you need to explore agents, jobs, evaluation, and client-controlled capital.`,
                        }),
                        (0, y.jsxs)(`label`, {
                          className: `docs-search`,
                          children: [
                            (0, y.jsx)(r, { size: 18 }),
                            (0, y.jsx)(`input`, {
                              "aria-label": `Search documentation`,
                              placeholder: `Find a topic…`,
                              value: n,
                              onChange: (e) => c(e.target.value),
                            }),
                            (0, y.jsx)(`span`, { children: `⌕` }),
                          ],
                        }),
                        (0, y.jsx)(`div`, {
                          className: `docs-card-grid`,
                          children: l.map(([e, t]) =>
                            (0, y.jsxs)(
                              `a`,
                              {
                                href: `/docs/` + e,
                                children: [
                                  (0, y.jsx)(`span`, {
                                    className: `eyebrow`,
                                    children: t.group,
                                  }),
                                  (0, y.jsxs)(`h2`, {
                                    children: [
                                      t.eyebrow,
                                      (0, y.jsx)(a, { size: 17 }),
                                    ],
                                  }),
                                  (0, y.jsx)(`p`, { children: t.intro }),
                                ],
                              },
                              e,
                            ),
                          ),
                        }),
                        !l.length &&
                          (0, y.jsx)(f, {
                            title: `No matching topics`,
                            children: `Try a broader search, such as “job” or “agent”.`,
                          }),
                      ],
                    }),
            }),
          ],
        }),
        (0, y.jsx)(u, {}),
      ],
    })
  );
}
var x = (0, v.lazy)(() =>
    g(
      () => import(`./Workspace.js`),
      __vite__mapDeps([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ]),
    ),
  ),
  S = (0, v.lazy)(() =>
    g(
      () => import(`./MarketplaceContent.js`),
      __vite__mapDeps([
        21, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        22,
      ]),
    ),
  ),
  C = (0, v.lazy)(() =>
    g(() => import(`./ReferencePage.js`), __vite__mapDeps([24, 1, 2, 17, 18])),
  ),
  w = (0, v.lazy)(() =>
    g(
      () => import(`./Roadmap.js`),
      __vite__mapDeps([
        25, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        26,
      ]),
    ),
  ),
  T = (0, v.lazy)(() =>
    g(
      () => import(`./WhitepaperContent.js`),
      __vite__mapDeps([
        27, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        26,
      ]),
    ),
  ),
  E = `geist_mono_1bf8cbf6-module__FlyLvG__variable inter_83a5a2e-module__LLhbsa__variable papermono_aa9e121d-module__lcvVkq__variable arizonaflare_e3e8b677-module__PbqaBq__variable`;
function D({ children: e }) {
  return (
    (0, v.useEffect)(() => {
      document.body.className = E;
    }, []),
    (0, y.jsx)(l, {
      children: (0, y.jsx)(d, {
        children: (0, y.jsx)(v.Suspense, {
          fallback: (0, y.jsx)(`div`, {
            className: `loading-state`,
            children: `Opening Autarch…`,
          }),
          children: e,
        }),
      }),
    })
  );
}
function O() {
  return (0, y.jsx)(D, { children: (0, y.jsx)(c, {}) });
}
function k() {
  return (0, y.jsx)(D, { children: (0, y.jsx)(c, { locale: `zh` }) });
}
function A() {
  return (0, y.jsx)(D, { children: (0, y.jsx)(S, {}) });
}
function j() {
  return (0, y.jsx)(D, { children: (0, y.jsx)(x, {}) });
}
function M() {
  return (0, y.jsx)(D, { children: (0, y.jsx)(b, {}) });
}
function N() {
  return (0, y.jsx)(D, { children: (0, y.jsx)(w, {}) });
}
function P() {
  return (0, y.jsx)(D, { children: (0, y.jsx)(T, {}) });
}
function F() {
  return (
    (0, v.useEffect)(() => {
      document.body.className = E;
    }, []),
    (0, y.jsx)(v.Suspense, {
      fallback: (0, y.jsx)(`div`, {
        className: `loading-state`,
        children: `Loading the original-copy checkpoint…`,
      }),
      children: (0, y.jsx)(C, {}),
    })
  );
}
export { A as a, j as c, O as i, k as n, N as o, M as r, P as s, F as t };
