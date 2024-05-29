function loadVincentHeistSlushFund(r) {
    let layers = genericMarkers(
        "slushFundDiv",
        r,
        [
            [constantData.icons.objectiveByellow, 1],
            [constantData.icons.objectiveAyellow, 0],
        ],
        "lastPickVincentHeistSlushFund"
    );

    displayButtons(
        "markers-vincentheist-slushfund-show-all-btn",
        "markers-vincentheist-slushfund-hide-all-btn",
        layers,
        "lastPickVincentHeistSlushFund"
    );
}