function loadVincentHeistSceneOfTheCrime(r) {
    let layers = genericCircles(
        "sceneoftheCrimeDiv",
        r,
    );

    displayButtons(
        "markers-vincentheist-sceneofthecrime-show-all-btn",
        "markers-vincentheist-sceneofthecrime-hide-all-btn",
        layers,
        "lastPickVincentHeistSceneOfTheCrime"
    );
}