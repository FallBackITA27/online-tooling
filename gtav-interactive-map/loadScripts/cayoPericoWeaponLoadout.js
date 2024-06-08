let cayoPericoWeaponLoadoutFetchData = new LayerFetchData(
    "cayoPericoWeaponLoadout"
);

function loadCayoPericoWeaponLoadout(r) {
    if (constantData.layers.cayoPericoWeaponLoadout !== undefined) return;
    constantData.layers.cayoPericoWeaponLoadout = [];

    registerSingleLineArray(
        "cayoPericoWeaponLoadout",
        constantData.layers.cayoPericoWeaponLoadout,
        saveData.markerData.cayoPericoWeaponLoadout,
        r.line,
        loadCayoPericoWeaponLoadoutGUI
    );

    registerSingleMarkerArray(
        "cayoPericoWeaponLoadout",
        constantData.layers.cayoPericoWeaponLoadout,
        saveData.markerData.cayoPericoWeaponLoadout,
        constantData.icons.weaponLocker,
        r.singleMarkers,
        loadCayoPericoWeaponLoadoutGUI
    );
}

cayoPericoWeaponLoadoutFetchData.fetchThis(loadCayoPericoWeaponLoadout);

async function loadCayoPericoWeaponLoadoutGUI() {
    if (!cayoPericoWeaponLoadoutFetchData.loaded)
        await cayoPericoWeaponLoadoutFetchData.fetchThis(
            loadCayoPericoWeaponLoadout
        );
    resetContentParts();
    for (let layer of constantData.layers.cayoPericoWeaponLoadout) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs;
                if (layer.title === "Weapon Loadout") {
                    divs = new GenericHTMLConglomerate().genericLineOptions(
                        layer
                    );
                } else {
                    divs = new GenericHTMLConglomerate().genericMarkerOptions(
                        layer
                    );
                }

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
