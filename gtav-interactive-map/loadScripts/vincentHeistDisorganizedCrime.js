let vincentHeistDisorganizedCrimeFetchData = new LayerFetchData(
    "vincentHeistDisorganizedCrime"
);

function loadVincentHeistDisorganizedCrime(r) {
    if (constantData.layers.vincentHeistDisorganizedCrime !== undefined) return;
    constantData.layers.vincentHeistDisorganizedCrime = [];

    registerSingleMarkerArray(
        "vincentHeistDisorganizedCrime",
        constantData.layers.vincentHeistDisorganizedCrime,
        saveData.markerData.vincentHeistDisorganizedCrime,
        constantData.icons.garage,
        r,
        loadVincentHeistDisorganizedCrimeGUI
    );
}

vincentHeistDisorganizedCrimeFetchData.fetchThis(
    loadVincentHeistDisorganizedCrime
);

async function loadVincentHeistDisorganizedCrimeGUI() {
    if (!vincentHeistDisorganizedCrimeFetchData.loaded)
        await vincentHeistDisorganizedCrimeFetchData.fetchThis(
            loadVincentHeistDisorganizedCrime
        );
    resetContentParts();
    for (let layer of constantData.layers.vincentHeistDisorganizedCrime) {
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
