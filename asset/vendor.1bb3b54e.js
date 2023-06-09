function Z(t) {
  return (
    t !== null &&
    typeof t == "object" &&
    "constructor" in t &&
    t.constructor === Object
  );
}
function N(t = {}, e = {}) {
  Object.keys(e).forEach((s) => {
    typeof t[s] == "undefined"
      ? (t[s] = e[s])
      : Z(e[s]) && Z(t[s]) && Object.keys(e[s]).length > 0 && N(t[s], e[s]);
  });
}
const ee = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function G() {
  const t = typeof document != "undefined" ? document : {};
  return N(t, ee), t;
}
const ge = {
  document: ee,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(t) {
    return typeof setTimeout == "undefined" ? (t(), null) : setTimeout(t, 0);
  },
  cancelAnimationFrame(t) {
    typeof setTimeout != "undefined" && clearTimeout(t);
  },
};
function C() {
  const t = typeof window != "undefined" ? window : {};
  return N(t, ge), t;
}
function ve(t) {
  const e = t;
  Object.keys(e).forEach((s) => {
    try {
      e[s] = null;
    } catch {}
    try {
      delete e[s];
    } catch {}
  });
}
function W(t, e = 0) {
  return setTimeout(t, e);
}
function D() {
  return Date.now();
}
function we(t) {
  const e = C();
  let s;
  return (
    e.getComputedStyle && (s = e.getComputedStyle(t, null)),
    !s && t.currentStyle && (s = t.currentStyle),
    s || (s = t.style),
    s
  );
}
function Se(t, e = "x") {
  const s = C();
  let i, n, r;
  const a = we(t);
  return (
    s.WebKitCSSMatrix
      ? ((n = a.transform || a.webkitTransform),
        n.split(",").length > 6 &&
          (n = n
            .split(", ")
            .map((o) => o.replace(",", "."))
            .join(", ")),
        (r = new s.WebKitCSSMatrix(n === "none" ? "" : n)))
      : ((r =
          a.MozTransform ||
          a.OTransform ||
          a.MsTransform ||
          a.msTransform ||
          a.transform ||
          a
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (i = r.toString().split(","))),
    e === "x" &&
      (s.WebKitCSSMatrix
        ? (n = r.m41)
        : i.length === 16
        ? (n = parseFloat(i[12]))
        : (n = parseFloat(i[4]))),
    e === "y" &&
      (s.WebKitCSSMatrix
        ? (n = r.m42)
        : i.length === 16
        ? (n = parseFloat(i[13]))
        : (n = parseFloat(i[5]))),
    n || 0
  );
}
function $(t) {
  return (
    typeof t == "object" &&
    t !== null &&
    t.constructor &&
    Object.prototype.toString.call(t).slice(8, -1) === "Object"
  );
}
function Te(t) {
  return typeof window != "undefined" &&
    typeof window.HTMLElement != "undefined"
    ? t instanceof HTMLElement
    : t && (t.nodeType === 1 || t.nodeType === 11);
}
function L(...t) {
  const e = Object(t[0]),
    s = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < t.length; i += 1) {
    const n = t[i];
    if (n != null && !Te(n)) {
      const r = Object.keys(Object(n)).filter((a) => s.indexOf(a) < 0);
      for (let a = 0, o = r.length; a < o; a += 1) {
        const l = r[a],
          d = Object.getOwnPropertyDescriptor(n, l);
        d !== void 0 &&
          d.enumerable &&
          ($(e[l]) && $(n[l])
            ? n[l].__swiper__
              ? (e[l] = n[l])
              : L(e[l], n[l])
            : !$(e[l]) && $(n[l])
            ? ((e[l] = {}), n[l].__swiper__ ? (e[l] = n[l]) : L(e[l], n[l]))
            : (e[l] = n[l]));
      }
    }
  }
  return e;
}
function B(t, e, s) {
  t.style.setProperty(e, s);
}
function te({ swiper: t, targetPosition: e, side: s }) {
  const i = C(),
    n = -t.translate;
  let r = null,
    a;
  const o = t.params.speed;
  (t.wrapperEl.style.scrollSnapType = "none"),
    i.cancelAnimationFrame(t.cssModeFrameID);
  const l = e > n ? "next" : "prev",
    d = (c, u) => (l === "next" && c >= u) || (l === "prev" && c <= u),
    p = () => {
      (a = new Date().getTime()), r === null && (r = a);
      const c = Math.max(Math.min((a - r) / o, 1), 0),
        u = 0.5 - Math.cos(c * Math.PI) / 2;
      let f = n + u * (e - n);
      if ((d(f, e) && (f = e), t.wrapperEl.scrollTo({ [s]: f }), d(f, e))) {
        (t.wrapperEl.style.overflow = "hidden"),
          (t.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (t.wrapperEl.style.overflow = ""), t.wrapperEl.scrollTo({ [s]: f });
          }),
          i.cancelAnimationFrame(t.cssModeFrameID);
        return;
      }
      t.cssModeFrameID = i.requestAnimationFrame(p);
    };
  p();
}
function O(t, e = "") {
  return [...t.children].filter((s) => s.matches(e));
}
function xe(t, e = []) {
  const s = document.createElement(t);
  return s.classList.add(...(Array.isArray(e) ? e : [e])), s;
}
function be(t, e) {
  const s = [];
  for (; t.previousElementSibling; ) {
    const i = t.previousElementSibling;
    e ? i.matches(e) && s.push(i) : s.push(i), (t = i);
  }
  return s;
}
function ye(t, e) {
  const s = [];
  for (; t.nextElementSibling; ) {
    const i = t.nextElementSibling;
    e ? i.matches(e) && s.push(i) : s.push(i), (t = i);
  }
  return s;
}
function A(t, e) {
  return C().getComputedStyle(t, null).getPropertyValue(e);
}
function V(t) {
  let e = t,
    s;
  if (e) {
    for (s = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (s += 1);
    return s;
  }
}
function Ee(t, e) {
  const s = [];
  let i = t.parentElement;
  for (; i; ) e ? i.matches(e) && s.push(i) : s.push(i), (i = i.parentElement);
  return s;
}
function se(t, e, s) {
  const i = C();
  return s
    ? t[e === "width" ? "offsetWidth" : "offsetHeight"] +
        parseFloat(
          i
            .getComputedStyle(t, null)
            .getPropertyValue(e === "width" ? "margin-right" : "margin-top")
        ) +
        parseFloat(
          i
            .getComputedStyle(t, null)
            .getPropertyValue(e === "width" ? "margin-left" : "margin-bottom")
        )
    : t.offsetWidth;
}
let R;
function Me() {
  const t = C(),
    e = G();
  return {
    smoothScroll:
      e.documentElement && "scrollBehavior" in e.documentElement.style,
    touch: !!(
      "ontouchstart" in t ||
      (t.DocumentTouch && e instanceof t.DocumentTouch)
    ),
  };
}
function ie() {
  return R || (R = Me()), R;
}
let j;
function Pe({ userAgent: t } = {}) {
  const e = ie(),
    s = C(),
    i = s.navigator.platform,
    n = t || s.navigator.userAgent,
    r = { ios: !1, android: !1 },
    a = s.screen.width,
    o = s.screen.height,
    l = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = n.match(/(iPad).*OS\s([\d_]+)/);
  const p = n.match(/(iPod)(.*OS\s([\d_]+))?/),
    c = !d && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    u = i === "Win32";
  let f = i === "MacIntel";
  const w = [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810",
  ];
  return (
    !d &&
      f &&
      e.touch &&
      w.indexOf(`${a}x${o}`) >= 0 &&
      ((d = n.match(/(Version)\/([\d.]+)/)),
      d || (d = [0, 1, "13_0_0"]),
      (f = !1)),
    l && !u && ((r.os = "android"), (r.android = !0)),
    (d || c || p) && ((r.os = "ios"), (r.ios = !0)),
    r
  );
}
function Ce(t = {}) {
  return j || (j = Pe(t)), j;
}
let X;
function Le() {
  const t = C();
  let e = !1;
  function s() {
    const i = t.navigator.userAgent.toLowerCase();
    return (
      i.indexOf("safari") >= 0 &&
      i.indexOf("chrome") < 0 &&
      i.indexOf("android") < 0
    );
  }
  if (s()) {
    const i = String(t.navigator.userAgent);
    if (i.includes("Version/")) {
      const [n, r] = i
        .split("Version/")[1]
        .split(" ")[0]
        .split(".")
        .map((a) => Number(a));
      e = n < 16 || (n === 16 && r < 2);
    }
  }
  return {
    isSafari: e || s(),
    needPerspectiveFix: e,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      t.navigator.userAgent
    ),
  };
}
function Ie() {
  return X || (X = Le()), X;
}
function ze({ swiper: t, on: e, emit: s }) {
  const i = C();
  let n = null,
    r = null;
  const a = () => {
      !t || t.destroyed || !t.initialized || (s("beforeResize"), s("resize"));
    },
    o = () => {
      !t ||
        t.destroyed ||
        !t.initialized ||
        ((n = new ResizeObserver((p) => {
          r = i.requestAnimationFrame(() => {
            const { width: c, height: u } = t;
            let f = c,
              w = u;
            p.forEach(({ contentBoxSize: h, contentRect: m, target: g }) => {
              (g && g !== t.el) ||
                ((f = m ? m.width : (h[0] || h).inlineSize),
                (w = m ? m.height : (h[0] || h).blockSize));
            }),
              (f !== c || w !== u) && a();
          });
        })),
        n.observe(t.el));
    },
    l = () => {
      r && i.cancelAnimationFrame(r),
        n && n.unobserve && t.el && (n.unobserve(t.el), (n = null));
    },
    d = () => {
      !t || t.destroyed || !t.initialized || s("orientationchange");
    };
  e("init", () => {
    if (t.params.resizeObserver && typeof i.ResizeObserver != "undefined") {
      o();
      return;
    }
    i.addEventListener("resize", a), i.addEventListener("orientationchange", d);
  }),
    e("destroy", () => {
      l(),
        i.removeEventListener("resize", a),
        i.removeEventListener("orientationchange", d);
    });
}
function Oe({ swiper: t, extendParams: e, on: s, emit: i }) {
  const n = [],
    r = C(),
    a = (d, p = {}) => {
      const c = r.MutationObserver || r.WebkitMutationObserver,
        u = new c((f) => {
          if (f.length === 1) {
            i("observerUpdate", f[0]);
            return;
          }
          const w = function () {
            i("observerUpdate", f[0]);
          };
          r.requestAnimationFrame
            ? r.requestAnimationFrame(w)
            : r.setTimeout(w, 0);
        });
      u.observe(d, {
        attributes: typeof p.attributes == "undefined" ? !0 : p.attributes,
        childList: typeof p.childList == "undefined" ? !0 : p.childList,
        characterData:
          typeof p.characterData == "undefined" ? !0 : p.characterData,
      }),
        n.push(u);
    },
    o = () => {
      if (!!t.params.observer) {
        if (t.params.observeParents) {
          const d = Ee(t.el);
          for (let p = 0; p < d.length; p += 1) a(d[p]);
        }
        a(t.el, { childList: t.params.observeSlideChildren }),
          a(t.wrapperEl, { attributes: !1 });
      }
    },
    l = () => {
      n.forEach((d) => {
        d.disconnect();
      }),
        n.splice(0, n.length);
    };
  e({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    s("init", o),
    s("destroy", l);
}
var ke = {
  on(t, e, s) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;
    const n = s ? "unshift" : "push";
    return (
      t.split(" ").forEach((r) => {
        i.eventsListeners[r] || (i.eventsListeners[r] = []),
          i.eventsListeners[r][n](e);
      }),
      i
    );
  },
  once(t, e, s) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;
    function n(...r) {
      i.off(t, n), n.__emitterProxy && delete n.__emitterProxy, e.apply(i, r);
    }
    return (n.__emitterProxy = e), i.on(t, n, s);
  },
  onAny(t, e) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != "function") return s;
    const i = e ? "unshift" : "push";
    return s.eventsAnyListeners.indexOf(t) < 0 && s.eventsAnyListeners[i](t), s;
  },
  offAny(t) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const s = e.eventsAnyListeners.indexOf(t);
    return s >= 0 && e.eventsAnyListeners.splice(s, 1), e;
  },
  off(t, e) {
    const s = this;
    return (
      !s.eventsListeners ||
        s.destroyed ||
        !s.eventsListeners ||
        t.split(" ").forEach((i) => {
          typeof e == "undefined"
            ? (s.eventsListeners[i] = [])
            : s.eventsListeners[i] &&
              s.eventsListeners[i].forEach((n, r) => {
                (n === e || (n.__emitterProxy && n.__emitterProxy === e)) &&
                  s.eventsListeners[i].splice(r, 1);
              });
        }),
      s
    );
  },
  emit(...t) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsListeners) return e;
    let s, i, n;
    return (
      typeof t[0] == "string" || Array.isArray(t[0])
        ? ((s = t[0]), (i = t.slice(1, t.length)), (n = e))
        : ((s = t[0].events), (i = t[0].data), (n = t[0].context || e)),
      i.unshift(n),
      (Array.isArray(s) ? s : s.split(" ")).forEach((a) => {
        e.eventsAnyListeners &&
          e.eventsAnyListeners.length &&
          e.eventsAnyListeners.forEach((o) => {
            o.apply(n, [a, ...i]);
          }),
          e.eventsListeners &&
            e.eventsListeners[a] &&
            e.eventsListeners[a].forEach((o) => {
              o.apply(n, i);
            });
      }),
      e
    );
  },
};
function Ae() {
  const t = this;
  let e, s;
  const i = t.el;
  typeof t.params.width != "undefined" && t.params.width !== null
    ? (e = t.params.width)
    : (e = i.clientWidth),
    typeof t.params.height != "undefined" && t.params.height !== null
      ? (s = t.params.height)
      : (s = i.clientHeight),
    !((e === 0 && t.isHorizontal()) || (s === 0 && t.isVertical())) &&
      ((e =
        e -
        parseInt(A(i, "padding-left") || 0, 10) -
        parseInt(A(i, "padding-right") || 0, 10)),
      (s =
        s -
        parseInt(A(i, "padding-top") || 0, 10) -
        parseInt(A(i, "padding-bottom") || 0, 10)),
      Number.isNaN(e) && (e = 0),
      Number.isNaN(s) && (s = 0),
      Object.assign(t, {
        width: e,
        height: s,
        size: t.isHorizontal() ? e : s,
      }));
}
function Ge() {
  const t = this;
  function e(S) {
    return t.isHorizontal()
      ? S
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[S];
  }
  function s(S, x) {
    return parseFloat(S.getPropertyValue(e(x)) || 0);
  }
  const i = t.params,
    { wrapperEl: n, slidesEl: r, size: a, rtlTranslate: o, wrongRTL: l } = t,
    d = t.virtual && i.virtual.enabled,
    p = d ? t.virtual.slides.length : t.slides.length,
    c = O(r, `.${t.params.slideClass}, swiper-slide`),
    u = d ? t.virtual.slides.length : c.length;
  let f = [];
  const w = [],
    h = [];
  let m = i.slidesOffsetBefore;
  typeof m == "function" && (m = i.slidesOffsetBefore.call(t));
  let g = i.slidesOffsetAfter;
  typeof g == "function" && (g = i.slidesOffsetAfter.call(t));
  const y = t.snapGrid.length,
    T = t.slidesGrid.length;
  let b = i.spaceBetween,
    v = -m,
    M = 0,
    k = 0;
  if (typeof a == "undefined") return;
  typeof b == "string" &&
    b.indexOf("%") >= 0 &&
    (b = (parseFloat(b.replace("%", "")) / 100) * a),
    (t.virtualSize = -b),
    c.forEach((S) => {
      o ? (S.style.marginLeft = "") : (S.style.marginRight = ""),
        (S.style.marginBottom = ""),
        (S.style.marginTop = "");
    }),
    i.centeredSlides &&
      i.cssMode &&
      (B(n, "--swiper-centered-offset-before", ""),
      B(n, "--swiper-centered-offset-after", ""));
  const _ = i.grid && i.grid.rows > 1 && t.grid;
  _ && t.grid.initSlides(u);
  let P;
  const fe =
    i.slidesPerView === "auto" &&
    i.breakpoints &&
    Object.keys(i.breakpoints).filter(
      (S) => typeof i.breakpoints[S].slidesPerView != "undefined"
    ).length > 0;
  for (let S = 0; S < u; S += 1) {
    P = 0;
    let x;
    if (
      (c[S] && (x = c[S]),
      _ && t.grid.updateSlide(S, x, u, e),
      !(c[S] && A(x, "display") === "none"))
    ) {
      if (i.slidesPerView === "auto") {
        fe && (c[S].style[e("width")] = "");
        const E = getComputedStyle(x),
          z = x.style.transform,
          H = x.style.webkitTransform;
        if (
          (z && (x.style.transform = "none"),
          H && (x.style.webkitTransform = "none"),
          i.roundLengths)
        )
          P = t.isHorizontal() ? se(x, "width", !0) : se(x, "height", !0);
        else {
          const K = s(E, "width"),
            ue = s(E, "padding-left"),
            pe = s(E, "padding-right"),
            U = s(E, "margin-left"),
            J = s(E, "margin-right"),
            Q = E.getPropertyValue("box-sizing");
          if (Q && Q === "border-box") P = K + U + J;
          else {
            const { clientWidth: he, offsetWidth: me } = x;
            P = K + ue + pe + U + J + (me - he);
          }
        }
        z && (x.style.transform = z),
          H && (x.style.webkitTransform = H),
          i.roundLengths && (P = Math.floor(P));
      } else
        (P = (a - (i.slidesPerView - 1) * b) / i.slidesPerView),
          i.roundLengths && (P = Math.floor(P)),
          c[S] && (c[S].style[e("width")] = `${P}px`);
      c[S] && (c[S].swiperSlideSize = P),
        h.push(P),
        i.centeredSlides
          ? ((v = v + P / 2 + M / 2 + b),
            M === 0 && S !== 0 && (v = v - a / 2 - b),
            S === 0 && (v = v - a / 2 - b),
            Math.abs(v) < 1 / 1e3 && (v = 0),
            i.roundLengths && (v = Math.floor(v)),
            k % i.slidesPerGroup == 0 && f.push(v),
            w.push(v))
          : (i.roundLengths && (v = Math.floor(v)),
            (k - Math.min(t.params.slidesPerGroupSkip, k)) %
              t.params.slidesPerGroup ==
              0 && f.push(v),
            w.push(v),
            (v = v + P + b)),
        (t.virtualSize += P + b),
        (M = P),
        (k += 1);
    }
  }
  if (
    ((t.virtualSize = Math.max(t.virtualSize, a) + g),
    o &&
      l &&
      (i.effect === "slide" || i.effect === "coverflow") &&
      (n.style.width = `${t.virtualSize + i.spaceBetween}px`),
    i.setWrapperSize &&
      (n.style[e("width")] = `${t.virtualSize + i.spaceBetween}px`),
    _ && t.grid.updateWrapperSize(P, f, e),
    !i.centeredSlides)
  ) {
    const S = [];
    for (let x = 0; x < f.length; x += 1) {
      let E = f[x];
      i.roundLengths && (E = Math.floor(E)),
        f[x] <= t.virtualSize - a && S.push(E);
    }
    (f = S),
      Math.floor(t.virtualSize - a) - Math.floor(f[f.length - 1]) > 1 &&
        f.push(t.virtualSize - a);
  }
  if (d && i.loop) {
    const S = h[0] + b;
    if (i.slidesPerGroup > 1) {
      const x = Math.ceil(
          (t.virtual.slidesBefore + t.virtual.slidesAfter) / i.slidesPerGroup
        ),
        E = S * i.slidesPerGroup;
      for (let z = 0; z < x; z += 1) f.push(f[f.length - 1] + E);
    }
    for (let x = 0; x < t.virtual.slidesBefore + t.virtual.slidesAfter; x += 1)
      i.slidesPerGroup === 1 && f.push(f[f.length - 1] + S),
        w.push(w[w.length - 1] + S),
        (t.virtualSize += S);
  }
  if ((f.length === 0 && (f = [0]), i.spaceBetween !== 0)) {
    const S = t.isHorizontal() && o ? "marginLeft" : e("marginRight");
    c.filter((x, E) =>
      !i.cssMode || i.loop ? !0 : E !== c.length - 1
    ).forEach((x) => {
      x.style[S] = `${b}px`;
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let S = 0;
    h.forEach((E) => {
      S += E + (i.spaceBetween ? i.spaceBetween : 0);
    }),
      (S -= i.spaceBetween);
    const x = S - a;
    f = f.map((E) => (E < 0 ? -m : E > x ? x + g : E));
  }
  if (i.centerInsufficientSlides) {
    let S = 0;
    if (
      (h.forEach((x) => {
        S += x + (i.spaceBetween ? i.spaceBetween : 0);
      }),
      (S -= i.spaceBetween),
      S < a)
    ) {
      const x = (a - S) / 2;
      f.forEach((E, z) => {
        f[z] = E - x;
      }),
        w.forEach((E, z) => {
          w[z] = E + x;
        });
    }
  }
  if (
    (Object.assign(t, {
      slides: c,
      snapGrid: f,
      slidesGrid: w,
      slidesSizesGrid: h,
    }),
    i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
  ) {
    B(n, "--swiper-centered-offset-before", `${-f[0]}px`),
      B(
        n,
        "--swiper-centered-offset-after",
        `${t.size / 2 - h[h.length - 1] / 2}px`
      );
    const S = -t.snapGrid[0],
      x = -t.slidesGrid[0];
    (t.snapGrid = t.snapGrid.map((E) => E + S)),
      (t.slidesGrid = t.slidesGrid.map((E) => E + x));
  }
  if (
    (u !== p && t.emit("slidesLengthChange"),
    f.length !== y &&
      (t.params.watchOverflow && t.checkOverflow(),
      t.emit("snapGridLengthChange")),
    w.length !== T && t.emit("slidesGridLengthChange"),
    i.watchSlidesProgress && t.updateSlidesOffset(),
    !d && !i.cssMode && (i.effect === "slide" || i.effect === "fade"))
  ) {
    const S = `${i.containerModifierClass}backface-hidden`,
      x = t.el.classList.contains(S);
    u <= i.maxBackfaceHiddenSlides
      ? x || t.el.classList.add(S)
      : x && t.el.classList.remove(S);
  }
}
function Ve(t) {
  const e = this,
    s = [],
    i = e.virtual && e.params.virtual.enabled;
  let n = 0,
    r;
  typeof t == "number"
    ? e.setTransition(t)
    : t === !0 && e.setTransition(e.params.speed);
  const a = (o) =>
    i
      ? e.slides.filter(
          (l) => parseInt(l.getAttribute("data-swiper-slide-index"), 10) === o
        )[0]
      : e.slides[o];
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((o) => {
        s.push(o);
      });
    else
      for (r = 0; r < Math.ceil(e.params.slidesPerView); r += 1) {
        const o = e.activeIndex + r;
        if (o > e.slides.length && !i) break;
        s.push(a(o));
      }
  else s.push(a(e.activeIndex));
  for (r = 0; r < s.length; r += 1)
    if (typeof s[r] != "undefined") {
      const o = s[r].offsetHeight;
      n = o > n ? o : n;
    }
  (n || n === 0) && (e.wrapperEl.style.height = `${n}px`);
}
function De() {
  const t = this,
    e = t.slides,
    s = t.isElement
      ? t.isHorizontal()
        ? t.wrapperEl.offsetLeft
        : t.wrapperEl.offsetTop
      : 0;
  for (let i = 0; i < e.length; i += 1)
    e[i].swiperSlideOffset =
      (t.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop) - s;
}
function $e(t = (this && this.translate) || 0) {
  const e = this,
    s = e.params,
    { slides: i, rtlTranslate: n, snapGrid: r } = e;
  if (i.length === 0) return;
  typeof i[0].swiperSlideOffset == "undefined" && e.updateSlidesOffset();
  let a = -t;
  n && (a = t),
    i.forEach((o) => {
      o.classList.remove(s.slideVisibleClass);
    }),
    (e.visibleSlidesIndexes = []),
    (e.visibleSlides = []);
  for (let o = 0; o < i.length; o += 1) {
    const l = i[o];
    let d = l.swiperSlideOffset;
    s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
    const p =
        (a + (s.centeredSlides ? e.minTranslate() : 0) - d) /
        (l.swiperSlideSize + s.spaceBetween),
      c =
        (a - r[0] + (s.centeredSlides ? e.minTranslate() : 0) - d) /
        (l.swiperSlideSize + s.spaceBetween),
      u = -(a - d),
      f = u + e.slidesSizesGrid[o];
    ((u >= 0 && u < e.size - 1) ||
      (f > 1 && f <= e.size) ||
      (u <= 0 && f >= e.size)) &&
      (e.visibleSlides.push(l),
      e.visibleSlidesIndexes.push(o),
      i[o].classList.add(s.slideVisibleClass)),
      (l.progress = n ? -p : p),
      (l.originalProgress = n ? -c : c);
  }
}
function Be(t) {
  const e = this;
  if (typeof t == "undefined") {
    const p = e.rtlTranslate ? -1 : 1;
    t = (e && e.translate && e.translate * p) || 0;
  }
  const s = e.params,
    i = e.maxTranslate() - e.minTranslate();
  let { progress: n, isBeginning: r, isEnd: a, progressLoop: o } = e;
  const l = r,
    d = a;
  if (i === 0) (n = 0), (r = !0), (a = !0);
  else {
    n = (t - e.minTranslate()) / i;
    const p = Math.abs(t - e.minTranslate()) < 1,
      c = Math.abs(t - e.maxTranslate()) < 1;
    (r = p || n <= 0), (a = c || n >= 1), p && (n = 0), c && (n = 1);
  }
  if (s.loop) {
    const p = V(
        e.slides.filter(
          (m) => m.getAttribute("data-swiper-slide-index") === "0"
        )[0]
      ),
      c = V(
        e.slides.filter(
          (m) =>
            m.getAttribute("data-swiper-slide-index") * 1 == e.slides.length - 1
        )[0]
      ),
      u = e.slidesGrid[p],
      f = e.slidesGrid[c],
      w = e.slidesGrid[e.slidesGrid.length - 1],
      h = Math.abs(t);
    h >= u ? (o = (h - u) / w) : (o = (h + w - f) / w), o > 1 && (o -= 1);
  }
  Object.assign(e, { progress: n, progressLoop: o, isBeginning: r, isEnd: a }),
    (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
      e.updateSlidesProgress(t),
    r && !l && e.emit("reachBeginning toEdge"),
    a && !d && e.emit("reachEnd toEdge"),
    ((l && !r) || (d && !a)) && e.emit("fromEdge"),
    e.emit("progress", n);
}
function Fe() {
  const t = this,
    { slides: e, params: s, slidesEl: i, activeIndex: n } = t,
    r = t.virtual && s.virtual.enabled,
    a = (l) => O(i, `.${s.slideClass}${l}, swiper-slide${l}`)[0];
  e.forEach((l) => {
    l.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass);
  });
  let o;
  if (r)
    if (s.loop) {
      let l = n - t.virtual.slidesBefore;
      l < 0 && (l = t.virtual.slides.length + l),
        l >= t.virtual.slides.length && (l -= t.virtual.slides.length),
        (o = a(`[data-swiper-slide-index="${l}"]`));
    } else o = a(`[data-swiper-slide-index="${n}"]`);
  else o = e[n];
  if (o) {
    o.classList.add(s.slideActiveClass);
    let l = ye(o, `.${s.slideClass}, swiper-slide`)[0];
    s.loop && !l && (l = e[0]), l && l.classList.add(s.slideNextClass);
    let d = be(o, `.${s.slideClass}, swiper-slide`)[0];
    s.loop && !d === 0 && (d = e[e.length - 1]),
      d && d.classList.add(s.slidePrevClass);
  }
  t.emitSlidesClasses();
}
function _e(t) {
  const { slidesGrid: e, params: s } = t,
    i = t.rtlTranslate ? t.translate : -t.translate;
  let n;
  for (let r = 0; r < e.length; r += 1)
    typeof e[r + 1] != "undefined"
      ? i >= e[r] && i < e[r + 1] - (e[r + 1] - e[r]) / 2
        ? (n = r)
        : i >= e[r] && i < e[r + 1] && (n = r + 1)
      : i >= e[r] && (n = r);
  return (
    s.normalizeSlideIndex && (n < 0 || typeof n == "undefined") && (n = 0), n
  );
}
function He(t) {
  const e = this,
    s = e.rtlTranslate ? e.translate : -e.translate,
    { snapGrid: i, params: n, activeIndex: r, realIndex: a, snapIndex: o } = e;
  let l = t,
    d;
  const p = (u) => {
    let f = u - e.virtual.slidesBefore;
    return (
      f < 0 && (f = e.virtual.slides.length + f),
      f >= e.virtual.slides.length && (f -= e.virtual.slides.length),
      f
    );
  };
  if ((typeof l == "undefined" && (l = _e(e)), i.indexOf(s) >= 0))
    d = i.indexOf(s);
  else {
    const u = Math.min(n.slidesPerGroupSkip, l);
    d = u + Math.floor((l - u) / n.slidesPerGroup);
  }
  if ((d >= i.length && (d = i.length - 1), l === r)) {
    d !== o && ((e.snapIndex = d), e.emit("snapIndexChange")),
      e.params.loop &&
        e.virtual &&
        e.params.virtual.enabled &&
        (e.realIndex = p(l));
    return;
  }
  let c;
  e.virtual && n.virtual.enabled && n.loop
    ? (c = p(l))
    : e.slides[l]
    ? (c = parseInt(
        e.slides[l].getAttribute("data-swiper-slide-index") || l,
        10
      ))
    : (c = l),
    Object.assign(e, {
      snapIndex: d,
      realIndex: c,
      previousIndex: r,
      activeIndex: l,
    }),
    e.emit("activeIndexChange"),
    e.emit("snapIndexChange"),
    a !== c && e.emit("realIndexChange"),
    (e.initialized || e.params.runCallbacksOnInit) && e.emit("slideChange");
}
function Ne(t) {
  const e = this,
    s = e.params,
    i = t.closest(`.${s.slideClass}, swiper-slide`);
  let n = !1,
    r;
  if (i) {
    for (let a = 0; a < e.slides.length; a += 1)
      if (e.slides[a] === i) {
        (n = !0), (r = a);
        break;
      }
  }
  if (i && n)
    (e.clickedSlide = i),
      e.virtual && e.params.virtual.enabled
        ? (e.clickedIndex = parseInt(
            i.getAttribute("data-swiper-slide-index"),
            10
          ))
        : (e.clickedIndex = r);
  else {
    (e.clickedSlide = void 0), (e.clickedIndex = void 0);
    return;
  }
  s.slideToClickedSlide &&
    e.clickedIndex !== void 0 &&
    e.clickedIndex !== e.activeIndex &&
    e.slideToClickedSlide();
}
var We = {
  updateSize: Ae,
  updateSlides: Ge,
  updateAutoHeight: Ve,
  updateSlidesOffset: De,
  updateSlidesProgress: $e,
  updateProgress: Be,
  updateSlidesClasses: Fe,
  updateActiveIndex: He,
  updateClickedSlide: Ne,
};
function Re(t = this.isHorizontal() ? "x" : "y") {
  const e = this,
    { params: s, rtlTranslate: i, translate: n, wrapperEl: r } = e;
  if (s.virtualTranslate) return i ? -n : n;
  if (s.cssMode) return n;
  let a = Se(r, t);
  return i && (a = -a), a || 0;
}
function je(t, e) {
  const s = this,
    { rtlTranslate: i, params: n, wrapperEl: r, progress: a } = s;
  let o = 0,
    l = 0;
  const d = 0;
  s.isHorizontal() ? (o = i ? -t : t) : (l = t),
    n.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
    n.cssMode
      ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
          ? -o
          : -l)
      : n.virtualTranslate ||
        (r.style.transform = `translate3d(${o}px, ${l}px, ${d}px)`),
    (s.previousTranslate = s.translate),
    (s.translate = s.isHorizontal() ? o : l);
  let p;
  const c = s.maxTranslate() - s.minTranslate();
  c === 0 ? (p = 0) : (p = (t - s.minTranslate()) / c),
    p !== a && s.updateProgress(t),
    s.emit("setTranslate", s.translate, e);
}
function Xe() {
  return -this.snapGrid[0];
}
function Ye() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function qe(t = 0, e = this.params.speed, s = !0, i = !0, n) {
  const r = this,
    { params: a, wrapperEl: o } = r;
  if (r.animating && a.preventInteractionOnTransition) return !1;
  const l = r.minTranslate(),
    d = r.maxTranslate();
  let p;
  if (
    (i && t > l ? (p = l) : i && t < d ? (p = d) : (p = t),
    r.updateProgress(p),
    a.cssMode)
  ) {
    const c = r.isHorizontal();
    if (e === 0) o[c ? "scrollLeft" : "scrollTop"] = -p;
    else {
      if (!r.support.smoothScroll)
        return (
          te({ swiper: r, targetPosition: -p, side: c ? "left" : "top" }), !0
        );
      o.scrollTo({ [c ? "left" : "top"]: -p, behavior: "smooth" });
    }
    return !0;
  }
  return (
    e === 0
      ? (r.setTransition(0),
        r.setTranslate(p),
        s && (r.emit("beforeTransitionStart", e, n), r.emit("transitionEnd")))
      : (r.setTransition(e),
        r.setTranslate(p),
        s && (r.emit("beforeTransitionStart", e, n), r.emit("transitionStart")),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (u) {
              !r ||
                r.destroyed ||
                (u.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  (r.onTranslateToWrapperTransitionEnd = null),
                  delete r.onTranslateToWrapperTransitionEnd,
                  s && r.emit("transitionEnd")));
            }),
          r.wrapperEl.addEventListener(
            "transitionend",
            r.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
var Ke = {
  getTranslate: Re,
  setTranslate: je,
  minTranslate: Xe,
  maxTranslate: Ye,
  translateTo: qe,
};
function Ue(t, e) {
  const s = this;
  s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${t}ms`),
    s.emit("setTransition", t, e);
}
function re({ swiper: t, runCallbacks: e, direction: s, step: i }) {
  const { activeIndex: n, previousIndex: r } = t;
  let a = s;
  if (
    (a || (n > r ? (a = "next") : n < r ? (a = "prev") : (a = "reset")),
    t.emit(`transition${i}`),
    e && n !== r)
  ) {
    if (a === "reset") {
      t.emit(`slideResetTransition${i}`);
      return;
    }
    t.emit(`slideChangeTransition${i}`),
      a === "next"
        ? t.emit(`slideNextTransition${i}`)
        : t.emit(`slidePrevTransition${i}`);
  }
}
function Je(t = !0, e) {
  const s = this,
    { params: i } = s;
  i.cssMode ||
    (i.autoHeight && s.updateAutoHeight(),
    re({ swiper: s, runCallbacks: t, direction: e, step: "Start" }));
}
function Qe(t = !0, e) {
  const s = this,
    { params: i } = s;
  (s.animating = !1),
    !i.cssMode &&
      (s.setTransition(0),
      re({ swiper: s, runCallbacks: t, direction: e, step: "End" }));
}
var Ze = { setTransition: Ue, transitionStart: Je, transitionEnd: Qe };
function et(t = 0, e = this.params.speed, s = !0, i, n) {
  typeof t == "string" && (t = parseInt(t, 10));
  const r = this;
  let a = t;
  a < 0 && (a = 0);
  const {
    params: o,
    snapGrid: l,
    slidesGrid: d,
    previousIndex: p,
    activeIndex: c,
    rtlTranslate: u,
    wrapperEl: f,
    enabled: w,
  } = r;
  if ((r.animating && o.preventInteractionOnTransition) || (!w && !i && !n))
    return !1;
  const h = Math.min(r.params.slidesPerGroupSkip, a);
  let m = h + Math.floor((a - h) / r.params.slidesPerGroup);
  m >= l.length && (m = l.length - 1);
  const g = -l[m];
  if (o.normalizeSlideIndex)
    for (let T = 0; T < d.length; T += 1) {
      const b = -Math.floor(g * 100),
        v = Math.floor(d[T] * 100),
        M = Math.floor(d[T + 1] * 100);
      typeof d[T + 1] != "undefined"
        ? b >= v && b < M - (M - v) / 2
          ? (a = T)
          : b >= v && b < M && (a = T + 1)
        : b >= v && (a = T);
    }
  if (
    r.initialized &&
    a !== c &&
    ((!r.allowSlideNext && g < r.translate && g < r.minTranslate()) ||
      (!r.allowSlidePrev &&
        g > r.translate &&
        g > r.maxTranslate() &&
        (c || 0) !== a))
  )
    return !1;
  a !== (p || 0) && s && r.emit("beforeSlideChangeStart"), r.updateProgress(g);
  let y;
  if (
    (a > c ? (y = "next") : a < c ? (y = "prev") : (y = "reset"),
    (u && -g === r.translate) || (!u && g === r.translate))
  )
    return (
      r.updateActiveIndex(a),
      o.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      o.effect !== "slide" && r.setTranslate(g),
      y !== "reset" && (r.transitionStart(s, y), r.transitionEnd(s, y)),
      !1
    );
  if (o.cssMode) {
    const T = r.isHorizontal(),
      b = u ? g : -g;
    if (e === 0) {
      const v = r.virtual && r.params.virtual.enabled;
      v &&
        ((r.wrapperEl.style.scrollSnapType = "none"),
        (r._immediateVirtual = !0)),
        v && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              f[T ? "scrollLeft" : "scrollTop"] = b;
            }))
          : (f[T ? "scrollLeft" : "scrollTop"] = b),
        v &&
          requestAnimationFrame(() => {
            (r.wrapperEl.style.scrollSnapType = ""), (r._immediateVirtual = !1);
          });
    } else {
      if (!r.support.smoothScroll)
        return (
          te({ swiper: r, targetPosition: b, side: T ? "left" : "top" }), !0
        );
      f.scrollTo({ [T ? "left" : "top"]: b, behavior: "smooth" });
    }
    return !0;
  }
  return (
    r.setTransition(e),
    r.setTranslate(g),
    r.updateActiveIndex(a),
    r.updateSlidesClasses(),
    r.emit("beforeTransitionStart", e, i),
    r.transitionStart(s, y),
    e === 0
      ? r.transitionEnd(s, y)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (b) {
            !r ||
              r.destroyed ||
              (b.target === this &&
                (r.wrapperEl.removeEventListener(
                  "transitionend",
                  r.onSlideToWrapperTransitionEnd
                ),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(s, y)));
          }),
        r.wrapperEl.addEventListener(
          "transitionend",
          r.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function tt(t = 0, e = this.params.speed, s = !0, i) {
  typeof t == "string" && (t = parseInt(t, 10));
  const n = this;
  let r = t;
  return (
    n.params.loop &&
      (n.virtual && n.params.virtual.enabled
        ? (r = r + n.virtual.slidesBefore)
        : (r = V(
            n.slides.filter(
              (a) => a.getAttribute("data-swiper-slide-index") * 1 === r
            )[0]
          ))),
    n.slideTo(r, e, s, i)
  );
}
function st(t = this.params.speed, e = !0, s) {
  const i = this,
    { enabled: n, params: r, animating: a } = i;
  if (!n) return i;
  let o = r.slidesPerGroup;
  r.slidesPerView === "auto" &&
    r.slidesPerGroup === 1 &&
    r.slidesPerGroupAuto &&
    (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
  const l = i.activeIndex < r.slidesPerGroupSkip ? 1 : o,
    d = i.virtual && r.virtual.enabled;
  if (r.loop) {
    if (a && !d && r.loopPreventsSliding) return !1;
    i.loopFix({ direction: "next" }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  return r.rewind && i.isEnd
    ? i.slideTo(0, t, e, s)
    : i.slideTo(i.activeIndex + l, t, e, s);
}
function it(t = this.params.speed, e = !0, s) {
  const i = this,
    {
      params: n,
      snapGrid: r,
      slidesGrid: a,
      rtlTranslate: o,
      enabled: l,
      animating: d,
    } = i;
  if (!l) return i;
  const p = i.virtual && n.virtual.enabled;
  if (n.loop) {
    if (d && !p && n.loopPreventsSliding) return !1;
    i.loopFix({ direction: "prev" }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  const c = o ? i.translate : -i.translate;
  function u(g) {
    return g < 0 ? -Math.floor(Math.abs(g)) : Math.floor(g);
  }
  const f = u(c),
    w = r.map((g) => u(g));
  let h = r[w.indexOf(f) - 1];
  if (typeof h == "undefined" && n.cssMode) {
    let g;
    r.forEach((y, T) => {
      f >= y && (g = T);
    }),
      typeof g != "undefined" && (h = r[g > 0 ? g - 1 : g]);
  }
  let m = 0;
  if (
    (typeof h != "undefined" &&
      ((m = a.indexOf(h)),
      m < 0 && (m = i.activeIndex - 1),
      n.slidesPerView === "auto" &&
        n.slidesPerGroup === 1 &&
        n.slidesPerGroupAuto &&
        ((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
        (m = Math.max(m, 0)))),
    n.rewind && i.isBeginning)
  ) {
    const g =
      i.params.virtual && i.params.virtual.enabled && i.virtual
        ? i.virtual.slides.length - 1
        : i.slides.length - 1;
    return i.slideTo(g, t, e, s);
  }
  return i.slideTo(m, t, e, s);
}
function rt(t = this.params.speed, e = !0, s) {
  const i = this;
  return i.slideTo(i.activeIndex, t, e, s);
}
function nt(t = this.params.speed, e = !0, s, i = 0.5) {
  const n = this;
  let r = n.activeIndex;
  const a = Math.min(n.params.slidesPerGroupSkip, r),
    o = a + Math.floor((r - a) / n.params.slidesPerGroup),
    l = n.rtlTranslate ? n.translate : -n.translate;
  if (l >= n.snapGrid[o]) {
    const d = n.snapGrid[o],
      p = n.snapGrid[o + 1];
    l - d > (p - d) * i && (r += n.params.slidesPerGroup);
  } else {
    const d = n.snapGrid[o - 1],
      p = n.snapGrid[o];
    l - d <= (p - d) * i && (r -= n.params.slidesPerGroup);
  }
  return (
    (r = Math.max(r, 0)),
    (r = Math.min(r, n.slidesGrid.length - 1)),
    n.slideTo(r, t, e, s)
  );
}
function at() {
  const t = this,
    { params: e, slidesEl: s } = t,
    i = e.slidesPerView === "auto" ? t.slidesPerViewDynamic() : e.slidesPerView;
  let n = t.clickedIndex,
    r;
  const a = t.isElement ? "swiper-slide" : `.${e.slideClass}`;
  if (e.loop) {
    if (t.animating) return;
    (r = parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
      e.centeredSlides
        ? n < t.loopedSlides - i / 2 ||
          n > t.slides.length - t.loopedSlides + i / 2
          ? (t.loopFix(),
            (n = V(O(s, `${a}[data-swiper-slide-index="${r}"]`)[0])),
            W(() => {
              t.slideTo(n);
            }))
          : t.slideTo(n)
        : n > t.slides.length - i
        ? (t.loopFix(),
          (n = V(O(s, `${a}[data-swiper-slide-index="${r}"]`)[0])),
          W(() => {
            t.slideTo(n);
          }))
        : t.slideTo(n);
  } else t.slideTo(n);
}
var lt = {
  slideTo: et,
  slideToLoop: tt,
  slideNext: st,
  slidePrev: it,
  slideReset: rt,
  slideToClosest: nt,
  slideToClickedSlide: at,
};
function ot(t) {
  const e = this,
    { params: s, slidesEl: i } = e;
  if (!s.loop || (e.virtual && e.params.virtual.enabled)) return;
  O(i, `.${s.slideClass}, swiper-slide`).forEach((r, a) => {
    r.setAttribute("data-swiper-slide-index", a);
  }),
    e.loopFix({
      slideRealIndex: t,
      direction: s.centeredSlides ? void 0 : "next",
    });
}
function dt({
  slideRealIndex: t,
  slideTo: e = !0,
  direction: s,
  setTranslate: i,
  activeSlideIndex: n,
  byController: r,
} = {}) {
  const a = this;
  if (!a.params.loop) return;
  a.emit("beforeLoopFix");
  const {
    slides: o,
    allowSlidePrev: l,
    allowSlideNext: d,
    slidesEl: p,
    params: c,
  } = a;
  if (
    ((a.allowSlidePrev = !0),
    (a.allowSlideNext = !0),
    a.virtual && c.virtual.enabled)
  ) {
    e &&
      (!c.centeredSlides && a.snapIndex === 0
        ? a.slideTo(a.virtual.slides.length, 0, !1, !0)
        : c.centeredSlides && a.snapIndex < c.slidesPerView
        ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0)
        : a.snapIndex === a.snapGrid.length - 1 &&
          a.slideTo(a.virtual.slidesBefore, 0, !1, !0)),
      (a.allowSlidePrev = l),
      (a.allowSlideNext = d),
      a.emit("loopFix");
    return;
  }
  const u =
    c.slidesPerView === "auto"
      ? a.slidesPerViewDynamic()
      : Math.ceil(parseFloat(c.slidesPerView, 10));
  let f = c.loopedSlides || u;
  f % c.slidesPerGroup != 0 && (f += c.slidesPerGroup - (f % c.slidesPerGroup)),
    (a.loopedSlides = f);
  const w = [],
    h = [];
  let m = a.activeIndex;
  typeof n == "undefined"
    ? (n = V(
        a.slides.filter((v) => v.classList.contains("swiper-slide-active"))[0]
      ))
    : (m = n);
  const g = s === "next" || !s,
    y = s === "prev" || !s;
  let T = 0,
    b = 0;
  if (n < f) {
    T = f - n;
    for (let v = 0; v < f - n; v += 1) {
      const M = v - Math.floor(v / o.length) * o.length;
      w.push(o.length - M - 1);
    }
  } else if (n > a.slides.length - f * 2) {
    b = n - (a.slides.length - f * 2);
    for (let v = 0; v < b; v += 1) {
      const M = v - Math.floor(v / o.length) * o.length;
      h.push(M);
    }
  }
  if (
    (y &&
      w.forEach((v) => {
        p.prepend(a.slides[v]);
      }),
    g &&
      h.forEach((v) => {
        p.append(a.slides[v]);
      }),
    a.recalcSlides(),
    c.watchSlidesProgress && a.updateSlidesOffset(),
    e)
  ) {
    if (w.length > 0 && y)
      if (typeof t == "undefined") {
        const v = a.slidesGrid[m],
          k = a.slidesGrid[m + T] - v;
        a.slideTo(m + T, 0, !1, !0),
          i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += k);
      } else i && a.slideToLoop(t, 0, !1, !0);
    else if (h.length > 0 && g)
      if (typeof t == "undefined") {
        const v = a.slidesGrid[m],
          k = a.slidesGrid[m - b] - v;
        a.slideTo(m - b, 0, !1, !0),
          i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += k);
      } else a.slideToLoop(t, 0, !1, !0);
  }
  if (
    ((a.allowSlidePrev = l),
    (a.allowSlideNext = d),
    a.controller && a.controller.control && !r)
  ) {
    const v = {
      slideRealIndex: t,
      slideTo: !1,
      direction: s,
      setTranslate: i,
      activeSlideIndex: n,
      byController: !0,
    };
    Array.isArray(a.controller.control)
      ? a.controller.control.forEach((M) => {
          M.params.loop && M.loopFix(v);
        })
      : a.controller.control instanceof a.constructor &&
        a.controller.control.params.loop &&
        a.controller.control.loopFix(v);
  }
  a.emit("loopFix");
}
function ct() {
  const t = this,
    { slides: e, params: s, slidesEl: i } = t;
  if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
  t.recalcSlides();
  const n = [];
  e.forEach((r) => {
    const a =
      typeof r.swiperSlideIndex == "undefined"
        ? r.getAttribute("data-swiper-slide-index") * 1
        : r.swiperSlideIndex;
    n[a] = r;
  }),
    e.forEach((r) => {
      r.removeAttribute("data-swiper-slide-index");
    }),
    n.forEach((r) => {
      i.append(r);
    }),
    t.recalcSlides(),
    t.slideTo(t.realIndex, 0);
}
var ft = { loopCreate: ot, loopFix: dt, loopDestroy: ct };
function ut(t) {
  const e = this;
  if (
    !e.params.simulateTouch ||
    (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode
  )
    return;
  const s = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
  (s.style.cursor = "move"), (s.style.cursor = t ? "grabbing" : "grab");
}
function pt() {
  const t = this;
  (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode ||
    (t[
      t.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = "");
}
var ht = { setGrabCursor: ut, unsetGrabCursor: pt };
function mt(t, e = this) {
  function s(i) {
    if (!i || i === G() || i === C()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const n = i.closest(t);
    return !n && !i.getRootNode ? null : n || s(i.getRootNode().host);
  }
  return s(e);
}
function gt(t) {
  const e = this,
    s = G(),
    i = C(),
    n = e.touchEventsData;
  n.evCache.push(t);
  const { params: r, touches: a, enabled: o } = e;
  if (
    !o ||
    (!r.simulateTouch && t.pointerType === "mouse") ||
    (e.animating && r.preventInteractionOnTransition)
  )
    return;
  !e.animating && r.cssMode && r.loop && e.loopFix();
  let l = t;
  l.originalEvent && (l = l.originalEvent);
  let d = l.target;
  if (
    (r.touchEventsTarget === "wrapper" && !e.wrapperEl.contains(d)) ||
    ("which" in l && l.which === 3) ||
    ("button" in l && l.button > 0) ||
    (n.isTouched && n.isMoved)
  )
    return;
  const p = !!r.noSwipingClass && r.noSwipingClass !== "",
    c = t.composedPath ? t.composedPath() : t.path;
  p && l.target && l.target.shadowRoot && c && (d = c[0]);
  const u = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    f = !!(l.target && l.target.shadowRoot);
  if (r.noSwiping && (f ? mt(u, d) : d.closest(u))) {
    e.allowClick = !0;
    return;
  }
  if (r.swipeHandler && !d.closest(r.swipeHandler)) return;
  (a.currentX = l.pageX), (a.currentY = l.pageY);
  const w = a.currentX,
    h = a.currentY,
    m = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
    g = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
  if (m && (w <= g || w >= i.innerWidth - g))
    if (m === "prevent") t.preventDefault();
    else return;
  Object.assign(n, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (a.startX = w),
    (a.startY = h),
    (n.touchStartTime = D()),
    (e.allowClick = !0),
    e.updateSize(),
    (e.swipeDirection = void 0),
    r.threshold > 0 && (n.allowThresholdMove = !1);
  let y = !0;
  d.matches(n.focusableElements) &&
    ((y = !1), d.nodeName === "SELECT" && (n.isTouched = !1)),
    s.activeElement &&
      s.activeElement.matches(n.focusableElements) &&
      s.activeElement !== d &&
      s.activeElement.blur();
  const T = y && e.allowTouchMove && r.touchStartPreventDefault;
  (r.touchStartForcePreventDefault || T) &&
    !d.isContentEditable &&
    l.preventDefault(),
    e.params.freeMode &&
      e.params.freeMode.enabled &&
      e.freeMode &&
      e.animating &&
      !r.cssMode &&
      e.freeMode.onTouchStart(),
    e.emit("touchStart", l);
}
function vt(t) {
  const e = G(),
    s = this,
    i = s.touchEventsData,
    { params: n, touches: r, rtlTranslate: a, enabled: o } = s;
  if (!o || (!n.simulateTouch && t.pointerType === "mouse")) return;
  let l = t;
  if ((l.originalEvent && (l = l.originalEvent), !i.isTouched)) {
    i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", l);
    return;
  }
  const d = i.evCache.findIndex((M) => M.pointerId === l.pointerId);
  d >= 0 && (i.evCache[d] = l);
  const p = i.evCache.length > 1 ? i.evCache[0] : l,
    c = p.pageX,
    u = p.pageY;
  if (l.preventedByNestedSwiper) {
    (r.startX = c), (r.startY = u);
    return;
  }
  if (!s.allowTouchMove) {
    l.target.matches(i.focusableElements) || (s.allowClick = !1),
      i.isTouched &&
        (Object.assign(r, {
          startX: c,
          startY: u,
          prevX: s.touches.currentX,
          prevY: s.touches.currentY,
          currentX: c,
          currentY: u,
        }),
        (i.touchStartTime = D()));
    return;
  }
  if (n.touchReleaseOnEdges && !n.loop) {
    if (s.isVertical()) {
      if (
        (u < r.startY && s.translate <= s.maxTranslate()) ||
        (u > r.startY && s.translate >= s.minTranslate())
      ) {
        (i.isTouched = !1), (i.isMoved = !1);
        return;
      }
    } else if (
      (c < r.startX && s.translate <= s.maxTranslate()) ||
      (c > r.startX && s.translate >= s.minTranslate())
    )
      return;
  }
  if (
    e.activeElement &&
    l.target === e.activeElement &&
    l.target.matches(i.focusableElements)
  ) {
    (i.isMoved = !0), (s.allowClick = !1);
    return;
  }
  if (
    (i.allowTouchCallbacks && s.emit("touchMove", l),
    l.targetTouches && l.targetTouches.length > 1)
  )
    return;
  (r.currentX = c), (r.currentY = u);
  const f = r.currentX - r.startX,
    w = r.currentY - r.startY;
  if (s.params.threshold && Math.sqrt(f ** 2 + w ** 2) < s.params.threshold)
    return;
  if (typeof i.isScrolling == "undefined") {
    let M;
    (s.isHorizontal() && r.currentY === r.startY) ||
    (s.isVertical() && r.currentX === r.startX)
      ? (i.isScrolling = !1)
      : f * f + w * w >= 25 &&
        ((M = (Math.atan2(Math.abs(w), Math.abs(f)) * 180) / Math.PI),
        (i.isScrolling = s.isHorizontal()
          ? M > n.touchAngle
          : 90 - M > n.touchAngle));
  }
  if (
    (i.isScrolling && s.emit("touchMoveOpposite", l),
    typeof i.startMoving == "undefined" &&
      (r.currentX !== r.startX || r.currentY !== r.startY) &&
      (i.startMoving = !0),
    i.isScrolling ||
      (s.zoom &&
        s.params.zoom &&
        s.params.zoom.enabled &&
        i.evCache.length > 1))
  ) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving) return;
  (s.allowClick = !1),
    !n.cssMode && l.cancelable && l.preventDefault(),
    n.touchMoveStopPropagation && !n.nested && l.stopPropagation();
  let h = s.isHorizontal() ? f : w,
    m = s.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
  n.oneWayMovement &&
    ((h = Math.abs(h) * (a ? 1 : -1)), (m = Math.abs(m) * (a ? 1 : -1))),
    (r.diff = h),
    (h *= n.touchRatio),
    a && ((h = -h), (m = -m));
  const g = s.touchesDirection;
  (s.swipeDirection = h > 0 ? "prev" : "next"),
    (s.touchesDirection = m > 0 ? "prev" : "next");
  const y =
    s.params.loop && !(s.virtual && s.params.virtual.enabled) && !n.cssMode;
  if (!i.isMoved) {
    if (
      (y && s.loopFix({ direction: s.swipeDirection }),
      (i.startTranslate = s.getTranslate()),
      s.setTransition(0),
      s.animating)
    ) {
      const M = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
      });
      s.wrapperEl.dispatchEvent(M);
    }
    (i.allowMomentumBounce = !1),
      n.grabCursor &&
        (s.allowSlideNext === !0 || s.allowSlidePrev === !0) &&
        s.setGrabCursor(!0),
      s.emit("sliderFirstMove", l);
  }
  let T;
  i.isMoved &&
    g !== s.touchesDirection &&
    y &&
    Math.abs(h) >= 1 &&
    (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), (T = !0)),
    s.emit("sliderMove", l),
    (i.isMoved = !0),
    (i.currentTranslate = h + i.startTranslate);
  let b = !0,
    v = n.resistanceRatio;
  if (
    (n.touchReleaseOnEdges && (v = 0),
    h > 0
      ? (y &&
          !T &&
          i.currentTranslate >
            (n.centeredSlides
              ? s.minTranslate() - s.size / 2
              : s.minTranslate()) &&
          s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        i.currentTranslate > s.minTranslate() &&
          ((b = !1),
          n.resistance &&
            (i.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + i.startTranslate + h) ** v)))
      : h < 0 &&
        (y &&
          !T &&
          i.currentTranslate <
            (n.centeredSlides
              ? s.maxTranslate() + s.size / 2
              : s.maxTranslate()) &&
          s.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex:
              s.slides.length -
              (n.slidesPerView === "auto"
                ? s.slidesPerViewDynamic()
                : Math.ceil(parseFloat(n.slidesPerView, 10))),
          }),
        i.currentTranslate < s.maxTranslate() &&
          ((b = !1),
          n.resistance &&
            (i.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - i.startTranslate - h) ** v))),
    b && (l.preventedByNestedSwiper = !0),
    !s.allowSlideNext &&
      s.swipeDirection === "next" &&
      i.currentTranslate < i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !s.allowSlidePrev &&
      s.swipeDirection === "prev" &&
      i.currentTranslate > i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !s.allowSlidePrev &&
      !s.allowSlideNext &&
      (i.currentTranslate = i.startTranslate),
    n.threshold > 0)
  )
    if (Math.abs(h) > n.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        (i.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (i.currentTranslate = i.startTranslate),
          (r.diff = s.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY);
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !n.followFinger ||
    n.cssMode ||
    (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
      n.watchSlidesProgress) &&
      (s.updateActiveIndex(), s.updateSlidesClasses()),
    s.params.freeMode &&
      n.freeMode.enabled &&
      s.freeMode &&
      s.freeMode.onTouchMove(),
    s.updateProgress(i.currentTranslate),
    s.setTranslate(i.currentTranslate));
}
function wt(t) {
  const e = this,
    s = e.touchEventsData,
    i = s.evCache.findIndex((T) => T.pointerId === t.pointerId);
  if (
    (i >= 0 && s.evCache.splice(i, 1),
    ["pointercancel", "pointerout", "pointerleave"].includes(t.type))
  )
    return;
  const {
    params: n,
    touches: r,
    rtlTranslate: a,
    slidesGrid: o,
    enabled: l,
  } = e;
  if (!l || (!n.simulateTouch && t.pointerType === "mouse")) return;
  let d = t;
  if (
    (d.originalEvent && (d = d.originalEvent),
    s.allowTouchCallbacks && e.emit("touchEnd", d),
    (s.allowTouchCallbacks = !1),
    !s.isTouched)
  ) {
    s.isMoved && n.grabCursor && e.setGrabCursor(!1),
      (s.isMoved = !1),
      (s.startMoving = !1);
    return;
  }
  n.grabCursor &&
    s.isMoved &&
    s.isTouched &&
    (e.allowSlideNext === !0 || e.allowSlidePrev === !0) &&
    e.setGrabCursor(!1);
  const p = D(),
    c = p - s.touchStartTime;
  if (e.allowClick) {
    const T = d.path || (d.composedPath && d.composedPath());
    e.updateClickedSlide((T && T[0]) || d.target),
      e.emit("tap click", d),
      c < 300 &&
        p - s.lastClickTime < 300 &&
        e.emit("doubleTap doubleClick", d);
  }
  if (
    ((s.lastClickTime = D()),
    W(() => {
      e.destroyed || (e.allowClick = !0);
    }),
    !s.isTouched ||
      !s.isMoved ||
      !e.swipeDirection ||
      r.diff === 0 ||
      s.currentTranslate === s.startTranslate)
  ) {
    (s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1);
    return;
  }
  (s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1);
  let u;
  if (
    (n.followFinger
      ? (u = a ? e.translate : -e.translate)
      : (u = -s.currentTranslate),
    n.cssMode)
  )
    return;
  if (e.params.freeMode && n.freeMode.enabled) {
    e.freeMode.onTouchEnd({ currentPos: u });
    return;
  }
  let f = 0,
    w = e.slidesSizesGrid[0];
  for (
    let T = 0;
    T < o.length;
    T += T < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
  ) {
    const b = T < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    typeof o[T + b] != "undefined"
      ? u >= o[T] && u < o[T + b] && ((f = T), (w = o[T + b] - o[T]))
      : u >= o[T] && ((f = T), (w = o[o.length - 1] - o[o.length - 2]));
  }
  let h = null,
    m = null;
  n.rewind &&
    (e.isBeginning
      ? (m =
          e.params.virtual && e.params.virtual.enabled && e.virtual
            ? e.virtual.slides.length - 1
            : e.slides.length - 1)
      : e.isEnd && (h = 0));
  const g = (u - o[f]) / w,
    y = f < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
  if (c > n.longSwipesMs) {
    if (!n.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === "next" &&
      (g >= n.longSwipesRatio
        ? e.slideTo(n.rewind && e.isEnd ? h : f + y)
        : e.slideTo(f)),
      e.swipeDirection === "prev" &&
        (g > 1 - n.longSwipesRatio
          ? e.slideTo(f + y)
          : m !== null && g < 0 && Math.abs(g) > n.longSwipesRatio
          ? e.slideTo(m)
          : e.slideTo(f));
  } else {
    if (!n.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation &&
    (d.target === e.navigation.nextEl || d.target === e.navigation.prevEl)
      ? d.target === e.navigation.nextEl
        ? e.slideTo(f + y)
        : e.slideTo(f)
      : (e.swipeDirection === "next" && e.slideTo(h !== null ? h : f + y),
        e.swipeDirection === "prev" && e.slideTo(m !== null ? m : f));
  }
}
let ne;
function ae() {
  const t = this,
    { params: e, el: s } = t;
  if (s && s.offsetWidth === 0) return;
  e.breakpoints && t.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = t,
    a = t.virtual && t.params.virtual.enabled;
  (t.allowSlideNext = !0),
    (t.allowSlidePrev = !0),
    t.updateSize(),
    t.updateSlides(),
    t.updateSlidesClasses();
  const o = a && e.loop;
  (e.slidesPerView === "auto" || e.slidesPerView > 1) &&
  t.isEnd &&
  !t.isBeginning &&
  !t.params.centeredSlides &&
  !o
    ? t.slideTo(t.slides.length - 1, 0, !1, !0)
    : t.params.loop && !a
    ? t.slideToLoop(t.realIndex, 0, !1, !0)
    : t.slideTo(t.activeIndex, 0, !1, !0),
    t.autoplay &&
      t.autoplay.running &&
      t.autoplay.paused &&
      (clearTimeout(ne),
      (ne = setTimeout(() => {
        t.autoplay.resume();
      }, 300))),
    (t.allowSlidePrev = n),
    (t.allowSlideNext = i),
    t.params.watchOverflow && r !== t.snapGrid && t.checkOverflow();
}
function St(t) {
  const e = this;
  !e.enabled ||
    e.allowClick ||
    (e.params.preventClicks && t.preventDefault(),
    e.params.preventClicksPropagation &&
      e.animating &&
      (t.stopPropagation(), t.stopImmediatePropagation()));
}
function Tt() {
  const t = this,
    { wrapperEl: e, rtlTranslate: s, enabled: i } = t;
  if (!i) return;
  (t.previousTranslate = t.translate),
    t.isHorizontal()
      ? (t.translate = -e.scrollLeft)
      : (t.translate = -e.scrollTop),
    t.translate === 0 && (t.translate = 0),
    t.updateActiveIndex(),
    t.updateSlidesClasses();
  let n;
  const r = t.maxTranslate() - t.minTranslate();
  r === 0 ? (n = 0) : (n = (t.translate - t.minTranslate()) / r),
    n !== t.progress && t.updateProgress(s ? -t.translate : t.translate),
    t.emit("setTranslate", t.translate, !1);
}
const F = (t, e) => {
  const s = () => (t.isElement ? "swiper-slide" : `.${t.params.slideClass}`),
    i = e.closest(s());
  if (i) {
    const n = i.querySelector(`.${t.params.lazyPreloaderClass}`);
    n && n.remove();
  }
};
function xt(t) {
  const e = this;
  F(e, t.target), e.update();
}
let le = !1;
function bt() {}
const oe = (t, e) => {
  const s = G(),
    { params: i, el: n, wrapperEl: r, device: a } = t,
    o = !!i.nested,
    l = e === "on" ? "addEventListener" : "removeEventListener",
    d = e;
  n[l]("pointerdown", t.onTouchStart, { passive: !1 }),
    s[l]("pointermove", t.onTouchMove, { passive: !1, capture: o }),
    s[l]("pointerup", t.onTouchEnd, { passive: !0 }),
    s[l]("pointercancel", t.onTouchEnd, { passive: !0 }),
    s[l]("pointerout", t.onTouchEnd, { passive: !0 }),
    s[l]("pointerleave", t.onTouchEnd, { passive: !0 }),
    (i.preventClicks || i.preventClicksPropagation) &&
      n[l]("click", t.onClick, !0),
    i.cssMode && r[l]("scroll", t.onScroll),
    i.updateOnWindowResize
      ? t[d](
          a.ios || a.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          ae,
          !0
        )
      : t[d]("observerUpdate", ae, !0),
    n[l]("load", t.onLoad, { capture: !0 });
};
function yt() {
  const t = this,
    e = G(),
    { params: s } = t;
  (t.onTouchStart = gt.bind(t)),
    (t.onTouchMove = vt.bind(t)),
    (t.onTouchEnd = wt.bind(t)),
    s.cssMode && (t.onScroll = Tt.bind(t)),
    (t.onClick = St.bind(t)),
    (t.onLoad = xt.bind(t)),
    le || (e.addEventListener("touchstart", bt), (le = !0)),
    oe(t, "on");
}
function Et() {
  oe(this, "off");
}
var Mt = { attachEvents: yt, detachEvents: Et };
const de = (t, e) => t.grid && e.grid && e.grid.rows > 1;
function Pt() {
  const t = this,
    { realIndex: e, initialized: s, params: i, el: n } = t,
    r = i.breakpoints;
  if (!r || (r && Object.keys(r).length === 0)) return;
  const a = t.getBreakpoint(r, t.params.breakpointsBase, t.el);
  if (!a || t.currentBreakpoint === a) return;
  const l = (a in r ? r[a] : void 0) || t.originalParams,
    d = de(t, i),
    p = de(t, l),
    c = i.enabled;
  d && !p
    ? (n.classList.remove(
        `${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`
      ),
      t.emitContainerClasses())
    : !d &&
      p &&
      (n.classList.add(`${i.containerModifierClass}grid`),
      ((l.grid.fill && l.grid.fill === "column") ||
        (!l.grid.fill && i.grid.fill === "column")) &&
        n.classList.add(`${i.containerModifierClass}grid-column`),
      t.emitContainerClasses()),
    ["navigation", "pagination", "scrollbar"].forEach((h) => {
      const m = i[h] && i[h].enabled,
        g = l[h] && l[h].enabled;
      m && !g && t[h].disable(), !m && g && t[h].enable();
    });
  const u = l.direction && l.direction !== i.direction,
    f = i.loop && (l.slidesPerView !== i.slidesPerView || u);
  u && s && t.changeDirection(), L(t.params, l);
  const w = t.params.enabled;
  Object.assign(t, {
    allowTouchMove: t.params.allowTouchMove,
    allowSlideNext: t.params.allowSlideNext,
    allowSlidePrev: t.params.allowSlidePrev,
  }),
    c && !w ? t.disable() : !c && w && t.enable(),
    (t.currentBreakpoint = a),
    t.emit("_beforeBreakpoint", l),
    f && s && (t.loopDestroy(), t.loopCreate(e), t.updateSlides()),
    t.emit("breakpoint", l);
}
function Ct(t, e = "window", s) {
  if (!t || (e === "container" && !s)) return;
  let i = !1;
  const n = C(),
    r = e === "window" ? n.innerHeight : s.clientHeight,
    a = Object.keys(t).map((o) => {
      if (typeof o == "string" && o.indexOf("@") === 0) {
        const l = parseFloat(o.substr(1));
        return { value: r * l, point: o };
      }
      return { value: o, point: o };
    });
  a.sort((o, l) => parseInt(o.value, 10) - parseInt(l.value, 10));
  for (let o = 0; o < a.length; o += 1) {
    const { point: l, value: d } = a[o];
    e === "window"
      ? n.matchMedia(`(min-width: ${d}px)`).matches && (i = l)
      : d <= s.clientWidth && (i = l);
  }
  return i || "max";
}
var Lt = { setBreakpoint: Pt, getBreakpoint: Ct };
function It(t, e) {
  const s = [];
  return (
    t.forEach((i) => {
      typeof i == "object"
        ? Object.keys(i).forEach((n) => {
            i[n] && s.push(e + n);
          })
        : typeof i == "string" && s.push(e + i);
    }),
    s
  );
}
function zt() {
  const t = this,
    { classNames: e, params: s, rtl: i, el: n, device: r } = t,
    a = It(
      [
        "initialized",
        s.direction,
        { "free-mode": t.params.freeMode && s.freeMode.enabled },
        { autoheight: s.autoHeight },
        { rtl: i },
        { grid: s.grid && s.grid.rows > 1 },
        {
          "grid-column": s.grid && s.grid.rows > 1 && s.grid.fill === "column",
        },
        { android: r.android },
        { ios: r.ios },
        { "css-mode": s.cssMode },
        { centered: s.cssMode && s.centeredSlides },
        { "watch-progress": s.watchSlidesProgress },
      ],
      s.containerModifierClass
    );
  e.push(...a), n.classList.add(...e), t.emitContainerClasses();
}
function Ot() {
  const t = this,
    { el: e, classNames: s } = t;
  e.classList.remove(...s), t.emitContainerClasses();
}
var kt = { addClasses: zt, removeClasses: Ot };
function At() {
  const t = this,
    { isLocked: e, params: s } = t,
    { slidesOffsetBefore: i } = s;
  if (i) {
    const n = t.slides.length - 1,
      r = t.slidesGrid[n] + t.slidesSizesGrid[n] + i * 2;
    t.isLocked = t.size > r;
  } else t.isLocked = t.snapGrid.length === 1;
  s.allowSlideNext === !0 && (t.allowSlideNext = !t.isLocked),
    s.allowSlidePrev === !0 && (t.allowSlidePrev = !t.isLocked),
    e && e !== t.isLocked && (t.isEnd = !1),
    e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock");
}
var Gt = { checkOverflow: At },
  ce = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function Vt(t, e) {
  return function (i = {}) {
    const n = Object.keys(i)[0],
      r = i[n];
    if (typeof r != "object" || r === null) {
      L(e, i);
      return;
    }
    if (
      (["navigation", "pagination", "scrollbar"].indexOf(n) >= 0 &&
        t[n] === !0 &&
        (t[n] = { auto: !0 }),
      !(n in t && "enabled" in r))
    ) {
      L(e, i);
      return;
    }
    t[n] === !0 && (t[n] = { enabled: !0 }),
      typeof t[n] == "object" && !("enabled" in t[n]) && (t[n].enabled = !0),
      t[n] || (t[n] = { enabled: !1 }),
      L(e, i);
  };
}
const Y = {
    eventsEmitter: ke,
    update: We,
    translate: Ke,
    transition: Ze,
    slide: lt,
    loop: ft,
    grabCursor: ht,
    events: Mt,
    breakpoints: Lt,
    checkOverflow: Gt,
    classes: kt,
  },
  q = {};
class I {
  constructor(...e) {
    let s, i;
    e.length === 1 &&
    e[0].constructor &&
    Object.prototype.toString.call(e[0]).slice(8, -1) === "Object"
      ? (i = e[0])
      : ([s, i] = e),
      i || (i = {}),
      (i = L({}, i)),
      s && !i.el && (i.el = s);
    const n = G();
    if (
      i.el &&
      typeof i.el == "string" &&
      n.querySelectorAll(i.el).length > 1
    ) {
      const l = [];
      return (
        n.querySelectorAll(i.el).forEach((d) => {
          const p = L({}, i, { el: d });
          l.push(new I(p));
        }),
        l
      );
    }
    const r = this;
    (r.__swiper__ = !0),
      (r.support = ie()),
      (r.device = Ce({ userAgent: i.userAgent })),
      (r.browser = Ie()),
      (r.eventsListeners = {}),
      (r.eventsAnyListeners = []),
      (r.modules = [...r.__modules__]),
      i.modules && Array.isArray(i.modules) && r.modules.push(...i.modules);
    const a = {};
    r.modules.forEach((l) => {
      l({
        params: i,
        swiper: r,
        extendParams: Vt(i, a),
        on: r.on.bind(r),
        once: r.once.bind(r),
        off: r.off.bind(r),
        emit: r.emit.bind(r),
      });
    });
    const o = L({}, ce, a);
    return (
      (r.params = L({}, o, q, i)),
      (r.originalParams = L({}, r.params)),
      (r.passedParams = L({}, i)),
      r.params &&
        r.params.on &&
        Object.keys(r.params.on).forEach((l) => {
          r.on(l, r.params.on[l]);
        }),
      r.params && r.params.onAny && r.onAny(r.params.onAny),
      Object.assign(r, {
        enabled: r.params.enabled,
        el: s,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return r.params.direction === "horizontal";
        },
        isVertical() {
          return r.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        allowSlideNext: r.params.allowSlideNext,
        allowSlidePrev: r.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: r.params.focusableElements,
          lastClickTime: D(),
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: [],
        },
        allowClick: !0,
        allowTouchMove: r.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      r.emit("_swiper"),
      r.params.init && r.init(),
      r
    );
  }
  recalcSlides() {
    const e = this,
      { slidesEl: s, params: i } = e;
    e.slides = O(s, `.${i.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit("enable"));
  }
  disable() {
    const e = this;
    !e.enabled ||
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit("disable"));
  }
  setProgress(e, s) {
    const i = this;
    e = Math.min(Math.max(e, 0), 1);
    const n = i.minTranslate(),
      a = (i.maxTranslate() - n) * e + n;
    i.translateTo(a, typeof s == "undefined" ? 0 : s),
      i.updateActiveIndex(),
      i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const s = e.el.className
      .split(" ")
      .filter(
        (i) =>
          i.indexOf("swiper") === 0 ||
          i.indexOf(e.params.containerModifierClass) === 0
      );
    e.emit("_containerClasses", s.join(" "));
  }
  getSlideClasses(e) {
    const s = this;
    return s.destroyed
      ? ""
      : e.className
          .split(" ")
          .filter(
            (i) =>
              i.indexOf("swiper-slide") === 0 ||
              i.indexOf(s.params.slideClass) === 0
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const s = [];
    e.slides.forEach((i) => {
      const n = e.getSlideClasses(i);
      s.push({ slideEl: i, classNames: n }), e.emit("_slideClass", i, n);
    }),
      e.emit("_slideClasses", s);
  }
  slidesPerViewDynamic(e = "current", s = !1) {
    const i = this,
      {
        params: n,
        slides: r,
        slidesGrid: a,
        slidesSizesGrid: o,
        size: l,
        activeIndex: d,
      } = i;
    let p = 1;
    if (n.centeredSlides) {
      let c = r[d].swiperSlideSize,
        u;
      for (let f = d + 1; f < r.length; f += 1)
        r[f] &&
          !u &&
          ((c += r[f].swiperSlideSize), (p += 1), c > l && (u = !0));
      for (let f = d - 1; f >= 0; f -= 1)
        r[f] &&
          !u &&
          ((c += r[f].swiperSlideSize), (p += 1), c > l && (u = !0));
    } else if (e === "current")
      for (let c = d + 1; c < r.length; c += 1)
        (s ? a[c] + o[c] - a[d] < l : a[c] - a[d] < l) && (p += 1);
    else for (let c = d - 1; c >= 0; c -= 1) a[d] - a[c] < l && (p += 1);
    return p;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: s, params: i } = e;
    i.breakpoints && e.setBreakpoint(),
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach((a) => {
        a.complete && F(e, a);
      }),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses();
    function n() {
      const a = e.rtlTranslate ? e.translate * -1 : e.translate,
        o = Math.min(Math.max(a, e.maxTranslate()), e.minTranslate());
      e.setTranslate(o), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let r;
    e.params.freeMode && e.params.freeMode.enabled
      ? (n(), e.params.autoHeight && e.updateAutoHeight())
      : ((e.params.slidesPerView === "auto" || e.params.slidesPerView > 1) &&
        e.isEnd &&
        !e.params.centeredSlides
          ? (r = e.slideTo(e.slides.length - 1, 0, !1, !0))
          : (r = e.slideTo(e.activeIndex, 0, !1, !0)),
        r || n()),
      i.watchOverflow && s !== e.snapGrid && e.checkOverflow(),
      e.emit("update");
  }
  changeDirection(e, s = !0) {
    const i = this,
      n = i.params.direction;
    return (
      e || (e = n === "horizontal" ? "vertical" : "horizontal"),
      e === n ||
        (e !== "horizontal" && e !== "vertical") ||
        (i.el.classList.remove(`${i.params.containerModifierClass}${n}`),
        i.el.classList.add(`${i.params.containerModifierClass}${e}`),
        i.emitContainerClasses(),
        (i.params.direction = e),
        i.slides.forEach((r) => {
          e === "vertical" ? (r.style.width = "") : (r.style.height = "");
        }),
        i.emit("changeDirection"),
        s && i.update()),
      i
    );
  }
  changeLanguageDirection(e) {
    const s = this;
    (s.rtl && e === "rtl") ||
      (!s.rtl && e === "ltr") ||
      ((s.rtl = e === "rtl"),
      (s.rtlTranslate = s.params.direction === "horizontal" && s.rtl),
      s.rtl
        ? (s.el.classList.add(`${s.params.containerModifierClass}rtl`),
          (s.el.dir = "rtl"))
        : (s.el.classList.remove(`${s.params.containerModifierClass}rtl`),
          (s.el.dir = "ltr")),
      s.update());
  }
  mount(e) {
    const s = this;
    if (s.mounted) return !0;
    let i = e || s.params.el;
    if ((typeof i == "string" && (i = document.querySelector(i)), !i))
      return !1;
    (i.swiper = s), i.shadowEl && (s.isElement = !0);
    const n = () =>
      `.${(s.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let a = (() =>
      i && i.shadowRoot && i.shadowRoot.querySelector
        ? i.shadowRoot.querySelector(n())
        : O(i, n())[0])();
    return (
      !a &&
        s.params.createElements &&
        ((a = xe("div", s.params.wrapperClass)),
        i.append(a),
        O(i, `.${s.params.slideClass}`).forEach((o) => {
          a.append(o);
        })),
      Object.assign(s, {
        el: i,
        wrapperEl: a,
        slidesEl: s.isElement ? i : a,
        mounted: !0,
        rtl: i.dir.toLowerCase() === "rtl" || A(i, "direction") === "rtl",
        rtlTranslate:
          s.params.direction === "horizontal" &&
          (i.dir.toLowerCase() === "rtl" || A(i, "direction") === "rtl"),
        wrongRTL: A(a, "display") === "-webkit-box",
      }),
      !0
    );
  }
  init(e) {
    const s = this;
    return (
      s.initialized ||
        s.mount(e) === !1 ||
        (s.emit("beforeInit"),
        s.params.breakpoints && s.setBreakpoint(),
        s.addClasses(),
        s.updateSize(),
        s.updateSlides(),
        s.params.watchOverflow && s.checkOverflow(),
        s.params.grabCursor && s.enabled && s.setGrabCursor(),
        s.params.loop && s.virtual && s.params.virtual.enabled
          ? s.slideTo(
              s.params.initialSlide + s.virtual.slidesBefore,
              0,
              s.params.runCallbacksOnInit,
              !1,
              !0
            )
          : s.slideTo(
              s.params.initialSlide,
              0,
              s.params.runCallbacksOnInit,
              !1,
              !0
            ),
        s.params.loop && s.loopCreate(),
        s.attachEvents(),
        [...s.el.querySelectorAll('[loading="lazy"]')].forEach((n) => {
          n.complete
            ? F(s, n)
            : n.addEventListener("load", (r) => {
                F(s, r.target);
              });
        }),
        (s.initialized = !0),
        s.emit("init"),
        s.emit("afterInit")),
      s
    );
  }
  destroy(e = !0, s = !0) {
    const i = this,
      { params: n, el: r, wrapperEl: a, slides: o } = i;
    return (
      typeof i.params == "undefined" ||
        i.destroyed ||
        (i.emit("beforeDestroy"),
        (i.initialized = !1),
        i.detachEvents(),
        n.loop && i.loopDestroy(),
        s &&
          (i.removeClasses(),
          r.removeAttribute("style"),
          a.removeAttribute("style"),
          o &&
            o.length &&
            o.forEach((l) => {
              l.classList.remove(
                n.slideVisibleClass,
                n.slideActiveClass,
                n.slideNextClass,
                n.slidePrevClass
              ),
                l.removeAttribute("style"),
                l.removeAttribute("data-swiper-slide-index");
            })),
        i.emit("destroy"),
        Object.keys(i.eventsListeners).forEach((l) => {
          i.off(l);
        }),
        e !== !1 && ((i.el.swiper = null), ve(i)),
        (i.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    L(q, e);
  }
  static get extendedDefaults() {
    return q;
  }
  static get defaults() {
    return ce;
  }
  static installModule(e) {
    I.prototype.__modules__ || (I.prototype.__modules__ = []);
    const s = I.prototype.__modules__;
    typeof e == "function" && s.indexOf(e) < 0 && s.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((s) => I.installModule(s)), I)
      : (I.installModule(e), I);
  }
}
Object.keys(Y).forEach((t) => {
  Object.keys(Y[t]).forEach((e) => {
    I.prototype[e] = Y[t][e];
  });
});
I.use([ze, Oe]);
function Dt({ swiper: t, extendParams: e, on: s }) {
  e({ parallax: { enabled: !1 } });
  const i = (a, o) => {
      const { rtl: l } = t,
        d = l ? -1 : 1,
        p = a.getAttribute("data-swiper-parallax") || "0";
      let c = a.getAttribute("data-swiper-parallax-x"),
        u = a.getAttribute("data-swiper-parallax-y");
      const f = a.getAttribute("data-swiper-parallax-scale"),
        w = a.getAttribute("data-swiper-parallax-opacity"),
        h = a.getAttribute("data-swiper-parallax-rotate");
      if (
        (c || u
          ? ((c = c || "0"), (u = u || "0"))
          : t.isHorizontal()
          ? ((c = p), (u = "0"))
          : ((u = p), (c = "0")),
        c.indexOf("%") >= 0
          ? (c = `${parseInt(c, 10) * o * d}%`)
          : (c = `${c * o * d}px`),
        u.indexOf("%") >= 0
          ? (u = `${parseInt(u, 10) * o}%`)
          : (u = `${u * o}px`),
        typeof w != "undefined" && w !== null)
      ) {
        const g = w - (w - 1) * (1 - Math.abs(o));
        a.style.opacity = g;
      }
      let m = `translate3d(${c}, ${u}, 0px)`;
      typeof f != "undefined" &&
        f !== null &&
        (m += ` scale(${f - (f - 1) * (1 - Math.abs(o))})`),
        h &&
          typeof h != "undefined" &&
          h !== null &&
          (m += ` rotate(${h * o * -1}deg)`),
        (a.style.transform = m);
    },
    n = () => {
      const { el: a, slides: o, progress: l, snapGrid: d } = t;
      O(
        a,
        "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
      ).forEach((p) => {
        i(p, l);
      }),
        o.forEach((p, c) => {
          let u = p.progress;
          t.params.slidesPerGroup > 1 &&
            t.params.slidesPerView !== "auto" &&
            (u += Math.ceil(c / 2) - l * (d.length - 1)),
            (u = Math.min(Math.max(u, -1), 1)),
            p
              .querySelectorAll(
                "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]"
              )
              .forEach((f) => {
                i(f, u);
              });
        });
    },
    r = (a = t.params.speed) => {
      const { el: o } = t;
      o.querySelectorAll(
        "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
      ).forEach((l) => {
        let d =
          parseInt(l.getAttribute("data-swiper-parallax-duration"), 10) || a;
        a === 0 && (d = 0), (l.style.transitionDuration = `${d}ms`);
      });
    };
  s("beforeInit", () => {
    !t.params.parallax.enabled ||
      ((t.params.watchSlidesProgress = !0),
      (t.originalParams.watchSlidesProgress = !0));
  }),
    s("init", () => {
      !t.params.parallax.enabled || n();
    }),
    s("setTranslate", () => {
      !t.params.parallax.enabled || n();
    }),
    s("setTransition", (a, o) => {
      !t.params.parallax.enabled || r(o);
    });
}
export { Dt as P, I as S };
