function loadVincentHeistBreakingAndEntering(r) {
    let layers = genericPolygon(
        "breakingAndEnteringDiv",
        r.searchAreas
    );

    layers = genericMarkers(
        "breakingAndEnteringDiv",
        r.terrorbyteSpots,
        constantData.icons.terrorbyteblue,
        "lastPickVincentHeistBreakingAndEntering",
        layers,
        layers.length
    );

    layers = genericMarkers(
        "breakingAndEnteringDiv",
        r.techbroSpots,
        constantData.icons.laptopgreen,
        "lastPickVincentHeistBreakingAndEntering",
        layers,
        layers.length
    );

    displayButtons(
        "markers-vincentheist-breakingandentering-show-all-btn",
        "markers-vincentheist-breakingandentering-hide-all-btn",
        layers,
        "lastPickVincentHeistBreakingAndEntering"
    );
}