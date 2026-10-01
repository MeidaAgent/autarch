import {
  F as e,
  _ as t,
  c as n,
  f as r,
  i,
  m as a,
  s as o,
  y as s,
} from "./encodeFunctionData.js";
import {
  T as c,
  c as l,
  l as u,
  s as d,
  t as f,
  u as p,
  w as m,
} from "./stringify.js";
var h = `Ethereum Signed Message:
`;
function g(e) {
  let t =
      typeof e == `string` ? u(e) : typeof e.raw == `string` ? e.raw : d(e.raw),
    n = u(`${h}${c(t)}`);
  return r([n, t]);
}
function _(e, t) {
  return s(g(e), t);
}
var v = class extends m {
    constructor({ domain: e }) {
      super(`Invalid domain "${f(e)}".`, {
        metaMessages: [`Must be a valid EIP-712 domain.`],
      });
    }
  },
  y = class extends m {
    constructor({ primaryType: e, types: t }) {
      super(
        `Invalid primary type \`${e}\` must be one of \`${JSON.stringify(Object.keys(t))}\`.`,
        {
          docsPath: `/api/glossary/Errors#typeddatainvalidprimarytypeerror`,
          metaMessages: ["Check that the primary type is a key in `types`."],
        },
      );
    }
  },
  b = class extends m {
    constructor({ type: e }) {
      super(`Struct type "${e}" is invalid.`, {
        metaMessages: [`Struct type must not be a Solidity type.`],
        name: `InvalidStructTypeError`,
      });
    }
  },
  x = class extends m {
    constructor({ type: e }) {
      let t = e.replace(/^(u?int)/, `$&256`);
      super(`Type "${e}" is not a valid EIP-712 type.`, {
        metaMessages: [`Use "${t}" instead.`],
        name: `InvalidTypedDataTypeError`,
      });
    }
  };
function S(r) {
  let { domain: i, message: s, primaryType: u, types: d } = r,
    f = (r, i) => {
      for (let s of r) {
        let { name: r, type: u } = s,
          p = i[r],
          m = u.replace(/(\[[0-9]*\])+$/, ``);
        if (m === `int` || m === `uint`) throw new x({ type: u });
        let h = u.match(n);
        if (h && (typeof p == `number` || typeof p == `bigint`)) {
          let [e, t, n] = h;
          l(p, { signed: t === `int`, size: Number.parseInt(n, 10) / 8 });
        }
        if (u === `address` && typeof p == `string` && !a(p))
          throw new t({ address: p });
        let g = u.match(o);
        if (g) {
          let [t, n] = g;
          if (n && c(p) !== Number.parseInt(n, 10))
            throw new e({
              expectedSize: Number.parseInt(n, 10),
              givenSize: c(p),
            });
        }
        let _ = d[u];
        _ && (w(u), f(_, p));
      }
    };
  if (d.EIP712Domain && i) {
    if (typeof i != `object`) throw new v({ domain: i });
    f(d.EIP712Domain, i);
  }
  if (u !== `EIP712Domain`)
    if (d[u]) f(d[u], s);
    else throw new y({ primaryType: u, types: d });
}
function C({ domain: e }) {
  return [
    typeof e?.name == `string` && { name: `name`, type: `string` },
    e?.version && { name: `version`, type: `string` },
    (typeof e?.chainId == `number` || typeof e?.chainId == `bigint`) && {
      name: `chainId`,
      type: `uint256`,
    },
    e?.verifyingContract && { name: `verifyingContract`, type: `address` },
    e?.salt && { name: `salt`, type: `bytes32` },
  ].filter(Boolean);
}
function w(e) {
  if (
    e === `address` ||
    e === `bool` ||
    e === `string` ||
    e.startsWith(`bytes`) ||
    e.startsWith(`uint`) ||
    e.startsWith(`int`)
  )
    throw new b({ type: e });
}
function T(e) {
  let { domain: t = {}, message: n, primaryType: i } = e,
    a = { EIP712Domain: C({ domain: t }), ...e.types };
  S({ domain: t, message: n, primaryType: i, types: a });
  let o = [`0x1901`];
  return (
    t && o.push(E({ domain: t, types: a })),
    i !== `EIP712Domain` && o.push(D({ data: n, primaryType: i, types: a })),
    s(r(o))
  );
}
function E({ domain: e, types: t }) {
  return D({ data: e, primaryType: `EIP712Domain`, types: t });
}
function D({ data: e, primaryType: t, types: n }) {
  let r = O({ data: e, primaryType: t, types: n });
  return s(r);
}
function O({ data: e, primaryType: t, types: n }) {
  let r = [{ type: `bytes32` }],
    a = [k({ primaryType: t, types: n })];
  for (let i of n[t]) {
    let [t, o] = M({ types: n, name: i.name, type: i.type, value: e[i.name] });
    (r.push(t), a.push(o));
  }
  return i(r, a);
}
function k({ primaryType: e, types: t }) {
  let n = p(A({ primaryType: e, types: t }));
  return s(n);
}
function A({ primaryType: e, types: t }) {
  let n = ``,
    r = j({ primaryType: e, types: t });
  r.delete(e);
  let i = [e, ...Array.from(r).sort()];
  for (let e of i)
    n += `${e}(${t[e].map(({ name: e, type: t }) => `${t} ${e}`).join(`,`)})`;
  return n;
}
function j({ primaryType: e, types: t }, n = new Set()) {
  let r = e.match(/^\w*/u)?.[0];
  if (n.has(r) || t[r] === void 0) return n;
  n.add(r);
  for (let e of t[r]) j({ primaryType: e.type, types: t }, n);
  return n;
}
function M({ types: e, name: t, type: n, value: r }) {
  if (e[n] !== void 0)
    return [{ type: `bytes32` }, s(O({ data: r, primaryType: n, types: e }))];
  if (n === `bytes`) return [{ type: `bytes32` }, s(r)];
  if (n === `string`) return [{ type: `bytes32` }, s(p(r))];
  if (n.lastIndexOf(`]`) === n.length - 1) {
    let a = n.slice(0, n.lastIndexOf(`[`)),
      o = r.map((n) => M({ name: t, type: a, types: e, value: n }));
    return [
      { type: `bytes32` },
      s(
        i(
          o.map(([e]) => e),
          o.map(([, e]) => e),
        ),
      ),
    ];
  }
  return [{ type: n }, r];
}
export { _ as n, T as t };
