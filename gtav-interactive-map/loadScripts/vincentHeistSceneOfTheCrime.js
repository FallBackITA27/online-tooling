let vincentHeistSceneOfTheCrimeFetchData = new LayerFetchData(
    "vincentHeistSceneOfTheCrime"
);

function loadVincentHeistSceneOfTheCrime(r) {
    if (constantData.layers.vincentHeistSceneOfTheCrime !== undefined) return;
    constantData.layers.vincentHeistSceneOfTheCrime = [];

    registerSingleCircleMarkerArray(
        "vincentHeistSceneOfTheCrime",
        constantData.layers.vincentHeistSceneOfTheCrime,
        saveData.markerData.vincentHeistSceneOfTheCrime,
        r,
        loadVincentHeistSceneOfTheCrimeGUI
    );
}

vincentHeistSceneOfTheCrimeFetchData.fetchThis(loadVincentHeistSceneOfTheCrime);

async function loadVincentHeistSceneOfTheCrimeGUI() {
    if (!vincentHeistSceneOfTheCrimeFetchData.loaded)
        await vincentHeistSceneOfTheCrimeFetchData.fetchThis(
            loadVincentHeistSceneOfTheCrime
        );
    resetContentParts();
    for (let layer of constantData.layers.vincentHeistSceneOfTheCrime) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs = new GenericHTMLConglomerate().genericMarkerOptions(
                    layer
                );

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
