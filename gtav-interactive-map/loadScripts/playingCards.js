let playingCardsFetchData = new LayerFetchData("playingCards");

function loadPlayingCards(r) {
    if (constantData.layers.playingCards !== undefined) return;
    constantData.layers.playingCards = [];

    registerSingleCollectibleMarkerArray(
        "playingCards",
        constantData.layers.playingCards,
        saveData.markerData.playingCards,
        constantData.icons.playingCard,
        r,
        loadPlayingCardsGUI
    );
}

playingCardsFetchData.fetchThis(loadPlayingCards);

async function loadPlayingCardsGUI() {
    if (!playingCardsFetchData.loaded)
        await playingCardsFetchData.fetchThis(loadPlayingCards);
    resetContentParts();
    for (let layer of constantData.layers.playingCards) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs =
                    new GenericHTMLConglomerate().genericCollectibleMarkerOptions(
                        layer,
                        constantData.layers.playingCards.length
                    );

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
