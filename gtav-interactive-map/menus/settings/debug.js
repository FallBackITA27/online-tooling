function debugSettings() {
    resetContentPart2();
    let optionDiv = document.createElement("div");
    optionDiv.innerHTML = "On Click Coordinates";

    let interactiveDiv = document.createElement("div");

    let img1 = document.createElement("img");
    img1.src = "./websiteIcons/small_arr_left.svg";
    interactiveDiv.appendChild(img1);

    interactiveDiv.innerHTML += `<p>${
        saveData.pointerMode ? "True" : "False"
    }</p>`;

    let img2 = document.createElement("img");
    img2.src = "./websiteIcons/small_arr_right.svg";
    interactiveDiv.appendChild(img2);
    interactiveDiv.style = "display: flex; align-items: center;";

    optionDiv.appendChild(interactiveDiv);
    optionDiv.addEventListener("click", function () {
        saveData.pointerMode = !saveData.pointerMode;
        saveDataSave();
        interactiveDiv.children[1].innerHTML = saveData.pointerMode
            ? "True"
            : "False";

        if (saveData.pointerMode) {
            map.on("click", clickDebugFunction);
        } else {
            map.off("click", clickDebugFunction);
        }
    });

    contentPart2.append(optionDiv);
}
