function loadVincentHeistDisorganizedCrime(r) {
    let layers = genericMarkers(
        "disorganizedCrimeDiv",
        r,
        constantData.icons.garage,
        "lastPickVincentHeistDisorganizedCrime"
    );

    displayButtons(
        "markers-vincentheist-disorganizedcrime-show-all-btn",
        "markers-vincentheist-disorganizedcrime-hide-all-btn",
        layers,
        "lastPickVincentHeistDisorganizedCrime"
    );
}