function loadPlayingCards(r) {
    let onMapMarkers = genericCollectibleInsert(
        "playingCardsDiv",
        r,
        constantData.icons.playingCard,
        "completionDataPlayingCards",
        "lastPickPlayingCards",
        "playingCards",
        "markers-collectibles-playingcards-completion-number",
        54
    );

    document.getElementById(
        "markers-collectibles-playingcards-completion-number"
    ).innerHTML = `Completed ${saveData.completionDataPlayingCards.size}/54`;

    completionButtonsDivUpdates(
        "markers-collectibles-playingcards-show-all-btn",
        "markers-collectibles-playingcards-hide-all-btn",
        "markers-collectibles-playingcards-show-completed-btn",
        "markers-collectibles-playingcards-hide-completed-btn",
        onMapMarkers,
        "lastPickPlayingCards",
        "completionDataPlayingCards"
    );
}
