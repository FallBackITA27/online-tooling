function loadKosatkaFastTravels(r) {
    let layers = genericMarkers(
        "kosatkaFastTravelsDiv",
        r,
        constantData.icons.kosatka,
        "lastPickKosatkaFastTravels"
    );

    displayButtons(
        "markers-cayopericoheist-kosatkafasttravels-show-all-btn",
        "markers-cayopericoheist-kosatkafasttravels-hide-all-btn",
        layers,
        "lastPickKosatkaFastTravels"
    );
}