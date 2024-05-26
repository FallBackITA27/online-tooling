function loadCayoPericoKosatkaApproachVehicle(r) {
    let layers = genericMarkers(
        "kosatkaApproachVehicleDiv",
        r,
        constantData.icons.kosatkaRed,
        "lastPickCayoPericoKosatkaApproachVehicle"
    );

    displayButtons(
        "markers-cayopericoheist-kosatkaapproachvehicle-show-all-btn",
        "markers-cayopericoheist-kosatkaapproachvehicle-hide-all-btn",
        layers,
        "lastPickCayoPericoKosatkaApproachVehicle"
    );
}
