import { n as e, o as t, r as n, s as r, t as i } from "./rolldown-runtime.js";
import { n as a, t as o } from "./jsx-runtime.js";
var s = i((e) => {
    var t;
    (function (e) {
      ((e.Root = `root`),
        (e.Text = `text`),
        (e.Directive = `directive`),
        (e.Comment = `comment`),
        (e.Script = `script`),
        (e.Style = `style`),
        (e.Tag = `tag`),
        (e.CDATA = `cdata`),
        (e.Doctype = `doctype`));
    })((t ||= {}));
    function n(e) {
      return e.type === t.Tag || e.type === t.Script || e.type === t.Style;
    }
    (t.Root,
      t.Text,
      t.Directive,
      t.Comment,
      t.Script,
      t.Style,
      t.Tag,
      t.CDATA,
      t.Doctype,
      Object.defineProperty(e, "ElementType", {
        enumerable: !0,
        get: function () {
          return t;
        },
      }),
      (e.isTag = n));
  }),
  c = i((e) => {
    var t = s(),
      n = class {
        parent = null;
        prev = null;
        next = null;
        startIndex = null;
        endIndex = null;
        get parentNode() {
          return this.parent;
        }
        set parentNode(e) {
          this.parent = e;
        }
        get previousSibling() {
          return this.prev;
        }
        set previousSibling(e) {
          this.prev = e;
        }
        get nextSibling() {
          return this.next;
        }
        set nextSibling(e) {
          this.next = e;
        }
        cloneNode(e = !1) {
          return v(this, e);
        }
      },
      r = class extends n {
        data;
        constructor(e) {
          (super(), (this.data = e));
        }
        get nodeValue() {
          return this.data;
        }
        set nodeValue(e) {
          this.data = e;
        }
      },
      i = class extends r {
        type = t.ElementType.Text;
        get nodeType() {
          return 3;
        }
      },
      a = class extends r {
        type = t.ElementType.Comment;
        get nodeType() {
          return 8;
        }
      },
      o = class extends r {
        type = t.ElementType.Directive;
        name;
        constructor(e, t) {
          (super(t), (this.name = e));
        }
        get nodeType() {
          return 1;
        }
        "x-name";
        "x-publicId";
        "x-systemId";
      },
      c = class extends n {
        children;
        constructor(e) {
          (super(), (this.children = e));
        }
        get firstChild() {
          return this.children[0] ?? null;
        }
        get lastChild() {
          return this.children.length > 0
            ? this.children[this.children.length - 1]
            : null;
        }
        get childNodes() {
          return this.children;
        }
        set childNodes(e) {
          this.children = e;
        }
      },
      l = class extends c {
        type = t.ElementType.CDATA;
        get nodeType() {
          return 4;
        }
      },
      u = class extends c {
        type = t.ElementType.Root;
        get nodeType() {
          return 9;
        }
      },
      d = class extends c {
        name;
        attribs;
        type;
        constructor(
          e,
          n,
          r = [],
          i = e === `script`
            ? t.ElementType.Script
            : e === `style`
              ? t.ElementType.Style
              : t.ElementType.Tag,
        ) {
          (super(r), (this.name = e), (this.attribs = n), (this.type = i));
        }
        get nodeType() {
          return 1;
        }
        get tagName() {
          return this.name;
        }
        set tagName(e) {
          this.name = e;
        }
        get attributes() {
          return Object.keys(this.attribs).map((e) => ({
            name: e,
            value: this.attribs[e],
            namespace: this[`x-attribsNamespace`]?.[e],
            prefix: this[`x-attribsPrefix`]?.[e],
          }));
        }
        namespace;
        "x-attribsNamespace";
        "x-attribsPrefix";
      };
    function f(e) {
      return t.isTag(e);
    }
    function p(e) {
      return e.type === t.ElementType.CDATA;
    }
    function m(e) {
      return e.type === t.ElementType.Text;
    }
    function h(e) {
      return e.type === t.ElementType.Comment;
    }
    function g(e) {
      return e.type === t.ElementType.Directive;
    }
    function _(e) {
      return e.type === t.ElementType.Root;
    }
    function v(e, t = !1) {
      let n;
      if (m(e)) n = new i(e.data);
      else if (h(e)) n = new a(e.data);
      else if (f(e)) {
        let r = t ? y(e.children) : [],
          i = new d(e.name, { ...e.attribs }, r);
        for (let e of r) e.parent = i;
        (e.namespace != null && (i.namespace = e.namespace),
          e[`x-attribsNamespace`] &&
            (i[`x-attribsNamespace`] = { ...e[`x-attribsNamespace`] }),
          e[`x-attribsPrefix`] &&
            (i[`x-attribsPrefix`] = { ...e[`x-attribsPrefix`] }),
          (n = i));
      } else if (p(e)) {
        let r = t ? y(e.children) : [],
          i = new l(r);
        for (let e of r) e.parent = i;
        n = i;
      } else if (_(e)) {
        let r = t ? y(e.children) : [],
          i = new u(r);
        for (let e of r) e.parent = i;
        (e[`x-mode`] && (i[`x-mode`] = e[`x-mode`]), (n = i));
      } else if (g(e)) {
        let t = new o(e.name, e.data);
        (e[`x-name`] != null &&
          ((t[`x-name`] = e[`x-name`]),
          (t[`x-publicId`] = e[`x-publicId`]),
          (t[`x-systemId`] = e[`x-systemId`])),
          (n = t));
      } else throw Error(`Not implemented yet: ${e.type}`);
      return (
        (n.startIndex = e.startIndex),
        (n.endIndex = e.endIndex),
        e.sourceCodeLocation != null &&
          (n.sourceCodeLocation = e.sourceCodeLocation),
        n
      );
    }
    function y(e) {
      let t = e.map((e) => v(e, !0));
      for (let e = 1; e < t.length; e++)
        ((t[e].prev = t[e - 1]), (t[e - 1].next = t[e]));
      return t;
    }
    ((e.CDATA = l),
      (e.Comment = a),
      (e.DataNode = r),
      (e.Document = u),
      (e.Element = d),
      (e.Node = n),
      (e.NodeWithChildren = c),
      (e.ProcessingInstruction = o),
      (e.Text = i),
      (e.cloneNode = v),
      (e.isCDATA = p),
      (e.isComment = h),
      (e.isDirective = g),
      (e.isDocument = _),
      (e.isTag = f),
      (e.isText = m));
  }),
  l = i((e) => {
    var t =
        `animateMotion.animateTransform.clipPath.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.foreignObject.linearGradient.radialGradient.textPath`.split(
          `.`,
        ),
      n = t.reduce((e, t) => ((e[t.toLowerCase()] = t), e), {});
    ((e.CASE_SENSITIVE_TAG_NAMES = t), (e.CASE_SENSITIVE_TAG_NAMES_MAP = n));
  }),
  u = i((e) => {
    var t = c(),
      n = l(),
      r = `\r`,
      i = new RegExp(r, `g`),
      a = `__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_${Date.now().toString()}__`,
      o = new RegExp(a, `g`);
    function s(e) {
      return n.CASE_SENSITIVE_TAG_NAMES_MAP[e];
    }
    function u(e) {
      let t = {},
        n = 0,
        r = e.length;
      for (; n < r; n++) {
        let r = e[n];
        t[r.name] = r.value;
      }
      return t;
    }
    function d(e) {
      return ((e = e.toLowerCase()), s(e) || e);
    }
    function f(e, t) {
      let n = `<` + t,
        r = e.toLowerCase().indexOf(n);
      if (r === -1) return !1;
      let i = e[r + n.length];
      return (
        i === `>` ||
        i === ` ` ||
        i === `	` ||
        i ===
          `
` ||
        i === `\r` ||
        i === `/`
      );
    }
    function p(e) {
      return e.replace(i, a);
    }
    function m(e) {
      return e.replace(o, r);
    }
    function h(e, n = null, r) {
      let i = [],
        a,
        o = 0,
        s = e.length;
      for (; o < s; o++) {
        let r = e[o];
        switch (r.nodeType) {
          case 1: {
            let e = d(r.nodeName);
            ((a = new t.Element(e, u(r.attributes))),
              (a.children = h(
                e === `template` ? r.content.childNodes : r.childNodes,
                a,
              )));
            break;
          }
          case 3:
            a = new t.Text(m(r.nodeValue ?? ``));
            break;
          case 8:
            a = new t.Comment(r.nodeValue ?? ``);
            break;
          default:
            continue;
        }
        let s = i[o - 1] ?? null;
        (s && (s.next = a),
          (a.parent = n),
          (a.prev = s),
          (a.next = null),
          i.push(a));
      }
      return (
        r &&
          ((a = new t.ProcessingInstruction(
            r.substring(0, r.indexOf(` `)).toLowerCase(),
            r,
          )),
          (a.next = i[0] ?? null),
          (a.parent = n),
          i.unshift(a),
          i[1] && (i[1].prev = i[0])),
        i
      );
    }
    ((e.escapeSpecialCharacters = p),
      (e.formatDOM = h),
      (e.hasOpenTag = f),
      (e.revertEscapedCharacters = m));
  }),
  d = i((e) => {
    var t = u(),
      n = `html`,
      r = `head`,
      i = `body`,
      a = /<([a-zA-Z]+[0-9]?)/;
    function o(e, t) {
      return t ? t.createHTML(e) : e;
    }
    var s = (e, t, n) => {
        throw Error(
          "This browser does not support `document.implementation.createHTMLDocument`",
        );
      },
      c = (e, t, n) => {
        throw Error(
          "This browser does not support `DOMParser.prototype.parseFromString`",
        );
      },
      l = typeof window == `object` && window.DOMParser;
    if (typeof l == `function`) {
      let e = new l();
      ((c = (t, n, r) => (
        n && (t = `<${n}>${t}</${n}>`),
        e.parseFromString(t, `text/html`)
      )),
        (s = c));
    }
    if (typeof document == `object` && document.implementation) {
      let e = document.implementation.createHTMLDocument();
      s = function (t, n, r) {
        if (n) {
          let i = e.documentElement.querySelector(n);
          return (i && (i.innerHTML = o(t, r)), e);
        }
        return ((e.documentElement.innerHTML = o(t, r)), e);
      };
    }
    var d = typeof document == `object` && document.createElement(`template`),
      f;
    d &&
      d.content &&
      (f = (e, t) => ((d.innerHTML = o(e, t)), d.content.childNodes));
    var p = () => document.createDocumentFragment().childNodes;
    function m(e, o) {
      e = t.escapeSpecialCharacters(e);
      let l = a.exec(e)?.[1]?.toLowerCase();
      switch (l) {
        case n: {
          let a = c(e);
          if (!t.hasOpenTag(e, r)) {
            let e = a.querySelector(r);
            e?.parentNode?.removeChild(e);
          }
          if (!t.hasOpenTag(e, i)) {
            let e = a.querySelector(i);
            e?.parentNode?.removeChild(e);
          }
          return a.querySelectorAll(n);
        }
        case r:
        case i: {
          let n = s(e, void 0, o).querySelectorAll(l);
          return t.hasOpenTag(e, i) && t.hasOpenTag(e, r)
            ? (n[0].parentNode?.childNodes ?? p())
            : n;
        }
        default:
          return f ? f(e, o) : (s(e, i, o).querySelector(i)?.childNodes ?? p());
      }
    }
    ((e.default = m), (e.getHTMLForInnerHTML = o));
  }),
  f = i((e) => {
    Object.defineProperties(e, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: `Module` },
    });
    var t = u(),
      n = d(),
      r = /<(![a-zA-Z\s]+)>/;
    function i(e, i) {
      if (typeof e != `string`)
        throw TypeError(`First argument must be a string`);
      if (!e) return [];
      let a = r.exec(e),
        o = a ? a[1] : void 0;
      return t.formatDOM(n.default(e, i?.trustedTypePolicy), null, o);
    }
    e.default = i;
  }),
  p = i((e) => {
    ((e.SAME = 0),
      (e.CAMELCASE = 1),
      (e.possibleStandardNames = {
        accept: 0,
        acceptCharset: 1,
        "accept-charset": `acceptCharset`,
        accessKey: 1,
        action: 0,
        allowFullScreen: 1,
        alt: 0,
        as: 0,
        async: 0,
        autoCapitalize: 1,
        autoComplete: 1,
        autoCorrect: 1,
        autoFocus: 1,
        autoPlay: 1,
        autoSave: 1,
        capture: 0,
        cellPadding: 1,
        cellSpacing: 1,
        challenge: 0,
        charSet: 1,
        checked: 0,
        children: 0,
        cite: 0,
        class: `className`,
        classID: 1,
        className: 1,
        cols: 0,
        colSpan: 1,
        content: 0,
        contentEditable: 1,
        contextMenu: 1,
        controls: 0,
        controlsList: 1,
        coords: 0,
        crossOrigin: 1,
        dangerouslySetInnerHTML: 1,
        data: 0,
        dateTime: 1,
        default: 0,
        defaultChecked: 1,
        defaultValue: 1,
        defer: 0,
        dir: 0,
        disabled: 0,
        disablePictureInPicture: 1,
        disableRemotePlayback: 1,
        download: 0,
        draggable: 0,
        encType: 1,
        enterKeyHint: 1,
        for: `htmlFor`,
        form: 0,
        formMethod: 1,
        formAction: 1,
        formEncType: 1,
        formNoValidate: 1,
        formTarget: 1,
        frameBorder: 1,
        headers: 0,
        height: 0,
        hidden: 0,
        high: 0,
        href: 0,
        hrefLang: 1,
        htmlFor: 1,
        httpEquiv: 1,
        "http-equiv": `httpEquiv`,
        icon: 0,
        id: 0,
        innerHTML: 1,
        inputMode: 1,
        integrity: 0,
        is: 0,
        itemID: 1,
        itemProp: 1,
        itemRef: 1,
        itemScope: 1,
        itemType: 1,
        keyParams: 1,
        keyType: 1,
        kind: 0,
        label: 0,
        lang: 0,
        list: 0,
        loop: 0,
        low: 0,
        manifest: 0,
        marginWidth: 1,
        marginHeight: 1,
        max: 0,
        maxLength: 1,
        media: 0,
        mediaGroup: 1,
        method: 0,
        min: 0,
        minLength: 1,
        multiple: 0,
        muted: 0,
        name: 0,
        noModule: 1,
        nonce: 0,
        noValidate: 1,
        open: 0,
        optimum: 0,
        pattern: 0,
        placeholder: 0,
        playsInline: 1,
        poster: 0,
        preload: 0,
        profile: 0,
        radioGroup: 1,
        readOnly: 1,
        referrerPolicy: 1,
        rel: 0,
        required: 0,
        reversed: 0,
        role: 0,
        rows: 0,
        rowSpan: 1,
        sandbox: 0,
        scope: 0,
        scoped: 0,
        scrolling: 0,
        seamless: 0,
        selected: 0,
        shape: 0,
        size: 0,
        sizes: 0,
        span: 0,
        spellCheck: 1,
        src: 0,
        srcDoc: 1,
        srcLang: 1,
        srcSet: 1,
        start: 0,
        step: 0,
        style: 0,
        summary: 0,
        tabIndex: 1,
        target: 0,
        title: 0,
        type: 0,
        useMap: 1,
        value: 0,
        width: 0,
        wmode: 0,
        wrap: 0,
        about: 0,
        accentHeight: 1,
        "accent-height": `accentHeight`,
        accumulate: 0,
        additive: 0,
        alignmentBaseline: 1,
        "alignment-baseline": `alignmentBaseline`,
        allowReorder: 1,
        alphabetic: 0,
        amplitude: 0,
        arabicForm: 1,
        "arabic-form": `arabicForm`,
        ascent: 0,
        attributeName: 1,
        attributeType: 1,
        autoReverse: 1,
        azimuth: 0,
        baseFrequency: 1,
        baselineShift: 1,
        "baseline-shift": `baselineShift`,
        baseProfile: 1,
        bbox: 0,
        begin: 0,
        bias: 0,
        by: 0,
        calcMode: 1,
        capHeight: 1,
        "cap-height": `capHeight`,
        clip: 0,
        clipPath: 1,
        "clip-path": `clipPath`,
        clipPathUnits: 1,
        clipRule: 1,
        "clip-rule": `clipRule`,
        color: 0,
        colorInterpolation: 1,
        "color-interpolation": `colorInterpolation`,
        colorInterpolationFilters: 1,
        "color-interpolation-filters": `colorInterpolationFilters`,
        colorProfile: 1,
        "color-profile": `colorProfile`,
        colorRendering: 1,
        "color-rendering": `colorRendering`,
        contentScriptType: 1,
        contentStyleType: 1,
        cursor: 0,
        cx: 0,
        cy: 0,
        d: 0,
        datatype: 0,
        decelerate: 0,
        descent: 0,
        diffuseConstant: 1,
        direction: 0,
        display: 0,
        divisor: 0,
        dominantBaseline: 1,
        "dominant-baseline": `dominantBaseline`,
        dur: 0,
        dx: 0,
        dy: 0,
        edgeMode: 1,
        elevation: 0,
        enableBackground: 1,
        "enable-background": `enableBackground`,
        end: 0,
        exponent: 0,
        externalResourcesRequired: 1,
        fill: 0,
        fillOpacity: 1,
        "fill-opacity": `fillOpacity`,
        fillRule: 1,
        "fill-rule": `fillRule`,
        filter: 0,
        filterRes: 1,
        filterUnits: 1,
        floodOpacity: 1,
        "flood-opacity": `floodOpacity`,
        floodColor: 1,
        "flood-color": `floodColor`,
        focusable: 0,
        fontFamily: 1,
        "font-family": `fontFamily`,
        fontSize: 1,
        "font-size": `fontSize`,
        fontSizeAdjust: 1,
        "font-size-adjust": `fontSizeAdjust`,
        fontStretch: 1,
        "font-stretch": `fontStretch`,
        fontStyle: 1,
        "font-style": `fontStyle`,
        fontVariant: 1,
        "font-variant": `fontVariant`,
        fontWeight: 1,
        "font-weight": `fontWeight`,
        format: 0,
        from: 0,
        fx: 0,
        fy: 0,
        g1: 0,
        g2: 0,
        glyphName: 1,
        "glyph-name": `glyphName`,
        glyphOrientationHorizontal: 1,
        "glyph-orientation-horizontal": `glyphOrientationHorizontal`,
        glyphOrientationVertical: 1,
        "glyph-orientation-vertical": `glyphOrientationVertical`,
        glyphRef: 1,
        gradientTransform: 1,
        gradientUnits: 1,
        hanging: 0,
        horizAdvX: 1,
        "horiz-adv-x": `horizAdvX`,
        horizOriginX: 1,
        "horiz-origin-x": `horizOriginX`,
        ideographic: 0,
        imageRendering: 1,
        "image-rendering": `imageRendering`,
        in2: 0,
        in: 0,
        inlist: 0,
        intercept: 0,
        k1: 0,
        k2: 0,
        k3: 0,
        k4: 0,
        k: 0,
        kernelMatrix: 1,
        kernelUnitLength: 1,
        kerning: 0,
        keyPoints: 1,
        keySplines: 1,
        keyTimes: 1,
        lengthAdjust: 1,
        letterSpacing: 1,
        "letter-spacing": `letterSpacing`,
        lightingColor: 1,
        "lighting-color": `lightingColor`,
        limitingConeAngle: 1,
        local: 0,
        markerEnd: 1,
        "marker-end": `markerEnd`,
        markerHeight: 1,
        markerMid: 1,
        "marker-mid": `markerMid`,
        markerStart: 1,
        "marker-start": `markerStart`,
        markerUnits: 1,
        markerWidth: 1,
        mask: 0,
        maskContentUnits: 1,
        maskUnits: 1,
        mathematical: 0,
        mode: 0,
        numOctaves: 1,
        offset: 0,
        opacity: 0,
        operator: 0,
        order: 0,
        orient: 0,
        orientation: 0,
        origin: 0,
        overflow: 0,
        overlinePosition: 1,
        "overline-position": `overlinePosition`,
        overlineThickness: 1,
        "overline-thickness": `overlineThickness`,
        paintOrder: 1,
        "paint-order": `paintOrder`,
        panose1: 0,
        "panose-1": `panose1`,
        pathLength: 1,
        patternContentUnits: 1,
        patternTransform: 1,
        patternUnits: 1,
        pointerEvents: 1,
        "pointer-events": `pointerEvents`,
        points: 0,
        pointsAtX: 1,
        pointsAtY: 1,
        pointsAtZ: 1,
        prefix: 0,
        preserveAlpha: 1,
        preserveAspectRatio: 1,
        primitiveUnits: 1,
        property: 0,
        r: 0,
        radius: 0,
        refX: 1,
        refY: 1,
        renderingIntent: 1,
        "rendering-intent": `renderingIntent`,
        repeatCount: 1,
        repeatDur: 1,
        requiredExtensions: 1,
        requiredFeatures: 1,
        resource: 0,
        restart: 0,
        result: 0,
        results: 0,
        rotate: 0,
        rx: 0,
        ry: 0,
        scale: 0,
        security: 0,
        seed: 0,
        shapeRendering: 1,
        "shape-rendering": `shapeRendering`,
        slope: 0,
        spacing: 0,
        specularConstant: 1,
        specularExponent: 1,
        speed: 0,
        spreadMethod: 1,
        startOffset: 1,
        stdDeviation: 1,
        stemh: 0,
        stemv: 0,
        stitchTiles: 1,
        stopColor: 1,
        "stop-color": `stopColor`,
        stopOpacity: 1,
        "stop-opacity": `stopOpacity`,
        strikethroughPosition: 1,
        "strikethrough-position": `strikethroughPosition`,
        strikethroughThickness: 1,
        "strikethrough-thickness": `strikethroughThickness`,
        string: 0,
        stroke: 0,
        strokeDasharray: 1,
        "stroke-dasharray": `strokeDasharray`,
        strokeDashoffset: 1,
        "stroke-dashoffset": `strokeDashoffset`,
        strokeLinecap: 1,
        "stroke-linecap": `strokeLinecap`,
        strokeLinejoin: 1,
        "stroke-linejoin": `strokeLinejoin`,
        strokeMiterlimit: 1,
        "stroke-miterlimit": `strokeMiterlimit`,
        strokeWidth: 1,
        "stroke-width": `strokeWidth`,
        strokeOpacity: 1,
        "stroke-opacity": `strokeOpacity`,
        suppressContentEditableWarning: 1,
        suppressHydrationWarning: 1,
        surfaceScale: 1,
        systemLanguage: 1,
        tableValues: 1,
        targetX: 1,
        targetY: 1,
        textAnchor: 1,
        "text-anchor": `textAnchor`,
        textDecoration: 1,
        "text-decoration": `textDecoration`,
        textLength: 1,
        textRendering: 1,
        "text-rendering": `textRendering`,
        to: 0,
        transform: 0,
        typeof: 0,
        u1: 0,
        u2: 0,
        underlinePosition: 1,
        "underline-position": `underlinePosition`,
        underlineThickness: 1,
        "underline-thickness": `underlineThickness`,
        unicode: 0,
        unicodeBidi: 1,
        "unicode-bidi": `unicodeBidi`,
        unicodeRange: 1,
        "unicode-range": `unicodeRange`,
        unitsPerEm: 1,
        "units-per-em": `unitsPerEm`,
        unselectable: 0,
        vAlphabetic: 1,
        "v-alphabetic": `vAlphabetic`,
        values: 0,
        vectorEffect: 1,
        "vector-effect": `vectorEffect`,
        version: 0,
        vertAdvY: 1,
        "vert-adv-y": `vertAdvY`,
        vertOriginX: 1,
        "vert-origin-x": `vertOriginX`,
        vertOriginY: 1,
        "vert-origin-y": `vertOriginY`,
        vHanging: 1,
        "v-hanging": `vHanging`,
        vIdeographic: 1,
        "v-ideographic": `vIdeographic`,
        viewBox: 1,
        viewTarget: 1,
        visibility: 0,
        vMathematical: 1,
        "v-mathematical": `vMathematical`,
        vocab: 0,
        widths: 0,
        wordSpacing: 1,
        "word-spacing": `wordSpacing`,
        writingMode: 1,
        "writing-mode": `writingMode`,
        x1: 0,
        x2: 0,
        x: 0,
        xChannelSelector: 1,
        xHeight: 1,
        "x-height": `xHeight`,
        xlinkActuate: 1,
        "xlink:actuate": `xlinkActuate`,
        xlinkArcrole: 1,
        "xlink:arcrole": `xlinkArcrole`,
        xlinkHref: 1,
        "xlink:href": `xlinkHref`,
        xlinkRole: 1,
        "xlink:role": `xlinkRole`,
        xlinkShow: 1,
        "xlink:show": `xlinkShow`,
        xlinkTitle: 1,
        "xlink:title": `xlinkTitle`,
        xlinkType: 1,
        "xlink:type": `xlinkType`,
        xmlBase: 1,
        "xml:base": `xmlBase`,
        xmlLang: 1,
        "xml:lang": `xmlLang`,
        xmlns: 0,
        "xml:space": `xmlSpace`,
        xmlnsXlink: 1,
        "xmlns:xlink": `xmlnsXlink`,
        xmlSpace: 1,
        y1: 0,
        y2: 0,
        y: 0,
        yChannelSelector: 1,
        z: 0,
        zoomAndPan: 1,
      }));
  }),
  m = i((e) => {
    var t = 0,
      n = 1,
      r = 2,
      i = 3,
      a = 4,
      o = 5,
      s = 6;
    function c(e) {
      return u.hasOwnProperty(e) ? u[e] : null;
    }
    function l(e, t, n, o, s, c, l) {
      ((this.acceptsBooleans = t === r || t === i || t === a),
        (this.attributeName = o),
        (this.attributeNamespace = s),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = c),
        (this.removeEmptyString = l));
    }
    var u = {};
    ([
      `children`,
      `dangerouslySetInnerHTML`,
      `defaultValue`,
      `defaultChecked`,
      `innerHTML`,
      `suppressContentEditableWarning`,
      `suppressHydrationWarning`,
      `style`,
    ].forEach((e) => {
      u[e] = new l(e, t, !1, e, null, !1, !1);
    }),
      [
        [`acceptCharset`, `accept-charset`],
        [`className`, `class`],
        [`htmlFor`, `for`],
        [`httpEquiv`, `http-equiv`],
      ].forEach(([e, t]) => {
        u[e] = new l(e, n, !1, t, null, !1, !1);
      }),
      [`contentEditable`, `draggable`, `spellCheck`, `value`].forEach((e) => {
        u[e] = new l(e, r, !1, e.toLowerCase(), null, !1, !1);
      }),
      [
        `autoReverse`,
        `externalResourcesRequired`,
        `focusable`,
        `preserveAlpha`,
      ].forEach((e) => {
        u[e] = new l(e, r, !1, e, null, !1, !1);
      }),
      [
        `allowFullScreen`,
        `async`,
        `autoFocus`,
        `autoPlay`,
        `controls`,
        `default`,
        `defer`,
        `disabled`,
        `disablePictureInPicture`,
        `disableRemotePlayback`,
        `formNoValidate`,
        `hidden`,
        `loop`,
        `noModule`,
        `noValidate`,
        `open`,
        `playsInline`,
        `readOnly`,
        `required`,
        `reversed`,
        `scoped`,
        `seamless`,
        `itemScope`,
      ].forEach((e) => {
        u[e] = new l(e, i, !1, e.toLowerCase(), null, !1, !1);
      }),
      [`checked`, `multiple`, `muted`, `selected`].forEach((e) => {
        u[e] = new l(e, i, !0, e, null, !1, !1);
      }),
      [`capture`, `download`].forEach((e) => {
        u[e] = new l(e, a, !1, e, null, !1, !1);
      }),
      [`cols`, `rows`, `size`, `span`].forEach((e) => {
        u[e] = new l(e, s, !1, e, null, !1, !1);
      }),
      [`rowSpan`, `start`].forEach((e) => {
        u[e] = new l(e, o, !1, e.toLowerCase(), null, !1, !1);
      }));
    var d = /[\-\:]([a-z])/g,
      f = (e) => e[1].toUpperCase();
    (`accent-height.alignment-baseline.arabic-form.baseline-shift.cap-height.clip-path.clip-rule.color-interpolation.color-interpolation-filters.color-profile.color-rendering.dominant-baseline.enable-background.fill-opacity.fill-rule.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.glyph-name.glyph-orientation-horizontal.glyph-orientation-vertical.horiz-adv-x.horiz-origin-x.image-rendering.letter-spacing.lighting-color.marker-end.marker-mid.marker-start.overline-position.overline-thickness.paint-order.panose-1.pointer-events.rendering-intent.shape-rendering.stop-color.stop-opacity.strikethrough-position.strikethrough-thickness.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke-width.text-anchor.text-decoration.text-rendering.underline-position.underline-thickness.unicode-bidi.unicode-range.units-per-em.v-alphabetic.v-hanging.v-ideographic.v-mathematical.vector-effect.vert-adv-y.vert-origin-x.vert-origin-y.word-spacing.writing-mode.xmlns:xlink.x-height`
      .split(`.`)
      .forEach((e) => {
        let t = e.replace(d, f);
        u[t] = new l(t, n, !1, e, null, !1, !1);
      }),
      [
        `xlink:actuate`,
        `xlink:arcrole`,
        `xlink:role`,
        `xlink:show`,
        `xlink:title`,
        `xlink:type`,
      ].forEach((e) => {
        let t = e.replace(d, f);
        u[t] = new l(t, n, !1, e, `http://www.w3.org/1999/xlink`, !1, !1);
      }),
      [`xml:base`, `xml:lang`, `xml:space`].forEach((e) => {
        let t = e.replace(d, f);
        u[t] = new l(
          t,
          n,
          !1,
          e,
          `http://www.w3.org/XML/1998/namespace`,
          !1,
          !1,
        );
      }),
      [`tabIndex`, `crossOrigin`].forEach((e) => {
        u[e] = new l(e, n, !1, e.toLowerCase(), null, !1, !1);
      }));
    var m = `xlinkHref`;
    ((u[m] = new l(
      `xlinkHref`,
      n,
      !1,
      `xlink:href`,
      `http://www.w3.org/1999/xlink`,
      !0,
      !1,
    )),
      [`src`, `href`, `action`, `formAction`].forEach((e) => {
        u[e] = new l(e, n, !1, e.toLowerCase(), null, !0, !0);
      }));
    var { CAMELCASE: h, SAME: g, possibleStandardNames: _ } = p(),
      v = RegExp.prototype.test.bind(
        RegExp(
          `^(data|aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`,
        ),
      ),
      y = Object.keys(_).reduce((e, t) => {
        let n = _[t];
        return (
          n === g
            ? (e[t] = t)
            : n === h
              ? (e[t.toLowerCase()] = t)
              : (e[t] = n),
          e
        );
      }, {});
    ((e.BOOLEAN = i),
      (e.BOOLEANISH_STRING = r),
      (e.NUMERIC = o),
      (e.OVERLOADED_BOOLEAN = a),
      (e.POSITIVE_NUMERIC = s),
      (e.RESERVED = t),
      (e.STRING = n),
      (e.getPropertyInfo = c),
      (e.isCustomAttribute = v),
      (e.possibleStandardNames = y));
  }),
  h = i((e, t) => {
    var n = /\/\*(?:[^*]|\*(?!\/))*\*\//g,
      r = /\n/g,
      i = /^\s*/,
      a = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
      o = /^:\s*/,
      s =
        /^((?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|url\((?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|[^)]*)\)|[^};])+)/,
      c = /^[;\s]*/;
    function l(e, t) {
      if (typeof e != `string`)
        throw TypeError(`First argument must be a string`);
      if (!e) return [];
      t ||= {};
      var l = 1,
        u = 1;
      function d(e) {
        var t = e.match(r);
        t && (l += t.length);
        var n = e.lastIndexOf(`
`);
        u = ~n ? e.length - n : u + e.length;
      }
      function f() {
        var e = { line: l, column: u };
        return function (t) {
          return ((t.position = new p(e)), g(), t);
        };
      }
      function p(e) {
        ((this.start = e),
          (this.end = { line: l, column: u }),
          (this.source = t.source));
      }
      p.prototype.content = e;
      function m(n) {
        var r = Error(t.source + `:` + l + `:` + u + `: ` + n);
        if (
          ((r.reason = n),
          (r.filename = t.source),
          (r.line = l),
          (r.column = u),
          (r.source = e),
          !t.silent)
        )
          throw r;
      }
      function h(t) {
        var n = t.exec(e);
        if (n) {
          var r = n[0];
          return (d(r), (e = e.slice(r.length)), n);
        }
      }
      function g() {
        h(i);
      }
      function _(e) {
        for (var t; (t = v());) e.push(t);
        return e;
      }
      function v() {
        var t = f();
        if (e.charAt(0) == `/` && e.charAt(1) == `*`) {
          for (
            var n = 2;
            e.charAt(n) != `` && (e.charAt(n) != `*` || e.charAt(n + 1) != `/`);
          )
            ++n;
          if (((n += 2), e.charAt(n - 1) === ``))
            return m(`End of comment missing`);
          var r = e.slice(2, n - 2);
          return (
            (u += 2),
            d(r),
            (e = e.slice(n)),
            (u += 2),
            t({ type: `comment`, comment: r })
          );
        }
      }
      function y() {
        var e = f(),
          t = h(a);
        if (t) {
          if ((v(), !h(o))) return m(`property missing ':'`);
          var r = h(s),
            i = e({
              type: `declaration`,
              property: t[0].replace(n, ``).trim(),
              value: r ? r[0].replace(n, ``).trim() : ``,
            });
          return (h(c), i);
        }
      }
      function b() {
        var e = [];
        _(e);
        for (var t; (t = y());) (e.push(t), _(e));
        return e;
      }
      return (g(), b());
    }
    t.exports = l;
  }),
  g = i((e, t) => {
    var n = Object.create,
      r = Object.defineProperty,
      i = Object.getOwnPropertyDescriptor,
      a = Object.getOwnPropertyNames,
      o = Object.getPrototypeOf,
      s = Object.prototype.hasOwnProperty,
      c = (e, t, n, o) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (var c = a(t), l = 0, u = c.length, d; l < u; l++)
            ((d = c[l]),
              !s.call(e, d) &&
                d !== n &&
                r(e, d, {
                  get: ((e) => t[e]).bind(null, d),
                  enumerable: !(o = i(t, d)) || o.enumerable,
                }));
        return e;
      },
      l = (e, t, i) => (
        (i = e == null ? {} : n(o(e))),
        c(
          t || !e || !e.__esModule
            ? r(i, `default`, { value: e, enumerable: !0 })
            : i,
          e,
        )
      ),
      u = h();
    u = l(u);
    function d(e, t) {
      let n = null;
      if (!e || typeof e != `string`) return n;
      let r = (0, u.default)(e),
        i = typeof t == `function`;
      return (
        r.forEach((e) => {
          if (e.type !== `declaration`) return;
          let { property: r, value: a } = e;
          i ? t(r, a, e) : a && ((n ??= {}), (n[r] = a));
        }),
        n
      );
    }
    t.exports = d;
  }),
  _ = i((e, t) => {
    var n = Object.create,
      r = Object.defineProperty,
      i = Object.getOwnPropertyDescriptor,
      a = Object.getOwnPropertyNames,
      o = Object.getPrototypeOf,
      s = Object.prototype.hasOwnProperty,
      c = (e, t, n, o) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (var c = a(t), l = 0, u = c.length, d; l < u; l++)
            ((d = c[l]),
              !s.call(e, d) &&
                d !== n &&
                r(e, d, {
                  get: ((e) => t[e]).bind(null, d),
                  enumerable: !(o = i(t, d)) || o.enumerable,
                }));
        return e;
      },
      l = (e, t, i) => (
        (i = e == null ? {} : n(o(e))),
        c(
          t || !e || !e.__esModule
            ? r(i, `default`, { value: e, enumerable: !0 })
            : i,
          e,
        )
      ),
      u = g();
    u = l(u);
    var d = /^--[a-zA-Z0-9_-]+$/,
      f = /-([a-z])/g,
      p = /^[^-]+$/,
      m = /^-(webkit|moz|ms|o|khtml)-/,
      h = /^-(ms)-/,
      _ = (e) => !e || p.test(e) || d.test(e),
      v = (e, t) => t.toUpperCase(),
      y = (e, t) => `${t}-`,
      b = (e, t = {}) =>
        _(e)
          ? e
          : ((e = e.toLowerCase()),
            (e = t.reactCompat ? e.replace(h, y) : e.replace(m, y)),
            e.replace(f, v));
    function x(e, t) {
      let n = {};
      return (
        !e ||
          typeof e != `string` ||
          (0, u.default)(e, (e, r) => {
            e && r && (n[b(e, t)] = r);
          }),
        n
      );
    }
    t.exports = x;
  }),
  v = i((e) => {
    var t =
      (e && e.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.returnFirstArg =
        e.canTextBeChildOfNode =
        e.ELEMENTS_WITH_NO_TEXT_CHILDREN =
        e.PRESERVE_CUSTOM_ATTRIBUTES =
          void 0),
      (e.isCustomComponent = o),
      (e.setStyleProp = c));
    var n = a(),
      r = t(_()),
      i = new Set([
        `annotation-xml`,
        `color-profile`,
        `font-face`,
        `font-face-src`,
        `font-face-uri`,
        `font-face-format`,
        `font-face-name`,
        `missing-glyph`,
      ]);
    function o(e, t) {
      return e.includes(`-`) ? !i.has(e) : !!(t && typeof t.is == `string`);
    }
    var s = { reactCompat: !0 };
    function c(e, t) {
      if (typeof e == `string`) {
        if (!e.trim()) {
          t.style = {};
          return;
        }
        try {
          t.style = (0, r.default)(e, s);
        } catch {
          t.style = {};
        }
      }
    }
    ((e.PRESERVE_CUSTOM_ATTRIBUTES = Number(n.version.split(`.`)[0]) >= 16),
      (e.ELEMENTS_WITH_NO_TEXT_CHILDREN = new Set([
        `tr`,
        `tbody`,
        `thead`,
        `tfoot`,
        `colgroup`,
        `table`,
        `head`,
        `html`,
        `frameset`,
      ])),
      (e.canTextBeChildOfNode = (t) =>
        !e.ELEMENTS_WITH_NO_TEXT_CHILDREN.has(t.name)),
      (e.returnFirstArg = (e) => e));
  }),
  y = i((e) => {
    (Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = o));
    var t = m(),
      n = v(),
      r = [`checked`, `value`],
      i = [`input`, `select`, `textarea`],
      a = { reset: !0, submit: !0 };
    function o(e = {}, o) {
      let c = {},
        l = !!(e.type && a[e.type]);
      for (let a in e) {
        let u = e[a];
        if ((0, t.isCustomAttribute)(a)) {
          c[a] = u;
          continue;
        }
        let d = a.toLowerCase(),
          f = s(d);
        if (f) {
          let e = (0, t.getPropertyInfo)(f);
          switch (
            (r.includes(f) && i.includes(o) && !l && (f = s(`default` + d)),
            (c[f] = u),
            e?.type)
          ) {
            case t.BOOLEAN:
              c[f] = !0;
              break;
            case t.OVERLOADED_BOOLEAN:
              u === `` && (c[f] = !0);
          }
          continue;
        }
        n.PRESERVE_CUSTOM_ATTRIBUTES && (c[a] = u);
      }
      return ((0, n.setStyleProp)(e.style, c), c);
    }
    function s(e) {
      return t.possibleStandardNames[e];
    }
  });
function b(e) {
  return e.type === x.Tag || e.type === x.Script || e.type === x.Style;
}
var x,
  S = e(() => {
    ((function (e) {
      ((e.Root = `root`),
        (e.Text = `text`),
        (e.Directive = `directive`),
        (e.Comment = `comment`),
        (e.Script = `script`),
        (e.Style = `style`),
        (e.Tag = `tag`),
        (e.CDATA = `cdata`),
        (e.Doctype = `doctype`));
    })((x ||= {})),
      x.Root,
      x.Text,
      x.Directive,
      x.Comment,
      x.Script,
      x.Style,
      x.Tag,
      x.CDATA,
      x.Doctype);
  });
function C(e) {
  return b(e);
}
function w(e) {
  return e.type === x.CDATA;
}
function T(e) {
  return e.type === x.Text;
}
function E(e) {
  return e.type === x.Comment;
}
function D(e) {
  return e.type === x.Directive;
}
function O(e) {
  return e.type === x.Root;
}
function k(e) {
  return Object.hasOwn(e, `children`);
}
function A(e, t = !1) {
  let n;
  if (T(e)) n = new P(e.data);
  else if (E(e)) n = new F(e.data);
  else if (C(e)) {
    let r = t ? j(e.children) : [],
      i = new B(e.name, { ...e.attribs }, r);
    for (let e of r) e.parent = i;
    (e.namespace != null && (i.namespace = e.namespace),
      e[`x-attribsNamespace`] &&
        (i[`x-attribsNamespace`] = { ...e[`x-attribsNamespace`] }),
      e[`x-attribsPrefix`] &&
        (i[`x-attribsPrefix`] = { ...e[`x-attribsPrefix`] }),
      (n = i));
  } else if (w(e)) {
    let r = t ? j(e.children) : [],
      i = new R(r);
    for (let e of r) e.parent = i;
    n = i;
  } else if (O(e)) {
    let r = t ? j(e.children) : [],
      i = new z(r);
    for (let e of r) e.parent = i;
    (e[`x-mode`] && (i[`x-mode`] = e[`x-mode`]), (n = i));
  } else if (D(e)) {
    let t = new I(e.name, e.data);
    (e[`x-name`] != null &&
      ((t[`x-name`] = e[`x-name`]),
      (t[`x-publicId`] = e[`x-publicId`]),
      (t[`x-systemId`] = e[`x-systemId`])),
      (n = t));
  } else throw Error(`Not implemented yet: ${e.type}`);
  return (
    (n.startIndex = e.startIndex),
    (n.endIndex = e.endIndex),
    e.sourceCodeLocation != null &&
      (n.sourceCodeLocation = e.sourceCodeLocation),
    n
  );
}
function j(e) {
  let t = e.map((e) => A(e, !0));
  for (let e = 1; e < t.length; e++)
    ((t[e].prev = t[e - 1]), (t[e - 1].next = t[e]));
  return t;
}
var M,
  N,
  P,
  F,
  I,
  L,
  R,
  z,
  B,
  V = e(() => {
    (S(),
      (M = class {
        parent = null;
        prev = null;
        next = null;
        startIndex = null;
        endIndex = null;
        get parentNode() {
          return this.parent;
        }
        set parentNode(e) {
          this.parent = e;
        }
        get previousSibling() {
          return this.prev;
        }
        set previousSibling(e) {
          this.prev = e;
        }
        get nextSibling() {
          return this.next;
        }
        set nextSibling(e) {
          this.next = e;
        }
        cloneNode(e = !1) {
          return A(this, e);
        }
      }),
      (N = class extends M {
        data;
        constructor(e) {
          (super(), (this.data = e));
        }
        get nodeValue() {
          return this.data;
        }
        set nodeValue(e) {
          this.data = e;
        }
      }),
      (P = class extends N {
        type = x.Text;
        get nodeType() {
          return 3;
        }
      }),
      (F = class extends N {
        type = x.Comment;
        get nodeType() {
          return 8;
        }
      }),
      (I = class extends N {
        type = x.Directive;
        name;
        constructor(e, t) {
          (super(t), (this.name = e));
        }
        get nodeType() {
          return 1;
        }
        "x-name";
        "x-publicId";
        "x-systemId";
      }),
      (L = class extends M {
        children;
        constructor(e) {
          (super(), (this.children = e));
        }
        get firstChild() {
          return this.children[0] ?? null;
        }
        get lastChild() {
          return this.children.length > 0
            ? this.children[this.children.length - 1]
            : null;
        }
        get childNodes() {
          return this.children;
        }
        set childNodes(e) {
          this.children = e;
        }
      }),
      (R = class extends L {
        type = x.CDATA;
        get nodeType() {
          return 4;
        }
      }),
      (z = class extends L {
        type = x.Root;
        get nodeType() {
          return 9;
        }
      }),
      (B = class extends L {
        name;
        attribs;
        type;
        constructor(
          e,
          t,
          n = [],
          r = e === `script` ? x.Script : e === `style` ? x.Style : x.Tag,
        ) {
          (super(n), (this.name = e), (this.attribs = t), (this.type = r));
        }
        get nodeType() {
          return 1;
        }
        get tagName() {
          return this.name;
        }
        set tagName(e) {
          this.name = e;
        }
        get attributes() {
          return Object.keys(this.attribs).map((e) => ({
            name: e,
            value: this.attribs[e],
            namespace: this[`x-attribsNamespace`]?.[e],
            prefix: this[`x-attribsPrefix`]?.[e],
          }));
        }
        namespace;
        "x-attribsNamespace";
        "x-attribsPrefix";
      }));
  }),
  ee = n({
    CDATA: () => R,
    Comment: () => F,
    DataNode: () => N,
    Document: () => z,
    DomHandler: () => te,
    Element: () => B,
    Node: () => M,
    NodeWithChildren: () => L,
    ProcessingInstruction: () => I,
    Text: () => P,
    cloneNode: () => A,
    default: () => te,
    hasChildren: () => k,
    isCDATA: () => w,
    isComment: () => E,
    isDirective: () => D,
    isDocument: () => O,
    isTag: () => C,
    isText: () => T,
  }),
  H,
  te,
  ne = e(() => {
    (S(),
      V(),
      V(),
      (H = { withStartIndices: !1, withEndIndices: !1, xmlMode: !1 }),
      (te = class {
        dom = [];
        root = new z(this.dom);
        callback;
        options;
        elementCB;
        done = !1;
        tagStack = [this.root];
        lastNode = null;
        parser = null;
        constructor(e, t, n) {
          (typeof t == `function` && ((n = t), (t = H)),
            typeof e == `object` && ((t = e), (e = void 0)),
            (this.callback = e ?? null),
            (this.options = t ?? H),
            (this.elementCB = n ?? null));
        }
        onparserinit(e) {
          this.parser = e;
        }
        onreset() {
          ((this.dom = []),
            (this.root = new z(this.dom)),
            (this.done = !1),
            (this.tagStack = [this.root]),
            (this.lastNode = null),
            (this.parser = null));
        }
        onend() {
          this.done ||
            ((this.done = !0), (this.parser = null), this.handleCallback(null));
        }
        onerror(e) {
          this.handleCallback(e);
        }
        onclosetag() {
          this.lastNode = null;
          let e = this.tagStack.pop();
          (this.options.withEndIndices &&
            this.parser &&
            (e.endIndex = this.parser.endIndex),
            this.elementCB && this.elementCB(e));
        }
        onopentag(e, t) {
          let n = this.options.xmlMode ? x.Tag : void 0,
            r = new B(e, t, void 0, n);
          (this.addNode(r), this.tagStack.push(r));
        }
        ontext(e) {
          let { lastNode: t } = this;
          if (t && t.type === x.Text)
            ((t.data += e),
              this.options.withEndIndices &&
                this.parser &&
                (t.endIndex = this.parser.endIndex));
          else {
            let t = new P(e);
            (this.addNode(t), (this.lastNode = t));
          }
        }
        oncomment(e) {
          if (this.lastNode && this.lastNode.type === x.Comment) {
            this.lastNode.data += e;
            return;
          }
          let t = new F(e);
          (this.addNode(t), (this.lastNode = t));
        }
        oncommentend() {
          this.lastNode = null;
        }
        oncdatastart() {
          let e = new P(``),
            t = new R([e]);
          (this.addNode(t), (e.parent = t), (this.lastNode = e));
        }
        oncdataend() {
          this.lastNode = null;
        }
        onprocessinginstruction(e, t) {
          let n = new I(e, t);
          this.addNode(n);
        }
        handleCallback(e) {
          if (typeof this.callback == `function`) this.callback(e, this.dom);
          else if (e) throw e;
        }
        addNode(e) {
          let t = this.tagStack[this.tagStack.length - 1],
            n = t.children[t.children.length - 1];
          (this.options.withStartIndices &&
            this.parser &&
            (e.startIndex = this.parser.startIndex),
            this.options.withEndIndices &&
              this.parser &&
              (e.endIndex = this.parser.endIndex),
            t.children.push(e),
            n && ((e.prev = n), (n.next = e)),
            (e.parent = t),
            (this.lastNode = null));
        }
      }));
  }),
  re = i((e) => {
    var n =
      (e && e.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
    (Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = l));
    var r = (ne(), t(ee)),
      i = a(),
      o = n(y()),
      s = v(),
      c = {
        cloneElement: i.cloneElement,
        createElement: i.createElement,
        isValidElement: i.isValidElement,
      };
    function l(e, t = {}) {
      let n = [],
        r = typeof t.replace == `function`,
        i = t.transform ?? s.returnFirstArg,
        {
          cloneElement: a,
          createElement: f,
          isValidElement: p,
        } = t.library ?? c,
        m = e.length;
      u(e);
      for (let c = 0; c < m; c++) {
        let u = e[c];
        if (r) {
          let e = t.replace?.call(t, u, c);
          if (p(e)) {
            (m > 1 && (e = a(e, { key: e.key ?? c })), n.push(i(e, u, c)));
            continue;
          }
        }
        if (u.type === `text`) {
          let e = !u.data.trim().length;
          if (
            (e && u.parent && !(0, s.canTextBeChildOfNode)(u.parent)) ||
            (t.trim && e)
          )
            continue;
          n.push(i(u.data, u, c));
          continue;
        }
        let h = u,
          g = {};
        d(h)
          ? ((0, s.setStyleProp)(h.attribs.style, h.attribs), (g = h.attribs))
          : h.attribs && (g = (0, o.default)(h.attribs, h.name));
        let _;
        switch (u.type) {
          case `script`:
          case `style`:
            u.children[0] &&
              (g.dangerouslySetInnerHTML = { __html: u.children[0].data });
            break;
          case `tag`:
            u.name === `textarea` && u.children[0]
              ? (g.defaultValue = u.children[0].data)
              : u.children?.length && (_ = l(u.children, t));
            break;
          default:
            continue;
        }
        (m > 1 && (g.key = c), n.push(i(f(u.name, g, _), u, c)));
      }
      return n.length === 1 ? n[0] : n;
    }
    function u(e) {
      for (let t of e)
        switch (t.type) {
          case `tag`:
          case `script`:
          case `style`:
            (Object.setPrototypeOf(t, r.Element.prototype), u(t.children));
            break;
          case `text`:
            Object.setPrototypeOf(t, r.Text.prototype);
            break;
          case `comment`:
            Object.setPrototypeOf(t, r.Comment.prototype);
        }
    }
    function d(e) {
      return (
        s.PRESERVE_CUSTOM_ATTRIBUTES &&
        e.type === `tag` &&
        (0, s.isCustomComponent)(e.name, e.attribs)
      );
    }
  }),
  ie = r(
    i((e) => {
      var n =
        (e && e.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.htmlToDOM =
          e.domToReact =
          e.attributesToProps =
          e.Text =
          e.ProcessingInstruction =
          e.Element =
          e.Comment =
            void 0),
        (e.default = s));
      var r = n(f());
      ((e.htmlToDOM = r.default), (e.attributesToProps = n(y()).default));
      var i = n(re());
      e.domToReact = i.default;
      var a = (ne(), t(ee));
      (Object.defineProperty(e, "Comment", {
        enumerable: !0,
        get: function () {
          return a.Comment;
        },
      }),
        Object.defineProperty(e, "Element", {
          enumerable: !0,
          get: function () {
            return a.Element;
          },
        }),
        Object.defineProperty(e, "ProcessingInstruction", {
          enumerable: !0,
          get: function () {
            return a.ProcessingInstruction;
          },
        }),
        Object.defineProperty(e, "Text", {
          enumerable: !0,
          get: function () {
            return a.Text;
          },
        }));
      var o = { lowerCaseAttributeNames: !1 };
      function s(e, t) {
        if (typeof e != `string`)
          throw TypeError(`First argument must be a string`);
        if (!e) return [];
        let n = Object.assign(Object.assign({}, t?.htmlparser2 ?? o), {
          trustedTypePolicy: t?.trustedTypePolicy,
        });
        return (0, i.default)((0, r.default)(e, n), t);
      }
    })(),
    1,
  ),
  ae = ie.default.default || ie.default,
  U = r(a(), 1),
  oe = {
    width: 1720,
    height: 1080,
    count: 24,
    resolution: 81,
    spacing: 4.9,
    amplitude: 163,
    frequency: 0.75,
    phase: 0.14,
    twist: 0.41,
    bulge: 0.66,
    morph: 0.5,
    speed: 1,
    anim: `spin`,
    strokeWidth: 1,
    opacity: 1,
    gradientStart: `#18e299`,
    gradientEnd: `#baff24`,
    background: `#ffffff`,
    particlesOn: !0,
    particleColors: [`#d87cff`, `#ffa723`, `#44aeff`, `#ffa3d3`],
    particleCount: 1,
    particleSize: 3,
    particleLength: 88,
    particleFade: !0,
    particleSpeed: 1.15,
    particleCoverage: 1,
    particleRandom: !0,
    particleSparse: 0.32,
    particleVariance: 0,
    particleSeed: 2025,
    rotate: 0,
    edgeFade: 0,
  },
  se = [];
function ce(e, t, n) {
  let r = Math.max(2, n.resolution) - 1,
    i = se[e];
  (i && i.length === r + 1) ||
    ((i = Array.from({ length: r + 1 }, () => ({ x: 0, y: 0 }))), (se[e] = i));
  let a = n.height / 2,
    o = (n.rotate * Math.PI) / 180,
    s = Math.cos(o),
    c = Math.sin(o),
    l = n.width / 2;
  for (let u = 0; u <= r; u++) {
    let d = u / r,
      f = (function (e, t, n, r) {
        let i = r.count,
          a = r.phase * (e - (i - 1) / 2),
          o = r.twist,
          s = r.frequency * Math.PI * 2,
          c = 1 + r.bulge * Math.sin(t * Math.PI),
          l = 0,
          u = 0,
          d = 1,
          f = 0;
        (r.anim === `flow` && (l = 0.8 * n),
          r.anim === `morph` && (u = 0.6 * n),
          r.anim === `breathe` && (d = 1 + 0.35 * Math.sin(1.2 * n)),
          r.anim === `spin` && (f = 0.7 * n));
        let p = Math.sin(s * t + a + l),
          m = Math.sin(0.5 * s * t - 2 * a + 0.7 * l + f + (r.p2Phase ?? 0)),
          h = 0;
        return (
          r.morph > 0 &&
            (h =
              Math.sin(3.7 * t + u + 0.2 * e) *
              Math.cos(2.1 * t - 0.5 * u + 0.13 * e)),
          {
            yOffset: (p + o * m + r.morph * h) * 0.5 * c * d,
            lineOffset:
              ((i <= 1 ? 0.5 : e / (i - 1)) - 0.5) * r.count * r.spacing,
          }
        );
      })(e, d, t, n),
      p = d * n.width,
      m = a + f.lineOffset + f.yOffset * n.amplitude,
      h = i[u];
    if (h)
      if (o === 0) ((h.x = p), (h.y = m));
      else {
        let e = p - l,
          t = m - a;
        ((h.x = l + e * s - t * c), (h.y = a + e * c + t * s));
      }
  }
  return i;
}
function le(e) {
  let t = e.replace(`#`, ``);
  return (
    t.length === 3 &&
      (t = t
        .split(``)
        .map((e) => e + e)
        .join(``)),
    [
      Number.parseInt(t.slice(0, 2), 16),
      Number.parseInt(t.slice(2, 4), 16),
      Number.parseInt(t.slice(4, 6), 16),
    ]
  );
}
function ue(e, t) {
  let [n, r, i] = le(e);
  return `rgba(${n},${r},${i},${t})`;
}
var de = ``,
  fe = [],
  pe = new Map();
function W(e, t, n) {
  let r = (374761393 * e + 668265263 * t + 982451653 * n) | 0;
  return (
    (r = (r ^ (r >>> 13)) * 1274126177),
    (((r ^= r >>> 16) >>> 0) % 1e5) / 1e5
  );
}
var me = [];
function he(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1,
    i = { ...oe, ...t },
    { width: a, height: o } = i,
    s = r < 1;
  (e.clearRect(0, 0, a, o),
    i.background &&
      i.background !== `transparent` &&
      ((e.fillStyle = i.background), e.fillRect(0, 0, a, o)),
    (e.lineJoin = `round`),
    (e.lineCap = `round`));
  let c = (function (e) {
    let t = `${e.gradientStart}|${e.gradientEnd}|${e.count}|${e.opacity}`;
    if (t !== de) {
      ((de = t), (fe = []));
      for (let t = 0; t < e.count; t++) {
        let n = e.count <= 1 ? 0 : t / (e.count - 1),
          [r, i, a] = (function (e, t, n) {
            let r = le(e),
              i = le(t);
            return [
              Math.round(r[0] + (i[0] - r[0]) * n),
              Math.round(r[1] + (i[1] - r[1]) * n),
              Math.round(r[2] + (i[2] - r[2]) * n),
            ];
          })(e.gradientStart, e.gradientEnd, n);
        fe.push({
          solid: `rgb(${r},${i},${a})`,
          clear: `rgba(${r},${i},${a},0)`,
          full: `rgba(${r},${i},${a},${e.opacity})`,
        });
      }
    }
    return fe;
  })(i);
  e.lineWidth = i.strokeWidth;
  let l = (e) => Math.min(0.5, Math.max(0, e)),
    u = l(i.edgeFadeStart ?? i.edgeFade),
    d = l(i.edgeFadeEnd ?? i.edgeFade);
  for (let t = 0; t < i.count; t++) {
    let a = ce(t, n, i);
    if (a.length < 2) continue;
    let o = a[0],
      l = a[a.length - 1];
    if (!o) continue;
    let f = c[t];
    if (!f) continue;
    let p = 1;
    if (s) {
      let n = Math.min(r / (0.6 + 0.4 * W(t, 53, i.particleSeed)), 1);
      if ((p = n * n * (3 - 2 * n)) <= 0) {
        e.setLineDash([]);
        continue;
      }
      if (p < 1) {
        let t = 0;
        for (let e = 1; e < a.length; e++) {
          let n = a[e - 1],
            r = a[e];
          n && r && (t += Math.hypot(r.x - n.x, r.y - n.y));
        }
        e.setLineDash([t * p, t + 1]);
      } else e.setLineDash([]);
    }
    if ((u > 0 || d > 0) && l) {
      let t = e.createLinearGradient(o.x, o.y, l.x, l.y);
      (t.addColorStop(0, u > 0 ? f.clear : f.full),
        u > 0 && t.addColorStop(u, f.full),
        d > 0 && t.addColorStop(1 - d, f.full),
        t.addColorStop(1, d > 0 ? f.clear : f.full),
        (e.strokeStyle = t),
        (e.globalAlpha = 1));
    } else ((e.strokeStyle = f.solid), (e.globalAlpha = i.opacity));
    (e.beginPath(), e.moveTo(o.x, o.y));
    for (let t = 1; t < a.length - 1; t++) {
      let n = a[t],
        r = a[t + 1];
      n && r && e.quadraticCurveTo(n.x, n.y, (n.x + r.x) / 2, (n.y + r.y) / 2);
    }
    (l && e.lineTo(l.x, l.y), e.stroke());
  }
  if (
    (s && e.setLineDash([]), i.particlesOn && i.particleCount > 0 && r >= 1)
  ) {
    e.globalAlpha = 1;
    let t = Math.floor(i.particleCount);
    for (let r = 0; r < i.count; r++) {
      if (i.particleRandom && W(r, 7, i.particleSeed) > i.particleSparse)
        continue;
      let a = se[r];
      if (a)
        for (let o = 0; o < t; o++) {
          let t = (function (e, t, n, r) {
            let i = Math.max(
                0.8,
                3.4 / Math.max(0.15, Math.abs(r.particleSpeed)),
              ),
              a = i + 2.2,
              o = 0.18 * e,
              s = 1.8 * W(e, 17 * t + 3, r.particleSeed),
              c = (n + o - 0.9 * t - s) % a;
            if ((c < 0 && (c += a), c > i)) return null;
            let l = c / i;
            return {
              u: l * r.particleCoverage,
              fade:
                l < 0.18
                  ? l / 0.18
                  : l > 0.6799999999999999
                    ? (1 - l) / 0.32
                    : 1,
            };
          })(r, o, n, i);
          if (t == null) continue;
          let [s, c, l, u] = (function (e, t) {
              if (e.length === 0) return [0, 0, 0, 0];
              let n = e[0];
              if (e.length === 1 && n) return [n.x, n.y, 0, 0];
              let r = 0,
                i = e.length - 1;
              for (let t = 1; t < e.length; t++) {
                let n = e[t - 1],
                  i = e[t];
                if (!n || !i) {
                  me[t - 1] = 0;
                  continue;
                }
                let a = Math.hypot(i.x - n.x, i.y - n.y);
                ((me[t - 1] = a), (r += a));
              }
              if (r === 0 && n) return [n.x, n.y, 0, 0];
              let a = t * r,
                o = 0;
              for (let t = 0; t < i; t++) {
                let n = me[t] ?? 0;
                if (o + n >= a) {
                  let r = e[t],
                    i = e[t + 1];
                  if (!r || !i) break;
                  let s = n > 0 ? (a - o) / n : 0;
                  return [
                    r.x + (i.x - r.x) * s,
                    r.y + (i.y - r.y) * s,
                    i.x - r.x,
                    i.y - r.y,
                  ];
                }
                o += n;
              }
              let s = e[e.length - 1];
              return s ? [s.x, s.y, 0, 0] : [0, 0, 0, 0];
            })(a, t.u),
            d = 1;
          if (i.particleVariance > 0) {
            let e = W(r, 31 * o + 5, i.particleSeed);
            d = Math.max(
              0.1,
              1 - i.particleVariance + 2 * e * i.particleVariance,
            );
          }
          let f = (function (e, t, n) {
              let r = n.particleColors.length ? n.particleColors : [`#ffffff`];
              return (
                r[
                  Math.floor(W(e, 19 * t + 11, n.particleSeed) * r.length) %
                    r.length
                ] ?? `#ffffff`
              );
            })(r, o, i),
            p = Math.hypot(l, u) || 1,
            m = l / p,
            h = u / p,
            g = i.particleLength / 2,
            _ = s - m * g,
            v = c - h * g,
            y = s + m * g,
            b = c + h * g;
          if (((e.lineWidth = i.particleSize * d), i.particleFade)) {
            let [t, n] = (function (e) {
                let t = pe.get(e);
                return (t || ((t = [ue(e, 0), ue(e, 1)]), pe.set(e, t)), t);
              })(f),
              r = e.createLinearGradient(_, v, y, b);
            (r.addColorStop(0, t), r.addColorStop(1, n), (e.strokeStyle = r));
          } else e.strokeStyle = f;
          ((e.globalAlpha = t.fade),
            e.beginPath(),
            e.moveTo(_, v),
            e.lineTo(y, b),
            e.stroke());
        }
    }
  }
  e.globalAlpha = 1;
}
var ge = r(o(), 1);
function _e() {
  let [e, t] = (0, U.useState)(
    () => matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  );
  return (
    (0, U.useEffect)(() => {
      let e = matchMedia(`(prefers-reduced-motion: reduce)`),
        n = () => t(e.matches);
      return (
        e.addEventListener(`change`, n),
        () => e.removeEventListener(`change`, n)
      );
    }, []),
    e
  );
}
function ve({ hero: e = !1, className: t = `` }) {
  let n = (0, U.useRef)(null),
    r = _e();
  return (
    (0, U.useEffect)(() => {
      let t = n.current,
        i = t.getContext(`2d`),
        a = {
          ...oe,
          speed: 0.66,
          background: `transparent`,
          rotate: e ? -28 : 0,
          edgeFade: 0.25,
          particleSpeed: e ? 0.84 : 1.15,
        },
        o = 0,
        s = 0,
        c = !0,
        l = (e) => {
          let n = Math.max(t.width / a.width, t.height / a.height);
          (i.setTransform(
            n,
            0,
            0,
            n,
            (t.width - a.width * n) / 2,
            (t.height - a.height * n) / 2,
          ),
            he(i, a, e, 1));
        },
        u = () => {
          let e = t.getBoundingClientRect(),
            n = Math.min(devicePixelRatio, 2);
          ((t.width = e.width * n), (t.height = e.height * n), l(0));
        },
        d = (e) => {
          ((s ||= e),
            c && l(((e - s) / 1e3) * a.speed),
            (o = requestAnimationFrame(d)));
        },
        f = new ResizeObserver(u);
      f.observe(t);
      let p = new IntersectionObserver(([e]) => (c = e.isIntersecting));
      return (
        p.observe(t),
        u(),
        r || (o = requestAnimationFrame(d)),
        () => {
          (cancelAnimationFrame(o), f.disconnect(), p.disconnect());
        }
      );
    }, [e, r]),
    (0, ge.jsx)(`canvas`, { ref: n, className: t, "aria-hidden": `true` })
  );
}
var ye = {
    usePrefersReducedMotion: () =>
      U.useMemo(
        () => matchMedia(`(prefers-reduced-motion: reduce)`).matches,
        [],
      ),
  },
  be = [0, 0, 0],
  xe = [72, 76, 84],
  Se = [24, 226, 153],
  Ce = [186, 255, 36],
  we = [12, 140, 94],
  Te = [115, 158, 22];
function Ee() {
  return document.documentElement.classList.contains(`dark`);
}
function G(e, t) {
  let n = Math.imul(e, 374761393) + Math.imul(t, 668265263);
  return (
    (n = Math.imul(n ^ (n >>> 13), 1274126177)),
    ((n ^= n >>> 16) >>> 0) / 4294967295
  );
}
function K(e) {
  return e * e * (3 - 2 * e);
}
function De(e) {
  return e < 0 ? 0 : e > 1 ? 1 : e;
}
function Oe(e, t) {
  let n = Math.floor(e),
    r = Math.floor(t),
    i = K(e - n),
    a = K(t - r),
    o = G(n, r),
    s = G(n + 1, r),
    c = G(n, r + 1),
    l = G(n + 1, r + 1),
    u = o + (s - o) * i;
  return u + (c + (l - c) * i - u) * a;
}
function ke(e) {
  let {
      feather: t = 0.2,
      occludersRef: n,
      curveRef: r,
      marginClip: i = !1,
      marginClipRounded: a = !1,
      cloud: o,
    } = e,
    s = (0, U.useRef)(null),
    c = (0, ye.usePrefersReducedMotion)(),
    l = JSON.stringify([
      o?.rects ?? null,
      o?.dots ?? null,
      o?.narrowRects ?? null,
      o?.narrowBelow ?? null,
      o?.accents ?? null,
      o?.dotSize ?? null,
      o?.fill ?? null,
      o?.frame ?? null,
    ]);
  return (
    (0, U.useEffect)(() => {
      let e = s.current,
        l = e?.parentElement;
      if (!e || !l) return;
      let u = e.getContext(`2d`);
      if (!u) return;
      let d = window.devicePixelRatio || 1,
        f = !!(o?.rects || o?.dots),
        p = Ee(),
        m = 0,
        h = 0,
        g = [],
        _ = 0,
        v = !1,
        y = [],
        b = 0,
        x = (e) => {
          let n = Math.min(t * window.innerHeight, h / 2);
          return n <= 0
            ? 1
            : Math.max(
                0,
                Math.min(Math.min(1, e / n), Math.min(1, (h - e) / n)),
              );
        },
        S = (e) => {
          let n = Math.min(t * window.innerWidth, m / 2);
          return n <= 0
            ? 1
            : Math.max(
                0,
                Math.min(Math.min(1, e / n), Math.min(1, (m - e) / n)),
              );
        },
        C = (e) => {
          let t = De(m > 0 ? e / m : 0),
            n = p ? Se : we,
            r = p ? Ce : Te;
          return [
            n[0] + (r[0] - n[0]) * t,
            n[1] + (r[1] - n[1]) * t,
            n[2] + (r[2] - n[2]) * t,
          ];
        },
        w = (e, t, n) =>
          n.some(
            (n) => e >= n.left && e <= n.right && t >= n.top && t <= n.bottom,
          ),
        T = (t) => {
          (u.clearRect(0, 0, m, h), (y = y.filter((e) => t - e.time <= 600)));
          let s = (() => {
              let t = n?.current;
              if (!t?.length) return [];
              let r = e.getBoundingClientRect();
              return t.map((e) => {
                let t = e.getBoundingClientRect();
                return new DOMRect(
                  t.left - r.left,
                  t.top - r.top,
                  t.width,
                  t.height,
                );
              });
            })(),
            c = p ? xe : be,
            _ = p ? 0.9 : (o?.baseAlpha ?? 0.12),
            v = r?.current ?? null,
            b = v ? e.getBoundingClientRect() : null,
            T = v ? v.x0 * (window.innerWidth || 1) : 0,
            E = v ? Math.max(1, (v.x1 - v.x0) * (window.innerWidth || 1)) : 1,
            D = b ? b.top + window.scrollY : 0,
            O = 0,
            k = 0;
          if (i) {
            let t = e.getBoundingClientRect(),
              n = l.getBoundingClientRect();
            ((O = n.left - t.left), (k = n.right - t.left));
          }
          let A = (O + k) / 2,
            j = Math.max(1, (k - O) / 2),
            M = Math.max(1, (h / 2) * 1.1),
            N = (e, t) => Math.hypot((e - A) / j, (t - h / 2) / M);
          for (let e of g) {
            let n;
            if (i) {
              if (a) {
                if (1 >= N(e.x, e.y)) continue;
              } else if (e.x >= O && e.x <= k) continue;
            }
            if (f) {
              let t = x(e.y) * S(e.x);
              if (t <= 0) continue;
              let n = o?.dotSize ?? 2,
                r = Math.max(1 / d, Math.round(n * d) / d),
                i = Math.round((e.x - n / 2) * d) / d,
                a = Math.round((e.y - n / 2) * d) / d;
              ((u.fillStyle = `rgb(${p ? xe.join(`,`) : be.join(`,`)})`),
                (u.globalAlpha = _ * t),
                u.fillRect(i, a, r, r));
              continue;
            }
            n = i
              ? K(
                  De(
                    Math.min(
                      e.x < A ? e.x : m - e.x,
                      a ? (N(e.x, e.y) - 1) * j : e.x < O ? O - e.x : e.x - k,
                    ) / 72,
                  ),
                )
              : S(e.x);
            let r = x(e.y) * n;
            if (r <= 0 || w(e.x, e.y, s)) continue;
            if (v && b) {
              let t =
                  Math.max(0, Math.min(1, (b.left + e.x - T) / E)) *
                  (v.docY.length - 1),
                n = Math.floor(t),
                r = Math.min(v.docY.length - 1, n + 1),
                i = v.docY[n] + (v.docY[r] - v.docY[n]) * (t - n);
              if (D + e.y < i) continue;
            }
            let l = e.pulseWindows.some((e) => t >= e.startAt && t <= e.endAt),
              h = 0;
            for (let t of y) {
              let n = Math.hypot(e.x - t.x, e.y - t.y);
              if (n < 42) {
                let e = K(1 - n / 42);
                e > h && (h = e);
              }
            }
            let g = Math.max(+!!e.isGreen, +!!l, h),
              M = C(e.x),
              P = c[0] + (M[0] - c[0]) * g,
              F = c[1] + (M[1] - c[1]) * g,
              I = c[2] + (M[2] - c[2]) * g;
            ((u.fillStyle = `rgb(${P}, ${F}, ${I})`),
              (u.globalAlpha = (_ + (0.85 - _) * g) * r),
              u.fillRect(e.x - 1, e.y - 1, 2, 2));
          }
          if (f && o?.accents) {
            let e = l.getBoundingClientRect(),
              t = o?.dotSize ?? 2,
              n = Math.max(1 / d, Math.round(t * d) / d),
              r = o.frame?.width ?? e.width,
              i = o.frame?.height ?? h,
              a = e.left + (e.width - r) / 2,
              s = (h - i) / 2;
            for (let e of o.accents) {
              let o = Math.round((a + e.x * r - t / 2) * d) / d,
                c = Math.round((s + e.y * i - t / 2) * d) / d;
              ((u.globalAlpha = 1),
                (u.fillStyle = e.color),
                u.fillRect(o, c, n, n));
            }
          }
          u.globalAlpha = 1;
        },
        E = (e) => {
          for (let t of g)
            ((t.pulseWindows = t.pulseWindows.filter((t) => t.endAt >= e)),
              e >= t.nextFlipAt &&
                ((t.isGreen = 0.1 > Math.random()),
                (t.nextFlipAt = e + 2200 + 3800 * Math.random())));
          (T(e), (_ = requestAnimationFrame(E)));
        },
        D = () => {
          _ &&= (cancelAnimationFrame(_), 0);
        },
        O = () => {
          let t = l.getBoundingClientRect();
          ((m = window.innerWidth),
            (h = l.clientHeight),
            m <= 0 ||
              h <= 0 ||
              ((e.style.left = `${-t.left}px`),
              (e.style.top = `0px`),
              (e.style.width = `${m}px`),
              (e.style.height = `${h}px`),
              (e.width = m * d),
              (e.height = h * d),
              u.setTransform(d, 0, 0, d, 0, 0),
              ((e) => {
                var t, n;
                let r = [],
                  a = o?.pitch ?? 14;
                if (o?.dots) {
                  let e = l.getBoundingClientRect(),
                    t = o.frame?.width ?? e.width,
                    n = o.frame?.height ?? h,
                    i = e.left + (e.width - t) / 2,
                    a = (h - n) / 2;
                  for (let e of o.dots)
                    r.push({
                      x: i + e.x * t,
                      y: a + e.y * n,
                      isGreen: !1,
                      nextFlipAt: 1 / 0,
                      pulseWindows: [],
                    });
                  g = r;
                  return;
                }
                let s = null;
                if (o?.rects) {
                  let e = l.getBoundingClientRect();
                  s = (
                    o.narrowRects && e.width < (o.narrowBelow ?? 640)
                      ? o.narrowRects
                      : o.rects
                  ).map((t) => ({
                    x0: e.left + t.x * e.width,
                    y0: t.y * h,
                    x1: e.left + (t.x + t.w) * e.width,
                    y1: (t.y + t.h) * h,
                  }));
                }
                for (let c = a / 2; c < m; c += a)
                  for (let l = a / 2; l < h; l += a) {
                    if (s) {
                      if (
                        !s.some(
                          (e) => c >= e.x0 && c < e.x1 && l >= e.y0 && l < e.y1,
                        ) ||
                        G(Math.round(c / a), Math.round(l / a)) >
                          (o?.fill ?? 0.9)
                      )
                        continue;
                      r.push({
                        x: c,
                        y: l,
                        isGreen: !1,
                        nextFlipAt: 1 / 0,
                        pulseWindows: [],
                      });
                      continue;
                    }
                    {
                      let e = o?.scale ?? (i ? 70 : 110),
                        r = o?.threshold ?? (i ? 0.62 : 0.54);
                      if (
                        0.65 *
                          Oe(
                            (t = (i ? Math.min(c, m - c) : c) / e),
                            (n = l / e),
                          ) +
                          0.35 * Oe(2.3 * t + 11.7, 2.3 * n + 5.1) <
                        r
                      )
                        continue;
                    }
                    r.push({
                      x: c,
                      y: l,
                      isGreen: 0.1 > Math.random(),
                      nextFlipAt: e + 6e3 * Math.random(),
                      pulseWindows: [],
                    });
                  }
                g = r;
              })(performance.now()),
              T(performance.now())));
        },
        k = (t, n) => {
          let r = e.getBoundingClientRect();
          return { x: t - r.left, y: n - r.top };
        },
        A = (e) => {
          if (c || !v || f) return;
          let t = performance.now(),
            { x: n, y: r } = k(e.clientX, e.clientY);
          !(n < -42) &&
            !(n > m + 42) &&
            (r < -42 ||
              r > h + 42 ||
              (t - b >= 16 || y.length === 0
                ? (y.push({ x: n, y: r, time: t }),
                  y.length > 60 && y.shift(),
                  (b = t))
                : (y[y.length - 1] = { x: n, y: r, time: t })));
        },
        j = (t) => {
          if (
            c ||
            !v ||
            f ||
            (t.target instanceof Element &&
              t.target.closest(
                `a, button, input, select, textarea, label, [role="button"], [role="link"]`,
              ))
          )
            return;
          let n = performance.now(),
            { x: r, y: a } = k(t.clientX, t.clientY);
          if (!(r < 0) && !(r > m) && !(a < 0) && !(a > h)) {
            if (i) {
              let t = e.getBoundingClientRect(),
                n = l.getBoundingClientRect();
              if (r >= n.left - t.left && r <= n.right - t.left) return;
            }
            for (let e of g) {
              let t = n + 1.4 * Math.hypot(e.x - r, e.y - a);
              (e.pulseWindows.push({ startAt: t, endAt: t + 160 }),
                e.pulseWindows.length > 8 && e.pulseWindows.shift());
            }
          }
        };
      O();
      let M = new ResizeObserver(() => O());
      M.observe(l);
      let N = new IntersectionObserver(
        (e) => {
          let [t] = e;
          (v = t.isIntersecting)
            ? _ || c || !v || f || (_ = requestAnimationFrame(E))
            : D();
        },
        { rootMargin: `20% 0px` },
      );
      N.observe(e);
      let P = new MutationObserver(() => {
        ((p = Ee()), T(performance.now()));
      });
      return (
        P.observe(document.documentElement, {
          attributes: !0,
          attributeFilter: [`class`],
        }),
        window.addEventListener(`pointermove`, A, { passive: !0 }),
        window.addEventListener(`click`, j),
        window.addEventListener(`resize`, O),
        () => {
          (D(),
            M.disconnect(),
            N.disconnect(),
            P.disconnect(),
            window.removeEventListener(`pointermove`, A),
            window.removeEventListener(`click`, j),
            window.removeEventListener(`resize`, O));
        }
      );
    }, [t, n, r, i, a, c, o?.pitch, o?.scale, o?.threshold, o?.baseAlpha, l]),
    (0, ge.jsx)(`canvas`, {
      ref: s,
      "aria-hidden": !0,
      className: `pointer-events-none absolute left-0 top-0 -z-10`,
    })
  );
}
var q;
(function (e) {
  ((e.VALUE_ONLY = `value_only`), (e.OBJECT = `object`));
})((q ||= {}));
var Ae;
(function (e) {
  ((e.CHANGED_ONLY = `changed_only`), (e.ALL = `all`));
})((Ae ||= {}));
var je = class {
  _observedElements = new Set();
  _cachedValues = new WeakMap();
  constructor(e, t = { properties: [] }) {
    ((this._callback = e),
      (this._observedVariables = t.properties),
      (this._notificationMode = t.notificationMode ?? Ae.CHANGED_ONLY),
      (this._returnFormat = t.returnFormat ?? q.OBJECT));
  }
  observe(e) {
    this._observedElements.has(e) ||
      (this._observedElements.add(e),
      this._cachedValues.set(e, {}),
      this._setTargetElementStyles(e),
      e.addEventListener(`transitionrun`, this._eventHandler),
      this._handleUpdate(e));
  }
  unobserve(e) {
    let t;
    ((t = e
      ? this._observedElements.has(e)
        ? new Set([e])
        : new Set()
      : this._observedElements),
      t.size &&
        t.forEach((e) => {
          (this._unsetTargetElementStyles(e),
            e.removeEventListener(`transitionrun`, this._eventHandler),
            this._observedElements.delete(e),
            this._cachedValues.delete(e));
        }));
  }
  _observedVariables;
  _callback;
  _eventHandler = this._handleUpdate.bind(this);
  _notificationMode;
  _returnFormat;
  _setTargetElementStyles(e) {
    let t = this._observedVariables
      .map((e) => `${e} 0.001ms step-start`)
      .join(`, `);
    (e.style.setProperty(`transition`, t),
      e.style.setProperty(`transition-behavior`, `allow-discrete`));
  }
  _unsetTargetElementStyles(e) {
    (e.style.removeProperty(`transition`),
      e.style.removeProperty(`transition-behavior`));
  }
  _processComputedStyle(e, t) {
    let n = {},
      r = this._cachedValues.get(t) ?? {};
    return (
      this._observedVariables.forEach((i) => {
        let a = e.getPropertyValue(i),
          o = r[i],
          s = a !== o;
        (this._notificationMode === Ae.ALL || s) &&
          ((n[i] = { value: a, previousValue: o, changed: s, element: t }),
          (r[i] = a));
      }),
      n
    );
  }
  _getFormatter(e) {
    switch (e) {
      case q.OBJECT:
        return (e) => e;
      case q.VALUE_ONLY:
      default:
        return (e) => {
          let t = {};
          return (
            Object.keys(e).forEach((n) => {
              t[n] = e[n].value;
            }),
            t
          );
        };
    }
  }
  _handleUpdate(e) {
    let t = e instanceof HTMLElement ? e : e.target;
    if (this._observedElements.has(t)) {
      let e = getComputedStyle(t),
        n = this._processComputedStyle(e, t);
      if (Object.keys(n).length === 0) return;
      let r = this._getFormatter(this._returnFormat);
      this._callback(r(n));
    }
  }
};
function Me() {
  return {
    scroller: null,
    end: 300,
    isDragging: !1,
    scrollerScrollWidth: 300,
    scrollerWidth: 300,
    scrollerScrollHeight: 300,
    scrollerHeight: 300,
    padding: { start: 0, end: 0 },
    scrollPadding: { start: 0, end: 0 },
    slidePositions: [],
    hasSnap: !1,
    snapMandatory: !1,
    snapPositions: [],
    activeSnapPosition: { target: null, x: 0, y: 0 },
    dir: 1,
  };
}
function Ne(e, t, n) {
  return (1 - n) * e + n * t;
}
function J(e, t, n, r) {
  return Ne(e, t, 1 - Math.exp(Math.log(1 - n) * (r / (1e3 / 60))));
}
function Pe(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Fe(e, t = 0) {
  let n = 10 ** t;
  return Math.round(e * n) / n;
}
function Ie(e, t, n) {
  return e + t / (1 - n);
}
function Y(e, t) {
  let n = parseFloat(t);
  if (!isNaN(n) && !t.includes(`calc`)) return n;
  if (t === `auto` || t === `normal` || !t) return 0;
  let r = document.createElement(`div`);
  ((r.style.position = `absolute`),
    (r.style.visibility = `hidden`),
    (r.style.width = `${e.clientWidth}px`));
  let i = document.createElement(`div`);
  ((i.style.width = t), r.appendChild(i), document.body.appendChild(r));
  let a = i.getBoundingClientRect().width;
  return (r.remove(), a);
}
var X = 0.72,
  Le = 0.12,
  Z = (e, t, n) => {
    let r = n
      ? new CustomEvent(t, { bubbles: !0, cancelable: !0, detail: n })
      : new Event(t, { bubbles: !0, cancelable: !0 });
    return (e?.dispatchEvent(r), r);
  },
  Re = (e, t) => Z(e, `overscroll`, t),
  ze = (e) => Z(e, `scrollend`),
  Be = (e, t) => Z(e, `scrollsnapchange`, t),
  Ve = (e, t) => Z(e, `scrollsnapchanging`, t);
function He(e) {
  for (let { el: t, value: n, priority: r } of e)
    n
      ? t.style.setProperty(`position`, n, r)
      : t.style.removeProperty(`position`);
}
function Ue(e, t) {
  let n = [],
    r = [],
    i = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT),
    a = i.nextNode();
  for (; a;) {
    let e = window.getComputedStyle(a),
      t = e.scrollSnapAlign,
      o = a;
    (t !== `none` && n.push({ align: t, el: o }),
      e.position === `sticky` &&
        (r.push({
          el: o,
          value: o.style.getPropertyValue(`position`),
          priority: o.style.getPropertyPriority(`position`),
        }),
        o.style.setProperty(`position`, `static`, `important`)),
      (a = i.nextNode()));
  }
  let o;
  try {
    let r = e.getBoundingClientRect();
    o = n.map(({ el: n, align: i }) => {
      let a = n,
        o = a.getBoundingClientRect(),
        s = a.clientWidth,
        c = o.left - r.left + e.scrollLeft,
        l = window.getComputedStyle(a),
        u = parseFloat(l.scrollMarginInlineStart) || 0,
        d = parseFloat(l.scrollMarginInlineEnd) || 0,
        f = c - u,
        p = c + s + d;
      switch (i) {
        case `start`:
          return { target: a, x: f - t.scrollPadding.start, y: 0 };
        case `end`:
          return {
            target: a,
            x: p - t.scrollerWidth + t.scrollPadding.end,
            y: 0,
          };
        case `center`:
          return { target: a, x: (f + p) / 2 - t.scrollerWidth / 2, y: 0 };
        default:
          return null;
      }
    });
  } finally {
    He(r);
  }
  t.snapPositions = o
    .filter((e) => e !== null)
    .reduce(
      (e, t) => ((e.length === 0 || e[e.length - 1].x !== t.x) && e.push(t), e),
      [],
    );
}
function We(e, t, n, r) {
  if (!r.hasSnap || !r.snapPositions.length) return !1;
  if (r.snapMandatory) return !0;
  let i = Ie(e, t, n),
    a =
      Math.max(
        r.scrollerWidth - r.scrollPadding.start - r.scrollPadding.end,
        0,
      ) / 3;
  return (
    r.snapPositions.reduce((e, t) => Math.min(e, Math.abs(t.x - i)), 1 / 0) <= a
  );
}
function Ge(e, t, n, r) {
  let i = Ke(e, t, n, r);
  return (
    i.x !== r.activeSnapPosition.x &&
      Ve(r.scroller, {
        snapTargetInline: (i || r.activeSnapPosition).target,
        snapTargetBlock: (i || r.activeSnapPosition).target,
      }),
    (r.activeSnapPosition = i),
    (Pe(
      i.x,
      Math.min((r.scrollerScrollWidth - r.scrollerWidth) * r.dir, 0),
      Math.max((r.scrollerScrollWidth - r.scrollerWidth) * r.dir, 0),
    ) -
      e) *
      (1 - X) *
      (1 / X)
  );
}
function Ke(e, t, n, r) {
  let i = Ie(e, t, n);
  return r.snapPositions.length
    ? r.snapPositions.reduce((e, t) =>
        Math.abs(t.x - i) < Math.abs(e.x - i) ? t : e,
      )
    : { target: null, x: Pe(i, Math.min(r.end, 0), Math.max(r.end, 0)), y: 0 };
}
function qe(e) {
  Be(e.scroller, {
    snapTargetInline: e.activeSnapPosition.target,
    snapTargetBlock: e.activeSnapPosition.target,
  });
}
function Je(e, t, n, r) {
  let i = Ke(e, t, n, r);
  i.x !== r.activeSnapPosition.x &&
    ((r.activeSnapPosition = i),
    Ve(r.scroller, {
      snapTargetInline: (i || r.activeSnapPosition).target,
      snapTargetBlock: (i || r.activeSnapPosition).target,
    }));
}
var Ye = {
  center: (e, t, n) => e + t * 0.5 - n.scrollerWidth / 2,
  end: (e, t, n) => e + t - n.scrollerWidth + n.scrollPadding.end,
  start: (e, t, n) => e - n.scrollPadding.start,
};
function Xe(e, t, n, r) {
  if (r.hasSnap) return e;
  let i = Ye[n || `start`];
  return i(e, t, r);
}
function Ze(e, t, n) {
  if (!n.scroller) return null;
  let r = n.scroller.scrollLeft,
    i = n.snapPositions.length ? n.snapPositions : n.slidePositions;
  if (e === `prev`)
    for (let e = i.length - 1; e >= 0; e--) {
      let a = Xe(i[e].x, i[e].width || 0, t, n);
      if (a < r - 1) return a;
    }
  else
    for (let e = 0; e < i.length; e++) {
      let a = Xe(i[e].x, i[e].width || 0, t, n);
      if (a > r + 1) return a;
    }
  return null;
}
function Qe(e, { align: t } = {}) {
  let n = Ze(`prev`, t, e);
  n !== null && e.scroller.scrollTo({ left: n, behavior: `smooth` });
}
function $e(e, { align: t } = {}) {
  let n = Ze(`next`, t, e);
  n !== null && e.scroller.scrollTo({ left: n, behavior: `smooth` });
}
var Q = new Map(),
  $ = null;
function et(e, t) {
  return (
    Q.size === 0 &&
      (($ = Element.prototype.scrollIntoView),
      (Element.prototype.scrollIntoView = function (e) {
        for (let e of Q.values()) e(this);
        return $.call(this, e);
      })),
    Q.set(e, t),
    () => {
      (Q.delete(e),
        Q.size === 0 &&
          $ &&
          ((Element.prototype.scrollIntoView = $), ($ = null)));
    }
  );
}
var tt = (e, t) => {
    let n = Me();
    n.scroller = e;
    let r = !0,
      i = { x: 0, y: 0 },
      a = { x: 0, y: 0 },
      o = { x: 0, y: 0 },
      s = new Proxy(
        { x: 0, y: 0 },
        {
          set(e, t, n) {
            return (
              e[t] === n ||
              ((e[t] = n), (e.x >= 10 || e.y >= 10) && (A.value = !0), !0)
            );
          },
        },
      ),
      c = new Proxy(
        { x: !1, y: !1 },
        {
          set(t, n, r) {
            return (
              t[n] === r ||
              ((t[n] = r),
              t.x || t.y
                ? (e.setAttribute(`has-overflow`, `true`),
                  e.addEventListener(`pointerdown`, C),
                  e.addEventListener(`wheel`, E, { passive: !0 }))
                : (e.removeAttribute(`has-overflow`),
                  e.removeEventListener(`pointerdown`, C),
                  e.removeEventListener(`wheel`, E)),
              !0)
            );
          },
        },
      ),
      l = null,
      u = null,
      d = null,
      f = null,
      p,
      m = null,
      h = !1;
    function g() {
      (e?.setAttribute(`blossom-carousel`, `true`),
        (u = e?.querySelectorAll(`a[href]`) || null),
        u?.forEach((e) => {
          e.addEventListener(`click`, v);
        }),
        window.addEventListener(`keydown`, D),
        e.addEventListener(`scroll`, x),
        (d = new ResizeObserver(y)),
        d.observe(e),
        (f = new MutationObserver(b)),
        f.observe(e, { attributes: !1, childList: !0, subtree: !0 }),
        (m = new je(
          (e) => {
            ((c.x =
              !h &&
              n.scrollerScrollWidth > n.scrollerWidth &&
              [`auto`, `scroll`].includes(
                typeof e[`overflow-x`] == `string`
                  ? e[`overflow-x`]
                  : e[`overflow-x`].value,
              )),
              (c.y =
                !h &&
                n.scrollerScrollHeight > n.scrollerHeight &&
                [`auto`, `scroll`].includes(
                  typeof e[`overflow-y`] == `string`
                    ? e[`overflow-y`]
                    : e[`overflow-y`].value,
                )));
          },
          { properties: [`overflow-x`, `overflow-y`], returnFormat: q.OBJECT },
        )),
        m.observe(e));
      let i = window.matchMedia(`(hover: hover) and (pointer: fine)`).matches;
      n.dir = e.closest(`[dir="rtl"]`) ? -1 : 1;
      let { scrollSnapType: a } = window.getComputedStyle(e);
      ((n.hasSnap = a !== `none`),
        (n.snapMandatory = a.includes(`mandatory`)),
        e.style.setProperty(`--snap-type`, a),
        i && e.style.setProperty(`scroll-snap-type`, `none`),
        e.setAttribute(`has-snap`, r ? `true` : `false`),
        e.setAttribute(`has-repeat`, t?.repeat ? `true` : `false`),
        (p = et(e, (t) => {
          (t === e || e.contains(t)) && (A.value = !1);
        })));
    }
    function _() {
      (e.removeAttribute(`blossom-carousel`),
        d?.disconnect(),
        f?.disconnect(),
        m?.unobserve(e),
        l && cancelAnimationFrame(l),
        window.removeEventListener(`keydown`, D),
        e.removeEventListener(`scroll`, x),
        u?.forEach((e) => {
          e.removeEventListener(`click`, v);
        }),
        p?.(),
        (e.scrollTo = L),
        (e.scrollBy = R));
    }
    function v(e) {
      s.x > 10 && e.preventDefault();
    }
    function y() {
      if (!e) return;
      ((h = `ontouchmove` in window),
        (n.scrollerScrollWidth = e.scrollWidth),
        (n.scrollerWidth = e.clientWidth),
        (n.scrollerScrollHeight = e.scrollHeight),
        (n.scrollerHeight = e.clientHeight));
      let r = window.getComputedStyle(e);
      ((c.x =
        !h &&
        n.scrollerScrollWidth > n.scrollerWidth &&
        [`auto`, `scroll`].includes(r.getPropertyValue(`overflow-x`))),
        (c.y =
          !h &&
          n.scrollerScrollHeight > n.scrollerHeight &&
          [`auto`, `scroll`].includes(r.getPropertyValue(`overflow-y`))),
        (n.padding.end = Y(e, r.paddingInlineEnd)),
        (n.padding.start = Y(e, r.paddingInlineStart)),
        (n.scrollPadding.start = Y(e, r.scrollPaddingInlineStart)),
        (n.scrollPadding.end = Y(e, r.scrollPaddingInlineEnd)),
        (n.dir = e.closest(`[dir="rtl"]`) ? -1 : 1),
        (n.end = (n.scrollerScrollWidth - n.scrollerWidth - 4) * n.dir),
        n.hasSnap
          ? Ue(e, n)
          : (n.slidePositions = Array.from(e.children).map((t) => {
              let r = t.getBoundingClientRect(),
                i = e.getBoundingClientRect();
              return {
                target: t,
                x: r.left - i.left + e.scrollLeft - n.scrollPadding.start,
                y: 0,
                width: r.width,
                height: r.height,
              };
            })),
        t?.repeat && O(null, null));
    }
    function b() {
      y();
    }
    function x() {
      if (t?.repeat) {
        O(null, null);
        return;
      }
      if (n.isDragging || !e) return;
      let r = e.scrollLeft;
      r < 0
        ? Re(e, { left: r * -1 })
        : r > n.scrollerScrollWidth - n.scrollerWidth &&
          Re(e, { left: r * -1 + n.scrollerScrollWidth - n.scrollerWidth });
    }
    let S = { x: 0, y: 0 };
    function C(t) {
      e &&
        (c.x &&
          ((S.x = e.scrollLeft),
          (a.x = e.scrollLeft),
          (i.x = t.clientX),
          (o.x = 0)),
        c.y &&
          ((S.y = e.scrollTop),
          (a.y = e.scrollTop),
          (i.y = t.clientY),
          (o.y = 0)),
        (s.x = 0),
        (n.isDragging = !0),
        window.addEventListener(`pointermove`, w),
        window.addEventListener(`pointerup`, T));
    }
    function w(e) {
      if ((e.preventDefault(), c.x)) {
        let t = i.x - e.clientX;
        ((a.x += t), (o.x += t), (i.x = e.clientX), (s.x += Math.abs(t)));
      }
      if (c.y) {
        let t = i.y - e.clientY;
        ((a.y += t), (o.y += t), (i.y = e.clientY), (s.y += Math.abs(t)));
      }
    }
    function T() {
      (window.removeEventListener(`pointermove`, w),
        window.removeEventListener(`pointerup`, T),
        (n.isDragging = !1),
        !(s.x <= 10) &&
          (c.x && (o.x *= 2),
          c.y && (o.y *= 2),
          (We(a.x, o.x, 0.72, n) || a.x < 0 || a.x > n.end) &&
            (o.x = Ge(a.x, o.x, X, n)),
          V()));
    }
    function E(t) {
      if (Math.abs(t.deltaX) > Math.abs(t.deltaY)) {
        if (((A.value = !1), n.isDragging || !e)) return;
        (c.x && (S.x = e.scrollLeft), c.y && (S.y = e.scrollTop));
      }
    }
    function D(e) {
      [`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`].includes(e.key) &&
        (A.value = !1);
    }
    function O(t, r) {
      if (!e) return;
      let i = r ?? e.scrollLeft,
        a = n.padding.start - i,
        o = i - (n.scrollerScrollWidth - n.scrollerWidth - n.padding.end),
        s = Array.from(e.children),
        c = (e, t, r, i) => {
          let a = 0,
            o = i ? -1 : 1,
            c = i
              ? -(n.scrollerScrollWidth - n.scrollerWidth)
              : n.scrollerScrollWidth - n.scrollerWidth;
          for (let n = e; i ? n >= t : n < t; n += o) {
            let e = a > r;
            ((s[n].style.translate = `${e ? 0 : c}px 0`),
              (a += s[n].clientWidth));
          }
        };
      if (
        (c(s.length - 1, s.length / 2, a, !0),
        c(0, s.length / 2, o, !1),
        n.isDragging)
      )
        return;
      let l = i > n.end ? 4 : i < 4 ? n.end : null;
      l && ((I = !0), e.scrollTo({ left: l, behavior: `instant` }));
    }
    function k(e) {
      A.value && e.stopPropagation();
    }
    let A = new Proxy(
        { value: !1 },
        {
          set(t, n, i) {
            return (
              (r = !i),
              t[n] === i
                ? !0
                : e
                  ? (e.setAttribute(`has-snap`, r ? `true` : `false`),
                    i && !A.value
                      ? ((M = performance.now()),
                        c.x && (a.x = e.scrollLeft),
                        c.y && (a.y = e.scrollTop),
                        e.addEventListener(`scrollend`, k, {
                          capture: !0,
                          passive: !1,
                        }),
                        (l ||= requestAnimationFrame(N)))
                      : i ||
                        (l && cancelAnimationFrame(l),
                        (l = null),
                        e.removeEventListener(`scrollend`, k)),
                    (t[n] = i),
                    !0)
                  : !1
            );
          },
        },
      ),
      j = 0,
      M = 0;
    function N(r) {
      ((l = requestAnimationFrame(N)),
        (j = r - M),
        e &&
          (c.x &&
            ((o.x *= X),
            n.isDragging
              ? (S.x = J(S.x, a.x, X, j))
              : ((a.x += o.x), (S.x = J(S.x, a.x, Le, j)))),
          c.y &&
            ((o.y *= X),
            n.isDragging
              ? (S.y = J(S.y, a.y, X, j))
              : ((a.y += o.y), (S.y = J(S.y, a.y, Le, j)))),
          t?.repeat &&
            (S.x > n.end && (S.x = a.x = 4), S.x < 4 && (S.x = a.x = n.end)),
          (I = !0),
          e.scrollTo({ left: S.x, top: S.y, behavior: `instant` }),
          n.isDragging && n.hasSnap && Je(a.x, o.x, X, n),
          !n.isDragging &&
            Fe(o.x, 12) === 0 &&
            ((A.value = !1), ze(e), n.hasSnap && qe(n)),
          t?.repeat ? O(null, S.x) : F(Fe(S.x, 2)),
          (M = r)));
    }
    let P = 0;
    function F(t) {
      if (!e) return;
      let r = n.end,
        i = 0;
      if (
        (t * n.dir <= 0
          ? (i = n.isDragging ? t * -0.2 : 0)
          : t * n.dir > r * n.dir && (i = n.isDragging ? (t - r) * -0.2 : 0),
        (P = J(P, i, n.isDragging ? 0.8 : Le, j)),
        Math.abs(P) > 0.01)
      ) {
        if (Re(e, { left: P }).defaultPrevented) return;
        e.style.transform = `translateX(${Fe(P, 3)}px)`;
        return;
      }
      ((e.style.transform = ``), (P = 0));
    }
    let I = !1,
      L = e.scrollTo,
      R = e.scrollBy,
      z = e.scrollTo.bind(e);
    e.scrollTo = function (...e) {
      (I !== !0 && (A.value = !1), (I = !1), z(...e));
    };
    let B = e.scrollBy.bind(e);
    e.scrollBy = function (...e) {
      (I !== !0 && (A.value = !1), (I = !1), B(...e));
    };
    function V() {
      let e = (t) => {
        (t.preventDefault(),
          t.stopPropagation(),
          window.removeEventListener(`click`, e, !0));
      };
      window.addEventListener(`click`, e, !0);
    }
    return {
      snap: r,
      hasOverflow: c,
      init: g,
      destroy: _,
      prev: (e) => Qe(n, e),
      next: (e) => $e(n, e),
    };
  },
  nt = new WeakMap();
function rt(e, t) {
  let n = typeof e == `string` ? document.getElementById(e) : e;
  if (!n) return;
  let r = nt.get(n);
  if (r && !matchMedia(`(prefers-reduced-motion: reduce)`).matches)
    r[t === `next` ? `next` : `prev`]();
  else {
    let e = n.firstElementChild?.getBoundingClientRect().width || 300;
    n.scrollBy({
      left: (t === `next` ? 1 : -1) * (e + 16),
      behavior: matchMedia(`(prefers-reduced-motion: reduce)`).matches
        ? `instant`
        : `smooth`,
    });
  }
}
function it(e, t) {
  (0, U.useEffect)(() => {
    let t = e.current;
    if (!t) return;
    let n = [...t.querySelectorAll(`[blossom-carousel],[data-carousel]`)].map(
      (e) => {
        e.setAttribute(`blossom-carousel`, `true`);
        let n;
        matchMedia(`(hover: hover) and (pointer: fine)`).matches &&
          ((n = tt(e, { repeat: !1 })), n.init(), nt.set(e, n));
        let r = [...t.querySelectorAll(`button[data-direction]`)].filter(
            (t) => t.getAttribute(`aria-controls`) === e.id,
          ),
          i = () =>
            r.forEach((t) => {
              t.disabled =
                t.dataset.direction === `next`
                  ? e.scrollLeft >= e.scrollWidth - e.clientWidth - 2
                  : e.scrollLeft < 2;
            }),
          a = (t) => {
            t.target !== e ||
              ![`ArrowLeft`, `ArrowRight`].includes(t.key) ||
              (t.preventDefault(),
              rt(e, t.key === `ArrowRight` ? `next` : `previous`));
          };
        ((e.tabIndex = 0),
          e.addEventListener(`scroll`, i, { passive: !0 }),
          e.addEventListener(`keydown`, a));
        let o = new ResizeObserver(i);
        return (
          o.observe(e),
          i(),
          () => {
            (n?.destroy(),
              e.setAttribute(`blossom-carousel`, `true`),
              nt.delete(e),
              o.disconnect(),
              e.removeEventListener(`scroll`, i),
              e.removeEventListener(`keydown`, a));
          }
        );
      },
    );
    return () => n.forEach((e) => e());
  }, [e, t]);
}
export { _e as a, ve as i, it as n, ae as o, ke as r, ie as s, rt as t };
