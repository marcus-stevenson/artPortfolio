const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const chips = Array.from(document.querySelectorAll(".chip"));
const tiles = Array.from(document.querySelectorAll(".tile"));

function setActiveChip(target) {
  chips.forEach(c => {
    const isActive = c === target;
    c.classList.toggle("is-active", isActive);
    c.setAttribute("aria-selected", String(isActive));
  });
}

function applyFilter(filter) {
  tiles.forEach(tile => {
    const cat = tile.getAttribute("data-category");
    const show = filter === "all" || cat === filter;
    tile.style.display = show ? "" : "none";
  });
}

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    const filter = chip.getAttribute("data-filter");
    setActiveChip(chip);
    applyFilter(filter);
  });
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

tiles.forEach(tile => {
  const img = tile.querySelector("img");
  tile.addEventListener("click", () => openLightbox(img.src, img.alt));
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
