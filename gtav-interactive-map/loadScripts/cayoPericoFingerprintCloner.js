function loadCayoPericoFingerprintCloner(r) {
    let layers = genericLine(
        "fingerprintClonerDiv",
        r,
    );

    displayButtons("markers-cayopericoheist-fingerprintcloner-show-all-btn", "markers-cayopericoheist-fingerprintcloner-hide-all-btn", layers, "lastPickCayoPericoFingerprintCloner");
}