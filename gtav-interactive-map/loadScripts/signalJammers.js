let signalJammersFetchData = new LayerFetchData("signalJammers");

function loadSignalJammers(r) {
    if (constantData.layers.signalJammers !== undefined) return;
    constantData.layers.signalJammers = [];

    registerSingleCollectibleMarkerArray(
        "signalJammers",
        constantData.layers.signalJammers,
        saveData.markerData.signalJammers,
        constantData.icons.signalJammer,
        r,
        loadSignalJammersGUI
    );
}

signalJammersFetchData.fetchThis(loadSignalJammers);

async function loadSignalJammersGUI() {
    if (!signalJammersFetchData.loaded)
        await signalJammersFetchData.fetchThis(loadSignalJammers);
    resetContentParts();
    for (let layer of constantData.layers.signalJammers) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs =
                    new GenericHTMLConglomerate().genericCollectibleMarkerOptions(
                        layer,
                        constantData.layers.signalJammers.length
                    );

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
