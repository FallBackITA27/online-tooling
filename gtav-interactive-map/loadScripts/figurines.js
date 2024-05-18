function loadFigurines(r) {
    let onMapMarkers = genericCollectibleInsert(
        "actionFiguresDiv",
        r,
        constantData.icons.figurine,
        "completionDataFigurines",
        "lastPickFigurines",
        "markers-collectibles-actionfigures-completion-number",
        100
    );

    document.getElementById(
        "markers-collectibles-actionfigures-completion-number"
    ).innerHTML = `Completed ${saveData.completionDataFigurines.size}/100`;

    completionButtonsDivUpdates(
        "markers-collectibles-actionfigures-show-all-btn",
        "markers-collectibles-actionfigures-hide-all-btn",
        "markers-collectibles-actionfigures-show-completed-btn",
        "markers-collectibles-actionfigures-hide-completed-btn",
        onMapMarkers,
        "lastPickFigurines",
        "completionDataFigurines"
    );
}
