function loadLDOrganics(r) {
    let onMapMarkers = genericCollectibleInsert(
        "ldOrganicsDiv",
        r,
        constantData.icons.ldOrganics,
        "completionDataLDOrganics",
        "lastPickLDOrganics",
        "markers-collectibles-ldorganics-completion-number",
        100
    );

    document.getElementById(
        "markers-collectibles-ldorganics-completion-number"
    ).innerHTML = `Completed ${saveData.completionDataLDOrganics.size}/100`;

    completionButtonsDivUpdates(
        "markers-collectibles-ldorganics-show-all-btn",
        "markers-collectibles-ldorganics-hide-all-btn",
        "markers-collectibles-ldorganics-show-completed-btn",
        "markers-collectibles-ldorganics-hide-completed-btn",
        onMapMarkers,
        "lastPickLDOrganics",
        "completionDataLDOrganics"
    );
}