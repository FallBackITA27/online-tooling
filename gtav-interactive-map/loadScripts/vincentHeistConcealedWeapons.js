let vincentHeistConcealedWeaponsFetchData = new LayerFetchData(
    "vincentHeistConcealedWeapons"
);

function loadVincentHeistConcealedWeapons(r) {
    if (constantData.layers.vincentHeistConcealedWeapons !== undefined) return;
    constantData.layers.vincentHeistConcealedWeapons = [];

    registerSingleMarkerArray(
        "vincentHeistConcealedWeapons",
        constantData.layers.vincentHeistConcealedWeapons,
        saveData.markerData.vincentHeistConcealedWeapons,
        [
            [constantData.icons.objectiveCyellow, 2],
            [constantData.icons.objectiveByellow, 1],
            [constantData.icons.objectiveAyellow, 0],
        ],
        r,
        loadVincentHeistConcealedWeaponsGUI
    );
}

vincentHeistConcealedWeaponsFetchData.fetchThis(
    loadVincentHeistConcealedWeapons
);

async function loadVincentHeistConcealedWeaponsGUI() {
    if (!vincentHeistConcealedWeaponsFetchData.loaded)
        await vincentHeistConcealedWeaponsFetchData.fetchThis(
            loadVincentHeistConcealedWeapons
        );
    resetContentParts();
    for (let layer of constantData.layers.vincentHeistConcealedWeapons) {
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
