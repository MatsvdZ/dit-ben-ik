getInfo();

async function getInfo() {
  const url = "https://fdnd.directus.app/items/person/308";
  const response = await fetch(url);
  const { data } = await response.json();

  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.dataset.field;
    el.textContent = data[key] ?? "";
  });
}

document.querySelector(".start-button").addEventListener("click", () => {
  const target = document.querySelector("#section-2");
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   const scroller = document.querySelector(".outer-wrapper");
//   const img = document.querySelector(".hero-img");
//   const target = document.querySelector("#section-2");

//   if (!scroller || !img || !target) return;

//   const cssNum = (name) =>
//     parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;

//   const calc = () => {
//     const baseRotation = cssNum("--hero-base-rot");
//     const maxLean = cssNum("--hero-max-lean");
//     const leanDistance = cssNum("--hero-lean-distance");
//     const endPadding = cssNum("--hero-end-padding");
//     const fromX = cssNum("--hero-from-x");
//     const toX = cssNum("--hero-to-x");

//     const startScroll = 0;
//     const endScroll = target.offsetLeft;

//     return { baseRotation, maxLean, leanDistance, fromX, toX, startScroll, endScroll };
//   };

//   let cfg = calc();

//   const updateImg = () => {
//     const { baseRotation, maxLean, leanDistance, fromX, toX, startScroll, endScroll } = cfg;

//     const current = scroller.scrollTop;

//     // 0..1 voortgang tussen slide 1 -> slide 2
//     let t = (current - startScroll) / (endScroll - startScroll);
//     t = Math.max(0, Math.min(1, t));

//     // X beweging
//     const x = fromX + (toX - fromX) * t;

//     // Lean -> terugdraaien
//     const delta = current - startScroll;
//     let rotation;

//     if (delta <= leanDistance) {
//       const p = delta / leanDistance;
//       rotation = baseRotation + maxLean * p;
//     } else {
//       const remaining = (endScroll - startScroll) - leanDistance || 1;
//       const p = Math.min(Math.max((delta - leanDistance) / remaining, 0), 1);
//       rotation = (baseRotation + maxLean) + (-maxLean * p);
//     }

//     img.style.transform = `translate(${x}%, -50%) rotate(${rotation}deg) scaleX(-1)`;
//   };

//   scroller.addEventListener("scroll", updateImg, { passive: true });

//   // Recalc bij resize/orientation change (mobiel!)
//   window.addEventListener("resize", () => {
//     cfg = calc();
//     updateImg();
//   });

//   updateImg();
// });
