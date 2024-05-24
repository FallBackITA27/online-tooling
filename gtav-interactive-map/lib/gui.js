function completionButtonsDivUpdates(
    showAllButtonId,
    hideAllButtonId,
    showCompletedButtonId,
    hideCompletedButtonId,
    layers,
    lastPickName,
    completionSetName
) {
    function showAll() {
        saveData[lastPickName] = "showAll";
        saveDataSave();
        let i = 0;
        for (let layer of layers) {
            for (let object of layer) {
                if (!map.hasLayer(object)) object.addTo(map);
                if (saveData[completionSetName].has(i))
                    object._icon.classList.add("completed");
            }
            i++;
        }
    }

    function hideAll() {
        saveData[lastPickName] = "hideAll";
        saveDataSave();
        for (let layer of layers)
            for (let object of layer)
                if (map.hasLayer(object)) object.remove();
    }

    function showCompleted() {
        saveData[lastPickName] = "showCompleted";
        saveDataSave();
        let i = 0;
        for (let layer of layers) {
            for (let object of layer) {
                if (saveData[completionSetName].has(i)) {
                    if (!map.hasLayer(object)) object.addTo(map);
                    object._icon.classList.add("completed");
                } else {
                    object.remove();
                }
            }
            i++;
        }
    }

    function hideCompleted() {
        saveData[lastPickName] = "hideCompleted";
        saveDataSave();
        let i = 0;
        for (let layer of layers) {
            for (let object of layer) {
                if (!saveData[completionSetName].has(i)) {
                    if (!map.hasLayer(object)) object.addTo(map);
                } else {
                    object.remove();
                }
            }
            i++;
        }
    }

    document.getElementById(showAllButtonId).addEventListener("click", showAll);
    document.getElementById(hideAllButtonId).addEventListener("click", hideAll);
    document
        .getElementById(showCompletedButtonId)
        .addEventListener("click", showCompleted);
    document
        .getElementById(hideCompletedButtonId)
        .addEventListener("click", hideCompleted);

    if (saveData[lastPickName] === "showAll") {
        showAll();
    } else if (saveData[lastPickName] === "hideAll") {
        hideAll();
    } else if (saveData[lastPickName] === "showCompleted") {
        showCompleted();
    } else if (saveData[lastPickName] === "hideCompleted") {
        hideCompleted();
    }
}

function displayButtons(showAllButtonId, hideAllButtonId, layers, lastPickName) {
    function showAll() {
        saveData[lastPickName] = "showAll";
        saveDataSave();
        for (let layer of layers)
            for (let object of layer)
                if (!map.hasLayer(object)) object.addTo(map);
    }

    function hideAll() {
        saveData[lastPickName] = "hideAll";
        saveDataSave();
        for (let layer of layers) 
            for (let object of layer)
                if (map.hasLayer(object)) object.remove();
    }

    document.getElementById(showAllButtonId).addEventListener("click", showAll);
    document.getElementById(hideAllButtonId).addEventListener("click", hideAll);

    if (saveData[lastPickName] === "showAll") {
        showAll();
    } else if (saveData[lastPickName] === "hideAll") {
        hideAll();
    }
}
