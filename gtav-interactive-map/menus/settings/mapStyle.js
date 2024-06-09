function mapStyleSettings() {
    resetContentPart2();
    const names = ["game", "render", "print"];
    const namesDisp = ["In Game", "Satellite", "Game Manual"];

    let optionDiv = new OptionDivFactory(
        "Map Style",
        namesDisp[names.indexOf(saveData.selectedTileLayer)]
    ).createArrowful();
    contentPart2.append(optionDiv);

    function refreshMap(idx) {
        optionDiv.children[0].children[1].innerHTML = namesDisp[idx];
        constantData.tileLayers.mainMap[saveData.selectedTileLayer].remove();
        saveData.selectedTileLayer = names[idx];
        saveDataSave();
        constantData.tileLayers.mainMap[saveData.selectedTileLayer].addTo(map);
        document.getElementById("map").style.background =
            constantData.oceanColors.mainMap[saveData.selectedTileLayer];
    }

    optionDiv.addEventListener("click", function () {
        let idx = names.indexOf(saveData.selectedTileLayer) + 1;
        if (idx === 3) idx = 0;
        refreshMap(idx);
    });
}
