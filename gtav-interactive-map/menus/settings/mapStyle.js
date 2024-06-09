function mapStyleSettings() {
    resetContentPart2();
    const names = ["game", "render", "print"];
    const namesDisp = ["In Game", "Satellite", "Game Manual"];

    let optionDiv = document.createElement("div");
    optionDiv.innerHTML = "Map Style";

    let interactiveDiv = document.createElement("div");

    let img1 = document.createElement("img");
    img1.src = "./websiteIcons/small_arr_left.svg";
    interactiveDiv.appendChild(img1);

    interactiveDiv.innerHTML += `<p>${
        namesDisp[names.indexOf(saveData.selectedTileLayer)]
    }</p>`;

    let img2 = document.createElement("img");
    img2.src = "./websiteIcons/small_arr_right.svg";
    interactiveDiv.appendChild(img2);

    interactiveDiv.style = "display: flex; align-items: center;";
    optionDiv.appendChild(interactiveDiv);

    contentPart2.append(optionDiv);

    function refreshMap(idx) {
        interactiveDiv.children[1].innerHTML = namesDisp[idx];
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
