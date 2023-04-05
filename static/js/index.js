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


// If supported, install service worker.
if ("serviceWorker" in navigator) {
  console.log("service worker supported!");
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(registration => {
        return registration.update();
      })
      .catch(error => {
        console.log(error);
      });
  });
}


let deferredPrompt;
let addBtn;

if (document.querySelector(".add-button")) {
  addBtn = document.querySelector(".add-button");

  window.addEventListener("beforeinstallprompt", e => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = "block";

    addBtn.addEventListener("click", e => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = "none";
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });
  });
}
