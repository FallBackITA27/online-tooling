let cayoPericoFingerprintClonerFetchData = new LayerFetchData(
    "cayoPericoFingerprintCloner"
);

function loadCayoPericoFingerprintCloner(r) {
    if (constantData.layers.cayoPericoFingerprintCloner !== undefined) return;
    constantData.layers.cayoPericoFingerprintCloner = [];

    registerSingleLineArray(
        "cayoPericoFingerprintCloner",
        constantData.layers.cayoPericoFingerprintCloner,
        saveData.markerData.cayoPericoFingerprintCloner,
        r,
        loadCayoPericoFingerprintClonerGUI
    );
}

cayoPericoFingerprintClonerFetchData.fetchThis(loadCayoPericoFingerprintCloner);

async function loadCayoPericoFingerprintClonerGUI() {
    if (!cayoPericoFingerprintClonerFetchData.loaded)
        await cayoPericoFingerprintClonerFetchData.fetchThis(
            loadCayoPericoFingerprintCloner
        );
    resetContentParts();
    for (let layer of constantData.layers.cayoPericoFingerprintCloner) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs = new GenericHTMLConglomerate().genericLineOptions(
                    layer
                );

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
