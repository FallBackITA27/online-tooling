let cayoPericoLongfinApproachVehicleFetchData = new LayerFetchData(
    "cayoPericoLongfinApproachVehicle"
);

function loadCayoPericoLongfinApproachVehicle(r) {
    if (constantData.layers.cayoPericoLongfinApproachVehicle !== undefined)
        return;
    constantData.layers.cayoPericoLongfinApproachVehicle = [];

    registerSingleMarkerArray(
        "cayoPericoLongfinApproachVehicle",
        constantData.layers.cayoPericoLongfinApproachVehicle,
        saveData.markerData.cayoPericoLongfinApproachVehicle,
        constantData.icons.boat,
        r.longfinMarkers,
        loadCayoPericoLongfinApproachVehicleGUI
    );

    registerSingleCircleMarkerArray(
        "cayoPericoLongfinApproachVehicle",
        constantData.layers.cayoPericoLongfinApproachVehicle,
        saveData.markerData.cayoPericoLongfinApproachVehicle,
        r.dockMarkers,
        loadCayoPericoCuttingTorchGUI
    );
}

cayoPericoLongfinApproachVehicleFetchData.fetchThis(
    loadCayoPericoLongfinApproachVehicle
);

async function loadCayoPericoLongfinApproachVehicleGUI() {
    if (!cayoPericoLongfinApproachVehicleFetchData.loaded)
        await cayoPericoLongfinApproachVehicleFetchData.fetchThis(
            loadCayoPericoLongfinApproachVehicle
        );
    resetContentParts();
    for (let layer of constantData.layers.cayoPericoLongfinApproachVehicle) {
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
