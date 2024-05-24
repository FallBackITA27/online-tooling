function loadCayoPericoScopeOutPlane(r) {
    let layers = genericMarkers(
        "scopeOutPlaneDiv",
        r,
        constantData.icons.plane,
        "lastPickCayoPericoScopeOutPlane"
    );

    displayButtons(
        "markers-cayopericoheist-scopeoutplane-show-all-btn",
        "markers-cayopericoheist-scopeoutplane-hide-all-btn",
        layers,
        "lastPickCayoPericoScopeOutPlane"
    );
}