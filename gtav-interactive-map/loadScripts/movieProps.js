function loadMovieProps(r) {
    let onMapMarkers = genericCollectibleInsert(
        "moviePropsDiv",
        r.singleMarker,
        constantData.icons.movieProp,
        "completionDataMovieProps",
        "lastPickMovieProps",
        "markers-collectibles-movieprops-completion-number",
        10
    );

    document.getElementById(
        "markers-collectibles-movieprops-completion-number"
    ).innerHTML = `Completed ${saveData.completionDataMovieProps.size}/10`;

    onMapMarkers = multiMarkerCollectibleInsert(
        "moviePropsDiv",
        r.multiMarker,
        [
            [constantData.icons.moviePropTruckRebel, 9],
            [constantData.icons.moviePropTruckRumpo, 8],
            [constantData.icons.moviePropTruckPony, 7],
        ],
        "completionDataMovieProps",
        "lastPickMovieProps",
        "markers-collectibles-movieprops-completion-number",
        10,
        onMapMarkers,
        7
    );

    completionButtonsDivUpdates(
        "markers-collectibles-movieprops-show-all-btn",
        "markers-collectibles-movieprops-hide-all-btn",
        "markers-collectibles-movieprops-show-completed-btn",
        "markers-collectibles-movieprops-hide-completed-btn",
        onMapMarkers,
        "lastPickMovieProps",
        "completionDataMovieProps"
    );
}