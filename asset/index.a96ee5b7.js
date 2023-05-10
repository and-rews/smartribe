import { S as k, P as N } from "./vendor.1bb3b54e.js";

const P = function () {
  const m = document.createElement("link").relList;
  if (m && m.supports && m.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) u(t);
  new MutationObserver((t) => {
    for (const s of t)
      if (s.type === "childList")
        for (const n of s.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && u(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(t) {
    const s = {};
    return (
      t.integrity && (s.integrity = t.integrity),
      t.referrerpolicy && (s.referrerPolicy = t.referrerpolicy),
      t.crossorigin === "use-credentials"
        ? (s.credentials = "include")
        : t.crossorigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function u(t) {
    if (t.ep) return;
    t.ep = !0;
    const s = a(t);
    fetch(t.href, s);
  }
};
P();
function T(v) {
  const m = v.querySelector(".swiper");
  let a = !1,
    u = !1,
    t;
  const s = (e) => {
    e.classList.add("fashion-slider-no-transition"),
      (u = !0),
      cancelAnimationFrame(t),
      (t = requestAnimationFrame(() => {
        e.classList.remove("fashion-slider-no-transition"), (u = !1), (a = !1);
      }));
  };
  let n;

  //   setInterval(() => {
  //     a || n.slideNext();
  //   }, 3000);

  const b = () => {
      a || n.slideNext();
    },
    g = () => {
      a || n.slidePrev();
    },
    L = (e) => {
      e.el
        .querySelector(".fashion-slider-button-next")
        .addEventListener("click", b),
        e.el
          .querySelector(".fashion-slider-button-prev")
          .addEventListener("click", g);
    },
    q = (e) => {
      e.el
        .querySelector(".fashion-slider-button-next")
        .removeEventListener("click", b),
        e.el
          .querySelector(".fashion-slider-button-prev")
          .removeEventListener("click", g);
    };
  return (
    (n = new k(m, {
      modules: [N],
      speed: 1300,
      allowTouchMove: !1,
      parallax: !0,
      on: {
        transitionStart(e) {
          const { slides: c, previousIndex: o, activeIndex: r, el: d } = e;
          u || (a = !0);
          const l = c[r],
            f = c[o],
            y = f.querySelector(".fashion-slider-scale"),
            i = f.querySelector("img"),
            h = l.querySelector("img"),
            E = r - o,
            x = l.getAttribute("data-slide-bg-color");
          (d.style["background-color"] = x),
            (y.style.transform = "scale(0.6)"),
            (i.style.transitionDuration = "1000ms"),
            (i.style.transform = "scale(1.2)");
          const S = f.querySelector(".fashion-slider-title-text");
          (S.style.transition = "1000ms"),
            (S.style.color = "rgba(255,255,255,0)");
          const p = (I) => {
            I.target === i &&
              (i.removeEventListener("transitionend", p),
              (h.style.transitionDuration = "1300ms"),
              (h.style.transform = "translate3d(0, 0, 0) scale(1.2)"),
              (i.style.transitionDuration = "1300ms"),
              (i.style.transform = `translate3d(${
                60 * E
              }%, 0, 0)  scale(1.2)`));
          };
          i.addEventListener("transitionend", p);
        },
        transitionEnd(e) {
          const { slides: c, activeIndex: o, el: r } = e,
            d = c[o],
            l = d.querySelector("img");
          (d.querySelector(".fashion-slider-scale").style.transform =
            "scale(1)"),
            (l.style.transitionDuration = "1000ms"),
            (l.style.transform = "scale(1)");
          const f = d.querySelector(".fashion-slider-title-text");
          (f.style.transition = "1000ms"),
            (f.style.color = "rgba(255,255,255,1)");
          const y = (i) => {
            i.target === l &&
              (l.removeEventListener("transitionend", y), (a = !1));
          };
          l.addEventListener("transitionend", y),
            o === 0
              ? r
                  .querySelector(".fashion-slider-button-prev")
                  .classList.add("fashion-slider-button-disabled")
              : r
                  .querySelector(".fashion-slider-button-prev")
                  .classList.remove("fashion-slider-button-disabled"),
            o === c.length - 1
              ? r
                  .querySelector(".fashion-slider-button-next")
                  .classList.add("fashion-slider-button-disabled")
              : r
                  .querySelector(".fashion-slider-button-next")
                  .classList.remove("fashion-slider-button-disabled");
        },
        init(e) {
          const { slides: c, activeIndex: o, el: r } = e;
          s(r);
          const d = c[o].getAttribute("data-slide-bg-color");
          (r.style["background-color"] = d), e.emit("transitionEnd"), L(e);
        },
        resize(e) {
          s(e.el);
        },
        destroy(e) {
          q(e);
        },
      },
    })),
    n
  );
}
const A = document.querySelector(".fashion-slider");
T(A);
