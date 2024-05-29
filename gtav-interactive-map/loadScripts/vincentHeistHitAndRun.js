function loadVincentHeistHitAndRun(r) {
    let layers = genericMarkers(
        "hitAndRunDiv",
        r,
        [
            [constantData.icons.garageyellow, 3],
            [constantData.icons.objectiveCyellow, 2],
            [constantData.icons.objectiveByellow, 1],
            [constantData.icons.objectiveAyellow, 0],
        ],
        "lastPickVincentHeistHitAndRun"
    );

    displayButtons(
        "markers-vincentheist-hitandrun-show-all-btn",
        "markers-vincentheist-hitandrun-hide-all-btn",
        layers,
        "lastPickVincentHeistHitAndRun"
    );
}