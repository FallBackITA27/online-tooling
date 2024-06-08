let vincentHeistHitAndRunFetchData = new LayerFetchData(
    "vincentHeistHitAndRun"
);

function loadVincentHeistHitAndRun(r) {
    if (constantData.layers.vincentHeistHitAndRun !== undefined) return;
    constantData.layers.vincentHeistHitAndRun = [];

    registerSingleMarkerArray(
        "vincentHeistHitAndRun",
        constantData.layers.vincentHeistHitAndRun,
        saveData.markerData.vincentHeistHitAndRun,
        [
            [constantData.icons.garageyellow, 3],
            [constantData.icons.objectiveCyellow, 2],
            [constantData.icons.objectiveByellow, 1],
            [constantData.icons.objectiveAyellow, 0],
        ],
        r,
        loadVincentHeistHitAndRunGUI
    );
}

vincentHeistHitAndRunFetchData.fetchThis(loadVincentHeistHitAndRun);

async function loadVincentHeistHitAndRunGUI() {
    if (!vincentHeistHitAndRunFetchData.loaded)
        await vincentHeistHitAndRunFetchData.fetchThis(
            loadVincentHeistHitAndRun
        );
    resetContentParts();
    for (let layer of constantData.layers.vincentHeistHitAndRun) {
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
