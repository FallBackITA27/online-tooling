function loadCayoPericoLongfinApproachVehicle(r) {
    let layers = genericMarkers(
        "longfinApproachVehicleDiv",
        r.longfinMarkers,
        constantData.icons.boat,
        "lastPickCayoPericoLongfinApproachVehicle"
    );

    layers = genericCircles(
        "longfinApproachVehicleDiv",
        r.dockMarkers,
        layers,
        r.longfinMarkers.length,
    )

    displayButtons(
        "markers-cayopericoheist-longfinapproachvehicle-show-all-btn",
        "markers-cayopericoheist-longfinapproachvehicle-hide-all-btn",
        layers,
        "lastPickCayoPericoLongfinApproachVehicle"
    );
}
