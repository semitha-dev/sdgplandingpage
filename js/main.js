window.Harborly = window.Harborly || {};

async function loadIncludes() {
  const slots = [...document.querySelectorAll("[data-include]")];
  const results = await Promise.allSettled(slots.map(async (slot) => {
    const url = slot.getAttribute("data-include");
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} (${res.status})`);
    slot.outerHTML = await res.text();
  }));
  return results.filter((r) => r.status === "rejected");
}

function showLoadError(failures) {
  const box = document.createElement("div");
  box.className = "load-error";
  box.innerHTML = location.protocol === "file:"
    ? "Sections can’t load when the page is opened as a file. Run it through a local server, for example VS Code’s <strong>Live Server</strong> or <code>npx serve</code>."
    : `Some sections failed to load: ${failures.map((f) => f.reason.message).join(", ")}`;
  document.body.prepend(box);
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", async () => {
  const failures = await loadIncludes();
  if (failures.length) showLoadError(failures);

  const H = window.Harborly;
  H.renderFeatures?.();
  H.renderSteps?.();
  H.initHeader?.();
  H.initTracking?.();
  initReveal();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
});
