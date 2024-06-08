let countiesFetchData = new LayerFetchData("counties");

function loadCounties(r) {
    if (constantData.layers.counties !== undefined) return;
    constantData.layers.counties = [];

    registerSinglePolygonArray(
        "counties",
        constantData.layers.counties,
        saveData.markerData.counties,
        r,
        loadCountiesGUI
    );
}

countiesFetchData.fetchThis(loadCounties);

async function loadCountiesGUI() {
    if (!countiesFetchData.loaded)
        await countiesFetchData.fetchThis(loadCounties);
    resetContentParts();
    for (let layer of constantData.layers.counties) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs = new GenericHTMLConglomerate().genericPolygonOptions(
                    layer
                );

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
