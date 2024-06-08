let cayoPericoPlasmaCutterFetchData = new LayerFetchData(
    "cayoPericoPlasmaCutter"
);

function loadCayoPericoPlasmaCutter(r) {
    if (constantData.layers.cayoPericoPlasmaCutter !== undefined) return;
    constantData.layers.cayoPericoPlasmaCutter = [];

    registerSingleLineArray(
        "cayoPericoPlasmaCutter",
        constantData.layers.cayoPericoPlasmaCutter,
        saveData.markerData.cayoPericoPlasmaCutter,
        r,
        loadCayoPericoPlasmaCutterGUI
    );
}

cayoPericoPlasmaCutterFetchData.fetchThis(loadCayoPericoPlasmaCutter);

async function loadCayoPericoPlasmaCutterGUI() {
    if (!cayoPericoPlasmaCutterFetchData.loaded)
        await cayoPericoPlasmaCutterFetchData.fetchThis(
            loadCayoPericoPlasmaCutter
        );
    resetContentParts();
    for (let layer of constantData.layers.cayoPericoPlasmaCutter) {
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
