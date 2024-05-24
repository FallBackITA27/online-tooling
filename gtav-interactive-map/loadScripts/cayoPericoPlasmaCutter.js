function loadCayoPericoPlasmaCutter(r) {
    let layers = genericLine(
        "plasmaCutterDiv",
        r,
    );

    displayButtons("markers-cayopericoheist-plasmacutter-show-all-btn", "markers-cayopericoheist-plasmacutter-hide-all-btn", layers, "lastPickCayoPericoPlasmaCutter");
}