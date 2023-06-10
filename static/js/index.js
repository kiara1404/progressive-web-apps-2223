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

    if (barcodes.length <= 0) {
      return;
    } else {
      window.location.href = "products/" + barcodes[0].rawValue;
    }
  }, 2000);
}

if (window.location.pathname === "/scanner") {
  startVideoEl();
  barcodeDetector();
}

// If supported, install service worker.
if ("serviceWorker" in  navigator) {
  console.log("service worker supported!");
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(registration => {
        console.log("registration", registration);

        return registration.update();
      })
      .catch(error => {
        console.log(error);
      });
  });
}

