let figurinesFetchData = new LayerFetchData("figurines");

function loadFigurines(r) {
    if (constantData.layers.figurines !== undefined) return;
    constantData.layers.figurines = [];

    registerSingleCollectibleMarkerArray(
        "figurines",
        constantData.layers.figurines,
        saveData.markerData.figurines,
        constantData.icons.figurine,
        r,
        loadFigurinesGUI
    );
}

figurinesFetchData.fetchThis(loadFigurines);

async function loadFigurinesGUI() {
    if (!figurinesFetchData.loaded)
        await figurinesFetchData.fetchThis(loadFigurines);
    resetContentParts();
    for (let layer of constantData.layers.figurines) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs =
                    new GenericHTMLConglomerate().genericCollectibleMarkerOptions(
                        layer,
                        constantData.layers.figurines.length
                    );

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
