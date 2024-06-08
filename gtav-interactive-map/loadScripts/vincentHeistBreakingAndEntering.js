let vincentHeistBreakingAndEnteringFetchData = new LayerFetchData(
    "vincentHeistBreakingAndEntering"
);

function loadVincentHeistBreakingAndEntering(r) {
    if (constantData.layers.vincentHeistBreakingAndEntering !== undefined)
        return;
    constantData.layers.vincentHeistBreakingAndEntering = [];

    registerSinglePolygonArray(
        "vincentHeistBreakingAndEntering",
        constantData.layers.vincentHeistBreakingAndEntering,
        saveData.markerData.vincentHeistBreakingAndEntering,
        r.searchAreas,
        loadVincentHeistBreakingAndEnteringGUI
    );

    registerSingleMarkerArray(
        "vincentHeistBreakingAndEntering",
        constantData.layers.vincentHeistBreakingAndEntering,
        saveData.markerData.vincentHeistBreakingAndEntering,
        constantData.icons.terrorbyteblue,
        r.terrorbyteSpots,
        loadVincentHeistBreakingAndEnteringGUI
    );

    registerSingleMarkerArray(
        "vincentHeistBreakingAndEntering",
        constantData.layers.vincentHeistBreakingAndEntering,
        saveData.markerData.vincentHeistBreakingAndEntering,
        constantData.icons.laptopgreen,
        r.techbroSpots,
        loadVincentHeistBreakingAndEnteringGUI
    );
}

vincentHeistBreakingAndEnteringFetchData.fetchThis(
    loadVincentHeistBreakingAndEntering
);

async function loadVincentHeistBreakingAndEnteringGUI() {
    if (!vincentHeistBreakingAndEnteringFetchData.loaded)
        await vincentHeistBreakingAndEnteringFetchData.fetchThis(
            loadVincentHeistBreakingAndEntering
        );
    resetContentParts();
    for (let layer of constantData.layers.vincentHeistBreakingAndEntering) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs = layer.title.includes("Area")
                    ? new GenericHTMLConglomerate().genericPolygonOptions(layer)
                    : new GenericHTMLConglomerate().genericMarkerOptions(layer);

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
