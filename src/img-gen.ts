const html = String.raw;
const imgContainer = document.querySelector<HTMLDivElement>("#img-container");

if (!imgContainer) {
  throw new Error("unable to find img container");
}

const images = {
  profile: "https://github.com/stephansama.png",
  random: "https://picsum.photos/200/200",
  randomTwo: "https://picsum.photos/400/400",
  randomThree: "https://picsum.photos/600/600",
} as const;

imgContainer.innerHTML = Object.entries(images)
  .map(([alt, img]) => html`<img src="${img}" alt="${alt}" />`)
  .join("\n");
