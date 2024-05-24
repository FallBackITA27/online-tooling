function loadCayoPericoCuttingTorch(r) {
    let layers = genericCircles(
        "cuttingTorchDiv",
        r,
    );

    displayButtons(
        "markers-cayopericoheist-cuttingtorch-show-all-btn",
        "markers-cayopericoheist-cuttingtorch-hide-all-btn",
        layers,
        "lastPickCayoPericoCuttingTorch"
    );
}