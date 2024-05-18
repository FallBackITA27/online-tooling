function completionButtonsDivUpdates(
    showAllButtonId,
    hideAllButtonId,
    showCompletedButtonId,
    hideCompletedButtonId,
    onMapMarkers,
    lastPickName,
    completionSetName
) {
    function showAll() {
        saveData[lastPickName] = "showAll";
        saveDataSave();
        let i = 0;
        for (let markers of onMapMarkers) {
            if (!(markers instanceof Array)) {
                markers = [markers];
            }
            for (let marker of markers) {
                if (!map.hasLayer(marker)) marker.addTo(map);
                if (saveData[completionSetName].has(i))
                    marker._icon.classList.add("completed");
            }
            i++;
        }
    }

    function hideAll() {
        saveData[lastPickName] = "hideAll";
        saveDataSave();
        for (let markers of onMapMarkers) {
            if (!(markers instanceof Array)) {
                markers = [markers];
            }
            for (let marker of markers)
                if (map.hasLayer(marker)) marker.remove();
        }
    }

    function showCompleted() {
        saveData[lastPickName] = "showCompleted";
        saveDataSave();
        let i = 0;
        for (let markers of onMapMarkers) {
            if (!(markers instanceof Array)) {
                markers = [markers];
            }
            for (let marker of markers) {
                if (saveData[completionSetName].has(i)) {
                    if (!map.hasLayer(marker)) marker.addTo(map);
                    marker._icon.classList.add("completed");
                } else {
                    marker.remove();
                }
            }
            i++;
        }
    }

    function hideCompleted() {
        saveData[lastPickName] = "hideCompleted";
        saveDataSave();
        let i = 0;
        for (let markers of onMapMarkers) {
            if (!(markers instanceof Array)) {
                markers = [markers];
            }
            for (let marker of markers) {
                if (!saveData[completionSetName].has(i)) {
                    if (!map.hasLayer(marker)) marker.addTo(map);
                } else {
                    marker.remove();
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
