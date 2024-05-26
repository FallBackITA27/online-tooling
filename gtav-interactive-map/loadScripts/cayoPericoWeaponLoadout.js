function loadCayoPericoWeaponLoadout(r) {
    let layers = genericLine("weaponLoadoutDiv", r.line);

    layers = genericMarkers(
        "weaponLoadoutDiv",
        r.singleMarkers,
        constantData.icons.weaponLocker,
        "lastPickCayoPericoWeaponLoadout",
        layers,
        1
    );

    displayButtons(
        "markers-cayopericoheist-weaponloadout-show-all-btn",
        "markers-cayopericoheist-weaponloadout-hide-all-btn",
        layers,
        "lastPickCayoPericoWeaponLoadout"
    );
}
