/* =========================================================
   content.js — Sanuka
   Data for the Features and How-we-work cards, and the
   functions that turn that data into HTML.
   To add/edit a card, change the arrays — not the HTML.
   ========================================================= */

window.Harborly = window.Harborly || {};

const FEATURES = [
  ["Shipment & HBL register", "Create, edit, search and filter consignments. Keep sender, consignee, cargo, quantities, measurements and status history together."],
  ["Container consolidation", "Group multiple HBLs in one container. Record package-level loading so each consignment stays linked to the cargo it travels with."],
  ["Shipping documents & invoices", "Generate bills of lading, container manifests and customer invoices from shipment records, with charges recorded in one place."],
  ["Sri Lanka Customs output", "Prepare the required country-specific e-filing format. Validate it against current client examples before official submission."],
  ["Consignee messaging", "Send recipients shipment updates through WhatsApp or SMS, using an approved provider and available integration access."],
  ["Counter payments & cash control", "Record cash collections, keep payment records and generate receipts. Reconcile counter collections with a daily cash report."],
  ["Public shipment tracking", "Let recipients check shipment progress through a public tracking link, without an account. Limit the customer information exposed."],
  ["Natural-language data assistant", "Ask operational questions in plain language. Answers stay within authorised records; staff review important decisions and documents."],
  ["Last-mile dispatch", "Assign drivers and plan delivery routes for the final journey. Keep dispatch connected to shipment and release information."],
  ["Arrival & unloading records", "Record container arrivals and unloaded cargo. Log missing, damaged or mismatched packages as discrepancies for follow-up."],
  ["Bonded warehouse release", "Track cargo held in the bonded warehouse and record release status, so counter and warehouse teams share a clear handover."],
  ["Role-based staff access", "Give management, warehouse and counter teams access suited to their responsibilities, through a responsive web workspace."],
];

const STEPS = [
  ["Warehouse", "Register the cargo", "Create an HBL for each consignment. Record sender and consignee details, cargo descriptions, quantities and package measurements."],
  ["Consolidation", "Group & load", "Assign multiple HBLs to a container. Record each package loaded, keeping individual consignments linked to their container."],
  ["Documentation", "Prepare the paperwork", "Generate bills of lading, manifests and invoices. Prepare Sri Lanka Customs output and validate it before official submission."],
  ["In transit", "Keep recipients informed", "Send WhatsApp or SMS updates through an approved provider. Recipients can follow shipment progress with a public link—no login needed."],
  ["Destination warehouse", "Record arrival & unloading", "Log the container’s arrival and unloaded packages. Record discrepancies, including missing or damaged cargo, and track bonded warehouse release."],
  ["Counter & delivery", "Collect, release & dispatch", "Record cash payments, issue receipts and reconcile daily collections. Update release status, then assign drivers and routes for last-mile delivery."],
];

const pad = (n) => String(n).padStart(2, "0");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

window.Harborly.renderFeatures = function () {
  const grid = document.getElementById("featureGrid");
  if (!grid) return;
  grid.innerHTML = FEATURES.map(([title, text], i) => `
    <article class="feature reveal" style="transition-delay:${(i % 3) * 60}ms">
      <span class="feature__num">${pad(i + 1)}</span>
      <h3>${esc(title)}</h3>
      <p>${esc(text)}</p>
    </article>`).join("");
};

window.Harborly.renderSteps = function () {
  const grid = document.getElementById("stepsGrid");
  if (!grid) return;
  grid.innerHTML = STEPS.map(([tag, title, text], i) => `
    <article class="step reveal" style="transition-delay:${(i % 3) * 60}ms">
      <div class="step__head">
        <span class="step__num">${pad(i + 1)}</span>
        <span class="step__tag">${esc(tag)}</span>
      </div>
      <h3>${esc(title)}</h3>
      <p>${esc(text)}</p>
    </article>`).join("");
};// js/content.js — owner: Sanuka. Type your code below this line.
