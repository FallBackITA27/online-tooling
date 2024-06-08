let ldOrganicsFetchData = new LayerFetchData("ldOrganics");

function loadLDOrganics(r) {
    if (constantData.layers.ldOrganics !== undefined) return;
    constantData.layers.ldOrganics = [];

    registerSingleCollectibleMarkerArray(
        "ldOrganics",
        constantData.layers.ldOrganics,
        saveData.markerData.ldOrganics,
        constantData.icons.ldOrganics,
        r,
        loadLDOrganicsGUI
    );
}

ldOrganicsFetchData.fetchThis(loadLDOrganics);

async function loadLDOrganicsGUI() {
    if (!ldOrganicsFetchData.loaded)
        await ldOrganicsFetchData.fetchThis(loadLDOrganics);
    resetContentParts();
    for (let layer of constantData.layers.ldOrganics) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs =
                    new GenericHTMLConglomerate().genericCollectibleMarkerOptions(
                        layer,
                        constantData.layers.ldOrganics.length
                    );

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
