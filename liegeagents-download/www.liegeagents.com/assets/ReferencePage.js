import { s as e, t } from "./rolldown-runtime.js";
import { n, t as r } from "./jsx-runtime.js";
import {
  a as i,
  i as a,
  n as o,
  o as s,
  r as c,
  s as l,
  t as u,
} from "./Carousel.js";
var d = t((e, t) => {
    (function (n, r) {
      typeof e == `object` && typeof t == `object`
        ? (t.exports = r())
        : typeof define == `function` && define.amd
          ? define([], r)
          : typeof e == `object`
            ? (e.rive = r())
            : (n.rive = r());
    })(e, () =>
      (() => {
        var e = [
            ,
            (e, t, n) => {
              (n.r(t), n.d(t, { Animation: () => r.Animation }));
              var r = n(2);
            },
            (e, t, n) => {
              (n.r(t), n.d(t, { Animation: () => r }));
              var r = (function () {
                function e(e, t, n, r) {
                  ((this.animation = e),
                    (this.artboard = t),
                    (this.playing = r),
                    (this.loopCount = 0),
                    (this.scrubTo = null),
                    (this.instance = new n.LinearAnimationInstance(e, t)));
                }
                return (
                  Object.defineProperty(e.prototype, "name", {
                    get: function () {
                      return this.animation.name;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "time", {
                    get: function () {
                      return this.instance.time;
                    },
                    set: function (e) {
                      this.instance.time = e;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "loopValue", {
                    get: function () {
                      return this.animation.loopValue;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "needsScrub", {
                    get: function () {
                      return this.scrubTo !== null;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.advance = function (e) {
                    this.scrubTo === null
                      ? this.instance.advance(e)
                      : ((this.instance.time = 0),
                        this.instance.advance(this.scrubTo),
                        (this.scrubTo = null));
                  }),
                  (e.prototype.apply = function (e) {
                    this.instance.apply(e);
                  }),
                  (e.prototype.cleanup = function () {
                    this.instance.delete();
                  }),
                  e
                );
              })();
            },
            (e, t, n) => {
              (n.r(t), n.d(t, { RuntimeLoader: () => o }));
              var r = n(4),
                i = n(5),
                a = function () {
                  return (
                    (a =
                      Object.assign ||
                      function (e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                          for (var i in ((t = arguments[n]), t))
                            Object.prototype.hasOwnProperty.call(t, i) &&
                              (e[i] = t[i]);
                        return e;
                      }),
                    a.apply(this, arguments)
                  );
                },
                o = (function () {
                  function e() {}
                  return (
                    (e.notifyError = function (t) {
                      var n;
                      for (e.isLoading = !1; e.errorCallbackQueue.length > 0;)
                        (n = e.errorCallbackQueue.shift()) == null || n(t);
                      e.callBackQueue = [];
                    }),
                    (e.loadRuntime = function () {
                      var t = e.wasmURL,
                        n = e.wasmBinary;
                      (e.enablePerfMarks &&
                        performance.mark(`rive:wasm-init:start`),
                        r
                          .default(
                            a(
                              {
                                locateFile: function () {
                                  return t;
                                },
                              },
                              n ? { wasmBinary: n } : {},
                            ),
                          )
                          .then(function (t) {
                            var n;
                            for (
                              e.enablePerfMarks &&
                                (performance.mark(`rive:wasm-init:end`),
                                performance.measure(
                                  `rive:wasm-init`,
                                  `rive:wasm-init:start`,
                                  `rive:wasm-init:end`,
                                )),
                                e.runtime = t,
                                e.errorCallbackQueue = [];
                              e.callBackQueue.length > 0;
                            )
                              (n = e.callBackQueue.shift()) == null ||
                                n(e.runtime);
                          })
                          .catch(function (n) {
                            var r = {
                              message: n?.message || `Unknown error`,
                              type: n?.name || `Error`,
                              wasmError:
                                n instanceof WebAssembly.CompileError ||
                                n instanceof WebAssembly.RuntimeError,
                              originalError: n,
                            };
                            console.debug(`Rive WASM load error details:`, r);
                            var i = e.wasmFallbackURL,
                              a =
                                i !== null &&
                                t.toLowerCase() === i.toLowerCase();
                            if (i !== null && !a)
                              (console.warn(
                                `Failed to load WASM from ${t} (${r.message}), trying fallback URL: ${i}`,
                              ),
                                (e.wasmBinary = null),
                                e.setWasmUrl(i),
                                e.loadRuntime());
                            else {
                              var o = [
                                `Could not load Rive WASM file from ${a ? `the configured WASM URL or its fallback (${i})` : t}.`,
                                `Possible reasons:`,
                                `- Network connection is down`,
                                `- WebAssembly is not supported in this environment`,
                                `- The WASM file is corrupted or incompatible`,
                                `
Error details:`,
                                `- Type: ${r.type}`,
                                `- Message: ${r.message}`,
                                `- WebAssembly-specific error: ${r.wasmError}`,
                                `
To resolve, you may need to:`,
                                `1. Check your network connection`,
                                `2. Set a new WASM source via RuntimeLoader.setWasmUrl()`,
                                `3. Call RuntimeLoader.awaitInstance() again`,
                              ].join(`
`);
                              (console.error(o), e.notifyError(Error(o)));
                            }
                          }));
                    }),
                    (e.getInstance = function (t, n) {
                      (e.isLoading || ((e.isLoading = !0), e.loadRuntime()),
                        e.runtime
                          ? t(e.runtime)
                          : (e.callBackQueue.push(t),
                            n && e.errorCallbackQueue.push(n)));
                    }),
                    (e.awaitInstance = function () {
                      return new Promise(function (t, n) {
                        return e.getInstance(t, n);
                      });
                    }),
                    (e.setWasmUrl = function (t) {
                      e.wasmURL = t;
                    }),
                    (e.getWasmUrl = function () {
                      return e.wasmURL;
                    }),
                    (e.setWasmFallbackUrl = function (t) {
                      e.wasmFallbackURL = t;
                    }),
                    (e.getWasmFallbackUrl = function () {
                      return e.wasmFallbackURL;
                    }),
                    (e.setWasmBinary = function (t) {
                      if (t instanceof ArrayBuffer || t === null) {
                        e.wasmBinary = t;
                        return;
                      }
                      console.error(
                        `setWasmBinary expects an ArrayBuffer or null`,
                      );
                    }),
                    (e.getWasmBinary = function () {
                      return e.wasmBinary;
                    }),
                    (e.isLoading = !1),
                    (e.callBackQueue = []),
                    (e.wasmURL = `https://unpkg.com/${i.name}@${i.version}/rive.wasm`),
                    (e.wasmFallbackURL = `https://cdn.jsdelivr.net/npm/${i.name}@${i.version}/rive_fallback.wasm`),
                    (e.wasmBinary = null),
                    (e.errorCallbackQueue = []),
                    (e.enablePerfMarks = !1),
                    e
                  );
                })();
            },
            (e, t, n) => {
              (n.r(t), n.d(t, { default: () => r }));
              let r = (() => {
                var e = globalThis.document?.currentScript?.src;
                return async function (t = {}) {
                  var n,
                    r = t,
                    i = !!globalThis.window,
                    a = !!globalThis.WorkerGlobalScope;
                  function o() {
                    function e(e) {
                      let a = r;
                      ((n = t = 0),
                        (r = new Map()),
                        a.forEach((t) => {
                          try {
                            t(e);
                          } catch (e) {
                            console.error(e);
                          }
                        }),
                        this.xb(),
                        i && i.bc());
                    }
                    let t = 0,
                      n = 0,
                      r = new Map(),
                      i = null,
                      a = null;
                    ((this.requestAnimationFrame = function (i) {
                      t ||= requestAnimationFrame(e.bind(this));
                      let a = ++n;
                      return (r.set(a, i), a);
                    }),
                      (this.cancelAnimationFrame = function (e) {
                        (r.delete(e),
                          t &&
                            r.size == 0 &&
                            (cancelAnimationFrame(t), (t = 0)));
                      }),
                      (this.$b = function (e) {
                        ((a &&= (document.body.remove(a), null)),
                          e ||
                            ((a = document.createElement(`div`)),
                            (a.style.backgroundColor = `black`),
                            (a.style.position = `fixed`),
                            (a.style.right = 0),
                            (a.style.top = 0),
                            (a.style.color = `white`),
                            (a.style.padding = `4px`),
                            (a.innerHTML = `RIVE FPS`),
                            (e = function (e) {
                              a.innerHTML = `RIVE FPS ` + e.toFixed(1);
                            }),
                            document.body.appendChild(a)),
                          (i = new (function () {
                            let t = 0,
                              n = 0;
                            this.bc = function () {
                              var r = performance.now();
                              n
                                ? (++t,
                                  (r -= n),
                                  1e3 < r && (e((1e3 * t) / r), (t = n = 0)))
                                : ((n = r), (t = 0));
                            };
                          })()));
                      }),
                      (this.Xb = function () {
                        ((a &&= (document.body.remove(a), null)), (i = null));
                      }),
                      (this.xb = function () {}));
                  }
                  function s(e) {
                    console.assert(!0);
                    let t = new Map(),
                      n = -1 / 0;
                    this.push = function (r) {
                      return (
                        (r = (r + ((1 << e) - 1)) >> e),
                        t.has(r) && clearTimeout(t.get(r)),
                        t.set(
                          r,
                          setTimeout(function () {
                            (t.delete(r),
                              t.length == 0
                                ? (n = -1 / 0)
                                : r == n &&
                                  ((n = Math.max(...t.keys())),
                                  console.assert(n < r)));
                          }, 1e3),
                        ),
                        (n = Math.max(r, n)),
                        n << e
                      );
                    };
                  }
                  let c = r.onRuntimeInitialized;
                  r.onRuntimeInitialized = function () {
                    c && c();
                    let e = r.decodeAudio;
                    r.decodeAudio = function (t, n, r = null) {
                      ((t = e(t, r ?? null)), n(t));
                    };
                    let t = r.decodeFont;
                    r.decodeFont = function (e, n, r = null) {
                      ((e = t(e, r ?? null)), n(e));
                    };
                    let n = r.FileAsset.prototype.decode;
                    r.FileAsset.prototype.decode = function (e, t) {
                      return n.call(this, e, t ?? null);
                    };
                    let i = r.setFallbackFontCb;
                    r.setFallbackFontCallback =
                      typeof i == `function`
                        ? function (e) {
                            i(e);
                          }
                        : function () {
                            console.warn(
                              `Module.setFallbackFontCallback called, but text support is not enabled in this build.`,
                            );
                          };
                    let a = r.FileAssetLoader;
                    ((r.ptrToAsset = (e) => {
                      let t = r.ptrToFileAsset(e);
                      return t.isImage
                        ? r.ptrToImageAsset(e)
                        : t.isFont
                          ? r.ptrToFontAsset(e)
                          : t.isAudio
                            ? r.ptrToAudioAsset(e)
                            : t;
                    }),
                      (r.CustomFileAssetLoader = a.extend(
                        `CustomFileAssetLoader`,
                        {
                          __construct: function ({ loadContents: e }) {
                            (this.__parent.__construct.call(this),
                              (this.Pb = e));
                          },
                          loadContents: function (e, t) {
                            return ((e = r.ptrToAsset(e)), this.Pb(e, t));
                          },
                        },
                      )),
                      (r.CDNFileAssetLoader = a.extend(`CDNFileAssetLoader`, {
                        __construct: function (e) {
                          (this.__parent.__construct.call(this),
                            (this.Rb = e ?? null));
                        },
                        loadContents: function (e) {
                          let t = r.ptrToAsset(e);
                          if (((e = t.cdnUuid), e === ``)) return !1;
                          let n = this.Rb ?? null;
                          return (
                            (function (e, t) {
                              var n = new XMLHttpRequest();
                              ((n.responseType = `arraybuffer`),
                                (n.onreadystatechange = function () {
                                  n.readyState == 4 && n.status == 200 && t(n);
                                }),
                                n.open(`GET`, e, !0),
                                n.send(null));
                            })(t.cdnBaseUrl + `/` + e, (e) => {
                              t.decode(new Uint8Array(e.response), n);
                            }),
                            !0
                          );
                        },
                      })),
                      (r.FallbackFileAssetLoader = a.extend(
                        `FallbackFileAssetLoader`,
                        {
                          __construct: function () {
                            (this.__parent.__construct.call(this),
                              (this.sb = []));
                          },
                          addLoader: function (e) {
                            this.sb.push(e);
                          },
                          loadContents: function (e, t) {
                            for (let n of this.sb)
                              if (n.loadContents(e, t)) return !0;
                            return !1;
                          },
                        },
                      )));
                    let o = r.computeAlignment;
                    r.computeAlignment = function (e, t, n, r, i = 1) {
                      return o.call(this, e, t, n, r, i);
                    };
                  };
                  let l =
                      `createConicGradient createImageData createLinearGradient createPattern createRadialGradient getContextAttributes getImageData getLineDash getTransform isContextLost isPointInPath isPointInStroke measureText`.split(
                        ` `,
                      ),
                    u = new (function () {
                      function e() {
                        if (!t) {
                          var e = document.createElement(`canvas`),
                            o = {
                              alpha: 1,
                              depth: 0,
                              stencil: 0,
                              antialias: 0,
                              premultipliedAlpha: 1,
                              preserveDrawingBuffer: 0,
                              powerPreference: `high-performance`,
                              failIfMajorPerformanceCaveat: 0,
                              enableExtensionsByDefault: 1,
                              explicitSwapControl: 1,
                              renderViaOffscreenBackBuffer: 1,
                            };
                          let s;
                          if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                            if (((s = e.getContext(`webgl`, o)), (n = 1), !s))
                              return (
                                console.log(
                                  `No WebGL support. Image mesh will not be drawn.`,
                                ),
                                !1
                              );
                          } else if ((s = e.getContext(`webgl2`, o))) n = 2;
                          else if ((s = e.getContext(`webgl`, o))) n = 1;
                          else
                            return (
                              console.log(
                                `No WebGL support. Image mesh will not be drawn.`,
                              ),
                              !1
                            );
                          ((s = new Proxy(s, {
                            get(e, t) {
                              if (e.isContextLost()) {
                                if (
                                  ((l ||=
                                    (console.error(
                                      `Cannot render the mesh because the GL Context was lost. Tried to invoke `,
                                      t,
                                    ),
                                    !0)),
                                  typeof e[t] == `function`)
                                )
                                  return function () {};
                              } else
                                return typeof e[t] == `function`
                                  ? function (...n) {
                                      return e[t].apply(e, n);
                                    }
                                  : e[t];
                            },
                            set(e, t, n) {
                              if (e.isContextLost())
                                l ||=
                                  (console.error(
                                    `Cannot render the mesh because the GL Context was lost. Tried to set property ` +
                                      t,
                                  ),
                                  !0);
                              else return ((e[t] = n), !0);
                            },
                          })),
                            (r = Math.min(
                              s.getParameter(s.MAX_RENDERBUFFER_SIZE),
                              s.getParameter(s.MAX_TEXTURE_SIZE),
                            )));
                          function c(e, t, n) {
                            if (
                              ((t = s.createShader(t)),
                              s.shaderSource(t, n),
                              s.compileShader(t),
                              (n = s.getShaderInfoLog(t)),
                              0 < (n || ``).length)
                            )
                              throw n;
                            s.attachShader(e, t);
                          }
                          if (
                            ((e = s.createProgram()),
                            c(
                              e,
                              s.VERTEX_SHADER,
                              `attribute vec2 vertex;
                attribute vec2 uv;
                uniform vec4 mat;
                uniform vec2 translate;
                varying vec2 st;
                void main() {
                    st = uv;
                    gl_Position = vec4(mat2(mat) * vertex + translate, 0, 1);
                }`,
                            ),
                            c(
                              e,
                              s.FRAGMENT_SHADER,
                              `precision highp float;
                uniform sampler2D image;
                varying vec2 st;
                void main() {
                    gl_FragColor = texture2D(image, st);
                }`,
                            ),
                            s.bindAttribLocation(e, 0, `vertex`),
                            s.bindAttribLocation(e, 1, `uv`),
                            s.linkProgram(e),
                            (o = s.getProgramInfoLog(e)),
                            0 < (o || ``).trim().length)
                          )
                            throw o;
                          ((i = s.getUniformLocation(e, `mat`)),
                            (a = s.getUniformLocation(e, `translate`)),
                            s.useProgram(e),
                            s.bindBuffer(s.ARRAY_BUFFER, s.createBuffer()),
                            s.enableVertexAttribArray(0),
                            s.enableVertexAttribArray(1),
                            s.bindBuffer(
                              s.ELEMENT_ARRAY_BUFFER,
                              s.createBuffer(),
                            ),
                            s.uniform1i(s.getUniformLocation(e, `image`), 0),
                            s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
                            (t = s));
                        }
                        return !0;
                      }
                      let t = null,
                        n = 0,
                        r = 0,
                        i = null,
                        a = null,
                        o = 0,
                        c = 0,
                        l = !1;
                      (e(),
                        (this.pc = function () {
                          return (e(), r);
                        }),
                        (this.Wb = function (e) {
                          t && t.deleteTexture && t.deleteTexture(e);
                        }),
                        (this.Vb = function (r) {
                          if (!e()) return null;
                          let i = t.createTexture();
                          return i
                            ? (t.bindTexture(t.TEXTURE_2D, i),
                              t.texImage2D(
                                t.TEXTURE_2D,
                                0,
                                t.RGBA,
                                t.RGBA,
                                t.UNSIGNED_BYTE,
                                r,
                              ),
                              t.texParameteri(
                                t.TEXTURE_2D,
                                t.TEXTURE_WRAP_S,
                                t.CLAMP_TO_EDGE,
                              ),
                              t.texParameteri(
                                t.TEXTURE_2D,
                                t.TEXTURE_WRAP_T,
                                t.CLAMP_TO_EDGE,
                              ),
                              t.texParameteri(
                                t.TEXTURE_2D,
                                t.TEXTURE_MAG_FILTER,
                                t.LINEAR,
                              ),
                              n == 2
                                ? (t.texParameteri(
                                    t.TEXTURE_2D,
                                    t.TEXTURE_MIN_FILTER,
                                    t.LINEAR_MIPMAP_LINEAR,
                                  ),
                                  t.generateMipmap(t.TEXTURE_2D))
                                : t.texParameteri(
                                    t.TEXTURE_2D,
                                    t.TEXTURE_MIN_FILTER,
                                    t.LINEAR,
                                  ),
                              i)
                            : null;
                        }));
                      let u = new s(8),
                        d = new s(8),
                        f = new s(10),
                        p = new s(10);
                      ((this.Zb = function (n, r, s, l, m) {
                        if (e()) {
                          var h = u.push(n),
                            g = d.push(r);
                          if (t.canvas) {
                            ((t.canvas.width != h || t.canvas.height != g) &&
                              ((t.canvas.width = h), (t.canvas.height = g)),
                              t.viewport(0, g - r, n, r),
                              t.disable(t.SCISSOR_TEST),
                              t.clearColor(0, 0, 0, 0),
                              t.clear(t.COLOR_BUFFER_BIT),
                              t.enable(t.SCISSOR_TEST),
                              s.sort((e, t) => t.Eb - e.Eb),
                              (h = f.push(l)),
                              o != h &&
                                (t.bufferData(
                                  t.ARRAY_BUFFER,
                                  8 * h,
                                  t.DYNAMIC_DRAW,
                                ),
                                (o = h)),
                              (h = 0));
                            for (var _ of s)
                              (t.bufferSubData(t.ARRAY_BUFFER, h, _.ab),
                                (h += 4 * _.ab.length));
                            console.assert(h == 4 * l);
                            for (var v of s)
                              (t.bufferSubData(t.ARRAY_BUFFER, h, v.Ib),
                                (h += 4 * v.Ib.length));
                            (console.assert(h == 8 * l),
                              (h = p.push(m)),
                              c != h &&
                                (t.bufferData(
                                  t.ELEMENT_ARRAY_BUFFER,
                                  2 * h,
                                  t.DYNAMIC_DRAW,
                                ),
                                (c = h)),
                              (_ = 0));
                            for (var y of s)
                              (t.bufferSubData(
                                t.ELEMENT_ARRAY_BUFFER,
                                _,
                                y.indices,
                              ),
                                (_ += 2 * y.indices.length));
                            (console.assert(_ == 2 * m),
                              (y = 0),
                              (v = !0),
                              (h = _ = 0));
                            for (let e of s) {
                              (e.image.Pa != y &&
                                (t.bindTexture(
                                  t.TEXTURE_2D,
                                  e.image.Na || null,
                                ),
                                (y = e.image.Pa)),
                                e.tc
                                  ? (t.scissor(
                                      e.ib,
                                      g - e.jb - e.rb,
                                      e.Cc,
                                      e.rb,
                                    ),
                                    (v = !0))
                                  : (v &&= (t.scissor(0, g - r, n, r), !1)),
                                (s = 2 / n));
                              let o = -2 / r;
                              (t.uniform4f(
                                i,
                                e.ha[0] * s * e.Da,
                                e.ha[1] * o * e.Ea,
                                e.ha[2] * s * e.Da,
                                e.ha[3] * o * e.Ea,
                              ),
                                t.uniform2f(
                                  a,
                                  e.ha[4] * s * e.Da +
                                    s * (e.ib - e.qc * e.Da) -
                                    1,
                                  e.ha[5] * o * e.Ea +
                                    o * (e.jb - e.rc * e.Ea) +
                                    1,
                                ),
                                t.vertexAttribPointer(0, 2, t.FLOAT, !1, 0, h),
                                t.vertexAttribPointer(
                                  1,
                                  2,
                                  t.FLOAT,
                                  !1,
                                  0,
                                  h + 4 * l,
                                ),
                                t.drawElements(
                                  t.TRIANGLES,
                                  e.indices.length,
                                  t.UNSIGNED_SHORT,
                                  _,
                                ),
                                (h += 4 * e.ab.length),
                                (_ += 2 * e.indices.length));
                            }
                            (console.assert(h == 4 * l),
                              console.assert(_ == 2 * m));
                          }
                        }
                      }),
                        (this.canvas = function () {
                          return e() && t.canvas;
                        }));
                    })(),
                    d = r.onRuntimeInitialized;
                  r.onRuntimeInitialized = function () {
                    function e(e) {
                      switch (e) {
                        case m.srcOver:
                          return `source-over`;
                        case m.Gc:
                          return `plus-lighter`;
                        case m.screen:
                          return `screen`;
                        case m.overlay:
                          return `overlay`;
                        case m.darken:
                          return `darken`;
                        case m.lighten:
                          return `lighten`;
                        case m.colorDodge:
                          return `color-dodge`;
                        case m.colorBurn:
                          return `color-burn`;
                        case m.hardLight:
                          return `hard-light`;
                        case m.softLight:
                          return `soft-light`;
                        case m.difference:
                          return `difference`;
                        case m.exclusion:
                          return `exclusion`;
                        case m.multiply:
                          return `multiply`;
                        case m.hue:
                          return `hue`;
                        case m.saturation:
                          return `saturation`;
                        case m.color:
                          return `color`;
                        case m.luminosity:
                          return `luminosity`;
                      }
                    }
                    function t(e) {
                      return (
                        `rgba(` +
                        ((16711680 & e) >>> 16) +
                        `,` +
                        ((65280 & e) >>> 8) +
                        `,` +
                        ((255 & e) >>> 0) +
                        `,` +
                        ((4278190080 & e) >>> 24) / 255 +
                        `)`
                      );
                    }
                    function n() {
                      0 < E.length &&
                        (u.Zb(T.drawWidth(), T.drawHeight(), E, D, O),
                        (E = []),
                        (O = D = 0),
                        T.reset(512, 512));
                      for (let e of C) {
                        for (let t of e.J) t();
                        e.J = [];
                      }
                      C.clear();
                    }
                    d && d();
                    var i = r.RenderPaintStyle;
                    let a = r.RenderPath,
                      s = r.RenderPaint,
                      c = r.Renderer,
                      f = r.StrokeCap,
                      p = r.StrokeJoin,
                      m = r.BlendMode,
                      h = i.fill,
                      g = i.stroke,
                      _ = r.FillRule.evenOdd,
                      v = 1;
                    var y = r.RenderImage.extend(`CanvasRenderImage`, {
                      __construct: function ({ oa: e, Ba: t } = {}) {
                        (this.__parent.__construct.call(this),
                          (this.Pa = v),
                          (v = (v + 1) & 2147483647 || 1),
                          (this.oa = e),
                          (this.Ba = t));
                      },
                      __destruct: function () {
                        (this.Na &&
                          (u.Wb(this.Na), URL.revokeObjectURL(this.gb)),
                          this.__parent.__destruct.call(this));
                      },
                      decode: function (e) {
                        var t = this;
                        t.Ba && t.Ba(t);
                        var n = new Image();
                        ((t.gb = URL.createObjectURL(
                          new Blob([e], { type: `image/png` }),
                        )),
                          (n.onload = function () {
                            ((t.Ob = n),
                              (t.Na = u.Vb(n)),
                              t.size(n.width, n.height),
                              t.oa && t.oa(t));
                          }),
                          (n.src = t.gb));
                      },
                    });
                    class b {
                      constructor() {
                        ((this.Y = this.va = 0), (this.W = new Path2D()));
                      }
                      clear() {
                        ((this.Y = this.va = 0), (this.W = new Path2D()));
                      }
                      Sb(e) {
                        for (
                          0 < this.va && this.Y < e.length && this.clear();
                          this.Y < e.length;
                        )
                          e[this.Y++](this.W);
                        return (this.va++, this.W);
                      }
                      release(e) {
                        e === this.W && this.va--;
                      }
                    }
                    var x = a.extend(`CanvasRenderPath`, {
                        __construct: function () {
                          (this.__parent.__construct.call(this),
                            (this.La = []),
                            (this.W = new b()),
                            (this.Ka = !1),
                            (this.la = null));
                        },
                        rewind: function () {
                          ((this.La.length = 0),
                            this.W.clear(),
                            (this.Ka = !1),
                            (this.la = null));
                        },
                        addPath: function (e, t, n, r, i, a, o) {
                          let s = e.Kb();
                          this.ka((e) => {
                            let c = new DOMMatrix();
                            ((c.a = t),
                              (c.b = n),
                              (c.c = r),
                              (c.d = i),
                              (c.e = a),
                              (c.f = o),
                              e.addPath(s, c));
                          });
                        },
                        fillRule: function (e) {
                          this.fb = e;
                        },
                        moveTo: function (e, t) {
                          this.Ka = !0;
                          let n = { lb: !0 };
                          ((this.la = n),
                            this.ka((r) => {
                              (r.moveTo(e, t), n.lb && r.lineTo(e, t));
                            }));
                        },
                        lineTo: function (e, t) {
                          (this.eb(),
                            this.Ia(),
                            this.ka((n) => {
                              n.lineTo(e, t);
                            }));
                        },
                        cubicTo: function (e, t, n, r, i, a) {
                          (this.eb(),
                            this.Ia(),
                            this.ka((o) => {
                              o.bezierCurveTo(e, t, n, r, i, a);
                            }));
                        },
                        close: function () {
                          (this.Ia(),
                            this.ka((e) => {
                              e.closePath();
                            }));
                        },
                        eb: function () {
                          this.Ka || this.moveTo(0, 0);
                        },
                        Ia: function () {
                          this.la !== null &&
                            ((this.la.lb = !1), (this.la = null));
                        },
                        ka: function (e) {
                          this.La.push(e);
                        },
                        Ha: function () {
                          return this.W.Sb(this.La);
                        },
                        hb: function (e) {
                          this.W.release(e);
                        },
                        Kb: function () {
                          let e = this.Ha();
                          return (this.W.clear(), e);
                        },
                      }),
                      S = s.extend(`CanvasRenderPaint`, {
                        __construct: function () {
                          (this.__parent.__construct.call(this),
                            (this.H = []),
                            (this.Ja = 0),
                            (this.Ma = h),
                            (this.Qa = t(4278190080)),
                            (this.Oa = 1),
                            (this.ta = `miter`),
                            (this.sa = `butt`),
                            (this.bb = e(m.srcOver)),
                            (this.ga = null));
                        },
                        color: function (e) {
                          this.H.push(() => {
                            this.Qa = t(e);
                          });
                        },
                        thickness: function (e) {
                          this.H.push(() => {
                            this.Oa = Math.abs(e);
                          });
                        },
                        join: function (e) {
                          this.H.push(() => {
                            switch (e) {
                              case p.miter:
                                this.ta = `miter`;
                                break;
                              case p.round:
                                this.ta = `round`;
                                break;
                              case p.bevel:
                                this.ta = `bevel`;
                            }
                          });
                        },
                        cap: function (e) {
                          this.H.push(() => {
                            switch (e) {
                              case f.butt:
                                this.sa = `butt`;
                                break;
                              case f.round:
                                this.sa = `round`;
                                break;
                              case f.square:
                                this.sa = `square`;
                            }
                          });
                        },
                        style: function (e) {
                          this.H.push(() => {
                            this.Ma = e;
                          });
                        },
                        blendMode: function (t) {
                          this.H.push(() => {
                            this.bb = e(t);
                          });
                        },
                        clearGradient: function () {
                          this.H.push(() => {
                            this.ga = null;
                          });
                        },
                        linearGradient: function (e, t, n, r) {
                          this.H.push(() => {
                            this.ga = { Fb: e, Gb: t, nb: n, ob: r, $a: [] };
                          });
                        },
                        radialGradient: function (e, t, n, r) {
                          this.H.push(() => {
                            this.ga = {
                              Fb: e,
                              Gb: t,
                              nb: n,
                              ob: r,
                              $a: [],
                              nc: !0,
                            };
                          });
                        },
                        addStop: function (e, t) {
                          this.H.push(() => {
                            this.ga.$a.push({ color: e, stop: t });
                          });
                        },
                        completeGradient: function () {},
                        Lb: function (e, n, r, i) {
                          if (this.Ma !== g || 0 < this.Oa) {
                            var a = this.Ma,
                              o = this.Qa,
                              s = this.ga,
                              c = e.globalCompositeOperation,
                              l = e.globalAlpha;
                            if (
                              ((e.globalCompositeOperation = this.bb),
                              (e.globalAlpha = i),
                              s != null)
                            ) {
                              o = s.Fb;
                              let n = s.Gb,
                                r = s.nb;
                              var u = s.ob;
                              ((i = s.$a),
                                s.nc
                                  ? ((s = r - o),
                                    (u -= n),
                                    (o = e.createRadialGradient(
                                      o,
                                      n,
                                      0,
                                      o,
                                      n,
                                      Math.sqrt(s * s + u * u),
                                    )))
                                  : (o = e.createLinearGradient(o, n, r, u)));
                              for (let e = 0, n = i.length; e < n; e++)
                                ((s = i[e]),
                                  o.addColorStop(s.stop, t(s.color)));
                              ((this.Qa = o), (this.ga = null));
                            }
                            switch (a) {
                              case g:
                                ((e.strokeStyle = o),
                                  (e.lineWidth = this.Oa),
                                  (e.lineCap = this.sa),
                                  (e.lineJoin = this.ta),
                                  e.stroke(n));
                                break;
                              case h:
                                ((e.fillStyle = o), e.fill(n, r));
                            }
                            ((e.globalCompositeOperation = c),
                              (e.globalAlpha = l));
                          }
                        },
                        Nb: function () {
                          return this.Ja + this.H.length;
                        },
                        Mb: function (e) {
                          let t = e - this.Ja;
                          for (let e = 0; e < t; e++) this.H[e]();
                          (this.H.splice(0, t), (this.Ja = e));
                        },
                      });
                    let C = new Set(),
                      w = Object.prototype.hasOwnProperty,
                      T = null,
                      E = [],
                      D = 0,
                      O = 0;
                    var k = (r.CanvasRenderer = c.extend(`Renderer`, {
                      __construct: function (e) {
                        (this.__parent.__construct.call(this),
                          (this.V = [1, 0, 0, 1, 0, 0]),
                          (this.G = [1]),
                          (this.D = e.getContext(`2d`)),
                          (this.cb = e),
                          (this.J = []));
                      },
                      save: function () {
                        (this.V.push(...this.V.slice(this.V.length - 6)),
                          this.G.push(this.G[this.G.length - 1]),
                          this.J.push(this.D.save.bind(this.D)));
                      },
                      restore: function () {
                        let e = this.V.length - 6;
                        if (6 > e)
                          throw `restore() called without matching save().`;
                        (this.V.splice(e),
                          this.G.pop(),
                          this.J.push(this.D.restore.bind(this.D)));
                      },
                      transform: function (e, t, n, r, i, a) {
                        let o = this.V,
                          s = o.length - 6;
                        (o.splice(
                          s,
                          6,
                          o[s] * e + o[s + 2] * t,
                          o[s + 1] * e + o[s + 3] * t,
                          o[s] * n + o[s + 2] * r,
                          o[s + 1] * n + o[s + 3] * r,
                          o[s] * i + o[s + 2] * a + o[s + 4],
                          o[s + 1] * i + o[s + 3] * a + o[s + 5],
                        ),
                          this.J.push(
                            this.D.transform.bind(this.D, e, t, n, r, i, a),
                          ));
                      },
                      rotate: function (e) {
                        let t = Math.sin(e);
                        ((e = Math.cos(e)), this.transform(e, t, -t, e, 0, 0));
                      },
                      modulateOpacity: function (e) {
                        this.G[this.G.length - 1] *= e;
                      },
                      _drawPath: function (e, t) {
                        let n = e.fb === _ ? `evenodd` : `nonzero`,
                          r = Math.max(0, this.G[this.G.length - 1]),
                          i = e.Ha(),
                          a = t.Nb();
                        this.J.push(() => {
                          (t.Mb(a), t.Lb(this.D, i, n, r), e.hb(i));
                        });
                      },
                      _drawRiveImage: function (t, n, r) {
                        var i = t.Ob;
                        if (i) {
                          var a = this.D,
                            o = e(n),
                            s = Math.max(0, r * this.G[this.G.length - 1]);
                          this.J.push(function () {
                            ((a.globalCompositeOperation = o),
                              (a.globalAlpha = s),
                              a.drawImage(i, 0, 0),
                              (a.globalAlpha = 1));
                          });
                        }
                      },
                      _getMatrix: function (e) {
                        let t = this.V,
                          n = t.length - 6;
                        for (let r = 0; 6 > r; ++r) e[r] = t[n + r];
                      },
                      _drawImageMesh: function (
                        t,
                        i,
                        a,
                        o,
                        s,
                        c,
                        l,
                        d,
                        f,
                        p,
                        m,
                        h,
                        g,
                      ) {
                        let _, v, y;
                        try {
                          ((_ = r.HEAPF32.slice(o >> 2, (o >> 2) + s)),
                            (v = r.HEAPF32.slice(c >> 2, (c >> 2) + l)),
                            (y = r.HEAPU16.slice(d >> 1, (d >> 1) + f)));
                        } catch {
                          console.error(
                            `[Rive] _drawImageMesh: failed to read mesh data from WASM heap. Mesh skipped for this frame.`,
                          );
                          return;
                        }
                        ((o = this.D.canvas.width),
                          (c = this.D.canvas.height),
                          (l = h - p),
                          (d = g - m),
                          (p = Math.max(p, 0)),
                          (m = Math.max(m, 0)),
                          (h = Math.min(h, o)),
                          (g = Math.min(g, c)));
                        let b = h - p,
                          x = g - m;
                        if (
                          (console.assert(b <= Math.min(l, o)),
                          console.assert(x <= Math.min(d, c)),
                          !(0 >= b || 0 >= x))
                        ) {
                          ((h = b < l || x < d), (o = g = 1));
                          var S = Math.ceil(b * g),
                            w = Math.ceil(x * o);
                          ((c = u.pc()),
                            S > c && ((g *= c / S), (S = c)),
                            w > c && ((o *= c / w), (w = c)),
                            T ||
                              ((T = new r.DynamicRectanizer(c)),
                              T.reset(512, 512)),
                            (c = T.addRect(S, w)),
                            0 > c &&
                              (n(),
                              C.add(this),
                              (c = T.addRect(S, w)),
                              console.assert(0 <= c)));
                          var k = c & 65535,
                            A = c >> 16;
                          (E.push({
                            ha: this.V.slice(this.V.length - 6),
                            image: t,
                            ib: k,
                            jb: A,
                            qc: p,
                            rc: m,
                            Cc: S,
                            rb: w,
                            Da: g,
                            Ea: o,
                            ab: _,
                            Ib: v,
                            indices: y,
                            tc: h,
                            Eb: (t.Pa << 1) | !!h,
                          }),
                            (D += s),
                            (O += f));
                          var j = this.D,
                            M = e(i),
                            N = Math.max(0, a * this.G[this.G.length - 1]);
                          this.J.push(function () {
                            (j.save(),
                              j.resetTransform(),
                              (j.globalCompositeOperation = M),
                              (j.globalAlpha = N));
                            let e = u.canvas();
                            (e && j.drawImage(e, k, A, S, w, p, m, b, x),
                              j.restore());
                          });
                        }
                      },
                      _clipPath: function (e) {
                        let t = e.fb === _ ? `evenodd` : `nonzero`,
                          n = e.Ha();
                        this.J.push(() => {
                          (this.D.clip(n, t), e.hb(n));
                        });
                      },
                      beginFrame: function (e = !0) {
                        (C.add(this),
                          e &&
                            this.J.push(
                              this.D.clearRect.bind(
                                this.D,
                                0,
                                0,
                                this.cb.width,
                                this.cb.height,
                              ),
                            ));
                      },
                      clear: function () {
                        this.beginFrame(!0);
                      },
                      flush: function () {},
                      translate: function (e, t) {
                        this.transform(1, 0, 0, 1, e, t);
                      },
                    }));
                    ((r.makeRenderer = function (e) {
                      let t = new k(e),
                        n = t.D,
                        i = null,
                        a = null,
                        o = {
                          attachSession: function (e) {
                            if (e && i === e) return !0;
                            if (
                              !e ||
                              i ||
                              typeof r.c2dDeferredClaim != `function` ||
                              typeof r.c2dDeferredRenderer != `function` ||
                              !r.c2dDeferredClaim(e)
                            )
                              return !1;
                            let t = r.c2dDeferredRenderer(e);
                            return t ? ((i = e), (a = t), !0) : !1;
                          },
                          detachSession: function () {
                            (i && r.c2dDeferredDetach(i), (a = i = null));
                          },
                          deferredActive: function () {
                            return a !== null;
                          },
                        },
                        s = {
                          save: function () {
                            r.c2dDeferredSave(i);
                          },
                          restore: function () {
                            r.c2dDeferredRestore(i);
                          },
                          transform: function (e, t, n, a, o, s) {
                            r.c2dDeferredTransform(i, e, t, n, a, o, s);
                          },
                          translate: function (e, t) {
                            r.c2dDeferredTransform(i, 1, 0, 0, 1, e, t);
                          },
                          rotate: function (e) {
                            let t = Math.sin(e);
                            ((e = Math.cos(e)),
                              r.c2dDeferredTransform(i, e, t, -t, e, 0, 0));
                          },
                          align: function (e, t, n, a, o) {
                            r.c2dDeferredAlign(
                              i,
                              e,
                              t,
                              n.minX,
                              n.minY,
                              n.maxX,
                              n.maxY,
                              a.minX,
                              a.minY,
                              a.maxX,
                              a.maxY,
                              o === void 0 ? 1 : o,
                            );
                          },
                          beginFrame: function (e = !0) {
                            (t.beginFrame(e), r.c2dDeferredBeginFrame(i));
                          },
                          clear: function () {
                            (t.beginFrame(!0), r.c2dDeferredBeginFrame(i));
                          },
                          flush: function () {
                            r.c2dDeferredReplay(i, t);
                          },
                        };
                      return new Proxy(t, {
                        get(e, r) {
                          if (w.call(o, r)) return o[r];
                          if (r === `_deferredRecorder`) return a;
                          if (a !== null && w.call(s, r)) return s[r];
                          if (typeof e[r] == `function`)
                            return function (...t) {
                              return e[r].apply(e, t);
                            };
                          if (typeof n[r] == `function`) {
                            if (-1 < l.indexOf(r))
                              throw Error(
                                `RiveException: Method call to '` +
                                  r +
                                  `()' is not allowed, as the renderer cannot immediately pass through the return                 values of any canvas 2d context methods.`,
                              );
                            return function (...e) {
                              t.J.push(n[r].bind(n, ...e));
                            };
                          }
                          return e[r];
                        },
                        set(e, r, i) {
                          if (r in n)
                            return (
                              t.J.push(() => {
                                n[r] = i;
                              }),
                              !0
                            );
                        },
                      });
                    }),
                      (r.decodeImage = function (e, t) {
                        new y({ oa: t }).decode(e);
                      }),
                      (r.renderFactory = {
                        makeRenderPaint: function () {
                          return new S();
                        },
                        makeRenderPath: function () {
                          return new x();
                        },
                        makeRenderImage: function () {
                          let e = j;
                          return new y({
                            Ba: () => {
                              e.total++;
                            },
                            oa: () => {
                              if ((e.loaded++, e.loaded === e.total)) {
                                let t = e.ready;
                                t && (t(), (e.ready = null));
                              }
                            },
                          });
                        },
                      }));
                    let A = r.load,
                      j = null;
                    r.load = function (e, t, n = !0, i = null) {
                      let a = new r.FallbackFileAssetLoader();
                      return (
                        t !== void 0 && a.addLoader(t),
                        n &&
                          ((t = new r.CDNFileAssetLoader(i)), a.addLoader(t)),
                        new Promise(function (t) {
                          let n = null;
                          ((j = {
                            total: 0,
                            loaded: 0,
                            ready: function () {
                              t(n);
                            },
                          }),
                            (n = A(e, a, i ?? null)),
                            j.total == 0 && t(n));
                        })
                      );
                    };
                    let M = r.Artboard.prototype.draw;
                    r.Artboard.prototype.draw = function (e) {
                      M.call(this, e._deferredRecorder || e);
                    };
                    let N = r.RendererWrapper.prototype.align;
                    ((r.RendererWrapper.prototype.align = function (
                      e,
                      t,
                      n,
                      r,
                      i = 1,
                    ) {
                      N.call(this, e, t, n, r, i);
                    }),
                      (i = new o()),
                      (r.requestAnimationFrame =
                        i.requestAnimationFrame.bind(i)),
                      (r.cancelAnimationFrame = i.cancelAnimationFrame.bind(i)),
                      (r.enableFPSCounter = i.$b.bind(i)),
                      (r.disableFPSCounter = i.Xb),
                      (i.xb = n),
                      (r.resolveAnimationFrame = n),
                      (r.cleanup = function () {
                        T && T.delete();
                      }));
                  };
                  var f = `./this.program`;
                  a && (e = self.location.href);
                  var p = ``,
                    m,
                    h;
                  if (i || a) {
                    try {
                      p = new URL(`.`, e).href;
                    } catch {}
                    (a &&
                      (h = (e) => {
                        var t = new XMLHttpRequest();
                        return (
                          t.open(`GET`, e, !1),
                          (t.responseType = `arraybuffer`),
                          t.send(null),
                          new Uint8Array(t.response)
                        );
                      }),
                      (m = async (e) => {
                        if (x(e))
                          return new Promise((t, n) => {
                            var r = new XMLHttpRequest();
                            (r.open(`GET`, e, !0),
                              (r.responseType = `arraybuffer`),
                              (r.onload = () => {
                                r.status == 200 || (r.status == 0 && r.response)
                                  ? t(r.response)
                                  : n(r.status);
                              }),
                              (r.onerror = n),
                              r.send(null));
                          });
                        var t = await fetch(e, { credentials: `same-origin` });
                        if (t.ok) return t.arrayBuffer();
                        throw Error(t.status + ` : ` + t.url);
                      }));
                  }
                  var g = console.log.bind(console),
                    _ = console.error.bind(console),
                    v,
                    y = !1,
                    b,
                    x = (e) => e.startsWith(`file://`),
                    S,
                    C,
                    w,
                    T,
                    E,
                    D,
                    O,
                    k,
                    A,
                    j,
                    M = !1;
                  function N() {
                    var e = Nn.buffer;
                    ((r.HEAP8 = w = new Int8Array(e)),
                      (E = new Int16Array(e)),
                      (r.HEAPU8 = T = new Uint8Array(e)),
                      (r.HEAPU16 = D = new Uint16Array(e)),
                      (r.HEAP32 = O = new Int32Array(e)),
                      (r.HEAPU32 = k = new Uint32Array(e)),
                      (r.HEAPF32 = A = new Float32Array(e)),
                      (j = new Float64Array(e)));
                  }
                  function P(e) {
                    throw (
                      r.onAbort?.(e),
                      (e = `Aborted(` + e + `)`),
                      _(e),
                      (y = !0),
                      (e = new WebAssembly.RuntimeError(
                        e + `. Build with -sASSERTIONS for more info.`,
                      )),
                      C?.(e),
                      e
                    );
                  }
                  var F;
                  async function I(e) {
                    if (!v)
                      try {
                        var t = await m(e);
                        return new Uint8Array(t);
                      } catch {}
                    if (e == F && v) e = new Uint8Array(v);
                    else if (h) e = h(e);
                    else
                      throw `both async and sync fetching of the wasm failed`;
                    return e;
                  }
                  async function ee(e, t) {
                    try {
                      var n = await I(e);
                      return await WebAssembly.instantiate(n, t);
                    } catch (e) {
                      (_(`failed to asynchronously prepare wasm: ${e}`), P(e));
                    }
                  }
                  async function te(e) {
                    var t = F;
                    if (!v && !x(t))
                      try {
                        var n = fetch(t, { credentials: `same-origin` });
                        return await WebAssembly.instantiateStreaming(n, e);
                      } catch (e) {
                        (_(`wasm streaming compile failed: ${e}`),
                          _(`falling back to ArrayBuffer instantiation`));
                      }
                    return ee(t, e);
                  }
                  var L, R;
                  class ne {
                    name = `ExitStatus`;
                    constructor(e) {
                      ((this.message = `Program terminated with exit(${e})`),
                        (this.status = e));
                    }
                  }
                  var z = (e) => {
                      for (; 0 < e.length;) e.shift()(r);
                    },
                    re = [],
                    ie = [],
                    ae = () => {
                      var e = r.preRun.shift();
                      ie.push(e);
                    },
                    oe = !0,
                    B = () => {
                      var e = O[$e >> 2];
                      return (($e += 4), e);
                    },
                    se = (e, t) => {
                      for (var n = 0, r = e.length - 1; 0 <= r; r--) {
                        var i = e[r];
                        i === `.`
                          ? e.splice(r, 1)
                          : i === `..`
                            ? (e.splice(r, 1), n++)
                            : n && (e.splice(r, 1), n--);
                      }
                      if (t) for (; n; n--) e.unshift(`..`);
                      return e;
                    },
                    ce = (e) => {
                      var t = e.charAt(0) === `/`,
                        n = e.slice(-1) === `/`;
                      return (
                        (e = se(
                          e.split(`/`).filter((e) => !!e),
                          !t,
                        ).join(`/`)) ||
                          t ||
                          (e = `.`),
                        e && n && (e += `/`),
                        (t ? `/` : ``) + e
                      );
                    },
                    le = (e) => {
                      var t =
                        /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                          .exec(e)
                          .slice(1);
                      return (
                        (e = t[0]),
                        (t = t[1]),
                        !e && !t ? `.` : ((t &&= t.slice(0, -1)), e + t)
                      );
                    },
                    ue = () => (e) => crypto.getRandomValues(e),
                    de = (e) => {
                      (de = ue())(e);
                    },
                    fe = (...e) => {
                      for (
                        var t = ``, n = !1, r = e.length - 1;
                        -1 <= r && !n;
                        r--
                      ) {
                        if (((n = 0 <= r ? e[r] : `/`), typeof n != `string`))
                          throw TypeError(
                            `Arguments to path.resolve must be strings`,
                          );
                        if (!n) return ``;
                        ((t = n + `/` + t), (n = n.charAt(0) === `/`));
                      }
                      return (
                        (t = se(
                          t.split(`/`).filter((e) => !!e),
                          !n,
                        ).join(`/`)),
                        (n ? `/` : ``) + t || `.`
                      );
                    },
                    V = globalThis.TextDecoder && new TextDecoder(),
                    H = (e, t, n, r) => {
                      if (((n = t + n), r)) return n;
                      for (; e[t] && !(t >= n);) ++t;
                      return t;
                    },
                    U = (e, t = 0, n, r) => {
                      if (((n = H(e, t, n, r)), 16 < n - t && e.buffer && V))
                        return V.decode(e.subarray(t, n));
                      for (r = ``; t < n;) {
                        var i = e[t++];
                        if (i & 128) {
                          var a = e[t++] & 63;
                          if ((i & 224) == 192)
                            r += String.fromCharCode(((i & 31) << 6) | a);
                          else {
                            var o = e[t++] & 63;
                            ((i =
                              (i & 240) == 224
                                ? ((i & 15) << 12) | (a << 6) | o
                                : ((i & 7) << 18) |
                                  (a << 12) |
                                  (o << 6) |
                                  (e[t++] & 63)),
                              65536 > i
                                ? (r += String.fromCharCode(i))
                                : ((i -= 65536),
                                  (r += String.fromCharCode(
                                    55296 | (i >> 10),
                                    56320 | (i & 1023),
                                  ))));
                          }
                        } else r += String.fromCharCode(i);
                      }
                      return r;
                    },
                    pe = [],
                    me = (e) => {
                      for (var t = 0, n = 0; n < e.length; ++n) {
                        var r = e.charCodeAt(n);
                        127 >= r
                          ? t++
                          : 2047 >= r
                            ? (t += 2)
                            : 55296 <= r && 57343 >= r
                              ? ((t += 4), ++n)
                              : (t += 3);
                      }
                      return t;
                    },
                    he = (e, t, n, r) => {
                      if (!(0 < r)) return 0;
                      var i = n;
                      r = n + r - 1;
                      for (var a = 0; a < e.length; ++a) {
                        var o = e.codePointAt(a);
                        if (127 >= o) {
                          if (n >= r) break;
                          t[n++] = o;
                        } else if (2047 >= o) {
                          if (n + 1 >= r) break;
                          ((t[n++] = 192 | (o >> 6)),
                            (t[n++] = 128 | (o & 63)));
                        } else if (65535 >= o) {
                          if (n + 2 >= r) break;
                          ((t[n++] = 224 | (o >> 12)),
                            (t[n++] = 128 | ((o >> 6) & 63)),
                            (t[n++] = 128 | (o & 63)));
                        } else {
                          if (n + 3 >= r) break;
                          ((t[n++] = 240 | (o >> 18)),
                            (t[n++] = 128 | ((o >> 12) & 63)),
                            (t[n++] = 128 | ((o >> 6) & 63)),
                            (t[n++] = 128 | (o & 63)),
                            a++);
                        }
                      }
                      return ((t[n] = 0), n - i);
                    },
                    ge = [];
                  function _e(e, t) {
                    ((ge[e] = { input: [], output: [], $: t }), Ue(e, ve));
                  }
                  var ve = {
                      open(e) {
                        var t = ge[e.node.Ca];
                        if (!t) throw new K(43);
                        ((e.s = t), (e.seekable = !1));
                      },
                      close(e) {
                        e.s.$.ua(e.s);
                      },
                      ua(e) {
                        e.s.$.ua(e.s);
                      },
                      read(e, t, n, r) {
                        if (!e.s || !e.s.$.qb) throw new K(60);
                        for (var i = 0, a = 0; a < r; a++) {
                          try {
                            var o = e.s.$.qb(e.s);
                          } catch {
                            throw new K(29);
                          }
                          if (o === void 0 && i === 0) throw new K(6);
                          if (o == null) break;
                          (i++, (t[n + a] = o));
                        }
                        return (i && (e.node.ea = Date.now()), i);
                      },
                      write(e, t, n, r) {
                        if (!e.s || !e.s.$.Xa) throw new K(60);
                        try {
                          for (var i = 0; i < r; i++) e.s.$.Xa(e.s, t[n + i]);
                        } catch {
                          throw new K(29);
                        }
                        return (r && (e.node.O = e.node.K = Date.now()), i);
                      },
                    },
                    ye = {
                      qb() {
                        a: {
                          if (!pe.length) {
                            var e = null;
                            if (
                              (globalThis.window?.prompt &&
                                ((e = window.prompt(`Input: `)),
                                e !== null &&
                                  (e += `
`)),
                              !e)
                            ) {
                              var t = null;
                              break a;
                            }
                            ((t = Array(me(e) + 1)),
                              (e = he(e, t, 0, t.length)),
                              (t.length = e),
                              (pe = t));
                          }
                          t = pe.shift();
                        }
                        return t;
                      },
                      Xa(e, t) {
                        t === null || t === 10
                          ? (g(U(e.output)), (e.output = []))
                          : t != 0 && e.output.push(t);
                      },
                      ua(e) {
                        0 < e.output?.length &&
                          (g(U(e.output)), (e.output = []));
                      },
                      kc() {
                        return {
                          Lc: 25856,
                          Nc: 5,
                          Kc: 191,
                          Mc: 35387,
                          Jc: [
                            3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15,
                            23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0,
                          ],
                        };
                      },
                      lc() {
                        return 0;
                      },
                      mc() {
                        return [24, 80];
                      },
                    },
                    be = {
                      Xa(e, t) {
                        t === null || t === 10
                          ? (_(U(e.output)), (e.output = []))
                          : t != 0 && e.output.push(t);
                      },
                      ua(e) {
                        0 < e.output?.length &&
                          (_(U(e.output)), (e.output = []));
                      },
                    },
                    W = {
                      S: null,
                      Z() {
                        return W.createNode(null, `/`, 16895, 0);
                      },
                      createNode(e, t, n, r) {
                        if ((n & 61440) == 24576 || (n & 61440) == 4096)
                          throw new K(63);
                        return (
                          (W.S ||= {
                            dir: {
                              node: {
                                ca: W.l.ca,
                                U: W.l.U,
                                na: W.l.na,
                                za: W.l.za,
                                Bb: W.l.Bb,
                                Hb: W.l.Hb,
                                Db: W.l.Db,
                                Za: W.l.Za,
                                Ga: W.l.Ga,
                              },
                              stream: { R: W.i.R },
                            },
                            file: {
                              node: { ca: W.l.ca, U: W.l.U },
                              stream: {
                                R: W.i.R,
                                read: W.i.read,
                                write: W.i.write,
                                ub: W.i.ub,
                                wb: W.i.wb,
                              },
                            },
                            link: {
                              node: { ca: W.l.ca, U: W.l.U, pa: W.l.pa },
                              stream: {},
                            },
                            kb: { node: { ca: W.l.ca, U: W.l.U }, stream: He },
                          }),
                          (n = Pe(e, t, n, r)),
                          (n.mode & 61440) == 16384
                            ? ((n.l = W.S.dir.node),
                              (n.i = W.S.dir.stream),
                              (n.j = {}))
                            : (n.mode & 61440) == 32768
                              ? ((n.l = W.S.file.node),
                                (n.i = W.S.file.stream),
                                (n.B = 0),
                                (n.j = null))
                              : (n.mode & 61440) == 40960
                                ? ((n.l = W.S.link.node),
                                  (n.i = W.S.link.stream))
                                : (n.mode & 61440) == 8192 &&
                                  ((n.l = W.S.kb.node), (n.i = W.S.kb.stream)),
                          (n.ea = n.O = n.K = Date.now()),
                          e && ((e.j[t] = n), (e.ea = e.O = e.K = n.ea)),
                          n
                        );
                      },
                      Rc(e) {
                        return e.j
                          ? e.j.subarray
                            ? e.j.subarray(0, e.B)
                            : new Uint8Array(e.j)
                          : new Uint8Array();
                      },
                      l: {
                        ca(e) {
                          var t = {};
                          return (
                            (t.Oc = (e.mode & 61440) == 8192 ? e.id : 1),
                            (t.Tc = e.id),
                            (t.mode = e.mode),
                            (t.Vc = 1),
                            (t.uid = 0),
                            (t.Sc = 0),
                            (t.Ca = e.Ca),
                            (t.size =
                              (e.mode & 61440) == 16384
                                ? 4096
                                : (e.mode & 61440) == 32768
                                  ? e.B
                                  : (e.mode & 61440) == 40960
                                    ? e.link.length
                                    : 0),
                            (t.ea = new Date(e.ea)),
                            (t.O = new Date(e.O)),
                            (t.K = new Date(e.K)),
                            (t.Tb = 4096),
                            (t.Ic = Math.ceil(t.size / t.Tb)),
                            t
                          );
                        },
                        U(e, t) {
                          for (var n of [`mode`, `atime`, `mtime`, `ctime`])
                            t[n] != null && (e[n] = t[n]);
                          t.size !== void 0 &&
                            ((t = t.size),
                            e.B != t &&
                              (t == 0
                                ? ((e.j = null), (e.B = 0))
                                : ((n = e.j),
                                  (e.j = new Uint8Array(t)),
                                  n && e.j.set(n.subarray(0, Math.min(t, e.B))),
                                  (e.B = t))));
                        },
                        na() {
                          throw (
                            W.Ra ||
                              ((W.Ra = new K(44)),
                              (W.Ra.stack = `<generic error, no stack>`)),
                            W.Ra
                          );
                        },
                        za(e, t, n, r) {
                          return W.createNode(e, t, n, r);
                        },
                        Bb(e, t, n) {
                          try {
                            var r = Ne(t, n);
                          } catch {}
                          if (r) {
                            if ((e.mode & 61440) == 16384)
                              for (var i in r.j) throw new K(55);
                            if (((i = Me(r.parent.id, r.name)), Te[i] === r))
                              Te[i] = r.ia;
                            else
                              for (i = Te[i]; i;) {
                                if (i.ia === r) {
                                  i.ia = r.ia;
                                  break;
                                }
                                i = i.ia;
                              }
                          }
                          (delete e.parent.j[e.name],
                            (t.j[n] = e),
                            (e.name = n),
                            (t.K = t.O = e.parent.K = e.parent.O = Date.now()));
                        },
                        Hb(e, t) {
                          (delete e.j[t], (e.K = e.O = Date.now()));
                        },
                        Db(e, t) {
                          var n = Ne(e, t),
                            r;
                          for (r in n.j) throw new K(55);
                          (delete e.j[t], (e.K = e.O = Date.now()));
                        },
                        Za(e) {
                          return [`.`, `..`, ...Object.keys(e.j)];
                        },
                        Ga(e, t, n) {
                          return (
                            (e = W.createNode(e, t, 41471, 0)),
                            (e.link = n),
                            e
                          );
                        },
                        pa(e) {
                          if ((e.mode & 61440) != 40960) throw new K(28);
                          return e.link;
                        },
                      },
                      i: {
                        read(e, t, n, r, i) {
                          var a = e.node.j;
                          if (i >= e.node.B) return 0;
                          if (
                            ((e = Math.min(e.node.B - i, r)),
                            8 < e && a.subarray)
                          )
                            t.set(a.subarray(i, i + e), n);
                          else for (r = 0; r < e; r++) t[n + r] = a[i + r];
                          return e;
                        },
                        write(e, t, n, r, i, a) {
                          if ((t.buffer === w.buffer && (a = !1), !r)) return 0;
                          if (
                            ((e = e.node),
                            (e.O = e.K = Date.now()),
                            t.subarray && (!e.j || e.j.subarray))
                          ) {
                            if (a)
                              return ((e.j = t.subarray(n, n + r)), (e.B = r));
                            if (e.B === 0 && i === 0)
                              return ((e.j = t.slice(n, n + r)), (e.B = r));
                            if (i + r <= e.B)
                              return (e.j.set(t.subarray(n, n + r), i), r);
                          }
                          a = i + r;
                          var o = e.j ? e.j.length : 0;
                          if (
                            (o >= a ||
                              ((a = Math.max(
                                a,
                                (o * (1048576 > o ? 2 : 1.125)) >>> 0,
                              )),
                              o != 0 && (a = Math.max(a, 256)),
                              (o = e.j),
                              (e.j = new Uint8Array(a)),
                              0 < e.B && e.j.set(o.subarray(0, e.B), 0)),
                            e.j.subarray && t.subarray)
                          )
                            e.j.set(t.subarray(n, n + r), i);
                          else for (a = 0; a < r; a++) e.j[i + a] = t[n + a];
                          return ((e.B = Math.max(e.B, i + r)), r);
                        },
                        R(e, t, n) {
                          if (
                            (n === 1
                              ? (t += e.position)
                              : n === 2 &&
                                (e.node.mode & 61440) == 32768 &&
                                (t += e.node.B),
                            0 > t)
                          )
                            throw new K(28);
                          return t;
                        },
                        ub(e, t, n, r, i) {
                          if ((e.node.mode & 61440) != 32768) throw new K(43);
                          if (
                            ((e = e.node.j),
                            i & 2 || !e || e.buffer !== w.buffer)
                          ) {
                            if (((r = !0), P(), (i = void 0), !i))
                              throw new K(48);
                            e &&
                              ((0 < n || n + t < e.length) &&
                                (e = e.subarray
                                  ? e.subarray(n, n + t)
                                  : Array.prototype.slice.call(e, n, n + t)),
                              w.set(e, i));
                          } else ((r = !1), (i = e.byteOffset));
                          return { m: i, Hc: r };
                        },
                        wb(e, t, n, r) {
                          return (W.i.write(e, t, 0, r, n, !1), 0);
                        },
                      },
                    },
                    xe = (e, t) => {
                      var n = 0;
                      return (e && (n |= 365), t && (n |= 146), n);
                    },
                    Se = null,
                    G = {},
                    Ce = [],
                    we = 1,
                    Te = null,
                    Ee = !1,
                    De = !0,
                    Oe = {},
                    K = class {
                      name = `ErrnoError`;
                      constructor(e) {
                        this.aa = e;
                      }
                    },
                    ke = class {
                      Y = {};
                      node = null;
                      get flags() {
                        return this.Y.flags;
                      }
                      set flags(e) {
                        this.Y.flags = e;
                      }
                      get position() {
                        return this.Y.position;
                      }
                      set position(e) {
                        this.Y.position = e;
                      }
                    },
                    Ae = class {
                      l = {};
                      i = {};
                      Aa = null;
                      constructor(e, t, n, r) {
                        ((e ||= this),
                          (this.parent = e),
                          (this.Z = e.Z),
                          (this.id = we++),
                          (this.name = t),
                          (this.mode = n),
                          (this.Ca = r),
                          (this.ea = this.O = this.K = Date.now()));
                      }
                      get read() {
                        return (this.mode & 365) == 365;
                      }
                      set read(e) {
                        e ? (this.mode |= 365) : (this.mode &= -366);
                      }
                      get write() {
                        return (this.mode & 146) == 146;
                      }
                      set write(e) {
                        e ? (this.mode |= 146) : (this.mode &= -147);
                      }
                    };
                  function je(e, t = {}) {
                    if (!e) throw new K(44);
                    ((t.Ta ??= !0), e.charAt(0) === `/` || (e = `//` + e));
                    var n = 0;
                    a: for (; 40 > n; n++) {
                      e = e.split(`/`).filter((e) => !!e);
                      for (var r = Se, i = `/`, a = 0; a < e.length; a++) {
                        var o = a === e.length - 1;
                        if (o && t.parent) break;
                        if (e[a] !== `.`)
                          if (e[a] === `..`)
                            if (((i = le(i)), r === r.parent)) {
                              ((e = i + `/` + e.slice(a + 1).join(`/`)), n--);
                              continue a;
                            } else r = r.parent;
                          else {
                            i = ce(i + `/` + e[a]);
                            try {
                              r = Ne(r, e[a]);
                            } catch (e) {
                              if (e?.aa === 44 && o && t.uc) return { path: i };
                              throw e;
                            }
                            if (
                              (!r.Aa || (o && !t.Ta) || (r = r.Aa.root),
                              (r.mode & 61440) == 40960 && (!o || t.Sa))
                            ) {
                              if (!r.l.pa) throw new K(52);
                              ((r = r.l.pa(r)),
                                r.charAt(0) === `/` || (r = le(i) + `/` + r),
                                (e = r + `/` + e.slice(a + 1).join(`/`)));
                              continue a;
                            }
                          }
                      }
                      return { path: i, node: r };
                    }
                    throw new K(32);
                  }
                  function Me(e, t) {
                    for (var n = 0, r = 0; r < t.length; r++)
                      n = ((n << 5) - n + t.charCodeAt(r)) | 0;
                    return ((e + n) >>> 0) % Te.length;
                  }
                  function Ne(e, t) {
                    var n =
                      (e.mode & 61440) == 16384
                        ? (n = Ie(e, `x`))
                          ? n
                          : e.l.na
                            ? 0
                            : 2
                        : 54;
                    if (n) throw new K(n);
                    for (n = Te[Me(e.id, t)]; n; n = n.ia) {
                      var r = n.name;
                      if (n.parent.id === e.id && r === t) return n;
                    }
                    return e.l.na(e, t);
                  }
                  function Pe(e, t, n, r) {
                    return (
                      (e = new Ae(e, t, n, r)),
                      (t = Me(e.parent.id, e.name)),
                      (e.ia = Te[t]),
                      (Te[t] = e)
                    );
                  }
                  function Fe(e) {
                    var t = [`r`, `w`, `rw`][e & 3];
                    return (e & 512 && (t += `w`), t);
                  }
                  function Ie(e, t) {
                    if (De) return 0;
                    if (!t.includes(`r`) || e.mode & 292) {
                      if (
                        (t.includes(`w`) && !(e.mode & 146)) ||
                        (t.includes(`x`) && !(e.mode & 73))
                      )
                        return 2;
                    } else return 2;
                    return 0;
                  }
                  function Le(e, t) {
                    if ((e.mode & 61440) != 16384) return 54;
                    try {
                      return (Ne(e, t), 20);
                    } catch {}
                    return Ie(e, `wx`);
                  }
                  function Re(e) {
                    if (((e = Ce[e]), !e)) throw new K(8);
                    return e;
                  }
                  function ze(e, t = -1) {
                    if (((e = Object.assign(new ke(), e)), t == -1))
                      a: {
                        for (t = 0; 4096 >= t; t++) if (!Ce[t]) break a;
                        throw new K(33);
                      }
                    return ((e.ba = t), (Ce[t] = e));
                  }
                  function Be(e, t = -1) {
                    return ((e = ze(e, t)), e.i?.Qc?.(e), e);
                  }
                  function Ve(e, t) {
                    var n = void 0,
                      r = n ? null : e;
                    if (((n ??= e.l.U), !n)) throw new K(63);
                    n(r, t);
                  }
                  var He = {
                    open(e) {
                      ((e.i = G[e.node.Ca].i), e.i.open?.(e));
                    },
                    R() {
                      throw new K(70);
                    },
                  };
                  function Ue(e, t) {
                    G[e] = { i: t };
                  }
                  function We(e, t) {
                    var n = t === `/`;
                    if (n && Se) throw new K(10);
                    if (!n && t) {
                      var r = je(t, { Ta: !1 });
                      if (((t = r.path), (r = r.node), r.Aa)) throw new K(10);
                      if ((r.mode & 61440) != 16384) throw new K(54);
                    }
                    ((t = { type: e, Wc: {}, vb: t, sc: [] }),
                      (e = e.Z(t)),
                      (e.Z = t),
                      (t.root = e),
                      n ? (Se = e) : r && ((r.Aa = t), r.Z && r.Z.sc.push(t)));
                  }
                  function Ge(e, t, n) {
                    var r = je(e, { parent: !0 }).node;
                    if (((e &&= e.match(/([^\/]+|\/)\/*$/)[1]), !e))
                      throw new K(28);
                    if (e === `.` || e === `..`) throw new K(20);
                    var i = Le(r, e);
                    if (i) throw new K(i);
                    if (!r.l.za) throw new K(63);
                    return r.l.za(r, e, t, n);
                  }
                  function Ke(e) {
                    return Ge(e, 16895, 0);
                  }
                  function qe(e, t, n) {
                    (n === void 0 && ((n = t), (t = 438)), Ge(e, t | 8192, n));
                  }
                  function Je(e, t) {
                    if (!fe(e)) throw new K(44);
                    var n = je(t, { parent: !0 }).node;
                    if (!n) throw new K(44);
                    t &&= t.match(/([^\/]+|\/)\/*$/)[1];
                    var r = Le(n, t);
                    if (r) throw new K(r);
                    if (!n.l.Ga) throw new K(63);
                    n.l.Ga(n, t, e);
                  }
                  function Ye(e, t, n = 438) {
                    if (e === ``) throw new K(44);
                    if (typeof t == `string`) {
                      var i = {
                        r: 0,
                        "r+": 2,
                        w: 577,
                        "w+": 578,
                        a: 1089,
                        "a+": 1090,
                      }[t];
                      if (i === void 0)
                        throw Error(`Unknown file open mode: ${t}`);
                      t = i;
                    }
                    if (
                      ((n = t & 64 ? (n & 4095) | 32768 : 0),
                      typeof e == `object`)
                    )
                      i = e;
                    else {
                      var a = e.endsWith(`/`);
                      ((e = je(e, { Sa: !(t & 131072), uc: !0 })),
                        (i = e.node),
                        (e = e.path));
                    }
                    var o = !1;
                    if (t & 64)
                      if (i) {
                        if (t & 128) throw new K(20);
                      } else {
                        if (a) throw new K(31);
                        ((i = Ge(e, n | 511, 0)), (o = !0));
                      }
                    if (!i) throw new K(44);
                    if (
                      ((i.mode & 61440) == 8192 && (t &= -513),
                      t & 65536 && (i.mode & 61440) != 16384)
                    )
                      throw new K(54);
                    if (
                      !o &&
                      (a = i
                        ? (i.mode & 61440) == 40960
                          ? 32
                          : (i.mode & 61440) == 16384 &&
                              (Fe(t) !== `r` || t & 576)
                            ? 31
                            : Ie(i, Fe(t))
                        : 44)
                    )
                      throw new K(a);
                    if (t & 512 && !o) {
                      if (
                        ((a = i),
                        (a = typeof a == `string` ? je(a, { Sa: !0 }).node : a),
                        (a.mode & 61440) == 16384)
                      )
                        throw new K(31);
                      if ((a.mode & 61440) != 32768) throw new K(28);
                      var s = Ie(a, `w`);
                      if (s) throw new K(s);
                      Ve(a, { size: 0, timestamp: Date.now() });
                    }
                    t &= -131713;
                    a: for (a = i; ;) {
                      if (a === a.parent) {
                        a = a.Z.vb;
                        var c = c
                          ? a[a.length - 1] === `/`
                            ? a + c
                            : `${a}/${c}`
                          : a;
                        break a;
                      }
                      ((c = c ? `${a.name}/${c}` : a.name), (a = a.parent));
                    }
                    return (
                      (c = ze({
                        node: i,
                        path: c,
                        flags: t,
                        seekable: !0,
                        position: 0,
                        i: i.i,
                        Bc: [],
                        error: !1,
                      })),
                      c.i.open && c.i.open(c),
                      o &&
                        ((n &= 511),
                        (i = typeof i == `string` ? je(i, { Sa: !0 }).node : i),
                        Ve(i, {
                          mode: (n & 4095) | (i.mode & -4096),
                          K: Date.now(),
                          Pc: void 0,
                        })),
                      !r.logReadFiles || t & 1 || e in Oe || (Oe[e] = 1),
                      c
                    );
                  }
                  function Xe(e, t, n) {
                    if (e.ba === null) throw new K(8);
                    if (!e.seekable || !e.i.R) throw new K(70);
                    if (n != 0 && n != 1 && n != 2) throw new K(28);
                    ((e.position = e.i.R(e, t, n)), (e.Bc = []));
                  }
                  function Ze(e, t, n) {
                    e = ce(`/dev/` + e);
                    var r = xe(!!t, !!n);
                    Ze.tb ??= 64;
                    var i = (Ze.tb++ << 8) | 0;
                    (Ue(i, {
                      open(e) {
                        e.seekable = !1;
                      },
                      close() {
                        n?.buffer?.length && n(10);
                      },
                      read(e, n, r, i) {
                        for (var a = 0, o = 0; o < i; o++) {
                          try {
                            var s = t();
                          } catch {
                            throw new K(29);
                          }
                          if (s === void 0 && a === 0) throw new K(6);
                          if (s == null) break;
                          (a++, (n[r + o] = s));
                        }
                        return (a && (e.node.ea = Date.now()), a);
                      },
                      write(e, t, r, i) {
                        for (var a = 0; a < i; a++)
                          try {
                            n(t[r + a]);
                          } catch {
                            throw new K(29);
                          }
                        return (i && (e.node.O = e.node.K = Date.now()), a);
                      },
                    }),
                      qe(e, r, i));
                  }
                  var Qe = {},
                    $e = void 0,
                    et = (e, t) =>
                      Object.defineProperty(t, "name", { value: e }),
                    tt = [],
                    nt = [0, 1, , 1, null, 1, !0, 1, !1, 1],
                    q = class extends Error {
                      constructor(e) {
                        (super(e), (this.name = `BindingError`));
                      }
                    },
                    J = (e) => {
                      if (!e)
                        throw new q(`Cannot use deleted val. handle = ${e}`);
                      return nt[e];
                    },
                    rt = (e) => {
                      switch (e) {
                        case void 0:
                          return 2;
                        case null:
                          return 4;
                        case !0:
                          return 6;
                        case !1:
                          return 8;
                        default:
                          let t = tt.pop() || nt.length;
                          return ((nt[t] = e), (nt[t + 1] = 1), t);
                      }
                    };
                  class it extends Error {}
                  var Y = (e) => {
                      for (var t = ``; ;) {
                        var n = T[e++];
                        if (!n) return t;
                        t += String.fromCharCode(n);
                      }
                    },
                    at = {},
                    ot = (e, t) => {
                      if (t === void 0)
                        throw new q(`ptr should not be undefined`);
                      for (; e.C;) ((t = e.qa(t)), (e = e.C));
                      return t;
                    },
                    st = {},
                    ct = (e) => {
                      e = Tn(e);
                      var t = Y(e);
                      return (Cn(e), t);
                    },
                    lt = (e, t) => {
                      var n = st[e];
                      if (n === void 0)
                        throw (
                          (e = `${t} has unknown type ${ct(e)}`),
                          new q(e)
                        );
                      return n;
                    },
                    ut = () => {},
                    dt = !1,
                    ft = (e) =>
                      globalThis.FinalizationRegistry
                        ? ((dt = new FinalizationRegistry((e) => {
                            ((e = e.g),
                              --e.count.value,
                              e.count.value === 0 &&
                                (e.F ? e.M.T(e.F) : e.u.h.T(e.m)));
                          })),
                          (ft = (e) => {
                            var t = e.g;
                            return (t.F && dt.register(e, { g: t }, e), e);
                          }),
                          (ut = (e) => {
                            dt.unregister(e);
                          }),
                          ft(e))
                        : ((ft = (e) => e), e),
                    pt = {},
                    mt = (e) => {
                      for (; e.length;) {
                        var t = e.pop();
                        e.pop()(t);
                      }
                    };
                  function ht(e) {
                    return this.o(k[e >> 2]);
                  }
                  var gt = {},
                    _t = {},
                    vt = class extends Error {
                      constructor(e) {
                        (super(e), (this.name = `InternalError`));
                      }
                    },
                    X = (e, t, n) => {
                      function r(t) {
                        if (((t = n(t)), t.length !== e.length))
                          throw new vt(`Mismatched type converter count`);
                        for (var r = 0; r < e.length; ++r) Z(e[r], t[r]);
                      }
                      e.forEach((e) => (_t[e] = t));
                      var i = Array(t.length),
                        a = [],
                        o = 0;
                      for (let [e, n] of t.entries())
                        st.hasOwnProperty(n)
                          ? (i[e] = st[n])
                          : (a.push(n),
                            gt.hasOwnProperty(n) || (gt[n] = []),
                            gt[n].push(() => {
                              ((i[e] = st[n]), ++o, o === a.length && r(i));
                            }));
                      a.length === 0 && r(i);
                    };
                  function yt(e, t, n = {}) {
                    var r = t.name;
                    if (!e)
                      throw new q(
                        `type "${r}" must have a positive integer typeid pointer`,
                      );
                    if (st.hasOwnProperty(e)) {
                      if (n.ic) return;
                      throw new q(`Cannot register type '${r}' twice`);
                    }
                    ((st[e] = t),
                      delete _t[e],
                      gt.hasOwnProperty(e) &&
                        ((t = gt[e]), delete gt[e], t.forEach((e) => e())));
                  }
                  function Z(e, t, n = {}) {
                    return yt(e, t, n);
                  }
                  var bt = (e) => {
                      throw new q(e.g.u.h.name + ` instance already deleted`);
                    },
                    xt = [];
                  function St() {}
                  var Ct = {},
                    wt = (e, t, n) => {
                      if (e[t].v === void 0) {
                        var r = e[t];
                        ((e[t] = function (...r) {
                          if (!e[t].v.hasOwnProperty(r.length))
                            throw new q(
                              `Function '${n}' called with an invalid number of arguments (${r.length}) - expects one of (${e[t].v})!`,
                            );
                          return e[t].v[r.length].apply(this, r);
                        }),
                          (e[t].v = []),
                          (e[t].v[r.X] = r));
                      }
                    },
                    Tt = (e, t, n) => {
                      if (r.hasOwnProperty(e)) {
                        if (
                          n === void 0 ||
                          (r[e].v !== void 0 && r[e].v[n] !== void 0)
                        )
                          throw new q(
                            `Cannot register public name '${e}' twice`,
                          );
                        if ((wt(r, e, e), r[e].v.hasOwnProperty(n)))
                          throw new q(
                            `Cannot register multiple overloads of a function with the same number of arguments (${n})!`,
                          );
                        r[e].v[n] = t;
                      } else ((r[e] = t), (r[e].X = n));
                    },
                    Et = (e) => {
                      e = e.replace(/[^a-zA-Z0-9_]/g, `$`);
                      var t = e.charCodeAt(0);
                      return 48 <= t && 57 >= t ? `_${e}` : e;
                    };
                  function Dt(e, t, n, r, i, a, o, s) {
                    ((this.name = e),
                      (this.constructor = t),
                      (this.P = n),
                      (this.T = r),
                      (this.C = i),
                      (this.cc = a),
                      (this.qa = o),
                      (this.Yb = s),
                      (this.zb = []));
                  }
                  var Ot = (e, t, n) => {
                      for (; t !== n;) {
                        if (!t.qa)
                          throw new q(
                            `Expected null or instance of ${n.name}, got an instance of ${t.name}`,
                          );
                        ((e = t.qa(e)), (t = t.C));
                      }
                      return e;
                    },
                    kt = (e) => {
                      if (e === null) return `null`;
                      var t = typeof e;
                      return t === `object` || t === `array` || t === `function`
                        ? e.toString()
                        : `` + e;
                    };
                  function At(e, t) {
                    if (t === null) {
                      if (this.Va)
                        throw new q(`null is not a valid ${this.name}`);
                      return 0;
                    }
                    if (!t.g)
                      throw new q(`Cannot pass "${kt(t)}" as a ${this.name}`);
                    if (!t.g.m)
                      throw new q(
                        `Cannot pass deleted object as a pointer of type ${this.name}`,
                      );
                    return Ot(t.g.m, t.g.u.h, this.h);
                  }
                  function jt(e, t) {
                    if (t === null) {
                      if (this.Va)
                        throw new q(`null is not a valid ${this.name}`);
                      if (this.ya) {
                        var n = this.Ya();
                        return (e !== null && e.push(this.T, n), n);
                      }
                      return 0;
                    }
                    if (!t || !t.g)
                      throw new q(`Cannot pass "${kt(t)}" as a ${this.name}`);
                    if (!t.g.m)
                      throw new q(
                        `Cannot pass deleted object as a pointer of type ${this.name}`,
                      );
                    if (!this.xa && t.g.u.xa)
                      throw new q(
                        `Cannot convert argument of type ${t.g.M ? t.g.M.name : t.g.u.name} to parameter type ${this.name}`,
                      );
                    if (((n = Ot(t.g.m, t.g.u.h, this.h)), this.ya)) {
                      if (t.g.F === void 0)
                        throw new q(
                          `Passing raw pointer to smart pointer is illegal`,
                        );
                      switch (this.Ac) {
                        case 0:
                          if (t.g.M === this) n = t.g.F;
                          else
                            throw new q(
                              `Cannot convert argument of type ${t.g.M ? t.g.M.name : t.g.u.name} to parameter type ${this.name}`,
                            );
                          break;
                        case 1:
                          n = t.g.F;
                          break;
                        case 2:
                          if (t.g.M === this) n = t.g.F;
                          else {
                            var r = t.clone();
                            ((n = this.wc(
                              n,
                              rt(() => r.delete()),
                            )),
                              e !== null && e.push(this.T, n));
                          }
                          break;
                        default:
                          throw new q(`Unsupported sharing policy`);
                      }
                    }
                    return n;
                  }
                  function Mt(e, t) {
                    if (t === null) {
                      if (this.Va)
                        throw new q(`null is not a valid ${this.name}`);
                      return 0;
                    }
                    if (!t.g)
                      throw new q(`Cannot pass "${kt(t)}" as a ${this.name}`);
                    if (!t.g.m)
                      throw new q(
                        `Cannot pass deleted object as a pointer of type ${this.name}`,
                      );
                    if (t.g.u.xa)
                      throw new q(
                        `Cannot convert argument of type ${t.g.u.name} to parameter type ${this.name}`,
                      );
                    return Ot(t.g.m, t.g.u.h, this.h);
                  }
                  var Nt = (e, t, n) =>
                      t === n
                        ? e
                        : n.C === void 0
                          ? null
                          : ((e = Nt(e, t, n.C)), e === null ? null : n.Yb(e)),
                    Pt = (e, t) => ((t = ot(e, t)), at[t]),
                    Ft = (e, t) => {
                      if (!t.u || !t.m)
                        throw new vt(
                          `makeClassHandle requires ptr and ptrType`,
                        );
                      if (!!t.M != !!t.F)
                        throw new vt(
                          `Both smartPtrType and smartPtr must be specified`,
                        );
                      return (
                        (t.count = { value: 1 }),
                        ft(Object.create(e, { g: { value: t, writable: !0 } }))
                      );
                    };
                  function It(e, t, n, r, i, a, o, s, c, l, u) {
                    ((this.name = e),
                      (this.h = t),
                      (this.Va = n),
                      (this.xa = r),
                      (this.ya = i),
                      (this.vc = a),
                      (this.Ac = o),
                      (this.Ab = s),
                      (this.Ya = c),
                      (this.wc = l),
                      (this.T = u),
                      i || t.C !== void 0
                        ? (this.A = jt)
                        : ((this.A = r ? At : Mt), (this.I = null)));
                  }
                  var Lt = (e, t, n) => {
                      if (!r.hasOwnProperty(e))
                        throw new vt(`Replacing nonexistent public symbol`);
                      r[e].v !== void 0 && n !== void 0
                        ? (r[e].v[n] = t)
                        : ((r[e] = t), (r[e].X = n));
                    },
                    Q = {},
                    Rt = (e, t, n = []) => (
                      e.includes(`j`)
                        ? ((e = e.replace(/p/g, `i`)), (t = (0, Q[e])(t, ...n)))
                        : (t = Pn.get(t)(...n)),
                      t
                    ),
                    zt =
                      (e, t) =>
                      (...n) =>
                        Rt(e, t, n),
                    $ = (e, t) => {
                      e = Y(e);
                      var n = e.includes(`j`) ? zt(e, t) : Pn.get(t);
                      if (typeof n != `function`)
                        throw new q(
                          `unknown function pointer with signature ${e}: ${t}`,
                        );
                      return n;
                    };
                  class Bt extends Error {}
                  var Vt = (e, t) => {
                    function n(e) {
                      i[e] ||
                        st[e] ||
                        (_t[e] ? _t[e].forEach(n) : (r.push(e), (i[e] = !0)));
                    }
                    var r = [],
                      i = {};
                    throw (
                      t.forEach(n),
                      new Bt(`${e}: ` + r.map(ct).join([`, `]))
                    );
                  };
                  function Ht(e) {
                    for (var t = 1; t < e.length; ++t)
                      if (e[t] !== null && e[t].I === void 0) return !0;
                    return !1;
                  }
                  function Ut(e, t, n, r, i) {
                    var a = t.length;
                    if (2 > a)
                      throw new q(
                        `argTypes array size mismatch! Must at least get return value and 'this' types!`,
                      );
                    var o = t[1] !== null && n !== null,
                      s = Ht(t),
                      c = !t[0].oc,
                      l = a - 2,
                      u = Array(l),
                      d = [],
                      f = [];
                    return et(e, function (...e) {
                      if (
                        ((f.length = 0), (d.length = o ? 2 : 1), (d[0] = i), o)
                      ) {
                        var n = t[1].A(f, this);
                        d[1] = n;
                      }
                      for (var a = 0; a < l; ++a)
                        ((u[a] = t[a + 2].A(f, e[a])), d.push(u[a]));
                      if (((e = r(...d)), s)) mt(f);
                      else
                        for (a = o ? 1 : 2; a < t.length; a++) {
                          var p = a === 1 ? n : u[a - 2];
                          t[a].I !== null && t[a].I(p);
                        }
                      return ((n = c ? t[0].o(e) : void 0), n);
                    });
                  }
                  var Wt = (e, t) => {
                      for (var n = [], r = 0; r < e; r++)
                        n.push(k[(t + 4 * r) >> 2]);
                      return n;
                    },
                    Gt = (e) => {
                      e = e.trim();
                      let t = e.indexOf(`(`);
                      return t === -1 ? e : e.slice(0, t);
                    },
                    Kt = (e, t, n) => {
                      if (!(e instanceof Object))
                        throw new q(`${n} with invalid "this": ${e}`);
                      if (!(e instanceof t.h.constructor))
                        throw new q(
                          `${n} incompatible with "this" of type ${e.constructor.name}`,
                        );
                      if (!e.g.m)
                        throw new q(
                          `cannot call emscripten binding method ${n} on deleted object`,
                        );
                      return Ot(e.g.m, e.g.u.h, t.h);
                    },
                    qt = (e) => {
                      9 < e &&
                        --nt[e + 1] === 0 &&
                        ((nt[e] = void 0), tt.push(e));
                    },
                    Jt = {
                      name: `emscripten::val`,
                      o: (e) => {
                        var t = J(e);
                        return (qt(e), t);
                      },
                      A: (e, t) => rt(t),
                      L: ht,
                      I: null,
                    },
                    Yt = (e, t, n) => {
                      switch (t) {
                        case 1:
                          return n
                            ? function (e) {
                                return this.o(w[e]);
                              }
                            : function (e) {
                                return this.o(T[e]);
                              };
                        case 2:
                          return n
                            ? function (e) {
                                return this.o(E[e >> 1]);
                              }
                            : function (e) {
                                return this.o(D[e >> 1]);
                              };
                        case 4:
                          return n
                            ? function (e) {
                                return this.o(O[e >> 2]);
                              }
                            : function (e) {
                                return this.o(k[e >> 2]);
                              };
                        default:
                          throw TypeError(`invalid integer width (${t}): ${e}`);
                      }
                    },
                    Xt = (e, t) => {
                      switch (t) {
                        case 4:
                          return function (e) {
                            return this.o(A[e >> 2]);
                          };
                        case 8:
                          return function (e) {
                            return this.o(j[e >> 3]);
                          };
                        default:
                          throw TypeError(`invalid float width (${t}): ${e}`);
                      }
                    },
                    Zt = (e, t, n) => {
                      switch (t) {
                        case 1:
                          return n ? (e) => w[e] : (e) => T[e];
                        case 2:
                          return n ? (e) => E[e >> 1] : (e) => D[e >> 1];
                        case 4:
                          return n ? (e) => O[e >> 2] : (e) => k[e >> 2];
                        default:
                          throw TypeError(`invalid integer width (${t}): ${e}`);
                      }
                    },
                    Qt = globalThis.TextDecoder
                      ? new TextDecoder(`utf-16le`)
                      : void 0,
                    $t = (e, t, n) => {
                      if (
                        ((e >>= 1), (t = H(D, e, t / 2, n)), 16 < t - e && Qt)
                      )
                        return Qt.decode(D.subarray(e, t));
                      for (n = ``; e < t; ++e) n += String.fromCharCode(D[e]);
                      return n;
                    },
                    en = (e, t, n) => {
                      if (((n ??= 2147483647), 2 > n)) return 0;
                      n -= 2;
                      var r = t;
                      n = n < 2 * e.length ? n / 2 : e.length;
                      for (var i = 0; i < n; ++i)
                        ((E[t >> 1] = e.charCodeAt(i)), (t += 2));
                      return ((E[t >> 1] = 0), t - r);
                    },
                    tn = (e) => 2 * e.length,
                    nn = (e, t, n) => {
                      var r = ``;
                      e >>= 2;
                      for (var i = 0; !(i >= t / 4); i++) {
                        var a = k[e + i];
                        if (!a && !n) break;
                        r += String.fromCodePoint(a);
                      }
                      return r;
                    },
                    rn = (e, t, n) => {
                      if (((n ??= 2147483647), 4 > n)) return 0;
                      var r = t;
                      n = r + n - 4;
                      for (var i = 0; i < e.length; ++i) {
                        var a = e.codePointAt(i);
                        if (
                          (65535 < a && i++,
                          (O[t >> 2] = a),
                          (t += 4),
                          t + 4 > n)
                        )
                          break;
                      }
                      return ((O[t >> 2] = 0), t - r);
                    },
                    an = (e) => {
                      for (var t = 0, n = 0; n < e.length; ++n)
                        (65535 < e.codePointAt(n) && n++, (t += 4));
                      return t;
                    },
                    on = 0,
                    sn = [],
                    cn = (e) => {
                      var t = sn.length;
                      return (sn.push(e), t);
                    },
                    ln = (e, t) => {
                      for (var n = Array(e), r = 0; r < e; ++r)
                        n[r] = lt(k[(t + 4 * r) >> 2], `parameter ${r}`);
                      return n;
                    },
                    un = {},
                    dn = (e) => {
                      var t = un[e];
                      return t === void 0 ? Y(e) : t;
                    },
                    fn = [
                      0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335,
                    ],
                    pn = [
                      0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334,
                    ],
                    mn = {},
                    hn = (e) => {
                      if (!(e instanceof ne || e == `unwind`)) throw e;
                    },
                    gn = (e) => {
                      throw (
                        (b = e),
                        oe || 0 < on || (r.onExit?.(e), (y = !0)),
                        new ne(e)
                      );
                    },
                    _n = (e) => {
                      if (!y)
                        try {
                          if ((e(), !(oe || 0 < on)))
                            try {
                              ((b = e = b), gn(e));
                            } catch (e) {
                              hn(e);
                            }
                        } catch (e) {
                          hn(e);
                        }
                    },
                    vn = [],
                    yn = {},
                    bn = () => {
                      if (!xn) {
                        var e = {
                            USER: `web_user`,
                            LOGNAME: `web_user`,
                            PATH: `/`,
                            PWD: `/`,
                            HOME: `/home/web_user`,
                            LANG:
                              (globalThis.navigator?.language ?? `C`).replace(
                                `-`,
                                `_`,
                              ) + `.UTF-8`,
                            _: f || `./this.program`,
                          },
                          t;
                        for (t in yn)
                          yn[t] === void 0 ? delete e[t] : (e[t] = yn[t]);
                        var n = [];
                        for (t in e) n.push(`${t}=${e[t]}`);
                        xn = n;
                      }
                      return xn;
                    },
                    xn;
                  if (
                    ((Te = Array(4096)),
                    We(W, `/`),
                    Ke(`/tmp`),
                    Ke(`/home`),
                    Ke(`/home/web_user`),
                    (function () {
                      (Ke(`/dev`),
                        Ue(259, {
                          read: () => 0,
                          write: (e, t, n, r) => r,
                          R: () => 0,
                        }),
                        qe(`/dev/null`, 259),
                        _e(1280, ye),
                        _e(1536, be),
                        qe(`/dev/tty`, 1280),
                        qe(`/dev/tty1`, 1536));
                      var e = new Uint8Array(1024),
                        t = 0,
                        n = () => (
                          t === 0 && (de(e), (t = e.byteLength)),
                          e[--t]
                        );
                      (Ze(`random`, n),
                        Ze(`urandom`, n),
                        Ke(`/dev/shm`),
                        Ke(`/dev/shm/tmp`));
                    })(),
                    (function () {
                      Ke(`/proc`);
                      var e = Ke(`/proc/self`);
                      (Ke(`/proc/self/fd`),
                        We(
                          {
                            Z() {
                              var t = Pe(e, `fd`, 16895, 73);
                              return (
                                (t.i = { R: W.i.R }),
                                (t.l = {
                                  na(e, t) {
                                    e = +t;
                                    var n = Re(e);
                                    return (
                                      (e = {
                                        parent: null,
                                        Z: { vb: `fake` },
                                        l: { pa: () => n.path },
                                        id: e + 1,
                                      }),
                                      (e.parent = e)
                                    );
                                  },
                                  Za() {
                                    return Array.from(Ce.entries())
                                      .filter(([, e]) => e)
                                      .map(([e]) => e.toString());
                                  },
                                }),
                                t
                              );
                            },
                          },
                          `/proc/self/fd`,
                        ));
                    })(),
                    (() => {
                      let e = St.prototype;
                      Object.assign(e, {
                        isAliasOf: function (e) {
                          if (!(this instanceof St && e instanceof St))
                            return !1;
                          var t = this.g.u.h,
                            n = this.g.m;
                          e.g = e.g;
                          var r = e.g.u.h;
                          for (e = e.g.m; t.C;) ((n = t.qa(n)), (t = t.C));
                          for (; r.C;) ((e = r.qa(e)), (r = r.C));
                          return t === r && n === e;
                        },
                        clone: function () {
                          if ((this.g.m || bt(this), this.g.ja))
                            return ((this.g.count.value += 1), this);
                          var e = ft,
                            t = Object,
                            n = t.create,
                            r = Object.getPrototypeOf(this),
                            i = this.g;
                          return (
                            (e = e(
                              n.call(t, r, {
                                g: {
                                  value: {
                                    count: i.count,
                                    ma: i.ma,
                                    ja: i.ja,
                                    m: i.m,
                                    u: i.u,
                                    F: i.F,
                                    M: i.M,
                                  },
                                },
                              }),
                            )),
                            (e.g.count.value += 1),
                            (e.g.ma = !1),
                            e
                          );
                        },
                        delete() {
                          if ((this.g.m || bt(this), this.g.ma && !this.g.ja))
                            throw new q(
                              `Object already scheduled for deletion`,
                            );
                          ut(this);
                          var e = this.g;
                          (--e.count.value,
                            e.count.value === 0 &&
                              (e.F ? e.M.T(e.F) : e.u.h.T(e.m)),
                            this.g.ja ||
                              ((this.g.F = void 0), (this.g.m = void 0)));
                        },
                        isDeleted: function () {
                          return !this.g.m;
                        },
                        deleteLater: function () {
                          if ((this.g.m || bt(this), this.g.ma && !this.g.ja))
                            throw new q(
                              `Object already scheduled for deletion`,
                            );
                          return (xt.push(this), (this.g.ma = !0), this);
                        },
                      });
                      let t = Symbol.dispose;
                      t && (e[t] = e.delete);
                    })(),
                    Object.assign(It.prototype, {
                      dc(e) {
                        return (this.Ab && (e = this.Ab(e)), e);
                      },
                      mb(e) {
                        this.T?.(e);
                      },
                      L: ht,
                      o: function (e) {
                        function t() {
                          return this.ya
                            ? Ft(this.h.P, { u: this.vc, m: n, M: this, F: e })
                            : Ft(this.h.P, { u: this, m: e });
                        }
                        var n = this.dc(e);
                        if (!n) return (this.mb(e), null);
                        var r = Pt(this.h, n);
                        if (r !== void 0)
                          return r.g.count.value === 0
                            ? ((r.g.m = n), (r.g.F = e), r.clone())
                            : ((r = r.clone()), this.mb(e), r);
                        if (((r = this.h.cc(n)), (r = Ct[r]), !r))
                          return t.call(this);
                        r = this.xa ? r.Ub : r.pointerType;
                        var i = Nt(n, this.h, r.h);
                        return i === null
                          ? t.call(this)
                          : this.ya
                            ? Ft(r.h.P, { u: r, m: i, M: this, F: e })
                            : Ft(r.h.P, { u: r, m: i });
                      },
                    }),
                    r.noExitRuntime && (oe = r.noExitRuntime),
                    r.print && (g = r.print),
                    r.printErr && (_ = r.printErr),
                    r.wasmBinary && (v = r.wasmBinary),
                    r.thisProgram && (f = r.thisProgram),
                    r.preInit)
                  )
                    for (
                      typeof r.preInit == `function` &&
                      (r.preInit = [r.preInit]);
                      0 < r.preInit.length;
                    )
                      r.preInit.shift()();
                  var Sn = {
                      259262: (e, t, n, r, i) => {
                        if (
                          typeof window > `u` ||
                          (window.AudioContext || window.webkitAudioContext) ===
                            void 0
                        )
                          return 0;
                        if (window.miniaudio === void 0) {
                          ((window.miniaudio = { referenceCount: 0 }),
                            (window.miniaudio.device_type = {}),
                            (window.miniaudio.device_type.playback = e),
                            (window.miniaudio.device_type.capture = t),
                            (window.miniaudio.device_type.duplex = n),
                            (window.miniaudio.device_state = {}),
                            (window.miniaudio.device_state.stopped = r),
                            (window.miniaudio.device_state.started = i));
                          let a = window.miniaudio;
                          ((a.devices = []),
                            (a.track_device = function (e) {
                              for (var t = 0; t < a.devices.length; ++t)
                                if (a.devices[t] == null)
                                  return ((a.devices[t] = e), t);
                              return (a.devices.push(e), a.devices.length - 1);
                            }),
                            (a.untrack_device_by_index = function (e) {
                              for (
                                a.devices[e] = null;
                                0 < a.devices.length &&
                                a.devices[a.devices.length - 1] == null;
                              )
                                a.devices.pop();
                            }),
                            (a.untrack_device = function (e) {
                              for (var t = 0; t < a.devices.length; ++t)
                                if (a.devices[t] == e)
                                  return a.untrack_device_by_index(t);
                            }),
                            (a.get_device_by_index = function (e) {
                              return a.devices[e];
                            }),
                            (a.unlock_event_types = [`touchend`, `click`]),
                            (a.unlock = function () {
                              for (var e = 0; e < a.devices.length; ++e) {
                                var t = a.devices[e];
                                t != null &&
                                  t.N != null &&
                                  t.state === a.device_state.started &&
                                  t.N.resume().then(
                                    () => {
                                      En(t.yb);
                                    },
                                    (e) => {
                                      console.error(
                                        `Failed to resume audiocontext`,
                                        e,
                                      );
                                    },
                                  );
                              }
                              a.unlock_event_types.map(function (e) {
                                document.removeEventListener(e, a.unlock, !0);
                              });
                            }),
                            a.unlock_event_types.map(function (e) {
                              document.addEventListener(e, a.unlock, !0);
                            }));
                        }
                        return ((window.miniaudio.referenceCount += 1), 1);
                      },
                      261440: () => {
                        window.miniaudio !== void 0 &&
                          (window.miniaudio.unlock_event_types.map(
                            function (e) {
                              document.removeEventListener(
                                e,
                                window.miniaudio.unlock,
                                !0,
                              );
                            },
                          ),
                          --window.miniaudio.referenceCount,
                          window.miniaudio.referenceCount === 0 &&
                            delete window.miniaudio);
                      },
                      261744: () =>
                        navigator.mediaDevices !== void 0 &&
                        navigator.mediaDevices.getUserMedia !== void 0,
                      261848: () => {
                        try {
                          var e = new (
                              window.AudioContext || window.webkitAudioContext
                            )(),
                            t = e.sampleRate;
                          return (e.close(), t);
                        } catch {
                          return 0;
                        }
                      },
                      262019: (e, t, n, r, i, a) => {
                        if (window.miniaudio === void 0) return -1;
                        var o = {},
                          s = {};
                        return (
                          e == window.miniaudio.device_type.playback &&
                            n != 0 &&
                            (s.sampleRate = n),
                          (o.N = new (
                            window.AudioContext || window.webkitAudioContext
                          )(s)),
                          o.N.suspend(),
                          (o.state = window.miniaudio.device_state.stopped),
                          (n = 0),
                          e != window.miniaudio.device_type.playback && (n = t),
                          (o.da = o.N.createScriptProcessor(r, n, t)),
                          (o.da.onaudioprocess = function (n) {
                            if (
                              ((o.wa == null || o.wa.length == 0) &&
                                (o.wa = new Float32Array(A.buffer, i, r * t)),
                              e == window.miniaudio.device_type.capture ||
                                e == window.miniaudio.device_type.duplex)
                            ) {
                              for (var s = 0; s < t; s += 1)
                                for (
                                  var c = n.inputBuffer.getChannelData(s),
                                    l = o.wa,
                                    u = 0;
                                  u < r;
                                  u += 1
                                )
                                  l[u * t + s] = c[u];
                              Dn(a, r, i);
                            }
                            if (
                              e == window.miniaudio.device_type.playback ||
                              e == window.miniaudio.device_type.duplex
                            )
                              for (
                                On(a, r, i), s = 0;
                                s < n.outputBuffer.numberOfChannels;
                                ++s
                              )
                                for (
                                  c = n.outputBuffer.getChannelData(s),
                                    l = o.wa,
                                    u = 0;
                                  u < r;
                                  u += 1
                                )
                                  c[u] = l[u * t + s];
                            else
                              for (
                                s = 0;
                                s < n.outputBuffer.numberOfChannels;
                                ++s
                              )
                                n.outputBuffer.getChannelData(s).fill(0);
                          }),
                          (e != window.miniaudio.device_type.capture &&
                            e != window.miniaudio.device_type.duplex) ||
                            navigator.mediaDevices
                              .getUserMedia({ audio: !0, video: !1 })
                              .then(function (e) {
                                ((o.Fa = o.N.createMediaStreamSource(e)),
                                  o.Fa.connect(o.da),
                                  o.da.connect(o.N.destination));
                              })
                              .catch(function (e) {
                                console.log(`Failed to get user media: ` + e);
                              }),
                          e == window.miniaudio.device_type.playback &&
                            o.da.connect(o.N.destination),
                          (o.yb = a),
                          window.miniaudio.track_device(o)
                        );
                      },
                      264896: (e) =>
                        window.miniaudio.get_device_by_index(e).N.sampleRate,
                      264969: (e) => {
                        ((e = window.miniaudio.get_device_by_index(e)),
                          e.da !== void 0 &&
                            ((e.da.onaudioprocess = function () {}),
                            e.da.disconnect(),
                            (e.da = void 0)),
                          e.Fa !== void 0 &&
                            (e.Fa.disconnect(), (e.Fa = void 0)),
                          e.N.close(),
                          (e.N = void 0),
                          (e.yb = void 0));
                      },
                      265369: (e) => {
                        window.miniaudio.untrack_device_by_index(e);
                      },
                      265419: (e) => {
                        ((e = window.miniaudio.get_device_by_index(e)),
                          e.N.resume(),
                          (e.state = window.miniaudio.device_state.started));
                      },
                      265558: (e) => {
                        ((e = window.miniaudio.get_device_by_index(e)),
                          e.N.suspend(),
                          (e.state = window.miniaudio.device_state.stopped));
                      },
                    },
                    Cn,
                    wn,
                    Tn,
                    En,
                    Dn,
                    On,
                    kn,
                    An,
                    jn,
                    Mn,
                    Nn,
                    Pn,
                    Fn = {
                      __syscall_fcntl64: function (e, t, n) {
                        $e = n;
                        try {
                          var r = Re(e);
                          switch (t) {
                            case 0:
                              var i = B();
                              if (0 > i) break;
                              for (; Ce[i];) i++;
                              return Be(r, i).ba;
                            case 1:
                            case 2:
                              return 0;
                            case 3:
                              return r.flags;
                            case 4:
                              return ((i = B()), (r.flags |= i), 0);
                            case 12:
                              return ((i = B()), (E[(i + 0) >> 1] = 2), 0);
                            case 13:
                            case 14:
                              return 0;
                          }
                          return -28;
                        } catch (e) {
                          if (Qe === void 0 || e.name !== `ErrnoError`) throw e;
                          return -e.aa;
                        }
                      },
                      __syscall_ioctl: function (e, t, n) {
                        $e = n;
                        try {
                          var r = Re(e);
                          switch (t) {
                            case 21509:
                              return r.s ? 0 : -59;
                            case 21505:
                              if (!r.s) return -59;
                              if (r.s.$.kc) {
                                e = [
                                  3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18,
                                  15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                  0, 0, 0, 0, 0,
                                ];
                                var i = B();
                                ((O[i >> 2] = 25856),
                                  (O[(i + 4) >> 2] = 5),
                                  (O[(i + 8) >> 2] = 191),
                                  (O[(i + 12) >> 2] = 35387));
                                for (var a = 0; 32 > a; a++)
                                  w[i + a + 17] = e[a] || 0;
                              }
                              return 0;
                            case 21510:
                            case 21511:
                            case 21512:
                              return r.s ? 0 : -59;
                            case 21506:
                            case 21507:
                            case 21508:
                              if (!r.s) return -59;
                              if (r.s.$.lc)
                                for (i = B(), e = [], a = 0; 32 > a; a++)
                                  e.push(w[i + a + 17]);
                              return 0;
                            case 21519:
                              return r.s ? ((i = B()), (O[i >> 2] = 0)) : -59;
                            case 21520:
                              return r.s ? -28 : -59;
                            case 21537:
                            case 21531:
                              if (((i = B()), !r.i.jc)) throw new K(59);
                              return r.i.jc(r, t, i);
                            case 21523:
                              return r.s
                                ? (r.s.$.mc &&
                                    ((a = [24, 80]),
                                    (i = B()),
                                    (E[i >> 1] = a[0]),
                                    (E[(i + 2) >> 1] = a[1])),
                                  0)
                                : -59;
                            case 21524:
                              return r.s ? 0 : -59;
                            case 21515:
                              return r.s ? 0 : -59;
                            default:
                              return -28;
                          }
                        } catch (e) {
                          if (Qe === void 0 || e.name !== `ErrnoError`) throw e;
                          return -e.aa;
                        }
                      },
                      __syscall_openat: function (e, t, n, r) {
                        $e = r;
                        try {
                          t = t ? U(T, t) : ``;
                          var i = t;
                          if (i.charAt(0) === `/`) t = i;
                          else {
                            var a = e === -100 ? `/` : Re(e).path;
                            if (i.length == 0) throw new K(44);
                            t = a + `/` + i;
                          }
                          var o = r ? B() : 0;
                          return Ye(t, n, o).ba;
                        } catch (e) {
                          if (Qe === void 0 || e.name !== `ErrnoError`) throw e;
                          return -e.aa;
                        }
                      },
                      _abort_js: () => P(``),
                      _embind_create_inheriting_constructor: (e, t, n) => {
                        ((e = Y(e)), (t = lt(t, `wrapper`)), (n = J(n)));
                        var r = t.h,
                          i = r.P,
                          a = r.C.P,
                          o = r.C.constructor;
                        return (
                          (e = et(e, function (...e) {
                            for (var t of r.C.zb)
                              if (this[t] === a[t])
                                throw new it(
                                  `Pure virtual function ${t} must be implemented in JavaScript`,
                                );
                            (Object.defineProperty(this, "__parent", {
                              value: i,
                            }),
                              this.__construct(...e));
                          })),
                          (i.__construct = function (...e) {
                            if (this === i)
                              throw new q(`Pass correct 'this' to __construct`);
                            ((e = o.implement(this, ...e)), ut(e));
                            var t = e.g;
                            if (
                              (e.notifyOnDestruction(),
                              (t.ja = !0),
                              Object.defineProperties(this, {
                                g: { value: t },
                              }),
                              ft(this),
                              (e = t.m),
                              (e = ot(r, e)),
                              at.hasOwnProperty(e))
                            )
                              throw new q(
                                `Tried to register registered instance: ${e}`,
                              );
                            at[e] = this;
                          }),
                          (i.__destruct = function () {
                            if (this === i)
                              throw new q(`Pass correct 'this' to __destruct`);
                            ut(this);
                            var e = this.g.m;
                            if (((e = ot(r, e)), at.hasOwnProperty(e)))
                              delete at[e];
                            else
                              throw new q(
                                `Tried to unregister unregistered instance: ${e}`,
                              );
                          }),
                          (e.prototype = Object.create(i)),
                          Object.assign(e.prototype, n),
                          rt(e)
                        );
                      },
                      _embind_finalize_value_object: (e) => {
                        var t = pt[e];
                        delete pt[e];
                        var n = t.Ya,
                          r = t.T,
                          i = t.pb,
                          a = i.map((e) => e.hc).concat(i.map((e) => e.yc));
                        X([e], a, (e) => {
                          var a = {},
                            o,
                            s;
                          for ([o, s] of i.entries()) {
                            let t = e[o],
                              n = s.ec,
                              r = s.fc,
                              c = e[o + i.length],
                              l = s.xc,
                              u = s.zc;
                            a[s.ac] = {
                              read: (e) => t.o(n(r, e)),
                              write: (e, t) => {
                                var n = [];
                                (l(u, e, c.A(n, t)), mt(n));
                              },
                              optional: t.optional,
                            };
                          }
                          return [
                            {
                              name: t.name,
                              o: (e) => {
                                var t = {},
                                  n;
                                for (n in a) t[n] = a[n].read(e);
                                return (r(e), t);
                              },
                              A: (e, t) => {
                                for (var i in a)
                                  if (!(i in t || a[i].optional))
                                    throw TypeError(`Missing field: "${i}"`);
                                var o = n();
                                for (i in a) a[i].write(o, t[i]);
                                return (e !== null && e.push(r, o), o);
                              },
                              L: ht,
                              I: r,
                            },
                          ];
                        });
                      },
                      _embind_register_bigint: () => {},
                      _embind_register_bool: (e, t, n, r) => {
                        ((t = Y(t)),
                          Z(e, {
                            name: t,
                            o: function (e) {
                              return !!e;
                            },
                            A: function (e, t) {
                              return t ? n : r;
                            },
                            L: function (e) {
                              return this.o(T[e]);
                            },
                            I: null,
                          }));
                      },
                      _embind_register_class: (
                        e,
                        t,
                        n,
                        r,
                        i,
                        a,
                        o,
                        s,
                        c,
                        l,
                        u,
                        d,
                        f,
                      ) => {
                        ((u = Y(u)),
                          (a = $(i, a)),
                          (s &&= $(o, s)),
                          (l &&= $(c, l)),
                          (f = $(d, f)));
                        var p = Et(u);
                        (Tt(p, function () {
                          Vt(`Cannot construct ${u} due to unbound types`, [r]);
                        }),
                          X([e, t, n], r ? [r] : [], (t) => {
                            if (((t = t[0]), r))
                              var n = t.h,
                                i = n.P;
                            else i = St.prototype;
                            t = et(u, function (...e) {
                              if (Object.getPrototypeOf(this) !== o)
                                throw new q(`Use 'new' to construct ${u}`);
                              if (c.fa === void 0)
                                throw new q(
                                  `${u} has no accessible constructor`,
                                );
                              var t = c.fa[e.length];
                              if (t === void 0)
                                throw new q(
                                  `Tried to invoke ctor of ${u} with invalid number of parameters (${e.length}) - expected (${Object.keys(c.fa).toString()}) parameters instead!`,
                                );
                              return t.apply(this, e);
                            });
                            var o = Object.create(i, {
                              constructor: { value: t },
                            });
                            t.prototype = o;
                            var c = new Dt(u, t, o, f, n, a, s, l);
                            if (c.C) {
                              var d;
                              ((d = c.C).ra ?? (d.ra = []), c.C.ra.push(c));
                            }
                            return (
                              (n = new It(u, c, !0, !1, !1)),
                              (d = new It(u + `*`, c, !1, !1, !1)),
                              (i = new It(u + ` const*`, c, !1, !0, !1)),
                              (Ct[e] = { pointerType: d, Ub: i }),
                              Lt(p, t),
                              [n, d, i]
                            );
                          }));
                      },
                      _embind_register_class_class_function: (
                        e,
                        t,
                        n,
                        r,
                        i,
                        a,
                        o,
                      ) => {
                        var s = Wt(n, r);
                        ((t = Y(t)),
                          (t = Gt(t)),
                          (a = $(i, a)),
                          X([], [e], (e) => {
                            function r() {
                              Vt(`Cannot call ${i} due to unbound types`, s);
                            }
                            e = e[0];
                            var i = `${e.name}.${t}`;
                            t.startsWith(`@@`) && (t = Symbol[t.substring(2)]);
                            var c = e.h.constructor;
                            return (
                              c[t] === void 0
                                ? ((r.X = n - 1), (c[t] = r))
                                : (wt(c, t, i), (c[t].v[n - 1] = r)),
                              X([], s, (r) => {
                                if (
                                  ((r = Ut(
                                    i,
                                    [r[0], null].concat(r.slice(1)),
                                    null,
                                    a,
                                    o,
                                  )),
                                  c[t].v === void 0
                                    ? ((r.X = n - 1), (c[t] = r))
                                    : (c[t].v[n - 1] = r),
                                  e.h.ra)
                                )
                                  for (let n of e.h.ra)
                                    n.constructor.hasOwnProperty(t) ||
                                      (n.constructor[t] = r);
                                return [];
                              }),
                              []
                            );
                          }));
                      },
                      _embind_register_class_class_property: (
                        e,
                        t,
                        n,
                        r,
                        i,
                        a,
                        o,
                        s,
                      ) => {
                        ((t = Y(t)),
                          (a = $(i, a)),
                          X([], [e], (e) => {
                            e = e[0];
                            var i = `${e.name}.${t}`,
                              c = {
                                get() {
                                  Vt(
                                    `Cannot access ${i} due to unbound types`,
                                    [n],
                                  );
                                },
                                enumerable: !0,
                                configurable: !0,
                              };
                            return (
                              (c.set = s
                                ? () => {
                                    Vt(
                                      `Cannot access ${i} due to unbound types`,
                                      [n],
                                    );
                                  }
                                : () => {
                                    throw new q(`${i} is a read-only property`);
                                  }),
                              Object.defineProperty(e.h.constructor, t, c),
                              X([], [n], (n) => {
                                n = n[0];
                                var i = {
                                  get() {
                                    return n.o(a(r));
                                  },
                                  enumerable: !0,
                                };
                                return (
                                  s &&
                                    ((s = $(o, s)),
                                    (i.set = (e) => {
                                      var t = [];
                                      (s(r, n.A(t, e)), mt(t));
                                    })),
                                  Object.defineProperty(e.h.constructor, t, i),
                                  []
                                );
                              }),
                              []
                            );
                          }));
                      },
                      _embind_register_class_constructor: (
                        e,
                        t,
                        n,
                        r,
                        i,
                        a,
                      ) => {
                        var o = Wt(t, n);
                        ((i = $(r, i)),
                          X([], [e], (e) => {
                            e = e[0];
                            var n = `constructor ${e.name}`;
                            if (
                              (e.h.fa === void 0 && (e.h.fa = []),
                              e.h.fa[t - 1] !== void 0)
                            )
                              throw new q(
                                `Cannot register multiple constructors with identical number of parameters (${t - 1}) for class '${e.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`,
                              );
                            return (
                              (e.h.fa[t - 1] = () => {
                                Vt(
                                  `Cannot construct ${e.name} due to unbound types`,
                                  o,
                                );
                              }),
                              X(
                                [],
                                o,
                                (r) => (
                                  r.splice(1, 0, null),
                                  (e.h.fa[t - 1] = Ut(n, r, null, i, a)),
                                  []
                                ),
                              ),
                              []
                            );
                          }));
                      },
                      _embind_register_class_function: (
                        e,
                        t,
                        n,
                        r,
                        i,
                        a,
                        o,
                        s,
                      ) => {
                        var c = Wt(n, r);
                        ((t = Y(t)),
                          (t = Gt(t)),
                          (a = $(i, a)),
                          X([], [e], (e) => {
                            function r() {
                              Vt(`Cannot call ${i} due to unbound types`, c);
                            }
                            e = e[0];
                            var i = `${e.name}.${t}`;
                            (t.startsWith(`@@`) && (t = Symbol[t.substring(2)]),
                              s && e.h.zb.push(t));
                            var l = e.h.P,
                              u = l[t];
                            return (
                              u === void 0 ||
                              (u.v === void 0 &&
                                u.className !== e.name &&
                                u.X === n - 2)
                                ? ((r.X = n - 2),
                                  (r.className = e.name),
                                  (l[t] = r))
                                : (wt(l, t, i), (l[t].v[n - 2] = r)),
                              X(
                                [],
                                c,
                                (r) => (
                                  (r = Ut(i, r, e, a, o)),
                                  l[t].v === void 0
                                    ? ((r.X = n - 2), (l[t] = r))
                                    : (l[t].v[n - 2] = r),
                                  []
                                ),
                              ),
                              []
                            );
                          }));
                      },
                      _embind_register_class_property: (
                        e,
                        t,
                        n,
                        r,
                        i,
                        a,
                        o,
                        s,
                        c,
                        l,
                      ) => {
                        ((t = Y(t)),
                          (i = $(r, i)),
                          X([], [e], (e) => {
                            e = e[0];
                            var r = `${e.name}.${t}`,
                              u = {
                                get() {
                                  Vt(
                                    `Cannot access ${r} due to unbound types`,
                                    [n, o],
                                  );
                                },
                                enumerable: !0,
                                configurable: !0,
                              };
                            return (
                              (u.set = c
                                ? () =>
                                    Vt(
                                      `Cannot access ${r} due to unbound types`,
                                      [n, o],
                                    )
                                : () => {
                                    throw new q(r + ` is a read-only property`);
                                  }),
                              Object.defineProperty(e.h.P, t, u),
                              X([], c ? [n, o] : [n], (n) => {
                                var o = n[0],
                                  u = {
                                    get() {
                                      var t = Kt(this, e, r + ` getter`);
                                      return o.o(i(a, t));
                                    },
                                    enumerable: !0,
                                  };
                                if (c) {
                                  c = $(s, c);
                                  var d = n[1];
                                  u.set = function (t) {
                                    var n = Kt(this, e, r + ` setter`),
                                      i = [];
                                    (c(l, n, d.A(i, t)), mt(i));
                                  };
                                }
                                return (Object.defineProperty(e.h.P, t, u), []);
                              }),
                              []
                            );
                          }));
                      },
                      _embind_register_emval: (e) => Z(e, Jt),
                      _embind_register_enum: (e, t, n, i, a) => {
                        switch (
                          ((t = Y(t)),
                          (a =
                            a === 0 ? `object` : a === 1 ? `number` : `string`),
                          a)
                        ) {
                          case `object`:
                            function s() {}
                            ((s.values = {}),
                              Z(e, {
                                name: t,
                                constructor: s,
                                valueType: a,
                                o: function (e) {
                                  return this.constructor.values[e];
                                },
                                A: (e, t) => t.value,
                                L: Yt(t, n, i),
                                I: null,
                              }),
                              Tt(t, s));
                            break;
                          case `number`:
                            var o = {};
                            (Z(e, {
                              name: t,
                              Wa: o,
                              valueType: a,
                              o: (e) => e,
                              A: (e, t) => t,
                              L: Yt(t, n, i),
                              I: null,
                            }),
                              Tt(t, o),
                              delete r[t].X);
                            break;
                          case `string`:
                            ((o = {}),
                              Z(e, {
                                name: t,
                                Jb: {},
                                Cb: {},
                                Wa: o,
                                valueType: a,
                                o: function (e) {
                                  return this.Cb[e];
                                },
                                A: function (e, t) {
                                  return this.Jb[t];
                                },
                                L: Yt(t, n, i),
                                I: null,
                              }),
                              Tt(t, o),
                              delete r[t].X);
                        }
                      },
                      _embind_register_enum_value: (e, t, n) => {
                        var r = lt(e, `enum`);
                        switch (((t = Y(t)), r.valueType)) {
                          case `object`:
                            ((e = r.constructor),
                              (r = Object.create(r.constructor.prototype, {
                                value: { value: n },
                                constructor: {
                                  value: et(`${r.name}_${t}`, function () {}),
                                },
                              })),
                              (e.values[n] = r),
                              (e[t] = r));
                            break;
                          case `number`:
                            r.Wa[t] = n;
                            break;
                          case `string`:
                            ((r.Jb[t] = n), (r.Cb[n] = t), (r.Wa[t] = t));
                        }
                      },
                      _embind_register_float: (e, t, n) => {
                        ((t = Y(t)),
                          Z(e, {
                            name: t,
                            o: (e) => e,
                            A: (e, t) => t,
                            L: Xt(t, n),
                            I: null,
                          }));
                      },
                      _embind_register_function: (e, t, n, r, i, a) => {
                        var o = Wt(t, n);
                        ((e = Y(e)),
                          (e = Gt(e)),
                          (i = $(r, i)),
                          Tt(
                            e,
                            function () {
                              Vt(`Cannot call ${e} due to unbound types`, o);
                            },
                            t - 1,
                          ),
                          X(
                            [],
                            o,
                            (n) => (
                              Lt(
                                e,
                                Ut(
                                  e,
                                  [n[0], null].concat(n.slice(1)),
                                  null,
                                  i,
                                  a,
                                ),
                                t - 1,
                              ),
                              []
                            ),
                          ));
                      },
                      _embind_register_integer: (e, t, n, r, i) => {
                        t = Y(t);
                        let a = (e) => e;
                        if (r === 0) {
                          var o = 32 - 8 * n;
                          ((a = (e) => (e << o) >>> o), (i = a(i)));
                        }
                        Z(e, {
                          name: t,
                          o: a,
                          A: (e, t) => t,
                          L: Zt(t, n, r !== 0),
                          I: null,
                        });
                      },
                      _embind_register_memory_view: (e, t, n) => {
                        function r(e) {
                          return new i(w.buffer, k[(e + 4) >> 2], k[e >> 2]);
                        }
                        var i = [
                          Int8Array,
                          Uint8Array,
                          Int16Array,
                          Uint16Array,
                          Int32Array,
                          Uint32Array,
                          Float32Array,
                          Float64Array,
                        ][t];
                        ((n = Y(n)), Z(e, { name: n, o: r, L: r }, { ic: !0 }));
                      },
                      _embind_register_std_string: (e, t) => {
                        ((t = Y(t)),
                          Z(e, {
                            name: t,
                            o(e) {
                              var t = (t = e + 4) ? U(T, t, k[e >> 2], !0) : ``;
                              return (Cn(e), t);
                            },
                            A(e, t) {
                              t instanceof ArrayBuffer &&
                                (t = new Uint8Array(t));
                              var n = typeof t == `string`;
                              if (!(
                                n ||
                                (ArrayBuffer.isView(t) &&
                                  t.BYTES_PER_ELEMENT == 1)
                              ))
                                throw new q(
                                  `Cannot pass non-string to std::string`,
                                );
                              var r = n ? me(t) : t.length,
                                i = wn(4 + r + 1),
                                a = i + 4;
                              return (
                                (k[i >> 2] = r),
                                n ? he(t, T, a, r + 1) : T.set(t, a),
                                e !== null && e.push(Cn, i),
                                i
                              );
                            },
                            L: ht,
                            I(e) {
                              Cn(e);
                            },
                          }));
                      },
                      _embind_register_std_wstring: (e, t, n) => {
                        if (((n = Y(n)), t === 2))
                          var r = $t,
                            i = en,
                            a = tn;
                        else ((r = nn), (i = rn), (a = an));
                        Z(e, {
                          name: n,
                          o: (e) => {
                            var n = r(e + 4, k[e >> 2] * t, !0);
                            return (Cn(e), n);
                          },
                          A: (e, r) => {
                            if (typeof r != `string`)
                              throw new q(
                                `Cannot pass non-string to C++ string type ${n}`,
                              );
                            var o = a(r),
                              s = wn(4 + o + t);
                            return (
                              (k[s >> 2] = o / t),
                              i(r, s + 4, o + t),
                              e !== null && e.push(Cn, s),
                              s
                            );
                          },
                          L: ht,
                          I(e) {
                            Cn(e);
                          },
                        });
                      },
                      _embind_register_value_object: (e, t, n, r, i, a) => {
                        pt[e] = { name: Y(t), Ya: $(n, r), T: $(i, a), pb: [] };
                      },
                      _embind_register_value_object_field: (
                        e,
                        t,
                        n,
                        r,
                        i,
                        a,
                        o,
                        s,
                        c,
                        l,
                      ) => {
                        pt[e].pb.push({
                          ac: Y(t),
                          hc: n,
                          ec: $(r, i),
                          fc: a,
                          yc: o,
                          xc: $(s, c),
                          zc: l,
                        });
                      },
                      _embind_register_void: (e, t) => {
                        ((t = Y(t)),
                          Z(e, { oc: !0, name: t, o: () => {}, A: () => {} }));
                      },
                      _emscripten_runtime_keepalive_clear: () => {
                        ((oe = !1), (on = 0));
                      },
                      _emscripten_throw_longjmp: () => {
                        throw 1 / 0;
                      },
                      _emval_create_invoker: (e, t, n) => {
                        var [r, ...i] = ln(e, t),
                          a = r.A.bind(r),
                          o = i.map((e) => e.L.bind(e));
                        e--;
                        var s = Array(e);
                        return (
                          (t = `methodCaller<(${i.map((e) => e.name)}) => ${r.name}>`),
                          cn(
                            et(t, (t, r, i, c) => {
                              for (var l = 0, u = 0; u < e; ++u)
                                ((s[u] = o[u](c + l)), (l += 8));
                              switch (n) {
                                case 0:
                                  var d = J(t).apply(null, s);
                                  break;
                                case 2:
                                  d = Reflect.construct(J(t), s);
                                  break;
                                case 3:
                                  d = s[0];
                                  break;
                                case 1:
                                  d = J(t)[dn(r)](...s);
                              }
                              return (
                                (t = []),
                                (d = a(t, d)),
                                t.length && (k[i >> 2] = rt(t)),
                                d
                              );
                            }),
                          )
                        );
                      },
                      _emval_decref: qt,
                      _emval_get_module_property: (e) => (
                        (e = dn(e)),
                        rt(r[e])
                      ),
                      _emval_get_property: (e, t) => (
                        (e = J(e)),
                        (t = J(t)),
                        rt(e[t])
                      ),
                      _emval_incref: (e) => {
                        9 < e && (nt[e + 1] += 1);
                      },
                      _emval_invoke: (e, t, n, r, i) => sn[e](t, n, r, i),
                      _emval_new_array: () => rt([]),
                      _emval_new_cstring: (e) => rt(dn(e)),
                      _emval_new_object: () => rt({}),
                      _emval_run_destructors: (e) => {
                        (mt(J(e)), qt(e));
                      },
                      _emval_set_property: (e, t, n) => {
                        ((e = J(e)), (t = J(t)), (n = J(n)), (e[t] = n));
                      },
                      _gmtime_js: function (e, t, n) {
                        ((e = new Date(
                          1e3 *
                            ((t + 2097152) >>> 0 < 4194305 - !!e
                              ? (e >>> 0) + 4294967296 * t
                              : NaN),
                        )),
                          (O[n >> 2] = e.getUTCSeconds()),
                          (O[(n + 4) >> 2] = e.getUTCMinutes()),
                          (O[(n + 8) >> 2] = e.getUTCHours()),
                          (O[(n + 12) >> 2] = e.getUTCDate()),
                          (O[(n + 16) >> 2] = e.getUTCMonth()),
                          (O[(n + 20) >> 2] = e.getUTCFullYear() - 1900),
                          (O[(n + 24) >> 2] = e.getUTCDay()),
                          (O[(n + 28) >> 2] =
                            ((e.getTime() -
                              Date.UTC(e.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) /
                              864e5) |
                            0));
                      },
                      _localtime_js: function (e, t, n) {
                        ((e = new Date(
                          1e3 *
                            ((t + 2097152) >>> 0 < 4194305 - !!e
                              ? (e >>> 0) + 4294967296 * t
                              : NaN),
                        )),
                          (O[n >> 2] = e.getSeconds()),
                          (O[(n + 4) >> 2] = e.getMinutes()),
                          (O[(n + 8) >> 2] = e.getHours()),
                          (O[(n + 12) >> 2] = e.getDate()),
                          (O[(n + 16) >> 2] = e.getMonth()),
                          (O[(n + 20) >> 2] = e.getFullYear() - 1900),
                          (O[(n + 24) >> 2] = e.getDay()),
                          (t = e.getFullYear()),
                          (O[(n + 28) >> 2] =
                            ((t % 4 != 0 || (t % 100 == 0 && t % 400 != 0)
                              ? pn
                              : fn)[e.getMonth()] +
                              e.getDate() -
                              1) |
                            0),
                          (O[(n + 36) >> 2] = -(60 * e.getTimezoneOffset())),
                          (t = new Date(
                            e.getFullYear(),
                            6,
                            1,
                          ).getTimezoneOffset()));
                        var r = new Date(
                          e.getFullYear(),
                          0,
                          1,
                        ).getTimezoneOffset();
                        O[(n + 32) >> 2] =
                          (t != r && e.getTimezoneOffset() == Math.min(r, t)) |
                          0;
                      },
                      _setitimer_js: (e, t) => (
                        mn[e] && (clearTimeout(mn[e].id), delete mn[e]),
                        t &&
                          (mn[e] = {
                            id: setTimeout(() => {
                              (delete mn[e],
                                _n(() => kn(e, performance.now())));
                            }, t),
                            Yc: t,
                          }),
                        0
                      ),
                      _tzset_js: (e, t, n, r) => {
                        var i = new Date().getFullYear(),
                          a = new Date(i, 0, 1).getTimezoneOffset();
                        ((i = new Date(i, 6, 1).getTimezoneOffset()),
                          (k[e >> 2] = 60 * Math.max(a, i)),
                          (O[t >> 2] = Number(a != i)),
                          (t = (e) => {
                            var t = Math.abs(e);
                            return `UTC${0 <= e ? `-` : `+`}${String(Math.floor(t / 60)).padStart(2, `0`)}${String(t % 60).padStart(2, `0`)}`;
                          }),
                          (e = t(a)),
                          (t = t(i)),
                          i < a
                            ? (he(e, T, n, 17), he(t, T, r, 17))
                            : (he(e, T, r, 17), he(t, T, n, 17)));
                      },
                      clock_time_get: function (e, t, n, r) {
                        return 0 <= e && 3 >= e
                          ? ((e = Math.round(
                              1e6 * (e === 0 ? Date.now() : performance.now()),
                            )),
                            (R = [
                              e >>> 0,
                              ((L = e),
                              1 <= +Math.abs(L)
                                ? 0 < L
                                  ? Math.floor(L / 4294967296) >>> 0
                                  : ~~+Math.ceil(
                                      (L - +(~~L >>> 0)) / 4294967296,
                                    ) >>> 0
                                : 0),
                            ]),
                            (O[r >> 2] = R[0]),
                            (O[(r + 4) >> 2] = R[1]),
                            0)
                          : 28;
                      },
                      emscripten_asm_const_int: (e, t, n) => {
                        vn.length = 0;
                        for (var r; (r = T[t++]);) {
                          var i = r != 105;
                          ((i &= r != 112),
                            (n += i && n % 8 ? 4 : 0),
                            vn.push(
                              r == 112
                                ? k[n >> 2]
                                : r == 105
                                  ? O[n >> 2]
                                  : j[n >> 3],
                            ),
                            (n += i ? 8 : 4));
                        }
                        return Sn[e](...vn);
                      },
                      emscripten_date_now: () => Date.now(),
                      emscripten_get_now: () => performance.now(),
                      emscripten_resize_heap: (e) => {
                        var t = T.length;
                        if (((e >>>= 0), 2147483648 < e)) return !1;
                        for (var n = 1; 4 >= n; n *= 2) {
                          var r = t * (1 + 0.2 / n);
                          r = Math.min(r, e + 100663296);
                          a: {
                            r =
                              ((Math.min(
                                2147483648,
                                65536 * Math.ceil(Math.max(e, r) / 65536),
                              ) -
                                Nn.buffer.byteLength +
                                65535) /
                                65536) |
                              0;
                            try {
                              (Nn.grow(r), N());
                              var i = 1;
                              break a;
                            } catch {}
                            i = void 0;
                          }
                          if (i) return !0;
                        }
                        return !1;
                      },
                      environ_get: (e, t) => {
                        var n = 0,
                          r = 0,
                          i;
                        for (i of bn()) {
                          var a = t + n;
                          ((k[(e + r) >> 2] = a),
                            (n += he(i, T, a, 1 / 0) + 1),
                            (r += 4));
                        }
                        return 0;
                      },
                      environ_sizes_get: (e, t) => {
                        var n = bn();
                        ((k[e >> 2] = n.length), (e = 0));
                        for (var r of n) e += me(r) + 1;
                        return ((k[t >> 2] = e), 0);
                      },
                      fd_close: function (e) {
                        try {
                          var t = Re(e);
                          if (t.ba === null) throw new K(8);
                          t.Ua &&= null;
                          try {
                            t.i.close && t.i.close(t);
                          } catch (e) {
                            throw e;
                          } finally {
                            Ce[t.ba] = null;
                          }
                          return ((t.ba = null), 0);
                        } catch (e) {
                          if (Qe === void 0 || e.name !== `ErrnoError`) throw e;
                          return e.aa;
                        }
                      },
                      fd_read: function (e, t, n, r) {
                        try {
                          a: {
                            var i = Re(e);
                            e = t;
                            for (var a, o = (t = 0); o < n; o++) {
                              var s = k[e >> 2],
                                c = k[(e + 4) >> 2];
                              e += 8;
                              var l = i,
                                u = s,
                                d = c,
                                f = a,
                                p = w;
                              if (0 > d || 0 > f) throw new K(28);
                              if (l.ba === null || (l.flags & 2097155) == 1)
                                throw new K(8);
                              if ((l.node.mode & 61440) == 16384)
                                throw new K(31);
                              if (!l.i.read) throw new K(28);
                              var m = f !== void 0;
                              if (!m) f = l.position;
                              else if (!l.seekable) throw new K(70);
                              var h = l.i.read(l, p, u, d, f);
                              m || (l.position += h);
                              var g = h;
                              if (0 > g) {
                                var _ = -1;
                                break a;
                              }
                              if (((t += g), g < c)) break;
                              a !== void 0 && (a += g);
                            }
                            _ = t;
                          }
                          return ((k[r >> 2] = _), 0);
                        } catch (e) {
                          if (Qe === void 0 || e.name !== `ErrnoError`) throw e;
                          return e.aa;
                        }
                      },
                      fd_seek: function (e, t, n, r, i) {
                        t =
                          (n + 2097152) >>> 0 < 4194305 - !!t
                            ? (t >>> 0) + 4294967296 * n
                            : NaN;
                        try {
                          if (isNaN(t)) return 61;
                          var a = Re(e);
                          return (
                            Xe(a, t, r),
                            (R = [
                              a.position >>> 0,
                              ((L = a.position),
                              1 <= +Math.abs(L)
                                ? 0 < L
                                  ? Math.floor(L / 4294967296) >>> 0
                                  : ~~+Math.ceil(
                                      (L - +(~~L >>> 0)) / 4294967296,
                                    ) >>> 0
                                : 0),
                            ]),
                            (O[i >> 2] = R[0]),
                            (O[(i + 4) >> 2] = R[1]),
                            a.Ua && t === 0 && r === 0 && (a.Ua = null),
                            0
                          );
                        } catch (e) {
                          if (Qe === void 0 || e.name !== `ErrnoError`) throw e;
                          return e.aa;
                        }
                      },
                      fd_write: function (e, t, n, r) {
                        try {
                          a: {
                            var i = Re(e);
                            e = t;
                            for (var a, o = (t = 0); o < n; o++) {
                              var s = k[e >> 2],
                                c = k[(e + 4) >> 2];
                              e += 8;
                              var l = i,
                                u = s,
                                d = c,
                                f = a,
                                p = w;
                              if (0 > d || 0 > f) throw new K(28);
                              if (l.ba === null || !(l.flags & 2097155))
                                throw new K(8);
                              if ((l.node.mode & 61440) == 16384)
                                throw new K(31);
                              if (!l.i.write) throw new K(28);
                              l.seekable && l.flags & 1024 && Xe(l, 0, 2);
                              var m = f !== void 0;
                              if (!m) f = l.position;
                              else if (!l.seekable) throw new K(70);
                              var h = l.i.write(l, p, u, d, f, void 0);
                              m || (l.position += h);
                              var g = h;
                              if (0 > g) {
                                var _ = -1;
                                break a;
                              }
                              if (((t += g), g < c)) break;
                              a !== void 0 && (a += g);
                            }
                            _ = t;
                          }
                          return ((k[r >> 2] = _), 0);
                        } catch (e) {
                          if (Qe === void 0 || e.name !== `ErrnoError`) throw e;
                          return e.aa;
                        }
                      },
                      invoke_vii: In,
                      isWindowsBrowser: function () {
                        return -1 < navigator.platform.indexOf(`Win`);
                      },
                      proc_exit: gn,
                      wasm_start_image_decode: function (e, t, n) {
                        ((t = new Uint8Array(Nn.buffer, t, n)),
                          (n = new Uint8Array(n)),
                          n.set(t),
                          createImageBitmap(new Blob([n]))
                            .then(function (t) {
                              var n = new OffscreenCanvas(
                                t.width,
                                t.height,
                              ).getContext(`2d`);
                              (n.drawImage(t, 0, 0),
                                (n = n.getImageData(0, 0, t.width, t.height)));
                              var i = n.data.length,
                                a = r.Qb(i);
                              (new Uint8Array(Nn.buffer, a, i).set(n.data),
                                r.Ec(e, t.width, t.height, a, i));
                            })
                            .catch(function (t) {
                              t = t.message || `decode failed`;
                              var n = r.Uc(t) + 1,
                                i = r.Qb(n);
                              (r.Xc(t, i, n), r.Fc(e, i), r.Dc(i));
                            }));
                      },
                    };
                  function In(e, t, n) {
                    var r = Mn();
                    try {
                      Pn.get(e)(t, n);
                    } catch (e) {
                      if ((jn(r), e !== e + 0)) throw e;
                      An(1, 0);
                    }
                  }
                  var Ln = await (async function () {
                    function e(e) {
                      return (
                        (e = Ln = e.exports),
                        (Cn = e.free),
                        (wn = e.malloc),
                        (Tn = e.__getTypeName),
                        (r._wasm_image_decode_complete =
                          e.wasm_image_decode_complete),
                        (r._wasm_image_decode_error =
                          e.wasm_image_decode_error),
                        (En = r._ma_device__on_notification_unlocked =
                          e.ma_device__on_notification_unlocked),
                        (r._ma_malloc_emscripten = e.ma_malloc_emscripten),
                        (r._ma_free_emscripten = e.ma_free_emscripten),
                        (Dn =
                          r._ma_device_process_pcm_frames_capture__webaudio =
                            e.ma_device_process_pcm_frames_capture__webaudio),
                        (On =
                          r._ma_device_process_pcm_frames_playback__webaudio =
                            e.ma_device_process_pcm_frames_playback__webaudio),
                        (kn = e._emscripten_timeout),
                        (An = e.setThrew),
                        (jn = e._emscripten_stack_restore),
                        (Mn = e.emscripten_stack_get_current),
                        (Q.iiji = e.dynCall_iiji),
                        (Q.jiji = e.dynCall_jiji),
                        (Q.vij = e.dynCall_vij),
                        (Q.iij = e.dynCall_iij),
                        (Q.ji = e.dynCall_ji),
                        (Q.iiiji = e.dynCall_iiiji),
                        (Q.jii = e.dynCall_jii),
                        (Q.viijii = e.dynCall_viijii),
                        (Q.iiiiij = e.dynCall_iiiiij),
                        (Q.iiiiijj = e.dynCall_iiiiijj),
                        (Q.iiiiiijj = e.dynCall_iiiiiijj),
                        (Nn = e.memory),
                        (Pn = e.__indirect_function_table),
                        N(),
                        Ln
                      );
                    }
                    var t = { env: Fn, wasi_snapshot_preview1: Fn };
                    return r.instantiateWasm
                      ? new Promise((n) => {
                          r.instantiateWasm(t, (t, r) => {
                            n(e(t, r));
                          });
                        })
                      : ((F ??= r.locateFile
                          ? r.locateFile(`canvas_advanced.wasm`, p)
                          : p + `canvas_advanced.wasm`),
                        e((await te(t)).instance));
                  })();
                  return (
                    (function () {
                      function e() {
                        if (((r.calledRun = !0), !y)) {
                          if (((M = !0), !r.noFSInit && !Ee)) {
                            var e, t;
                            ((Ee = !0),
                              (e ??= r.stdin),
                              (t ??= r.stdout),
                              (n ??= r.stderr),
                              e ? Ze(`stdin`, e) : Je(`/dev/tty`, `/dev/stdin`),
                              t
                                ? Ze(`stdout`, null, t)
                                : Je(`/dev/tty`, `/dev/stdout`),
                              n
                                ? Ze(`stderr`, null, n)
                                : Je(`/dev/tty1`, `/dev/stderr`),
                              Ye(`/dev/stdin`, 0),
                              Ye(`/dev/stdout`, 1),
                              Ye(`/dev/stderr`, 1));
                          }
                          if (
                            (Ln.__wasm_call_ctors(),
                            (De = !1),
                            S?.(r),
                            r.onRuntimeInitialized?.(),
                            r.postRun)
                          )
                            for (
                              typeof r.postRun == `function` &&
                              (r.postRun = [r.postRun]);
                              r.postRun.length;
                            ) {
                              var n = r.postRun.shift();
                              re.push(n);
                            }
                          z(re);
                        }
                      }
                      if (r.preRun)
                        for (
                          typeof r.preRun == `function` &&
                          (r.preRun = [r.preRun]);
                          r.preRun.length;
                        )
                          ae();
                      (z(ie),
                        r.setStatus
                          ? (r.setStatus(`Running...`),
                            setTimeout(() => {
                              (setTimeout(() => r.setStatus(``), 1), e());
                            }, 1))
                          : e());
                    })(),
                    (n = M
                      ? r
                      : new Promise((e, t) => {
                          ((S = e), (C = t));
                        })),
                    n
                  );
                };
              })();
            },
            (e) => {
              e.exports = JSON.parse(
                `{"name":"@rive-app/canvas","version":"2.43.1","description":"Rive's canvas based web api.","main":"rive.js","homepage":"https://rive.app","repository":{"type":"git","url":"https://github.com/rive-app/rive-wasm/tree/master/js"},"keywords":["rive","animation"],"author":"Rive","contributors":["Luigi Rosso <luigi@rive.app> (https://rive.app)","Maxwell Talbot <max@rive.app> (https://rive.app)","Arthur Vivian <arthur@rive.app> (https://rive.app)","Umberto Sonnino <umberto@rive.app> (https://rive.app)","Matthew Sullivan <matt.j.sullivan@gmail.com> (mailto:matt.j.sullivan@gmail.com)"],"license":"MIT","files":["rive.js","rive.js.map","rive.wasm","rive_fallback.wasm","rive.d.ts","rive_advanced.mjs.d.ts","runtimeLoader.d.ts","utils","semantics"],"typings":"rive.d.ts","dependencies":{},"browser":{"fs":false,"path":false}}`,
              );
            },
            (e, t, n) => {
              (n.r(t),
                n.d(t, {
                  AccessibilityOverlay: () => i.AccessibilityOverlay,
                  CHECK_STATE_MASK: () => a.CHECK_STATE_MASK,
                  CHECK_STATE_OFFSET: () => a.CHECK_STATE_OFFSET,
                  SemanticActionType: () => a.SemanticActionType,
                  SemanticCheckState: () => a.SemanticCheckState,
                  SemanticMode: () => a.SemanticMode,
                  SemanticRole: () => a.SemanticRole,
                  SemanticState: () => a.SemanticState,
                  SemanticTrait: () => a.SemanticTrait,
                  SemanticTreeModel: () => r.SemanticTreeModel,
                  checkStateOf: () => a.checkStateOf,
                  hasState: () => a.hasState,
                  hasTrait: () => a.hasTrait,
                  roleName: () => a.roleName,
                  stateNames: () => a.stateNames,
                  traitNames: () => a.traitNames,
                }));
              var r = n(7),
                i = n(9),
                a = n(8);
            },
            (e, t, n) => {
              (n.r(t), n.d(t, { SemanticTreeModel: () => a }));
              var r = n(8),
                i = function (e, t, n) {
                  if (n || arguments.length === 2)
                    for (var r = 0, i = t.length, a; r < i; r++)
                      (a || !(r in t)) &&
                        ((a ||= Array.prototype.slice.call(t, 0, r)),
                        (a[r] = t[r]));
                  return e.concat(a || Array.prototype.slice.call(t));
                },
                a = (function () {
                  function e() {
                    ((this._nodesById = new Map()),
                      (this._roots = []),
                      (this._semanticVersion = 0),
                      (this._geometryVersion = 0),
                      (this._geometryChangedIds = new Set()),
                      (this._semanticChangedIds = new Set()),
                      (this._debug = !1));
                  }
                  return (
                    Object.defineProperty(e.prototype, "nodeCount", {
                      get: function () {
                        return this._nodesById.size;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "semanticVersion", {
                      get: function () {
                        return this._semanticVersion;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "geometryVersion", {
                      get: function () {
                        return this._geometryVersion;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "geometryChangedIds", {
                      get: function () {
                        return this._geometryChangedIds;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "semanticChangedIds", {
                      get: function () {
                        return this._semanticChangedIds;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "roots", {
                      get: function () {
                        return this._roots;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    (e.prototype.nodeById = function (e) {
                      return this._nodesById.get(e);
                    }),
                    (e.prototype.siblingIndexOf = function (e) {
                      var t = this._nodesById.get(e);
                      if (!t) return -1;
                      if (t.parentId < 0) return this._roots.indexOf(e);
                      var n = this._nodesById.get(t.parentId);
                      return n ? n.children.indexOf(e) : -1;
                    }),
                    (e.prototype.detach = function (e) {
                      var t = this._nodesById.get(e);
                      if (t)
                        if (t.parentId < 0) {
                          var n = this._roots.indexOf(e);
                          n !== -1 && this._roots.splice(n, 1);
                        } else {
                          var r = this._nodesById.get(t.parentId);
                          if (r) {
                            var n = r.children.indexOf(e);
                            n !== -1 && r.children.splice(n, 1);
                          }
                        }
                    }),
                    (e.prototype.attach = function (e, t, n) {
                      var r = this._nodesById.get(e);
                      if (r)
                        if (t < 0) {
                          r.parentId = -1;
                          var i = o(n, 0, this._roots.length);
                          this._roots.splice(i, 0, e);
                        } else {
                          var a = this._nodesById.get(t);
                          if (!a) ((r.parentId = -1), this._roots.push(e));
                          else {
                            r.parentId = t;
                            var i = o(n, 0, a.children.length);
                            a.children.splice(i, 0, e);
                          }
                        }
                    }),
                    (e.prototype.removeSubtree = function (e) {
                      var t = this._nodesById.get(e);
                      if (t) {
                        for (
                          var n = i([], t.children, !0), r = 0, a = n;
                          r < a.length;
                          r++
                        ) {
                          var o = a[r];
                          this.removeSubtree(o);
                        }
                        (this.detach(e), this._nodesById.delete(e));
                      }
                    }),
                    (e.prototype.applyDiff = function (e) {
                      var t,
                        n,
                        r = this;
                      (this._geometryChangedIds.clear(),
                        this._semanticChangedIds.clear());
                      for (
                        var i = !1,
                          a = !1,
                          o = function () {
                            i = !0;
                          },
                          p = function (e) {
                            ((i = !0), r._semanticChangedIds.add(e));
                          },
                          m = function (e) {
                            ((a = !0), r._geometryChangedIds.add(e));
                          },
                          h = 0,
                          g = e.removed;
                        h < g.length;
                        h++
                      ) {
                        var _ = g[h];
                        this._nodesById.has(_) && (this.removeSubtree(_), o());
                      }
                      for (var v = 0, y = e.added; v < y.length; v++) {
                        var b = y[v],
                          x = this._nodesById.get(b.id);
                        (x
                          ? (l(x, b) && (d(x, b), p(b.id)),
                            u(x, b) && (f(x, b), m(b.id)))
                          : (this._nodesById.set(b.id, c(b)), p(b.id), m(b.id)),
                          this.detach(b.id),
                          this.attach(b.id, b.parentId, b.siblingIndex));
                      }
                      for (var S = 0, C = e.moved; S < C.length; S++) {
                        var b = C[S],
                          x = this._nodesById.get(b.id);
                        if (x) {
                          var w = x.parentId !== b.parentId,
                            T = this.siblingIndexOf(b.id);
                          (u(x, b) && (f(x, b), m(b.id)),
                            this.detach(b.id),
                            this.attach(b.id, b.parentId, b.siblingIndex),
                            (w || this.siblingIndexOf(b.id) !== T) && o());
                        }
                      }
                      for (
                        var E = 0, D = e.childrenUpdated;
                        E < D.length;
                        E++
                      ) {
                        var O = D[E];
                        if (O.parentId < 0) {
                          var k = O.childIds.filter(function (e) {
                            return r._nodesById.has(e);
                          });
                          if (!s(this._roots, k)) {
                            ((this._roots.length = 0),
                              (t = this._roots).push.apply(t, k));
                            for (
                              var A = 0, j = this._roots;
                              A < j.length;
                              A++
                            ) {
                              var _ = j[A],
                                M = this._nodesById.get(_);
                              M && (M.parentId = -1);
                            }
                            o();
                          }
                        } else {
                          var N = this._nodesById.get(O.parentId);
                          if (!N) continue;
                          var k = O.childIds.filter(function (e) {
                            return r._nodesById.has(e);
                          });
                          if (!s(N.children, k)) {
                            ((N.children.length = 0),
                              (n = N.children).push.apply(n, k));
                            for (var P = 0, F = N.children; P < F.length; P++) {
                              var _ = F[P],
                                M = this._nodesById.get(_);
                              M && (M.parentId = O.parentId);
                            }
                            o();
                          }
                        }
                      }
                      for (
                        var I = 0, ee = e.updatedSemantic;
                        I < ee.length;
                        I++
                      ) {
                        var b = ee[I],
                          x = this._nodesById.get(b.id);
                        x && l(x, b) && (d(x, b), p(b.id));
                      }
                      for (
                        var te = 0, L = e.updatedGeometry;
                        te < L.length;
                        te++
                      ) {
                        var b = L[te],
                          x = this._nodesById.get(b.id);
                        x && u(x, b) && (f(x, b), m(b.id));
                      }
                      (!i && !a) ||
                        (i && this._semanticVersion++,
                        a && this._geometryVersion++,
                        this._debug && this.logDiff(e, i, a));
                    }),
                    Object.defineProperty(e.prototype, "debug", {
                      set: function (e) {
                        this._debug = e;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    (e.prototype.logDiff = function (e, t, n) {
                      for (
                        var i = [
                            `[rive:semantics] semantic v${this._semanticVersion}` +
                              (n ? ` geometry v${this._geometryVersion}` : ``) +
                              (t ? `` : ` (geometry-only)`),
                          ],
                          a = 0,
                          o = e.removed;
                        a < o.length;
                        a++
                      ) {
                        var s = o[a];
                        i.push(`  - removed #${s}`);
                      }
                      for (var c = 0, l = e.added; c < l.length; c++) {
                        var u = l[c];
                        i.push(
                          `  + added #${u.id} ${(0, r.roleName)(u.role)}` +
                            (u.label ? ` "${u.label}"` : ``) +
                            ` bounds:(${u.minX.toFixed(1)},${u.minY.toFixed(1)})-(${u.maxX.toFixed(1)},${u.maxY.toFixed(1)}) states=[${(0, r.stateNames)(u.stateFlags)}] traits=[${(0, r.traitNames)(u.traitFlags)}]`,
                        );
                      }
                      for (var d = 0, f = e.moved; d < f.length; d++) {
                        var u = f[d];
                        i.push(
                          `  ~ moved #${u.id} → parent=${u.parentId} idx=${u.siblingIndex} bounds:(${u.minX.toFixed(1)},${u.minY.toFixed(1)})-(${u.maxX.toFixed(1)},${u.maxY.toFixed(1)})`,
                        );
                      }
                      for (
                        var p = 0, m = e.childrenUpdated;
                        p < m.length;
                        p++
                      ) {
                        var h = m[p];
                        i.push(
                          `  ↕ children of ${h.parentId < 0 ? `root` : `#` + h.parentId}: [${h.childIds.join(`, `)}]`,
                        );
                      }
                      for (
                        var g = 0, _ = e.updatedSemantic;
                        g < _.length;
                        g++
                      ) {
                        var u = _[g];
                        i.push(
                          `  ✎ semantic #${u.id} ${(0, r.roleName)(u.role)}` +
                            (u.label ? ` "${u.label}"` : ``) +
                            ` states=[${(0, r.stateNames)(u.stateFlags)}] traits=[${(0, r.traitNames)(u.traitFlags)}]`,
                        );
                      }
                      for (
                        var v = 0, y = e.updatedGeometry;
                        v < y.length;
                        v++
                      ) {
                        var u = y[v];
                        i.push(
                          `  ⊞ geometry #${u.id} (${u.minX.toFixed(1)},${u.minY.toFixed(1)})-(${u.maxX.toFixed(1)},${u.maxY.toFixed(1)})`,
                        );
                      }
                      console.log(
                        i.join(`
`),
                      );
                    }),
                    (e.prototype.flattened = function () {
                      for (
                        var e = this,
                          t = [],
                          n = function (r, i) {
                            var a = e._nodesById.get(r);
                            if (a) {
                              t.push({ depth: i, node: a });
                              for (
                                var o = 0, s = a.children;
                                o < s.length;
                                o++
                              ) {
                                var c = s[o];
                                n(c, i + 1);
                              }
                            }
                          },
                          r = 0,
                          i = this._roots;
                        r < i.length;
                        r++
                      ) {
                        var a = i[r];
                        n(a, 0);
                      }
                      return t;
                    }),
                    e
                  );
                })();
              function o(e, t, n) {
                return e < t ? t : e > n ? n : e;
              }
              function s(e, t) {
                if (e.length !== t.length) return !1;
                for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
                return !0;
              }
              function c(e) {
                return {
                  id: e.id,
                  parentId: -1,
                  role: e.role,
                  label: e.label,
                  value: e.value,
                  hint: e.hint,
                  stateFlags: e.stateFlags,
                  traitFlags: e.traitFlags,
                  headingLevel: e.headingLevel,
                  minX: e.minX,
                  minY: e.minY,
                  maxX: e.maxX,
                  maxY: e.maxY,
                  children: [],
                };
              }
              function l(e, t) {
                return (
                  e.role !== t.role ||
                  e.label !== t.label ||
                  e.value !== t.value ||
                  e.hint !== t.hint ||
                  e.stateFlags !== t.stateFlags ||
                  e.traitFlags !== t.traitFlags ||
                  e.headingLevel !== t.headingLevel
                );
              }
              function u(e, t) {
                return (
                  e.minX !== t.minX ||
                  e.minY !== t.minY ||
                  e.maxX !== t.maxX ||
                  e.maxY !== t.maxY
                );
              }
              function d(e, t) {
                ((e.role = t.role),
                  (e.label = t.label),
                  (e.value = t.value),
                  (e.hint = t.hint),
                  (e.stateFlags = t.stateFlags),
                  (e.traitFlags = t.traitFlags),
                  (e.headingLevel = t.headingLevel));
              }
              function f(e, t) {
                ((e.minX = t.minX),
                  (e.minY = t.minY),
                  (e.maxX = t.maxX),
                  (e.maxY = t.maxY));
              }
            },
            (e, t, n) => {
              (n.r(t),
                n.d(t, {
                  CHECK_STATE_MASK: () => c,
                  CHECK_STATE_OFFSET: () => s,
                  SemanticActionType: () => p,
                  SemanticCheckState: () => o,
                  SemanticMode: () => u,
                  SemanticRole: () => r,
                  SemanticState: () => i,
                  SemanticTrait: () => d,
                  checkStateOf: () => l,
                  hasState: () => a,
                  hasTrait: () => f,
                  roleName: () => S,
                  stateNames: () => C,
                  traitNames: () => w,
                }));
              var r = {
                  none: 0,
                  button: 1,
                  link: 2,
                  checkbox: 3,
                  switchControl: 4,
                  slider: 5,
                  textField: 6,
                  text: 7,
                  image: 8,
                  group: 9,
                  list: 10,
                  listItem: 11,
                  tab: 12,
                  tabList: 13,
                  dialog: 14,
                  alertDialog: 15,
                  radioGroup: 16,
                  radioButton: 17,
                },
                i = {
                  None: 0,
                  Expanded: 1,
                  Selected: 2,
                  Toggled: 16,
                  Required: 32,
                  Disabled: 64,
                  Focused: 128,
                  Hidden: 256,
                  LiveRegion: 512,
                  ReadOnly: 1024,
                  Modal: 2048,
                  Obscured: 4096,
                  Multiline: 8192,
                };
              function a(e, t) {
                return (e & t) !== 0;
              }
              var o = { Unchecked: 0, Checked: 1, Mixed: 2 },
                s = 2,
                c = 3 << s;
              function l(e) {
                var t = (e & c) >> s;
                return t >= o.Mixed ? o.Mixed : t;
              }
              var u = { Disabled: `disabled`, Enabled: `enabled` },
                d = {
                  None: 0,
                  Expandable: 1,
                  Selectable: 2,
                  Checkable: 4,
                  Toggleable: 8,
                  Requirable: 16,
                  Enablable: 32,
                  Focusable: 64,
                };
              function f(e, t) {
                return (e & t) !== 0;
              }
              for (
                var p = { tap: 0, increase: 1, decrease: 2 },
                  m = {},
                  h = 0,
                  g = Object.entries(r);
                h < g.length;
                h++
              ) {
                var _ = g[h],
                  v = _[0],
                  y = _[1];
                m[y] = v;
              }
              var b = Object.entries(i).filter(function (e) {
                  return e[1] !== 0;
                }),
                x = Object.entries(d).filter(function (e) {
                  return e[1] !== 0;
                });
              function S(e) {
                return m[e] ?? `unknown(${e})`;
              }
              function C(e) {
                if (e === 0) return `none`;
                for (var t = [], n = 0, r = b; n < r.length; n++) {
                  var i = r[n],
                    a = i[0];
                  e & i[1] && t.push(a);
                }
                switch (l(e)) {
                  case o.Checked:
                    t.push(`Checked`);
                    break;
                  case o.Mixed:
                    t.push(`Mixed`);
                }
                return t.join(`, `) || `none`;
              }
              function w(e) {
                if (e === 0) return `none`;
                for (var t = [], n = 0, r = x; n < r.length; n++) {
                  var i = r[n],
                    a = i[0];
                  e & i[1] && t.push(a);
                }
                return t.join(`, `) || `none`;
              }
            },
            (e, t, n) => {
              (n.r(t), n.d(t, { AccessibilityOverlay: () => i }));
              var r = n(8),
                i = (function () {
                  function e(e) {
                    var t = this;
                    ((this.elements = new Map()),
                      (this.descElements = new Map()),
                      (this.lastSemanticVersion = -1),
                      (this.lastGeometryVersion = -1),
                      (this.pendingTextGeometry = []),
                      (this.textGeometryKeys = new WeakMap()),
                      (this.lastCanvasPositioning = {
                        width: -1,
                        height: -1,
                        offsetTop: -1,
                        offsetLeft: -1,
                      }),
                      (this._geometryDirty = !0),
                      (this.isUpdating = !1),
                      (this.transformContainer = null),
                      (this._artboardBounds = {
                        minX: 0,
                        minY: 0,
                        maxX: 0,
                        maxY: 0,
                      }),
                      (this.repositionTimer = null),
                      (this.canvasResizeObserver = null),
                      (this.parentResizeObserver = null),
                      (this.positionObserver = null),
                      (this._onWindowResize = function () {
                        return t.scheduleReposition();
                      }),
                      (this.instanceId = e.instanceId),
                      (this.fireAction = e.fireAction),
                      (this.requestFocus = e.requestFocus),
                      (this.clearFocus = e.clearFocus),
                      (this.canvas = e.canvas),
                      (this.semanticsOptions = e.semanticsOptions),
                      (this.allowFocusInterrupt = e.allowFocusInterrupt ?? !1),
                      (this.container = this.createContainer(e.canvas)),
                      this.attachPositionObservers());
                  }
                  return (
                    (e.prototype.getSemanticOverlayContainer = function () {
                      return this.container;
                    }),
                    (e.prototype.attachPositionObservers = function () {
                      var e = this;
                      ((this.canvasResizeObserver = new ResizeObserver(
                        function () {
                          return e.scheduleReposition();
                        },
                      )),
                        this.canvasResizeObserver.observe(this.canvas));
                      var t = this.canvas.parentElement;
                      (t &&
                        ((this.parentResizeObserver = new ResizeObserver(
                          function () {
                            return e.scheduleReposition();
                          },
                        )),
                        this.parentResizeObserver.observe(t)),
                        window.addEventListener(`resize`, this._onWindowResize),
                        this.observePosition());
                    }),
                    (e.prototype.observePosition = function () {
                      var e = this,
                        t;
                      if (!(typeof IntersectionObserver > `u`)) {
                        ((t = this.positionObserver) == null || t.disconnect(),
                          (this.positionObserver = null));
                        var n = this.canvas.getBoundingClientRect();
                        if (!(!n.width || !n.height)) {
                          var r = [
                              n.top,
                              window.innerWidth - n.right,
                              window.innerHeight - n.bottom,
                              n.left,
                            ]
                              .map(function (e) {
                                return `${-Math.round(e)}px`;
                              })
                              .join(` `),
                            i = !1;
                          ((this.positionObserver = new IntersectionObserver(
                            function () {
                              if (!i) {
                                i = !0;
                                return;
                              }
                              e.scheduleReposition();
                            },
                            { threshold: 1, rootMargin: r },
                          )),
                            this.positionObserver.observe(this.canvas));
                        }
                      }
                    }),
                    (e.prototype.scheduleReposition = function () {
                      var e = this;
                      ((this._geometryDirty = !0),
                        this.repositionTimer === null &&
                          (this.repositionTimer = setTimeout(function () {
                            ((e.repositionTimer = null),
                              e.syncContainerGeometry(),
                              e.observePosition());
                          }, 500)));
                    }),
                    (e.prototype.syncContainerGeometry = function () {
                      var e = this.canvas.getBoundingClientRect(),
                        t = this.canvas.offsetTop,
                        n = this.canvas.offsetLeft;
                      (e.width !== this.lastCanvasPositioning.width ||
                        e.height !== this.lastCanvasPositioning.height ||
                        t !== this.lastCanvasPositioning.offsetTop ||
                        n !== this.lastCanvasPositioning.offsetLeft) &&
                        ((this.container.style.top = t + `px`),
                        (this.container.style.left = n + `px`),
                        (this.container.style.width = e.width + `px`),
                        (this.container.style.height = e.height + `px`),
                        (this.container.tabIndex = -1),
                        (this.lastCanvasPositioning.width = e.width),
                        (this.lastCanvasPositioning.height = e.height),
                        (this.lastCanvasPositioning.offsetTop = t),
                        (this.lastCanvasPositioning.offsetLeft = n));
                    }),
                    (e.prototype.createContainer = function (e) {
                      var t = document.createElement(`div`);
                      ((t.id = `rive-a11y-${this.instanceId}`),
                        t.setAttribute(`role`, `region`),
                        t.setAttribute(
                          `aria-label`,
                          this.semanticsOptions?.riveCanvasLabel ??
                            `Rive animation`,
                        ));
                      var n = e.getBoundingClientRect();
                      return (
                        (t.style.cssText = [
                          `position:absolute`,
                          `top:${e.offsetTop}px`,
                          `left:${e.offsetLeft}px`,
                          `width:${n.width}px`,
                          `height:${n.height}px`,
                          `overflow:hidden`,
                          `pointer-events:none`,
                          `opacity:0`,
                        ].join(`;`)),
                        e.insertAdjacentElement(`afterend`, t),
                        t
                      );
                    }),
                    (e.prototype.needsUpdate = function (e) {
                      var t = e.semanticVersion !== this.lastSemanticVersion,
                        n = e.geometryVersion !== this.lastGeometryVersion,
                        r = this._geometryDirty || !this.transformContainer;
                      return !t && !n && !r
                        ? null
                        : {
                            semanticChanged: t,
                            nodeGeometryChanged: n,
                            layoutChanged: r,
                          };
                    }),
                    (e.prototype.update = function (e, t, n, r, i) {
                      var a = i ?? this.needsUpdate(e);
                      (!a &&
                        t &&
                        (a = {
                          semanticChanged: !1,
                          nodeGeometryChanged: !1,
                          layoutChanged: !0,
                        }),
                        a && this.performUpdate(e, t, n, r, a));
                    }),
                    (e.prototype.performUpdate = function (e, t, n, r, i) {
                      var a = i.semanticChanged,
                        o = i.nodeGeometryChanged,
                        s = e.semanticVersion - this.lastSemanticVersion > 1;
                      if (
                        ((this.lastSemanticVersion = e.semanticVersion),
                        (this.lastGeometryVersion = e.geometryVersion),
                        (this.isUpdating = !0),
                        (this._artboardBounds = r),
                        t &&
                          (this.syncContainerGeometry(),
                          this.syncTransformContainer(t, n, r),
                          (this._geometryDirty = !1)),
                        a)
                      ) {
                        var c = this.transformContainer ?? this.container,
                          l = new Set();
                        this.rebuildChildren(c, e.roots, e, 0, 0, l, s);
                        var u = [];
                        this.elements.forEach(function (e, t) {
                          l.has(t) || u.push(t);
                        });
                        for (var d = 0, f = u; d < f.length; d++) {
                          var p = f[d],
                            m = this.elements.get(p);
                          (m && m.parentNode && m.parentNode.removeChild(m),
                            this.elements.delete(p));
                          var h = this.descElements.get(p);
                          (h && h.parentNode && h.parentNode.removeChild(h),
                            this.descElements.delete(p));
                        }
                      } else o && this.updateGeometryForChangedNodes(e);
                      (this.flushTextGeometry(), (this.isUpdating = !1));
                    }),
                    (e.prototype.destroy = function () {
                      var e, t, n;
                      (this.repositionTimer !== null &&
                        (clearTimeout(this.repositionTimer),
                        (this.repositionTimer = null)),
                        window.removeEventListener(
                          `resize`,
                          this._onWindowResize,
                        ),
                        (e = this.canvasResizeObserver) == null ||
                          e.disconnect(),
                        (t = this.parentResizeObserver) == null ||
                          t.disconnect(),
                        (n = this.positionObserver) == null || n.disconnect(),
                        this.container.parentNode &&
                          this.container.parentNode.removeChild(this.container),
                        this.elements.clear(),
                        this.descElements.clear(),
                        (this.pendingTextGeometry.length = 0));
                    }),
                    (e.prototype.rebuildChildren = function (
                      e,
                      t,
                      n,
                      i,
                      a,
                      o,
                      s,
                    ) {
                      for (var c = 0; c < t.length; c++) {
                        var l = t[c],
                          u = n.nodeById(l);
                        if (u) {
                          o.add(l);
                          var d = this.elements.get(l),
                            f = !d;
                          (d ||
                            ((d = this.createElement(u)),
                            this.elements.set(l, d)),
                            (f || s || n.semanticChangedIds.has(l)) &&
                              this.applyAttributes(d, u),
                            this.applyPosition(d, u, i, a));
                          var p = e.children[c];
                          if (
                            (p !== d &&
                              (p ? e.insertBefore(d, p) : e.appendChild(d)),
                            (0, r.hasTrait)(
                              u.traitFlags,
                              r.SemanticTrait.Focusable,
                            ) &&
                              (0, r.hasState)(
                                u.stateFlags,
                                r.SemanticState.Focused,
                              ))
                          ) {
                            var m = document.activeElement,
                              h = m?.closest(`[aria-modal="true"]`),
                              g =
                                !!h &&
                                this.container.contains(h) &&
                                !h.contains(d);
                            m !== d && !g && this.canMoveFocus() && d.focus();
                          }
                          (u.children.length > 0 &&
                            this.rebuildChildren(
                              d,
                              u.children,
                              n,
                              u.minX,
                              u.minY,
                              o,
                              s,
                            ),
                            f && this.autoFocusDialogOnAppear(d, u, n));
                        }
                      }
                    }),
                    (e.prototype.updateGeometryForChangedNodes = function (e) {
                      for (
                        var t = 0, n = Array.from(e.geometryChangedIds);
                        t < n.length;
                        t++
                      ) {
                        var r = n[t],
                          i = e.nodeById(r);
                        if (i) {
                          var a = 0,
                            o = 0,
                            s = this.transformContainer ?? this.container;
                          if (i.parentId >= 0) {
                            var c = e.nodeById(i.parentId);
                            c &&
                              ((a = c.minX),
                              (o = c.minY),
                              (s = this.elements.get(i.parentId) ?? s));
                          }
                          this.updateNodeGeometrySubtree(e, r, a, o, s);
                        }
                      }
                    }),
                    (e.prototype.updateNodeGeometrySubtree = function (
                      e,
                      t,
                      n,
                      r,
                      i,
                    ) {
                      var a = e.nodeById(t);
                      if (a) {
                        var o = this.elements.get(t);
                        if (o) {
                          this.applyPosition(o, a, n, r);
                          for (var s = 0, c = a.children; s < c.length; s++) {
                            var l = c[s];
                            this.updateNodeGeometrySubtree(
                              e,
                              l,
                              a.minX,
                              a.minY,
                              o,
                            );
                          }
                        }
                      }
                    }),
                    (e.prototype.canMoveFocus = function () {
                      var e = document.activeElement;
                      return (
                        e === this.canvas ||
                        this.container.contains(e) ||
                        this.allowFocusInterrupt
                      );
                    }),
                    (e.prototype.autoFocusDialogOnAppear = function (e, t, n) {
                      if (y(t.role, t.stateFlags) && this.canMoveFocus()) {
                        var r = document.activeElement;
                        if (!(r && r !== e && e.contains(r))) {
                          var i = this.routeDefaultFocusTarget(t, n) ?? e;
                          (i.hasAttribute(`tabindex`) ||
                            i.setAttribute(`tabindex`, `-1`),
                            document.activeElement !== i &&
                              i.focus({ preventScroll: !0 }));
                        }
                      }
                    }),
                    (e.prototype.routeDefaultFocusTarget = function (e, t) {
                      for (var n = 0, r = e.children; n < r.length; n++) {
                        var i = r[n],
                          a = t.nodeById(i);
                        if (a) {
                          var o = this.elements.get(i);
                          if (o && b(a)) return o;
                          if (a.children.length > 0 || !a.label) {
                            var s = this.routeDefaultFocusTarget(a, t);
                            if (s) return s;
                            continue;
                          }
                          if (o) return o.querySelector(`:scope > span`) ?? o;
                        }
                      }
                      return null;
                    }),
                    Object.defineProperty(e.prototype, "nodeIdPrefix", {
                      get: function () {
                        return `rive-${this.instanceId}-sem-`;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    (e.prototype.nodeIdFromElement = function (e) {
                      if (!e.id.startsWith(this.nodeIdPrefix)) return null;
                      var t = e.id.slice(this.nodeIdPrefix.length);
                      if (!t) return null;
                      var n = Number(t);
                      return Number.isNaN(n) ? null : n;
                    }),
                    (e.prototype.createElement = function (e) {
                      var t = x(e.role),
                        n = document.createElement(t);
                      if (
                        ((n.id = `${this.nodeIdPrefix}${e.id}`),
                        (n.style.cssText = f),
                        e.role === r.SemanticRole.text)
                      ) {
                        var i = document.createElement(`span`);
                        ((i.style.cssText = p), n.appendChild(i));
                      }
                      return (this.attachActionHandlers(n, e), n);
                    }),
                    (e.prototype.attachRovingNav = function (e, t) {
                      var n = this;
                      e.addEventListener(`keydown`, function (i) {
                        var a = null;
                        if (
                          (i.key === `ArrowRight` || i.key === `ArrowDown`
                            ? (a = `next`)
                            : i.key === `ArrowLeft` || i.key === `ArrowUp`
                              ? (a = `prev`)
                              : t.includeHomeEnd && i.key === `Home`
                                ? (a = `first`)
                                : t.includeHomeEnd &&
                                  i.key === `End` &&
                                  (a = `last`),
                          a)
                        ) {
                          i.preventDefault();
                          var o = t.members(),
                            s = o.indexOf(e);
                          if (!(s < 0)) {
                            var c = o.length,
                              l =
                                a === `next`
                                  ? o[(s + 1) % c]
                                  : a === `prev`
                                    ? o[(s - 1 + c) % c]
                                    : a === `first`
                                      ? o[0]
                                      : o[c - 1];
                            if (l && l !== e) {
                              l.focus();
                              var u = n.nodeIdFromElement(l);
                              u !== null &&
                                n.fireAction(u, r.SemanticActionType.tap);
                            }
                          }
                        }
                      });
                    }),
                    (e.prototype.attachActionHandlers = function (e, t) {
                      var n = this,
                        i = t.role,
                        a = t.id;
                      if (_(i)) {
                        e.addEventListener(`click`, function () {
                          n.fireAction(a, r.SemanticActionType.tap);
                        });
                        var o =
                          i === r.SemanticRole.link
                            ? [`Enter`]
                            : [`Enter`, ` `];
                        e.addEventListener(`keydown`, function (e) {
                          o.includes(e.key) &&
                            (e.preventDefault(),
                            n.fireAction(a, r.SemanticActionType.tap));
                        });
                      }
                      (i === r.SemanticRole.slider &&
                        e.addEventListener(`keydown`, function (e) {
                          e.key === `ArrowRight` || e.key === `ArrowUp`
                            ? (e.preventDefault(),
                              n.fireAction(a, r.SemanticActionType.increase))
                            : (e.key === `ArrowLeft` ||
                                e.key === `ArrowDown`) &&
                              (e.preventDefault(),
                              n.fireAction(a, r.SemanticActionType.decrease));
                        }),
                        i === r.SemanticRole.tab &&
                          this.attachRovingNav(e, {
                            includeHomeEnd: !0,
                            members: function () {
                              var t = e.parentElement;
                              return t
                                ? Array.from(t.children).filter(function (e) {
                                    return (
                                      e instanceof HTMLElement &&
                                      e.getAttribute(`role`) === `tab`
                                    );
                                  })
                                : [];
                            },
                          }),
                        i === r.SemanticRole.radioButton &&
                          this.attachRovingNav(e, {
                            includeHomeEnd: !1,
                            members: function () {
                              var t =
                                e.closest(`[role="radiogroup"]`) ??
                                e.parentElement;
                              return t
                                ? Array.from(
                                    t.querySelectorAll(`[role="radio"]`),
                                  )
                                : [];
                            },
                          }),
                        (0, r.hasTrait)(
                          t.traitFlags,
                          r.SemanticTrait.Focusable,
                        ) &&
                          e.addEventListener(`focus`, function () {
                            n.requestFocus(a);
                          }));
                    }),
                    (e.prototype.applyAttributes = function (e, t) {
                      var n = t.role,
                        i = t.stateFlags,
                        f = t.traitFlags,
                        p = S(n);
                      if (
                        (p ? m(e, `role`, p) : h(e, `role`),
                        n === r.SemanticRole.link && m(e, `role`, `link`),
                        v(n) ||
                        (0, r.hasTrait)(f, r.SemanticTrait.Focusable) ||
                        n === r.SemanticRole.listItem
                          ? m(e, `tabindex`, `-1`)
                          : h(e, `tabindex`),
                        t.label
                          ? m(e, `aria-label`, t.label)
                          : h(e, `aria-label`),
                        n === r.SemanticRole.slider)
                      ) {
                        if (t.value) {
                          var _ = parseFloat(t.value);
                          (Number.isFinite(_)
                            ? m(e, `aria-valuenow`, String(_))
                            : h(e, `aria-valuenow`),
                            m(e, `aria-valuetext`, t.value));
                        } else (h(e, `aria-valuenow`), h(e, `aria-valuetext`));
                        (m(e, `aria-orientation`, `horizontal`),
                          g(
                            e,
                            `aria-readonly`,
                            (0, r.hasState)(i, r.SemanticState.ReadOnly),
                          ));
                      } else
                        (h(e, `aria-valuenow`),
                          h(e, `aria-valuetext`),
                          h(e, `aria-orientation`),
                          h(e, `aria-readonly`));
                      if (t.hint) {
                        var b = `rive-${this.instanceId}-desc-${t.id}`,
                          x = this.descElements.get(t.id);
                        (x ||
                          ((x = document.createElement(`span`)),
                          (x.id = b),
                          (x.style.cssText = d),
                          this.container.appendChild(x),
                          this.descElements.set(t.id, x)),
                          x.textContent !== t.hint && (x.textContent = t.hint),
                          m(e, `aria-describedby`, b));
                      } else {
                        h(e, `aria-describedby`);
                        var C = this.descElements.get(t.id);
                        C &&
                          (C.parentNode && C.parentNode.removeChild(C),
                          this.descElements.delete(t.id));
                      }
                      if (n === r.SemanticRole.text) {
                        var w = e.querySelector(`:scope > span`) ?? e,
                          T = t.label ?? ``;
                        (w.textContent !== T && (w.textContent = T),
                          h(e, `aria-label`),
                          t.headingLevel > 0
                            ? (m(e, `role`, `heading`),
                              m(e, `aria-level`, String(t.headingLevel)))
                            : h(e, `aria-level`));
                      }
                      if (
                        ((0, r.hasTrait)(f, r.SemanticTrait.Expandable) &&
                        a.has(n)
                          ? g(
                              e,
                              `aria-expanded`,
                              (0, r.hasState)(i, r.SemanticState.Expanded),
                            )
                          : h(e, `aria-expanded`),
                        n === r.SemanticRole.tab ||
                        ((0, r.hasTrait)(f, r.SemanticTrait.Selectable) &&
                          o.has(n))
                          ? g(
                              e,
                              `aria-selected`,
                              (0, r.hasState)(i, r.SemanticState.Selected),
                            )
                          : h(e, `aria-selected`),
                        (0, r.hasTrait)(f, r.SemanticTrait.Checkable) &&
                          s.has(n))
                      ) {
                        var E = (0, r.checkStateOf)(i);
                        E === r.SemanticCheckState.Mixed && c.has(n)
                          ? m(e, `aria-checked`, `mixed`)
                          : g(
                              e,
                              `aria-checked`,
                              E === r.SemanticCheckState.Checked,
                            );
                      } else h(e, `aria-checked`);
                      ((0, r.hasTrait)(f, r.SemanticTrait.Toggleable)
                        ? (l.has(n)
                            ? g(
                                e,
                                `aria-pressed`,
                                (0, r.hasState)(i, r.SemanticState.Toggled),
                              )
                            : h(e, `aria-pressed`),
                          n === r.SemanticRole.switchControl &&
                            g(
                              e,
                              `aria-checked`,
                              (0, r.hasState)(i, r.SemanticState.Toggled),
                            ))
                        : h(e, `aria-pressed`),
                        (0, r.hasTrait)(f, r.SemanticTrait.Requirable) &&
                        u.has(n)
                          ? g(
                              e,
                              `aria-required`,
                              (0, r.hasState)(i, r.SemanticState.Required),
                            )
                          : h(e, `aria-required`),
                        (0, r.hasTrait)(f, r.SemanticTrait.Enablable)
                          ? g(
                              e,
                              `aria-disabled`,
                              (0, r.hasState)(i, r.SemanticState.Disabled),
                            )
                          : h(e, `aria-disabled`));
                      var D = n === r.SemanticRole.image && !t.label;
                      if (
                        ((0, r.hasState)(i, r.SemanticState.Hidden) ||
                        (0, r.hasState)(i, r.SemanticState.Obscured) ||
                        D
                          ? m(e, `aria-hidden`, `true`)
                          : h(e, `aria-hidden`),
                        (0, r.hasState)(i, r.SemanticState.LiveRegion)
                          ? m(e, `aria-live`, `polite`)
                          : h(e, `aria-live`),
                        n === r.SemanticRole.textField)
                      ) {
                        if (
                          (g(
                            e,
                            `aria-readonly`,
                            (0, r.hasState)(i, r.SemanticState.ReadOnly),
                          ),
                          g(
                            e,
                            `aria-multiline`,
                            (0, r.hasState)(i, r.SemanticState.Multiline),
                          ),
                          t.children.length === 0)
                        ) {
                          var O = t.value ?? ``;
                          e.textContent !== O && (e.textContent = O);
                        }
                      } else h(e, `aria-multiline`);
                      y(n, i) ? m(e, `aria-modal`, `true`) : h(e, `aria-modal`);
                    }),
                    (e.prototype.applyPosition = function (e, t, n, i) {
                      var a = this._artboardBounds,
                        o = Math.max(t.minX, a.minX),
                        s = Math.max(t.minY, a.minY),
                        c = Math.min(t.maxX, a.maxX),
                        l = Math.min(t.maxY, a.maxY),
                        u = o - n,
                        d = s - i,
                        f = Math.max(0, c - o),
                        p = Math.max(0, l - s),
                        m = Math.round(u),
                        h = Math.round(d),
                        g = Math.round(f) + `px`,
                        _ = Math.round(p) + `px`,
                        v = m + `px`,
                        y = h + `px`;
                      (e.style.left !== v && (e.style.left = v),
                        e.style.top !== y && (e.style.top = y),
                        e.style.width !== g && (e.style.width = g),
                        e.style.height !== _ && (e.style.height = _),
                        e.style.transform && (e.style.transform = ``),
                        t.role === r.SemanticRole.text &&
                          this.pendingTextGeometry.push(e));
                    }),
                    (e.prototype.flushTextGeometry = function () {
                      if (this.pendingTextGeometry.length !== 0) {
                        for (
                          var e = [], t = 0, n = this.pendingTextGeometry;
                          t < n.length;
                          t++
                        ) {
                          var r = n[t],
                            i = r.querySelector(`:scope > span`) ?? r,
                            a = `${r.style.width}|${r.style.height}|${i.textContent}`;
                          this.textGeometryKeys.get(r) !== a &&
                            ((i.style.width = `auto`),
                            (i.style.height = `auto`),
                            (i.style.transformOrigin = `0 0`),
                            (i.style.transform = ``),
                            e.push({ host: r, span: i, key: a }));
                        }
                        this.pendingTextGeometry.length = 0;
                        for (
                          var o = e.map(function (e) {
                              var t = e.host,
                                n = e.span,
                                r = t.getBoundingClientRect(),
                                i = n.getBoundingClientRect();
                              return i.width > 0 && i.height > 0
                                ? `scale(${r.width / i.width}, ${r.height / i.height})`
                                : `none`;
                            }),
                            s = 0;
                          s < e.length;
                          s++
                        ) {
                          var c = e[s],
                            r = c.host,
                            i = c.span,
                            a = c.key;
                          ((i.style.transform = o[s]),
                            this.textGeometryKeys.set(r, a));
                        }
                      }
                    }),
                    (e.prototype.syncTransformContainer = function (e, t, n) {
                      if (!this.transformContainer) {
                        var r = document.createElement(`div`);
                        ((r.style.cssText = [
                          `position:absolute`,
                          `top:0`,
                          `left:0`,
                          `overflow:visible`,
                          `pointer-events:none`,
                          `transform-origin:0 0`,
                        ].join(`;`)),
                          this.container.appendChild(r),
                          (this.transformContainer = r));
                      }
                      var i = n.maxX - n.minX,
                        a = n.maxY - n.minY;
                      ((this.transformContainer.style.width =
                        Math.round(i) + `px`),
                        (this.transformContainer.style.height =
                          Math.round(a) + `px`));
                      var o = 1 / (t || 1),
                        s = e.xx * o,
                        c = e.xy * o,
                        l = e.yx * o,
                        u = e.yy * o,
                        d = e.tx * o,
                        f = e.ty * o;
                      this.transformContainer.style.transform = `matrix(${s},${c},${l},${u},${d},${f})`;
                    }),
                    e
                  );
                })(),
                a = new Set([
                  r.SemanticRole.button,
                  r.SemanticRole.link,
                  r.SemanticRole.checkbox,
                  r.SemanticRole.switchControl,
                  r.SemanticRole.tab,
                ]),
                o = new Set([r.SemanticRole.tab]),
                s = new Set([
                  r.SemanticRole.checkbox,
                  r.SemanticRole.radioButton,
                  r.SemanticRole.switchControl,
                ]),
                c = new Set([r.SemanticRole.checkbox]),
                l = new Set([r.SemanticRole.button]),
                u = new Set([
                  r.SemanticRole.checkbox,
                  r.SemanticRole.textField,
                  r.SemanticRole.radioGroup,
                ]),
                d = [
                  `position:absolute`,
                  `width:1px`,
                  `height:1px`,
                  `overflow:hidden`,
                  `pointer-events:none`,
                  `left:-9999px`,
                ].join(`;`),
                f = [
                  `position:absolute`,
                  `pointer-events:none`,
                  `box-sizing:border-box`,
                  `overflow:visible`,
                  `margin:0`,
                  `padding:0`,
                  `transform-origin: 0px 0px 0px`,
                  `border:none`,
                  `background:transparent`,
                  `color:transparent`,
                ].join(`;`),
                p = [
                  `display:inline-block`,
                  `white-space:nowrap`,
                  `pointer-events:none`,
                ].join(`;`);
              function m(e, t, n) {
                e.getAttribute(t) !== n && e.setAttribute(t, n);
              }
              function h(e, t) {
                e.hasAttribute(t) && e.removeAttribute(t);
              }
              function g(e, t, n) {
                m(e, t, n ? `true` : `false`);
              }
              function _(e) {
                switch (e) {
                  case r.SemanticRole.button:
                  case r.SemanticRole.link:
                  case r.SemanticRole.checkbox:
                  case r.SemanticRole.switchControl:
                  case r.SemanticRole.tab:
                  case r.SemanticRole.radioButton:
                    return !0;
                  default:
                    return !1;
                }
              }
              function v(e) {
                switch (e) {
                  case r.SemanticRole.button:
                  case r.SemanticRole.link:
                  case r.SemanticRole.checkbox:
                  case r.SemanticRole.switchControl:
                  case r.SemanticRole.slider:
                  case r.SemanticRole.tab:
                  case r.SemanticRole.radioButton:
                  case r.SemanticRole.textField:
                    return !0;
                  default:
                    return !1;
                }
              }
              function y(e, t) {
                return (
                  e === r.SemanticRole.alertDialog ||
                  (e === r.SemanticRole.dialog &&
                    (0, r.hasState)(t, r.SemanticState.Modal))
                );
              }
              function b(e) {
                return (
                  v(e.role) ||
                  (0, r.hasTrait)(e.traitFlags, r.SemanticTrait.Focusable)
                );
              }
              function x(e) {
                switch (e) {
                  case r.SemanticRole.link:
                    return `a`;
                  case r.SemanticRole.text:
                    return `div`;
                  default:
                    return `div`;
                }
              }
              function S(e) {
                switch (e) {
                  case r.SemanticRole.none:
                    return `group`;
                  case r.SemanticRole.button:
                    return `button`;
                  case r.SemanticRole.link:
                    return null;
                  case r.SemanticRole.checkbox:
                    return `checkbox`;
                  case r.SemanticRole.switchControl:
                    return `switch`;
                  case r.SemanticRole.slider:
                    return `slider`;
                  case r.SemanticRole.textField:
                    return `textbox`;
                  case r.SemanticRole.image:
                    return `img`;
                  case r.SemanticRole.group:
                    return `group`;
                  case r.SemanticRole.list:
                    return `list`;
                  case r.SemanticRole.listItem:
                    return `listitem`;
                  case r.SemanticRole.tab:
                    return `tab`;
                  case r.SemanticRole.tabList:
                    return `tablist`;
                  case r.SemanticRole.dialog:
                    return `dialog`;
                  case r.SemanticRole.alertDialog:
                    return `alertdialog`;
                  case r.SemanticRole.radioGroup:
                    return `radiogroup`;
                  case r.SemanticRole.radioButton:
                    return `radio`;
                  case r.SemanticRole.text:
                    return null;
                  default:
                    return null;
                }
              }
            },
            (e, t, n) => {
              (n.r(t),
                n.d(t, {
                  AudioAssetWrapper: () => o.AudioAssetWrapper,
                  AudioWrapper: () => o.AudioWrapper,
                  BLANK_URL: () => a.BLANK_URL,
                  CustomFileAssetLoaderWrapper: () =>
                    o.CustomFileAssetLoaderWrapper,
                  FileAssetWrapper: () => o.FileAssetWrapper,
                  FileFinalizer: () => o.FileFinalizer,
                  FocusSessionState: () => i.FocusSessionState,
                  FontAssetWrapper: () => o.FontAssetWrapper,
                  FontWrapper: () => o.FontWrapper,
                  ImageAssetWrapper: () => o.ImageAssetWrapper,
                  ImageWrapper: () => o.ImageWrapper,
                  KeyboardInteractions: () => i.KeyboardInteractions,
                  RiveFont: () => s.RiveFont,
                  createFinalization: () => o.createFinalization,
                  finalizationRegistry: () => o.finalizationRegistry,
                  registerTouchInteractions: () => r.registerTouchInteractions,
                  sanitizeUrl: () => a.sanitizeUrl,
                }));
              var r = n(11),
                i = n(12),
                a = n(13),
                o = n(14),
                s = n(15);
            },
            (e, t, n) => {
              (n.r(t), n.d(t, { registerTouchInteractions: () => o }));
              var r = void 0,
                i = function (e, t, n) {
                  var r = [];
                  if (t)
                    for (var i = 0; i < e.length; i++) {
                      var a = e[i];
                      r.push({
                        clientX: a.clientX,
                        clientY: a.clientY,
                        identifier: a.identifier,
                      });
                    }
                  else {
                    var o =
                      n === null
                        ? e[0]
                        : (Array.from(e).find(function (e) {
                            return e.identifier === n;
                          }) ?? null);
                    o &&
                      r.push({
                        clientX: o.clientX,
                        clientY: o.clientY,
                        identifier: o.identifier,
                      });
                  }
                  return r;
                },
                a = function (e, t, n, r) {
                  var a = e;
                  return a.changedTouches?.length
                    ? (!t &&
                        [`touchstart`, `touchmove`].includes(e.type) &&
                        e.preventDefault(),
                      i(a.changedTouches, n, r))
                    : [
                        {
                          clientX: e.clientX,
                          clientY: e.clientY,
                          identifier: 0,
                        },
                      ];
                },
                o = function (e) {
                  var t = e.canvas,
                    n = e.artboard,
                    i = e.stateMachines,
                    o = i === void 0 ? [] : i,
                    s = e.renderer,
                    c = e.rive,
                    l = e.fit,
                    u = e.alignment,
                    d = e.isTouchScrollEnabled,
                    f = d !== void 0 && d,
                    p = e.dispatchPointerExit,
                    m = p === void 0 || p,
                    h = e.enableMultiTouch,
                    g = h !== void 0 && h,
                    _ = e.layoutScaleFactor,
                    v = _ === void 0 ? 1 : _,
                    y = e.advanceAndDrain;
                  if (!t || !o.length || !s || !c || !n || typeof window > `u`)
                    return null;
                  var b = null,
                    x = !1,
                    S = null,
                    C = function (e) {
                      if (x && e instanceof MouseEvent) {
                        e.type == `mouseup` && (x = !1);
                        return;
                      }
                      ((x = f && e.type === `touchend` && b === `touchstart`),
                        (b = e.type));
                      var t = e.currentTarget.getBoundingClientRect();
                      if (!g && e.type === `touchstart` && S === null) {
                        var r = e.changedTouches?.[0];
                        r && (S = r.identifier);
                      }
                      var i = a(e, f, g, g ? null : S),
                        s = c.computeAlignment(
                          l,
                          u,
                          { minX: 0, minY: 0, maxX: t.width, maxY: t.height },
                          n.bounds,
                          v,
                        ),
                        d = new c.Mat2D();
                      switch (
                        (s.invert(d),
                        i.forEach(function (e) {
                          var n = e.clientX,
                            r = e.clientY;
                          if (!(!n && !r)) {
                            var i = n - t.left,
                              a = r - t.top,
                              o = new c.Vec2D(i, a),
                              s = c.mapXY(d, o),
                              l = s.x(),
                              u = s.y();
                            ((e.transformedX = l),
                              (e.transformedY = u),
                              s.delete(),
                              o.delete());
                          }
                        }),
                        d.delete(),
                        s.delete(),
                        e.type)
                      ) {
                        case `mouseout`:
                          for (
                            var p = function (e) {
                                m
                                  ? i.forEach(function (t) {
                                      e.pointerExit(
                                        t.transformedX,
                                        t.transformedY,
                                        t.identifier,
                                      );
                                    })
                                  : i.forEach(function (t) {
                                      e.pointerMove(
                                        t.transformedX,
                                        t.transformedY,
                                        t.identifier,
                                      );
                                    });
                              },
                              h = 0,
                              _ = o;
                            h < _.length;
                            h++
                          ) {
                            var C = _[h];
                            p(C);
                          }
                          break;
                        case `touchmove`:
                        case `mouseover`:
                        case `mousemove`:
                          for (
                            var w = function (e) {
                                i.forEach(function (t) {
                                  e.pointerMove(
                                    t.transformedX,
                                    t.transformedY,
                                    t.identifier,
                                  );
                                });
                              },
                              T = 0,
                              E = o;
                            T < E.length;
                            T++
                          ) {
                            var C = E[T];
                            w(C);
                          }
                          break;
                        case `touchstart`:
                        case `mousedown`:
                          for (
                            var D = function (e) {
                                i.forEach(function (t) {
                                  e.pointerDown(
                                    t.transformedX,
                                    t.transformedY,
                                    t.identifier,
                                  );
                                });
                              },
                              O = 0,
                              k = o;
                            O < k.length;
                            O++
                          ) {
                            var C = k[O];
                            D(C);
                          }
                          y(0);
                          break;
                        case `touchend`:
                          for (
                            var A = function (e) {
                                i.forEach(function (t) {
                                  (e.pointerUp(
                                    t.transformedX,
                                    t.transformedY,
                                    t.identifier,
                                  ),
                                    e.pointerExit(
                                      t.transformedX,
                                      t.transformedY,
                                      t.identifier,
                                    ));
                                });
                              },
                              j = 0,
                              M = o;
                            j < M.length;
                            j++
                          ) {
                            var C = M[j];
                            A(C);
                          }
                          (y(0),
                            !g &&
                              i.some(function (e) {
                                return e.identifier === S;
                              }) &&
                              (S = null));
                          break;
                        case `mouseup`:
                          for (
                            var N = function (e) {
                                i.forEach(function (t) {
                                  e.pointerUp(
                                    t.transformedX,
                                    t.transformedY,
                                    t.identifier,
                                  );
                                });
                              },
                              P = 0,
                              F = o;
                            P < F.length;
                            P++
                          ) {
                            var C = F[P];
                            N(C);
                          }
                          y(0);
                      }
                    },
                    w = function () {
                      S = null;
                    },
                    T = C.bind(r);
                  return (
                    t.addEventListener(`mouseover`, T),
                    t.addEventListener(`mouseout`, T),
                    t.addEventListener(`mousemove`, T),
                    t.addEventListener(`mousedown`, T),
                    t.addEventListener(`mouseup`, T),
                    t.addEventListener(`touchmove`, T, { passive: f }),
                    t.addEventListener(`touchstart`, T, { passive: f }),
                    t.addEventListener(`touchend`, T),
                    t.addEventListener(`touchcancel`, w),
                    function () {
                      (t.removeEventListener(`mouseover`, T),
                        t.removeEventListener(`mouseout`, T),
                        t.removeEventListener(`mousemove`, T),
                        t.removeEventListener(`mousedown`, T),
                        t.removeEventListener(`mouseup`, T),
                        t.removeEventListener(`touchmove`, T),
                        t.removeEventListener(`touchstart`, T),
                        t.removeEventListener(`touchend`, T),
                        t.removeEventListener(`touchcancel`, w));
                    }
                  );
                };
            },
            (e, t, n) => {
              (n.r(t),
                n.d(t, {
                  FocusSessionState: () => r,
                  KeyboardInteractions: () => i,
                }));
              var r;
              (function (e) {
                ((e.NotFocused = `notFocused`),
                  (e.EntryPending = `entryPending`),
                  (e.RiveFocused = `riveFocused`));
              })((r ||= {}));
              var i = (function () {
                function e(e) {
                  var t = e.canvas,
                    n = e.stateMachine,
                    i = e.hasFocusNodes,
                    a = e.getOverlayElement,
                    o = this;
                  ((this.focusSessionState = r.NotFocused),
                    (this.canvasHasFocus = !1),
                    (this.focusDomainReleased = !1),
                    (this.currentOverlayElement = null),
                    (this.onCanvasFocus = function (e) {
                      (o.syncOverlayListener(),
                        (o.canvasHasFocus = !0),
                        (o.focusDomainReleased = !1),
                        o.hasFocusNodes &&
                          (o.mainSm.focusState().hasFocus ||
                            ((o.focusSessionState = r.EntryPending),
                            o.isKeyboardDrivenFocus() &&
                              (o.cameFromBeforeCanvas(e.relatedTarget)
                                ? o.mainSm.focusNext()
                                : o.mainSm.focusPrevious()) &&
                              (o.focusSessionState = r.RiveFocused))));
                    }),
                    (this.onCanvasBlur = function (e) {
                      ((o.focusSessionState = r.NotFocused),
                        (o.canvasHasFocus = !1));
                      var t = o.isInFocusDomain(e.relatedTarget),
                        n = e.relatedTarget === null && !document.hasFocus();
                      t || n || o.mainSm.clearFocus();
                    }),
                    (this.onOverlayFocusIn = function (e) {
                      o.isInOverlay(e.target) &&
                        ((o.focusDomainReleased = !1),
                        o.hasFocusNodes &&
                          o.focusSessionState === r.NotFocused &&
                          (o.focusSessionState = o.mainSm.focusState().hasFocus
                            ? r.RiveFocused
                            : r.EntryPending));
                    }),
                    (this.onFocusDomainHostFocusIn = function (e) {
                      (o.syncOverlayListener(), o.onOverlayFocusIn(e));
                    }),
                    (this.onKeyDown = function (e) {
                      if (
                        (o.syncOverlayListener(),
                        !o.focusDomainReleased &&
                          o.shouldRiveHandleKeyEvent(e) &&
                          e.code === `Tab` &&
                          o.hasFocusNodes)
                      ) {
                        var t = e.shiftKey
                            ? o.mainSm.focusPrevious()
                            : o.mainSm.focusNext(),
                          n = o.mainSm.focusState();
                        (t || n.hasFocus
                          ? ((o.focusSessionState = r.RiveFocused),
                            e.preventDefault())
                          : ((o.focusSessionState = r.NotFocused),
                            (o.focusDomainReleased = !0),
                            (o.canvasHasFocus = !1)),
                          o.syncOverlayListener());
                      }
                    }),
                    (this.canvas = t),
                    (this.mainSm = n),
                    (this.hasFocusNodes = i),
                    (this.getOverlayElement = a),
                    (this.focusDomainHost = t.parentElement ?? document),
                    t.addEventListener(`focus`, this.onCanvasFocus),
                    t.addEventListener(`blur`, this.onCanvasBlur),
                    t.addEventListener(`keydown`, this.onKeyDown),
                    this.focusDomainHost.addEventListener(
                      `focusin`,
                      this.onFocusDomainHostFocusIn,
                    ),
                    this.syncOverlayListener());
                }
                return (
                  (e.prototype.setFocusSessionState = function (e) {
                    this.focusSessionState = e;
                  }),
                  (e.prototype.notifyRiveFocused = function () {
                    this.focusSessionState = r.RiveFocused;
                  }),
                  (e.prototype.shouldRiveHandleKeyEvent = function (e) {
                    if (this.focusSessionState === r.NotFocused) return !1;
                    var t =
                        this.isInFocusDomain(document.activeElement) ||
                        this.isInOverlay(e.target),
                      n = e.target === this.canvas;
                    return t || this.canvasHasFocus || n;
                  }),
                  (e.prototype.isInFocusDomain = function (e) {
                    return e === this.canvas || this.isInOverlay(e);
                  }),
                  (e.prototype.isInOverlay = function (e) {
                    return e instanceof Node
                      ? (this.getOverlayElement?.call(this)?.contains(e) ?? !1)
                      : !1;
                  }),
                  (e.prototype.syncOverlayListener = function () {
                    var e,
                      t,
                      n,
                      r,
                      i = this.getOverlayElement?.call(this) ?? null;
                    i !== this.currentOverlayElement &&
                      ((e = this.currentOverlayElement) == null ||
                        e.removeEventListener(`focusin`, this.onOverlayFocusIn),
                      (t = this.currentOverlayElement) == null ||
                        t.removeEventListener(`keydown`, this.onKeyDown, !0),
                      (this.currentOverlayElement = i),
                      (n = this.currentOverlayElement) == null ||
                        n.addEventListener(`focusin`, this.onOverlayFocusIn),
                      (r = this.currentOverlayElement) == null ||
                        r.addEventListener(`keydown`, this.onKeyDown, !0));
                  }),
                  (e.prototype.isKeyboardDrivenFocus = function () {
                    try {
                      return this.canvas.matches(`:focus-visible`);
                    } catch {
                      return !1;
                    }
                  }),
                  (e.prototype.cameFromBeforeCanvas = function (e) {
                    if (!e) return !0;
                    var t = this.canvas.compareDocumentPosition(e);
                    return t & Node.DOCUMENT_POSITION_PRECEDING
                      ? !0
                      : !(t & Node.DOCUMENT_POSITION_FOLLOWING);
                  }),
                  (e.prototype.cleanup = function () {
                    var e, t;
                    (this.canvas.removeEventListener(
                      `focus`,
                      this.onCanvasFocus,
                    ),
                      this.canvas.removeEventListener(
                        `blur`,
                        this.onCanvasBlur,
                      ),
                      this.canvas.removeEventListener(
                        `keydown`,
                        this.onKeyDown,
                      ),
                      this.focusDomainHost.removeEventListener(
                        `focusin`,
                        this.onFocusDomainHostFocusIn,
                      ),
                      (e = this.currentOverlayElement) == null ||
                        e.removeEventListener(`focusin`, this.onOverlayFocusIn),
                      (t = this.currentOverlayElement) == null ||
                        t.removeEventListener(`keydown`, this.onKeyDown, !0));
                  }),
                  e
                );
              })();
            },
            (e, t, n) => {
              (n.r(t), n.d(t, { BLANK_URL: () => l, sanitizeUrl: () => f }));
              var r = /^([^\w]*)(javascript|data|vbscript)/im,
                i = /&#(\w+)(^\w|;)?/g,
                a = /&(newline|tab);/gi,
                o = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim,
                s = /^.+(:|&colon;)/gim,
                c = [`.`, `/`],
                l = `about:blank`;
              function u(e) {
                return c.indexOf(e[0]) > -1;
              }
              function d(e) {
                return e.replace(o, ``).replace(i, function (e, t) {
                  return String.fromCharCode(t);
                });
              }
              function f(e) {
                if (!e) return l;
                var t = d(e).replace(a, ``).replace(o, ``).trim();
                if (!t) return l;
                if (u(t)) return t;
                var n = t.match(s);
                if (!n) return t;
                var i = n[0];
                return r.test(i) ? l : t;
              }
            },
            (e, t, n) => {
              (n.r(t),
                n.d(t, {
                  AudioAssetWrapper: () => p,
                  AudioWrapper: () => c,
                  CustomFileAssetLoaderWrapper: () => u,
                  FileAssetWrapper: () => d,
                  FileFinalizer: () => i,
                  FontAssetWrapper: () => m,
                  FontWrapper: () => l,
                  ImageAssetWrapper: () => f,
                  ImageWrapper: () => s,
                  createFinalization: () => _,
                  finalizationRegistry: () => g,
                }));
              var r = (function () {
                  var e = function (t, n) {
                    return (
                      (e =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (e, t) {
                            e.__proto__ = t;
                          }) ||
                        function (e, t) {
                          for (var n in t)
                            Object.prototype.hasOwnProperty.call(t, n) &&
                              (e[n] = t[n]);
                        }),
                      e(t, n)
                    );
                  };
                  return function (t, n) {
                    if (typeof n != `function` && n !== null)
                      throw TypeError(
                        `Class extends value ` +
                          String(n) +
                          ` is not a constructor or null`,
                      );
                    e(t, n);
                    function r() {
                      this.constructor = t;
                    }
                    t.prototype =
                      n === null
                        ? Object.create(n)
                        : ((r.prototype = n.prototype), new r());
                  };
                })(),
                i = (function () {
                  function e(e, t) {
                    (t === void 0 && (t = null),
                      (this.selfUnref = !1),
                      (this._file = e),
                      (this._session = t));
                  }
                  return (
                    (e.prototype.unref = function () {
                      (this._file && this._file.unref(),
                        (this._session &&= (this._session.delete(), null)));
                    }),
                    (e.prototype.release = function () {
                      ((this._file = null), (this._session = null));
                    }),
                    e
                  );
                })(),
                a = (function () {
                  function e(e) {
                    this._finalizableObject = e;
                  }
                  return (
                    (e.prototype.unref = function () {
                      this._finalizableObject.unref();
                    }),
                    e
                  );
                })(),
                o = (function () {
                  function e() {
                    this.selfUnref = !1;
                  }
                  return ((e.prototype.unref = function () {}), e);
                })(),
                s = (function (e) {
                  r(t, e);
                  function t(t) {
                    var n = e.call(this) || this;
                    return ((n._nativeImage = t), n);
                  }
                  return (
                    Object.defineProperty(t.prototype, "nativeImage", {
                      get: function () {
                        return this._nativeImage;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    (t.prototype.unref = function () {
                      this.selfUnref && this._nativeImage.unref();
                    }),
                    t
                  );
                })(o),
                c = (function (e) {
                  r(t, e);
                  function t(t) {
                    var n = e.call(this) || this;
                    return ((n._nativeAudio = t), n);
                  }
                  return (
                    Object.defineProperty(t.prototype, "nativeAudio", {
                      get: function () {
                        return this._nativeAudio;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    (t.prototype.unref = function () {
                      this.selfUnref && this._nativeAudio.unref();
                    }),
                    t
                  );
                })(o),
                l = (function (e) {
                  r(t, e);
                  function t(t) {
                    var n = e.call(this) || this;
                    return ((n._nativeFont = t), n);
                  }
                  return (
                    Object.defineProperty(t.prototype, "nativeFont", {
                      get: function () {
                        return this._nativeFont;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    (t.prototype.unref = function () {
                      this.selfUnref && this._nativeFont.unref();
                    }),
                    t
                  );
                })(o),
                u = (function () {
                  function e(e, t, n) {
                    (n === void 0 && (n = null),
                      (this._assetLoaderCallback = t),
                      (this._session = n),
                      (this.assetLoader = new e.CustomFileAssetLoader({
                        loadContents: this.loadContents.bind(this),
                      })));
                  }
                  return (
                    (e.prototype.loadContents = function (e, t) {
                      var n;
                      if (e.isImage) n = new f(e, this._session);
                      else if (e.isAudio) n = new p(e, this._session);
                      else if (e.isFont) n = new m(e, this._session);
                      else return !1;
                      return this._assetLoaderCallback(n, t);
                    }),
                    e
                  );
                })(),
                d = (function () {
                  function e(e, t) {
                    (t === void 0 && (t = null),
                      (this._nativeFileAsset = e),
                      (this._session = t));
                  }
                  return (
                    (e.prototype.decode = function (e) {
                      this._nativeFileAsset.decode(e, this._session);
                    }),
                    Object.defineProperty(e.prototype, "name", {
                      get: function () {
                        return this._nativeFileAsset.name;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "fileExtension", {
                      get: function () {
                        return this._nativeFileAsset.fileExtension;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "uniqueFilename", {
                      get: function () {
                        return this._nativeFileAsset.uniqueFilename;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "isAudio", {
                      get: function () {
                        return this._nativeFileAsset.isAudio;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "isImage", {
                      get: function () {
                        return this._nativeFileAsset.isImage;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "isFont", {
                      get: function () {
                        return this._nativeFileAsset.isFont;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "cdnUuid", {
                      get: function () {
                        return this._nativeFileAsset.cdnUuid;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, "nativeFileAsset", {
                      get: function () {
                        return this._nativeFileAsset;
                      },
                      enumerable: !1,
                      configurable: !0,
                    }),
                    e
                  );
                })(),
                f = (function (e) {
                  r(t, e);
                  function t() {
                    return (e !== null && e.apply(this, arguments)) || this;
                  }
                  return (
                    (t.prototype.setRenderImage = function (e) {
                      this._nativeFileAsset.setRenderImage(e.nativeImage);
                    }),
                    t
                  );
                })(d),
                p = (function (e) {
                  r(t, e);
                  function t() {
                    return (e !== null && e.apply(this, arguments)) || this;
                  }
                  return (
                    (t.prototype.setAudioSource = function (e) {
                      this._nativeFileAsset.setAudioSource(e.nativeAudio);
                    }),
                    t
                  );
                })(d),
                m = (function (e) {
                  r(t, e);
                  function t() {
                    return (e !== null && e.apply(this, arguments)) || this;
                  }
                  return (
                    (t.prototype.setFont = function (e) {
                      this._nativeFileAsset.setFont(e.nativeFont);
                    }),
                    t
                  );
                })(d),
                h = (function () {
                  function e(e) {}
                  return (
                    (e.prototype.register = function (e) {
                      e.selfUnref = !0;
                    }),
                    (e.prototype.unregister = function (e) {}),
                    e
                  );
                })(),
                g = new (
                  typeof FinalizationRegistry < `u` ? FinalizationRegistry : h
                )(function (e) {
                  e?.unref();
                }),
                _ = function (e, t) {
                  var n = new a(t);
                  g.register(e, n);
                };
            },
            (e, t, n) => {
              (n.r(t), n.d(t, { RiveFont: () => i }));
              var r = n(3),
                i = (function () {
                  function e() {}
                  return (
                    (e.setFallbackFontCallback = function (t) {
                      ((e._fallbackFontCallback = t ?? null),
                        e._wireFallbackProc());
                    }),
                    (e._fontToPtr = function (e) {
                      if (e == null) return null;
                      var t = e.nativeFont;
                      return t?.ptr?.call(t) ?? null;
                    }),
                    (e._getFallbackPtr = function (t, n) {
                      return n < 0 || n >= t.length ? null : e._fontToPtr(t[n]);
                    }),
                    (e._wireFallbackProc = function () {
                      r.RuntimeLoader.getInstance(function (t) {
                        var n = e._fallbackFontCallback;
                        n
                          ? t.setFallbackFontCallback(function (t, r, i) {
                              var a = n(t, i);
                              return a
                                ? Array.isArray(a)
                                  ? e._getFallbackPtr(a, r)
                                  : r === 0
                                    ? e._fontToPtr(a)
                                    : null
                                : null;
                            })
                          : t.setFallbackFontCallback(null);
                      });
                    }),
                    (e._fallbackFontCallback = null),
                    e
                  );
                })();
            },
          ],
          t = {};
        function n(r) {
          var i = t[r];
          if (i !== void 0) return i.exports;
          var a = (t[r] = { exports: {} });
          return (e[r](a, a.exports, n), a.exports);
        }
        ((n.d = (e, t) => {
          for (var r in t)
            n.o(t, r) &&
              !n.o(e, r) &&
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        }),
          (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
          (n.r = (e) => {
            (typeof Symbol < `u` &&
              Symbol.toStringTag &&
              Object.defineProperty(e, Symbol.toStringTag, { value: `Module` }),
              Object.defineProperty(e, "__esModule", { value: !0 }));
          }));
        var r = {};
        return (
          (() => {
            (n.r(r),
              n.d(r, {
                Alignment: () => m,
                DataEnum: () => fe,
                DataType: () => ue,
                DeprecationKeys: () => j,
                DrawOptimizationOptions: () => h,
                EventType: () => T,
                Fit: () => p,
                Layout: () => g,
                LoopType: () => L,
                Rive: () => le,
                RiveEventType: () => y,
                RiveFile: () => ce,
                RiveFont: () => a.RiveFont,
                RuntimeLoader: () => t.RuntimeLoader,
                SemanticMode: () => i.SemanticMode,
                StateMachineInput: () => v,
                StateMachineInputType: () => _,
                Testing: () => Ce,
                ViewModel: () => de,
                ViewModelInstance: () => H,
                ViewModelInstanceArtboard: () => xe,
                ViewModelInstanceAssetFont: () => W,
                ViewModelInstanceAssetImage: () => be,
                ViewModelInstanceBoolean: () => he,
                ViewModelInstanceColor: () => ye,
                ViewModelInstanceEnum: () => _e,
                ViewModelInstanceList: () => ve,
                ViewModelInstanceNumber: () => me,
                ViewModelInstanceString: () => pe,
                ViewModelInstanceTrigger: () => ge,
                ViewModelInstanceValue: () => U,
                decodeAudio: () => we,
                decodeFont: () => Ee,
                decodeImage: () => Te,
              }));
            var e = n(1),
              t = n(3),
              i = n(6),
              a = n(10),
              o = (function () {
                var e = function (t, n) {
                  return (
                    (e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t)
                          Object.prototype.hasOwnProperty.call(t, n) &&
                            (e[n] = t[n]);
                      }),
                    e(t, n)
                  );
                };
                return function (t, n) {
                  if (typeof n != `function` && n !== null)
                    throw TypeError(
                      `Class extends value ` +
                        String(n) +
                        ` is not a constructor or null`,
                    );
                  e(t, n);
                  function r() {
                    this.constructor = t;
                  }
                  t.prototype =
                    n === null
                      ? Object.create(n)
                      : ((r.prototype = n.prototype), new r());
                };
              })(),
              s = function () {
                return (
                  (s =
                    Object.assign ||
                    function (e) {
                      for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var i in ((t = arguments[n]), t))
                          Object.prototype.hasOwnProperty.call(t, i) &&
                            (e[i] = t[i]);
                      return e;
                    }),
                  s.apply(this, arguments)
                );
              },
              c = function (e, t, n, r) {
                function i(e) {
                  return e instanceof n
                    ? e
                    : new n(function (t) {
                        t(e);
                      });
                }
                return new (n ||= Promise)(function (n, a) {
                  function o(e) {
                    try {
                      c(r.next(e));
                    } catch (e) {
                      a(e);
                    }
                  }
                  function s(e) {
                    try {
                      c(r.throw(e));
                    } catch (e) {
                      a(e);
                    }
                  }
                  function c(e) {
                    e.done ? n(e.value) : i(e.value).then(o, s);
                  }
                  c((r = r.apply(e, t || [])).next());
                });
              },
              l = function (e, t) {
                var n = {
                    label: 0,
                    sent: function () {
                      if (a[0] & 1) throw a[1];
                      return a[1];
                    },
                    trys: [],
                    ops: [],
                  },
                  r,
                  i,
                  a,
                  o = Object.create(
                    (typeof Iterator == `function` ? Iterator : Object)
                      .prototype,
                  );
                return (
                  (o.next = s(0)),
                  (o.throw = s(1)),
                  (o.return = s(2)),
                  typeof Symbol == `function` &&
                    (o[Symbol.iterator] = function () {
                      return this;
                    }),
                  o
                );
                function s(e) {
                  return function (t) {
                    return c([e, t]);
                  };
                }
                function c(s) {
                  if (r) throw TypeError(`Generator is already executing.`);
                  for (; o && ((o = 0), s[0] && (n = 0)), n;)
                    try {
                      if (
                        ((r = 1),
                        i &&
                          (a =
                            s[0] & 2
                              ? i.return
                              : s[0]
                                ? i.throw || ((a = i.return) && a.call(i), 0)
                                : i.next) &&
                          !(a = a.call(i, s[1])).done)
                      )
                        return a;
                      switch (((i = 0), a && (s = [s[0] & 2, a.value]), s[0])) {
                        case 0:
                        case 1:
                          a = s;
                          break;
                        case 4:
                          return (n.label++, { value: s[1], done: !1 });
                        case 5:
                          (n.label++, (i = s[1]), (s = [0]));
                          continue;
                        case 7:
                          ((s = n.ops.pop()), n.trys.pop());
                          continue;
                        default:
                          if (
                            ((a = n.trys),
                            !(a = a.length > 0 && a[a.length - 1]) &&
                              (s[0] === 6 || s[0] === 2))
                          ) {
                            n = 0;
                            continue;
                          }
                          if (
                            s[0] === 3 &&
                            (!a || (s[1] > a[0] && s[1] < a[3]))
                          ) {
                            n.label = s[1];
                            break;
                          }
                          if (s[0] === 6 && n.label < a[1]) {
                            ((n.label = a[1]), (a = s));
                            break;
                          }
                          if (a && n.label < a[2]) {
                            ((n.label = a[2]), n.ops.push(s));
                            break;
                          }
                          (a[2] && n.ops.pop(), n.trys.pop());
                          continue;
                      }
                      s = t.call(e, n);
                    } catch (e) {
                      ((s = [6, e]), (i = 0));
                    } finally {
                      r = a = 0;
                    }
                  if (s[0] & 5) throw s[1];
                  return { value: s[0] ? s[1] : void 0, done: !0 };
                }
              },
              u = function (e, t, n) {
                if (n || arguments.length === 2)
                  for (var r = 0, i = t.length, a; r < i; r++)
                    (a || !(r in t)) &&
                      ((a ||= Array.prototype.slice.call(t, 0, r)),
                      (a[r] = t[r]));
                return e.concat(a || Array.prototype.slice.call(t));
              },
              d = (function (e) {
                o(t, e);
                function t() {
                  var t = (e !== null && e.apply(this, arguments)) || this;
                  return ((t.isHandledError = !0), t);
                }
                return t;
              })(Error),
              f = function (e) {
                return e && e.isHandledError
                  ? e.message
                  : `Problem loading file; may be corrupt!`;
              },
              p;
            (function (e) {
              ((e.Cover = `cover`),
                (e.Contain = `contain`),
                (e.Fill = `fill`),
                (e.FitWidth = `fitWidth`),
                (e.FitHeight = `fitHeight`),
                (e.None = `none`),
                (e.ScaleDown = `scaleDown`),
                (e.Layout = `layout`));
            })((p ||= {}));
            var m;
            (function (e) {
              ((e.Center = `center`),
                (e.TopLeft = `topLeft`),
                (e.TopCenter = `topCenter`),
                (e.TopRight = `topRight`),
                (e.CenterLeft = `centerLeft`),
                (e.CenterRight = `centerRight`),
                (e.BottomLeft = `bottomLeft`),
                (e.BottomCenter = `bottomCenter`),
                (e.BottomRight = `bottomRight`));
            })((m ||= {}));
            var h;
            (function (e) {
              ((e.AlwaysDraw = `alwaysDraw`),
                (e.DrawOnChanged = `drawOnChanged`));
            })((h ||= {}));
            var g = (function () {
                function e(e) {
                  ((this.fit = e?.fit ?? p.Contain),
                    (this.alignment = e?.alignment ?? m.Center),
                    (this.layoutScaleFactor = e?.layoutScaleFactor ?? 1),
                    (this.minX = e?.minX ?? 0),
                    (this.minY = e?.minY ?? 0),
                    (this.maxX = e?.maxX ?? 0),
                    (this.maxY = e?.maxY ?? 0));
                }
                return (
                  (e.new = function (t) {
                    var n = t.fit,
                      r = t.alignment,
                      i = t.minX,
                      a = t.minY,
                      o = t.maxX,
                      s = t.maxY;
                    return (
                      I(
                        j.legacyConstructors,
                        "This function is deprecated: please use `new Layout({})` instead",
                      ),
                      new e({
                        fit: n,
                        alignment: r,
                        minX: i,
                        minY: a,
                        maxX: o,
                        maxY: s,
                      })
                    );
                  }),
                  (e.prototype.copyWith = function (t) {
                    var n = t.fit,
                      r = t.alignment,
                      i = t.layoutScaleFactor,
                      a = t.minX,
                      o = t.minY,
                      s = t.maxX,
                      c = t.maxY;
                    return new e({
                      fit: n ?? this.fit,
                      alignment: r ?? this.alignment,
                      layoutScaleFactor: i ?? this.layoutScaleFactor,
                      minX: a ?? this.minX,
                      minY: o ?? this.minY,
                      maxX: s ?? this.maxX,
                      maxY: c ?? this.maxY,
                    });
                  }),
                  (e.prototype.runtimeFit = function (e) {
                    if (this.cachedRuntimeFit) return this.cachedRuntimeFit;
                    var t =
                      this.fit === p.Cover
                        ? e.Fit.cover
                        : this.fit === p.Contain
                          ? e.Fit.contain
                          : this.fit === p.Fill
                            ? e.Fit.fill
                            : this.fit === p.FitWidth
                              ? e.Fit.fitWidth
                              : this.fit === p.FitHeight
                                ? e.Fit.fitHeight
                                : this.fit === p.ScaleDown
                                  ? e.Fit.scaleDown
                                  : this.fit === p.Layout
                                    ? e.Fit.layout
                                    : e.Fit.none;
                    return ((this.cachedRuntimeFit = t), t);
                  }),
                  (e.prototype.runtimeAlignment = function (e) {
                    if (this.cachedRuntimeAlignment)
                      return this.cachedRuntimeAlignment;
                    var t =
                      this.alignment === m.TopLeft
                        ? e.Alignment.topLeft
                        : this.alignment === m.TopCenter
                          ? e.Alignment.topCenter
                          : this.alignment === m.TopRight
                            ? e.Alignment.topRight
                            : this.alignment === m.CenterLeft
                              ? e.Alignment.centerLeft
                              : this.alignment === m.CenterRight
                                ? e.Alignment.centerRight
                                : this.alignment === m.BottomLeft
                                  ? e.Alignment.bottomLeft
                                  : this.alignment === m.BottomCenter
                                    ? e.Alignment.bottomCenter
                                    : this.alignment === m.BottomRight
                                      ? e.Alignment.bottomRight
                                      : e.Alignment.center;
                    return ((this.cachedRuntimeAlignment = t), t);
                  }),
                  e
                );
              })(),
              _;
            (function (e) {
              ((e[(e.Number = 56)] = `Number`),
                (e[(e.Trigger = 58)] = `Trigger`),
                (e[(e.Boolean = 59)] = `Boolean`));
            })((_ ||= {}));
            var v = (function () {
                function e(e, t) {
                  ((this.type = e), (this.runtimeInput = t));
                }
                return (
                  Object.defineProperty(e.prototype, "name", {
                    get: function () {
                      return this.runtimeInput.name;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "value", {
                    get: function () {
                      return this.runtimeInput.value;
                    },
                    set: function (e) {
                      this.runtimeInput.value = e;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.fire = function () {
                    this.type === _.Trigger && this.runtimeInput.fire();
                  }),
                  (e.prototype.delete = function () {
                    this.runtimeInput = null;
                  }),
                  e
                );
              })(),
              y;
            (function (e) {
              ((e[(e.General = 128)] = `General`),
                (e[(e.OpenUrl = 131)] = `OpenUrl`));
            })((y ||= {}));
            var b = (function () {
                function e(e) {
                  ((this.isBindableArtboard = !1),
                    (this.isBindableArtboard = e));
                }
                return e;
              })(),
              x = (function (e) {
                o(t, e);
                function t(t, n) {
                  var r = e.call(this, !1) || this;
                  return ((r.nativeArtboard = t), (r.file = n), r);
                }
                return t;
              })(b),
              S = (function (e) {
                o(t, e);
                function t(t) {
                  var n = e.call(this, !0) || this;
                  return ((n.selfUnref = !1), (n.nativeArtboard = t), n);
                }
                return (
                  Object.defineProperty(t.prototype, "viewModel", {
                    set: function (e) {
                      this.nativeViewModel = e.nativeInstance;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.destroy = function () {
                    var e;
                    this.selfUnref &&
                      (this.nativeArtboard.unref(),
                      (e = this.nativeViewModel) == null || e.unref());
                  }),
                  t
                );
              })(b),
              C = (function () {
                function e(e, t, n, r) {
                  ((this.stateMachine = e),
                    (this.playing = n),
                    (this.artboard = r),
                    (this.inputs = []),
                    (this.instance = new t.StateMachineInstance(e, r)),
                    this.initInputs(t));
                }
                return (
                  Object.defineProperty(e.prototype, "hasFocusNodes", {
                    get: function () {
                      return this.instance.hasFocusNodes();
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "name", {
                    get: function () {
                      return this.stateMachine.name;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "statesChanged", {
                    get: function () {
                      for (
                        var e = [], t = 0;
                        t < this.instance.stateChangedCount();
                        t++
                      )
                        e.push(this.instance.stateChangedNameByIndex(t));
                      return e;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.advance = function (e) {
                    this.instance.advance(e);
                  }),
                  (e.prototype.advanceAndApply = function (e) {
                    this.instance.advanceAndApply(e);
                  }),
                  (e.prototype.enableSemantics = function () {
                    this.instance.enableSemantics();
                  }),
                  (e.prototype.drainSemanticsDiff = function () {
                    return this.instance.drainSemanticsDiff();
                  }),
                  (e.prototype.fireSemanticAction = function (e, t) {
                    this.instance.fireSemanticAction(e, t);
                  }),
                  (e.prototype.focusSemanticNode = function (e) {
                    return this.instance.focusSemanticNode(e);
                  }),
                  (e.prototype.reportedEventCount = function () {
                    return this.instance.reportedEventCount();
                  }),
                  (e.prototype.reportedEventAt = function (e) {
                    return this.instance.reportedEventAt(e);
                  }),
                  (e.prototype.initInputs = function (e) {
                    for (var t = 0; t < this.instance.inputCount(); t++) {
                      var n = this.instance.input(t);
                      this.inputs.push(this.mapRuntimeInput(n, e));
                    }
                  }),
                  (e.prototype.mapRuntimeInput = function (e, t) {
                    if (e.type === t.SMIInput.bool)
                      return new v(_.Boolean, e.asBool());
                    if (e.type === t.SMIInput.number)
                      return new v(_.Number, e.asNumber());
                    if (e.type === t.SMIInput.trigger)
                      return new v(_.Trigger, e.asTrigger());
                  }),
                  (e.prototype.cleanup = function () {
                    (this.inputs.forEach(function (e) {
                      e.delete();
                    }),
                      (this.inputs.length = 0),
                      this.instance.delete());
                  }),
                  (e.prototype.bindViewModelInstance = function (e) {
                    e.runtimeInstance != null &&
                      this.instance.bindViewModelInstance(e.runtimeInstance);
                  }),
                  (e.prototype.focusState = function () {
                    return this.instance.focusState();
                  }),
                  (e.prototype.clearFocus = function () {
                    this.instance.clearFocus();
                  }),
                  e
                );
              })(),
              w = (function () {
                function t(e, t, n, r, i) {
                  (r === void 0 && (r = []),
                    i === void 0 && (i = []),
                    (this.runtime = e),
                    (this.artboard = t),
                    (this.eventManager = n),
                    (this.animations = r),
                    (this.stateMachines = i));
                }
                return (
                  (t.prototype.add = function (t, n, r, i) {
                    if (
                      (r === void 0 && (r = !0),
                      i === void 0 && (i = !1),
                      (t = G(t)),
                      t.length === 0)
                    )
                      (this.animations.forEach(function (e) {
                        return (e.playing = n);
                      }),
                        this.stateMachines.forEach(function (e) {
                          return (e.playing = n);
                        }));
                    else
                      for (
                        var a = this.animations.map(function (e) {
                            return e.name;
                          }),
                          o = this.stateMachines.map(function (e) {
                            return e.name;
                          }),
                          s = 0;
                        s < t.length;
                        s++
                      ) {
                        var c = a.indexOf(t[s]),
                          l = o.indexOf(t[s]);
                        if (c >= 0 || l >= 0)
                          c >= 0
                            ? (this.animations[c].playing = n)
                            : (this.stateMachines[l].playing = n);
                        else {
                          var u = this.artboard.animationByName(t[s]);
                          if (u) {
                            var d = new e.Animation(
                              u,
                              this.artboard,
                              this.runtime,
                              n,
                            );
                            (d.advance(0), d.apply(1), this.animations.push(d));
                          } else {
                            var f = this.artboard.stateMachineByName(t[s]);
                            if (f) {
                              var p = new C(f, this.runtime, n, this.artboard);
                              (i && p.enableSemantics(),
                                this.stateMachines.push(p));
                            }
                          }
                        }
                      }
                    return (
                      r &&
                        (n
                          ? this.eventManager.fire({
                              type: T.Play,
                              data: this.playing,
                            })
                          : this.eventManager.fire({
                              type: T.Pause,
                              data: this.paused,
                            })),
                      n ? this.playing : this.paused
                    );
                  }),
                  (t.prototype.initLinearAnimations = function (t, n, r) {
                    r === void 0 && (r = !1);
                    for (
                      var i = this.animations.map(function (e) {
                          return e.name;
                        }),
                        a = 0;
                      a < t.length;
                      a++
                    ) {
                      var o = i.indexOf(t[a]);
                      if (o >= 0) this.animations[o].playing = n;
                      else {
                        var s = this.artboard.animationByName(t[a]);
                        if (s) {
                          var c = new e.Animation(
                            s,
                            this.artboard,
                            this.runtime,
                            n,
                          );
                          (c.advance(0), c.apply(1), this.animations.push(c));
                        } else if (r)
                          throw new d(
                            `State Machine with name ${t[a]} not found`,
                          );
                        else
                          console.error(
                            `Animation with name ${t[a]} not found.`,
                          );
                      }
                    }
                  }),
                  (t.prototype.initStateMachines = function (e, t, n) {
                    for (
                      var r = this.stateMachines.map(function (e) {
                          return e.name;
                        }),
                        i = 0;
                      i < e.length;
                      i++
                    ) {
                      var a = r.indexOf(e[i]);
                      if (a >= 0) this.stateMachines[a].playing = t;
                      else {
                        var o = this.artboard.stateMachineByName(e[i]);
                        if (o) {
                          var s = new C(o, this.runtime, t, this.artboard);
                          (n && s.enableSemantics(),
                            this.stateMachines.push(s));
                        } else
                          (console.warn(
                            `State Machine with name ${e[i]} not found. Falling back to find an animation with the same name.`,
                          ),
                            this.initLinearAnimations([e[i]], t, !0));
                      }
                    }
                  }),
                  (t.prototype.play = function (e) {
                    return this.add(e, !0);
                  }),
                  (t.prototype.advanceIfPaused = function () {
                    this.stateMachines.forEach(function (e) {
                      e.playing || e.advanceAndApply(0);
                    });
                  }),
                  (t.prototype.pause = function (e) {
                    return this.add(e, !1);
                  }),
                  (t.prototype.scrub = function (e, t) {
                    var n = this.animations.filter(function (t) {
                      return e.includes(t.name);
                    });
                    return (
                      n.forEach(function (e) {
                        return (e.scrubTo = t);
                      }),
                      n.map(function (e) {
                        return e.name;
                      })
                    );
                  }),
                  Object.defineProperty(t.prototype, "playing", {
                    get: function () {
                      return this.animations
                        .filter(function (e) {
                          return e.playing;
                        })
                        .map(function (e) {
                          return e.name;
                        })
                        .concat(
                          this.stateMachines
                            .filter(function (e) {
                              return e.playing;
                            })
                            .map(function (e) {
                              return e.name;
                            }),
                        );
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(t.prototype, "paused", {
                    get: function () {
                      return this.animations
                        .filter(function (e) {
                          return !e.playing;
                        })
                        .map(function (e) {
                          return e.name;
                        })
                        .concat(
                          this.stateMachines
                            .filter(function (e) {
                              return !e.playing;
                            })
                            .map(function (e) {
                              return e.name;
                            }),
                        );
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.stop = function (e) {
                    var t = this;
                    e = G(e);
                    var n = [];
                    if (e.length === 0)
                      ((n = this.animations
                        .map(function (e) {
                          return e.name;
                        })
                        .concat(
                          this.stateMachines.map(function (e) {
                            return e.name;
                          }),
                        )),
                        this.animations.forEach(function (e) {
                          return e.cleanup();
                        }),
                        this.stateMachines.forEach(function (e) {
                          return e.cleanup();
                        }),
                        this.animations.splice(0, this.animations.length),
                        this.stateMachines.splice(
                          0,
                          this.stateMachines.length,
                        ));
                    else {
                      var r = this.animations.filter(function (t) {
                        return e.includes(t.name);
                      });
                      r.forEach(function (e) {
                        (e.cleanup(),
                          t.animations.splice(t.animations.indexOf(e), 1));
                      });
                      var i = this.stateMachines.filter(function (t) {
                        return e.includes(t.name);
                      });
                      (i.forEach(function (e) {
                        (e.cleanup(),
                          t.stateMachines.splice(
                            t.stateMachines.indexOf(e),
                            1,
                          ));
                      }),
                        (n = r
                          .map(function (e) {
                            return e.name;
                          })
                          .concat(
                            i.map(function (e) {
                              return e.name;
                            }),
                          )));
                    }
                    return (
                      this.eventManager.fire({ type: T.Stop, data: n }),
                      n
                    );
                  }),
                  Object.defineProperty(t.prototype, "isPlaying", {
                    get: function () {
                      return (
                        this.animations.reduce(function (e, t) {
                          return e || t.playing;
                        }, !1) ||
                        this.stateMachines.reduce(function (e, t) {
                          return e || t.playing;
                        }, !1)
                      );
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(t.prototype, "isPaused", {
                    get: function () {
                      return (
                        !this.isPlaying &&
                        (this.animations.length > 0 ||
                          this.stateMachines.length > 0)
                      );
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(t.prototype, "isStopped", {
                    get: function () {
                      return (
                        this.animations.length === 0 &&
                        this.stateMachines.length === 0
                      );
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.atLeastOne = function (e, t, n) {
                    (t === void 0 && (t = !0), n === void 0 && (n = !1));
                    var r;
                    return (
                      this.animations.length === 0 &&
                        this.stateMachines.length === 0 &&
                        (this.artboard.animationCount() > 0
                          ? (this.artboard.stateMachineCount() > 0 &&
                              I(
                                j.defaultStateMachine,
                                "No `stateMachine` was specified, so the artboard's first linear animation is playing by default. In the next major version, the artboard's state machine will be played by default instead when one exists. Pass the `stateMachine` parameter to adopt that behavior now.",
                              ),
                            this.add(
                              [(r = this.artboard.animationByIndex(0).name)],
                              e,
                              t,
                            ))
                          : this.artboard.stateMachineCount() > 0 &&
                            this.add(
                              [(r = this.artboard.stateMachineByIndex(0).name)],
                              e,
                              t,
                              n,
                            )),
                      r
                    );
                  }),
                  (t.prototype.handleLooping = function () {
                    for (
                      var e = 0,
                        t = this.animations.filter(function (e) {
                          return e.playing;
                        });
                      e < t.length;
                      e++
                    ) {
                      var n = t[e];
                      n.loopValue === 0 && n.loopCount
                        ? ((n.loopCount = 0), this.stop(n.name))
                        : n.loopValue === 1 && n.loopCount
                          ? (this.eventManager.fire({
                              type: T.Loop,
                              data: { animation: n.name, type: L.Loop },
                            }),
                            (n.loopCount = 0))
                          : n.loopValue === 2 &&
                            n.loopCount > 1 &&
                            (this.eventManager.fire({
                              type: T.Loop,
                              data: { animation: n.name, type: L.PingPong },
                            }),
                            (n.loopCount = 0));
                    }
                  }),
                  (t.prototype.handleStateChanges = function () {
                    for (
                      var e = [],
                        t = 0,
                        n = this.stateMachines.filter(function (e) {
                          return e.playing;
                        });
                      t < n.length;
                      t++
                    ) {
                      var r = n[t];
                      e.push.apply(e, r.statesChanged);
                    }
                    e.length > 0 &&
                      this.eventManager.fire({ type: T.StateChange, data: e });
                  }),
                  (t.prototype.handleAdvancing = function (e) {
                    this.eventManager.fire({ type: T.Advance, data: e });
                  }),
                  t
                );
              })(),
              T;
            (function (e) {
              ((e.Load = `load`),
                (e.LoadError = `loaderror`),
                (e.Play = `play`),
                (e.Pause = `pause`),
                (e.Stop = `stop`),
                (e.Loop = `loop`),
                (e.Draw = `draw`),
                (e.Advance = `advance`),
                (e.StateChange = `statechange`),
                (e.RiveEvent = `riveevent`),
                (e.AudioStatusChange = `audiostatuschange`));
            })((T ||= {}));
            var E = `Subscribing to Rive Events at runtime is deprecated and will be removed in a future major version: please use data binding instead. See https://rive.app/docs/runtimes/web/rive-events for how to migrate.`,
              D = `State machine inputs are deprecated and will be removed in a future major version: please use data binding properties instead. See https://rive.app/docs/editor/data-binding/migration-guide#state-machine-inputs for how to migrate.`,
              O = `Text run APIs are deprecated and will be removed in a future major version: please use data binding instead. See https://rive.app/docs/editor/data-binding/migration-guide#updating-text-runs-at-runtime for how to migrate.`,
              k = `Loop events are deprecated and will be removed in a future major version: they are only reported for linear animation playback, which is deprecated. Use a state machine to control playback and data binding to react to changes instead. See https://rive.app/docs/editor/data-binding/migration-guide for how to migrate.`,
              A = `Subscribing to state change events at runtime is deprecated and will be removed in a future major version: use data binding (view model property observers) or state machine actions to react to changes from your graphic instead. See https://rive.app/docs/editor/state-machine/states#actions for how to migrate.`,
              j = {
                animationNames: `animation-names`,
                animationsParam: `animations-param`,
                defaultStateMachine: `default-state-machine`,
                legacyConstructors: `legacy-constructors`,
                legacyUnsubscribe: `legacy-unsubscribe`,
                loopEvents: `loop-events`,
                namesArray: `names-array`,
                riveEvents: `rive-events`,
                scrub: `scrub`,
                stateChangeEvents: `state-change-events`,
                stateMachineInputs: `state-machine-inputs`,
                stateMachinesParam: `state-machines-param`,
                textRuns: `text-runs`,
              },
              M = new Set(
                Object.keys(j).map(function (e) {
                  return j[e];
                }),
              ),
              N = new Set(),
              P = function (e) {
                if ((N.clear(), !Array.isArray(e))) {
                  console.warn(
                    `[Rive] \`suppressDeprecationWarnings\` expects an array of deprecation ids, received ${typeof e}. Nothing was suppressed.`,
                  );
                  return;
                }
                for (var t = 0, n = e; t < n.length; t++) {
                  var r = n[t];
                  M.has(r) && N.add(r);
                }
              },
              F = new Set(),
              I = function (e, t) {
                if (!N.has(e)) {
                  var n = `${e}:${t}`;
                  F.has(n) ||
                    (F.add(n),
                    console.warn(`[Rive: ${e}] ${t}
To suppress this warning, set Rive.suppressDeprecationWarnings = ["${e}"]`));
                }
              },
              ee = function (e, t) {
                Array.isArray(e) &&
                  I(
                    j.namesArray,
                    `Passing an array of names to \`${t}()\` is deprecated: in the next major version this parameter will be a single string, and playing multiple animations or state machines at once will not be supported.`,
                  );
              },
              te = function (e) {
                I(
                  j.animationNames,
                  `Passing linear animation names to \`${e}()\` is deprecated and will be removed in a future major version: Pass a single state machine name to control playback instead.`,
                );
              },
              L;
            (function (e) {
              ((e.OneShot = `oneshot`),
                (e.Loop = `loop`),
                (e.PingPong = `pingpong`));
            })((L ||= {}));
            var R = (function () {
                function e(e) {
                  (e === void 0 && (e = []), (this.listeners = e));
                }
                return (
                  (e.prototype.getListeners = function (e) {
                    return this.listeners.filter(function (t) {
                      return t.type === e;
                    });
                  }),
                  (e.prototype.add = function (e) {
                    this.listeners.includes(e) || this.listeners.push(e);
                  }),
                  (e.prototype.remove = function (e) {
                    for (var t = 0; t < this.listeners.length; t++) {
                      var n = this.listeners[t];
                      if (n.type === e.type && n.callback === e.callback) {
                        this.listeners.splice(t, 1);
                        break;
                      }
                    }
                  }),
                  (e.prototype.removeAll = function (e) {
                    var t = this;
                    e
                      ? this.listeners
                          .filter(function (t) {
                            return t.type === e;
                          })
                          .forEach(function (e) {
                            return t.remove(e);
                          })
                      : this.listeners.splice(0, this.listeners.length);
                  }),
                  (e.prototype.fire = function (e) {
                    this.getListeners(e.type).forEach(function (t) {
                      return t.callback(e);
                    });
                  }),
                  e
                );
              })(),
              ne = (function () {
                function e(e) {
                  ((this.eventManager = e), (this.queue = []));
                }
                return (
                  (e.prototype.add = function (e) {
                    this.queue.push(e);
                  }),
                  (e.prototype.process = function () {
                    for (; this.queue.length > 0;) {
                      var e = this.queue.shift();
                      (e?.action && e.action(),
                        e?.event && this.eventManager.fire(e.event));
                    }
                  }),
                  e
                );
              })(),
              z;
            (function (e) {
              ((e[(e.AVAILABLE = 0)] = `AVAILABLE`),
                (e[(e.UNAVAILABLE = 1)] = `UNAVAILABLE`));
            })((z ||= {}));
            var re = new ((function (e) {
                o(t, e);
                function t() {
                  var t = (e !== null && e.apply(this, arguments)) || this;
                  return (
                    (t._started = !1),
                    (t._enabled = !1),
                    (t._status = z.UNAVAILABLE),
                    t
                  );
                }
                return (
                  (t.prototype.delay = function (e) {
                    return c(this, void 0, void 0, function () {
                      return l(this, function (t) {
                        return [
                          2,
                          new Promise(function (t) {
                            return setTimeout(t, e);
                          }),
                        ];
                      });
                    });
                  }),
                  (t.prototype.timeout = function () {
                    return c(this, void 0, void 0, function () {
                      return l(this, function (e) {
                        return [
                          2,
                          new Promise(function (e, t) {
                            return setTimeout(t, 50);
                          }),
                        ];
                      });
                    });
                  }),
                  (t.prototype.reportToListeners = function () {
                    (this.fire({ type: T.AudioStatusChange }),
                      this.removeAll());
                  }),
                  (t.prototype.enableAudio = function () {
                    return c(this, void 0, void 0, function () {
                      return l(this, function (e) {
                        return (
                          this._enabled ||
                            ((this._enabled = !0),
                            (this._status = z.AVAILABLE),
                            this.reportToListeners()),
                          [2]
                        );
                      });
                    });
                  }),
                  (t.prototype.testAudio = function () {
                    return c(this, void 0, void 0, function () {
                      return l(this, function (e) {
                        switch (e.label) {
                          case 0:
                            if (
                              this._status !== z.UNAVAILABLE ||
                              this._audioContext === null
                            )
                              return [3, 4];
                            e.label = 1;
                          case 1:
                            return (
                              e.trys.push([1, 3, , 4]),
                              [
                                4,
                                Promise.race([
                                  this._audioContext.resume(),
                                  this.timeout(),
                                ]),
                              ]
                            );
                          case 2:
                            return (e.sent(), this.enableAudio(), [3, 4]);
                          case 3:
                            return (e.sent(), [3, 4]);
                          case 4:
                            return [2];
                        }
                      });
                    });
                  }),
                  (t.prototype._establishAudio = function () {
                    return c(this, void 0, void 0, function () {
                      return l(this, function (e) {
                        switch (e.label) {
                          case 0:
                            return this._started
                              ? [3, 5]
                              : ((this._started = !0),
                                typeof window > `u`
                                  ? (this.enableAudio(), [3, 5])
                                  : [3, 1]);
                          case 1:
                            ((this._audioContext = new AudioContext()),
                              this.listenForUserAction(),
                              (e.label = 2));
                          case 2:
                            return this._status === z.UNAVAILABLE
                              ? [4, this.testAudio()]
                              : [3, 5];
                          case 3:
                            return (e.sent(), [4, this.delay(1e3)]);
                          case 4:
                            return (e.sent(), [3, 2]);
                          case 5:
                            return [2];
                        }
                      });
                    });
                  }),
                  (t.prototype.listenForUserAction = function () {
                    var e = this;
                    document.addEventListener(
                      `pointerdown`,
                      function () {
                        return c(e, void 0, void 0, function () {
                          return l(this, function (e) {
                            return (this.enableAudio(), [2]);
                          });
                        });
                      },
                      { once: !0 },
                    );
                  }),
                  (t.prototype.establishAudio = function () {
                    return c(this, void 0, void 0, function () {
                      return l(this, function (e) {
                        return (this._establishAudio(), [2]);
                      });
                    });
                  }),
                  Object.defineProperty(t.prototype, "systemVolume", {
                    get: function () {
                      return this._status === z.UNAVAILABLE
                        ? (this.testAudio(), 0)
                        : 1;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(t.prototype, "status", {
                    get: function () {
                      return this._status;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  t
                );
              })(R))(),
              ie = (function () {
                function e() {}
                return (
                  (e.prototype.observe = function () {}),
                  (e.prototype.unobserve = function () {}),
                  (e.prototype.disconnect = function () {}),
                  e
                );
              })(),
              ae = globalThis.ResizeObserver || ie,
              oe = new ((function () {
                function e() {
                  var e = this;
                  ((this._elementsMap = new Map()),
                    (this._onObservedEntry = function (t) {
                      var n = e._elementsMap.get(t.target);
                      n === null
                        ? e._resizeObserver.unobserve(t.target)
                        : n.onResize(
                            t.target.clientWidth == 0 ||
                              t.target.clientHeight == 0,
                          );
                    }),
                    (this._onObserved = function (t) {
                      t.forEach(e._onObservedEntry);
                    }),
                    (this._resizeObserver = new ae(this._onObserved)));
                }
                return (
                  (e.prototype.add = function (e, t) {
                    var n = { onResize: t, element: e };
                    return (
                      this._elementsMap.set(e, n),
                      this._resizeObserver.observe(e),
                      n
                    );
                  }),
                  (e.prototype.remove = function (e) {
                    (this._resizeObserver.unobserve(e.element),
                      this._elementsMap.delete(e.element));
                  }),
                  e
                );
              })())(),
              B = 0,
              se = function (e) {
                var t = e.stateMachine,
                  n = e.animations,
                  r = e.stateMachines;
                return (
                  n !== void 0 &&
                    I(
                      j.animationsParam,
                      "The `animations` parameter is deprecated and will be removed in a future major version: please use the `stateMachine` parameter to play a state machine instead.",
                    ),
                  r !== void 0 &&
                    I(
                      j.stateMachinesParam,
                      "The `stateMachines` parameter is deprecated: please use `stateMachine` with a single state machine name instead.",
                    ),
                  t
                    ? {
                        startingAnimationNames: [],
                        startingStateMachineNames: [t],
                      }
                    : {
                        startingAnimationNames: G(n),
                        startingStateMachineNames: G(r),
                      }
                );
              },
              ce = (function () {
                function e(e) {
                  ((this.enableRiveAssetCDN = !0),
                    (this.enablePerfMarks = !1),
                    (this.referenceCount = 0),
                    (this.destroyed = !1),
                    (this.selfUnref = !1),
                    (this.bindableArtboards = []),
                    (this.deferred = !1),
                    (this.session = null),
                    (this._sessionClaimed = !1),
                    (this.fileFinalizer = null),
                    (this.boundElsewhereWarned = !1),
                    (this.src = e.src),
                    (this.buffer = e.buffer),
                    (this.deferred = !!e.enableGPUCanvas),
                    e.assetLoader && (this.assetLoader = e.assetLoader),
                    (this.enableRiveAssetCDN =
                      typeof e.enableRiveAssetCDN != `boolean` ||
                      e.enableRiveAssetCDN),
                    (this.enablePerfMarks = !!e.enablePerfMarks),
                    this.enablePerfMarks &&
                      (t.RuntimeLoader.enablePerfMarks = !0),
                    (this.eventManager = new R()),
                    e.onLoad && this.on(T.Load, e.onLoad),
                    e.onLoadError && this.on(T.LoadError, e.onLoadError));
                }
                return (
                  (e.prototype.releaseFile = function () {
                    var e, t;
                    ((e = this.fileFinalizer) == null || e.release(),
                      (t = this.file) == null || t.unref(),
                      (this.fileFinalizer = null),
                      (this.file = null));
                  }),
                  (e.prototype.releaseSession = function () {
                    var e;
                    ((e = this.session) == null || e.delete(),
                      (this.session = null));
                  }),
                  (e.prototype.releaseBindableArtboards = function () {
                    this.bindableArtboards.forEach(function (e) {
                      return e.destroy();
                    });
                  }),
                  (e.prototype.initData = function () {
                    return c(this, void 0, void 0, function () {
                      var t, n, r, i, o, s, c;
                      return l(this, function (l) {
                        switch (l.label) {
                          case 0:
                            if (!(this.src && !this.buffer)) return [3, 4];
                            l.label = 1;
                          case 1:
                            return (
                              l.trys.push([1, 3, , 4]),
                              (t = this),
                              [4, Se(this.src)]
                            );
                          case 2:
                            return ((t.buffer = l.sent()), [3, 4]);
                          case 3:
                            throw (
                              (n = l.sent()),
                              n instanceof Error
                                ? n
                                : new d(e.fileLoadErrorMessage)
                            );
                          case 4:
                            if (this.destroyed) return [2];
                            (this.deferred &&
                              this.session === null &&
                              (this.session = e.makeDeferredSession(
                                this.runtime,
                              )),
                              this.assetLoader &&
                                ((i = new a.CustomFileAssetLoaderWrapper(
                                  this.runtime,
                                  this.assetLoader,
                                  this.session,
                                )),
                                (r = i.assetLoader)),
                              this.enablePerfMarks &&
                                performance.mark(`rive:file-load:start`),
                              (l.label = 5));
                          case 5:
                            return (
                              l.trys.push([5, 7, , 8]),
                              (o = this),
                              [
                                4,
                                this.runtime.load(
                                  new Uint8Array(this.buffer),
                                  r,
                                  this.enableRiveAssetCDN,
                                  this.session,
                                ),
                              ]
                            );
                          case 6:
                            return ((o.file = l.sent()), [3, 8]);
                          case 7:
                            throw ((s = l.sent()), this.releaseSession(), s);
                          case 8:
                            return (
                              this.enablePerfMarks &&
                                (performance.mark(`rive:file-load:end`),
                                performance.measure(
                                  `rive:file-load`,
                                  `rive:file-load:start`,
                                  `rive:file-load:end`,
                                )),
                              this.destroyed
                                ? (this.releaseFile(),
                                  this.releaseSession(),
                                  [2])
                                : this.file === null
                                  ? (this.releaseSession(),
                                    this.fireLoadError(e.fileLoadErrorMessage),
                                    [2])
                                  : ((c = new a.FileFinalizer(
                                      this.file,
                                      this.session,
                                    )),
                                    (this.fileFinalizer = c),
                                    a.finalizationRegistry.register(this, c),
                                    this.eventManager.fire({
                                      type: T.Load,
                                      data: this,
                                    }),
                                    [2])
                            );
                        }
                      });
                    });
                  }),
                  (e.prototype.loadRiveFileBytes = function () {
                    return c(this, void 0, void 0, function () {
                      var e;
                      return l(this, function (t) {
                        return (
                          this.enablePerfMarks &&
                            performance.mark(`rive:fetch-riv:start`),
                          (e = this.src
                            ? Se(this.src)
                            : Promise.resolve(this.buffer)),
                          this.enablePerfMarks &&
                            this.src &&
                            e.then(function () {
                              (performance.mark(`rive:fetch-riv:end`),
                                performance.measure(
                                  `rive:fetch-riv`,
                                  `rive:fetch-riv:start`,
                                  `rive:fetch-riv:end`,
                                ));
                            }),
                          [2, e]
                        );
                      });
                    });
                  }),
                  (e.prototype.loadRuntime = function () {
                    return c(this, void 0, void 0, function () {
                      var e;
                      return l(this, function (n) {
                        return (
                          this.enablePerfMarks &&
                            performance.mark(`rive:await-wasm:start`),
                          (e = t.RuntimeLoader.awaitInstance()),
                          this.enablePerfMarks &&
                            e.then(function () {
                              (performance.mark(`rive:await-wasm:end`),
                                performance.measure(
                                  `rive:await-wasm`,
                                  `rive:await-wasm:start`,
                                  `rive:await-wasm:end`,
                                ));
                            }),
                          [2, e]
                        );
                      });
                    });
                  }),
                  (e.prototype.init = function () {
                    return c(this, void 0, void 0, function () {
                      var t, n, r, i;
                      return l(this, function (a) {
                        switch (a.label) {
                          case 0:
                            if (!this.src && !this.buffer)
                              return (
                                this.fireLoadError(e.missingErrorMessage),
                                [2]
                              );
                            a.label = 1;
                          case 1:
                            return (
                              a.trys.push([1, 4, , 5]),
                              [
                                4,
                                Promise.all([
                                  this.loadRiveFileBytes(),
                                  this.loadRuntime(),
                                ]),
                              ]
                            );
                          case 2:
                            return (
                              (t = a.sent()),
                              (n = t[0]),
                              (r = t[1]),
                              this.destroyed
                                ? [2]
                                : ((this.buffer = n),
                                  (this.runtime = r),
                                  this.enablePerfMarks &&
                                    performance.mark(`rive:init-data:start`),
                                  [4, this.initData()])
                            );
                          case 3:
                            return (
                              a.sent(),
                              this.enablePerfMarks &&
                                (performance.mark(`rive:init-data:end`),
                                performance.measure(
                                  `rive:init-data`,
                                  `rive:init-data:start`,
                                  `rive:init-data:end`,
                                )),
                              [3, 5]
                            );
                          case 4:
                            return (
                              (i = a.sent()),
                              this.fireLoadError(
                                i instanceof Error
                                  ? i.message
                                  : e.fileLoadErrorMessage,
                              ),
                              [3, 5]
                            );
                          case 5:
                            return [2];
                        }
                      });
                    });
                  }),
                  (e.prototype.fireLoadError = function (e) {
                    throw (
                      this.eventManager.fire({ type: T.LoadError, data: e }),
                      new d(e)
                    );
                  }),
                  (e.prototype.on = function (e, t) {
                    this.eventManager.add({ type: e, callback: t });
                  }),
                  (e.prototype.off = function (e, t) {
                    this.eventManager.remove({ type: e, callback: t });
                  }),
                  (e.prototype.cleanup = function () {
                    (--this.referenceCount,
                      this.referenceCount <= 0 &&
                        (this.removeAllRiveEventListeners(),
                        this.releaseFile(),
                        this.releaseBindableArtboards(),
                        this.releaseSession(),
                        (this.destroyed = !0)));
                  }),
                  (e.makeDeferredSession = function (t) {
                    var n = t.makeDeferredSession?.call(t) ?? null;
                    return (
                      n === null &&
                        !e.deferredUnsupportedWarned &&
                        ((e.deferredUnsupportedWarned = !0),
                        console.warn(
                          "Rive: `enableGPUCanvas: true` was ignored because this runtime build has no GPU Canvas support; importing in immediate mode. Use a @rive-app/webgl2 or @rive-app/canvas build with deferred rendering compiled in.",
                        )),
                      n
                    );
                  }),
                  Object.defineProperty(e.prototype, "deferredSession", {
                    get: function () {
                      return this.session;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "deferredRequested", {
                    get: function () {
                      return this.deferred;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "sessionClaimed", {
                    get: function () {
                      return this._sessionClaimed;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.claimSession = function () {
                    this._sessionClaimed = !0;
                  }),
                  (e.prototype.warnBoundElsewhereOnce = function () {
                    this.boundElsewhereWarned ||
                      ((this.boundElsewhereWarned = !0),
                      console.warn(
                        `Rive: this deferred RiveFile is already bound to another Rive instance's canvas, and a deferred session cannot span canvases. Re-importing the file for this instance (an extra parse of the retained buffer, no extra network request).`,
                      ));
                  }),
                  (e.prototype.reimport = function (t) {
                    return c(this, void 0, void 0, function () {
                      var n;
                      return l(this, function (r) {
                        switch (r.label) {
                          case 0:
                            return (
                              (n = new e({
                                buffer: this.buffer,
                                assetLoader: this.assetLoader,
                                enableRiveAssetCDN: this.enableRiveAssetCDN,
                                enablePerfMarks: this.enablePerfMarks,
                                enableGPUCanvas: t,
                              })),
                              [4, n.init()]
                            );
                          case 1:
                            return (r.sent(), [2, n]);
                        }
                      });
                    });
                  }),
                  (e.prototype.removeAllRiveEventListeners = function (e) {
                    this.eventManager.removeAll(e);
                  }),
                  (e.prototype.getInstance = function () {
                    if (this.file !== null)
                      return ((this.referenceCount += 1), this.file);
                  }),
                  (e.prototype.destroyIfUnused = function () {
                    this.referenceCount <= 0 && this.cleanup();
                  }),
                  (e.prototype.createBindableArtboard = function (e) {
                    if (e != null) {
                      var t = new S(e);
                      return (
                        (0, a.createFinalization)(t, t.nativeArtboard),
                        this.bindableArtboards.push(t),
                        t
                      );
                    }
                    return null;
                  }),
                  (e.prototype.getArtboard = function (e) {
                    var t = this.file.artboardByName(e);
                    if (t != null) return new x(t, this);
                  }),
                  (e.prototype.getBindableArtboard = function (e) {
                    var t = this.file.bindableArtboardByName(e);
                    return this.createBindableArtboard(t);
                  }),
                  (e.prototype.getDefaultBindableArtboard = function () {
                    var e = this.file.bindableArtboardDefault();
                    return this.createBindableArtboard(e);
                  }),
                  (e.prototype.internalBindableArtboardFromArtboard = function (
                    e,
                  ) {
                    var t = this.file.internalBindableArtboardFromArtboard(e);
                    return this.createBindableArtboard(t);
                  }),
                  (e.prototype.viewModelByName = function (e) {
                    var t = this.file.viewModelByName(e);
                    return t === null ? null : new de(t);
                  }),
                  (e.prototype.globalViewModelNames = function () {
                    return this.file.globalViewModelNames();
                  }),
                  (e.missingErrorMessage = `Rive source file or data buffer required`),
                  (e.fileLoadErrorMessage = `The file failed to load`),
                  (e.deferredUnsupportedWarned = !1),
                  e
                );
              })(),
              le = (function () {
                function e(e) {
                  var n = this;
                  ((this.loaded = !1),
                    (this.destroyed = !1),
                    (this._observed = null),
                    (this.readyForPlaying = !1),
                    (this.deferredRenderer = !1),
                    (this.ownsRiveFile = !1),
                    (this.artboard = null),
                    (this.eventCleanup = null),
                    (this._keyboardInteractions = null),
                    (this.shouldDisableRiveListeners = !1),
                    (this.automaticallyHandleEvents = !1),
                    (this.dispatchPointerExit = !0),
                    (this.enableMultiTouch = !1),
                    (this.enableRiveAssetCDN = !0),
                    (this.semanticsMode = i.SemanticMode.Disabled),
                    (this.semanticsOptions = {
                      riveCanvasLabel: `Rive animation`,
                    }),
                    (this._semanticsActive = !1),
                    (this._volume = 1),
                    (this._artboardWidth = void 0),
                    (this._artboardHeight = void 0),
                    (this._devicePixelRatioUsed = 1),
                    (this._hasZeroSize = !1),
                    (this._needsRedraw = !1),
                    (this._currentCanvasWidth = 0),
                    (this._currentCanvasHeight = 0),
                    (this._audioEventListener = null),
                    (this._boundDraw = null),
                    (this._pageVisibilityHandler = null),
                    (this._explicitlyStoppedRendering = !1),
                    (this._viewModelInstance = null),
                    (this._globalViewModelInstances = new Map()),
                    (this._dataEnums = null),
                    (this._tabIndex = null),
                    (this._prevHasFocus = !1),
                    (this._focusOptions = { allowFocusInterrupt: !1 }),
                    (this._semanticTree = null),
                    (this._accessibilityOverlay = null),
                    (this._overlayTransformDirty = !0),
                    (this._instanceId = `${B++}`),
                    (this.drawOptimization = h.DrawOnChanged),
                    (this.enablePerfMarks = !1),
                    (this.durations = []),
                    (this.frameTimes = []),
                    (this.frameCount = 0),
                    (this.isTouchScrollEnabled = !1),
                    (this.onCanvasResize = function (e) {
                      var t = n._hasZeroSize !== e;
                      ((n._hasZeroSize = e),
                        e
                          ? (!n._layout.maxX || !n._layout.maxY) &&
                            n.resizeToCanvas()
                          : t && n.resizeDrawingSurfaceToCanvas());
                    }),
                    (this.frameRequestId = null),
                    (this.renderSecondTimer = 0),
                    (this._boundDraw = this.draw.bind(this)),
                    typeof document < `u` &&
                      ((this._pageVisibilityHandler =
                        this._onPageVisibilityChange.bind(this)),
                      document.addEventListener(
                        `visibilitychange`,
                        this._pageVisibilityHandler,
                      )),
                    (this.canvas = e.canvas),
                    e.canvas.constructor === HTMLCanvasElement &&
                      (this._observed = oe.add(
                        this.canvas,
                        this.onCanvasResize,
                      )),
                    (this._currentCanvasWidth = this.canvas.width),
                    (this._currentCanvasHeight = this.canvas.height),
                    (this.src = e.src),
                    (this.buffer = e.buffer),
                    (this.riveFile = e.riveFile),
                    (this.layout = e.layout ?? new g()),
                    (this.shouldDisableRiveListeners =
                      !!e.shouldDisableRiveListeners),
                    (this.isTouchScrollEnabled = !!e.isTouchScrollEnabled),
                    e.automaticallyHandleEvents &&
                      I(
                        j.riveEvents,
                        "The `automaticallyHandleEvents` parameter is deprecated. " +
                          E,
                      ),
                    (this.automaticallyHandleEvents =
                      !!e.automaticallyHandleEvents),
                    (this.dispatchPointerExit =
                      e.dispatchPointerExit === !1
                        ? e.dispatchPointerExit
                        : this.dispatchPointerExit),
                    (this.enableMultiTouch = !!e.enableMultiTouch),
                    (this.drawOptimization =
                      e.drawingOptions ?? this.drawOptimization),
                    (this.enableRiveAssetCDN =
                      e.enableRiveAssetCDN === void 0 || e.enableRiveAssetCDN),
                    (this.enablePerfMarks = !!e.enablePerfMarks),
                    this.enablePerfMarks &&
                      (t.RuntimeLoader.enablePerfMarks = !0),
                    (this._focusOptions = e.focusOptions ?? this._focusOptions),
                    (this._tabIndex = e.tabIndex ?? null),
                    (this.deferredRenderer = !!e.enableGPUCanvas),
                    (this.eventManager = new R()),
                    e.onLoad && this.on(T.Load, e.onLoad),
                    e.onLoadError && this.on(T.LoadError, e.onLoadError),
                    e.onPlay && this.on(T.Play, e.onPlay),
                    e.onPause && this.on(T.Pause, e.onPause),
                    e.onStop && this.on(T.Stop, e.onStop),
                    e.onLoop && this.on(T.Loop, e.onLoop),
                    e.onStateChange && this.on(T.StateChange, e.onStateChange),
                    e.onAdvance && this.on(T.Advance, e.onAdvance),
                    e.onload && !e.onLoad && this.on(T.Load, e.onload),
                    e.onloaderror &&
                      !e.onLoadError &&
                      this.on(T.LoadError, e.onloaderror),
                    e.onplay && !e.onPlay && this.on(T.Play, e.onplay),
                    e.onpause && !e.onPause && this.on(T.Pause, e.onpause),
                    e.onstop && !e.onStop && this.on(T.Stop, e.onstop),
                    e.onloop && !e.onLoop && this.on(T.Loop, e.onloop),
                    e.onstatechange &&
                      !e.onStateChange &&
                      this.on(T.StateChange, e.onstatechange),
                    e.assetLoader && (this.assetLoader = e.assetLoader),
                    (this.taskQueue = new ne(this.eventManager)),
                    this.init({
                      src: this.src,
                      buffer: this.buffer,
                      riveFile: this.riveFile,
                      autoplay: e.autoplay,
                      autoBind: e.autoBind,
                      stateMachine: e.stateMachine,
                      animations: e.animations,
                      stateMachines: e.stateMachines,
                      artboard: e.artboard,
                      useOffscreenRenderer: e.useOffscreenRenderer,
                      tabIndex: e.tabIndex,
                      semanticsMode: e.semanticsMode,
                      semanticsOptions: e.semanticsOptions,
                      enableGPUCanvas: this.deferredRenderer,
                    }));
                }
                return (
                  Object.defineProperty(e, "suppressDeprecationWarnings", {
                    get: function () {
                      return Object.freeze(Array.from(N));
                    },
                    set: function (e) {
                      P(e);
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "viewModelCount", {
                    get: function () {
                      return this.file.viewModelCount();
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.new = function (t) {
                    return (
                      I(
                        j.legacyConstructors,
                        "This function is deprecated: please use `new Rive({})` instead",
                      ),
                      new e(t)
                    );
                  }),
                  (e.prototype.enableSemantics = function () {
                    ((this.semanticsMode = i.SemanticMode.Enabled),
                      this.activateSemantics());
                  }),
                  (e.prototype.activateSemantics = function () {
                    this._semanticsActive ||
                      this.semanticsMode === i.SemanticMode.Disabled ||
                      ((this._semanticsActive = !0),
                      this.syncSemanticsOnStateMachines());
                  }),
                  (e.prototype.syncSemanticsOnStateMachines = function () {
                    if (!(!this._semanticsActive || !this.animator))
                      for (
                        var e = 0, t = this.animator.stateMachines;
                        e < t.length;
                        e++
                      )
                        t[e].enableSemantics();
                  }),
                  (e.prototype.cleanupSemantics = function () {
                    ((this._semanticTree = null),
                      (this._accessibilityOverlay &&=
                        (this._accessibilityOverlay.destroy(), null)));
                  }),
                  (e.prototype.onSystemAudioChanged = function () {
                    this.volume = this._volume;
                  }),
                  (e.prototype.init = function (n) {
                    var r = this,
                      a,
                      o,
                      s,
                      c,
                      l,
                      u = n.src,
                      f = n.buffer,
                      p = n.riveFile,
                      m = n.stateMachine,
                      h = n.animations,
                      g = n.stateMachines,
                      _ = n.artboard,
                      v = n.autoplay,
                      y = v !== void 0 && v,
                      b = n.useOffscreenRenderer,
                      x = b !== void 0 && b,
                      S = n.autoBind,
                      C = S !== void 0 && S,
                      w = n.tabIndex,
                      E = n.semanticsMode,
                      D = n.semanticsOptions,
                      O = n.enableGPUCanvas;
                    if (!this.destroyed) {
                      if (!u && !f && !p) throw new d(e.missingErrorMessage);
                      ((this.artboard &&=
                        ((o = (a = this.renderer)?.bindContext) == null ||
                          o.call(a),
                        (s = this.animator) == null || s.stop(),
                        this.artboard.delete(),
                        null)),
                        this.renderer &&
                          ((l = (c = this.renderer).detachSession) == null ||
                            l.call(c)),
                        this.releaseCurrentRiveFile(!1),
                        (this.src = u),
                        (this.buffer = f),
                        (this.riveFile = p),
                        (this.ownsRiveFile = !1),
                        (this.deferredRenderer = O ?? this.deferredRenderer),
                        (this._tabIndex = w ?? null),
                        (this.semanticsMode = E ?? i.SemanticMode.Disabled),
                        (this.semanticsOptions = D ?? this.semanticsOptions));
                      var k = se({
                          stateMachine: m,
                          animations: h,
                          stateMachines: g,
                        }),
                        A = k.startingAnimationNames,
                        j = k.startingStateMachineNames;
                      ((this.loaded = !1),
                        (this.readyForPlaying = !1),
                        t.RuntimeLoader.awaitInstance()
                          .then(function (e) {
                            if (!r.destroyed) {
                              ((r.runtime = e),
                                r.removeRiveListeners(),
                                r.cleanupSemantics(),
                                r.deleteRiveRenderer(),
                                r.enablePerfMarks &&
                                  performance.mark(`rive:make-renderer:start`));
                              try {
                                if (
                                  ((r.renderer = r.runtime.makeRenderer(
                                    r.canvas,
                                    x,
                                  )),
                                  !r.renderer)
                                )
                                  throw Error(
                                    `Renderer is null, cannot render Rive on the canvas.`,
                                  );
                              } catch (e) {
                                throw (
                                  console.error(e),
                                  new d(
                                    `Unable to create the renderer, your environment may not support WebGL. Try the @rive-app/canvas runtime as an alternative.`,
                                  )
                                );
                              }
                              (r.enablePerfMarks &&
                                (performance.mark(`rive:make-renderer:end`),
                                performance.measure(
                                  `rive:make-renderer`,
                                  `rive:make-renderer:start`,
                                  `rive:make-renderer:end`,
                                )),
                                r.canvas.width ||
                                  r.canvas.height ||
                                  r.resizeDrawingSurfaceToCanvas(),
                                r
                                  .initData(_, A, j, y, C)
                                  .then(function (e) {
                                    if (e) return r.setupRiveListeners();
                                  })
                                  .catch(function (e) {
                                    console.error(e);
                                  }));
                            }
                          })
                          .catch(function (e) {
                            r.eventManager.fire({
                              type: T.LoadError,
                              data: e.message,
                            });
                          }));
                    }
                  }),
                  (e.prototype.setupRiveListeners = function (e) {
                    var t = this;
                    if (
                      (this.eventCleanup && this.eventCleanup(),
                      this.cleanupKeyboardInteractions(),
                      !this.shouldDisableRiveListeners)
                    ) {
                      var n = this.animator.stateMachines
                          .filter(function (e) {
                            return e.playing;
                          })
                          .filter(function (e) {
                            return t.runtime.hasListeners(e.instance);
                          })
                          .map(function (e) {
                            return e.instance;
                          }),
                        r = this.isTouchScrollEnabled,
                        i = this.dispatchPointerExit,
                        o = this.enableMultiTouch;
                      (e &&
                        `isTouchScrollEnabled` in e &&
                        (r = e.isTouchScrollEnabled),
                        (this.eventCleanup = (0, a.registerTouchInteractions)({
                          canvas: this.canvas,
                          artboard: this.artboard,
                          stateMachines: n,
                          renderer: this.renderer,
                          rive: this.runtime,
                          fit: this._layout.runtimeFit(this.runtime),
                          alignment: this._layout.runtimeAlignment(
                            this.runtime,
                          ),
                          isTouchScrollEnabled: r,
                          dispatchPointerExit: i,
                          enableMultiTouch: o,
                          layoutScaleFactor: this._layout.layoutScaleFactor,
                          advanceAndDrain:
                            this.advanceAndReportChanges.bind(this),
                        })),
                        this.ensureKeyboardInteractions());
                    }
                  }),
                  (e.prototype.ensureKeyboardInteractions = function () {
                    var e = this;
                    if (!(
                      this._keyboardInteractions ||
                      this.shouldDisableRiveListeners ||
                      typeof window > `u` ||
                      !(this.canvas instanceof HTMLCanvasElement)
                    )) {
                      var t = this.animator.stateMachines.find(function (e) {
                        return e.playing && e.hasFocusNodes;
                      });
                      if (t) {
                        var n = this.canvas.tabIndex;
                        ((n === -1 || isNaN(n)) &&
                          (this.canvas.tabIndex =
                            this._tabIndex === null ? 0 : this._tabIndex),
                          (this._keyboardInteractions =
                            new a.KeyboardInteractions({
                              canvas: this.canvas,
                              stateMachine: t.instance,
                              hasFocusNodes: !0,
                              getOverlayElement: function () {
                                return (
                                  e._accessibilityOverlay?.getSemanticOverlayContainer() ??
                                  null
                                );
                              },
                            })));
                      }
                    }
                  }),
                  (e.prototype.cleanupKeyboardInteractions = function () {
                    this._keyboardInteractions &&=
                      (this._keyboardInteractions.cleanup(), null);
                  }),
                  (e.prototype.removeRiveListeners = function () {
                    ((this.eventCleanup &&= (this.eventCleanup(), null)),
                      this.cleanupKeyboardInteractions());
                  }),
                  (e.prototype.initializeAudio = function () {
                    var e = this;
                    re.status == z.UNAVAILABLE &&
                      (this.file.hasAudio ||
                        (this.artboard?.hasAudio &&
                          this._audioEventListener === null)) &&
                      ((this._audioEventListener = {
                        type: T.AudioStatusChange,
                        callback: function () {
                          return e.onSystemAudioChanged();
                        },
                      }),
                      re.add(this._audioEventListener),
                      re.establishAudio());
                  }),
                  (e.prototype.initArtboardSize = function () {
                    this.artboard &&
                      ((this._artboardWidth = this.artboard.width =
                        this._artboardWidth || this.artboard.width),
                      (this._artboardHeight = this.artboard.height =
                        this._artboardHeight || this.artboard.height));
                  }),
                  (e.prototype.initData = function (e, t, n, r, a) {
                    return c(this, void 0, void 0, function () {
                      var o, s, c, u;
                      return l(this, function (l) {
                        switch (l.label) {
                          case 0:
                            return (
                              l.trys.push([0, 5, , 6]),
                              (this.ownsRiveFile = this.riveFile == null),
                              this.ownsRiveFile
                                ? ((o = new ce({
                                    src: this.src,
                                    buffer: this.buffer,
                                    enableRiveAssetCDN: this.enableRiveAssetCDN,
                                    assetLoader: this.assetLoader,
                                    enablePerfMarks: this.enablePerfMarks,
                                    enableGPUCanvas: this.deferredRenderer,
                                  })),
                                  (this.riveFile = o),
                                  [4, o.init()])
                                : [3, 2]
                            );
                          case 1:
                            if ((l.sent(), this.destroyed))
                              return (o.destroyIfUnused(), [2, !1]);
                            l.label = 2;
                          case 2:
                            return this.riveFile.deferredSession !== null ||
                              this.deferredRenderer
                              ? [4, this.resolveDeferredRendering()]
                              : [3, 4];
                          case 3:
                            if ((l.sent(), this.destroyed))
                              return (
                                this.ownsRiveFile &&
                                  ((u = this.riveFile) == null ||
                                    u.destroyIfUnused()),
                                [2, !1]
                              );
                            l.label = 4;
                          case 4:
                            ((this.file = this.riveFile.getInstance()),
                              this.initArtboard(e, t, n, r, a),
                              this.initArtboardSize(),
                              this.initializeAudio(),
                              this.semanticsMode === i.SemanticMode.Enabled
                                ? this.activateSemantics()
                                : this._semanticsActive &&
                                  this.syncSemanticsOnStateMachines());
                            try {
                              ((this.loaded = !0),
                                this.eventManager.fire({
                                  type: T.Load,
                                  data: this.src ?? `buffer`,
                                }));
                            } catch (e) {
                              console.error(e);
                            }
                            return (
                              this.animator.advanceIfPaused(),
                              (this.readyForPlaying = !0),
                              this.taskQueue.process(),
                              this.drawFrame(),
                              [2, !0]
                            );
                          case 5:
                            return (
                              (s = l.sent()),
                              (c = f(s)),
                              this.eventManager.fire({
                                type: T.LoadError,
                                data: c,
                              }),
                              [2, Promise.reject(c)]
                            );
                          case 6:
                            return [2];
                        }
                      });
                    });
                  }),
                  (e.prototype.resolveDeferredRendering = function () {
                    return c(this, void 0, void 0, function () {
                      var e, t, n, r, i, a, o, s, c, u;
                      return l(this, function (l) {
                        switch (l.label) {
                          case 0:
                            return (
                              (e = this.riveFile),
                              (t = this.ownsRiveFile),
                              (n = this.renderer),
                              (r = e.deferredSession),
                              r === null
                                ? (this.deferredRenderer &&
                                    !e.deferredRequested &&
                                    console.warn(
                                      "Rive: `enableGPUCanvas: true` was ignored because this RiveFile was imported without it. The mode is fixed at import: construct the RiveFile with `enableGPUCanvas: true` to opt in.",
                                    ),
                                  [2])
                                : (this.deferredRenderer ||
                                    console.warn(
                                      "Rive: this RiveFile was imported with `enableGPUCanvas: true`, so this instance renders deferred even though `enableGPUCanvas` is false on the instance. An immediate renderer would drop the file's deferred resources and draw nothing.",
                                    ),
                                  (i = n?.attachSession),
                                  typeof i == `function`
                                    ? [3, 2]
                                    : (console.warn(
                                        "Rive: this renderer cannot replay a deferred session (`useOffscreenRenderer` is not supported with deferred rendering). Re-importing the file in immediate mode for this instance.",
                                      ),
                                      [4, e.reimport(!1)]))
                            );
                          case 1:
                            return (
                              (a = l.sent()),
                              this.destroyed
                                ? (a.destroyIfUnused(), [2])
                                : ((this.riveFile = a),
                                  (this.ownsRiveFile = !0),
                                  t && e.destroyIfUnused(),
                                  [2])
                            );
                          case 2:
                            return !e.sessionClaimed && i.call(n, r)
                              ? (e.claimSession(), [2])
                              : (e.warnBoundElsewhereOnce(),
                                [4, e.reimport(!0)]);
                          case 3:
                            return (
                              (o = l.sent()),
                              this.destroyed
                                ? (o.destroyIfUnused(), [2])
                                : ((this.riveFile = o),
                                  (this.ownsRiveFile = !0),
                                  (s = o.deferredSession),
                                  s !== null && i.call(n, s)
                                    ? (o.claimSession(), [2])
                                    : (console.warn(
                                        `Rive: could not attach the re-imported file's deferred session to this canvas; falling back to immediate rendering for this instance.`,
                                      ),
                                      (u = n.detachSession) == null ||
                                        u.call(n),
                                      [4, e.reimport(!1)]))
                            );
                          case 4:
                            return (
                              (c = l.sent()),
                              o.destroyIfUnused(),
                              this.destroyed
                                ? (c.destroyIfUnused(), [2])
                                : ((this.riveFile = c),
                                  (this.ownsRiveFile = !0),
                                  t && e.destroyIfUnused(),
                                  [2])
                            );
                        }
                      });
                    });
                  }),
                  (e.prototype.initArtboard = function (e, t, n, r, i) {
                    if (this.file) {
                      var o = e
                        ? this.file.artboardByName(e)
                        : this.file.defaultArtboard();
                      if (!o)
                        throw new d(
                          `Invalid artboard name or no default artboard`,
                        );
                      ((this.artboard = o),
                        (o.volume = this._volume * re.systemVolume),
                        (this.animator = new w(
                          this.runtime,
                          this.artboard,
                          this.eventManager,
                        )));
                      var s;
                      if (
                        (t.length > 0 || n.length > 0
                          ? ((s = t.concat(n)),
                            this.animator.initLinearAnimations(t, r),
                            this.animator.initStateMachines(
                              n,
                              r,
                              this._semanticsActive,
                            ))
                          : (s = [
                              this.animator.atLeastOne(
                                r,
                                !1,
                                this._semanticsActive,
                              ),
                            ]),
                        this.taskQueue.add({
                          event: { type: r ? T.Play : T.Pause, data: s },
                        }),
                        i)
                      ) {
                        var c = this.file.defaultArtboardViewModel(o);
                        if (c !== null) {
                          var l = c.defaultInstance();
                          if (l !== null) {
                            var u = new H(l, null);
                            ((0, a.createFinalization)(u, u.runtimeInstance),
                              this.setViewModelInstance(u));
                          }
                        }
                        for (
                          var f = 0, p = this.file.globalViewModelNames();
                          f < p.length;
                          f++
                        ) {
                          var m = p[f],
                            h = this.file.viewModelByName(m);
                          if (h !== null) {
                            var g = new de(h).defaultInstance();
                            g !== null && this.setGlobalViewModelInstance(m, g);
                          }
                        }
                        this.bind();
                      }
                    }
                  }),
                  (e.prototype.drawFrame = function () {
                    var e;
                    (document == null ? void 0 : document.timeline)?.currentTime
                      ? this.loaded &&
                        this.artboard &&
                        !this.frameRequestId &&
                        (this._boundDraw(document.timeline.currentTime),
                        (e = this.runtime) == null || e.resolveAnimationFrame())
                      : this.scheduleRendering();
                  }),
                  (e.prototype._canvasSizeChanged = function () {
                    var e = !1;
                    return (
                      this.canvas &&
                        (this.canvas.width !== this._currentCanvasWidth &&
                          ((this._currentCanvasWidth = this.canvas.width),
                          (e = !0)),
                        this.canvas.height !== this._currentCanvasHeight &&
                          ((this._currentCanvasHeight = this.canvas.height),
                          (e = !0))),
                      e
                    );
                  }),
                  (e.prototype._deferredWorkPending = function () {
                    return (
                      this.riveFile?.deferredSession?.recordedThisFrame() ?? !1
                    );
                  }),
                  (e.prototype.pollFocusState = function () {
                    if (
                      (this.ensureKeyboardInteractions(),
                      !this._keyboardInteractions)
                    ) {
                      this._prevHasFocus = !1;
                      return;
                    }
                    var e = this.animator.stateMachines.find(function (e) {
                      return e.playing && e.hasFocusNodes;
                    });
                    if (!e) {
                      this._prevHasFocus = !1;
                      return;
                    }
                    if (this.canvas instanceof HTMLCanvasElement) {
                      if (e.focusState().hasFocus) {
                        if (
                          (this._keyboardInteractions.notifyRiveFocused(),
                          !this._prevHasFocus)
                        ) {
                          var t =
                            this._accessibilityOverlay?.getSemanticOverlayContainer();
                          (!(
                            document.activeElement === this.canvas ||
                            (t?.contains(document.activeElement) ?? !1)
                          ) &&
                            this._focusOptions.allowFocusInterrupt &&
                            this.canvas.focus(),
                            (this._prevHasFocus = !0));
                        }
                        return;
                      }
                      ((this._prevHasFocus = !1),
                        this._keyboardInteractions.focusSessionState ===
                          a.FocusSessionState.RiveFocused &&
                          this._keyboardInteractions.setFocusSessionState(
                            a.FocusSessionState.NotFocused,
                          ));
                    }
                  }),
                  (e.prototype.advanceAndReportChanges = function (e) {
                    for (
                      var t,
                        n = this.animator.animations
                          .filter(function (e) {
                            return e.playing || e.needsScrub;
                          })
                          .sort(function (e) {
                            return e.needsScrub ? -1 : 1;
                          }),
                        r = 0,
                        o = n;
                      r < o.length;
                      r++
                    ) {
                      var s = o[r];
                      (s.advance(e),
                        s.instance.didLoop && (s.loopCount += 1),
                        s.apply(1));
                    }
                    for (
                      var c = this.animator.stateMachines.filter(function (e) {
                          return e.playing;
                        }),
                        l =
                          this.enablePerfMarks && this.frameCount < 3
                            ? this.frameCount
                            : -1,
                        u = 0,
                        d = c;
                      u < d.length;
                      u++
                    ) {
                      var f = d[u],
                        p = f.reportedEventCount();
                      if (p)
                        for (var m = 0; m < p; m++) {
                          var h = f.reportedEventAt(m);
                          if (h)
                            if (h.type === y.OpenUrl) {
                              if (
                                (this.eventManager.fire({
                                  type: T.RiveEvent,
                                  data: h,
                                }),
                                this.automaticallyHandleEvents)
                              ) {
                                var g = document.createElement(`a`),
                                  _ = h,
                                  v = _.url,
                                  b = _.target,
                                  x = (0, a.sanitizeUrl)(v);
                                (v && g.setAttribute(`href`, x),
                                  b && g.setAttribute(`target`, b),
                                  x && x !== a.BLANK_URL && g.click());
                              }
                            } else
                              this.eventManager.fire({
                                type: T.RiveEvent,
                                data: h,
                              });
                        }
                      if (
                        (l >= 0 &&
                          performance.mark(`rive:sm-advance:start:f${l}`),
                        f.advanceAndApply(e),
                        l >= 0 &&
                          (performance.mark(`rive:sm-advance:end:f${l}`),
                          performance.measure(
                            `rive:sm-advance:f${l}`,
                            `rive:sm-advance:start:f${l}`,
                            `rive:sm-advance:end:f${l}`,
                          )),
                        this._semanticsActive)
                      ) {
                        var S = f.drainSemanticsDiff();
                        S &&
                          ((this._semanticTree ||= new i.SemanticTreeModel()),
                          this._semanticTree.applyDiff(S));
                      }
                    }
                    if (
                      this._semanticsActive &&
                      this._semanticTree &&
                      c.length > 0 &&
                      this.canvas instanceof HTMLCanvasElement
                    ) {
                      if (!this._accessibilityOverlay) {
                        var C = c[0];
                        this._accessibilityOverlay = new i.AccessibilityOverlay(
                          {
                            canvas: this.canvas,
                            instanceId: this._instanceId,
                            semanticsOptions: this.semanticsOptions,
                            allowFocusInterrupt:
                              this._focusOptions.allowFocusInterrupt,
                            fireAction: function (e, t) {
                              C.fireSemanticAction(e, t);
                            },
                            requestFocus: function (e) {
                              return C.focusSemanticNode(e);
                            },
                            clearFocus: function () {
                              return C.instance.clearFocus();
                            },
                          },
                        );
                      }
                      var w = this._accessibilityOverlay?.needsUpdate(
                        this._semanticTree,
                      );
                      if (w || this._overlayTransformDirty) {
                        var E = null;
                        if (w?.layoutChanged || this._overlayTransformDirty) {
                          var D = this._layout.runtimeFit(this.runtime),
                            O = this._layout.runtimeAlignment(this.runtime);
                          ((E = this.runtime.computeAlignment(
                            D,
                            O,
                            {
                              minX: this._layout.minX,
                              minY: this._layout.minY,
                              maxX: this._layout.maxX,
                              maxY: this._layout.maxY,
                            },
                            this.artboard.bounds,
                            this._devicePixelRatioUsed *
                              this._layout.layoutScaleFactor,
                          )),
                            (this._overlayTransformDirty = !1));
                        }
                        (this._accessibilityOverlay.update(
                          this._semanticTree,
                          E,
                          this._devicePixelRatioUsed,
                          this.artboard.bounds,
                          w,
                        ),
                          E?.delete());
                      }
                    }
                    (this.animator.stateMachines.length == 0 &&
                      this.artboard.advance(e),
                      this.animator.handleLooping(),
                      this.animator.handleStateChanges(),
                      this.animator.handleAdvancing(e),
                      this.pollFocusState(),
                      (t = this._viewModelInstance) == null ||
                        t.handleCallbacks(),
                      this._globalViewModelInstances.forEach(function (e) {
                        e && e.handleCallbacks();
                      }));
                  }),
                  (e.prototype.draw = function (e, t) {
                    if (((this.frameRequestId = null), this.artboard)) {
                      var n = performance.now(),
                        r =
                          this.enablePerfMarks && this.frameCount < 3
                            ? this.frameCount
                            : -1;
                      ((this.lastRenderTime ||= e),
                        (this.renderSecondTimer += e - this.lastRenderTime),
                        this.renderSecondTimer > 5e3 &&
                          ((this.renderSecondTimer = 0), t?.()));
                      var i = (e - this.lastRenderTime) / 1e3;
                      ((this.lastRenderTime = e),
                        this.advanceAndReportChanges(i));
                      var a = this.renderer;
                      (this._hasZeroSize ||
                        ((this.drawOptimization == h.AlwaysDraw ||
                          this.artboard.didChange() ||
                          this._deferredWorkPending() ||
                          this._needsRedraw ||
                          this._canvasSizeChanged()) &&
                          (a.clear(),
                          a.save(),
                          r >= 0 &&
                            performance.mark(`rive:align-renderer:start:f${r}`),
                          this.alignRenderer(),
                          r >= 0 &&
                            (performance.mark(`rive:align-renderer:end:f${r}`),
                            performance.measure(
                              `rive:align-renderer:f${r}`,
                              `rive:align-renderer:start:f${r}`,
                              `rive:align-renderer:end:f${r}`,
                            )),
                          r >= 0 &&
                            performance.mark(`rive:artboard-draw:start:f${r}`),
                          this.artboard.draw(a),
                          r >= 0 &&
                            (performance.mark(`rive:artboard-draw:end:f${r}`),
                            performance.measure(
                              `rive:artboard-draw:f${r}`,
                              `rive:artboard-draw:start:f${r}`,
                              `rive:artboard-draw:end:f${r}`,
                            )),
                          a.restore(),
                          r >= 0 &&
                            performance.mark(`rive:renderer-flush:start:f${r}`),
                          a.flush(),
                          r >= 0 &&
                            (performance.mark(`rive:renderer-flush:end:f${r}`),
                            performance.measure(
                              `rive:renderer-flush:f${r}`,
                              `rive:renderer-flush:start:f${r}`,
                              `rive:renderer-flush:end:f${r}`,
                            )),
                          (this._needsRedraw = !1))),
                        this.frameCount++);
                      var o = performance.now();
                      for (
                        this.frameTimes.push(o), this.durations.push(o - n);
                        this.frameTimes[0] <= o - 1e3;
                      )
                        (this.frameTimes.shift(), this.durations.shift());
                      this.animator.isPlaying
                        ? this.scheduleRendering()
                        : (this.animator.isPaused || this.animator.isStopped) &&
                          (this.lastRenderTime = 0);
                    }
                  }),
                  (e.prototype.alignRenderer = function () {
                    var e = this,
                      t = e.renderer,
                      n = e.runtime,
                      r = e._layout,
                      i = e.artboard;
                    t.align(
                      r.runtimeFit(n),
                      r.runtimeAlignment(n),
                      {
                        minX: r.minX,
                        minY: r.minY,
                        maxX: r.maxX,
                        maxY: r.maxY,
                      },
                      i.bounds,
                      this._devicePixelRatioUsed * r.layoutScaleFactor,
                    );
                  }),
                  Object.defineProperty(e.prototype, "fps", {
                    get: function () {
                      return this.durations.length;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "frameTime", {
                    get: function () {
                      return this.durations.length === 0
                        ? 0
                        : (
                            this.durations.reduce(function (e, t) {
                              return e + t;
                            }, 0) / this.durations.length
                          ).toFixed(4);
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.cleanup = function () {
                    var e, t, n, r, i;
                    ((this.destroyed = !0),
                      this.stopRendering(),
                      (t = (e = this.renderer)?.bindContext) == null ||
                        t.call(e),
                      this.cleanupInstances(),
                      this._observed !== null && oe.remove(this._observed),
                      this.removeRiveListeners(),
                      this.renderer &&
                        ((r = (n = this.renderer).detachSession) == null ||
                          r.call(n)),
                      this.releaseCurrentRiveFile(!0),
                      (this.riveFile = null),
                      this.deleteRiveRenderer(),
                      this._audioEventListener !== null &&
                        (re.remove(this._audioEventListener),
                        (this._audioEventListener = null)),
                      (this._pageVisibilityHandler &&=
                        (document.removeEventListener(
                          `visibilitychange`,
                          this._pageVisibilityHandler,
                        ),
                        null)),
                      (i = this._viewModelInstance) == null || i.cleanup(),
                      (this._viewModelInstance = null),
                      this._globalViewModelInstances.forEach(function (e) {
                        return e.cleanup();
                      }),
                      this._globalViewModelInstances.clear(),
                      (this._dataEnums = null));
                  }),
                  (e.prototype.releaseCurrentRiveFile = function (e) {
                    var t, n;
                    this.file
                      ? ((e || this.ownsRiveFile) &&
                          ((t = this.riveFile) == null || t.cleanup()),
                        (this.file = null))
                      : this.ownsRiveFile &&
                        ((n = this.riveFile) == null || n.destroyIfUnused());
                  }),
                  (e.prototype.deleteRiveRenderer = function () {
                    var e, t;
                    (this.renderer &&
                      ((t = (e = this.renderer).detachSession) == null ||
                        t.call(e),
                      this.renderer.delete()),
                      (this.renderer = null));
                  }),
                  Object.defineProperty(e.prototype, "deferredRendererActive", {
                    get: function () {
                      var e;
                      return (e = this.renderer)?.deferredActive?.call(e) ?? !1;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.cleanupInstances = function () {
                    var e;
                    (this.eventCleanup !== null && this.eventCleanup(),
                      this.cleanupKeyboardInteractions(),
                      this.cleanupSemantics(),
                      (e = this.animator) == null || e.stop(),
                      (this.artboard &&= (this.artboard.delete(), null)));
                  }),
                  (e.prototype.retrieveTextRun = function (e) {
                    if (!e) {
                      console.warn(`No text run name provided`);
                      return;
                    }
                    if (!this.artboard) {
                      console.warn(
                        `Tried to access text run, but the Artboard is null`,
                      );
                      return;
                    }
                    var t = this.artboard.textRun(e);
                    if (!t) {
                      console.warn(
                        `Could not access a text run with name '${e}' in the '${this.artboard?.name}' Artboard. Note that you must rename a text run node in the Rive editor to make it queryable at runtime.`,
                      );
                      return;
                    }
                    return t;
                  }),
                  (e.prototype.getTextRunValue = function (e) {
                    I(j.textRuns, O);
                    var t = this.retrieveTextRun(e);
                    return t ? t.text : void 0;
                  }),
                  (e.prototype.setTextRunValue = function (e, t) {
                    I(j.textRuns, O);
                    var n = this.retrieveTextRun(e);
                    n && (n.text = t);
                  }),
                  (e.prototype.warnIfLinearAnimationNames = function (e, t) {
                    this.animator &&
                      this.animator.animations.some(function (t) {
                        return e.includes(t.name);
                      }) &&
                      te(t);
                  }),
                  (e.prototype.play = function (e, t) {
                    var n = this;
                    ee(e, `play`);
                    var r = G(e);
                    if (!this.readyForPlaying) {
                      this.taskQueue.add({
                        action: function () {
                          return n.play(e, t);
                        },
                      });
                      return;
                    }
                    (this.animator.play(r),
                      this.warnIfLinearAnimationNames(r, `play`),
                      this.syncSemanticsOnStateMachines(),
                      this.eventCleanup && this.eventCleanup(),
                      this.cleanupKeyboardInteractions(),
                      this.setupRiveListeners(),
                      this.startRendering());
                  }),
                  (e.prototype.pause = function (e) {
                    var t = this;
                    ee(e, `pause`);
                    var n = G(e);
                    if (!this.readyForPlaying) {
                      this.taskQueue.add({
                        action: function () {
                          return t.pause(e);
                        },
                      });
                      return;
                    }
                    (this.eventCleanup && this.eventCleanup(),
                      this.cleanupKeyboardInteractions(),
                      this.animator.pause(n),
                      this.warnIfLinearAnimationNames(n, `pause`));
                  }),
                  (e.prototype.scrub = function (e, t) {
                    var n = this;
                    I(
                      j.scrub,
                      "`scrub()` is deprecated and will be removed in a future major version: use a state machine to control playback instead.",
                    );
                    var r = G(e);
                    if (!this.readyForPlaying) {
                      this.taskQueue.add({
                        action: function () {
                          return n.scrub(e, t);
                        },
                      });
                      return;
                    }
                    (this.animator.scrub(r, t || 0), this.drawFrame());
                  }),
                  (e.prototype.stop = function (e) {
                    var t = this;
                    ee(e, `stop`);
                    var n = G(e);
                    if (!this.readyForPlaying) {
                      this.taskQueue.add({
                        action: function () {
                          return t.stop(e);
                        },
                      });
                      return;
                    }
                    (this.warnIfLinearAnimationNames(n, `stop`),
                      this.animator && this.animator.stop(n),
                      this.eventCleanup && this.eventCleanup(),
                      this.cleanupKeyboardInteractions(),
                      this.cleanupSemantics());
                  }),
                  (e.prototype.reset = function (e) {
                    var t = e?.artboard,
                      n = se({
                        stateMachine: e?.stateMachine,
                        animations: e?.animations,
                        stateMachines: e?.stateMachines,
                      }),
                      r = n.startingAnimationNames,
                      i = n.startingStateMachineNames,
                      a = e?.autoplay ?? !1,
                      o = e?.autoBind ?? !1;
                    (this.cleanupInstances(),
                      this.initArtboard(t, r, i, a, o),
                      this.readyForPlaying && this.taskQueue.process());
                  }),
                  (e.prototype.load = function (t) {
                    if (!t.src && !t.buffer && !t.riveFile)
                      throw new d(e.missingErrorMessage);
                    (this.stop(), this.init(t));
                  }),
                  Object.defineProperty(e.prototype, "layout", {
                    get: function () {
                      return this._layout;
                    },
                    set: function (e) {
                      ((this._layout = e),
                        (this._overlayTransformDirty = !0),
                        (!e.maxX || !e.maxY) && this.resizeToCanvas(),
                        this.loaded &&
                          !this.animator.isPlaying &&
                          this.drawFrame());
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.resizeToCanvas = function () {
                    ((this._layout = this.layout.copyWith({
                      minX: 0,
                      minY: 0,
                      maxX: this.canvas.width,
                      maxY: this.canvas.height,
                    })),
                      (this._overlayTransformDirty = !0));
                  }),
                  (e.prototype.resizeDrawingSurfaceToCanvas = function (e) {
                    if (this.canvas instanceof HTMLCanvasElement && window) {
                      var t = this.canvas.getBoundingClientRect(),
                        n = t.width,
                        r = t.height,
                        i = e || window.devicePixelRatio || 1;
                      if (
                        ((this.devicePixelRatioUsed = i),
                        (this.canvas.width = i * n),
                        (this.canvas.height = i * r),
                        (this._needsRedraw = !0),
                        this.resizeToCanvas(),
                        this.layout.fit === p.Layout && this.artboard)
                      ) {
                        var a = this._layout.layoutScaleFactor;
                        ((this.artboard.width = n / a),
                          (this.artboard.height = r / a));
                      }
                      this.drawFrame();
                    }
                  }),
                  Object.defineProperty(e.prototype, "source", {
                    get: function () {
                      return this.src;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "activeArtboard", {
                    get: function () {
                      return this.artboard ? this.artboard.name : ``;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "semanticTree", {
                    get: function () {
                      return this._semanticTree;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "accessibilityOverlay", {
                    get: function () {
                      return this._accessibilityOverlay;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "animationNames", {
                    get: function () {
                      if (!this.loaded || !this.artboard) return [];
                      for (
                        var e = [], t = 0;
                        t < this.artboard.animationCount();
                        t++
                      )
                        e.push(this.artboard.animationByIndex(t).name);
                      return e;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "stateMachineNames", {
                    get: function () {
                      if (!this.loaded || !this.artboard) return [];
                      for (
                        var e = [], t = 0;
                        t < this.artboard.stateMachineCount();
                        t++
                      )
                        e.push(this.artboard.stateMachineByIndex(t).name);
                      return e;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.stateMachineInputs = function (e) {
                    if ((I(j.stateMachineInputs, D), this.loaded))
                      return this.animator.stateMachines.find(function (t) {
                        return t.name === e;
                      })?.inputs;
                  }),
                  (e.prototype.retrieveInputAtPath = function (e, t) {
                    if (!e) {
                      console.warn(`No input name provided for path '${t}'`);
                      return;
                    }
                    if (!this.artboard) {
                      console.warn(
                        `Tried to access input: '${e}', at path: '${t}', but the Artboard is null`,
                      );
                      return;
                    }
                    var n = this.artboard.inputByPath(e, t);
                    if (!n) {
                      console.warn(
                        `Could not access an input with name: '${e}', at path:'${t}'`,
                      );
                      return;
                    }
                    return n;
                  }),
                  (e.prototype.setBooleanStateAtPath = function (e, t, n) {
                    I(j.stateMachineInputs, D);
                    var r = this.retrieveInputAtPath(e, n);
                    r &&
                      (r.type === _.Boolean
                        ? (r.asBool().value = t)
                        : console.warn(
                            `Input with name: '${e}', at path:'${n}' is not a boolean`,
                          ));
                  }),
                  (e.prototype.setNumberStateAtPath = function (e, t, n) {
                    I(j.stateMachineInputs, D);
                    var r = this.retrieveInputAtPath(e, n);
                    r &&
                      (r.type === _.Number
                        ? (r.asNumber().value = t)
                        : console.warn(
                            `Input with name: '${e}', at path:'${n}' is not a number`,
                          ));
                  }),
                  (e.prototype.fireStateAtPath = function (e, t) {
                    I(j.stateMachineInputs, D);
                    var n = this.retrieveInputAtPath(e, t);
                    n &&
                      (n.type === _.Trigger
                        ? n.asTrigger().fire()
                        : console.warn(
                            `Input with name: '${e}', at path:'${t}' is not a trigger`,
                          ));
                  }),
                  (e.prototype.retrieveTextAtPath = function (e, t) {
                    if (!e) {
                      console.warn(`No text name provided for path '${t}'`);
                      return;
                    }
                    if (!t) {
                      console.warn(`No path provided for text '${e}'`);
                      return;
                    }
                    if (!this.artboard) {
                      console.warn(
                        `Tried to access text: '${e}', at path: '${t}', but the Artboard is null`,
                      );
                      return;
                    }
                    var n = this.artboard.textByPath(e, t);
                    if (!n) {
                      console.warn(
                        `Could not access text with name: '${e}', at path:'${t}'`,
                      );
                      return;
                    }
                    return n;
                  }),
                  (e.prototype.getTextRunValueAtPath = function (e, t) {
                    I(j.textRuns, O);
                    var n = this.retrieveTextAtPath(e, t);
                    if (!n) {
                      console.warn(
                        `Could not get text with name: '${e}', at path:'${t}'`,
                      );
                      return;
                    }
                    return n.text;
                  }),
                  (e.prototype.setTextRunValueAtPath = function (e, t, n) {
                    I(j.textRuns, O);
                    var r = this.retrieveTextAtPath(e, n);
                    if (!r) {
                      console.warn(
                        `Could not set text with name: '${e}', at path:'${n}'`,
                      );
                      return;
                    }
                    r.text = t;
                  }),
                  Object.defineProperty(
                    e.prototype,
                    "playingStateMachineNames",
                    {
                      get: function () {
                        return this.loaded
                          ? this.animator.stateMachines
                              .filter(function (e) {
                                return e.playing;
                              })
                              .map(function (e) {
                                return e.name;
                              })
                          : [];
                      },
                      enumerable: !1,
                      configurable: !0,
                    },
                  ),
                  Object.defineProperty(e.prototype, "playingAnimationNames", {
                    get: function () {
                      return this.loaded
                        ? this.animator.animations
                            .filter(function (e) {
                              return e.playing;
                            })
                            .map(function (e) {
                              return e.name;
                            })
                        : [];
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "pausedAnimationNames", {
                    get: function () {
                      return this.loaded
                        ? this.animator.animations
                            .filter(function (e) {
                              return !e.playing;
                            })
                            .map(function (e) {
                              return e.name;
                            })
                        : [];
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(
                    e.prototype,
                    "pausedStateMachineNames",
                    {
                      get: function () {
                        return this.loaded
                          ? this.animator.stateMachines
                              .filter(function (e) {
                                return !e.playing;
                              })
                              .map(function (e) {
                                return e.name;
                              })
                          : [];
                      },
                      enumerable: !1,
                      configurable: !0,
                    },
                  ),
                  Object.defineProperty(e.prototype, "isPlaying", {
                    get: function () {
                      return this.animator.isPlaying;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "isPaused", {
                    get: function () {
                      return this.animator.isPaused;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "isStopped", {
                    get: function () {
                      return this.animator?.isStopped ?? !0;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "bounds", {
                    get: function () {
                      return this.artboard ? this.artboard.bounds : void 0;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.on = function (e, t) {
                    (e === T.RiveEvent
                      ? I(j.riveEvents, E)
                      : e === T.StateChange
                        ? I(j.stateChangeEvents, A)
                        : e === T.Loop && I(j.loopEvents, k),
                      this.eventManager.add({ type: e, callback: t }));
                  }),
                  (e.prototype.off = function (e, t) {
                    this.eventManager.remove({ type: e, callback: t });
                  }),
                  (e.prototype.unsubscribe = function (e, t) {
                    (I(
                      j.legacyUnsubscribe,
                      "This function is deprecated: please use `off()` instead.",
                    ),
                      this.off(e, t));
                  }),
                  (e.prototype.removeAllRiveEventListeners = function (e) {
                    this.eventManager.removeAll(e);
                  }),
                  (e.prototype.unsubscribeAll = function (e) {
                    (I(
                      j.legacyUnsubscribe,
                      "This function is deprecated: please use `removeAllRiveEventListeners()` instead.",
                    ),
                      this.removeAllRiveEventListeners(e));
                  }),
                  (e.prototype.stopRendering = function () {
                    ((this._explicitlyStoppedRendering = !0),
                      this.loaded &&
                        this.frameRequestId &&
                        (this.runtime.cancelAnimationFrame
                          ? this.runtime.cancelAnimationFrame(
                              this.frameRequestId,
                            )
                          : cancelAnimationFrame(this.frameRequestId),
                        (this.frameRequestId = null)));
                  }),
                  (e.prototype.startRendering = function () {
                    ((this._explicitlyStoppedRendering = !1), this.drawFrame());
                  }),
                  (e.prototype.scheduleRendering = function () {
                    return; // DISABLED HEAVY CANVAS ANIMATION
                    this.loaded &&
                      this.artboard &&
                      !this.frameRequestId &&
                      (this.frameRequestId = 1);
                  }),
                  (e.prototype._onPageVisibilityChange = function () {
                    document.hidden
                      ? (this.frameRequestId !== null &&
                          (this.runtime?.cancelAnimationFrame
                            ? this.runtime.cancelAnimationFrame(
                                this.frameRequestId,
                              )
                            : cancelAnimationFrame(this.frameRequestId),
                          (this.frameRequestId = null)),
                        (this.lastRenderTime = 0))
                      : this.animator?.isPlaying &&
                        !this._explicitlyStoppedRendering &&
                        this.scheduleRendering();
                  }),
                  (e.prototype.enableFPSCounter = function (e) {
                    this.runtime.enableFPSCounter(e);
                  }),
                  (e.prototype.disableFPSCounter = function () {
                    this.runtime.disableFPSCounter();
                  }),
                  Object.defineProperty(e.prototype, "contents", {
                    get: function () {
                      if (this.loaded) {
                        for (
                          var e = { artboards: [] }, t = 0;
                          t < this.file.artboardCount();
                          t++
                        ) {
                          for (
                            var n = this.file.artboardByIndex(t),
                              r = {
                                name: n.name,
                                animations: [],
                                stateMachines: [],
                              },
                              i = 0;
                            i < n.animationCount();
                            i++
                          ) {
                            var a = n.animationByIndex(i);
                            r.animations.push(a.name);
                          }
                          for (var o = 0; o < n.stateMachineCount(); o++) {
                            for (
                              var s = n.stateMachineByIndex(o),
                                c = s.name,
                                l = new this.runtime.StateMachineInstance(s, n),
                                u = [],
                                d = 0;
                              d < l.inputCount();
                              d++
                            ) {
                              var f = l.input(d);
                              u.push({ name: f.name, type: f.type });
                            }
                            r.stateMachines.push({ name: c, inputs: u });
                          }
                          e.artboards.push(r);
                        }
                        return e;
                      }
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "volume", {
                    get: function () {
                      return (
                        this.artboard &&
                          this.artboard.volume !== this._volume &&
                          (this._volume = this.artboard.volume),
                        this._volume
                      );
                    },
                    set: function (e) {
                      ((this._volume = e),
                        this.artboard &&
                          (this.artboard.volume = e * re.systemVolume));
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "artboardWidth", {
                    get: function () {
                      return this.artboard
                        ? this.artboard.width
                        : (this._artboardWidth ?? 0);
                    },
                    set: function (e) {
                      ((this._artboardWidth = e),
                        this.artboard && (this.artboard.width = e));
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "artboardHeight", {
                    get: function () {
                      return this.artboard
                        ? this.artboard.height
                        : (this._artboardHeight ?? 0);
                    },
                    set: function (e) {
                      ((this._artboardHeight = e),
                        this.artboard && (this.artboard.height = e));
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.resetArtboardSize = function () {
                    this.artboard
                      ? (this.artboard.resetArtboardSize(),
                        (this._artboardWidth = this.artboard.width),
                        (this._artboardHeight = this.artboard.height))
                      : ((this._artboardWidth = void 0),
                        (this._artboardHeight = void 0));
                  }),
                  Object.defineProperty(e.prototype, "devicePixelRatioUsed", {
                    get: function () {
                      return this._devicePixelRatioUsed;
                    },
                    set: function (e) {
                      (e !== this._devicePixelRatioUsed &&
                        (this._overlayTransformDirty = !0),
                        (this._devicePixelRatioUsed = e));
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.bindViewModelInstance = function (e) {
                    e && (this.setViewModelInstance(e), this.bind());
                  }),
                  (e.prototype.setViewModelInstance = function (e) {
                    var t,
                      n = e?.runtimeInstance;
                    !this.artboard ||
                      this.destroyed ||
                      !e ||
                      !n ||
                      (e.internalIncrementReferenceCount(),
                      (t = this._viewModelInstance) == null || t.cleanup(),
                      (this._viewModelInstance = e),
                      this.animator.stateMachines.length > 0
                        ? this.animator.stateMachines.forEach(function (e) {
                            return e.instance.setViewModelInstance(n);
                          })
                        : this.artboard.setViewModelInstance(n));
                  }),
                  (e.prototype.bind = function () {
                    !this.artboard ||
                      this.destroyed ||
                      (this.animator.stateMachines.length > 0
                        ? this.animator.stateMachines.forEach(function (e) {
                            return e.instance.bind();
                          })
                        : this.artboard.bind());
                  }),
                  Object.defineProperty(e.prototype, "viewModelInstance", {
                    get: function () {
                      return this._viewModelInstance;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.setGlobalViewModelInstance = function (e, t) {
                    var n,
                      r = t?.runtimeInstance;
                    if (!this.artboard || this.destroyed || !r) return !1;
                    var i = !1;
                    return (
                      this.animator.stateMachines.length > 0
                        ? this.animator.stateMachines.forEach(function (t) {
                            t.instance.setGlobalViewModelInstance(e, r) &&
                              (i = !0);
                          })
                        : (i = this.artboard.setGlobalViewModelInstance(e, r)),
                      i &&
                        (t.internalIncrementReferenceCount(),
                        (n = this._globalViewModelInstances.get(e)) == null ||
                          n.cleanup(),
                        this._globalViewModelInstances.set(e, t)),
                      i
                    );
                  }),
                  (e.prototype.globalViewModelInstance = function (e) {
                    var t = this._globalViewModelInstances.get(e);
                    if (t) return t;
                    if (!this.artboard || this.destroyed) return null;
                    var n =
                      this.animator.stateMachines.length > 0
                        ? this.animator.stateMachines[0].instance.globalViewModelInstance(
                            e,
                          )
                        : this.artboard.globalViewModelInstance(e);
                    if (n === null) return null;
                    var r = new H(n, null);
                    return (
                      (0, a.createFinalization)(r, n),
                      r.internalIncrementReferenceCount(),
                      this._globalViewModelInstances.set(e, r),
                      r
                    );
                  }),
                  (e.prototype.globalViewModelNames = function () {
                    return this.file?.globalViewModelNames() ?? [];
                  }),
                  (e.prototype.viewModelByIndex = function (e) {
                    var t = this.file.viewModelByIndex(e);
                    return t === null ? null : new de(t);
                  }),
                  (e.prototype.viewModelByName = function (e) {
                    return this.riveFile?.viewModelByName(e);
                  }),
                  (e.prototype.enums = function () {
                    if (this._dataEnums === null) {
                      var e = this.file.enums();
                      this._dataEnums = e.map(function (e) {
                        return new fe(e);
                      });
                    }
                    return this._dataEnums;
                  }),
                  (e.prototype.defaultViewModel = function () {
                    if (this.artboard) {
                      var e = this.file.defaultArtboardViewModel(this.artboard);
                      if (e) return new de(e);
                    }
                    return null;
                  }),
                  (e.prototype.getArtboard = function (e) {
                    return this.riveFile?.getArtboard(e) ?? null;
                  }),
                  (e.prototype.getBindableArtboard = function (e) {
                    return this.riveFile?.getBindableArtboard(e) ?? null;
                  }),
                  (e.prototype.getDefaultBindableArtboard = function () {
                    return this.riveFile?.getDefaultBindableArtboard() ?? null;
                  }),
                  (e.prototype.clearFocus = function () {
                    this.animator.stateMachines
                      .filter(function (e) {
                        return e.playing && e.hasFocusNodes;
                      })
                      .forEach(function (e) {
                        return e.clearFocus();
                      });
                  }),
                  (e.missingErrorMessage = `Rive source file or data buffer required`),
                  (e.cleanupErrorMessage = `Attempt to use file after calling cleanup.`),
                  e
                );
              })(),
              ue;
            (function (e) {
              ((e.none = `none`),
                (e.string = `string`),
                (e.number = `number`),
                (e.boolean = `boolean`),
                (e.color = `color`),
                (e.list = `list`),
                (e.enumType = `enumType`),
                (e.trigger = `trigger`),
                (e.viewModel = `viewModel`),
                (e.integer = `integer`),
                (e.listIndex = `listIndex`),
                (e.image = `image`),
                (e.artboard = `artboard`));
            })((ue ||= {}));
            var de = (function () {
                function e(e) {
                  this._viewModel = e;
                }
                return (
                  Object.defineProperty(e.prototype, "instanceCount", {
                    get: function () {
                      return this._viewModel.instanceCount;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "name", {
                    get: function () {
                      return this._viewModel.name;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.instanceByIndex = function (e) {
                    var t = this._viewModel.instanceByIndex(e);
                    if (t !== null) {
                      var n = new H(t, null);
                      return ((0, a.createFinalization)(n, t), n);
                    }
                    return null;
                  }),
                  (e.prototype.instanceByName = function (e) {
                    var t = this._viewModel.instanceByName(e);
                    if (t !== null) {
                      var n = new H(t, null);
                      return ((0, a.createFinalization)(n, t), n);
                    }
                    return null;
                  }),
                  (e.prototype.defaultInstance = function () {
                    var e = this._viewModel.defaultInstance();
                    if (e !== null) {
                      var t = new H(e, null);
                      return ((0, a.createFinalization)(t, e), t);
                    }
                    return null;
                  }),
                  (e.prototype.instance = function () {
                    var e = this._viewModel.instance();
                    if (e !== null) {
                      var t = new H(e, null);
                      return ((0, a.createFinalization)(t, e), t);
                    }
                    return null;
                  }),
                  Object.defineProperty(e.prototype, "properties", {
                    get: function () {
                      return this._viewModel.getProperties();
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "instanceNames", {
                    get: function () {
                      return this._viewModel.getInstanceNames();
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  e
                );
              })(),
              fe = (function () {
                function e(e) {
                  this._dataEnum = e;
                }
                return (
                  Object.defineProperty(e.prototype, "name", {
                    get: function () {
                      return this._dataEnum.name;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "values", {
                    get: function () {
                      return this._dataEnum.values;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  e
                );
              })(),
              V;
            (function (e) {
              ((e.Number = `number`),
                (e.String = `string`),
                (e.Boolean = `boolean`),
                (e.Color = `color`),
                (e.Trigger = `trigger`),
                (e.Enum = `enum`),
                (e.List = `list`),
                (e.Image = `image`),
                (e.Font = `font`),
                (e.Artboard = `artboard`));
            })((V ||= {}));
            var H = (function () {
                function e(e, t) {
                  ((this._parents = []),
                    (this._children = []),
                    (this._viewModelInstances = new Map()),
                    (this._propertiesWithCallbacks = []),
                    (this._referenceCount = 0),
                    (this.selfUnref = !1),
                    (this._runtimeInstance = e),
                    t !== null && this._parents.push(t));
                }
                return (
                  Object.defineProperty(e.prototype, "runtimeInstance", {
                    get: function () {
                      return this._runtimeInstance;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "nativeInstance", {
                    get: function () {
                      return this._runtimeInstance;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.handleCallbacks = function () {
                    (this._propertiesWithCallbacks.length !== 0 &&
                      (this._propertiesWithCallbacks.forEach(function (e) {
                        e.handleCallbacks();
                      }),
                      this._propertiesWithCallbacks.forEach(function (e) {
                        e.clearChanges();
                      })),
                      this._children.forEach(function (e) {
                        return e.handleCallbacks();
                      }));
                  }),
                  (e.prototype.addParent = function (e) {
                    this._parents.includes(e) ||
                      (this._parents.push(e),
                      (this._propertiesWithCallbacks.length > 0 ||
                        this._children.length > 0) &&
                        e.addToViewModelCallbacks(this));
                  }),
                  (e.prototype.removeParent = function (e) {
                    var t = this._parents.indexOf(e);
                    t !== -1 &&
                      (this._parents[t].removeFromViewModelCallbacks(this),
                      this._parents.splice(t, 1));
                  }),
                  (e.prototype.addToPropertyCallbacks = function (e) {
                    var t = this;
                    this._propertiesWithCallbacks.includes(e) ||
                      (this._propertiesWithCallbacks.push(e),
                      this._propertiesWithCallbacks.length > 0 &&
                        this._parents.forEach(function (e) {
                          e.addToViewModelCallbacks(t);
                        }));
                  }),
                  (e.prototype.removeFromPropertyCallbacks = function (e) {
                    var t = this;
                    this._propertiesWithCallbacks.includes(e) &&
                      ((this._propertiesWithCallbacks =
                        this._propertiesWithCallbacks.filter(function (t) {
                          return t !== e;
                        })),
                      this._children.length === 0 &&
                        this._propertiesWithCallbacks.length === 0 &&
                        this._parents.forEach(function (e) {
                          e.removeFromViewModelCallbacks(t);
                        }));
                  }),
                  (e.prototype.addToViewModelCallbacks = function (e) {
                    var t = this;
                    this._children.includes(e) ||
                      (this._children.push(e),
                      this._parents.forEach(function (e) {
                        e.addToViewModelCallbacks(t);
                      }));
                  }),
                  (e.prototype.removeFromViewModelCallbacks = function (e) {
                    var t = this;
                    this._children.includes(e) &&
                      ((this._children = this._children.filter(function (t) {
                        return t !== e;
                      })),
                      this._children.length === 0 &&
                        this._propertiesWithCallbacks.length === 0 &&
                        this._parents.forEach(function (e) {
                          e.removeFromViewModelCallbacks(t);
                        }));
                  }),
                  (e.prototype.clearCallbacks = function () {
                    this._propertiesWithCallbacks.forEach(function (e) {
                      e.clearCallbacks();
                    });
                  }),
                  (e.prototype.propertyFromPath = function (e, t) {
                    var n = e.split(`/`);
                    return this.propertyFromPathSegments(n, 0, t);
                  }),
                  (e.prototype.viewModelFromPathSegments = function (e, t) {
                    var n = this.internalViewModelInstance(e[t]);
                    return n === null
                      ? null
                      : t == e.length - 1
                        ? n
                        : n.viewModelFromPathSegments(e, t++);
                  }),
                  (e.prototype.propertyFromPathSegments = function (e, t, n) {
                    if (t < e.length - 1) {
                      var r = this.internalViewModelInstance(e[t]);
                      return r === null
                        ? null
                        : r.propertyFromPathSegments(e, t + 1, n);
                    }
                    var i = null;
                    switch (n) {
                      case V.Number:
                        if (
                          ((i = this._runtimeInstance?.number(e[t]) ?? null),
                          i !== null)
                        )
                          return new me(i, this);
                        break;
                      case V.String:
                        if (
                          ((i = this._runtimeInstance?.string(e[t]) ?? null),
                          i !== null)
                        )
                          return new pe(i, this);
                        break;
                      case V.Boolean:
                        if (
                          ((i = this._runtimeInstance?.boolean(e[t]) ?? null),
                          i !== null)
                        )
                          return new he(i, this);
                        break;
                      case V.Color:
                        if (
                          ((i = this._runtimeInstance?.color(e[t]) ?? null),
                          i !== null)
                        )
                          return new ye(i, this);
                        break;
                      case V.Trigger:
                        if (
                          ((i = this._runtimeInstance?.trigger(e[t]) ?? null),
                          i !== null)
                        )
                          return new ge(i, this);
                        break;
                      case V.Enum:
                        if (
                          ((i = this._runtimeInstance?.enum(e[t]) ?? null),
                          i !== null)
                        )
                          return new _e(i, this);
                        break;
                      case V.List:
                        if (
                          ((i = this._runtimeInstance?.list(e[t]) ?? null),
                          i !== null)
                        )
                          return new ve(i, this);
                        break;
                      case V.Image:
                        if (
                          ((i = this._runtimeInstance?.image(e[t]) ?? null),
                          i !== null)
                        )
                          return new be(i, this);
                        break;
                      case V.Font:
                        if (
                          ((i = this._runtimeInstance?.font(e[t]) ?? null),
                          i !== null)
                        )
                          return new W(i, this);
                        break;
                      case V.Artboard:
                        if (
                          ((i = this._runtimeInstance?.artboard(e[t]) ?? null),
                          i !== null)
                        )
                          return new xe(i, this);
                    }
                    return null;
                  }),
                  (e.prototype.internalViewModelInstance = function (t) {
                    if (this._viewModelInstances.has(t))
                      return this._viewModelInstances.get(t);
                    var n = this._runtimeInstance?.viewModel(t);
                    if (n !== null) {
                      var r = new e(n, this);
                      return (
                        (0, a.createFinalization)(r, n),
                        r.internalIncrementReferenceCount(),
                        this._viewModelInstances.set(t, r),
                        r
                      );
                    }
                    return null;
                  }),
                  (e.prototype.number = function (e) {
                    return this.propertyFromPath(e, V.Number);
                  }),
                  (e.prototype.string = function (e) {
                    return this.propertyFromPath(e, V.String);
                  }),
                  (e.prototype.boolean = function (e) {
                    return this.propertyFromPath(e, V.Boolean);
                  }),
                  (e.prototype.color = function (e) {
                    return this.propertyFromPath(e, V.Color);
                  }),
                  (e.prototype.trigger = function (e) {
                    return this.propertyFromPath(e, V.Trigger);
                  }),
                  (e.prototype.enum = function (e) {
                    return this.propertyFromPath(e, V.Enum);
                  }),
                  (e.prototype.list = function (e) {
                    return this.propertyFromPath(e, V.List);
                  }),
                  (e.prototype.image = function (e) {
                    return this.propertyFromPath(e, V.Image);
                  }),
                  (e.prototype.font = function (e) {
                    return this.propertyFromPath(e, V.Font);
                  }),
                  (e.prototype.artboard = function (e) {
                    return this.propertyFromPath(e, V.Artboard);
                  }),
                  (e.prototype.viewModel = function (e) {
                    var t = e.split(`/`),
                      n =
                        t.length > 1
                          ? this.viewModelFromPathSegments(
                              t.slice(0, t.length - 1),
                              0,
                            )
                          : this;
                    return n == null
                      ? null
                      : n.internalViewModelInstance(t[t.length - 1]);
                  }),
                  (e.prototype.internalReplaceViewModel = function (e, t) {
                    if (t.runtimeInstance !== null) {
                      var n =
                        this._runtimeInstance?.replaceViewModel(
                          e,
                          t.runtimeInstance,
                        ) || !1;
                      if (n) {
                        t.internalIncrementReferenceCount();
                        var r = this.internalViewModelInstance(e);
                        (r !== null &&
                          (r.removeParent(this),
                          this._children.includes(r) &&
                            (this._children = this._children.filter(
                              function (e) {
                                return e !== r;
                              },
                            )),
                          r.cleanup()),
                          this._viewModelInstances.set(e, t),
                          t.addParent(this));
                      }
                      return n;
                    }
                    return !1;
                  }),
                  (e.prototype.replaceViewModel = function (e, t) {
                    var n = e.split(`/`);
                    return (
                      (n.length > 1
                        ? this.viewModelFromPathSegments(
                            n.slice(0, n.length - 1),
                            0,
                          )
                        : this
                      )?.internalReplaceViewModel(n[n.length - 1], t) ?? !1
                    );
                  }),
                  (e.prototype.incrementReferenceCount = function () {
                    var e;
                    (this._referenceCount++,
                      (e = this._runtimeInstance) == null ||
                        e.incrementReferenceCount());
                  }),
                  (e.prototype.decrementReferenceCount = function () {
                    var e;
                    (this._referenceCount--,
                      (e = this._runtimeInstance) == null ||
                        e.decrementReferenceCount());
                  }),
                  Object.defineProperty(e.prototype, "properties", {
                    get: function () {
                      return (
                        this._runtimeInstance
                          ?.getProperties()
                          .map(function (e) {
                            return s({}, e);
                          }) || []
                      );
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(e.prototype, "viewModelName", {
                    get: function () {
                      return this._runtimeInstance?.getViewModelName() ?? ``;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (e.prototype.internalIncrementReferenceCount = function () {
                    this._referenceCount++;
                  }),
                  (e.prototype.cleanup = function () {
                    var e = this,
                      t;
                    if ((this._referenceCount--, this._referenceCount <= 0)) {
                      (this.selfUnref &&
                        ((t = this._runtimeInstance) == null || t.unref()),
                        (this._runtimeInstance = null),
                        this.clearCallbacks(),
                        (this._propertiesWithCallbacks = []),
                        this._viewModelInstances.forEach(function (e) {
                          e.cleanup();
                        }),
                        this._viewModelInstances.clear());
                      var n = u([], this._children, !0);
                      this._children.length = 0;
                      var r = u([], this._parents, !0);
                      ((this._parents.length = 0),
                        n.forEach(function (t) {
                          t.removeParent(e);
                        }),
                        r.forEach(function (t) {
                          t.removeFromViewModelCallbacks(e);
                        }));
                    }
                  }),
                  e
                );
              })(),
              U = (function () {
                function e(e, t) {
                  ((this.callbacks = []),
                    (this._viewModelInstanceValue = e),
                    (this._parentViewModel = t));
                }
                return (
                  (e.prototype.on = function (e) {
                    (this.callbacks.length === 0 &&
                      this._viewModelInstanceValue.clearChanges(),
                      this.callbacks.includes(e) ||
                        (this.callbacks.push(e),
                        this._parentViewModel.addToPropertyCallbacks(this)));
                  }),
                  (e.prototype.off = function (e) {
                    (e
                      ? (this.callbacks = this.callbacks.filter(function (t) {
                          return t !== e;
                        }))
                      : (this.callbacks.length = 0),
                      this.callbacks.length === 0 &&
                        this._parentViewModel.removeFromPropertyCallbacks(
                          this,
                        ));
                  }),
                  (e.prototype.internalHandleCallback = function (e) {}),
                  (e.prototype.handleCallbacks = function () {
                    var e = this;
                    this._viewModelInstanceValue.hasChanged &&
                      this.callbacks.forEach(function (t) {
                        e.internalHandleCallback(t);
                      });
                  }),
                  (e.prototype.clearChanges = function () {
                    this._viewModelInstanceValue.clearChanges();
                  }),
                  (e.prototype.clearCallbacks = function () {
                    this.callbacks.length = 0;
                  }),
                  Object.defineProperty(e.prototype, "name", {
                    get: function () {
                      return this._viewModelInstanceValue.name;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  e
                );
              })(),
              pe = (function (e) {
                o(t, e);
                function t(t, n) {
                  return e.call(this, t, n) || this;
                }
                return (
                  Object.defineProperty(t.prototype, "value", {
                    get: function () {
                      return this._viewModelInstanceValue.value;
                    },
                    set: function (e) {
                      this._viewModelInstanceValue.value = e;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.internalHandleCallback = function (e) {
                    e(this.value);
                  }),
                  t
                );
              })(U),
              me = (function (e) {
                o(t, e);
                function t(t, n) {
                  return e.call(this, t, n) || this;
                }
                return (
                  Object.defineProperty(t.prototype, "value", {
                    get: function () {
                      return this._viewModelInstanceValue.value;
                    },
                    set: function (e) {
                      this._viewModelInstanceValue.value = e;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.internalHandleCallback = function (e) {
                    e(this.value);
                  }),
                  t
                );
              })(U),
              he = (function (e) {
                o(t, e);
                function t(t, n) {
                  return e.call(this, t, n) || this;
                }
                return (
                  Object.defineProperty(t.prototype, "value", {
                    get: function () {
                      return this._viewModelInstanceValue.value;
                    },
                    set: function (e) {
                      this._viewModelInstanceValue.value = e;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.internalHandleCallback = function (e) {
                    e(this.value);
                  }),
                  t
                );
              })(U),
              ge = (function (e) {
                o(t, e);
                function t(t, n) {
                  return e.call(this, t, n) || this;
                }
                return (
                  (t.prototype.trigger = function () {
                    return this._viewModelInstanceValue.trigger();
                  }),
                  (t.prototype.internalHandleCallback = function (e) {
                    e();
                  }),
                  t
                );
              })(U),
              _e = (function (e) {
                o(t, e);
                function t(t, n) {
                  return e.call(this, t, n) || this;
                }
                return (
                  Object.defineProperty(t.prototype, "value", {
                    get: function () {
                      return this._viewModelInstanceValue.value;
                    },
                    set: function (e) {
                      this._viewModelInstanceValue.value = e;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(t.prototype, "valueIndex", {
                    get: function () {
                      return this._viewModelInstanceValue.valueIndex;
                    },
                    set: function (e) {
                      this._viewModelInstanceValue.valueIndex = e;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  Object.defineProperty(t.prototype, "values", {
                    get: function () {
                      return this._viewModelInstanceValue.values;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.internalHandleCallback = function (e) {
                    e(this.value);
                  }),
                  t
                );
              })(U),
              ve = (function (e) {
                o(t, e);
                function t(t, n) {
                  return e.call(this, t, n) || this;
                }
                return (
                  Object.defineProperty(t.prototype, "length", {
                    get: function () {
                      return this._viewModelInstanceValue.size;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.addInstance = function (e) {
                    e.runtimeInstance != null &&
                      (this._viewModelInstanceValue.addInstance(
                        e.runtimeInstance,
                      ),
                      e.addParent(this._parentViewModel));
                  }),
                  (t.prototype.addInstanceAt = function (e, t) {
                    return e.runtimeInstance != null &&
                      this._viewModelInstanceValue.addInstanceAt(
                        e.runtimeInstance,
                        t,
                      )
                      ? (e.addParent(this._parentViewModel), !0)
                      : !1;
                  }),
                  (t.prototype.removeInstance = function (e) {
                    e.runtimeInstance != null &&
                      (this._viewModelInstanceValue.removeInstance(
                        e.runtimeInstance,
                      ),
                      e.removeParent(this._parentViewModel));
                  }),
                  (t.prototype.removeInstanceAt = function (e) {
                    this._viewModelInstanceValue.removeInstanceAt(e);
                  }),
                  (t.prototype.instanceAt = function (e) {
                    var t = this._viewModelInstanceValue.instanceAt(e);
                    if (t != null) {
                      var n = new H(t, this._parentViewModel);
                      return ((0, a.createFinalization)(n, t), n);
                    }
                    return null;
                  }),
                  (t.prototype.swap = function (e, t) {
                    this._viewModelInstanceValue.swap(e, t);
                  }),
                  (t.prototype.internalHandleCallback = function (e) {
                    e();
                  }),
                  t
                );
              })(U),
              ye = (function (e) {
                o(t, e);
                function t(t, n) {
                  return e.call(this, t, n) || this;
                }
                return (
                  Object.defineProperty(t.prototype, "value", {
                    get: function () {
                      return this._viewModelInstanceValue.value;
                    },
                    set: function (e) {
                      this._viewModelInstanceValue.value = e;
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.rgb = function (e, t, n) {
                    this._viewModelInstanceValue.rgb(e, t, n);
                  }),
                  (t.prototype.rgba = function (e, t, n, r) {
                    this._viewModelInstanceValue.argb(r, e, t, n);
                  }),
                  (t.prototype.argb = function (e, t, n, r) {
                    this._viewModelInstanceValue.argb(e, t, n, r);
                  }),
                  (t.prototype.alpha = function (e) {
                    this._viewModelInstanceValue.alpha(e);
                  }),
                  (t.prototype.opacity = function (e) {
                    this._viewModelInstanceValue.alpha(
                      Math.round(Math.max(0, Math.min(1, e)) * 255),
                    );
                  }),
                  (t.prototype.internalHandleCallback = function (e) {
                    e(this.value);
                  }),
                  t
                );
              })(U),
              be = (function (e) {
                o(t, e);
                function t(t, n) {
                  return e.call(this, t, n) || this;
                }
                return (
                  Object.defineProperty(t.prototype, "value", {
                    set: function (e) {
                      this._viewModelInstanceValue.value(
                        e?.nativeImage ?? null,
                      );
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.internalHandleCallback = function (e) {
                    e();
                  }),
                  t
                );
              })(U),
              W = (function (e) {
                o(t, e);
                function t(t, n) {
                  return e.call(this, t, n) || this;
                }
                return (
                  Object.defineProperty(t.prototype, "value", {
                    set: function (e) {
                      this._viewModelInstanceValue.value(e?.nativeFont ?? null);
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.internalHandleCallback = function (e) {
                    e();
                  }),
                  t
                );
              })(U),
              xe = (function (e) {
                o(t, e);
                function t(t, n) {
                  return e.call(this, t, n) || this;
                }
                return (
                  Object.defineProperty(t.prototype, "value", {
                    set: function (e) {
                      var t = e.isBindableArtboard
                        ? e
                        : e.file.internalBindableArtboardFromArtboard(
                            e.nativeArtboard,
                          );
                      (this._viewModelInstanceValue.value(
                        t?.nativeArtboard ?? null,
                      ),
                        t?.nativeViewModel &&
                          this._viewModelInstanceValue.viewModelInstance(
                            t?.nativeViewModel ?? null,
                          ));
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (t.prototype.internalHandleCallback = function (e) {
                    e();
                  }),
                  t
                );
              })(U),
              Se = function (e) {
                return c(void 0, void 0, void 0, function () {
                  var t, n, r;
                  return l(this, function (i) {
                    switch (i.label) {
                      case 0:
                        return ((t = new Request(e)), [4, fetch(t)]);
                      case 1:
                        if (((n = i.sent()), !n.ok))
                          throw Error(
                            `Failed to fetch the Rive file: HTTP ${n.status}`,
                          );
                        return [4, n.arrayBuffer()];
                      case 2:
                        return ((r = i.sent()), [2, r]);
                    }
                  });
                });
              },
              G = function (e) {
                return typeof e == `string` ? [e] : e instanceof Array ? e : [];
              },
              Ce = { EventManager: R, TaskQueueManager: ne },
              we = function (e) {
                return c(void 0, void 0, void 0, function () {
                  var n, r, i;
                  return l(this, function (o) {
                    switch (o.label) {
                      case 0:
                        return (
                          (n = new Promise(function (n) {
                            return t.RuntimeLoader.getInstance(function (t) {
                              t.decodeAudio(e, n, null);
                            });
                          })),
                          [4, n]
                        );
                      case 1:
                        return (
                          (r = o.sent()),
                          (i = new a.AudioWrapper(r)),
                          a.finalizationRegistry.register(i, r),
                          [2, i]
                        );
                    }
                  });
                });
              },
              Te = function (e) {
                return c(void 0, void 0, void 0, function () {
                  var n, r, i;
                  return l(this, function (o) {
                    switch (o.label) {
                      case 0:
                        return (
                          (n = new Promise(function (n) {
                            return t.RuntimeLoader.getInstance(function (t) {
                              t.decodeImage(e, n, null);
                            });
                          })),
                          [4, n]
                        );
                      case 1:
                        return (
                          (r = o.sent()),
                          (i = new a.ImageWrapper(r)),
                          a.finalizationRegistry.register(i, r),
                          [2, i]
                        );
                    }
                  });
                });
              },
              Ee = function (e) {
                return c(void 0, void 0, void 0, function () {
                  var n, r, i;
                  return l(this, function (o) {
                    switch (o.label) {
                      case 0:
                        return (
                          (n = new Promise(function (n) {
                            return t.RuntimeLoader.getInstance(function (t) {
                              t.decodeFont(e, n, null);
                            });
                          })),
                          [4, n]
                        );
                      case 1:
                        return (
                          (r = o.sent()),
                          (i = new a.FontWrapper(r)),
                          a.finalizationRegistry.register(i, r),
                          [2, i]
                        );
                    }
                  });
                });
              };
          })(),
          r
        );
      })(),
    );
  }),
  f = t((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 });
    var t,
      r = n(),
      i = d();
    function a(e) {
      return e && typeof e == `object` && `default` in e ? e : { default: e };
    }
    var o = a(r);
    function s(e) {
      var t = e || c(),
        n = r.useState(t),
        i = n[0],
        a = n[1];
      return (
        r.useEffect(
          function () {
            if (`u` > typeof window && `matchMedia` in window) {
              var t = function () {
                  a(e || c());
                },
                n = window.matchMedia(`screen and (resolution: ` + i + `dppx)`);
              return (
                n.hasOwnProperty(`addEventListener`)
                  ? n.addEventListener(`change`, t)
                  : n.addListener(t),
                function () {
                  n.hasOwnProperty(`removeEventListener`)
                    ? n.removeEventListener(`change`, t)
                    : n.removeListener(t);
                }
              );
            }
          },
          [i, e],
        ),
        i
      );
    }
    function c() {
      return Math.min(
        Math.max(
          1,
          `u` > typeof window && typeof window.devicePixelRatio == `number`
            ? window.devicePixelRatio
            : 1,
        ),
        3,
      );
    }
    var l = (function () {
      function e() {}
      var t = e.prototype;
      return (
        (t.observe = function () {}),
        (t.unobserve = function () {}),
        (t.disconnect = function () {}),
        e
      );
    })();
    function u(e, t) {
      var n = 0;
      return function () {
        for (
          var r = this, i = arguments.length, a = Array(i), o = 0;
          o < i;
          o++
        )
          a[o] = arguments[o];
        (clearTimeout(n),
          (n = window.setTimeout(function () {
            return e.apply(r, a);
          }, t)));
      };
    }
    var f = globalThis.ResizeObserver || l,
      p = globalThis.ResizeObserver !== void 0,
      m = !p;
    function h(e, t) {
      t === void 0 && (t = !0);
      var n = r.useState({ width: 0, height: 0 }),
        i = n[0],
        a = n[1];
      r.useEffect(function () {
        if (`u` > typeof window && t) {
          var e = function () {
            a({ width: window.innerWidth, height: window.innerHeight });
          };
          return (
            m && (e(), window.addEventListener(`resize`, e)),
            function () {
              return window.removeEventListener(`resize`, e);
            }
          );
        }
      }, []);
      var o = r.useRef(
        new f(
          u(function (e) {
            p &&
              a({
                width: e[e.length - 1].contentRect.width,
                height: e[e.length - 1].contentRect.height,
              });
          }, 0),
        ),
      );
      return (
        r.useEffect(
          function () {
            var n = o.current;
            if (!t) return void n.disconnect();
            var r = e.current;
            return (
              e.current && p && n.observe(e.current),
              function () {
                (n.disconnect(), r && p && n.unobserve(r));
              }
            );
          },
          [e, o],
        ),
        i
      );
    }
    var g = {
      useDevicePixelRatio: !0,
      fitCanvasToArtboardHeight: !1,
      useOffscreenRenderer: !0,
      shouldResizeCanvasToContainer: !0,
    };
    function _(e) {
      return Object.assign({}, g, e);
    }
    function v(e, t) {
      try {
        t();
      } catch (t) {
        console.warn(
          `[Rive] ` + e + ` threw while cleaning up Rive; contained. `,
          t,
        );
      }
    }
    function y(e) {
      var t = e.riveLoaded,
        n = t !== void 0 && t,
        i = e.canvasElem,
        a = e.containerRef,
        o = e.options,
        c = e.onCanvasHasResized,
        l = e.artboardBounds,
        u = _(o === void 0 ? {} : o),
        d = r.useState({ height: 0, width: 0 }),
        f = d[0],
        p = f.height,
        m = f.width,
        g = d[1],
        v = r.useState({ height: 0, width: 0 }),
        y = v[0],
        b = y.height,
        x = y.width,
        S = v[1],
        C = r.useState(!0),
        w = C[0],
        T = C[1],
        E = u.fitCanvasToArtboardHeight,
        D = u.shouldResizeCanvasToContainer,
        O = u.useDevicePixelRatio,
        k = u.customDevicePixelRatio,
        A = h(a, D),
        j = s(k),
        M = l ?? {},
        N = M.maxX,
        P = M.maxY,
        F = r.useCallback(
          function () {
            var e = a.current?.clientWidth ?? 0,
              t = a.current?.clientHeight ?? 0;
            return E && l
              ? { width: e, height: (l.maxY / l.maxX) * e }
              : { width: e, height: t };
          },
          [a, E, N, P],
        );
      (r.useEffect(
        function () {
          if (D && a.current && n) {
            var e = F(),
              t = e.width,
              r = e.height,
              o = !1;
            if (i) {
              var s = t !== m || r !== p;
              if (
                (u.fitCanvasToArtboardHeight &&
                  s &&
                  ((a.current.style.height = r + `px`), (o = !0)),
                u.useDevicePixelRatio)
              ) {
                var l = t * j !== x || r * j !== b;
                if (s || l) {
                  var d = j * t,
                    f = j * r;
                  ((i.width = d),
                    (i.height = f),
                    (i.style.width = t + `px`),
                    (i.style.height = r + `px`),
                    S({ width: d, height: f }),
                    (o = !0));
                }
              } else
                s &&
                  ((i.width = t),
                  (i.height = r),
                  S({ width: t, height: r }),
                  (o = !0));
              g({ width: t, height: r });
            }
            (c && (w || o) && c && c(), w && T(!1));
          }
        },
        [i, a, A, j, F, w, T, b, x, p, m, c, D, E, O, n],
      ),
        r.useEffect(
          function () {
            S({ width: 0, height: 0 });
          },
          [i],
        ));
    }
    var b = (function () {
        function e() {}
        var t = e.prototype;
        return (
          (t.observe = function () {}),
          (t.unobserve = function () {}),
          (t.disconnect = function () {}),
          e
        );
      })(),
      x = globalThis.IntersectionObserver || b,
      S = (function () {
        function e() {
          var e = this;
          ((this.elementsMap = new Map()),
            (this.onObserved = function (t) {
              t.forEach(function (t) {
                var n = e.elementsMap.get(t.target);
                n && n(t);
              });
            }),
            (this.observer = new x(this.onObserved)));
        }
        var t = e.prototype;
        return (
          (t.registerCallback = function (e, t) {
            (this.observer.observe(e), this.elementsMap.set(e, t));
          }),
          (t.removeCallback = function (e) {
            (this.observer.unobserve(e), this.elementsMap.delete(e));
          }),
          e
        );
      })(),
      C = function () {
        return ((t ||= new S()), t);
      };
    function w() {
      return {
        observe: r.useCallback(function (e, t) {
          C().registerCallback(e, t);
        }, []),
        unobserve: r.useCallback(function (e) {
          C().removeCallback(e);
        }, []),
      };
    }
    function T() {
      return (T =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }).apply(this, arguments);
    }
    function E(e, t) {
      if (e == null) return {};
      var n,
        r,
        i = {},
        a = Object.getOwnPropertyNames(e);
      for (r = 0; r < a.length; r++)
        ((n = a[r]),
          !(t.indexOf(n) >= 0) &&
            Object.prototype.propertyIsEnumerable.call(e, n) &&
            (i[n] = e[n]));
      return i;
    }
    function D(e) {
      var t = e.setContainerRef,
        n = e.setCanvasRef,
        r = e.className,
        i = r === void 0 ? `` : r,
        a = e.style,
        s = e.children,
        c = E(e, [
          `setContainerRef`,
          `setCanvasRef`,
          `className`,
          `style`,
          `children`,
        ]),
        l = T({ width: `100%`, height: `100%` }, a);
      return o.default.createElement(
        `div`,
        T({ ref: t, className: i }, !i && { style: l }),
        o.default.createElement(
          `canvas`,
          T(
            { ref: n, style: { verticalAlign: `top`, width: 0, height: 0 } },
            c,
          ),
          s,
        ),
      );
    }
    function O(e, t) {
      t === void 0 && (t = {});
      var n,
        a = r.useState(null),
        c = a[0],
        l = a[1],
        u = r.useRef(null),
        d = r.useRef(null),
        f = r.useRef(null),
        p = r.useState(null),
        m = p[0],
        h = p[1],
        b = !!e,
        x = _(t),
        S = e?.useOffscreenRenderer ?? t.useOffscreenRenderer,
        C =
          !!e?.enableGPUCanvas ||
          !!(e != null && (n = e.riveFile) != null && n.deferredRequested),
        O = S ?? (!C && g.useOffscreenRenderer);
      r.useEffect(
        function () {
          C &&
            O &&
            console.warn(
              "[Rive] GPU Canvas and `useOffscreenRenderer` cannot both be on. A GPU Canvas session records for a single <canvas>, while the offscreen renderer shares one context across every <canvas> on the page. This instance falls back to immediate rendering and GPU Canvas content will not draw — drop the explicit `useOffscreenRenderer: true` to use it.",
            );
        },
        [C, O],
      );
      var k = s(),
        A = r.useCallback(
          function () {
            if (m) {
              if (m.layout && m.layout.fit === i.Fit.Layout && c) {
                var e = k * m.layout.layoutScaleFactor;
                ((m.devicePixelRatioUsed = k),
                  (m.artboardWidth = c?.width / e),
                  (m.artboardHeight = c?.height / e));
              }
              (m.startRendering(), m.resizeToCanvas());
            }
          },
          [m, k],
        );
      y({
        riveLoaded: !!m,
        canvasElem: c,
        containerRef: u,
        options: x,
        onCanvasHasResized: A,
        artboardBounds: m?.bounds,
      });
      var j = r.useCallback(function (e) {
        var t = d.current;
        ((d.current = e),
          e === null &&
            t &&
            queueMicrotask(function () {
              d.current !== t && ((t.height = 0), (t.width = 0));
            }),
          l(e));
      }, []);
      r.useEffect(
        function () {
          if (c && e) {
            var t,
              n = m != null;
            if (m == null) {
              var r = e.onRiveReady,
                a = E(e, [`onRiveReady`]);
              ((t = new i.Rive(
                T({}, a, { useOffscreenRenderer: O, canvas: c }),
              )),
                f.current != null &&
                  v(`replacing a previous instance`, function () {
                    return f.current.cleanup();
                  }),
                (f.current = t),
                t.on(i.EventType.Load, function () {
                  ((n = !0),
                    r && r(t),
                    c
                      ? h(t)
                      : v(`unmounted before load`, function () {
                          return t.cleanup();
                        }));
                }));
            }
            return function () {
              n ||
                v(`teardown before load`, function () {
                  return t?.cleanup();
                });
            };
          }
        },
        [c, b, m],
      );
      var M = r.useCallback(function (e) {
          u.current = e;
        }, []),
        N = w(),
        P = N.observe,
        F = N.unobserve;
      (r.useEffect(
        function () {
          var e,
            t = !1,
            n = function () {
              if (c && t) {
                var e = c.getBoundingClientRect();
                e.width > 0 &&
                  e.height > 0 &&
                  e.top <
                    (window.innerHeight ||
                      document.documentElement.clientHeight) &&
                  e.bottom > 0 &&
                  e.left <
                    (window.innerWidth ||
                      document.documentElement.clientWidth) &&
                  e.right > 0 &&
                  (m?.startRendering(), (t = !1));
              }
            };
          return (
            c &&
              !1 !== x.shouldUseIntersectionObserver &&
              P(c, function (r) {
                (r.isIntersecting
                  ? m && m.startRendering()
                  : m && m.stopRendering(),
                  (t = !r.isIntersecting),
                  clearTimeout(e),
                  r.isIntersecting ||
                    r.boundingClientRect.width !== 0 ||
                    (e = setTimeout(n, 10)));
              }),
            function () {
              (clearTimeout(e), c && F(c));
            }
          );
        },
        [P, F, m, c, x.shouldUseIntersectionObserver],
      ),
        r.useEffect(
          function () {
            return function () {
              m &&
                (v(`unmount`, function () {
                  return m.cleanup();
                }),
                h(null));
            };
          },
          [m, c],
        ),
        r.useEffect(function () {
          return function () {
            f.current != null &&
              v(`final unmount`, function () {
                return f.current.cleanup();
              });
          };
        }, []));
      var I = e?.animations;
      r.useEffect(
        function () {
          m &&
            I &&
            (m.isPlaying
              ? (m.stop(m.animationNames), m.play(I))
              : m.isPaused && (m.stop(m.animationNames), m.pause(I)));
        },
        [I, m],
      );
      var ee = r.useCallback(
        function (e) {
          return o.default.createElement(
            D,
            T({ setContainerRef: M, setCanvasRef: j }, e),
          );
        },
        [j, M],
      );
      return {
        canvas: c,
        container: u.current,
        setCanvasRef: j,
        setContainerRef: M,
        rive: m,
        RiveComponent: ee,
      };
    }
    function k() {
      return (k =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }).apply(this, arguments);
    }
    function A(e, t) {
      if (e == null) return {};
      var n,
        r,
        i = {},
        a = Object.getOwnPropertyNames(e);
      for (r = 0; r < a.length; r++)
        ((n = a[r]),
          !(t.indexOf(n) >= 0) &&
            Object.prototype.propertyIsEnumerable.call(e, n) &&
            (i[n] = e[n]));
      return i;
    }
    var j = function (e) {
      var t = e.src,
        n = e.artboard,
        r = e.stateMachine,
        i = e.animations,
        a = e.stateMachines,
        s = e.layout,
        c = e.useOffscreenRenderer,
        l = e.enableGPUCanvas,
        u = e.shouldDisableRiveListeners,
        d = e.shouldResizeCanvasToContainer,
        f = e.automaticallyHandleEvents,
        p = e.children,
        m = A(e, [
          `src`,
          `artboard`,
          `stateMachine`,
          `animations`,
          `stateMachines`,
          `layout`,
          `useOffscreenRenderer`,
          `enableGPUCanvas`,
          `shouldDisableRiveListeners`,
          `shouldResizeCanvasToContainer`,
          `automaticallyHandleEvents`,
          `children`,
        ]),
        h = O(
          {
            src: t,
            artboard: n,
            stateMachine: r,
            animations: i,
            layout: s,
            stateMachines: a,
            autoplay: !0,
            shouldDisableRiveListeners: u !== void 0 && u,
            automaticallyHandleEvents: f !== void 0 && f,
            enableGPUCanvas: l,
          },
          k(
            { shouldResizeCanvasToContainer: d === void 0 || d },
            c !== void 0 && { useOffscreenRenderer: c },
          ),
        ).RiveComponent;
      return o.default.createElement(h, m, p);
    };
    function M(e, t, n, a) {
      var o = r.useState(null),
        s = o[0],
        c = o[1];
      return (
        r.useEffect(
          function () {
            var r = function () {
              if (((e && t && n) || c(null), e && t && n)) {
                var r = e.stateMachineInputs(t);
                if (r) {
                  var i = r.find(function (e) {
                    return e.name === n;
                  });
                  (a !== void 0 && i && (i.value = a), c(i || null));
                }
              } else c(null);
            };
            (r(),
              e &&
                e.on(i.EventType.Load, function () {
                  r();
                }));
          },
          [e],
        ),
        s
      );
    }
    function N(e, t) {
      var n = t ?? {},
        a = n.name,
        o = n.useDefault,
        s = r.useState(null),
        c = s[0],
        l = s[1];
      return (
        r.useEffect(
          function () {
            var t = function () {
              if (!e) return void l(null);
              l(
                a == null
                  ? e.defaultViewModel() || null
                  : (e.viewModelByName == null
                      ? void 0
                      : e.viewModelByName.call(e, a)) || null,
              );
            };
            return (
              t(),
              e && e.on(i.EventType.Load, t),
              function () {
                e && e.off(i.EventType.Load, t);
              }
            );
          },
          [e, a, o !== void 0 && o],
        ),
        c
      );
    }
    var P = new WeakSet();
    function F(e) {
      P.has(e) ||
        (P.add(e),
        queueMicrotask(function () {
          (P.delete(e), e.bind());
        }));
    }
    function I(e, t) {
      var n = t.name,
        r = t.useNew,
        i = t.instance;
      return i === void 0
        ? e
          ? n == null
            ? r
              ? (e.instance == null ? void 0 : e.instance.call(e)) || null
              : (e.defaultInstance == null
                  ? void 0
                  : e.defaultInstance.call(e)) || null
            : e.instanceByName(n) || null
          : null
        : i;
    }
    function ee(e, t) {
      var n = t ?? {},
        i = n.name,
        a = n.useDefault,
        o = n.useNew,
        s = o !== void 0 && o,
        c = n.rive,
        l = r.useState(null),
        u = l[0],
        d = l[1];
      return (
        r.useEffect(
          function () {
            if (!e) return void d(null);
            var t = I(e, { name: i, useNew: s });
            (d(t),
              c &&
                t &&
                c.viewModelInstance !== t &&
                (c.setViewModelInstance(t), F(c)));
          },
          [e, i, a !== void 0 && a, s, c],
        ),
        u
      );
    }
    function te(e, t, n) {
      var i = n ?? {},
        a = i.instanceName,
        o = i.useNew,
        s = o !== void 0 && o,
        c = i.instance,
        l = i.rive,
        u = r.useState(null),
        d = u[0],
        f = u[1];
      return (
        r.useEffect(
          function () {
            var n = I(e, { name: a, useNew: s, instance: c });
            (f(n), l && t && n && l.setGlobalViewModelInstance(t, n) && F(l));
          },
          [e, t, a, s, c, l],
        ),
        d
      );
    }
    function L() {
      return (L =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }).apply(this, arguments);
    }
    function R(e, t, n) {
      var i = r.useState(null),
        a = i[0],
        o = i[1],
        s = r.useState(n.defaultValue),
        c = s[0],
        l = s[1],
        u = r.useState(null),
        d = u[0],
        f = u[1],
        p = r.useRef(null),
        m = r.useRef(e),
        h = r.useRef(n);
      r.useEffect(
        function () {
          h.current = n;
        },
        [n],
      );
      var g = r.useCallback(function () {
        var e = p.current,
          t = m.current,
          n = h.current;
        if (!e || !t)
          return (o(null), l(n.defaultValue), f(null), function () {});
        var r = n.getProperty(e, t);
        if (r) {
          (o(r),
            l(n.getValue(r)),
            n.getExtendedData && f(n.getExtendedData(r)));
          var i = function () {
            (l(n.getValue(r)),
              n.getExtendedData && f(n.getExtendedData(r)),
              n.onPropertyEvent && n.onPropertyEvent());
          };
          return (
            r.on(i),
            function () {
              r.off(i);
            }
          );
        }
        return function () {};
      }, []);
      r.useEffect(
        function () {
          return ((p.current = t), (m.current = e), g());
        },
        [t, e, g],
      );
      var _ = r.useCallback(
          function (e) {
            if (a && p.current === t)
              try {
                (e(a),
                  h.current.getExtendedData && f(h.current.getExtendedData(a)));
                return;
              } catch {}
            if (p.current)
              try {
                var n = h.current.getProperty(p.current, m.current);
                n &&
                  (o(n),
                  e(n),
                  h.current.getExtendedData && f(h.current.getExtendedData(n)));
              } catch {}
          },
          [a, t],
        ),
        v = r.useMemo(
          function () {
            return h.current.buildPropertyOperations(_);
          },
          [_],
        ),
        y = L({ value: c }, v);
      return (n.getExtendedData && (y.extendedData = d), y);
    }
    function ne(e, t) {
      var n = R(e, t, {
        getProperty: r.useCallback(function (e, t) {
          return e.number(t);
        }, []),
        getValue: r.useCallback(function (e) {
          return e.value;
        }, []),
        defaultValue: null,
        buildPropertyOperations: r.useCallback(function (e) {
          return {
            setValue: function (t) {
              e(function (e) {
                e.value = t;
              });
            },
          };
        }, []),
      });
      return { value: n.value, setValue: n.setValue };
    }
    function z(e, t) {
      var n = R(e, t, {
        getProperty: r.useCallback(function (e, t) {
          return e.string(t);
        }, []),
        getValue: r.useCallback(function (e) {
          return e.value;
        }, []),
        defaultValue: null,
        buildPropertyOperations: r.useCallback(function (e) {
          return {
            setValue: function (t) {
              e(function (e) {
                e.value = t;
              });
            },
          };
        }, []),
      });
      return { value: n.value, setValue: n.setValue };
    }
    function re(e, t) {
      var n = R(e, t, {
        getProperty: r.useCallback(function (e, t) {
          return e.boolean(t);
        }, []),
        getValue: r.useCallback(function (e) {
          return e.value;
        }, []),
        defaultValue: null,
        buildPropertyOperations: r.useCallback(function (e) {
          return {
            setValue: function (t) {
              e(function (e) {
                e.value = t;
              });
            },
          };
        }, []),
      });
      return { value: n.value, setValue: n.setValue };
    }
    function ie(e, t) {
      var n = R(e, t, {
        getProperty: r.useCallback(function (e, t) {
          return e.color(t);
        }, []),
        getValue: r.useCallback(function (e) {
          return e.value;
        }, []),
        defaultValue: null,
        buildPropertyOperations: r.useCallback(function (e) {
          return {
            setValue: function (t) {
              e(function (e) {
                e.value = t;
              });
            },
            setRgb: function (t, n, r) {
              e(function (e) {
                e.rgb(t, n, r);
              });
            },
            setRgba: function (t, n, r, i) {
              e(function (e) {
                e.rgba(t, n, r, i);
              });
            },
            setAlpha: function (t) {
              e(function (e) {
                e.alpha(t);
              });
            },
            setOpacity: function (t) {
              e(function (e) {
                e.opacity(t);
              });
            },
          };
        }, []),
      });
      return {
        value: n.value,
        setValue: n.setValue,
        setRgb: n.setRgb,
        setRgba: n.setRgba,
        setAlpha: n.setAlpha,
        setOpacity: n.setOpacity,
      };
    }
    function ae(e, t) {
      var n = R(e, t, {
        getProperty: r.useCallback(function (e, t) {
          return e.enum(t);
        }, []),
        getValue: r.useCallback(function (e) {
          return e.value;
        }, []),
        defaultValue: null,
        getExtendedData: r.useCallback(function (e) {
          return e.values;
        }, []),
        buildPropertyOperations: r.useCallback(function (e) {
          return {
            setValue: function (t) {
              e(function (e) {
                e.value = t;
              });
            },
          };
        }, []),
      });
      return {
        value: n.value,
        values: n.extendedData || [],
        setValue: n.setValue,
      };
    }
    function oe(e, t, n) {
      var i = (n ?? {}).onTrigger;
      return {
        trigger: R(e, t, {
          getProperty: r.useCallback(function (e, t) {
            return e.trigger(t);
          }, []),
          getValue: r.useCallback(function () {}, []),
          defaultValue: null,
          onPropertyEvent: i,
          buildPropertyOperations: r.useCallback(function (e) {
            return {
              trigger: function () {
                e(function (e) {
                  e.trigger();
                });
              },
            };
          }, []),
        }).trigger,
      };
    }
    function B(e, t) {
      return {
        setValue: R(e, t, {
          getProperty: r.useCallback(function (e, t) {
            return e.image(t);
          }, []),
          getValue: r.useCallback(function () {}, []),
          defaultValue: null,
          buildPropertyOperations: r.useCallback(function (e) {
            return {
              setValue: function (t) {
                e(function (e) {
                  e.value = t;
                });
              },
            };
          }, []),
        }).setValue,
      };
    }
    function se(e, t) {
      return {
        setValue: R(e, t, {
          getProperty: r.useCallback(function (e, t) {
            return e.font(t);
          }, []),
          getValue: r.useCallback(function () {}, []),
          defaultValue: null,
          buildPropertyOperations: r.useCallback(function (e) {
            return {
              setValue: function (t) {
                e(function (e) {
                  e.value = t;
                });
              },
            };
          }, []),
        }).setValue,
      };
    }
    function ce(e, t) {
      var n = r.useState(0)[1],
        i = R(e, t, {
          getProperty: r.useCallback(function (e, t) {
            return e.list(t);
          }, []),
          getValue: r.useCallback(function (e) {
            return e.length;
          }, []),
          defaultValue: null,
          onPropertyEvent: function () {
            n(function (e) {
              return e + 1;
            });
          },
          buildPropertyOperations: r.useCallback(function (e) {
            return {
              addInstance: function (t) {
                e(function (e) {
                  return e.addInstance(t);
                });
              },
              addInstanceAt: function (t, n) {
                var r = !1;
                return (
                  e(function (e) {
                    r = e.addInstanceAt(t, n);
                  }),
                  r
                );
              },
              removeInstance: function (t) {
                e(function (e) {
                  return e.removeInstance(t);
                });
              },
              removeInstanceAt: function (t) {
                e(function (e) {
                  return e.removeInstanceAt(t);
                });
              },
              getInstanceAt: function (t) {
                var n = null;
                return (
                  e(function (e) {
                    n = e.instanceAt(t);
                  }),
                  n
                );
              },
              swap: function (t, n) {
                e(function (e) {
                  return e.swap(t, n);
                });
              },
            };
          }, []),
        });
      return {
        length: i.value ?? 0,
        addInstance: i.addInstance,
        addInstanceAt: i.addInstanceAt,
        removeInstance: i.removeInstance,
        removeInstanceAt: i.removeInstanceAt,
        getInstanceAt: i.getInstanceAt,
        swap: i.swap,
      };
    }
    function le(e, t, n, r, i, a, o) {
      try {
        var s = e[a](o),
          c = s.value;
      } catch (e) {
        n(e);
        return;
      }
      s.done ? t(c) : Promise.resolve(c).then(r, i);
    }
    function ue(e) {
      return function () {
        var t = this,
          n = arguments;
        return new Promise(function (r, i) {
          var a = e.apply(t, n);
          function o(e) {
            le(a, r, i, o, s, `next`, e);
          }
          function s(e) {
            le(a, r, i, o, s, `throw`, e);
          }
          o(void 0);
        });
      };
    }
    function de(e, t) {
      var n,
        r,
        i,
        a = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: [],
        },
        o = Object.create(
          (typeof Iterator == `function` ? Iterator : Object).prototype,
        ),
        s = Object.defineProperty;
      return (
        s(o, `next`, { value: c(0) }),
        s(o, `throw`, { value: c(1) }),
        s(o, `return`, { value: c(2) }),
        typeof Symbol == `function` &&
          s(o, Symbol.iterator, {
            value: function () {
              return this;
            },
          }),
        o
      );
      function c(s) {
        return function (c) {
          var l = [s, c];
          if (n) throw TypeError(`Generator is already executing.`);
          for (; o && ((o = 0), l[0] && (a = 0)), a;)
            try {
              if (
                ((n = 1),
                r &&
                  (i =
                    2 & l[0]
                      ? r.return
                      : l[0]
                        ? r.throw || ((i = r.return) && i.call(r), 0)
                        : r.next) &&
                  !(i = i.call(r, l[1])).done)
              )
                return i;
              switch (((r = 0), i && (l = [2 & l[0], i.value]), l[0])) {
                case 0:
                case 1:
                  i = l;
                  break;
                case 4:
                  return (a.label++, { value: l[1], done: !1 });
                case 5:
                  (a.label++, (r = l[1]), (l = [0]));
                  continue;
                case 7:
                  ((l = a.ops.pop()), a.trys.pop());
                  continue;
                default:
                  if (
                    !(i = (i = a.trys).length > 0 && i[i.length - 1]) &&
                    (l[0] === 6 || l[0] === 2)
                  ) {
                    a = 0;
                    continue;
                  }
                  if (l[0] === 3 && (!i || (l[1] > i[0] && l[1] < i[3]))) {
                    a.label = l[1];
                    break;
                  }
                  if (l[0] === 6 && a.label < i[1]) {
                    ((a.label = i[1]), (i = l));
                    break;
                  }
                  if (i && a.label < i[2]) {
                    ((a.label = i[2]), a.ops.push(l));
                    break;
                  }
                  (i[2] && a.ops.pop(), a.trys.pop());
                  continue;
              }
              l = t.call(e, a);
            } catch (e) {
              ((l = [6, e]), (r = 0));
            } finally {
              n = i = 0;
            }
          if (5 & l[0]) throw l[1];
          return { value: l[0] ? l[1] : void 0, done: !0 };
        };
      }
    }
    function fe(e) {
      var t = r.useState(null),
        n = t[0],
        a = t[1],
        o = r.useState(`idle`),
        s = o[0],
        c = o[1];
      return (
        r.useEffect(
          function () {
            var t = null;
            return (
              ue(function () {
                return de(this, function (n) {
                  try {
                    (c(`loading`),
                      (t = new i.RiveFile(e)).init(),
                      t.on(i.EventType.Load, function () {
                        (t?.getInstance(), a(t), c(`success`));
                      }),
                      t.on(i.EventType.LoadError, function () {
                        c(`failed`);
                      }),
                      a(t));
                  } catch (e) {
                    (console.error(e), c(`failed`));
                  }
                  return [2];
                });
              })(),
              function () {
                v(`RiveFile unmount`, function () {
                  return t?.cleanup();
                });
              }
            );
          },
          [e.src, e.buffer, e.enableGPUCanvas],
        ),
        { riveFile: n, status: s }
      );
    }
    function V(e, t) {
      return {
        setValue: R(e, t, {
          getProperty: r.useCallback(function (e, t) {
            return e.artboard(t);
          }, []),
          getValue: r.useCallback(function () {}, []),
          defaultValue: null,
          buildPropertyOperations: r.useCallback(function (e) {
            return {
              setValue: function (t) {
                e(function (e) {
                  e.value = t;
                });
              },
            };
          }, []),
        }).setValue,
      };
    }
    ((e.default = j),
      (e.useGlobalViewModelInstance = te),
      (e.useResizeCanvas = y),
      (e.useRive = O),
      (e.useRiveFile = fe),
      (e.useStateMachineInput = M),
      (e.useViewModel = N),
      (e.useViewModelInstance = ee),
      (e.useViewModelInstanceArtboard = V),
      (e.useViewModelInstanceBoolean = re),
      (e.useViewModelInstanceColor = ie),
      (e.useViewModelInstanceEnum = ae),
      (e.useViewModelInstanceFont = se),
      (e.useViewModelInstanceImage = B),
      (e.useViewModelInstanceList = ce),
      (e.useViewModelInstanceNumber = ne),
      (e.useViewModelInstanceString = z),
      (e.useViewModelInstanceTrigger = oe),
      Object.keys(i).forEach(function (t) {
        t === "default" ||
          e.hasOwnProperty(t) ||
          Object.defineProperty(e, t, {
            enumerable: !0,
            get: function () {
              return i[t];
            },
          });
      }));
  }),
  p = e(n(), 1),
  m = f(),
  h = `<a class="group relative flex h-10 w-full items-center justify-center gap-3 border-b border-border-line bg-neutral-100 px-5 text-sm/5 outline-none transition-[background-color] duration-150 hover:bg-neutral-200/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand dark:bg-neutral-800 dark:hover:bg-neutral-700/60" href="https://www.mintlify.com/state-of-knowledge/2026"><span class="flex shrink-0 items-center gap-1.5 rounded-[2px] bg-brand-8 px-2 py-0.5 text-xs/[18px] font-medium tracking-[0.24px] text-brand-base"><svg aria-hidden="true" class="h-[11.3px] w-3 shrink-0" fill="none" focusable="false" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.275" viewbox="0 0 13.275 12.5893" xmlns="http://www.w3.org/2000/svg"><path d="M4.40893 5.4375V9.20893M7.8375 1.32321V9.20893M11.2661 6.80893V9.20893M0.6375 0.6375V10.5804C0.6375 11.3378 1.25151 11.9518 2.00893 11.9518H12.6375"></path></svg><span class="max-sm:hidden">Featured report</span><span class="sm:hidden">New</span></span><span class="truncate font-medium text-foreground-primary">The 2026 State of Knowledge Report</span><span class="flex shrink-0 items-center gap-0.5 text-foreground-secondary transition-[color] duration-150 group-hover:text-foreground-primary"><span class="max-md:hidden">Read the research</span><svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></a>`,
  g = `<header class="sticky top-0 z-[100] hidden w-full border-b border-border-line bg-background-main lg:block"><div class="grid-layout h-16 items-center"><nav aria-label="Main" class="group/navigation-menu relative flex-1 col-span-full flex h-16 w-full max-w-none items-center justify-between" data-orientation="horizontal" data-slot="navigation-menu" data-viewport="true" dir="ltr"><span data-slot="context-menu-trigger" data-state="closed" style="-webkit-touch-callout:none"><a aria-label="Go to homepage" class="flex items-center rounded-[4px] outline-none outline-offset-2 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand" href="https://www.mintlify.com/"><svg aria-hidden="true" fill="none" height="24" viewbox="0 0 104 24" width="104" xmlns="http://www.w3.org/2000/svg"><path d="M18.4725 9.60528V3.91396C18.4725 3.30323 17.977 2.81641 17.3754 2.81641H11.6867C10.7931 2.81641 9.90842 2.99342 9.08564 3.32977C8.26285 3.67497 7.51085 4.17064 6.88271 4.80793L6.83847 4.85219C6.00684 5.69305 5.41408 6.73749 5.11328 7.88815C5.65296 7.74653 6.2103 7.67572 6.76767 7.66687C8.25399 7.64916 9.71378 8.12713 10.8993 9.02111C11.9698 9.81771 12.7837 10.9153 13.2261 12.181C13.6861 13.4644 13.7392 14.8629 13.3942 16.1817C14.5354 15.8808 15.5883 15.2878 16.4288 14.4558L16.473 14.4115C17.1011 13.7831 17.6054 13.0307 17.9504 12.2075C18.2955 11.3844 18.4636 10.4993 18.4636 9.60528H18.4725Z" fill="#18E299"></path><path d="M4.9434 9.50941C4.95221 7.76347 5.64849 6.08807 6.87361 4.83594L2.14058 9.57113C2.12296 9.58876 2.10532 9.59758 2.08769 9.61522C0.933084 10.7615 0.23681 12.2959 0.122231 13.9183C0.0164654 15.435 0.413078 16.934 1.2592 18.1862C1.33991 18.3056 1.5589 18.3449 1.68229 18.2303L4.58202 15.338C5.48985 14.4298 5.7719 13.0806 5.34002 11.8726C5.06679 11.1231 4.93459 10.3207 4.9434 9.50941Z" fill="#0C8C5E"></path><path d="M16.4445 14.4121C15.5367 15.3027 14.3997 15.92 13.1658 16.1933C11.923 16.4667 10.6362 16.3873 9.43757 15.9641C9.43757 15.9641 9.42874 15.9641 9.41992 15.9641C8.21243 15.532 6.86394 15.8141 5.95612 16.7136L3.05634 19.6058C2.93295 19.7293 2.95057 19.9321 3.10041 20.0291C4.35197 20.8668 5.85035 21.2724 7.36632 21.1666C8.98806 21.052 10.5128 20.3553 11.6674 19.2002L11.7115 19.1561L16.4445 14.4209V14.4121Z" fill="#0C8C5E"></path><path d="M96.2355 23.5H92.6842L95.1868 17.8513L90.1816 6.60156H93.7568L96.6734 13.6537C96.7753 13.9002 97.1246 13.8997 97.2259 13.653L100.12 6.60156H103.719L96.2355 23.5Z" fill="var(--color-text-main)"></path><path d="M85.4483 18.5186V9.46164H83.041V6.60154H85.4483V5.05232C85.4483 3.63816 85.8773 2.5259 86.7353 1.71554C87.5933 0.90518 88.6818 0.5 90.0006 0.5C90.8109 0.5 91.5021 0.587392 92.0742 0.762175V3.64611C91.6928 3.5031 91.2479 3.4316 90.7394 3.4316C90.0244 3.4316 89.508 3.59049 89.1902 3.90828C88.8724 4.21018 88.7135 4.72659 88.7135 5.4575V6.60154H92.0742V9.46164H88.7135V18.5186H85.4483Z" fill="var(--color-text-main)"></path><path d="M80.1204 4.64714C79.5643 4.64714 79.0797 4.44852 78.6666 4.05129C78.2534 3.63816 78.0469 3.14559 78.0469 2.57357C78.0469 2.00155 78.2534 1.51692 78.6666 1.11969C79.0797 0.706563 79.5643 0.5 80.1204 0.5C80.7084 0.5 81.2009 0.706563 81.5982 1.11969C82.0113 1.51692 82.2178 2.00155 82.2178 2.57357C82.2178 3.14559 82.0113 3.63816 81.5982 4.05129C81.2009 4.44852 80.7084 4.64714 80.1204 4.64714ZM78.4997 18.5186V6.60154H81.765V18.5186H78.4997Z" fill="var(--color-text-main)"></path><path d="M72.8125 18.5182V0.642578H76.0778V18.5182H72.8125Z" fill="var(--color-text-main)"></path><path d="M69.1256 18.6621C67.7909 18.6621 66.6945 18.2966 65.8365 17.5657C64.9943 16.8189 64.5733 15.7464 64.5733 14.3481V9.46211H62.166V6.60201H64.5733V3.28906H67.8385V6.60201H71.1992V9.46211H67.8385V13.7046C67.8385 14.4355 67.9974 14.9598 68.3152 15.2776C68.633 15.5795 69.1494 15.7305 69.8644 15.7305C70.3729 15.7305 70.8178 15.659 71.1992 15.516V18.3999C70.6271 18.5747 69.9359 18.6621 69.1256 18.6621Z" fill="var(--color-text-main)"></path><path d="M49.9434 18.5191V6.60202H53.2086V7.47307C53.2086 7.62037 53.4091 7.6855 53.5066 7.57513C54.2346 6.75161 55.2713 6.33984 56.6169 6.33984C58.047 6.33984 59.1672 6.81653 59.9775 7.76989C60.8038 8.70737 61.2169 9.96263 61.2169 11.5357V18.5191H57.9516V12.0839C57.9516 11.21 57.7689 10.5347 57.4034 10.058C57.038 9.5654 56.5216 9.31911 55.8542 9.31911C55.0598 9.31911 54.4162 9.60512 53.9237 10.1771C53.447 10.7492 53.2086 11.5913 53.2086 12.7036V18.5191H49.9434Z" fill="var(--color-text-main)"></path><path d="M45.8783 4.64714C45.3221 4.64714 44.8375 4.44852 44.4244 4.05129C44.0113 3.63816 43.8047 3.14559 43.8047 2.57357C43.8047 2.00155 44.0113 1.51692 44.4244 1.11969C44.8375 0.706563 45.3221 0.5 45.8783 0.5C46.4662 0.5 46.9587 0.706563 47.356 1.11969C47.7691 1.51692 47.9757 2.00155 47.9757 2.57357C47.9757 3.14559 47.7691 3.63816 47.356 4.05129C46.9587 4.44852 46.4662 4.64714 45.8783 4.64714ZM44.2575 18.5186V6.60154H47.5228V18.5186H44.2575Z" fill="var(--color-text-main)"></path><path d="M38.7147 18.5191V12.1554C38.7147 10.2645 38.095 9.31911 36.8557 9.31911C36.1406 9.31911 35.5686 9.58923 35.1396 10.1295C34.7265 10.6697 34.504 11.4721 34.4722 12.5367V18.5191H31.207V12.1554C31.207 10.2645 30.5873 9.31911 29.3479 9.31911C28.617 9.31911 28.037 9.60512 27.608 10.1771C27.179 10.7492 26.9645 11.5913 26.9645 12.7036V18.5191H23.6992V6.60202H26.9645V7.48165C26.9645 7.62818 27.1615 7.69271 27.2578 7.58222C27.9791 6.75397 28.938 6.33984 30.1344 6.33984C31.7067 6.33984 32.8909 6.98895 33.687 8.28717C33.7498 8.38958 33.9044 8.38799 33.9668 8.28535C34.311 7.71964 34.7893 7.26975 35.4018 6.9357C36.1009 6.53846 36.808 6.33984 37.523 6.33984C38.9372 6.33984 40.0335 6.80858 40.8121 7.74606C41.5907 8.68353 41.98 9.97058 41.98 11.6072V18.5191H38.7147Z" fill="var(--color-text-main)"></path></svg></a></span><div class="absolute left-1/2 top-0 flex h-16 -translate-x-1/2 items-center"><span aria-hidden="true" class="pointer-events-none absolute left-0 top-1/2 z-0 h-8 rounded bg-background-soft transition-opacity duration-150 ease-out data-[slide]:transition-[transform,width,opacity] data-[slide]:duration-200 data-[slide]:ease-in-out-strong motion-reduce:transition-none" style="transform:translate(0px, -50%);width:0;opacity:0"></span><div style="position:relative"><ul class="group flex flex-1 list-none items-center justify-center h-16 gap-1.5" data-orientation="horizontal" data-slot="navigation-menu-list" dir="ltr"><li class="relative" data-slot="navigation-menu-item"><button aria-controls="radix-_R_6qaivb_-content-Products" aria-expanded="false" class="group w-max outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand justify-center py-1 cursor-pointer font-medium transition-[background-color] duration-300 group after:content-[''] after:absolute after:inset-[-2px] relative z-10 flex h-16 items-center gap-1 rounded-none bg-transparent px-2.5 text-sm/4 text-text-main outline-none hover:bg-transparent data-[state=open]:bg-transparent before:pointer-events-none before:absolute before:inset-x-0 before:top-1/2 before:h-8 before:-translate-y-1/2 before:rounded before:content-[''] focus-visible:before:outline-2 focus-visible:before:outline-brand" data-navitem="Products" data-radix-collection-item="" data-slot="navigation-menu-trigger" data-state="closed" id="radix-_R_6qaivb_-trigger-Products">Products<svg aria-hidden="true" class="shrink-0 size-4 text-text-sub transition-[rotate,color] duration-200 ease-out-strong group-data-[state=open]:rotate-180 group-data-[state=open]:text-text-main motion-reduce:transition-none" fill="none" viewbox="0 0 24 24"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" fill="currentColor"></path></svg></button></li><li class="relative" data-slot="navigation-menu-item"><button aria-controls="radix-_R_6qaivb_-content-Solutions" aria-expanded="false" class="group w-max outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand justify-center py-1 cursor-pointer font-medium transition-[background-color] duration-300 group after:content-[''] after:absolute after:inset-[-2px] relative z-10 flex h-16 items-center gap-1 rounded-none bg-transparent px-2.5 text-sm/4 text-text-main outline-none hover:bg-transparent data-[state=open]:bg-transparent before:pointer-events-none before:absolute before:inset-x-0 before:top-1/2 before:h-8 before:-translate-y-1/2 before:rounded before:content-[''] focus-visible:before:outline-2 focus-visible:before:outline-brand" data-navitem="Solutions" data-radix-collection-item="" data-slot="navigation-menu-trigger" data-state="closed" id="radix-_R_6qaivb_-trigger-Solutions">Solutions<svg aria-hidden="true" class="shrink-0 size-4 text-text-sub transition-[rotate,color] duration-200 ease-out-strong group-data-[state=open]:rotate-180 group-data-[state=open]:text-text-main motion-reduce:transition-none" fill="none" viewbox="0 0 24 24"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" fill="currentColor"></path></svg></button></li><li class="relative" data-slot="navigation-menu-item"><button aria-controls="radix-_R_6qaivb_-content-Resources" aria-expanded="false" class="group w-max outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand justify-center py-1 cursor-pointer font-medium transition-[background-color] duration-300 group after:content-[''] after:absolute after:inset-[-2px] relative z-10 flex h-16 items-center gap-1 rounded-none bg-transparent px-2.5 text-sm/4 text-text-main outline-none hover:bg-transparent data-[state=open]:bg-transparent before:pointer-events-none before:absolute before:inset-x-0 before:top-1/2 before:h-8 before:-translate-y-1/2 before:rounded before:content-[''] focus-visible:before:outline-2 focus-visible:before:outline-brand" data-navitem="Resources" data-radix-collection-item="" data-slot="navigation-menu-trigger" data-state="closed" id="radix-_R_6qaivb_-trigger-Resources">Resources<svg aria-hidden="true" class="shrink-0 size-4 text-text-sub transition-[rotate,color] duration-200 ease-out-strong group-data-[state=open]:rotate-180 group-data-[state=open]:text-text-main motion-reduce:transition-none" fill="none" viewbox="0 0 24 24"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" fill="currentColor"></path></svg></button></li><li class="relative" data-slot="navigation-menu-item"><a class="group w-max outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand justify-center py-1 cursor-pointer font-medium transition-[background-color] duration-300 data-[active=true]:bg-background-soft relative z-10 flex h-16 items-center gap-1 rounded-none bg-transparent px-2.5 text-sm/4 text-text-main outline-none hover:bg-transparent data-[state=open]:bg-transparent before:pointer-events-none before:absolute before:inset-x-0 before:top-1/2 before:h-8 before:-translate-y-1/2 before:rounded before:content-[''] focus-visible:before:outline-2 focus-visible:before:outline-brand" data-navitem="Pricing" data-radix-collection-item="" data-slot="navigation-menu-link" href="https://www.mintlify.com/pricing">Pricing</a></li></ul></div></div><div class="flex items-center gap-1.5"><div class="relative"><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] font-medium text-sm/4 outline-offset-2 duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 border border-border-sub bg-background-main text-text-main hover:bg-background-soft px-3.5 py-2 transition-[transform,color,background-color,border-color] active:scale-[0.97]" data-slot="button" href="https://app.mintlify.com" rel="noopener" target="_blank"><span class="session:hidden">Sign in</span><span class="hidden session:inline">Dashboard</span></a></div><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent font-medium text-sm/4 outline-offset-2 duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 bg-background-invert text-text-invert hover:bg-background-invert/90 px-3.5 py-2 transition-[transform,color,background-color,border-color] active:scale-[0.97]" data-slot="button" href="https://www.mintlify.com/contact/sales">Contact sales</a></div><div class="absolute left-0 top-full isolate z-50 flex w-auto justify-center perspective-[2000px]"></div></nav></div></header>`,
  _ = `<header class="sticky top-0 z-[100] w-full bg-neutral-0 dark:bg-background-main lg:hidden"><div class="relative z-[110] flex h-16 items-center justify-between border-b border-border-line bg-neutral-0 px-5 dark:bg-background-main"><a aria-label="Go to homepage" class="flex items-center rounded-[4px] outline-none outline-offset-2 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand" href="https://www.mintlify.com/"><svg aria-hidden="true" fill="none" height="24" viewbox="0 0 104 24" width="104" xmlns="http://www.w3.org/2000/svg"><path d="M18.4725 9.60528V3.91396C18.4725 3.30323 17.977 2.81641 17.3754 2.81641H11.6867C10.7931 2.81641 9.90842 2.99342 9.08564 3.32977C8.26285 3.67497 7.51085 4.17064 6.88271 4.80793L6.83847 4.85219C6.00684 5.69305 5.41408 6.73749 5.11328 7.88815C5.65296 7.74653 6.2103 7.67572 6.76767 7.66687C8.25399 7.64916 9.71378 8.12713 10.8993 9.02111C11.9698 9.81771 12.7837 10.9153 13.2261 12.181C13.6861 13.4644 13.7392 14.8629 13.3942 16.1817C14.5354 15.8808 15.5883 15.2878 16.4288 14.4558L16.473 14.4115C17.1011 13.7831 17.6054 13.0307 17.9504 12.2075C18.2955 11.3844 18.4636 10.4993 18.4636 9.60528H18.4725Z" fill="#18E299"></path><path d="M4.9434 9.50941C4.95221 7.76347 5.64849 6.08807 6.87361 4.83594L2.14058 9.57113C2.12296 9.58876 2.10532 9.59758 2.08769 9.61522C0.933084 10.7615 0.23681 12.2959 0.122231 13.9183C0.0164654 15.435 0.413078 16.934 1.2592 18.1862C1.33991 18.3056 1.5589 18.3449 1.68229 18.2303L4.58202 15.338C5.48985 14.4298 5.7719 13.0806 5.34002 11.8726C5.06679 11.1231 4.93459 10.3207 4.9434 9.50941Z" fill="#0C8C5E"></path><path d="M16.4445 14.4121C15.5367 15.3027 14.3997 15.92 13.1658 16.1933C11.923 16.4667 10.6362 16.3873 9.43757 15.9641C9.43757 15.9641 9.42874 15.9641 9.41992 15.9641C8.21243 15.532 6.86394 15.8141 5.95612 16.7136L3.05634 19.6058C2.93295 19.7293 2.95057 19.9321 3.10041 20.0291C4.35197 20.8668 5.85035 21.2724 7.36632 21.1666C8.98806 21.052 10.5128 20.3553 11.6674 19.2002L11.7115 19.1561L16.4445 14.4209V14.4121Z" fill="#0C8C5E"></path><path d="M96.2355 23.5H92.6842L95.1868 17.8513L90.1816 6.60156H93.7568L96.6734 13.6537C96.7753 13.9002 97.1246 13.8997 97.2259 13.653L100.12 6.60156H103.719L96.2355 23.5Z" fill="var(--color-text-main)"></path><path d="M85.4483 18.5186V9.46164H83.041V6.60154H85.4483V5.05232C85.4483 3.63816 85.8773 2.5259 86.7353 1.71554C87.5933 0.90518 88.6818 0.5 90.0006 0.5C90.8109 0.5 91.5021 0.587392 92.0742 0.762175V3.64611C91.6928 3.5031 91.2479 3.4316 90.7394 3.4316C90.0244 3.4316 89.508 3.59049 89.1902 3.90828C88.8724 4.21018 88.7135 4.72659 88.7135 5.4575V6.60154H92.0742V9.46164H88.7135V18.5186H85.4483Z" fill="var(--color-text-main)"></path><path d="M80.1204 4.64714C79.5643 4.64714 79.0797 4.44852 78.6666 4.05129C78.2534 3.63816 78.0469 3.14559 78.0469 2.57357C78.0469 2.00155 78.2534 1.51692 78.6666 1.11969C79.0797 0.706563 79.5643 0.5 80.1204 0.5C80.7084 0.5 81.2009 0.706563 81.5982 1.11969C82.0113 1.51692 82.2178 2.00155 82.2178 2.57357C82.2178 3.14559 82.0113 3.63816 81.5982 4.05129C81.2009 4.44852 80.7084 4.64714 80.1204 4.64714ZM78.4997 18.5186V6.60154H81.765V18.5186H78.4997Z" fill="var(--color-text-main)"></path><path d="M72.8125 18.5182V0.642578H76.0778V18.5182H72.8125Z" fill="var(--color-text-main)"></path><path d="M69.1256 18.6621C67.7909 18.6621 66.6945 18.2966 65.8365 17.5657C64.9943 16.8189 64.5733 15.7464 64.5733 14.3481V9.46211H62.166V6.60201H64.5733V3.28906H67.8385V6.60201H71.1992V9.46211H67.8385V13.7046C67.8385 14.4355 67.9974 14.9598 68.3152 15.2776C68.633 15.5795 69.1494 15.7305 69.8644 15.7305C70.3729 15.7305 70.8178 15.659 71.1992 15.516V18.3999C70.6271 18.5747 69.9359 18.6621 69.1256 18.6621Z" fill="var(--color-text-main)"></path><path d="M49.9434 18.5191V6.60202H53.2086V7.47307C53.2086 7.62037 53.4091 7.6855 53.5066 7.57513C54.2346 6.75161 55.2713 6.33984 56.6169 6.33984C58.047 6.33984 59.1672 6.81653 59.9775 7.76989C60.8038 8.70737 61.2169 9.96263 61.2169 11.5357V18.5191H57.9516V12.0839C57.9516 11.21 57.7689 10.5347 57.4034 10.058C57.038 9.5654 56.5216 9.31911 55.8542 9.31911C55.0598 9.31911 54.4162 9.60512 53.9237 10.1771C53.447 10.7492 53.2086 11.5913 53.2086 12.7036V18.5191H49.9434Z" fill="var(--color-text-main)"></path><path d="M45.8783 4.64714C45.3221 4.64714 44.8375 4.44852 44.4244 4.05129C44.0113 3.63816 43.8047 3.14559 43.8047 2.57357C43.8047 2.00155 44.0113 1.51692 44.4244 1.11969C44.8375 0.706563 45.3221 0.5 45.8783 0.5C46.4662 0.5 46.9587 0.706563 47.356 1.11969C47.7691 1.51692 47.9757 2.00155 47.9757 2.57357C47.9757 3.14559 47.7691 3.63816 47.356 4.05129C46.9587 4.44852 46.4662 4.64714 45.8783 4.64714ZM44.2575 18.5186V6.60154H47.5228V18.5186H44.2575Z" fill="var(--color-text-main)"></path><path d="M38.7147 18.5191V12.1554C38.7147 10.2645 38.095 9.31911 36.8557 9.31911C36.1406 9.31911 35.5686 9.58923 35.1396 10.1295C34.7265 10.6697 34.504 11.4721 34.4722 12.5367V18.5191H31.207V12.1554C31.207 10.2645 30.5873 9.31911 29.3479 9.31911C28.617 9.31911 28.037 9.60512 27.608 10.1771C27.179 10.7492 26.9645 11.5913 26.9645 12.7036V18.5191H23.6992V6.60202H26.9645V7.48165C26.9645 7.62818 27.1615 7.69271 27.2578 7.58222C27.9791 6.75397 28.938 6.33984 30.1344 6.33984C31.7067 6.33984 32.8909 6.98895 33.687 8.28717C33.7498 8.38958 33.9044 8.38799 33.9668 8.28535C34.311 7.71964 34.7893 7.26975 35.4018 6.9357C36.1009 6.53846 36.808 6.33984 37.523 6.33984C38.9372 6.33984 40.0335 6.80858 40.8121 7.74606C41.5907 8.68353 41.98 9.97058 41.98 11.6072V18.5191H38.7147Z" fill="var(--color-text-main)"></path></svg></a><button aria-expanded="false" aria-label="Open menu" class="-mr-1.5 inline-flex items-center justify-center rounded-[4px] border border-border-sub bg-neutral-0 p-2 text-text-main outline-none outline-offset-2 transition-[transform,background-color] duration-150 ease-out-strong focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand active:scale-[0.97] active:bg-background-soft dark:bg-background-main" type="button"><svg class="size-5" fill="none" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path></svg></button></div></header>`,
  v = `<section class="relative overflow-x-clip bg-background-main" data-section="hero" id="hero"><canvas aria-hidden="true" class="block size-full pointer-events-none absolute inset-y-0 left-1/2 z-0 w-full max-w-[1920px] -translate-x-1/2" data-ribbon="hero"></canvas><div class="relative z-10 grid-layout items-start gap-y-8 pt-6 lg:gap-y-0 lg:pb-0 lg:pt-20"><div class="col-span-full flex flex-col gap-4 lg:col-start-1 lg:col-end-9 lg:row-start-1"><a class="group inline-flex w-fit items-center gap-1.5 rounded-[2px] border border-border-sub bg-background-main py-1 pl-2.5 pr-1 outline-offset-2 transition-colors duration-100 hover:bg-background-soft focus-visible:outline-2 focus-visible:outline-brand" href="https://www.mintlify.com/data"><span class="text-xs/4 font-medium tracking-[0.02em] text-text-soft">Agent traffic</span><span class="inline-flex items-center gap-1 rounded-[2px] bg-[rgba(31,167,122,0.08)] py-1 pl-2 pr-1"><span class="font-paper text-xs/4 font-medium tracking-[0.02em] text-brand"><span class="inline-flex h-[1em] items-center leading-[1em] tabular-nums"><span class="sr-only">68.0301</span><span aria-hidden="true" class="contents"><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-6em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-8em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">.</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-0em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-3em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-0em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span></span></span>%</span><svg aria-hidden="true" class="size-4 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none text-[#0c8c5e] opacity-100" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></a><h1 class="font-serif text-[2.5rem]/[2.75rem] tracking-[-0.8px] text-text-main lg:text-[3.125rem]/[3.25rem] lg:tracking-[-2px]">The knowledge infrastructure agents build on</h1><p class="text-lg/6 text-text-sub">Self-updating documentation for <span class="font-medium text-text-main">startups</span>, <span class="font-medium text-text-main">enterprises</span>, and <span class="font-medium text-text-main">agents</span>.</p></div><div class="col-span-full flex flex-wrap items-start gap-2 lg:col-start-1 lg:col-end-9 lg:row-start-2 lg:mt-8"><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pl-4 pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 bg-background-invert text-text-invert hover:bg-background-invert/90 py-3" data-slot="button" href="https://app.mintlify.com/signup" rel="noopener" target="_blank">Get started<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></a><a class="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[4px] border border-border-sub bg-background-main py-3 pl-3 pr-4 text-sm/4 font-medium text-text-main outline-offset-2 transition-colors duration-100 hover:bg-background-soft focus-visible:outline-2 focus-visible:outline-brand" href="https://app.mintlify.com/api/auth/google/discovery" referrerpolicy="no-referrer" rel="noopener" target="_blank"><svg aria-hidden="true" class="size-4" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15.68 8.18c0-.57-.05-1.11-.15-1.64H8v3.1h4.3a3.68 3.68 0 0 1-1.6 2.42v2h2.59c1.51-1.4 2.39-3.45 2.39-5.88Z" fill="#4285F4"></path><path d="M8 16c2.16 0 3.97-.72 5.29-1.94l-2.59-2c-.72.48-1.63.77-2.7.77-2.08 0-3.84-1.4-4.47-3.29H.86v2.07A8 8 0 0 0 8 16Z" fill="#34A853"></path><path d="M3.53 9.54a4.8 4.8 0 0 1 0-3.07V4.4H.86a8 8 0 0 0 0 7.2l2.67-2.06Z" fill="#FBBC05"></path><path d="M8 3.18c1.17 0 2.23.4 3.06 1.2l2.29-2.3A8 8 0 0 0 .86 4.4l2.67 2.07C4.16 4.58 5.92 3.18 8 3.18Z" fill="#EA4335"></path></svg>Sign up with Google</a></div><div class="relative isolate col-span-full mt-16 w-[587px] max-w-none sm:mt-12 sm:w-[120%] lg:col-start-10 lg:col-end-[25] lg:row-start-2 lg:mt-0 lg:w-[1057px] lg:self-start"><div aria-label="Mintlify documentation preview" class="@container relative isolate aspect-[1080/656] w-full" role="img"><div aria-hidden="true" class="pointer-events-none absolute inset-[15px] bottom-[72px] -z-10 rounded-t-xl blur-[24px] dark:hidden" style="background:linear-gradient(106deg, rgba(68,174,255,0.5) 0%, rgba(24,226,153,0.5) 35%, rgba(186,255,36,0.5) 65%, rgba(24,226,153,0.5) 100%)"></div><div class="absolute inset-0 overflow-hidden rounded-t-[2.22cqw] border-l border-r border-t border-[rgba(31,167,122,0.08)]"><img alt="" aria-hidden="true" class="pointer-events-none object-contain object-top dark:hidden" data-nimg="fill" decoding="async" src="../reference/84f651131bcccbf4.svg" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><img alt="" aria-hidden="true" class="pointer-events-none hidden object-contain object-top dark:block" data-nimg="fill" decoding="async" src="../reference/3ff34f45c36d44db.svg" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/></div></div><div aria-hidden="true" class="pointer-events-none absolute inset-0 z-20" style="background:linear-gradient(to bottom, transparent 55%, var(--color-background-main) 96%)"></div></div></div></section>`,
  y = `<section class="border-t border-border-line" data-section="logos" id="logos"><div class="grid-layout relative" data-rail="all"><div class="col-span-full flex flex-col lg:flex-row"><div class="flex flex-col justify-between gap-10 border-b border-border-primary p-7 lg:w-1/3 lg:shrink-0 lg:border-b-0"><h2 class="text-xl/6 font-medium tracking-[-0.01em] text-text-sub lg:text-2xl/7">Join <strong class="font-medium text-text-main">20,000+</strong> of the world's most ambitious companies building for agents.</h2><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pl-4 pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 bg-background-invert text-text-invert hover:bg-background-invert/90 py-3 w-fit" data-slot="button" href="https://www.mintlify.com/customers">Read customer stories<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></a></div><div class="min-w-0 flex-1 lg:border-l lg:border-border-primary"><div class="grid grid-cols-2 gap-3 p-3 sm:grid-cols-4"><div class="group/card relative isolate flex aspect-[163/104] items-center justify-center overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 lg:aspect-[160/155] dark:bg-white/[0.03]"><span aria-hidden="true" class="pointer-events-none absolute inset-0 bg-black/[0.02] opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100 dark:bg-white/[0.02]"></span><span aria-hidden="true" class="pointer-events-none absolute inset-0 flex items-center justify-center text-text-main transition-[translate,opacity] ease-[cubic-bezier(0,0,0,1)] motion-reduce:translate-y-0 dark:text-white [&amp;_svg]:h-6 [&amp;_svg]:w-auto [&amp;_svg]:max-w-[120px] [&amp;_[fill=white]]:fill-current [&amp;_mask_[fill=white]]:[fill:white] translate-y-0 opacity-100" style="transition-duration:500ms;transition-delay:0ms"><span style="transform:scale(0.9)"><svg fill="none" height="26" viewbox="0 0 138 30" width="120" xmlns="http://www.w3.org/2000/svg"><path d="M138 13.328V10.901H134.986V7.12808L134.885 7.15932L132.054 8.02543L131.998 8.04238V10.9012H127.53V9.30858C127.53 8.56702 127.696 7.99953 128.023 7.62107C128.347 7.24715 128.811 7.05706 129.403 7.05706C129.829 7.05706 130.27 7.15731 130.713 7.35502L130.824 7.40468V4.84878L130.772 4.82956C130.358 4.68085 129.796 4.60596 129.098 4.60596C128.219 4.60596 127.42 4.79726 126.724 5.17638C126.027 5.55604 125.479 6.09803 125.095 6.78713C124.712 7.47543 124.518 8.27039 124.518 9.15013V10.901H122.419V13.328H124.518V23.5522H127.53V13.328H131.998V19.8253C131.998 22.5012 133.26 23.8573 135.75 23.8573C136.159 23.8573 136.589 23.8093 137.029 23.7155C137.476 23.6191 137.781 23.5229 137.96 23.4201L138 23.3966V20.9472L137.877 21.0282C137.714 21.1372 137.51 21.2262 137.272 21.2924C137.032 21.3598 136.832 21.3936 136.677 21.3936C136.093 21.3936 135.662 21.2365 135.394 20.9264C135.124 20.6135 134.986 20.0663 134.986 19.3008V13.328H138ZM115.691 21.394C114.598 21.394 113.736 21.0314 113.128 20.3172C112.517 19.5994 112.207 18.5761 112.207 17.2758C112.207 15.9343 112.517 14.8844 113.129 14.1539C113.737 13.4282 114.59 13.0599 115.667 13.0599C116.711 13.0599 117.543 13.4117 118.139 14.106C118.737 14.8039 119.041 15.8454 119.041 17.2025C119.041 18.5763 118.755 19.6316 118.192 20.3375C117.633 21.0381 116.791 21.394 115.691 21.394ZM115.825 10.5963C113.739 10.5963 112.082 11.2075 110.901 12.4131C109.72 13.6189 109.122 15.2874 109.122 17.3729C109.122 19.3537 109.706 20.9469 110.859 22.1077C112.011 23.2688 113.58 23.857 115.52 23.857C117.542 23.857 119.166 23.2372 120.347 22.0149C121.528 20.794 122.126 19.1412 122.126 17.1044C122.126 15.0927 121.565 13.4875 120.457 12.3345C119.349 11.181 117.791 10.5963 115.825 10.5963ZM104.264 10.5963C102.845 10.5963 101.672 10.9592 100.775 11.6749C99.8727 12.3949 99.4151 13.3391 99.4151 14.4816C99.4151 15.0756 99.5138 15.6031 99.7082 16.0506C99.9038 16.4996 100.206 16.8948 100.609 17.2266C101.008 17.5556 101.623 17.9003 102.44 18.251C103.126 18.5334 103.638 18.7722 103.963 18.9604C104.28 19.1449 104.506 19.3303 104.633 19.5109C104.757 19.6877 104.82 19.9296 104.82 20.2281C104.82 21.078 104.183 21.4916 102.873 21.4916C102.388 21.4916 101.833 21.3901 101.226 21.1902C100.624 20.9932 100.055 20.7048 99.5399 20.335L99.4148 20.2453V23.1457L99.4607 23.1671C99.887 23.3639 100.424 23.5298 101.058 23.6604C101.69 23.791 102.265 23.8575 102.764 23.8575C104.303 23.8575 105.543 23.4928 106.448 22.7729C107.359 22.048 107.82 21.0815 107.82 19.8994C107.82 19.0466 107.572 18.3154 107.082 17.7256C106.596 17.1406 105.752 16.6035 104.575 16.1288C103.637 15.7524 103.036 15.4399 102.788 15.2C102.549 14.9682 102.428 14.6405 102.428 14.2255C102.428 13.8576 102.577 13.5628 102.885 13.3241C103.195 13.0842 103.626 12.9622 104.167 12.9622C104.669 12.9622 105.182 13.0415 105.693 13.1969C106.203 13.3523 106.652 13.5604 107.026 13.815L107.149 13.8991V11.1477L107.102 11.1275C106.756 10.9794 106.301 10.8527 105.748 10.7499C105.198 10.6478 104.699 10.5963 104.264 10.5963ZM91.5614 21.394C90.4682 21.394 89.6058 21.0314 88.9984 20.3172C88.387 19.5994 88.0779 18.5763 88.0779 17.2758C88.0779 15.9343 88.3874 14.8844 88.9991 14.1539C89.6065 13.4282 90.4602 13.0599 91.5373 13.0599C92.5814 13.0599 93.413 13.4117 94.0088 14.106C94.6075 14.8039 94.9112 15.8454 94.9112 17.2025C94.9112 18.5763 94.6254 19.6316 94.062 20.3375C93.5026 21.0381 92.6617 21.394 91.5614 21.394ZM91.6957 10.5963C89.6091 10.5963 87.952 11.2075 86.7712 12.4131C85.5906 13.6189 84.9916 15.2874 84.9916 17.3729C84.9916 19.3545 85.5763 20.9469 86.7289 22.1077C87.8815 23.2688 89.4499 23.857 91.3905 23.857C93.4125 23.857 95.0368 23.2372 96.2177 22.0149C97.3982 20.794 97.9967 19.1412 97.9967 17.1044C97.9967 15.0927 97.4352 13.4875 96.3273 12.3345C95.2189 11.181 93.6605 10.5963 91.6957 10.5963ZM80.4186 13.092V10.901H77.4427V23.552H80.4186V17.0805C80.4186 15.9801 80.6681 15.0761 81.1604 14.3933C81.6465 13.7186 82.2942 13.3767 83.085 13.3767C83.3531 13.3767 83.654 13.4209 83.9798 13.5083C84.3024 13.5952 84.536 13.6896 84.6737 13.7889L84.7988 13.8796V10.8794L84.7506 10.8587C84.4735 10.741 84.0814 10.6816 83.5854 10.6816C82.8375 10.6816 82.1683 10.9219 81.5951 11.395C81.0919 11.8108 80.7283 12.381 80.4502 13.092H80.4186ZM72.1135 10.5963C70.7482 10.5963 69.5305 10.889 68.4947 11.4661C67.4568 12.0446 66.6541 12.8704 66.1079 13.9204C65.5642 14.968 65.2881 16.1916 65.2881 17.5562C65.2881 18.7515 65.5558 19.8484 66.0848 20.8152C66.6141 21.7836 67.3633 22.5411 68.3117 23.0666C69.2587 23.5913 70.3532 23.8574 71.5651 23.8574C72.9793 23.8574 74.1868 23.5747 75.1549 23.017L75.194 22.9946V20.2683L75.0689 20.3596C74.6304 20.679 74.1403 20.934 73.613 21.1177C73.0871 21.3012 72.6075 21.394 72.187 21.394C71.0193 21.394 70.0819 21.0286 69.4015 20.3083C68.7196 19.587 68.3739 18.5742 68.3739 17.2997C68.3739 16.0172 68.7344 14.9784 69.445 14.2119C70.1535 13.4476 71.0926 13.0599 72.2362 13.0599C73.2143 13.0599 74.1674 13.3911 75.0692 14.0453L75.194 14.1359V11.2632L75.1537 11.2405C74.8143 11.0506 74.3515 10.8937 73.7769 10.7748C73.2048 10.6561 72.6452 10.5963 72.1135 10.5963ZM63.2386 10.9012H60.2627V23.552H63.2386V10.9012ZM61.7811 5.51185C61.2913 5.51185 60.8641 5.67859 60.5132 6.00899C60.1607 6.34032 59.982 6.7575 59.982 7.24982C59.982 7.73441 60.1586 8.14397 60.5077 8.4665C60.8545 8.78809 61.283 8.95108 61.7812 8.95108C62.2793 8.95108 62.7094 8.78809 63.0604 8.46703C63.4136 8.14397 63.5928 7.73454 63.5928 7.24982C63.5928 6.77472 63.4184 6.36182 63.0749 6.02234C62.7317 5.68353 62.2963 5.51185 61.7811 5.51185ZM54.3561 9.96778V23.552H57.3931V5.89912H53.1898L47.847 19.0111L42.6622 5.89912H38.2877V23.5518H41.1417V9.96645H41.2397L46.7147 23.552H48.8685L54.2581 9.96778H54.3561Z" fill="var(--color-text-main)"></path><path d="M13.9993 13.9993H0V0H13.9993V13.9993Z" fill="#F1511B"></path><path d="M29.4562 13.9993H15.4572V0H29.4562V13.9993Z" fill="#80CC28"></path><path d="M13.9989 29.4616H0V15.4624H13.9989V29.4616Z" fill="#00ADEF"></path><path d="M29.4562 29.4616H15.4572V15.4624H29.4562V29.4616Z" fill="#FBBC09"></path></svg></span></span><span class="sr-only">Microsoft</span></div><div class="group/card relative isolate flex aspect-[163/104] items-center justify-center overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 lg:aspect-[160/155] dark:bg-white/[0.03]"><span aria-hidden="true" class="pointer-events-none absolute inset-0 bg-black/[0.02] opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100 dark:bg-white/[0.02]"></span><span aria-hidden="true" class="pointer-events-none absolute inset-0 flex items-center justify-center text-text-main transition-[translate,opacity] ease-[cubic-bezier(0,0,0,1)] motion-reduce:translate-y-0 dark:text-white [&amp;_svg]:h-6 [&amp;_svg]:w-auto [&amp;_svg]:max-w-[120px] [&amp;_[fill=white]]:fill-current [&amp;_mask_[fill=white]]:[fill:white] translate-y-0 opacity-100" style="transition-duration:500ms;transition-delay:55ms"><span style="transform:scale(0.9)"><img alt="Anthropic" class="h-6 w-auto max-w-[120px] dark:hidden" data-nimg="1" decoding="async" height="24" loading="eager" src="../reference/24ea4f6222f3.svg" style="color:transparent" width="120"/><img alt="Anthropic" class="hidden h-6 w-auto max-w-[120px] dark:block" data-nimg="1" decoding="async" height="24" loading="eager" src="../reference/71d89fce50605060.svg" style="color:transparent" width="120"/></span></span><a aria-label="Anthropic" class="absolute inset-0 rounded-[6px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand" href="https://www.mintlify.com/customers/anthropic"><span aria-hidden="true" class="pointer-events-none absolute bottom-3 right-3 opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100"><svg class="text-text-sub" fill="none" height="16" viewbox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><rect fill="currentColor" fill-opacity="0.05" height="16" rx="2" width="16"></rect><path d="M6.25 4.5L9.75 8 6.25 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></span></a></div><div class="group/card relative isolate flex aspect-[163/104] items-center justify-center overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 lg:aspect-[160/155] dark:bg-white/[0.03]"><span aria-hidden="true" class="pointer-events-none absolute inset-0 bg-black/[0.02] opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100 dark:bg-white/[0.02]"></span><span aria-hidden="true" class="pointer-events-none absolute inset-0 flex items-center justify-center text-text-main transition-[translate,opacity] ease-[cubic-bezier(0,0,0,1)] motion-reduce:translate-y-0 dark:text-white [&amp;_svg]:h-6 [&amp;_svg]:w-auto [&amp;_svg]:max-w-[120px] [&amp;_[fill=white]]:fill-current [&amp;_mask_[fill=white]]:[fill:white] translate-y-0 opacity-100" style="transition-duration:500ms;transition-delay:110ms"><span><img alt="Amazon" class="h-6 w-auto max-w-[120px] dark:hidden" data-nimg="1" decoding="async" height="24" loading="eager" src="../reference/eed5fee14cf3.svg" style="color:transparent" width="120"/><img alt="Amazon" class="hidden h-6 w-auto max-w-[120px] dark:block" data-nimg="1" decoding="async" height="24" loading="eager" src="../reference/39dfbe732951e147.svg" style="color:transparent" width="120"/></span></span><span class="sr-only">Amazon</span></div><div class="group/card relative isolate flex aspect-[163/104] items-center justify-center overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 lg:aspect-[160/155] dark:bg-white/[0.03]"><span aria-hidden="true" class="pointer-events-none absolute inset-0 bg-black/[0.02] opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100 dark:bg-white/[0.02]"></span><span aria-hidden="true" class="pointer-events-none absolute inset-0 flex items-center justify-center text-text-main transition-[translate,opacity] ease-[cubic-bezier(0,0,0,1)] motion-reduce:translate-y-0 dark:text-white [&amp;_svg]:h-6 [&amp;_svg]:w-auto [&amp;_svg]:max-w-[120px] [&amp;_[fill=white]]:fill-current [&amp;_mask_[fill=white]]:[fill:white] translate-y-0 opacity-100" style="transition-duration:500ms;transition-delay:165ms"><span style="transform:scale(0.85)"><svg fill="none" height="25" viewbox="0 0 102 19" width="122" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8659_7106)"><mask height="19" id="mask0_8659_7106" maskunits="userSpaceOnUse" style="mask-type:luminance" width="102" x="0" y="0"><path d="M101.655 0.163651H0.890625V18.1637H101.655V0.163651Z" fill="white"></path></mask><g mask="url(#mask0_8659_7106)"><path class="fill-[#0052FF] dark:fill-[#578BFA]" d="M21.2276 5.18891C17.5671 5.18891 14.7069 7.96772 14.7069 11.6877C14.7069 15.4077 17.4948 18.1627 21.2276 18.1627C24.9605 18.1627 27.7969 15.3602 27.7969 11.6639C27.7969 7.99149 25.0089 5.18891 21.2276 5.18891ZM21.2523 15.4818C19.1678 15.4818 17.6402 13.8628 17.6402 11.6886C17.6402 9.48973 19.1431 7.87167 21.2276 7.87167C23.3369 7.87167 24.8635 9.51443 24.8635 11.6886C24.8635 13.8628 23.3369 15.4818 21.2523 15.4818ZM28.5963 8.01618H30.4146V17.9222H33.3232V5.43039H28.5963V8.01618ZM7.38668 7.87074C8.91421 7.87074 10.1261 8.81288 10.5862 10.2141H13.6651C13.1071 7.21858 10.6347 5.18891 7.41138 5.18891C3.75083 5.18891 0.890625 7.96772 0.890625 11.6886C0.890625 15.4095 3.67857 18.1637 7.41138 18.1637C10.5624 18.1637 13.0833 16.134 13.6413 13.1137H10.5862C10.1499 14.515 8.93797 15.4818 7.41048 15.4818C5.30122 15.4818 3.82308 13.8628 3.82308 11.6886C3.82401 9.48973 5.27835 7.87074 7.38668 7.87074ZM83.863 10.4803L81.73 10.1666C80.7122 10.0221 79.9849 9.68365 79.9849 8.88606C79.9849 8.01618 80.9307 7.5817 82.2149 7.5817C83.6209 7.5817 84.5181 8.18541 84.7118 9.176H87.5238C87.2082 6.66337 85.269 5.18981 82.288 5.18981C79.2092 5.18981 77.1732 6.76034 77.1732 8.983C77.1732 11.1087 78.5066 12.3417 81.1968 12.7277L83.3298 13.0414C84.3727 13.1859 84.9543 13.5976 84.9543 14.3705C84.9543 15.3611 83.9364 15.7718 82.5305 15.7718C80.8089 15.7718 79.8395 15.0711 79.6941 14.0083H76.8337C77.1009 16.4486 79.0154 18.1637 82.5057 18.1637C85.6816 18.1637 87.7898 16.7139 87.7898 14.225C87.7898 12.0024 86.2632 10.8425 83.863 10.4803ZM31.8689 0.284388C30.8024 0.284388 30.0023 1.05729 30.0023 2.12015C30.0023 3.18301 30.8016 3.95591 31.8689 3.95591C32.9354 3.95591 33.7358 3.18301 33.7358 2.12015C33.7358 1.05729 32.9354 0.284388 31.8689 0.284388ZM74.5553 9.70742C74.5553 7.00179 72.9072 5.18981 69.4166 5.18981C66.1201 5.18981 64.2779 6.85729 63.914 9.41838H66.7988C66.9442 8.42779 67.7198 7.6064 69.3682 7.6064C70.8473 7.6064 71.5744 8.25856 71.5744 9.05618C71.5744 10.0953 70.2407 10.3605 68.5926 10.5297C66.3625 10.7712 63.5993 11.5441 63.5993 14.4436C63.5993 16.691 65.2721 18.1399 67.9387 18.1399C70.023 18.1399 71.3319 17.27 71.987 15.8925C72.084 17.1246 73.0051 17.9222 74.2901 17.9222H75.9869V15.3373H74.5562V9.70742H74.5553ZM71.695 12.8484C71.695 14.5159 70.2407 15.748 68.4708 15.748C67.3798 15.748 66.4587 15.2888 66.4587 14.3229C66.4587 13.0908 67.9375 12.7524 69.2951 12.6079C70.6041 12.4872 71.3311 12.1972 71.695 11.6411V12.8484ZM56.2544 5.18891C54.6299 5.18891 53.2726 5.86577 52.3031 7.00089V0.163651H49.3944V17.9222H52.2545V16.2794C53.2239 17.463 54.6063 18.1637 56.2544 18.1637C59.7447 18.1637 62.3873 15.4095 62.3873 11.6886C62.3873 7.96772 59.6963 5.18891 56.2544 5.18891ZM55.8182 15.4818C53.7336 15.4818 52.2061 13.8628 52.2061 11.6886C52.2061 9.51443 53.7575 7.87167 55.8418 7.87167C57.9512 7.87167 59.4292 9.49066 59.4292 11.6886C59.4292 13.8628 57.9025 15.4818 55.8182 15.4818ZM42.4372 5.18891C40.5466 5.18891 39.3099 5.96182 38.5829 7.04935V5.43039H35.6978V17.9213H38.6065V11.1325C38.6065 9.22356 39.8184 7.87074 41.6122 7.87074C43.2851 7.87074 44.3269 9.05436 44.3269 10.7703V17.9222H47.2356V10.5535C47.2367 7.41158 45.613 5.18891 42.4372 5.18891ZM101.655 11.2779C101.655 7.70244 99.0376 5.18981 95.5225 5.18981C91.7898 5.18981 89.0504 7.99241 89.0504 11.6886C89.0504 15.5788 91.9836 18.1637 95.5712 18.1637C98.6014 18.1637 100.977 16.3755 101.582 13.839H98.5519C98.1157 14.9504 97.0492 15.5788 95.6187 15.5788C93.7518 15.5788 92.3458 14.4189 92.0311 12.3893H101.655V11.2779H101.655ZM92.2012 10.3111C92.6625 8.57139 93.9712 7.72624 95.4742 7.72624C97.1223 7.72624 98.3828 8.66834 98.6737 10.3111H92.2012Z"></path></g></g><defs><clippath id="clip0_8659_7106"><rect fill="white" height="18" transform="translate(0.890625 0.163651)" width="100.969"></rect></clippath></defs></svg></span></span><a aria-label="Coinbase" class="absolute inset-0 rounded-[6px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand" href="https://www.mintlify.com/customers/coinbase"><span aria-hidden="true" class="pointer-events-none absolute bottom-3 right-3 opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100"><svg class="text-text-sub" fill="none" height="16" viewbox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><rect fill="currentColor" fill-opacity="0.05" height="16" rx="2" width="16"></rect><path d="M6.25 4.5L9.75 8 6.25 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></span></a></div><div class="group/card relative isolate flex aspect-[163/104] items-center justify-center overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 lg:aspect-[160/155] dark:bg-white/[0.03]"><span aria-hidden="true" class="pointer-events-none absolute inset-0 bg-black/[0.02] opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100 dark:bg-white/[0.02]"></span><span aria-hidden="true" class="pointer-events-none absolute inset-0 flex items-center justify-center text-text-main transition-[translate,opacity] ease-[cubic-bezier(0,0,0,1)] motion-reduce:translate-y-0 dark:text-white [&amp;_svg]:h-6 [&amp;_svg]:w-auto [&amp;_svg]:max-w-[120px] [&amp;_[fill=white]]:fill-current [&amp;_mask_[fill=white]]:[fill:white] translate-y-0 opacity-100" style="transition-duration:500ms;transition-delay:55ms"><span><img alt="Cognition" class="h-6 w-auto max-w-[120px] dark:hidden" data-nimg="1" decoding="async" height="24" loading="eager" src="../reference/f2603ee9ee35.svg" style="color:transparent" width="120"/><img alt="Cognition" class="hidden h-6 w-auto max-w-[120px] dark:block" data-nimg="1" decoding="async" height="24" loading="eager" src="../reference/da778c0690940ce4.svg" style="color:transparent" width="120"/></span></span><a aria-label="Cognition" class="absolute inset-0 rounded-[6px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand" href="https://www.mintlify.com/customers/cognition"><span aria-hidden="true" class="pointer-events-none absolute bottom-3 right-3 opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100"><svg class="text-text-sub" fill="none" height="16" viewbox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><rect fill="currentColor" fill-opacity="0.05" height="16" rx="2" width="16"></rect><path d="M6.25 4.5L9.75 8 6.25 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></span></a></div><div class="group/card relative isolate flex aspect-[163/104] items-center justify-center overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 lg:aspect-[160/155] dark:bg-white/[0.03]"><span aria-hidden="true" class="pointer-events-none absolute inset-0 bg-black/[0.02] opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100 dark:bg-white/[0.02]"></span><span aria-hidden="true" class="pointer-events-none absolute inset-0 flex items-center justify-center text-text-main transition-[translate,opacity] ease-[cubic-bezier(0,0,0,1)] motion-reduce:translate-y-0 dark:text-white [&amp;_svg]:h-6 [&amp;_svg]:w-auto [&amp;_svg]:max-w-[120px] [&amp;_[fill=white]]:fill-current [&amp;_mask_[fill=white]]:[fill:white] translate-y-0 opacity-100" style="transition-duration:500ms;transition-delay:110ms"><span style="transform:scale(0.85)"><img alt="Solana" class="h-6 w-auto max-w-[120px] dark:hidden" data-nimg="1" decoding="async" height="24" loading="eager" src="../reference/3820adeb64d3.svg" style="color:transparent" width="120"/><img alt="Solana" class="hidden h-6 w-auto max-w-[120px] dark:block" data-nimg="1" decoding="async" height="24" loading="eager" src="../reference/c852f85ab15aab1b.svg" style="color:transparent" width="120"/></span></span><span class="sr-only">Solana</span></div><div class="group/card relative isolate flex aspect-[163/104] items-center justify-center overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 lg:aspect-[160/155] dark:bg-white/[0.03]"><span aria-hidden="true" class="pointer-events-none absolute inset-0 bg-black/[0.02] opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100 dark:bg-white/[0.02]"></span><span aria-hidden="true" class="pointer-events-none absolute inset-0 flex items-center justify-center text-text-main transition-[translate,opacity] ease-[cubic-bezier(0,0,0,1)] motion-reduce:translate-y-0 dark:text-white [&amp;_svg]:h-6 [&amp;_svg]:w-auto [&amp;_svg]:max-w-[120px] [&amp;_[fill=white]]:fill-current [&amp;_mask_[fill=white]]:[fill:white] translate-y-0 opacity-100" style="transition-duration:500ms;transition-delay:165ms"><span style="transform:scale(1.21)"><img alt="AT&amp;T" class="h-6 w-auto max-w-[120px] dark:hidden" data-nimg="1" decoding="async" height="24" loading="eager" src="../reference/fc9cf2d27a00.svg" style="color:transparent" width="120"/><img alt="AT&amp;T" class="hidden h-6 w-auto max-w-[120px] dark:block" data-nimg="1" decoding="async" height="24" loading="eager" src="../reference/e35ad5544f9af52d.svg" style="color:transparent" width="120"/></span></span><a aria-label="AT&amp;T" class="absolute inset-0 rounded-[6px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand" href="https://www.mintlify.com/customers/att"><span aria-hidden="true" class="pointer-events-none absolute bottom-3 right-3 opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100"><svg class="text-text-sub" fill="none" height="16" viewbox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><rect fill="currentColor" fill-opacity="0.05" height="16" rx="2" width="16"></rect><path d="M6.25 4.5L9.75 8 6.25 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></span></a></div><div class="group/card relative isolate flex aspect-[163/104] items-center justify-center overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 lg:aspect-[160/155] dark:bg-white/[0.03]"><span aria-hidden="true" class="pointer-events-none absolute inset-0 bg-black/[0.02] opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100 dark:bg-white/[0.02]"></span><span aria-hidden="true" class="pointer-events-none absolute inset-0 flex items-center justify-center text-text-main transition-[translate,opacity] ease-[cubic-bezier(0,0,0,1)] motion-reduce:translate-y-0 dark:text-white [&amp;_svg]:h-6 [&amp;_svg]:w-auto [&amp;_svg]:max-w-[120px] [&amp;_[fill=white]]:fill-current [&amp;_mask_[fill=white]]:[fill:white] translate-y-0 opacity-100" style="transition-duration:500ms;transition-delay:220ms"><span style="transform:scale(0.9)"><svg fill="currentColor" viewbox="0 0 200 40" xmlns="http://www.w3.org/2000/svg"><path d="M72.372 16.577c0-3.409-2.311-6.732-7.282-6.732H52.232v20.226h4.335V13.485h7.89c2.427 0 3.582 1.186 3.582 3.092 0 1.936-1.157 3.121-3.583 3.121H61.1c-1.52 0-2.375.855-2.375 2.375v1.267h2.408c1.126 0 1.964.377 2.66 1.272l4.275 5.46h5.316l-5.952-7.57c3.178-.725 4.94-2.806 4.94-5.925M87.956 9.843h-4.335v20.226h4.335zM121.362 9.843h-4.623L109.4 25.505l-7.34-15.662h-4.623l9.651 20.228h4.623zM135.256 9.843h-4.335v20.226h4.335zM159.299 9.843h-4.623l-9.939 20.226h4.623l1.243-2.6c.519-1.098 1.329-1.59 2.543-1.59h7.513l-.896-1.907c-.549-1.186-1.445-1.733-2.773-1.733h-3.842l3.842-7.975 7.627 15.805h4.624zM200 9.843h-4.19v15.026L183.703 9.843h-4.969v20.228h4.19V15.044l12.105 15.027H200zM41.078 18.41C38.75 16.01 26.156 3.02 23.795 1.146 22.971.485 21.911 0 20.58 0c-1.332 0-2.393.484-3.215 1.145C15.005 3.019 2.41 16.009.081 18.41c-.19.218-.019.562.267.562 1.163 0 3.86.004 5.484.004.572 0 .742-.1 1.102-.487l2.15-2.307c2.276-2.455 7.83-7.875 9.859-9.584.762-.641 1.625-.62 1.637-.62.012 0 .875-.021 1.637.62 2.03 1.711 7.583 7.131 9.86 9.584l2.15 2.307c.36.387.529.487 1.101.487 1.623 0 4.32-.004 5.484-.004.286.002.456-.344.266-.562M.08 21.503c2.328 2.401 14.922 15.392 17.283 17.266.823.66 1.884 1.145 3.215 1.145 1.332 0 2.393-.485 3.215-1.145 2.36-1.874 14.954-14.865 17.282-17.266.19-.219.018-.562-.268-.562-1.163 0-3.858-.004-5.483-.004-.572 0-.742.1-1.102.486l-2.15 2.308c-2.277 2.454-7.83 7.874-9.86 9.583-.762.642-1.624.621-1.636.621-.013 0-.875.02-1.637-.62-2.03-1.712-7.583-7.132-9.86-9.584l-2.15-2.308c-.36-.386-.53-.486-1.102-.486-1.622 0-4.32.004-5.483.004-.282 0-.454.343-.264.562" fill="currentColor"></path><path d="M19.057 24.252c-1.038-.948-2.867-2.722-3.548-3.517-.31-.352-.29-.791-.29-.791s-.02-.44.29-.791c.68-.795 2.51-2.57 3.548-3.518.425-.396.527-.646.527-1.132V9.109c0-.216-.253-.351-.45-.17-2.315 2.145-7.473 7.256-9.203 9.237-.827.876-.75 1.77-.75 1.77s-.075.89.75 1.77c1.732 1.98 6.89 7.092 9.204 9.235.206.18.45.068.45-.187v-5.378c0-.49-.103-.74-.528-1.134M22.102 24.256c1.039-.948 2.868-2.722 3.548-3.517.311-.352.29-.791.29-.791s.021-.44-.29-.791c-.68-.795-2.51-2.57-3.548-3.518-.425-.396-.527-.646-.527-1.132V9.13c0-.256.243-.368.45-.188 2.315 2.144 7.474 7.255 9.203 9.236.826.877.75 1.77.75 1.77s.076.89-.75 1.77c-1.731 1.98-6.89 7.092-9.203 9.236-.207.18-.45.067-.45-.188v-5.378c.002-.488.102-.736.527-1.132" fill="#FFB100"></path><path d="M41.078 18.41C38.75 16.01 26.156 3.02 23.795 1.146 22.971.485 21.911 0 20.58 0c-1.332 0-2.393.484-3.215 1.145C15.005 3.019 2.41 16.009.081 18.41c-.19.218-.019.562.267.562 1.163 0 3.86.004 5.484.004.572 0 .742-.1 1.102-.487l2.15-2.307c2.276-2.455 7.83-7.875 9.859-9.584.762-.641 1.625-.62 1.637-.62.012 0 .875-.021 1.637.62 2.03 1.711 7.583 7.131 9.86 9.584l2.15 2.307c.36.387.529.487 1.101.487 1.623 0 4.32-.004 5.484-.004.286.002.456-.344.266-.562M.08 21.503c2.328 2.401 14.922 15.392 17.283 17.266.823.66 1.884 1.145 3.215 1.145 1.332 0 2.393-.485 3.215-1.145 2.36-1.874 14.954-14.865 17.282-17.266.19-.219.018-.562-.268-.562-1.163 0-3.858-.004-5.483-.004-.572 0-.742.1-1.102.486l-2.15 2.308c-2.277 2.454-7.83 7.874-9.86 9.583-.762.642-1.624.621-1.636.621-.013 0-.875.02-1.637-.62-2.03-1.712-7.583-7.132-9.86-9.584l-2.15-2.308c-.36-.386-.53-.486-1.102-.486-1.622 0-4.32.004-5.483.004-.282 0-.454.343-.264.562" fill="#FFB100"></path></svg></span></span><a aria-label="Rivian" class="absolute inset-0 rounded-[6px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand" href="https://www.mintlify.com/customers/rivian"><span aria-hidden="true" class="pointer-events-none absolute bottom-3 right-3 opacity-0 transition-opacity duration-150 ease-out group-hover/card:opacity-100"><svg class="text-text-sub" fill="none" height="16" viewbox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><rect fill="currentColor" fill-opacity="0.05" height="16" rx="2" width="16"></rect><path d="M6.25 4.5L9.75 8 6.25 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></span></a></div></div></div></div></div><div class="relative border-y border-border-line bg-background-main" data-stats-bar="true"><div class="grid-layout px-7"><div class="col-span-full flex items-center gap-4 py-5 lg:gap-6 lg:py-8"><span class="shrink-0 text-[15px]/6 font-medium text-text-main lg:text-base/6">Agents at work today</span><span aria-hidden="true" class="h-5 w-px shrink-0 bg-border-primary"></span><div aria-label="Live stats, focus to pause" class="relative isolate -ml-4 min-w-0 flex-1 overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand lg:-ml-6" role="marquee" tabindex="0"><div class="flex w-max backface-hidden [-webkit-perspective:1000px]" style="animation:40s linear infinite stats-scroll"><div class="flex items-center gap-8 pr-8"><span class="flex shrink-0 items-center gap-2 whitespace-nowrap"><span class="text-xs/4 font-medium tracking-[0.02em] text-text-sub">Pages read</span><span class="rounded-[2px] bg-[rgba(31,167,122,0.08)] px-2 py-1 font-paper text-xs/4 font-medium tracking-[0.02em] text-brand [transform:translateZ(0)]"><span class="inline-flex h-[1em] items-center leading-[1em] tabular-nums"><span class="sr-only">10,759,862</span><span aria-hidden="true" class="contents"><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-0em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-7em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-5em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-9em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-8em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-6em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span></span></span></span></span><span class="flex shrink-0 items-center gap-2 whitespace-nowrap"><span class="text-xs/4 font-medium tracking-[0.02em] text-text-sub">Search requests</span><span class="rounded-[2px] bg-[rgba(31,167,122,0.08)] px-2 py-1 font-paper text-xs/4 font-medium tracking-[0.02em] text-brand [transform:translateZ(0)]"><span class="inline-flex h-[1em] items-center leading-[1em] tabular-nums"><span class="sr-only">129,951</span><span aria-hidden="true" class="contents"><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-9em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-9em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-5em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span></span></span></span></span><span class="flex shrink-0 items-center gap-2 whitespace-nowrap"><span class="text-xs/4 font-medium tracking-[0.02em] text-text-sub">API requests</span><span class="rounded-[2px] bg-[rgba(31,167,122,0.08)] px-2 py-1 font-paper text-xs/4 font-medium tracking-[0.02em] text-brand [transform:translateZ(0)]"><span class="inline-flex h-[1em] items-center leading-[1em] tabular-nums"><span class="sr-only">21,190</span><span aria-hidden="true" class="contents"><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-9em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-0em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span></span></span></span></span><span class="flex shrink-0 items-center gap-2 whitespace-nowrap"><span class="text-xs/4 font-medium tracking-[0.02em] text-text-sub">Feedback provided</span><span class="rounded-[2px] bg-[rgba(31,167,122,0.08)] px-2 py-1 font-paper text-xs/4 font-medium tracking-[0.02em] text-brand [transform:translateZ(0)]"><span class="inline-flex h-[1em] items-center leading-[1em] tabular-nums"><span class="sr-only">2,802</span><span aria-hidden="true" class="contents"><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-8em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-0em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span></span></span></span></span><span class="flex shrink-0 items-center gap-2 whitespace-nowrap"><span class="text-xs/4 font-medium tracking-[0.02em] text-text-sub">Content updates</span><span class="rounded-[2px] bg-[rgba(31,167,122,0.08)] px-2 py-1 font-paper text-xs/4 font-medium tracking-[0.02em] text-brand [transform:translateZ(0)]"><span class="inline-flex h-[1em] items-center leading-[1em] tabular-nums"><span class="sr-only">21,548</span><span aria-hidden="true" class="contents"><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-5em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-4em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-8em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span></span></span></span></span></div><div aria-hidden="true"><div class="flex items-center gap-8 pr-8"><span class="flex shrink-0 items-center gap-2 whitespace-nowrap"><span class="text-xs/4 font-medium tracking-[0.02em] text-text-sub">Pages read</span><span class="rounded-[2px] bg-[rgba(31,167,122,0.08)] px-2 py-1 font-paper text-xs/4 font-medium tracking-[0.02em] text-brand [transform:translateZ(0)]"><span class="inline-flex h-[1em] items-center leading-[1em] tabular-nums"><span class="sr-only">10,759,862</span><span aria-hidden="true" class="contents"><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-0em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-7em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-5em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-9em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-8em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-6em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span></span></span></span></span><span class="flex shrink-0 items-center gap-2 whitespace-nowrap"><span class="text-xs/4 font-medium tracking-[0.02em] text-text-sub">Search requests</span><span class="rounded-[2px] bg-[rgba(31,167,122,0.08)] px-2 py-1 font-paper text-xs/4 font-medium tracking-[0.02em] text-brand [transform:translateZ(0)]"><span class="inline-flex h-[1em] items-center leading-[1em] tabular-nums"><span class="sr-only">129,951</span><span aria-hidden="true" class="contents"><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-9em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-9em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-5em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span></span></span></span></span><span class="flex shrink-0 items-center gap-2 whitespace-nowrap"><span class="text-xs/4 font-medium tracking-[0.02em] text-text-sub">API requests</span><span class="rounded-[2px] bg-[rgba(31,167,122,0.08)] px-2 py-1 font-paper text-xs/4 font-medium tracking-[0.02em] text-brand [transform:translateZ(0)]"><span class="inline-flex h-[1em] items-center leading-[1em] tabular-nums"><span class="sr-only">21,190</span><span aria-hidden="true" class="contents"><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-9em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-0em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span></span></span></span></span><span class="flex shrink-0 items-center gap-2 whitespace-nowrap"><span class="text-xs/4 font-medium tracking-[0.02em] text-text-sub">Feedback provided</span><span class="rounded-[2px] bg-[rgba(31,167,122,0.08)] px-2 py-1 font-paper text-xs/4 font-medium tracking-[0.02em] text-brand [transform:translateZ(0)]"><span class="inline-flex h-[1em] items-center leading-[1em] tabular-nums"><span class="sr-only">2,802</span><span aria-hidden="true" class="contents"><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-8em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-0em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span></span></span></span></span><span class="flex shrink-0 items-center gap-2 whitespace-nowrap"><span class="text-xs/4 font-medium tracking-[0.02em] text-text-sub">Content updates</span><span class="rounded-[2px] bg-[rgba(31,167,122,0.08)] px-2 py-1 font-paper text-xs/4 font-medium tracking-[0.02em] text-brand [transform:translateZ(0)]"><span class="inline-flex h-[1em] items-center leading-[1em] tabular-nums"><span class="sr-only">21,548</span><span aria-hidden="true" class="contents"><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-2em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-1em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="opacity-50">,</span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-5em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-4em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span><span class="relative inline-flex h-[1em] overflow-hidden leading-[1em]"><span class="flex flex-col transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none" style="transform:translateY(-8em) translateZ(0)"><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">0</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">1</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">2</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">3</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">4</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">5</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">6</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">7</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">8</span><span class="flex h-[1em] shrink-0 items-center justify-center leading-[1em]">9</span></span></span></span></span></span></span></div></div></div><div aria-hidden="true" class="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-[linear-gradient(to_right,var(--color-background-main)_0%,transparent_71%)]"></div><div aria-hidden="true" class="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-[linear-gradient(to_right,transparent_0%,var(--color-background-main)_71%)]"></div></div></div></div></div><div aria-hidden="true" class="grid-layout relative pb-40" data-rail="all"></div></section>`,
  b = `<section class="" data-section="features" id="features"><div class="bg-background-main"><div class="grid-layout relative py-8 lg:py-10" data-rail="all"><span aria-hidden="true" class="absolute left-0 top-12 block h-6 w-[2px] -translate-y-1/2 bg-brand-base lg:top-15"></span><header class="col-span-full flex flex-col gap-10 px-7 md:flex-row md:items-end md:justify-between md:gap-6 lg:col-start-2 lg:col-end-24 lg:px-0"><div class="flex max-w-[41.5rem] flex-col gap-7 md:self-start"><div class="flex flex-col gap-4"><h2 class="text-balance text-[1.75rem]/8 font-medium tracking-[-0.72px] text-foreground-primary lg:text-[2.25rem]/[2.5rem]">One platform for your entire knowledge stack.<span class="block text-foreground-tertiary">Agents that keep work moving 24/7.</span></h2></div></div><div class="shrink-0 md:pb-1"><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pl-4 pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 bg-background-invert text-text-invert hover:bg-background-invert/90 py-3" data-slot="button" href="https://app.mintlify.com/signup" rel="noopener" target="_blank">Get started<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></a></div></header></div></div><div class="grid-layout relative" data-rail="all"><div class="relative col-span-full lg:p-4 py-4"><div class="grid grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:px-0 lg:[grid-auto-rows:25.75rem]"><div class="group relative isolate aspect-[338/412] w-full lg:aspect-auto lg:min-h-0 sm:col-span-2 sm:aspect-[2/1]"><article class="relative flex h-full flex-col overflow-hidden rounded-xl border border-border-sub bg-[#f9f6f3] p-8 dark:bg-[#0f0f12]"><div class="absolute inset-0 size-full"><canvas aria-hidden="true" data-rive="agent-native-platform" style="vertical-align:top;width:0;height:0"></canvas></div><div class="relative z-10 flex h-full flex-col"><h3 class="mt-auto pt-8 text-base/6 font-medium text-text-main">Agent-native platform</h3></div></article></div><div class="group relative isolate aspect-[338/412] w-full lg:aspect-auto lg:min-h-0 sm:col-span-1"><article class="relative flex h-full flex-col overflow-hidden rounded-xl border border-border-sub bg-[#f9f6f3] p-8 dark:bg-[#0f0f12]"><div class="absolute inset-0 size-full"><canvas aria-hidden="true" data-rive="self-updating-knowledge" style="vertical-align:top;width:0;height:0"></canvas></div><div class="relative z-10 flex h-full flex-col"><h3 class="mt-auto pt-8 text-base/6 font-medium text-text-main">Self-updating knowledge</h3></div></article></div><div class="group relative isolate aspect-[338/412] w-full lg:aspect-auto lg:min-h-0 sm:col-span-1"><article class="relative flex h-full flex-col overflow-hidden rounded-xl border border-border-sub bg-[#f9f6f3] p-8 dark:bg-[#0f0f12]"><div class="absolute inset-0 size-full"><canvas aria-hidden="true" data-rive="control-who-has-access" style="vertical-align:top;width:0;height:0"></canvas></div><div class="relative z-10 flex h-full flex-col"><h3 class="mt-auto pt-8 text-base/6 font-medium text-text-main">Control who has access</h3></div></article></div><div class="group relative isolate aspect-[338/412] w-full lg:aspect-auto lg:min-h-0 sm:col-span-1"><article class="relative flex h-full flex-col overflow-hidden rounded-xl border border-border-sub bg-[#f9f6f3] p-8 dark:bg-[#0f0f12]"><div class="absolute inset-0 size-full"><canvas aria-hidden="true" data-rive="connect-with-your-systems" style="vertical-align:top;width:0;height:0"></canvas></div><div class="relative z-10 flex h-full flex-col"><h3 class="mt-auto pt-8 text-base/6 font-medium text-text-main">Connect with your systems</h3></div></article></div><div class="group relative isolate aspect-[338/412] w-full lg:aspect-auto lg:min-h-0 sm:col-span-1"><article class="relative flex h-full flex-col overflow-hidden rounded-xl border border-border-sub bg-[#f9f6f3] p-8 dark:bg-[#0f0f12]"><div class="absolute inset-0 size-full"><canvas aria-hidden="true" data-rive="collaborate-with-your-team-and-agents" style="vertical-align:top;width:0;height:0"></canvas></div><div class="relative z-10 flex h-full flex-col"><h3 class="mt-auto pt-8 text-base/6 font-medium text-text-main">Collaborate with your team &amp; agents</h3></div></article></div><div class="group relative isolate aspect-[338/412] w-full lg:aspect-auto lg:min-h-0 sm:col-span-2 sm:aspect-[2/1] lg:col-span-3"><article class="relative flex h-full flex-col overflow-hidden rounded-xl border border-border-sub bg-[#f9f6f3] p-8 dark:bg-[#0f0f12]"><div class="absolute inset-0 size-full"><canvas aria-hidden="true" data-rive="build-on-top-of-your-existing-setup" style="vertical-align:top;width:0;height:0"></canvas></div><div class="relative z-10 flex h-full flex-col"><h3 class="mt-auto pt-8 text-base/6 font-medium text-text-main">Build on top of your existing setup</h3></div></article></div></div></div></div><div aria-hidden="true" class="grid-layout relative pb-30 lg:pb-40" data-rail="all"></div></section>`,
  x = `<section class="" data-section="enterprise" id="enterprise"><div class="bg-background-main"><div class="grid-layout relative py-8 lg:py-10" data-line="bleed" data-rail="all"><span aria-hidden="true" class="absolute left-0 top-12 block h-6 w-[2px] -translate-y-1/2 bg-brand-base lg:top-15"></span><header class="col-span-full flex flex-col gap-10 px-7 md:flex-row md:items-end md:justify-between md:gap-6 lg:col-start-2 lg:col-end-24 lg:px-0"><div class="flex max-w-[41.5rem] flex-col gap-7 md:self-start"><div class="flex flex-col gap-4"><h2 class="text-balance text-[1.75rem]/8 font-medium tracking-[-0.72px] text-foreground-primary lg:text-[2.25rem]/[2.5rem]">Powering businesses of all sizes.<span class="block text-foreground-tertiary">Run your business on a reliable platform that adapts to your needs.</span></h2></div></div><div class="shrink-0 md:pb-1"><div class="flex items-center gap-3"><div class="flex items-center gap-2"><button aria-controls="_R_12nnaaivb_" aria-label="Previous customer story" blossom-prev="" class="flex cursor-pointer items-center justify-center gap-1 rounded-[4px] border border-border-secondary bg-background-primary p-3 text-foreground-primary outline-offset-2 transition-colors duration-100 hover:bg-background-soft focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-default disabled:opacity-40 disabled:hover:bg-background-primary" command="--blossom-prev" commandfor="_R_12nnaaivb_" data-direction="prev" type="button"><svg class="shrink-0 select-none size-4 opacity-50" fill="none" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M7.21968 8.00047L10.5195 4.70062L9.57672 3.75781L5.33408 8.00047L9.57672 12.2431L10.5195 11.3003L7.21968 8.00047Z" fill="currentColor"></path></svg></button><button aria-controls="_R_12nnaaivb_" aria-label="Next customer story" blossom-next="" class="flex cursor-pointer items-center justify-center gap-1 rounded-[4px] border border-border-secondary bg-background-primary p-3 text-foreground-primary outline-offset-2 transition-colors duration-100 hover:bg-background-soft focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-default disabled:opacity-40 disabled:hover:bg-background-primary" command="--blossom-next" commandfor="_R_12nnaaivb_" data-direction="next" type="button"><svg class="shrink-0 select-none size-4 rotate-180 opacity-50" fill="none" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M7.21968 8.00047L10.5195 4.70062L9.57672 3.75781L5.33408 8.00047L9.57672 12.2431L10.5195 11.3003L7.21968 8.00047Z" fill="currentColor"></path></svg></button></div><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pl-4 pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 bg-background-invert text-text-invert hover:bg-background-invert/90 py-3 max-md:order-first" data-slot="button" href="https://www.mintlify.com/enterprise">For enterprises<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></a></div></div></header></div></div><div class="grid-layout relative" data-line="bleed"><div class="isolate relative col-span-full lg:p-4 py-4"><canvas aria-hidden="true" class="pointer-events-none absolute left-0 top-0 -z-10" data-dots="true"></canvas><div aria-label="Enterprise customer stories" aria-roledescription="carousel" blossom-carousel="true" class="flex w-auto gap-4 snap-x snap-mandatory ml-[calc(-1*var(--carousel-gutter))] mr-[calc(-1*var(--carousel-gutter))] pl-[var(--carousel-gutter)] pr-[var(--carousel-gutter)] scroll-pl-[var(--carousel-gutter)] scroll-pr-[var(--carousel-gutter)]" data-carousel="true" data-slot="carousel" id="_R_12nnaaivb_" role="region"><div aria-roledescription="slide" class="min-w-0 shrink-0 carousel-card-dim w-[calc(100%-32px)] snap-start snap-always lg:w-full" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group relative flex flex-col overflow-hidden rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand max-lg:h-full lg:flex-row lg:aspect-[1056/472]" data-story-link="true" href="https://www.mintlify.com/customers/anthropic"><div class="relative flex min-h-[380px] flex-1 flex-col overflow-hidden p-7 lg:min-h-0 lg:p-8 bg-[#c44120]"><canvas aria-hidden="true" class="pointer-events-none absolute inset-0" data-dots="true"></canvas><div class="relative flex min-w-0 max-w-[282px] flex-1 flex-col text-white lg:max-w-none"><svg aria-hidden="true" class="h-5 w-auto self-start [&amp;_path]:fill-white!" fill="none" height="20" viewbox="0 0 126 15" width="130" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8659_7026)"><mask height="15" id="mask0_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M125.688 0.163651H0.5625V14.1637H125.688V0.163651Z" fill="white"></path></mask><g mask="url(#mask0_8659_7026)"><mask height="15" id="mask1_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M0.5625 0.163651H125.688V14.1637H0.5625V0.163651Z" fill="white"></path></mask><g mask="url(#mask1_8659_7026)"><mask height="15" id="mask2_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M0.5625 0.163651H125.688V14.1637H0.5625V0.163651Z" fill="white"></path></mask><g mask="url(#mask2_8659_7026)"><mask height="15" id="mask3_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M0.5625 0.163651H125.688V14.1637H0.5625V0.163651Z" fill="white"></path></mask><g mask="url(#mask3_8659_7026)"><path d="M25.9509 9.87536L19.8609 0.399979H16.5742V13.9362H19.3776V4.46086L25.4676 13.9362H28.7542V0.399979H25.9509V9.87536Z" fill="var(--color-text-main)"></path></g><mask height="15" id="mask4_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M0.5625 0.163651H125.688V14.1637H0.5625V0.163651Z" fill="white"></path></mask><g mask="url(#mask4_8659_7026)"><path d="M31.0742 3.01054H35.6179V13.9362H38.5181V3.01054H43.0617V0.399979H31.0742V3.01054Z" fill="var(--color-text-main)"></path></g><mask height="15" id="mask5_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M0.5625 0.163651H125.688V14.1637H0.5625V0.163651Z" fill="white"></path></mask><g mask="url(#mask5_8659_7026)"><path d="M54.6687 5.79506H48.2887V0.3999H45.3887V13.9362H48.2887V8.40563H54.6687V13.9362H57.5687V0.3999H54.6687V5.79506Z" fill="var(--color-text-main)"></path></g><mask height="15" id="mask6_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M0.5625 0.163651H125.688V14.1637H0.5625V0.163651Z" fill="white"></path></mask><g mask="url(#mask6_8659_7026)"><path d="M64.0492 3.01054H67.6268C69.0579 3.01054 69.8121 3.53265 69.8121 4.51887C69.8121 5.50508 69.0579 6.02719 67.6268 6.02719H64.0492V3.01054ZM72.7128 4.51887C72.7128 1.96631 70.837 0.399979 67.7622 0.399979H61.1484V13.9362H64.0492V8.63775H67.2785L70.1795 13.9362H73.3897L70.1776 8.23419C71.7898 7.61441 72.7128 6.30932 72.7128 4.51887Z" fill="var(--color-text-main)"></path></g><mask height="15" id="mask7_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M0.5625 0.163651H125.688V14.1637H0.5625V0.163651Z" fill="white"></path></mask><g mask="url(#mask7_8659_7026)"><path d="M81.599 11.4565C79.3179 11.4565 77.9261 9.83216 77.9261 7.18298C77.9261 4.49514 79.3179 2.87084 81.599 2.87084C83.8608 2.87084 85.2333 4.49514 85.2333 7.18298C85.2333 9.83216 83.8608 11.4565 81.599 11.4565ZM81.599 0.163651C77.6941 0.163651 74.9297 3.06421 74.9297 7.18298C74.9297 11.2631 77.6941 14.1637 81.599 14.1637C85.4846 14.1637 88.2297 11.2631 88.2297 7.18298C88.2297 3.06421 85.4846 0.163651 81.599 0.163651Z" fill="var(--color-text-main)"></path></g><mask height="15" id="mask8_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M0.5625 0.163651H125.688V14.1637H0.5625V0.163651Z" fill="white"></path></mask><g mask="url(#mask8_8659_7026)"><path d="M97.4213 6.41387H93.8427V3.01047H97.4213C98.8527 3.01047 99.6071 3.59059 99.6071 4.71217C99.6071 5.83374 98.8527 6.41387 97.4213 6.41387ZM97.5567 0.3999H90.9412V13.9362H93.8427V9.02442H97.5567C100.632 9.02442 102.509 7.40008 102.509 4.71217C102.509 2.02425 100.632 0.3999 97.5567 0.3999Z" fill="var(--color-text-main)"></path></g><mask height="15" id="mask9_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M0.5625 0.163651H125.688V14.1637H0.5625V0.163651Z" fill="white"></path></mask><g mask="url(#mask9_8659_7026)"><path d="M122.148 9.38741C121.645 10.7023 120.64 11.4565 119.267 11.4565C116.986 11.4565 115.594 9.83216 115.594 7.18298C115.594 4.49514 116.986 2.87084 119.267 2.87084C120.64 2.87084 121.645 3.62497 122.148 4.93989H125.222C124.468 2.03935 122.206 0.163651 119.267 0.163651C115.362 0.163651 112.597 3.06421 112.597 7.18298C112.597 11.2631 115.362 14.1637 119.267 14.1637C122.225 14.1637 124.487 12.2686 125.241 9.38741H122.148Z" fill="var(--color-text-main)"></path></g><mask height="15" id="mask10_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M0.5625 0.163651H125.688V14.1637H0.5625V0.163651Z" fill="white"></path></mask><g mask="url(#mask10_8659_7026)"><path d="M103.664 0.399979L109.061 13.9362H112.02L106.624 0.399979H103.664Z" fill="var(--color-text-main)"></path></g><mask height="15" id="mask11_8659_7026" maskunits="userSpaceOnUse" style="mask-type:luminance" width="126" x="0" y="0"><path d="M0.5625 0.163651H125.688V14.1637H0.5625V0.163651Z" fill="white"></path></mask><g mask="url(#mask11_8659_7026)"><path d="M5.65903 8.57966L7.50563 3.82263L9.35223 8.57966H5.65903ZM5.95841 0.3999L0.5625 13.9362H3.57957L4.68312 11.0935H10.3283L11.4317 13.9362H14.4488L9.05284 0.3999H5.95841Z" fill="var(--color-text-main)"></path></g></g></g></g></g><defs><clippath id="clip0_8659_7026"><rect fill="white" height="14" transform="translate(0.5625 0.163651)" width="125.125"></rect></clippath></defs></svg><h3 class="mt-8 max-w-[27rem] text-[1.75rem]/8 font-medium tracking-[-0.01em] lg:text-[35px]/10"><span class="text-white/70">See how <span class="text-white">Anthropic</span> accelerates AI adoption with Mintlify</span></h3><div class="flex gap-4 max-lg:mb-8 lg:gap-12 mt-8"><div class="flex min-w-0 flex-1 flex-col gap-2 lg:w-[176px] lg:flex-none"><p class="text-[34px]/[40px] font-medium tracking-[-0.02em] lg:text-[44px]/[48px] lg:font-normal">2M</p><p class="text-[15px]/6 text-white lg:text-base/6">Monthly active developers</p></div><div class="flex min-w-0 flex-1 flex-col gap-2 lg:w-[176px] lg:flex-none"><p class="text-[34px]/[40px] font-medium tracking-[-0.02em] lg:text-[44px]/[48px] lg:font-normal">4+</p><p class="text-[15px]/6 text-white lg:text-base/6">Products serviced</p></div></div><span class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pl-4 pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 border border-black/5 bg-neutral-0 text-neutral-800 hover:bg-neutral-100 dark:border-black/[0.04] dark:bg-[#121715] dark:text-neutral-100 dark:hover:bg-[#1b211e] py-3 mt-auto w-fit shrink-0 dark:border-black/5 dark:bg-neutral-0 dark:text-neutral-800 dark:hover:bg-neutral-100">Read the story<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></div></div><div aria-hidden="true" class="relative h-[304px] w-full transform-gpu overflow-hidden [contain:paint] lg:h-auto lg:w-[49.2%]"><div class="absolute inset-0 transform-gpu bg-cover bg-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]" style="background-image:url(../reference/aa48b2c838120ecc.webp)"></div><div aria-hidden="true" class="absolute inset-0 opacity-10 bg-[#c44120]"></div></div></a></div><div aria-roledescription="slide" class="min-w-0 shrink-0 carousel-card-dim w-[calc(100%-32px)] snap-start snap-always lg:w-full" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group relative flex flex-col overflow-hidden rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand max-lg:h-full lg:flex-row lg:aspect-[1056/472]" data-story-link="true" href="https://www.mintlify.com/customers/coinbase"><div class="relative flex min-h-[380px] flex-1 flex-col overflow-hidden p-7 lg:min-h-0 lg:p-8 bg-[#0052ff] dark:bg-[#0036a7]"><canvas aria-hidden="true" class="pointer-events-none absolute inset-0" data-dots="true"></canvas><div class="relative flex min-w-0 max-w-[282px] flex-1 flex-col text-white lg:max-w-none"><svg aria-hidden="true" class="h-5 w-auto self-start [&amp;_path]:fill-white!" fill="none" height="25" viewbox="0 0 102 19" width="122" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8659_7106)"><mask height="19" id="mask0_8659_7106" maskunits="userSpaceOnUse" style="mask-type:luminance" width="102" x="0" y="0"><path d="M101.655 0.163651H0.890625V18.1637H101.655V0.163651Z" fill="white"></path></mask><g mask="url(#mask0_8659_7106)"><path class="fill-[#0052FF] dark:fill-[#578BFA]" d="M21.2276 5.18891C17.5671 5.18891 14.7069 7.96772 14.7069 11.6877C14.7069 15.4077 17.4948 18.1627 21.2276 18.1627C24.9605 18.1627 27.7969 15.3602 27.7969 11.6639C27.7969 7.99149 25.0089 5.18891 21.2276 5.18891ZM21.2523 15.4818C19.1678 15.4818 17.6402 13.8628 17.6402 11.6886C17.6402 9.48973 19.1431 7.87167 21.2276 7.87167C23.3369 7.87167 24.8635 9.51443 24.8635 11.6886C24.8635 13.8628 23.3369 15.4818 21.2523 15.4818ZM28.5963 8.01618H30.4146V17.9222H33.3232V5.43039H28.5963V8.01618ZM7.38668 7.87074C8.91421 7.87074 10.1261 8.81288 10.5862 10.2141H13.6651C13.1071 7.21858 10.6347 5.18891 7.41138 5.18891C3.75083 5.18891 0.890625 7.96772 0.890625 11.6886C0.890625 15.4095 3.67857 18.1637 7.41138 18.1637C10.5624 18.1637 13.0833 16.134 13.6413 13.1137H10.5862C10.1499 14.515 8.93797 15.4818 7.41048 15.4818C5.30122 15.4818 3.82308 13.8628 3.82308 11.6886C3.82401 9.48973 5.27835 7.87074 7.38668 7.87074ZM83.863 10.4803L81.73 10.1666C80.7122 10.0221 79.9849 9.68365 79.9849 8.88606C79.9849 8.01618 80.9307 7.5817 82.2149 7.5817C83.6209 7.5817 84.5181 8.18541 84.7118 9.176H87.5238C87.2082 6.66337 85.269 5.18981 82.288 5.18981C79.2092 5.18981 77.1732 6.76034 77.1732 8.983C77.1732 11.1087 78.5066 12.3417 81.1968 12.7277L83.3298 13.0414C84.3727 13.1859 84.9543 13.5976 84.9543 14.3705C84.9543 15.3611 83.9364 15.7718 82.5305 15.7718C80.8089 15.7718 79.8395 15.0711 79.6941 14.0083H76.8337C77.1009 16.4486 79.0154 18.1637 82.5057 18.1637C85.6816 18.1637 87.7898 16.7139 87.7898 14.225C87.7898 12.0024 86.2632 10.8425 83.863 10.4803ZM31.8689 0.284388C30.8024 0.284388 30.0023 1.05729 30.0023 2.12015C30.0023 3.18301 30.8016 3.95591 31.8689 3.95591C32.9354 3.95591 33.7358 3.18301 33.7358 2.12015C33.7358 1.05729 32.9354 0.284388 31.8689 0.284388ZM74.5553 9.70742C74.5553 7.00179 72.9072 5.18981 69.4166 5.18981C66.1201 5.18981 64.2779 6.85729 63.914 9.41838H66.7988C66.9442 8.42779 67.7198 7.6064 69.3682 7.6064C70.8473 7.6064 71.5744 8.25856 71.5744 9.05618C71.5744 10.0953 70.2407 10.3605 68.5926 10.5297C66.3625 10.7712 63.5993 11.5441 63.5993 14.4436C63.5993 16.691 65.2721 18.1399 67.9387 18.1399C70.023 18.1399 71.3319 17.27 71.987 15.8925C72.084 17.1246 73.0051 17.9222 74.2901 17.9222H75.9869V15.3373H74.5562V9.70742H74.5553ZM71.695 12.8484C71.695 14.5159 70.2407 15.748 68.4708 15.748C67.3798 15.748 66.4587 15.2888 66.4587 14.3229C66.4587 13.0908 67.9375 12.7524 69.2951 12.6079C70.6041 12.4872 71.3311 12.1972 71.695 11.6411V12.8484ZM56.2544 5.18891C54.6299 5.18891 53.2726 5.86577 52.3031 7.00089V0.163651H49.3944V17.9222H52.2545V16.2794C53.2239 17.463 54.6063 18.1637 56.2544 18.1637C59.7447 18.1637 62.3873 15.4095 62.3873 11.6886C62.3873 7.96772 59.6963 5.18891 56.2544 5.18891ZM55.8182 15.4818C53.7336 15.4818 52.2061 13.8628 52.2061 11.6886C52.2061 9.51443 53.7575 7.87167 55.8418 7.87167C57.9512 7.87167 59.4292 9.49066 59.4292 11.6886C59.4292 13.8628 57.9025 15.4818 55.8182 15.4818ZM42.4372 5.18891C40.5466 5.18891 39.3099 5.96182 38.5829 7.04935V5.43039H35.6978V17.9213H38.6065V11.1325C38.6065 9.22356 39.8184 7.87074 41.6122 7.87074C43.2851 7.87074 44.3269 9.05436 44.3269 10.7703V17.9222H47.2356V10.5535C47.2367 7.41158 45.613 5.18891 42.4372 5.18891ZM101.655 11.2779C101.655 7.70244 99.0376 5.18981 95.5225 5.18981C91.7898 5.18981 89.0504 7.99241 89.0504 11.6886C89.0504 15.5788 91.9836 18.1637 95.5712 18.1637C98.6014 18.1637 100.977 16.3755 101.582 13.839H98.5519C98.1157 14.9504 97.0492 15.5788 95.6187 15.5788C93.7518 15.5788 92.3458 14.4189 92.0311 12.3893H101.655V11.2779H101.655ZM92.2012 10.3111C92.6625 8.57139 93.9712 7.72624 95.4742 7.72624C97.1223 7.72624 98.3828 8.66834 98.6737 10.3111H92.2012Z"></path></g></g><defs><clippath id="clip0_8659_7106"><rect fill="white" height="18" transform="translate(0.890625 0.163651)" width="100.969"></rect></clippath></defs></svg><h3 class="mt-8 max-w-[27rem] text-[1.75rem]/8 font-medium tracking-[-0.01em] lg:text-[35px]/10"><span class="text-white/70">How <span class="text-white">Coinbase</span> became agent-ready with Mintlify</span></h3><div class="flex gap-4 max-lg:mb-8 lg:gap-12 mt-8"><div class="flex min-w-0 flex-1 flex-col gap-2 lg:w-[176px] lg:flex-none"><p class="text-[34px]/[40px] font-medium tracking-[-0.02em] lg:text-[44px]/[48px] lg:font-normal">+50x</p><p class="text-[15px]/6 text-white lg:text-base/6">Faster deployment time</p></div><div class="flex min-w-0 flex-1 flex-col gap-2 lg:w-[176px] lg:flex-none"><p class="text-[34px]/[40px] font-medium tracking-[-0.02em] lg:text-[44px]/[48px] lg:font-normal">12+</p><p class="text-[15px]/6 text-white lg:text-base/6">Products serviced</p></div></div><span class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pl-4 pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 border border-black/5 bg-neutral-0 text-neutral-800 hover:bg-neutral-100 dark:border-black/[0.04] dark:bg-[#121715] dark:text-neutral-100 dark:hover:bg-[#1b211e] py-3 mt-auto w-fit shrink-0 dark:border-black/5 dark:bg-neutral-0 dark:text-neutral-800 dark:hover:bg-neutral-100">Read the story<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></div></div><div aria-hidden="true" class="relative h-[304px] w-full transform-gpu overflow-hidden [contain:paint] lg:h-auto lg:w-[49.2%]"><div class="absolute inset-0 transform-gpu bg-cover bg-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]" style="background-image:url(../reference/f0826e83b6635cc2.webp)"></div><div aria-hidden="true" class="absolute inset-0 opacity-10 bg-[#0052ff] dark:bg-[#0036a7]"></div></div></a></div><div aria-roledescription="slide" class="min-w-0 shrink-0 carousel-card-dim w-[calc(100%-32px)] snap-start snap-always lg:w-full" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group relative flex flex-col overflow-hidden rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand max-lg:h-full lg:flex-row lg:aspect-[1056/472]" data-story-link="true" href="https://www.mintlify.com/customers/hubspot"><div class="relative flex min-h-[380px] flex-1 flex-col overflow-hidden p-7 lg:min-h-0 lg:p-8 bg-[#c2452a]"><canvas aria-hidden="true" class="pointer-events-none absolute inset-0" data-dots="true"></canvas><div class="relative flex min-w-0 max-w-[282px] flex-1 flex-col text-white lg:max-w-none"><svg aria-hidden="true" class="h-5 w-auto self-start [&amp;_path]:fill-white!" fill="none" height="30" viewbox="0 0 86 26" width="100" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_12517_107173)"><path d="M9.29504 4.72339V11.3878H3.02802V4.72339H0.0546875V20.6323H3.02882V14.1841H9.29423V20.6323H12.2692V4.72339H9.29504ZM21.7888 15.4903C21.7888 16.1279 21.5295 16.7395 21.068 17.1904C20.6065 17.6413 19.9805 17.8946 19.3278 17.8946C18.6751 17.8946 18.0492 17.6413 17.5876 17.1904C17.1261 16.7395 16.8668 16.1279 16.8668 15.4903V8.67565H14.0456V15.4903C14.0456 16.8576 14.6016 18.1689 15.5912 19.1357C16.5808 20.1025 17.923 20.6457 19.3226 20.6457C20.7221 20.6457 22.0644 20.1025 23.054 19.1357C24.0436 18.1689 24.5996 16.8576 24.5996 15.4903V8.67565H21.7888V15.4903ZM42.6931 9.37787C42.6931 7.9805 43.6389 7.53778 44.6748 7.53778C45.5103 7.53778 46.613 8.15901 47.335 8.91234L49.1823 6.78444C48.2599 5.56558 46.3893 4.72339 44.8575 4.72339C41.7964 4.72339 39.5829 6.47462 39.5829 9.37787C39.5829 14.7644 46.3216 13.0549 46.3216 16.0698C46.3216 16.9993 45.3976 17.8203 44.34 17.8203C42.6714 17.8203 42.1305 17.0237 41.3642 16.1807L39.3133 18.2638C40.6253 19.8365 42.2432 20.6354 44.1806 20.6354C47.0887 20.6354 49.4278 18.863 49.4278 16.0918C49.4278 10.1123 42.6883 11.9705 42.6883 9.37787M84.3825 18.0908C82.7156 18.0908 82.2415 17.3862 82.2415 16.3073V11.5301H84.8333V9.10972H82.2415V5.9163L79.3809 7.17055V16.901C79.3809 19.3898 81.1388 20.6441 83.5487 20.6441C83.927 20.6504 84.3053 20.6205 84.6771 20.556L85.375 18.0459C85.0603 18.0672 84.6989 18.0884 84.3825 18.0884M32.5279 8.75507C31.1306 8.75507 30.1551 9.15139 29.2117 10.0549V4.81854H26.3865V14.5246C26.3865 18.1576 29.0749 20.6472 32.0965 20.6472C35.4481 20.6472 38.3965 18.1136 38.3965 14.7023C38.3965 11.3335 35.6832 8.75743 32.5279 8.75743M32.5102 17.869C32.0891 17.869 31.6722 17.788 31.2832 17.6306C30.8942 17.4731 30.5407 17.2424 30.243 16.9515C29.9452 16.6606 29.7091 16.3153 29.5479 15.9353C29.3868 15.5552 29.3039 15.1479 29.3039 14.7365C29.3039 14.3252 29.3868 13.9178 29.5479 13.5378C29.7091 13.1577 29.9452 12.8124 30.243 12.5215C30.5407 12.2307 30.8942 11.9999 31.2832 11.8425C31.6722 11.6851 32.0891 11.6041 32.5102 11.6041C33.3606 11.6041 34.1761 11.9341 34.7774 12.5215C35.3788 13.109 35.7166 13.9057 35.7166 14.7365C35.7166 15.5673 35.3788 16.3641 34.7774 16.9515C34.1761 17.539 33.3606 17.869 32.5102 17.869ZM63.211 14.5576C63.211 11.1401 60.2691 8.61274 56.911 8.61274C53.8902 8.61274 51.201 11.1016 51.201 14.7354V24.4469H54.0262V19.2035C54.968 20.1054 55.9451 20.5033 57.3408 20.5033C60.4961 20.5033 63.211 17.9272 63.211 14.5576ZM60.5355 14.523C60.5355 15.3538 60.1977 16.1506 59.5964 16.738C58.9951 17.3255 58.1795 17.6555 57.3292 17.6555C56.4788 17.6555 55.6632 17.3255 55.0619 16.738C54.4606 16.1506 54.1228 15.3538 54.1228 14.523C54.1228 13.6923 54.4606 12.8955 55.0619 12.308C55.6632 11.7206 56.4788 11.3906 57.3292 11.3906C58.1795 11.3906 58.9951 11.7206 59.5964 12.308C60.1977 12.8955 60.5355 13.6923 60.5355 14.523Z" fill="var(--color-text-main)"></path><path d="M72.3397 8.47915V5.70565C72.7148 5.53436 73.0325 5.26249 73.2556 4.9217C73.4788 4.5809 73.5983 4.18519 73.6002 3.78064V3.71694C73.6002 2.5374 72.6214 1.58118 71.414 1.58118H71.3488C70.769 1.58118 70.213 1.8062 69.803 2.20673C69.393 2.60726 69.1627 3.1505 69.1627 3.71694V3.78064C69.1646 4.18519 69.2841 4.5809 69.5073 4.9217C69.7304 5.26249 70.0481 5.53436 70.4232 5.70565V8.47915C69.345 8.64044 68.3295 9.0772 67.4797 9.74519L59.6938 3.82074C59.7493 3.62494 59.7783 3.42363 59.7815 3.22153C59.7825 2.74555 59.6389 2.27999 59.369 1.88373C59.0991 1.48747 58.7149 1.17831 58.2651 0.995373C57.8154 0.812433 57.3201 0.763923 56.8421 0.855982C56.3641 0.94804 55.9248 1.17653 55.5797 1.51255C55.2346 1.84857 54.9993 2.27702 54.9035 2.74371C54.8078 3.2104 54.8558 3.69437 55.0416 4.13438C55.2274 4.5744 55.5425 4.9507 55.9473 5.2157C56.352 5.48069 56.8281 5.62246 57.3153 5.62308C57.7415 5.62112 58.1598 5.50995 58.5283 5.30068L66.195 11.1292C65.5063 12.1457 65.147 13.3413 65.1639 14.5602C65.1809 15.7792 65.5733 16.9648 66.29 17.9627L63.9582 20.2416C63.7697 20.1827 63.5733 20.1514 63.3754 20.1488C62.9755 20.1491 62.5846 20.2652 62.2523 20.4825C61.9199 20.6997 61.6609 21.0084 61.508 21.3694C61.3551 21.7304 61.3151 22.1276 61.3932 22.5108C61.4713 22.894 61.664 23.246 61.9467 23.5222C62.2295 23.7985 62.5898 23.9867 62.982 24.063C63.3742 24.1393 63.7808 24.1003 64.1504 23.9509C64.5199 23.8015 64.8358 23.5485 65.0582 23.2238C65.2806 22.899 65.3994 22.5172 65.3998 22.1265C65.3972 21.9331 65.3652 21.7413 65.3048 21.5571L67.6117 19.3026C68.3639 19.8684 69.2387 20.2585 70.1691 20.443C71.0995 20.6274 72.0608 20.6014 72.9793 20.3668C73.8978 20.1323 74.7492 19.6954 75.4682 19.0898C76.1872 18.4841 76.7547 17.7257 77.1274 16.8727C77.5 16.0196 77.6678 15.0946 77.618 14.1683C77.5682 13.2421 77.302 12.3394 76.8399 11.5292C76.3777 10.719 75.7319 10.0229 74.9519 9.49424C74.1718 8.96556 73.2783 8.61833 72.3397 8.47915ZM71.3835 17.601C70.9571 17.6124 70.5328 17.5403 70.1354 17.3888C69.7381 17.2373 69.3759 17.0096 69.0702 16.719C68.7645 16.4285 68.5215 16.081 68.3556 15.6972C68.1897 15.3133 68.1042 14.9009 68.1042 14.4842C68.1042 14.0675 68.1897 13.6551 68.3556 13.2712C68.5215 12.8874 68.7645 12.5399 69.0702 12.2494C69.3759 11.9588 69.7381 11.7311 70.1354 11.5796C70.5328 11.4281 70.9571 11.356 71.3835 11.3675C72.2098 11.3957 72.9926 11.7362 73.5671 12.3171C74.1415 12.8981 74.4628 13.6741 74.4632 14.4819C74.4636 15.2897 74.1432 16.0661 73.5693 16.6476C72.9954 17.2291 72.213 17.5703 71.3867 17.5994" fill="#FF7A59"></path></g><defs><clippath id="clip0_12517_107173"><rect fill="white" height="24.3772" transform="translate(0.0546875 0.811279)" width="85.3203"></rect></clippath></defs></svg><h3 class="mt-8 max-w-[27rem] text-[1.75rem]/8 font-medium tracking-[-0.01em] lg:text-[35px]/10"><span class="text-white/70">How <span class="text-white">HubSpot</span> powers next-gen developer experience with Mintlify</span></h3><div class="flex gap-4 max-lg:mb-8 lg:gap-12 mt-8"><div class="flex min-w-0 flex-1 flex-col gap-2 lg:w-[176px] lg:flex-none"><p class="text-[34px]/[40px] font-medium tracking-[-0.02em] lg:text-[44px]/[48px] lg:font-normal">3x</p><p class="text-[15px]/6 text-white lg:text-base/6">Faster build times</p></div><div class="flex min-w-0 flex-1 flex-col gap-2 lg:w-[176px] lg:flex-none"><p class="text-[34px]/[40px] font-medium tracking-[-0.02em] lg:text-[44px]/[48px] lg:font-normal">50%</p><p class="text-[15px]/6 text-white lg:text-base/6">Reduction in engineering resources</p></div></div><span class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pl-4 pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 border border-black/5 bg-neutral-0 text-neutral-800 hover:bg-neutral-100 dark:border-black/[0.04] dark:bg-[#121715] dark:text-neutral-100 dark:hover:bg-[#1b211e] py-3 mt-auto w-fit shrink-0 dark:border-black/5 dark:bg-neutral-0 dark:text-neutral-800 dark:hover:bg-neutral-100">Read the story<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></div></div><div aria-hidden="true" class="relative h-[304px] w-full transform-gpu overflow-hidden [contain:paint] lg:h-auto lg:w-[49.2%]"><div class="absolute inset-0 transform-gpu bg-cover bg-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]" style="background-image:url(../reference/0d997fd88c5705a8.webp)"></div><div aria-hidden="true" class="absolute inset-0 opacity-10 bg-[#c2452a]"></div></div></a></div><div aria-roledescription="slide" class="min-w-0 shrink-0 carousel-card-dim w-[calc(100%-32px)] snap-start snap-always lg:w-full" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group relative flex flex-col overflow-hidden rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand max-lg:h-full lg:flex-row lg:aspect-[1056/472]" data-story-link="true" href="https://www.mintlify.com/customers/att"><div class="relative flex min-h-[380px] flex-1 flex-col overflow-hidden p-7 lg:min-h-0 lg:p-8 bg-[#0077a6]"><canvas aria-hidden="true" class="pointer-events-none absolute inset-0" data-dots="true"></canvas><div class="relative flex min-w-0 max-w-[282px] flex-1 flex-col text-white lg:max-w-none"><svg aria-hidden="true" class="h-5 w-auto self-start [&amp;_path]:fill-white!" fill="none" height="28" viewbox="0 0 68 28" width="68" xmlns="http://www.w3.org/2000/svg"><path d="M62.8872 19.5977C62.7054 19.5977 62.5802 19.4717 62.5802 19.2905V10.2888H59.5223C59.3405 10.2888 59.2151 10.1633 59.2151 9.98192V8.74023C59.2151 8.5584 59.3406 8.43261 59.5223 8.43261H67.662C67.8436 8.43261 67.9689 8.55854 67.9689 8.74023V9.98185C67.9689 10.1631 67.8436 10.2888 67.662 10.2888H64.6043V19.2903C64.6043 19.4717 64.4785 19.5977 64.2973 19.5977H62.8872ZM39.463 15.1035L37.8578 10.4984L36.2382 15.1035H39.463ZM43.0232 19.2339C43.0934 19.4158 42.9814 19.5977 42.7859 19.5977H41.3342C41.1247 19.5977 40.9989 19.5003 40.9289 19.304L40.1055 16.9323H35.5965L34.7717 19.304C34.7024 19.5003 34.5763 19.5977 34.3673 19.5977H32.9995C32.8178 19.5977 32.6919 19.4158 32.7618 19.2339L36.5452 8.71232C36.6152 8.51629 36.7408 8.43309 36.9498 8.43309H38.8207C39.0303 8.43309 39.1699 8.51636 39.2397 8.71232L43.0232 19.2339ZM53.8679 18.0901C54.761 18.0901 55.3617 17.6582 55.8504 16.9182L53.5891 14.4896C52.7231 14.9784 52.1644 15.4662 52.1644 16.4434C52.1645 17.4066 52.946 18.0901 53.8679 18.0901ZM54.4961 9.91189C53.7703 9.91189 53.3515 10.3729 53.3515 10.9868C53.3515 11.4613 53.6023 11.88 54.1749 12.4942C55.1661 11.9216 55.5851 11.5729 55.5851 10.959C55.5851 10.3864 55.2223 9.91189 54.4961 9.91189ZM60.6814 19.2068C60.8627 19.4024 60.7512 19.5977 60.5272 19.5977H58.7542C58.5169 19.5977 58.3913 19.5416 58.2378 19.3599L57.1768 18.1881C56.4649 19.1372 55.4728 19.8488 53.8258 19.8488C51.7875 19.8488 50.1815 18.6207 50.1815 16.5138C50.1815 14.8944 51.0476 14.0289 52.3601 13.3034C51.7174 12.5638 51.4248 11.7822 51.4248 11.0987C51.4248 9.3677 52.6393 8.18164 54.4679 8.18164C56.3387 8.18164 57.4838 9.28456 57.4838 10.9171C57.4838 12.3127 56.4788 13.0935 55.4174 13.6801L56.9813 15.3693L57.8607 13.8336C57.9723 13.6524 58.098 13.5824 58.321 13.5824H59.675C59.8987 13.5824 60.0244 13.7363 59.8852 13.9734L58.3212 16.6526L60.6814 19.2068ZM46.7485 19.5977C46.9299 19.5977 47.0562 19.4717 47.0562 19.2905V10.2888H50.1133C50.2947 10.2888 50.4203 10.1633 50.4203 9.98192V8.74023C50.4203 8.5584 50.2947 8.43261 50.1133 8.43261H41.9736C41.7918 8.43261 41.6665 8.55854 41.6665 8.74023V9.98185C41.6665 10.1631 41.7919 10.2888 41.9736 10.2888H45.0306V19.2903C45.0306 19.4717 45.1567 19.5977 45.338 19.5977H46.7485Z" fill="var(--color-text-main)"></path><path d="M5.4329 25.0269C7.8006 26.8597 10.7725 27.9609 13.9968 27.9609C17.5253 27.9609 20.742 26.6509 23.197 24.5005C23.2267 24.4742 23.2121 24.4568 23.1827 24.4742C22.0811 25.2099 18.9413 26.8159 13.9969 26.8159C9.70004 26.8159 6.98458 25.8572 5.4511 25.0013C5.42176 24.9868 5.41089 25.0088 5.4329 25.0269ZM14.9448 25.7405C18.3815 25.7405 22.1581 24.8036 24.4167 22.9491C25.0348 22.4439 25.6236 21.7714 26.1509 20.8676C26.4544 20.3476 26.7513 19.7298 26.9931 19.1225C27.0038 19.0928 26.9856 19.0784 26.9633 19.1117C24.8629 22.2027 18.7805 24.1307 12.5001 24.1307C8.06094 24.1307 3.28445 22.7111 1.41442 20.0006C1.39601 19.9755 1.37761 19.9862 1.38881 20.015C3.13088 23.7177 8.41591 25.7405 14.9448 25.7405ZM11.1898 19.5978C4.04212 19.5978 0.671824 16.2688 0.0604566 13.9971C0.0529172 13.9642 0.03125 13.9714 0.03125 14.0009C0.03125 14.7657 0.107799 15.7527 0.2395 16.4078C0.302328 16.7267 0.561858 17.2272 0.94236 17.6261C2.67315 19.4301 6.98825 21.9581 14.4613 21.9581C24.6431 21.9581 26.9711 18.5665 27.4465 17.4511C27.7864 16.6534 27.9626 15.2119 27.9626 14.001C27.9626 13.708 27.9552 13.4739 27.9441 13.2441C27.9441 13.2068 27.9225 13.2038 27.9151 13.2401C27.4063 15.9693 18.7071 19.5978 11.1898 19.5978ZM1.37761 8.01209C0.968034 8.82491 0.514041 10.1962 0.37908 10.9059C0.31992 11.21 0.345119 11.356 0.451757 11.583C1.30846 13.4006 5.64183 16.3089 15.7499 16.3089C21.9165 16.3089 26.7069 14.7939 27.483 12.0293C27.6259 11.5203 27.6336 10.983 27.45 10.259C27.2449 9.44987 26.8607 8.50636 26.5356 7.84385C26.5248 7.82225 26.5059 7.82544 26.5098 7.85098C26.6305 11.4771 16.5185 13.8141 11.4164 13.8141C5.88988 13.8141 1.27925 11.6122 1.27925 8.83184C1.27925 8.5647 1.33454 8.2975 1.40355 8.01943C1.41048 7.99402 1.38874 7.98981 1.37761 8.01209ZM23.2196 3.55999C23.2783 3.65196 23.3076 3.75011 23.3076 3.88222C23.3076 5.43329 18.5604 8.17721 11.0036 8.17721C5.4511 8.17721 4.41155 6.1174 4.41155 4.80745C4.41155 4.3392 4.59114 3.86007 4.98665 3.37348C5.00825 3.34455 4.98991 3.33341 4.96498 3.35494C4.24365 3.96624 3.58087 4.65408 2.99945 5.39661C2.72165 5.74777 2.5492 6.05885 2.5492 6.24523C2.5492 8.95988 9.35608 10.9281 15.7207 10.9281C22.5024 10.9281 25.529 8.71427 25.529 6.76871C25.529 6.07339 25.2583 5.66748 24.5659 4.88054C24.1165 4.36861 23.6913 3.95177 23.2414 3.54145C23.2196 3.52352 23.2045 3.53812 23.2196 3.55999ZM21.1406 2.00926C19.0476 0.75474 16.6172 0.0410156 13.9969 0.0410156C11.3584 0.0410156 8.85475 0.779667 6.75426 2.0674C6.12421 2.45517 5.76959 2.76592 5.76959 3.16537C5.76959 4.34287 8.52146 5.60893 13.4036 5.60893C18.2351 5.60893 21.9825 4.22217 21.9825 2.88729C21.9825 2.56867 21.7041 2.34575 21.1406 2.00926Z" fill="var(--color-text-main)"></path></svg><h3 class="mt-8 max-w-[27rem] text-[1.75rem]/8 font-medium tracking-[-0.01em] lg:text-[35px]/10"><span class="text-white/70">See how <span class="text-white">AT&amp;T</span> modernized their knowledge infrastructure with Mintlify</span></h3><div class="flex gap-4 max-lg:mb-8 lg:gap-12 mt-8"><div class="flex min-w-0 flex-1 flex-col gap-2 lg:w-[176px] lg:flex-none"><p class="text-[34px]/[40px] font-medium tracking-[-0.02em] lg:text-[44px]/[48px] lg:font-normal">50K+</p><p class="text-[15px]/6 text-white lg:text-base/6">Monthly active users</p></div><div class="flex min-w-0 flex-1 flex-col gap-2 lg:w-[176px] lg:flex-none"><p class="text-[34px]/[40px] font-medium tracking-[-0.02em] lg:text-[44px]/[48px] lg:font-normal">4+</p><p class="text-[15px]/6 text-white lg:text-base/6">Products serviced</p></div></div><span class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pl-4 pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 border border-black/5 bg-neutral-0 text-neutral-800 hover:bg-neutral-100 dark:border-black/[0.04] dark:bg-[#121715] dark:text-neutral-100 dark:hover:bg-[#1b211e] py-3 mt-auto w-fit shrink-0 dark:border-black/5 dark:bg-neutral-0 dark:text-neutral-800 dark:hover:bg-neutral-100">Read the story<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></div></div><div aria-hidden="true" class="relative h-[304px] w-full transform-gpu overflow-hidden [contain:paint] lg:h-auto lg:w-[49.2%]"><div class="absolute inset-0 transform-gpu bg-cover bg-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]" style="background-image:url(../reference/e80b84a4e69a840f.webp)"></div><div aria-hidden="true" class="absolute inset-0 opacity-10 bg-[#0077a6]"></div></div></a></div></div></div></div><div aria-hidden="true" class="grid-layout relative pb-30 lg:pb-40" data-rail="all"></div></section>`,
  S = `<section class="" data-section="scale" id="scale"><div class="bg-background-main"><div class="grid-layout relative py-8 lg:py-10" data-rail="all"><span aria-hidden="true" class="absolute left-0 top-12 block h-6 w-[2px] -translate-y-1/2 bg-brand-base lg:top-15"></span><header class="col-span-full flex flex-col gap-10 px-7 md:flex-row md:items-end md:justify-between md:gap-6 lg:col-start-2 lg:col-end-24 lg:px-0"><div class="flex max-w-[41.5rem] flex-col gap-7 md:self-start"><div class="flex flex-col gap-4"><h2 class="text-balance text-[1.75rem]/8 font-medium tracking-[-0.72px] text-foreground-primary lg:text-[2.25rem]/[2.5rem]">Built to scale with the agent web.<span class="block text-foreground-tertiary">Built for scale with enterprise-grade reliability and performance.</span></h2></div></div><div class="shrink-0 md:pb-1"><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pl-4 pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 bg-background-invert text-text-invert hover:bg-background-invert/90 py-3" data-slot="button" href="https://www.mintlify.com/enterprise">For enterprises<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></a></div></header></div></div><div class="grid-layout relative" data-rail="all"><div class="relative col-span-full p-0 lg:p-0"><div class="flex flex-col"><canvas aria-hidden="true" class="block size-full pointer-events-none -mt-12 mb-10 h-[304px] w-full" data-ribbon="scale"></canvas><div class="grid grid-cols-1 divide-y divide-border-primary border-t border-border-line p-7 [&amp;&gt;*:not(:first-child)]:pt-8 [&amp;&gt;*:not(:last-child)]:pb-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:[&amp;&gt;*:not(:first-child)]:pt-0 sm:[&amp;&gt;*:not(:first-child)]:pl-8 sm:[&amp;&gt;*:not(:last-child)]:pr-8 sm:[&amp;&gt;*:not(:last-child)]:pb-0 lg:p-10"><div class="flex flex-col gap-6"><svg aria-hidden="true" class="shrink-0 select-none size-5 text-foreground-muted" fill="none" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3.05566 8.61108V14.7222" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M16.9443 5.27771V14.7222" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M7.77783 3.05554V16.9444" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M12.2222 8.61108V11.3889" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M12.2222 14.7222V15.8333" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg><div class="flex flex-col gap-2"><p class="text-[2.25rem]/[2.5rem] font-normal tracking-[-0.72px] whitespace-nowrap text-foreground-primary tabular-nums lining-nums">300M+</p><p class="text-base/6 font-normal text-foreground-secondary">visitors in the past year</p></div></div><div class="flex flex-col gap-6"><svg aria-hidden="true" class="shrink-0 select-none size-5 text-foreground-muted" fill="none" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.30355 16.5299C4.76379 16.5299 5.13688 16.1569 5.13688 15.6966C5.13688 15.2364 4.76379 14.8633 4.30355 14.8633C3.84331 14.8633 3.47021 15.2364 3.47021 15.6966C3.47021 16.1569 3.84331 16.5299 4.30355 16.5299Z" fill="currentColor"></path><path d="M1.94466 10.8333C2.4049 10.8333 2.77799 10.4602 2.77799 9.99996C2.77799 9.53972 2.4049 9.16663 1.94466 9.16663C1.48442 9.16663 1.11133 9.53972 1.11133 9.99996C1.11133 10.4602 1.48442 10.8333 1.94466 10.8333Z" fill="currentColor"></path><path d="M4.30355 5.13664C4.76379 5.13664 5.13688 4.76354 5.13688 4.3033C5.13688 3.84307 4.76379 3.46997 4.30355 3.46997C3.84331 3.46997 3.47021 3.84307 3.47021 4.3033C3.47021 4.76354 3.84331 5.13664 4.30355 5.13664Z" fill="currentColor"></path><path d="M6.91781 18.2756C7.37804 18.2756 7.75114 17.9025 7.75114 17.4422C7.75114 16.982 7.37804 16.6089 6.91781 16.6089C6.45757 16.6089 6.08447 16.982 6.08447 17.4422C6.08447 17.9025 6.45757 18.2756 6.91781 18.2756Z" fill="currentColor"></path><path d="M2.55794 13.9156C3.01818 13.9156 3.39128 13.5425 3.39128 13.0822C3.39128 12.622 3.01818 12.2489 2.55794 12.2489C2.09771 12.2489 1.72461 12.622 1.72461 13.0822C1.72461 13.5425 2.09771 13.9156 2.55794 13.9156Z" fill="currentColor"></path><path d="M2.55794 7.75114C3.01818 7.75114 3.39128 7.37804 3.39128 6.91781C3.39128 6.45757 3.01818 6.08447 2.55794 6.08447C2.09771 6.08447 1.72461 6.45757 1.72461 6.91781C1.72461 7.37804 2.09771 7.75114 2.55794 7.75114Z" fill="currentColor"></path><path d="M6.91781 3.39103C7.37804 3.39103 7.75114 3.01794 7.75114 2.5577C7.75114 2.09746 7.37804 1.72437 6.91781 1.72437C6.45757 1.72437 6.08447 2.09746 6.08447 2.5577C6.08447 3.01794 6.45757 3.39103 6.91781 3.39103Z" fill="currentColor"></path><path d="M10.0003 2.77775C10.4606 2.77775 10.8337 2.40465 10.8337 1.94442C10.8337 1.48418 10.4606 1.11108 10.0003 1.11108C9.54009 1.11108 9.16699 1.48418 9.16699 1.94442C9.16699 2.40465 9.54009 2.77775 10.0003 2.77775Z" fill="currentColor"></path><path d="M10.0003 18.8888C10.4606 18.8888 10.8337 18.5157 10.8337 18.0555C10.8337 17.5953 10.4606 17.2222 10.0003 17.2222C9.54009 17.2222 9.16699 17.5953 9.16699 18.0555C9.16699 18.5157 9.54009 18.8888 10.0003 18.8888Z" fill="currentColor"></path><path d="M15.6971 16.5299C16.1573 16.5299 16.5304 16.1569 16.5304 15.6966C16.5304 15.2364 16.1573 14.8633 15.6971 14.8633C15.2369 14.8633 14.8638 15.2364 14.8638 15.6966C14.8638 16.1569 15.2369 16.5299 15.6971 16.5299Z" fill="currentColor"></path><path d="M18.056 10.8333C18.5162 10.8333 18.8893 10.4602 18.8893 9.99996C18.8893 9.53972 18.5162 9.16663 18.056 9.16663C17.5958 9.16663 17.2227 9.53972 17.2227 9.99996C17.2227 10.4602 17.5958 10.8333 18.056 10.8333Z" fill="currentColor"></path><path d="M15.6971 5.13664C16.1573 5.13664 16.5304 4.76354 16.5304 4.3033C16.5304 3.84307 16.1573 3.46997 15.6971 3.46997C15.2369 3.46997 14.8638 3.84307 14.8638 4.3033C14.8638 4.76354 15.2369 5.13664 15.6971 5.13664Z" fill="currentColor"></path><path d="M13.0824 18.2756C13.5426 18.2756 13.9157 17.9025 13.9157 17.4422C13.9157 16.982 13.5426 16.6089 13.0824 16.6089C12.6221 16.6089 12.249 16.982 12.249 17.4422C12.249 17.9025 12.6221 18.2756 13.0824 18.2756Z" fill="currentColor"></path><path d="M17.4422 13.9156C17.9025 13.9156 18.2756 13.5425 18.2756 13.0822C18.2756 12.622 17.9025 12.2489 17.4422 12.2489C16.982 12.2489 16.6089 12.622 16.6089 13.0822C16.6089 13.5425 16.982 13.9156 17.4422 13.9156Z" fill="currentColor"></path><path d="M17.4422 7.75114C17.9025 7.75114 18.2756 7.37804 18.2756 6.91781C18.2756 6.45757 17.9025 6.08447 17.4422 6.08447C16.982 6.08447 16.6089 6.45757 16.6089 6.91781C16.6089 7.37804 16.982 7.75114 17.4422 7.75114Z" fill="currentColor"></path><path d="M13.0824 3.39103C13.5426 3.39103 13.9157 3.01794 13.9157 2.5577C13.9157 2.09746 13.5426 1.72437 13.0824 1.72437C12.6221 1.72437 12.249 2.09746 12.249 2.5577C12.249 3.01794 12.6221 3.39103 13.0824 3.39103Z" fill="currentColor"></path><path d="M10.0003 6.38892L10.7458 9.25447L13.6114 10L10.7458 10.7456L10.0003 13.6111L9.25472 10.7456L6.38916 10L9.25472 9.25447L10.0003 6.38892Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg><div class="flex flex-col gap-2"><p class="text-[2.25rem]/[2.5rem] font-normal tracking-[-0.72px] whitespace-nowrap text-foreground-primary tabular-nums lining-nums">2B+</p><p class="text-base/6 font-normal text-foreground-secondary">agents in the past year</p></div></div><div class="flex flex-col gap-6"><svg aria-hidden="true" class="shrink-0 select-none size-5 text-foreground-muted" fill="none" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.38867 12.5001L9.99978 10.0001V5.27783" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M17.7852 7.96224C16.8814 4.5019 13.7436 1.94446 9.99989 1.94446C5.551 1.94446 1.94434 5.5509 1.94434 10C1.94434 14.4491 5.551 18.0556 9.99989 18.0556C10.7659 18.0556 11.5041 17.9419 12.206 17.742" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M16.5738 14.7223H13.6108L16.1108 10.8334L15.0923 14.1667H18.0553L15.5553 18.0556L16.5738 14.7223Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg><div class="flex flex-col gap-2"><p class="text-[2.25rem]/[2.5rem] font-normal tracking-[-0.72px] whitespace-nowrap text-foreground-primary tabular-nums lining-nums">99.99%</p><p class="text-base/6 font-normal text-foreground-secondary">uptime across all services</p></div></div></div></div></div></div><div aria-hidden="true" class="grid-layout relative pb-30 lg:pb-40" data-rail="all"></div></section>`,
  C = `<section class="" data-section="startups" id="startups"><div class="bg-background-main"><div class="grid-layout relative py-8 lg:py-10" data-line="bleed" data-rail="all"><span aria-hidden="true" class="absolute left-0 top-12 block h-6 w-[2px] -translate-y-1/2 bg-brand-base lg:top-15"></span><header class="col-span-full flex flex-col gap-10 px-7 md:flex-row md:items-end md:justify-between md:gap-6 lg:col-start-2 lg:col-end-24 lg:px-0"><div class="flex max-w-[41.5rem] flex-col gap-7 md:self-start"><div class="flex flex-col gap-4"><h2 class="text-balance text-[1.75rem]/8 font-medium tracking-[-0.72px] text-foreground-primary lg:text-[2.25rem]/[2.5rem]">Enabling the next generation of startups.<span class="block text-foreground-tertiary">Powering a quarter of the last YC batch to 40% of the Forbes AI 50.</span></h2></div></div><div class="shrink-0 md:pb-1"><div class="flex items-center gap-3"><div class="flex items-center gap-2"><button aria-controls="_R_1innaaivb_" aria-label="Previous startup story" blossom-prev="" class="flex cursor-pointer items-center justify-center gap-1 rounded-[4px] border border-border-secondary bg-background-primary p-3 text-foreground-primary outline-offset-2 transition-colors duration-100 hover:bg-background-soft focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-default disabled:opacity-40 disabled:hover:bg-background-primary" command="--blossom-prev" commandfor="_R_1innaaivb_" data-direction="prev" type="button"><svg class="shrink-0 select-none size-4 opacity-50" fill="none" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M7.21968 8.00047L10.5195 4.70062L9.57672 3.75781L5.33408 8.00047L9.57672 12.2431L10.5195 11.3003L7.21968 8.00047Z" fill="currentColor"></path></svg></button><button aria-controls="_R_1innaaivb_" aria-label="Next startup story" blossom-next="" class="flex cursor-pointer items-center justify-center gap-1 rounded-[4px] border border-border-secondary bg-background-primary p-3 text-foreground-primary outline-offset-2 transition-colors duration-100 hover:bg-background-soft focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-default disabled:opacity-40 disabled:hover:bg-background-primary" command="--blossom-next" commandfor="_R_1innaaivb_" data-direction="next" type="button"><svg class="shrink-0 select-none size-4 rotate-180 opacity-50" fill="none" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M7.21968 8.00047L10.5195 4.70062L9.57672 3.75781L5.33408 8.00047L9.57672 12.2431L10.5195 11.3003L7.21968 8.00047Z" fill="currentColor"></path></svg></button></div><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pl-4 pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 bg-background-invert text-text-invert hover:bg-background-invert/90 py-3 max-md:order-first" data-slot="button" href="https://www.mintlify.com/startups">For startups<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></a></div></div></header></div></div><div class="grid-layout relative" data-line="bleed"><div class="isolate relative col-span-full lg:p-4 py-4"><canvas aria-hidden="true" class="pointer-events-none absolute left-0 top-0 -z-10" data-dots="true"></canvas><div aria-label="Startup customer stories" aria-roledescription="carousel" blossom-carousel="true" class="flex w-auto gap-4 ml-[calc(-1*var(--carousel-gutter))] mr-[calc(-1*var(--carousel-gutter))] pl-[var(--carousel-gutter)] pr-[var(--carousel-gutter)] scroll-pl-[var(--carousel-gutter)] scroll-pr-[var(--carousel-gutter)] sm:ml-0 sm:pl-0 sm:scroll-pl-0 lg:ml-[calc(-1*var(--carousel-gutter))] lg:pl-[var(--carousel-gutter)] lg:scroll-pl-[var(--carousel-gutter)]" data-carousel="true" data-slot="carousel" id="_R_1innaaivb_" role="region"><div aria-roledescription="slide" class="min-w-0 shrink-0 w-[calc(100%-32px)] snap-start sm:w-[calc(50%-40px)] lg:w-[calc((100%-32px)/3)]" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group flex h-full flex-col rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" data-story-link="true" href="https://www.mintlify.com/customers/lovable"><div class="relative aspect-[350/400] w-full overflow-hidden rounded-md"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:hidden" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/11832492d156.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><img alt="" class="hidden select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:block" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/e1711ea54fb58ba1.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/></div><div class="flex flex-1 flex-col gap-4 py-4"><p class="text-sm/5 text-text-sub"><span class="font-medium text-text-main">Lovable</span> builds its AI-native coding platform and developer experience on top of Mintlify.</p><span class="mt-auto inline-flex items-center gap-1 text-sm/4 font-medium text-brand transition-colors group-hover:text-brand-base">Read Lovable's story<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></div></a></div><div aria-roledescription="slide" class="min-w-0 shrink-0 w-[calc(100%-32px)] snap-start sm:w-[calc(50%-40px)] lg:w-[calc((100%-32px)/3)]" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group flex h-full flex-col rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" data-story-link="true" href="https://www.mintlify.com/customers/kalshi"><div class="relative aspect-[350/400] w-full overflow-hidden rounded-md"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:hidden" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/d0ee8aa87809.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><img alt="" class="hidden select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:block" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/73c19e6dc5ca3b5c.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/></div><div class="flex flex-1 flex-col gap-4 py-4"><p class="text-sm/5 text-text-sub"><span class="font-medium text-text-main">Kalshi</span> powers its developer documentation with Mintlify.</p><span class="mt-auto inline-flex items-center gap-1 text-sm/4 font-medium text-brand transition-colors group-hover:text-brand-base">Read Kalshi's story<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></div></a></div><div aria-roledescription="slide" class="min-w-0 shrink-0 w-[calc(100%-32px)] snap-start sm:w-[calc(50%-40px)] lg:w-[calc((100%-32px)/3)]" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group flex h-full flex-col rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" data-story-link="true" href="https://www.mintlify.com/customers/decagon"><div class="relative aspect-[350/400] w-full overflow-hidden rounded-md"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:hidden" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/310bf7e4485c.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><img alt="" class="hidden select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:block" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/23409e94a47e4b93.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/></div><div class="flex flex-1 flex-col gap-4 py-4"><p class="text-sm/5 text-text-sub"><span class="font-medium text-text-main">Decagon</span> ships sleek, AI-native documentation built on Mintlify.</p><span class="mt-auto inline-flex items-center gap-1 text-sm/4 font-medium text-brand transition-colors group-hover:text-brand-base">Read Decagon's story<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></div></a></div><div aria-roledescription="slide" class="min-w-0 shrink-0 w-[calc(100%-32px)] snap-start sm:w-[calc(50%-40px)] lg:w-[calc((100%-32px)/3)]" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group flex h-full flex-col rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" data-story-link="true" href="https://www.mintlify.com/customers/replit"><div class="relative aspect-[350/400] w-full overflow-hidden rounded-md"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:hidden" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/a39a93c6cc6f.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><img alt="" class="hidden select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:block" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/b1ec780d946d583e.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/></div><div class="flex flex-1 flex-col gap-4 py-4"><p class="text-sm/5 text-text-sub">Learn how <span class="font-medium text-text-main">Replit</span> uses Mintlify to turn documentation into a fast, collaborative, and accessible experience.</p><span class="mt-auto inline-flex items-center gap-1 text-sm/4 font-medium text-brand transition-colors group-hover:text-brand-base">Read Replit's story<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></div></a></div><div aria-roledescription="slide" class="min-w-0 shrink-0 w-[calc(100%-32px)] snap-start sm:w-[calc(50%-40px)] lg:w-[calc((100%-32px)/3)]" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group flex h-full flex-col rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" data-story-link="true" href="https://www.mintlify.com/customers/perplexity"><div class="relative aspect-[350/400] w-full overflow-hidden rounded-md"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:hidden" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/625b308f00eb.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><img alt="" class="hidden select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:block" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/8e443ddadf65ed74.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/></div><div class="flex flex-1 flex-col gap-4 py-4"><p class="text-sm/5 text-text-sub"><span class="font-medium text-text-main">Perplexity</span> keeps its developer documentation fast and accurate with Mintlify.</p><span class="mt-auto inline-flex items-center gap-1 text-sm/4 font-medium text-brand transition-colors group-hover:text-brand-base">Read Perplexity's story<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></div></a></div><div aria-roledescription="slide" class="min-w-0 shrink-0 w-[calc(100%-32px)] snap-start sm:w-[calc(50%-40px)] lg:w-[calc((100%-32px)/3)]" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group flex h-full flex-col rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" data-story-link="true" href="https://www.mintlify.com/customers/polymarket"><div class="relative aspect-[350/400] w-full overflow-hidden rounded-md"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:hidden" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/76971ccac781.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><img alt="" class="hidden select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:block" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/d7d1a2048db3108e.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/></div><div class="flex flex-1 flex-col gap-4 py-4"><p class="text-sm/5 text-text-sub"><span class="font-medium text-text-main">Polymarket</span> builds clear, AI-native documentation on Mintlify.</p><span class="mt-auto inline-flex items-center gap-1 text-sm/4 font-medium text-brand transition-colors group-hover:text-brand-base">Read Polymarket's story<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></div></a></div><div aria-roledescription="slide" class="min-w-0 shrink-0 w-[calc(100%-32px)] snap-start sm:w-[calc(50%-40px)] lg:w-[calc((100%-32px)/3)]" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group flex h-full flex-col rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" data-story-link="true" href="https://www.mintlify.com/customers/harvey"><div class="relative aspect-[350/400] w-full overflow-hidden rounded-md"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:hidden" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/4970061fb424.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><img alt="" class="hidden select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:block" data-nimg="fill" decoding="async" loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" src="../reference/199b075ea4b12ee3.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/></div><div class="flex flex-1 flex-col gap-4 py-4"><p class="text-sm/5 text-text-sub"><span class="font-medium text-text-main">Harvey</span> keeps its developer documentation accurate and current with Mintlify.</p><span class="mt-auto inline-flex items-center gap-1 text-sm/4 font-medium text-brand transition-colors group-hover:text-brand-base">Read Harvey's story<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></span></div></a></div></div></div></div><div aria-hidden="true" class="grid-layout relative pb-30 lg:pb-40" data-rail="all"></div></section>`,
  w = `<section class="" data-section="testimonials" id="testimonials"><div class="bg-background-main"><div class="grid-layout relative py-8 lg:py-10" data-rail="all"><span aria-hidden="true" class="absolute left-0 top-12 block h-6 w-[2px] -translate-y-1/2 bg-brand-base lg:top-15"></span><header class="col-span-full flex flex-col gap-10 px-7 md:flex-row md:items-end md:justify-between md:gap-6 lg:col-start-2 lg:col-end-24 lg:px-0"><div class="flex max-w-[41.5rem] flex-col gap-7 md:self-start"><div class="flex flex-col gap-4"><h2 class="text-balance text-[1.75rem]/8 font-medium tracking-[-0.72px] text-foreground-primary lg:text-[2.25rem]/[2.5rem]">Trusted by teams building for agents.</h2></div></div><div class="shrink-0 md:pb-1"><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pl-4 pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 bg-background-invert text-text-invert hover:bg-background-invert/90 py-3" data-slot="button" href="https://www.mintlify.com/customers">Read more<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></a></div></header></div></div><div class="grid-layout relative" data-rail="all"><div class="relative col-span-full p-0 lg:p-0"><div class="border-t border-border-line pt-4" data-nosnippet=""><div class="mb-4 flex justify-end px-4"><button class="cursor-pointer rounded-[4px] text-sm/5 font-medium text-foreground-secondary outline-offset-2 transition-colors duration-100 hover:text-foreground-primary focus-visible:outline-2 focus-visible:outline-brand" type="button">Pause testimonials</button></div><div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3"><figure class="flex h-[264px] flex-col gap-8 overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 p-4 dark:bg-white/[0.03]"><div class="flex flex-col gap-8" style="opacity:1;filter:blur(0px);transform:none"><div class="flex items-center gap-3"><div aria-hidden="true" class="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-foreground-primary/[0.03]"><svg class="!h-6 w-auto max-w-9" fill="none" height="40" viewbox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#2962FF"></path><path d="M20 27C16.14 27 13 23.86 13 20C13 16.14 16.14 13 20 13C23.52 13 26.44 15.61 26.92 19H33.96C33.45 11.74 27.38 6 20 6C12.28 6 6 12.28 6 20C6 27.72 12.28 34 20 34C27.38 34 33.45 28.26 33.96 21H26.92C26.44 24.39 23.52 27 20 27Z" fill="white"></path></svg></div><div class="flex min-w-0 flex-col gap-1"><figcaption class="truncate text-sm/5 font-medium tracking-[-0.1px] text-foreground-primary">Brian Armstrong</figcaption><span class="truncate text-sm/5 font-normal text-foreground-secondary">Co-founder &amp; CEO, Coinbase</span></div></div><blockquote class="line-clamp-6 text-sm/6 text-text-soft">Yes shout out to Mintlify, great product, worth checking out</blockquote></div></figure><figure class="flex h-[264px] flex-col gap-8 overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 p-4 dark:bg-white/[0.03]"><div class="flex flex-col gap-8" style="opacity:1;filter:blur(0px);transform:none"><div class="flex items-center gap-3"><div aria-hidden="true" class="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-foreground-primary/[0.03]"><svg class="!h-6 w-auto max-w-9 text-black [&amp;_path]:fill-current dark:text-white" fill="none" viewbox="0 0 76 65" xmlns="http://www.w3.org/2000/svg"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor"></path></svg></div><div class="flex min-w-0 flex-col gap-1"><figcaption class="truncate text-sm/5 font-medium tracking-[-0.1px] text-foreground-primary">Guillermo Rauch</figcaption><span class="truncate text-sm/5 font-normal text-foreground-secondary">CEO, Vercel</span></div></div><blockquote class="line-clamp-6 text-sm/6 text-text-soft">Was wondering how docs.x.com was built because it was so fast &amp; delightful. It’s Mintlify</blockquote></div></figure><figure class="flex h-[264px] flex-col gap-8 overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 p-4 dark:bg-white/[0.03]"><div class="flex flex-col gap-8" style="opacity:1;filter:blur(0px);transform:none"><div class="flex items-center gap-3"><div aria-hidden="true" class="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-foreground-primary/[0.03]"><svg class="!h-6 w-auto max-w-9" fill="none" height="24" viewbox="0 0 21 24" width="21" xmlns="http://www.w3.org/2000/svg"><path d="M20.134 11.4235C19.623 10.5443 18.9042 9.83954 18.0056 9.30894C17.3341 8.91801 16.6377 8.6699 15.8531 8.56334V5.76989C16.6377 5.43672 17.1247 4.69928 17.1247 3.83896C17.1247 2.66633 16.1844 1.71609 15.0127 1.71609C13.8401 1.71609 12.8832 2.66633 12.8832 3.83896C12.8832 4.69928 13.3421 5.43672 14.1268 5.76989V8.5646C13.499 8.6553 12.8481 8.851 12.2536 9.15169C11.0394 8.22954 7.05794 5.20429 4.72886 3.43736C4.7841 3.23821 4.82663 3.03294 4.82663 2.81636C4.82663 1.51757 3.77485 0.464844 2.47558 0.464844C1.17631 0.464844 0.125 1.51757 0.125 2.81636C0.125 4.115 1.17741 5.16804 2.47668 5.16804C2.91987 5.16804 3.32978 5.03841 3.68351 4.82529L4.17503 5.19817L10.9289 10.0644C10.5719 10.3923 10.2393 10.7651 9.97332 11.1835C9.43425 12.0365 9.10484 12.975 9.10484 13.9986V14.2122C9.10484 14.9308 9.24138 15.6093 9.47396 16.2466C9.67876 16.8031 9.97819 17.309 10.349 17.7665L8.10752 20.0135C7.90868 19.9402 7.6998 19.9 7.48182 19.9C6.99657 19.9 6.54146 20.0896 6.19824 20.4322C5.85471 20.7757 5.66655 21.232 5.66655 21.7175C5.6667 22.2029 5.85581 22.6591 6.19918 23.0023C6.5424 23.3457 6.99861 23.535 7.48417 23.535C7.96973 23.535 8.4261 23.3457 8.76963 23.0023C9.11238 22.6591 9.30164 22.2028 9.30164 21.7175C9.30164 21.5297 9.27261 21.3464 9.218 21.1722L11.5348 18.855C11.8525 19.0744 12.1955 19.2591 12.5643 19.4184C13.2917 19.7329 14.0946 19.9245 14.9733 19.9245H15.1343C16.1057 19.9245 17.0221 19.6963 17.8835 19.2296C18.7912 18.7364 19.5017 18.0619 20.0384 17.2008C20.5779 16.3373 20.875 15.3833 20.875 14.3337V14.2813C20.875 13.2488 20.636 12.2962 20.134 11.4235ZM17.3031 16.2842C16.6743 16.9831 15.9515 17.4136 15.1343 17.4136H14.9997C14.5329 17.4136 14.0764 17.2846 13.6294 17.0499C13.1257 16.7916 12.7428 16.4231 12.4294 15.9566C12.1054 15.4986 11.9297 14.9986 11.9297 14.4685V14.3075C11.9297 13.7863 12.0297 13.2921 12.2817 12.8254C12.5511 12.3152 12.9151 11.9185 13.3991 11.603C13.8743 11.2898 14.3818 11.1361 14.9471 11.1361H14.9997C15.5122 11.1361 15.9974 11.2372 16.4554 11.4715C16.922 11.7214 17.3031 12.0627 17.5987 12.5117C17.8857 12.9608 18.0564 13.4453 18.1114 13.9731C18.12 14.0828 18.1244 14.1951 18.1244 14.3025C18.1244 15.0187 17.8507 15.6821 17.3031 16.2842Z" fill="#FF4800"></path></svg></div><div class="flex min-w-0 flex-col gap-1"><figcaption class="truncate text-sm/5 font-medium tracking-[-0.1px] text-foreground-primary">HubSpot</figcaption><span class="truncate text-sm/5 font-normal text-foreground-secondary">Product Manager of Developer Growth</span></div></div><blockquote class="line-clamp-6 text-sm/6 text-text-soft">Delivering a best-in-class developer experience is non-negotiable for us. That’s why moving our documentation to Mintlify was the obvious choice.</blockquote></div></figure><figure class="flex h-[264px] flex-col gap-8 overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 p-4 dark:bg-white/[0.03]"><div class="flex flex-col gap-8" style="opacity:1;filter:blur(0px);transform:none"><div class="flex items-center gap-3"><div aria-hidden="true" class="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-foreground-primary/[0.03]"><svg class="!h-6 w-auto max-w-9" fill="none" height="6" viewbox="0 0 21 6" width="21" xmlns="http://www.w3.org/2000/svg"><path d="M20.8809 0.523438H0.130859V5.479H20.8809V0.523438Z" fill="#FF4F00"></path></svg></div><div class="flex min-w-0 flex-col gap-1"><figcaption class="truncate text-sm/5 font-medium tracking-[-0.1px] text-foreground-primary">Abe Duran</figcaption><span class="truncate text-sm/5 font-normal text-foreground-secondary">Developer Support, Zapier</span></div></div><blockquote class="line-clamp-6 text-sm/6 text-text-soft">Honestly, we have found it very, very helpful. If I’m honest with you, it’s been one of the best decisions we have taken and we have made in a long time.</blockquote></div></figure><figure class="flex h-[264px] flex-col gap-8 overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 p-4 dark:bg-white/[0.03]"><div class="flex flex-col gap-8" style="opacity:1;filter:blur(0px);transform:none"><div class="flex items-center gap-3"><div aria-hidden="true" class="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-foreground-primary/[0.03]"><svg class="!h-6 w-auto max-w-9 text-black [&amp;_path]:fill-current dark:text-white" fill="none" viewbox="0 0 800 690" xmlns="http://www.w3.org/2000/svg"><path d="M792.736 481.458L622.15 196.164C614.327 183.052 595.051 172.324 579.311 172.324H472.812C448.058 172.324 437.911 155.47 450.257 134.872L508.662 37.4525C513.296 29.7211 513.285 20.2029 508.637 12.4796C503.986 4.75638 495.399 0 486.106 0H337.536C321.798 0 302.48 10.7039 294.606 23.7869L5.91039 503.427C-1.9666 516.51 -1.96962 537.921 5.8983 551.006L80.182 674.547C92.5601 695.13 112.858 695.154 125.287 674.599L183.33 578.624C195.763 558.069 216.057 558.093 228.435 578.675L281.058 666.192C288.925 679.277 308.24 689.983 323.979 689.983H667.291C683.024 689.983 702.342 679.277 710.21 666.192L792.65 529.092C800.518 516.006 800.556 494.571 792.736 481.458ZM562.356 467.727C574.656 488.351 564.468 505.228 539.714 505.228H272.672C247.919 505.228 237.791 488.385 250.17 467.803L383.793 245.58C396.17 224.997 416.422 224.997 428.799 245.581L562.356 467.727Z" fill="currentColor"></path></svg></div><div class="flex min-w-0 flex-col gap-1"><figcaption class="truncate text-sm/5 font-medium tracking-[-0.1px] text-foreground-primary">Dominic Macias</figcaption><span class="truncate text-sm/5 font-normal text-foreground-secondary">Legal Counsel, Axiom</span></div></div><blockquote class="line-clamp-6 text-sm/6 text-text-soft">Since we adopted Mintlify last year at Axiom, I’ve been more and more delighted with that decision… our customers are getting real value from the AI chat responses.</blockquote></div></figure><figure class="flex h-[264px] flex-col gap-8 overflow-hidden rounded-[6px] border border-border-primary bg-neutral-100 p-4 dark:bg-white/[0.03]"><div class="flex flex-col gap-8" style="opacity:1;filter:blur(0px);transform:none"><div class="flex items-center gap-3"><div aria-hidden="true" class="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-foreground-primary/[0.03]"><svg class="!h-6 w-auto max-w-9 text-black [&amp;_path]:fill-current dark:text-white" fill="none" viewbox="0 0 301 348" xmlns="http://www.w3.org/2000/svg"><path d="M198.956 41.25L138.085 96.0596L96.0273 132.028L150.156 182.659L206.836 134.188L162.945 93.1328L209.556 51.165L300.259 136.007L148.007 266.213L2.60352 130.207L154.856 0L198.956 41.25Z" fill="currentColor"></path><rect fill="currentColor" height="69.1071" transform="matrix(0.75471 -0.656059 0 1 155.689 278.679)" width="195.797"></rect><rect fill="currentColor" height="69.1071" transform="matrix(0.731354 0.681998 0 1 0 144.88)" width="195.797"></rect></svg></div><div class="flex min-w-0 flex-col gap-1"><figcaption class="truncate text-sm/5 font-medium tracking-[-0.1px] text-foreground-primary">Daksh Gupta</figcaption><span class="truncate text-sm/5 font-normal text-foreground-secondary">CEO, Greptile</span></div></div><blockquote class="line-clamp-6 text-sm/6 text-text-soft">The idea that devs hate updating docs will be completely lost on the next gen that have always used Mintlify</blockquote></div></figure></div></div></div></div><div aria-hidden="true" class="grid-layout relative pb-30 lg:pb-40" data-rail="all"></div></section>`,
  T = `<section class="" data-section="updates" id="updates"><div class="bg-background-main"><div class="grid-layout relative py-8 lg:py-10" data-line="bleed" data-rail="all"><span aria-hidden="true" class="absolute left-0 top-12 block h-6 w-[2px] -translate-y-1/2 bg-brand-base lg:top-15"></span><header class="col-span-full flex flex-col gap-10 px-7 md:flex-row md:items-end md:justify-between md:gap-6 lg:col-start-2 lg:col-end-24 lg:px-0"><div class="flex max-w-[41.5rem] flex-col gap-7 md:self-start"><div class="flex flex-col gap-4"><h2 class="text-balance text-[1.75rem]/8 font-medium tracking-[-0.72px] text-foreground-primary lg:text-[2.25rem]/[2.5rem]">Latest updates</h2></div></div><div class="shrink-0 md:pb-1"><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 bg-background-invert text-text-invert hover:bg-background-invert/90 py-3 pl-5" data-slot="button" href="https://www.mintlify.com/blog">All posts<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></a></div></header></div></div><div class="grid-layout relative" data-rail="lg"><div class="relative col-span-full lg:p-4 py-4"><div class="hidden grid-cols-3 gap-4 lg:grid"><a class="group flex h-full flex-col rounded-xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" href="https://www.mintlify.com/blog/mintlify-index"><div class="relative aspect-[341/324] w-full overflow-hidden rounded-xl"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" data-nimg="fill" decoding="async" loading="eager" src="../reference/ee53b059c899c31d.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.02]"></span></div><div class="flex flex-1 flex-col gap-4 px-3 py-4"><div class="flex items-center gap-2"><span class="inline-flex items-center rounded-[4px] bg-background-soft px-2 py-1.5 text-xs/4 font-medium text-text-main lg:text-sm/4">Announcements</span><span class="text-sm/5 text-text-sub">Aug 6, 2026</span></div><p class="text-pretty text-base/6 font-medium text-text-main transition-colors group-hover:text-brand">Introducing Mintlify Index</p></div></a><a class="group flex h-full flex-col rounded-xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" href="https://www.mintlify.com/blog/state-of-docs-traffic"><div class="relative aspect-[341/324] w-full overflow-hidden rounded-xl"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" data-nimg="fill" decoding="async" loading="eager" src="../reference/5611860d8e36d1dc.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.02]"></span></div><div class="flex flex-1 flex-col gap-4 px-3 py-4"><div class="flex items-center gap-2"><span class="inline-flex items-center rounded-[4px] bg-background-soft px-2 py-1.5 text-xs/4 font-medium text-text-main lg:text-sm/4">AI Trends</span><span class="text-sm/5 text-text-sub">Jul 29, 2026</span></div><p class="text-pretty text-base/6 font-medium text-text-main transition-colors group-hover:text-brand">The state of docs traffic: a 2026 midyear report</p></div></a><a class="group flex h-full flex-col rounded-xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" href="https://www.mintlify.com/score" rel="noopener noreferrer" target="_blank"><div class="relative aspect-[341/324] w-full overflow-hidden rounded-xl"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" data-nimg="fill" decoding="async" loading="eager" src="../reference/d1a4ec1fcebc4175.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.02]"></span></div><div class="flex flex-1 flex-col gap-4 px-3 py-4"><div class="flex items-center gap-2"><span class="inline-flex items-center rounded-[4px] bg-background-soft px-2 py-1.5 text-xs/4 font-medium text-text-main lg:text-sm/4">Agent Score</span><span class="text-sm/5 text-text-sub">Apr 27, 2026</span></div><p class="text-pretty text-base/6 font-medium text-text-main transition-colors group-hover:text-brand">Can agents read your docs?</p></div></a></div><div aria-label="Latest blog posts" aria-roledescription="carousel" blossom-carousel="true" class="flex w-auto gap-4 ml-[calc(-1*var(--carousel-gutter))] mr-[calc(-1*var(--carousel-gutter))] pl-[var(--carousel-gutter)] pr-[var(--carousel-gutter)] scroll-pl-[var(--carousel-gutter)] scroll-pr-[var(--carousel-gutter)] sm:ml-0 sm:pl-0 sm:scroll-pl-0 lg:hidden" data-slot="carousel" role="region"><div aria-roledescription="slide" class="min-w-0 shrink-0 w-[calc(100%-32px)] sm:w-[calc(50%-40px)]" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group flex h-full flex-col rounded-xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" href="https://www.mintlify.com/blog/mintlify-index"><div class="relative aspect-[341/324] w-full overflow-hidden rounded-xl"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" data-nimg="fill" decoding="async" loading="eager" src="../reference/ee53b059c899c31d.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.02]"></span></div><div class="flex flex-1 flex-col gap-4 px-3 py-4"><div class="flex items-center gap-2"><span class="inline-flex items-center rounded-[4px] bg-background-soft px-2 py-1.5 text-xs/4 font-medium text-text-main lg:text-sm/4">Announcements</span><span class="text-sm/5 text-text-sub">Aug 6, 2026</span></div><p class="text-pretty text-base/6 font-medium text-text-main transition-colors group-hover:text-brand">Introducing Mintlify Index</p></div></a></div><div aria-roledescription="slide" class="min-w-0 shrink-0 w-[calc(100%-32px)] sm:w-[calc(50%-40px)]" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group flex h-full flex-col rounded-xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" href="https://www.mintlify.com/blog/state-of-docs-traffic"><div class="relative aspect-[341/324] w-full overflow-hidden rounded-xl"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" data-nimg="fill" decoding="async" loading="eager" src="../reference/5611860d8e36d1dc.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.02]"></span></div><div class="flex flex-1 flex-col gap-4 px-3 py-4"><div class="flex items-center gap-2"><span class="inline-flex items-center rounded-[4px] bg-background-soft px-2 py-1.5 text-xs/4 font-medium text-text-main lg:text-sm/4">AI Trends</span><span class="text-sm/5 text-text-sub">Jul 29, 2026</span></div><p class="text-pretty text-base/6 font-medium text-text-main transition-colors group-hover:text-brand">The state of docs traffic: a 2026 midyear report</p></div></a></div><div aria-roledescription="slide" class="min-w-0 shrink-0 w-[calc(100%-32px)] sm:w-[calc(50%-40px)]" data-blossom-slide="true" data-slot="carousel-item" role="group"><a class="group flex h-full flex-col rounded-xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand" href="https://www.mintlify.com/score" rel="noopener noreferrer" target="_blank"><div class="relative aspect-[341/324] w-full overflow-hidden rounded-xl"><img alt="" class="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" data-nimg="fill" decoding="async" loading="eager" src="../reference/d1a4ec1fcebc4175.webp" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/><span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.02]"></span></div><div class="flex flex-1 flex-col gap-4 px-3 py-4"><div class="flex items-center gap-2"><span class="inline-flex items-center rounded-[4px] bg-background-soft px-2 py-1.5 text-xs/4 font-medium text-text-main lg:text-sm/4">Agent Score</span><span class="text-sm/5 text-text-sub">Apr 27, 2026</span></div><p class="text-pretty text-base/6 font-medium text-text-main transition-colors group-hover:text-brand">Can agents read your docs?</p></div></a></div></div></div></div><div aria-hidden="true" class="grid-layout relative pb-30 lg:pb-40" data-rail="lg"></div></section>`,
  E = `<section class="relative overflow-x-clip border-y border-border-line bg-background-main border-b-0" data-section="cta" id="cta"><svg aria-hidden="true" class="block pointer-events-none absolute -bottom-[110px] right-[-35%] w-[125%] max-w-none [clip-path:inset(0_0_110px_0)] sm:w-[85%] sm:right-[-4%] md:w-[70%] md:right-[-6%] lg:-bottom-[110px] lg:right-[-8%] lg:w-[52%] lg:[clip-path:inset(0_0_110px_0)]" fill="none" preserveaspectratio="xMidYMid meet" style="-webkit-mask-image:linear-gradient(to right, transparent, #000 11%, #000 89%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 100%);mask-image:linear-gradient(to right, transparent, #000 11%, #000 89%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 100%);-webkit-mask-composite:source-in;mask-composite:intersect" viewbox="0 0 848 868"><defs><mask id="_R_6annaaivb_-band"><rect fill="#000" height="868" width="848" x="0" y="0"></rect><rect fill="#fff" height="328" width="848" x="0" y="540"></rect></mask><lineargradient gradientunits="userSpaceOnUse" id="_R_6annaaivb_-comet-0" x1="0" x2="-32" y1="0" y2="0"><stop offset="0.2" stop-color="#ffa723"></stop><stop offset="1" stop-color="#ffa723" stop-opacity="0"></stop></lineargradient><lineargradient gradientunits="userSpaceOnUse" id="_R_6annaaivb_-comet-1" x1="0" x2="-32" y1="0" y2="0"><stop offset="0.2" stop-color="#ffa723"></stop><stop offset="1" stop-color="#ffa723" stop-opacity="0"></stop></lineargradient></defs><g class="text-black/[0.05] dark:text-white/[0.07]"><path d="M1302.73 538.349C860.462 763.694 508.448 664.968 260.415 791.347C61.9888 892.45 51.2926 897.9 6.61022 920.667" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"></path><path d="M1085.3 111.633C643.037 336.978 474.859 599.048 226.826 725.427C28.3992 826.53 17.7031 831.98 -26.9793 854.747" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"></path><path d="M1206.9 350.288C764.638 575.633 491.782 632.264 243.749 758.643C45.3229 859.746 34.6268 865.196 -10.0556 887.963" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"></path><path d="M1253.25 441.248C810.986 666.593 500.114 648.612 252.081 774.991C53.6547 876.094 42.9586 881.544 -1.72385 904.311" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"></path><path d="M1350.64 632.372C908.372 857.717 516.779 681.313 268.746 807.692C70.3195 908.795 59.6234 914.245 14.941 937.012" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"></path><path d="M1131.65 202.589C689.384 427.935 483.189 615.392 235.156 741.771C36.7293 842.875 26.0332 848.325 -18.6492 871.092" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"></path><path d="M1035.83 14.5288C593.562 239.874 466.524 582.689 218.491 709.068C20.0649 810.171 9.36877 815.621 -35.3136 838.388" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"></path><path d="M987.443 -80.4331C545.177 144.913 459.394 568.696 211.361 695.076C12.9334 796.18 2.23722 801.63 -42.4454 824.397" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"></path></g><g mask="url(#_R_6annaaivb_-band)"><path d="M1302.73 538.349C860.462 763.694 508.448 664.968 260.415 791.347C61.9888 892.45 51.2926 897.9 6.61022 920.667" stroke="rgb(24,226,153)" stroke-width="1.15" vector-effect="non-scaling-stroke"></path><path d="M1085.3 111.633C643.037 336.978 474.859 599.048 226.826 725.427C28.3992 826.53 17.7031 831.98 -26.9793 854.747" stroke="rgb(47,230,136)" stroke-width="1.15" vector-effect="non-scaling-stroke"></path><path d="M1206.9 350.288C764.638 575.633 491.782 632.264 243.749 758.643C45.3229 859.746 34.6268 865.196 -10.0556 887.963" stroke="rgb(70,234,120)" stroke-width="1.15" vector-effect="non-scaling-stroke"></path><path d="M1253.25 441.248C810.986 666.593 500.114 648.612 252.081 774.991C53.6547 876.094 42.9586 881.544 -1.72385 904.311" stroke="rgb(93,238,103)" stroke-width="1.15" vector-effect="non-scaling-stroke"></path><path d="M1350.64 632.372C908.372 857.717 516.779 681.313 268.746 807.692C70.3195 908.795 59.6234 914.245 14.941 937.012" stroke="rgb(117,243,86)" stroke-width="1.15" vector-effect="non-scaling-stroke"></path><path d="M1131.65 202.589C689.384 427.935 483.189 615.392 235.156 741.771C36.7293 842.875 26.0332 848.325 -18.6492 871.092" stroke="rgb(140,247,69)" stroke-width="1.15" vector-effect="non-scaling-stroke"></path><path d="M1035.83 14.5288C593.562 239.874 466.524 582.689 218.491 709.068C20.0649 810.171 9.36877 815.621 -35.3136 838.388" stroke="rgb(163,251,53)" stroke-width="1.15" vector-effect="non-scaling-stroke"></path><path d="M987.443 -80.4331C545.177 144.913 459.394 568.696 211.361 695.076C12.9334 796.18 2.23722 801.63 -42.4454 824.397" stroke="rgb(186,255,36)" stroke-width="1.15" vector-effect="non-scaling-stroke"></path><g stroke="url(#_R_6annaaivb_-comet-0)" style="opacity:0"><path d="M0 0" stroke-linecap="round" stroke-width="3" vector-effect="non-scaling-stroke"></path></g><g stroke="url(#_R_6annaaivb_-comet-1)" style="opacity:0"><path d="M0 0" stroke-linecap="round" stroke-width="3" vector-effect="non-scaling-stroke"></path></g></g></svg><div class="grid-layout relative border-x border-border-line"><div class="col-span-full flex min-w-0 flex-col items-start gap-10 px-8 pb-14 pt-8 text-left sm:gap-12 md:gap-14 lg:col-start-2 lg:col-end-24 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-0 lg:py-12 lg:text-left"><h2 class="max-w-[246px] text-balance font-serif text-[1.75rem]/[2rem] font-medium tracking-[-0.02em] text-foreground-primary sm:max-w-[340px] sm:text-[2rem]/[2.25rem] md:max-w-[420px] md:text-[2.25rem]/[2.5rem] lg:max-w-none lg:whitespace-nowrap lg:text-[2.25rem]/[2.5rem]">The knowledge platform built for agents</h2><div class="flex shrink-0 flex-wrap items-center gap-2"><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 border border-black/5 bg-neutral-0 text-neutral-800 hover:bg-neutral-100 dark:border-black/[0.04] dark:bg-[#121715] dark:text-neutral-100 dark:hover:bg-[#1b211e] py-3 px-5" data-slot="button" href="https://www.mintlify.com/contact/sales">Talk to sales</a><a class="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border border-transparent pr-3 font-medium text-sm/4 outline-offset-2 transition-[color,background-color,border-color] duration-100 focus-visible:outline-2 focus-visible:outline-brand [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 bg-background-invert text-text-invert hover:bg-background-invert/90 py-3 pl-5" data-slot="button" href="https://app.mintlify.com/signup" rel="noopener" target="_blank">Get started<svg aria-hidden="true" class="size-4 opacity-50 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" fill="none" viewbox="0 0 16 16"><g class="transition-[transform,translate] duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"><path class="opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none" d="M2.5 8H10.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path><path d="M7 4.5L10.5 8 7 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></a></div></div></div></section>`,
  D = `<footer class="relative w-full pt-18 lg:pt-[104px]"><div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 border-t border-border-line bg-background-main"></div><div class="relative isolate grid-layout px-4 pb-18 lg:px-0 lg:pb-16"><canvas aria-hidden="true" class="pointer-events-none absolute left-0 top-0 -z-10" data-dots="true"></canvas><div class="col-span-full mb-10 flex flex-col gap-6 lg:col-span-5 lg:mb-0"><a aria-label="Go to homepage" class="w-fit" href="https://www.mintlify.com/"><svg aria-hidden="true" fill="none" height="24" viewbox="0 0 104 24" width="104" xmlns="http://www.w3.org/2000/svg"><path d="M18.4725 9.60528V3.91396C18.4725 3.30323 17.977 2.81641 17.3754 2.81641H11.6867C10.7931 2.81641 9.90842 2.99342 9.08564 3.32977C8.26285 3.67497 7.51085 4.17064 6.88271 4.80793L6.83847 4.85219C6.00684 5.69305 5.41408 6.73749 5.11328 7.88815C5.65296 7.74653 6.2103 7.67572 6.76767 7.66687C8.25399 7.64916 9.71378 8.12713 10.8993 9.02111C11.9698 9.81771 12.7837 10.9153 13.2261 12.181C13.6861 13.4644 13.7392 14.8629 13.3942 16.1817C14.5354 15.8808 15.5883 15.2878 16.4288 14.4558L16.473 14.4115C17.1011 13.7831 17.6054 13.0307 17.9504 12.2075C18.2955 11.3844 18.4636 10.4993 18.4636 9.60528H18.4725Z" fill="#18E299"></path><path d="M4.9434 9.50941C4.95221 7.76347 5.64849 6.08807 6.87361 4.83594L2.14058 9.57113C2.12296 9.58876 2.10532 9.59758 2.08769 9.61522C0.933084 10.7615 0.23681 12.2959 0.122231 13.9183C0.0164654 15.435 0.413078 16.934 1.2592 18.1862C1.33991 18.3056 1.5589 18.3449 1.68229 18.2303L4.58202 15.338C5.48985 14.4298 5.7719 13.0806 5.34002 11.8726C5.06679 11.1231 4.93459 10.3207 4.9434 9.50941Z" fill="#0C8C5E"></path><path d="M16.4445 14.4121C15.5367 15.3027 14.3997 15.92 13.1658 16.1933C11.923 16.4667 10.6362 16.3873 9.43757 15.9641C9.43757 15.9641 9.42874 15.9641 9.41992 15.9641C8.21243 15.532 6.86394 15.8141 5.95612 16.7136L3.05634 19.6058C2.93295 19.7293 2.95057 19.9321 3.10041 20.0291C4.35197 20.8668 5.85035 21.2724 7.36632 21.1666C8.98806 21.052 10.5128 20.3553 11.6674 19.2002L11.7115 19.1561L16.4445 14.4209V14.4121Z" fill="#0C8C5E"></path><path d="M96.2355 23.5H92.6842L95.1868 17.8513L90.1816 6.60156H93.7568L96.6734 13.6537C96.7753 13.9002 97.1246 13.8997 97.2259 13.653L100.12 6.60156H103.719L96.2355 23.5Z" fill="var(--color-text-main)"></path><path d="M85.4483 18.5186V9.46164H83.041V6.60154H85.4483V5.05232C85.4483 3.63816 85.8773 2.5259 86.7353 1.71554C87.5933 0.90518 88.6818 0.5 90.0006 0.5C90.8109 0.5 91.5021 0.587392 92.0742 0.762175V3.64611C91.6928 3.5031 91.2479 3.4316 90.7394 3.4316C90.0244 3.4316 89.508 3.59049 89.1902 3.90828C88.8724 4.21018 88.7135 4.72659 88.7135 5.4575V6.60154H92.0742V9.46164H88.7135V18.5186H85.4483Z" fill="var(--color-text-main)"></path><path d="M80.1204 4.64714C79.5643 4.64714 79.0797 4.44852 78.6666 4.05129C78.2534 3.63816 78.0469 3.14559 78.0469 2.57357C78.0469 2.00155 78.2534 1.51692 78.6666 1.11969C79.0797 0.706563 79.5643 0.5 80.1204 0.5C80.7084 0.5 81.2009 0.706563 81.5982 1.11969C82.0113 1.51692 82.2178 2.00155 82.2178 2.57357C82.2178 3.14559 82.0113 3.63816 81.5982 4.05129C81.2009 4.44852 80.7084 4.64714 80.1204 4.64714ZM78.4997 18.5186V6.60154H81.765V18.5186H78.4997Z" fill="var(--color-text-main)"></path><path d="M72.8125 18.5182V0.642578H76.0778V18.5182H72.8125Z" fill="var(--color-text-main)"></path><path d="M69.1256 18.6621C67.7909 18.6621 66.6945 18.2966 65.8365 17.5657C64.9943 16.8189 64.5733 15.7464 64.5733 14.3481V9.46211H62.166V6.60201H64.5733V3.28906H67.8385V6.60201H71.1992V9.46211H67.8385V13.7046C67.8385 14.4355 67.9974 14.9598 68.3152 15.2776C68.633 15.5795 69.1494 15.7305 69.8644 15.7305C70.3729 15.7305 70.8178 15.659 71.1992 15.516V18.3999C70.6271 18.5747 69.9359 18.6621 69.1256 18.6621Z" fill="var(--color-text-main)"></path><path d="M49.9434 18.5191V6.60202H53.2086V7.47307C53.2086 7.62037 53.4091 7.6855 53.5066 7.57513C54.2346 6.75161 55.2713 6.33984 56.6169 6.33984C58.047 6.33984 59.1672 6.81653 59.9775 7.76989C60.8038 8.70737 61.2169 9.96263 61.2169 11.5357V18.5191H57.9516V12.0839C57.9516 11.21 57.7689 10.5347 57.4034 10.058C57.038 9.5654 56.5216 9.31911 55.8542 9.31911C55.0598 9.31911 54.4162 9.60512 53.9237 10.1771C53.447 10.7492 53.2086 11.5913 53.2086 12.7036V18.5191H49.9434Z" fill="var(--color-text-main)"></path><path d="M45.8783 4.64714C45.3221 4.64714 44.8375 4.44852 44.4244 4.05129C44.0113 3.63816 43.8047 3.14559 43.8047 2.57357C43.8047 2.00155 44.0113 1.51692 44.4244 1.11969C44.8375 0.706563 45.3221 0.5 45.8783 0.5C46.4662 0.5 46.9587 0.706563 47.356 1.11969C47.7691 1.51692 47.9757 2.00155 47.9757 2.57357C47.9757 3.14559 47.7691 3.63816 47.356 4.05129C46.9587 4.44852 46.4662 4.64714 45.8783 4.64714ZM44.2575 18.5186V6.60154H47.5228V18.5186H44.2575Z" fill="var(--color-text-main)"></path><path d="M38.7147 18.5191V12.1554C38.7147 10.2645 38.095 9.31911 36.8557 9.31911C36.1406 9.31911 35.5686 9.58923 35.1396 10.1295C34.7265 10.6697 34.504 11.4721 34.4722 12.5367V18.5191H31.207V12.1554C31.207 10.2645 30.5873 9.31911 29.3479 9.31911C28.617 9.31911 28.037 9.60512 27.608 10.1771C27.179 10.7492 26.9645 11.5913 26.9645 12.7036V18.5191H23.6992V6.60202H26.9645V7.48165C26.9645 7.62818 27.1615 7.69271 27.2578 7.58222C27.9791 6.75397 28.938 6.33984 30.1344 6.33984C31.7067 6.33984 32.8909 6.98895 33.687 8.28717C33.7498 8.38958 33.9044 8.38799 33.9668 8.28535C34.311 7.71964 34.7893 7.26975 35.4018 6.9357C36.1009 6.53846 36.808 6.33984 37.523 6.33984C38.9372 6.33984 40.0335 6.80858 40.8121 7.74606C41.5907 8.68353 41.98 9.97058 41.98 11.6072V18.5191H38.7147Z" fill="var(--color-text-main)"></path></svg></a><a class="w-fit items-center gap-1.5 rounded border border-black/[0.04] bg-neutral-0 py-1 pl-1.5 pr-2 transition-colors duration-200 hover:border-black/[0.06] hover:bg-neutral-100 dark:border-white/[0.05] dark:bg-[#0a0b0f] dark:hover:border-white/[0.1] dark:hover:bg-neutral-800 hidden lg:mt-auto lg:inline-flex" href="https://status.mintlify.com/" rel="noopener" target="_blank"><span aria-hidden="true" class="relative m-[5px] size-1.5"><span class="animate-signal-ping absolute inset-0 rounded-full bg-green-new"></span><span class="animate-signal-flicker absolute inset-0 rounded-full bg-green-new"></span></span><span class="text-sm/5 text-neutral-700 dark:text-neutral-300">All systems normal</span></a></div><div class="col-span-full grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:col-span-19 lg:grid-cols-5"><div class="flex flex-col gap-10 lg:gap-6"><h3 class="text-sm/5 font-normal text-neutral-400">Explore</h3><ul class="flex flex-col gap-5"><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/startups">Startups</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/enterprise">Enterprise</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/build-vs-buy">Build vs Buy</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/switch">Switch</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/oss-program">OSS program</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/desktop">Download</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://learn.mintlify.com/" rel="noopener" target="_blank">Learn</a></li></ul></div><div class="flex flex-col gap-10 lg:gap-6"><h3 class="text-sm/5 font-normal text-neutral-400">Resources</h3><ul class="flex flex-col gap-5"><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/customers">Customers</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/blog">Blog</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/pricing">Pricing</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/guides/introduction" rel="noopener" target="_blank">Guides</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://github.com/orgs/mintlify/discussions/categories/feature-requests" rel="noopener noreferrer" target="_blank">Feature requests</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/library">Library</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/search-index">Index</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/wiki">Convert from code</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/score">Agent score</a></li></ul></div><div class="flex flex-col gap-10 lg:gap-6"><h3 class="text-sm/5 font-normal text-neutral-400">Documentation</h3><ul class="flex flex-col gap-5"><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/docs" rel="noopener" target="_blank">Getting started</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/docs/api/introduction" rel="noopener" target="_blank">API reference</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/docs/components" rel="noopener" target="_blank">Components</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/docs/changelog" rel="noopener" target="_blank">Changelog</a></li></ul></div><div class="flex flex-col gap-10 lg:gap-6"><h3 class="text-sm/5 font-normal text-neutral-400">Company</h3><ul class="flex flex-col gap-5"><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/careers">Careers</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/events">Events</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/wall-of-love">Wall of love</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/roadmap">Roadmap</a></li></ul></div><div class="flex flex-col gap-10 lg:gap-6"><h3 class="text-sm/5 font-normal text-neutral-400">Legal</h3><ul class="flex flex-col gap-5"><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/legal/privacy">Privacy policy</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/security/responsible-disclosure">Responsible disclosure</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://www.mintlify.com/legal/terms">Terms of service</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://security.mintlify.com" rel="noopener" target="_blank">Security</a></li><li><a class="relative inline-block text-sm/4 font-medium text-text-main transition-colors duration-200 hover:text-brand before:absolute before:-inset-x-3 before:-inset-y-3.5 before:content-['']" href="https://mintlify.typeform.com/to/Bxa77EKc" rel="noopener noreferrer" target="_blank">DSR/DSAR</a></li></ul></div></div><a class="inline-flex w-fit items-center gap-1.5 rounded border border-black/[0.04] bg-neutral-0 py-1 pl-1.5 pr-2 transition-colors duration-200 hover:border-black/[0.06] hover:bg-neutral-100 dark:border-white/[0.05] dark:bg-[#0a0b0f] dark:hover:border-white/[0.1] dark:hover:bg-neutral-800 col-span-full mt-10 lg:hidden" href="https://status.mintlify.com/" rel="noopener" target="_blank"><span aria-hidden="true" class="relative m-[5px] size-1.5"><span class="animate-signal-ping absolute inset-0 rounded-full bg-green-new"></span><span class="animate-signal-flicker absolute inset-0 rounded-full bg-green-new"></span></span><span class="text-sm/5 text-neutral-700 dark:text-neutral-300">All systems normal</span></a><div class="col-span-full mt-10 border-t border-border-line lg:mt-16"></div><div class="col-span-full mt-10 flex items-center justify-between gap-4"><div aria-label="Theme switcher" class="flex items-center gap-2" role="radiogroup"><button aria-checked="false" aria-label="Light" class="group flex size-7 cursor-pointer items-center justify-center rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background-main border-transparent" role="radio" type="button"><svg aria-hidden="true" class="shrink-0 select-none size-5 transition-colors duration-200 text-neutral-300 group-hover:text-neutral-700 dark:text-neutral-700 dark:group-hover:text-neutral-500" fill="none" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 10.001 15 C 7.239 15 5.001 12.761 5.001 10 C 5.001 7.238 7.239 5 10.001 5 C 12.762 5 15.001 7.238 15.001 10 C 15.001 12.761 12.762 15 10.001 15 Z M 9.167 0.833 H 10.834 V 3.333 H 9.167 V 0.833 Z M 9.167 16.666 H 10.834 V 19.166 H 9.167 V 16.666 Z M 2.93 4.107 L 4.108 2.929 L 5.876 4.696 L 4.697 5.875 L 2.93 4.107 Z M 14.125 15.303 L 15.304 14.124 L 17.072 15.892 L 15.893 17.071 L 14.125 15.303 Z M 15.893 2.929 L 17.072 4.107 L 15.304 5.875 L 14.125 4.696 L 15.893 2.929 Z M 4.697 14.124 L 5.876 15.303 L 4.108 17.071 L 2.93 15.892 L 4.697 14.124 Z M 19.167 9.166 V 10.833 H 16.667 V 9.166 H 19.167 Z M 3.334 9.166 V 10.833 H 0.834 V 9.166 H 3.334 Z" fill="currentColor"></path></svg></button><button aria-checked="false" aria-label="Dark" class="group flex size-7 cursor-pointer items-center justify-center rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background-main border-transparent" role="radio" type="button"><svg aria-hidden="true" class="shrink-0 select-none size-5 transition-colors duration-200 text-neutral-300 group-hover:text-neutral-700 dark:text-neutral-700 dark:group-hover:text-neutral-500" fill="none" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 10 18.331 C 5.398 18.331 1.667 14.6 1.667 9.997 C 1.667 5.395 5.398 1.664 10 1.664 C 14.603 1.664 18.334 5.395 18.334 9.997 C 18.334 14.6 14.603 18.331 10 18.331 Z M 10 16.664 C 13.682 16.664 16.667 13.679 16.667 9.997 C 16.667 6.316 13.682 3.331 10 3.331 C 6.318 3.331 3.334 6.316 3.334 9.997 C 3.334 13.679 6.318 16.664 10 16.664 Z M 5.834 12.763 C 7.567 12.637 9.264 11.912 10.59 10.587 C 11.915 9.262 12.64 7.564 12.766 5.831 C 13.038 6.012 13.296 6.222 13.536 6.462 C 15.488 8.414 15.488 11.58 13.536 13.533 C 11.583 15.486 8.417 15.486 6.465 13.533 C 6.225 13.293 6.015 13.035 5.834 12.763 Z" fill="currentColor"></path></svg></button><button aria-checked="false" aria-label="System" class="group flex size-7 cursor-pointer items-center justify-center rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background-main border-transparent" role="radio" type="button"><svg aria-hidden="true" class="shrink-0 select-none size-5 transition-colors duration-200 text-neutral-300 group-hover:text-neutral-700 dark:text-neutral-700 dark:group-hover:text-neutral-500" fill="none" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 11.667 15 V 16.667 L 13.334 17.5 V 18.333 H 6.667 L 6.664 17.503 L 8.334 16.667 V 15 H 2.493 C 2.037 15 1.667 14.626 1.667 14.16 V 3.34 C 1.667 2.876 2.046 2.5 2.493 2.5 H 17.507 C 17.964 2.5 18.334 2.874 18.334 3.34 V 14.16 C 18.334 14.624 17.954 15 17.507 15 H 11.667 Z M 3.334 4.167 V 11.667 H 16.667 V 4.167 H 3.334 Z" fill="currentColor"></path></svg></button></div><div class="flex items-center gap-2"><a aria-label="Github" class="flex size-7 items-center justify-center text-text-base-tertiary transition-colors duration-200 hover:text-text-main" href="https://github.com/mintlify" rel="noopener noreferrer" target="_blank"><svg aria-hidden="true" class="size-5" fill="none" viewbox="0 0 16 16"><path d="M8.00067 1.33301C4.31732 1.33301 1.33398 4.31634 1.33398 7.99967C1.33398 10.9497 3.24232 13.4413 5.89232 14.3247C6.22565 14.383 6.35065 14.183 6.35065 14.008C6.35065 13.8497 6.34232 13.3247 6.34232 12.7663C4.66732 13.0747 4.23398 12.358 4.10065 11.983C4.02565 11.7913 3.70065 11.1997 3.41732 11.0413C3.18398 10.9163 2.85065 10.608 3.40898 10.5997C3.93398 10.5913 4.30898 11.083 4.43398 11.283C5.03398 12.2913 5.99232 12.008 6.37565 11.833C6.43398 11.3997 6.60898 11.108 6.80066 10.9413C5.31732 10.7747 3.76732 10.1997 3.76732 7.64967C3.76732 6.92467 4.02565 6.32468 4.45065 5.85801C4.38398 5.69134 4.15065 5.00801 4.51732 4.09134C4.51732 4.09134 5.07565 3.91634 6.35065 4.77467C6.884 4.62467 7.45066 4.54967 8.01733 4.54967C8.584 4.54967 9.15066 4.62467 9.684 4.77467C10.959 3.90801 11.5173 4.09134 11.5173 4.09134C11.884 5.00801 11.6507 5.69134 11.584 5.85801C12.009 6.32468 12.2673 6.91634 12.2673 7.64967C12.2673 10.208 10.709 10.7747 9.22567 10.9413C9.46733 11.1497 9.67566 11.5497 9.67566 12.1747C9.67566 13.0663 9.66733 13.783 9.66733 14.008C9.66733 14.183 9.79233 14.3913 10.1257 14.3247C12.8393 13.4085 14.6666 10.8639 14.6673 7.99967C14.6673 4.31634 11.684 1.33301 8.00067 1.33301Z" fill="currentColor"></path></svg></a><a aria-label="X" class="flex size-7 items-center justify-center text-text-base-tertiary transition-colors duration-200 hover:text-text-main" href="https://x.com/mintlify" rel="noopener noreferrer" target="_blank"><svg aria-hidden="true" class="size-5" fill="none" viewbox="0 0 16 16"><path d="M6.99216 9.76733L10.1666 14H14.8333L9.59443 7.01487L13.9538 2H12.1872L8.77616 5.92385L5.83329 2H1.16663L6.17387 8.67633L1.54606 14H3.31274L6.99216 9.76733ZM10.8333 12.6667L3.83329 3.33333H5.16663L12.1666 12.6667H10.8333Z" fill="currentColor"></path></svg></a><a aria-label="LinkedIn" class="flex size-7 items-center justify-center text-text-base-tertiary transition-colors duration-200 hover:text-text-main" href="https://www.linkedin.com/company/mintlify/posts" rel="noopener noreferrer" target="_blank"><svg aria-hidden="true" class="size-5" fill="none" viewbox="0 0 16 16"><path d="M12.2241 12.226H10.4471V9.44147C10.4471 8.77747 10.4336 7.923 9.52109 7.923C8.59462 7.923 8.45309 8.64553 8.45309 9.39247V12.226H6.67609V6.5H8.38309V7.28047H8.40609C8.64462 6.83047 9.22462 6.3555 10.0911 6.3555C11.8916 6.3555 12.2246 7.54053 12.2246 9.083L12.2241 12.226ZM4.66911 5.7165C4.09711 5.7165 3.63761 5.2535 3.63761 4.684C3.63761 4.115 4.09761 3.6525 4.66911 3.6525C5.23911 3.6525 5.70111 4.115 5.70111 4.684C5.70111 5.2535 5.23861 5.7165 4.66911 5.7165ZM5.56011 12.226H3.77811V6.5H5.56011V12.226ZM13.1131 2H2.88611C2.39661 2 2.00061 2.387 2.00061 2.8645V13.1355C2.00061 13.6135 2.39661 14 2.88611 14H13.1116C13.6006 14 14.0006 13.6135 14.0006 13.1355V2.8645C14.0006 2.387 13.6006 2 13.1116 2H13.1131Z" fill="currentColor"></path></svg></a></div></div></div></footer>`,
  O = e(r(), 1);
(m.RuntimeLoader.setWasmUrl(`/reference/rive.wasm`),
  m.RuntimeLoader.setWasmFallbackUrl(`/reference/rive_fallback.wasm`));
var k = {
  announcement: h,
  desktopHeader: g,
  mobileHeader: _,
  hero: v,
  logos: y,
  features: b,
  enterprise: x,
  scale: S,
  startups: C,
  testimonials: w,
  updates: T,
  cta: E,
  footer: D,
};
function A({ name: e, dark: t = !0 }) {
  let n = i(),
    { rive: r, RiveComponent: a } = (0, m.useRive)({
      src: `/reference/rives/${e}.riv`,
      stateMachines: `State Machine 1`,
      autoplay: !0,
    }),
    o = (0, m.useViewModel)(r, { useDefault: !0 }),
    s = (0, m.useViewModelInstance)(o, { useDefault: !0, rive: r }),
    c = (0, m.useViewModelInstanceBoolean)(`darkMode`, s);
  return (
    (0, p.useEffect)(() => {
      s && c.setValue(t);
    }, [s, t]),
    (0, p.useEffect)(() => {
      if (n && r) {
        let e = setTimeout(() => r.pause(), 100);
        return () => clearTimeout(e);
      }
    }, [n, r]),
    (0, O.jsx)(a, { className: `size-full`, "aria-hidden": `true` })
  );
}
function j({ sections: e = k }) {
  let {
      announcement: t,
      desktopHeader: n,
      mobileHeader: r,
      hero: i,
      logos: d,
      features: f,
      enterprise: m,
      scale: h,
      startups: g,
      testimonials: _,
      updates: v,
      cta: y,
      footer: b,
    } = e,
    [x, S] = (0, p.useState)(`Dark`),
    [C, w] = (0, p.useState)(null),
    [T, E] = (0, p.useState)(!1);
  (0, p.useEffect)(() => {
    ((document.title = `Mintlify · Original copy checkpoint`),
      document.documentElement.classList.toggle(
        `dark`,
        x === `Dark` ||
          (x === `System` &&
            matchMedia(`(prefers-color-scheme: dark)`).matches),
      ),
      (document.body.className = `geist_mono_1bf8cbf6-module__FlyLvG__variable inter_83a5a2e-module__LLhbsa__variable papermono_aa9e121d-module__lcvVkq__variable arizonaflare_e3e8b677-module__PbqaBq__variable`));
  }, [x]);
  let D = (0, p.useRef)(null);
  o(D, e);
  let j = {
    replace(e) {
      if (e.type !== `tag`) return;
      let t = e.attribs || {};
      if (t[`data-ribbon`])
        return (0, O.jsx)(a, {
          hero: t[`data-ribbon`] === `hero`,
          className: t.class,
        });
      if (t[`data-rive`])
        return (0, O.jsx)(A, { name: t[`data-rive`], dark: x !== `Light` });
      if (t[`data-dots`])
        return (0, O.jsx)(c, {
          marginClip:
            e.parent?.attribs?.class?.includes(`isolate`) &&
            !e.parent?.attribs?.class?.includes(`pb-18`),
        });
      if (e.name === `button`) {
        let n = (0, l.attributesToProps)(t),
          r =
            t[`aria-label`] ||
            e.children
              ?.filter((e) => e.type === `text`)
              .map((e) => e.data)
              .join(``);
        if ((delete n.command, delete n.commandfor, t[`data-direction`]))
          return (0, O.jsx)(`button`, {
            ...n,
            onClick: () => u(t[`aria-controls`], t[`data-direction`]),
            children: (0, l.domToReact)(e.children, j),
          });
        if ([`Light`, `Dark`, `System`].includes(r))
          return (0, O.jsx)(`button`, {
            ...n,
            "aria-checked": x === r,
            onClick: () => S(r),
            children: (0, l.domToReact)(e.children, j),
          });
        if (r === `Pause testimonials`)
          return (0, O.jsx)(`button`, {
            ...n,
            onClick: () => E(!T),
            children: T ? `Play testimonials` : `Pause testimonials`,
          });
        if ([`Products`, `Solutions`, `Resources`, `Open menu`].includes(r))
          return (0, O.jsxs)(`span`, {
            className: `reference-menu-wrap`,
            children: [
              (0, O.jsx)(`button`, {
                ...n,
                "aria-expanded": C === r,
                onClick: () => w(C === r ? null : r),
                children: (0, l.domToReact)(e.children, j),
              }),
              C === r &&
                (0, O.jsx)(`div`, {
                  className: `reference-menu`,
                  children: (r === `Products`
                    ? [`Documentation`, `Editor`, `Automations`]
                    : r === `Solutions`
                      ? [`Enterprise`, `Startups`, `Build vs Buy`]
                      : [`Customers`, `Blog`, `Guides`, `Pricing`]
                  ).map((e) =>
                    (0, O.jsx)(
                      `a`,
                      {
                        href:
                          `https://www.mintlify.com/` +
                          e.toLowerCase().replaceAll(` `, `-`),
                        children: e,
                      },
                      e,
                    ),
                  ),
                }),
            ],
          });
      }
    },
  };
  return (0, O.jsxs)(`div`, {
    ref: D,
    className: `reference-page` + (T ? ` testimonials-paused` : ``),
    children: [
      s(t + n + r, j),
      (0, O.jsx)(`main`, {
        className: `overflow-x-clip`,
        children: [i, d, f, m, h, g, _, v, y].map((e, t) =>
          (0, O.jsx)(p.Fragment, { children: s(e, j) }, t),
        ),
      }),
      s(b, j),
      (0, O.jsx)(`a`, {
        className: `reference-assistant`,
        href: `https://www.mintlify.com/docs`,
        children: `▣ Ask assistant`,
      }),
    ],
  });
}
export { A as RiveArt, j as default, k as sourceSections };
