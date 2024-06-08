let kosatkaFastTravelsFetchData = new LayerFetchData("kosatkaFastTravels");

function loadKosatkaFastTravels(r) {
    if (constantData.layers.kosatkaFastTravels !== undefined) return;
    constantData.layers.kosatkaFastTravels = [];

    registerSingleMarkerArray(
        "kosatkaFastTravels",
        constantData.layers.kosatkaFastTravels,
        saveData.markerData.kosatkaFastTravels,
        constantData.icons.kosatka,
        r,
        loadKosatkaFastTravelsGUI
    );
}

kosatkaFastTravelsFetchData.fetchThis(loadKosatkaFastTravels);

async function loadKosatkaFastTravelsGUI() {
    if (!kosatkaFastTravelsFetchData.loaded)
        await kosatkaFastTravelsFetchData.fetchThis(loadKosatkaFastTravels);
    resetContentParts();
    for (let layer of constantData.layers.kosatkaFastTravels) {
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
