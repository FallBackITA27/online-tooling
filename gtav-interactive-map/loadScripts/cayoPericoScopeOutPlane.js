function loadCayoPericoScopeOutPlane(r) {
    let onMapMarkers = genericMarkers(
        "scopeOutPlaneDiv",
        r,
        constantData.icons.plane,
        "lastPickCayoPericoScopeOutPlane"
    );

    displayButtons(
        "markers-cayopericoheist-scopeoutplane-show-all-btn",
        "markers-cayopericoheist-scopeoutplane-hide-all-btn",
        onMapMarkers,
        "lastPickCayoPericoScopeOutPlane"
    );
}