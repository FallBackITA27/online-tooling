function debugSettings() {
    resetContentPart2();
    let optionDiv = new OptionDivFactory(
        "On Click Coordinates",
        saveData.pointerMode ? "True" : "False"
    ).createArrowful();
    contentPart2.append(optionDiv);

    optionDiv.addEventListener("click", function () {
        saveData.pointerMode = !saveData.pointerMode;
        saveDataSave();
        optionDiv.children[0].children[1].innerHTML = saveData.pointerMode
            ? "True"
            : "False";

        if (saveData.pointerMode) {
            map.on("click", clickDebugFunction);
        } else {
            map.off("click", clickDebugFunction);
        }
    });
}
