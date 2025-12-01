// ---------- Theme toggle ----------
const themeToggleBtn = document.getElementById("themeToggleBtn");
const body = document.body;
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");

function updateIcons() {
  if (body.classList.contains("theme-dark")) {
    moonIcon.style.display = "inline";
    sunIcon.style.display = "none";
  } else {
    moonIcon.style.display = "none";
    sunIcon.style.display = "inline";
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("theme-dark")) {
      body.classList.replace("theme-dark", "theme-light");
    } else {
      body.classList.replace("theme-light", "theme-dark");
    }
    updateIcons();
  });
}
updateIcons();

// ---------- Currency conversion ----------
const conversionRate = 7.12;
const poUsdInput = document.getElementById("poUsd");
const poLocalInput = document.getElementById("poLocal");

if (poUsdInput && poLocalInput) {
  poUsdInput.addEventListener("input", function () {
    const usdValue = parseFloat(this.value) || 0;
    poLocalInput.value = usdValue ? (usdValue * conversionRate).toFixed(2) : "";
  });
}

// ---------- Collapsible panels (sections 1–3) ----------
function setupToggle(sectionNum) {
  const toggleHeader = document.getElementById(`toggleHeader${sectionNum}`);
  const poCard = document.getElementById(`poCard${sectionNum}`);
  const editBtn = document.getElementById(`editBtn${sectionNum}`);

  if (!toggleHeader || !poCard || !editBtn) return;

  function openThisSection() {
    showSection(sectionNum); // Hide others, show this
    setActiveStepForSection(sectionNum); // Update stepper (active + completed)
  }

  toggleHeader.addEventListener("click", openThisSection);
  toggleHeader.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openThisSection();
    }
  });

  editBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    alert(`Edit functionality to be implemented for section ${sectionNum}.`);
  });
}

[1, 2, 3].forEach(setupToggle);

// ---------- Stepper → open matching panel ----------
const stepSectionMap = {
  1: { headerId: "toggleHeader1", cardId: "poCard1" },
  2: { headerId: "toggleHeader2", cardId: "poCard2" },
  3: { headerId: "toggleHeader3", cardId: "poCard3" },
};

function showSection(sectionNum) {
  Object.values(stepSectionMap).forEach(({ headerId, cardId }) => {
    const header = document.getElementById(headerId);
    const card = document.getElementById(cardId);
    if (!header || !card) return;

    card.classList.add("hidden");
    header.setAttribute("aria-expanded", "false");
    header.classList.add("collapsed");
  });

  const config = stepSectionMap[sectionNum];
  if (!config) return;

  const header = document.getElementById(config.headerId);
  const card = document.getElementById(config.cardId);
  if (!header || !card) return;

  card.classList.remove("hidden");
  header.setAttribute("aria-expanded", "true");
  header.classList.remove("collapsed");
}

// ---- NEW: set both active and completed states on steps ----
function setActiveStepForSection(sectionNum) {
  const steps = document.querySelectorAll(".stepper .step");

  steps.forEach((step) => {
    const s = step.dataset.section;

    // Parent rows w/o data-section are left alone
    if (!s) return;

    // Reset state first
    step.classList.remove("active", "completed");

    const stepIndex = Number(s);
    const currentIdx = Number(sectionNum);

    if (stepIndex < currentIdx) {
      step.classList.add("completed");
    } else if (stepIndex === currentIdx) {
      step.classList.add("active");
    }
    // Later steps stay plain
  });
}

document.querySelectorAll(".stepper .step").forEach((step) => {
  const sectionNum = step.dataset.section;
  if (!sectionNum) return;

  step.addEventListener("click", () => {
    if (step.classList.contains("disabled")) return;
    const num = parseInt(sectionNum, 10);
    showSection(num);
    setActiveStepForSection(num);
  });
});

// ---------- Populate dropdown from PO Owner field ----------
document.addEventListener("DOMContentLoaded", () => {
  const poOwner = document.getElementById("poOwnerValue");
  const prepayListSelect = document.getElementById("prepayListSelect");
  if (poOwner && prepayListSelect) {
    prepayListSelect.innerHTML = "";
    const opt = document.createElement("option");
    opt.value = poOwner.dataset.email || poOwner.textContent;
    opt.textContent = poOwner.textContent;
    prepayListSelect.appendChild(opt);
  }
});

// ---------- Modal functionality ----------
const openBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModalBtn");

if (openBtn && modal && closeBtn) {
  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// ---------- Supplier search bar (clear button) ----------
const supplierSearchInput = document.getElementById("supplierSearch");
const supplierSearchClear = document.querySelector(".supplier-search-clear");

if (supplierSearchInput && supplierSearchClear) {
  supplierSearchClear.addEventListener("click", () => {
    supplierSearchInput.value = "";
    supplierSearchInput.focus();
  });
}

// ---------- Initial state: section 1 visible and step mapped ----------
showSection(1);
setActiveStepForSection(1);

// ---------- Import Excel (file picker) ----------
const importBtn = document.getElementById("importJsonBtn");
const importInput = document.getElementById("importExcelInput");

if (importBtn && importInput) {
  importBtn.addEventListener("click", () => {
    importInput.click();
  });

  importInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // TODO: use a library like SheetJS (XLSX) to parse the file
    // Example outline:
    // const data = await file.arrayBuffer();
    // const workbook = XLSX.read(data, { type: "array" });
    // const sheetName = workbook.SheetNames[0];
    // const sheet = workbook.Sheets[sheetName];
    // const rows = XLSX.utils.sheet_to_json(sheet);
    // console.log("Imported rows:", rows);

    alert(`Excel file selected: ${file.name}`);
    // reset input so selecting the same file again still fires change
    importInput.value = "";
  });
}
