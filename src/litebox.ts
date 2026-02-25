const imgs = document.querySelectorAll<HTMLImageElement>("img");
const litebox = document.querySelector<HTMLDivElement>("#litebox");

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    displayLightbox({ show: false });
  }
});

function clearAllViewTransitions() {
  for (const img of imgs) {
    img.style.viewTransitionName = "";
  }
}

for (const img of imgs) {
  img.addEventListener("click", () => {
    clearAllViewTransitions();
    img.style.viewTransitionName = img.alt;
    displayLightbox({ img });
  });
}

function undoAllHidden(addViewTransition?: boolean) {
  for (const img of document.querySelectorAll<HTMLImageElement>("img")) {
    if (!img.dataset.oldViewTransitionName) continue;

    img.style.display = "block";
    img.style.viewTransitionName = addViewTransition
      ? img.dataset.oldViewTransitionName
      : "";

    if (addViewTransition) delete img.dataset.oldViewTransitionName;
  }
}

function displayLightbox({
  show,
  img,
}: { show?: boolean; img?: HTMLImageElement } = {}) {
  if (!litebox) {
    throw new Error("unable to find litebox");
  }

  if (show === false) {
    document
      .startViewTransition(() => {
        undoAllHidden(true);
        litebox.style.display = "none";
      })
      .finished.finally(() => {
        undoAllHidden();
      });
  }

  if (img) {
    const liteboxImg = litebox.querySelector("img");
    if (!liteboxImg) {
      throw new Error("unable to find litebox img");
    }

    document.startViewTransition(() => {
      undoAllHidden();

      litebox.style.display = "flex";

      img.dataset.oldViewTransitionName = img.style.viewTransitionName;
      img.style.viewTransitionName = "";
      img.style.display = "none";

      liteboxImg.src = img.src;
      liteboxImg.style.viewTransitionName = img.alt;
    });
  }
}
