function loadVincentHeistConcealedWeapons(r) {
    let layers = genericMarkers(
        "concealedWeaponsDiv",
        r,
        [
            [constantData.icons.objectiveCyellow, 2],
            [constantData.icons.objectiveByellow, 1],
            [constantData.icons.objectiveAyellow, 0],
        ],
        "lastPickVincentHeistConcealedWeapons"
    );

    displayButtons(
        "markers-vincentheist-concealedweapons-show-all-btn",
        "markers-vincentheist-concealedweapons-hide-all-btn",
        layers,
        "lastPickVincentHeistConcealedWeapons"
    );
}