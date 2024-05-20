function loadSignalJammers(r) {
    let onMapMarkers = genericCollectibleInsert(
        "signalJammersDiv",
        r,
        constantData.icons.signalJammer,
        "completionDataSignalJammers",
        "lastPickSignalJammers",
        "signalJammers",
        "markers-collectibles-signaljammers-completion-number",
        50
    );

    document.getElementById(
        "markers-collectibles-signaljammers-completion-number"
    ).innerHTML = `Completed ${saveData.completionDataSignalJammers.size}/50`;

    completionButtonsDivUpdates(
        "markers-collectibles-signaljammers-show-all-btn",
        "markers-collectibles-signaljammers-hide-all-btn",
        "markers-collectibles-signaljammers-show-completed-btn",
        "markers-collectibles-signaljammers-hide-completed-btn",
        onMapMarkers,
        "lastPickSignalJammers",
        "completionDataSignalJammers"
    );
}