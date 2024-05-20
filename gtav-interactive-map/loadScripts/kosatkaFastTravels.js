function loadKosatkaFastTravels(r) {
    let onMapMarkers = genericMarkers(
        "kosatkaFastTravelsDiv",
        r,
        constantData.icons.kosatka,
        "lastPickKosatkaFastTravels"
    );

    displayButtons(
        "markers-cayopericoheist-kosatkafasttravels-show-all-btn",
        "markers-cayopericoheist-kosatkafasttravels-hide-all-btn",
        onMapMarkers,
        "lastPickKosatkaFastTravels"
    );
}