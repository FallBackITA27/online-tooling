let vincentHeistSlushFundFetchData = new LayerFetchData(
    "vincentHeistSlushFund"
);

function loadVincentHeistSlushFund(r) {
    if (constantData.layers.vincentHeistSlushFund !== undefined) return;
    constantData.layers.vincentHeistSlushFund = [];

    registerSingleMarkerArray(
        "vincentHeistSlushFund",
        constantData.layers.vincentHeistSlushFund,
        saveData.markerData.vincentHeistSlushFund,
        [
            [constantData.icons.objectiveByellow, 1],
            [constantData.icons.objectiveAyellow, 0],
        ],
        r,
        loadVincentHeistSlushFundGUI
    );
}

vincentHeistSlushFundFetchData.fetchThis(loadVincentHeistSlushFund);

async function loadVincentHeistSlushFundGUI() {
    if (!vincentHeistSlushFundFetchData.loaded)
        await vincentHeistSlushFundFetchData.fetchThis(
            loadVincentHeistSlushFund
        );
    resetContentParts();
    for (let layer of constantData.layers.vincentHeistSlushFund) {
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
