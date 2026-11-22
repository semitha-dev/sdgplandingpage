window.Harborly = window.Harborly || {};

const DEMO_SHIPMENTS = {
  "HB-24007": 1,
  "HB-24008": 2,
  "HB-24009": 3,
  "HB-24010": 4,
};

function lookupHBL(hbl) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (hbl in DEMO_SHIPMENTS) return resolve({ found: true, stage: DEMO_SHIPMENTS[hbl] });
      resolve({ found: false });
    }, 700);
  });
}

window.Harborly.initTracking = function () {
  const form = document.getElementById("trackForm");
  if (!form) return;

  const input = document.getElementById("hbl");
  const hint = document.getElementById("trackHint");
  const list = document.getElementById("trackSteps");
  const steps = [...list.querySelectorAll("li")];
  const button = form.querySelector("button");
  const defaultHint = hint.textContent;

  const setStage = (stage) => {
    steps.forEach((li, i) => {
      li.classList.toggle("is-done", i < stage);
      li.classList.toggle("is-current", i === stage - 1);
    });
  };

  const setHint = (text, isError = false) => {
    hint.textContent = text;
    hint.classList.toggle("is-error", isError);
    input.classList.toggle("is-error", isError);
  };

  input.addEventListener("input", () => {
    input.value = input.value.toUpperCase();
    if (hint.classList.contains("is-error")) setHint(defaultHint);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const hbl = input.value.trim().toUpperCase();

    if (!/^[A-Z0-9-]{4,20}$/.test(hbl)) {
      setHint("Please enter a valid HBL number (e.g. HB-24009).", true);
      input.focus();
      return;
    }

    button.disabled = true;
    button.textContent = "Checking…";
    list.classList.add("is-loading");
    setHint("Looking up your shipment…");

    try {
      const res = await lookupHBL(hbl);
      if (!res.found) {
        setStage(0);
        setHint(`We couldn't find ${hbl}. Check the number on your receipt.`, true);
      } else {
        setStage(res.stage);
        setHint(`${hbl}: ${steps[res.stage - 1].textContent.replace(/\.$/, "")}.`);
      }
    } catch {
      setHint("Something went wrong. Please try again.", true);
    } finally {
      list.classList.remove("is-loading");
      button.disabled = false;
      button.textContent = "Check status";
    }
  });
};
