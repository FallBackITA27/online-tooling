let cayoPericoKosatkaApproachVehicleFetchData = new LayerFetchData(
    "cayoPericoKosatkaApproachVehicle"
);

function loadCayoPericoKosatkaApproachVehicle(r) {
    if (constantData.layers.cayoPericoKosatkaApproachVehicle !== undefined)
        return;
    constantData.layers.cayoPericoKosatkaApproachVehicle = [];

    registerSingleMarkerArray(
        "cayoPericoKosatkaApproachVehicle",
        constantData.layers.cayoPericoKosatkaApproachVehicle,
        saveData.markerData.cayoPericoKosatkaApproachVehicle,
        constantData.icons.kosatkaRed,
        r,
        loadCayoPericoKosatkaApproachVehicleGUI
    );
}

cayoPericoKosatkaApproachVehicleFetchData.fetchThis(
    loadCayoPericoKosatkaApproachVehicle
);

async function loadCayoPericoKosatkaApproachVehicleGUI() {
    if (!cayoPericoKosatkaApproachVehicleFetchData.loaded)
        await cayoPericoKosatkaApproachVehicleFetchData.fetchThis(
            loadCayoPericoKosatkaApproachVehicle
        );
    resetContentParts();
    for (let layer of constantData.layers.cayoPericoKosatkaApproachVehicle) {
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
