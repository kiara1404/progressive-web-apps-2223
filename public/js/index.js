const videoEl = document.querySelector('video')
async function startVideoEl() {


    // access camera
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: {
                ideal: "environment"
            }
        },
        audio: false
    });

    // video block ( feedback voor gebruiker)
    videoEl.srcObject = stream;
    await videoEl.play();
}

export async function barcodeDetector() {
    const barcodeDetector = new BarcodeDetector();
    window.setInterval(async () => {
        const barcodes = await barcodeDetector.detect(videoEl);

        // stukje code van joeri geplakt, nog even vragen hoe dit zit
        if (barcodes.length <= 0) {
            return;
        } else {
            console.log("geslaagd")
            window.location.href = 'scanner/' + barcodes[0].rawValue

        }

    }, 2000)
}

// van joeri
if (window.location.pathname === '/scanner') {
    startVideoEl()
    barcodeDetector()
}