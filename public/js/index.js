const videoEl = document.querySelector("video");
async function startVideoEl() {
  // access camera
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: {
        ideal: "environment",
      },
    },
    audio: false,
  });

  // video block ( feedback voor gebruiker)
  videoEl.srcObject = stream;
  await videoEl.play();
  const scanner = document.querySelector(".loading");
  scanner.classList.add("hide");
}

export async function barcodeDetector() {
  const barcodeDetector = new BarcodeDetector();
  window.setInterval(async () => {
    const barcodes = await barcodeDetector.detect(videoEl);

    // stukje code van joeri geplakt, nog even vragen hoe dit zit
    if (barcodes.length <= 0) {
      return;
    } else {
      console.log("geslaagd");
      window.location.href = "products/" + barcodes[0].rawValue;
    }
  }, 2000);
}

// van joeri
if (window.location.pathname === "/scanner") {
  startVideoEl();
  barcodeDetector();
}

const search = document.querySelector(`input[type="text"]`);
const searchButton = document.querySelector(`input[type="submit"]`);
search.addEventListener("input", e => {
  e.preventDefault();
  console.log("test", search.value);
});
searchButton.addEventListener("submit", () => {
  console.log("submit");
});
