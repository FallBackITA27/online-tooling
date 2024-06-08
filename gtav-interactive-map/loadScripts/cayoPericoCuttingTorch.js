let cayoPericoCuttingTorchFetchData = new LayerFetchData(
    "cayoPericoCuttingTorch"
);

function loadCayoPericoCuttingTorch(r) {
    if (constantData.layers.cayoPericoCuttingTorch !== undefined) return;
    constantData.layers.cayoPericoCuttingTorch = [];

    registerSingleCircleMarkerArray(
        "cayoPericoCuttingTorch",
        constantData.layers.cayoPericoCuttingTorch,
        saveData.markerData.cayoPericoCuttingTorch,
        r,
        loadCayoPericoCuttingTorchGUI
    );
}

cayoPericoCuttingTorchFetchData.fetchThis(loadCayoPericoCuttingTorch);

async function loadCayoPericoCuttingTorchGUI() {
    if (!cayoPericoCuttingTorchFetchData.loaded)
        await cayoPericoCuttingTorchFetchData.fetchThis(
            loadCayoPericoCuttingTorch
        );
    resetContentParts();
    for (let layer of constantData.layers.cayoPericoCuttingTorch) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs = new GenericHTMLConglomerate().genericMarkerOptions(
                    layer
                );

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
