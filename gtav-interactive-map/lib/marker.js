function markerClickEvent(linkDiv, coords, title) {
    document.getElementById("gui_toggle_button_div").click();
    linkDiv.scrollIntoView();
    map.setView(coords, 6);
    Array.from(document.getElementsByClassName("hl")).forEach((r) =>
        r.classList.remove("hl")
    );
    title.classList.add("hl");
}

function iconFromIconData(iconData, i) {
    if (iconData instanceof Array)
        for (let [possibleIcon, index] of iconData)
            if (index <= i) return possibleIcon;
    return iconData;
}

function genericMarkers(
    parentDivId,
    array,
    iconData,
    lastPickName,
    onMapMarkers = [],
    startIndex = 0
) {
    let parentDiv = document.getElementById(parentDivId);
    for (let i = startIndex; i - startIndex < array.length; i++) {
        let icon = iconFromIconData(iconData, i);

        let actualMarker = L.marker(array[i - startIndex].coords, {
            icon: icon,
            title: array[i - startIndex].display_name,
        });
        onMapMarkers.push(actualMarker);

        let hr = document.createElement("hr");
        hr.classList.add("twentyfive");
        parentDiv.append(hr);

        let linkDiv = document.createElement("div");
        linkDiv.id =
            "#" + array[i - startIndex].display_name.replaceAll(" ", "-");
        parentDiv.append(linkDiv);

        let title = document.createElement("h2");
        title.innerHTML = array[i - startIndex].display_name;
        parentDiv.append(title);

        let zoom = document.createElement("button");
        zoom.innerHTML = "Zoom to Marker";
        zoom.addEventListener("click", function () {
            document.getElementById("gui_toggle_button_div").click();
            map.setView(array[i - startIndex].coords, 7);
            if (!map.hasLayer(actualMarker)) actualMarker.addTo(map);
        });
        parentDiv.append(zoom);

        actualMarker.on("click", () =>
            markerClickEvent(linkDiv, array[i - startIndex].coords, title)
        );
    }

    return onMapMarkers;
}

function multiMarkerCollectibleInsert(
    parentDivId,
    array,
    iconData,
    completionSetName,
    lastPickName,
    completedAmountParagraphId = null,
    maxSetSize = saveData[completionSetName].size,
    onMapMarkers = [],
    startIndex = 0
) {
    let parentDiv = document.getElementById(parentDivId);
    for (let i = startIndex; i - startIndex < array.flat().length; i++) {
        let icon = iconFromIconData(iconData, i);
        let hr = document.createElement("hr");
        hr.classList.add("twentyfive");
        parentDiv.append(hr);
        let linkDiv = document.createElement("div");
        linkDiv.id =
            "#" + array[i - startIndex].display_name.replaceAll(" ", "-");
        parentDiv.append(linkDiv);

        let title = document.createElement("h2");
        title.innerHTML = array[i - startIndex].display_name;
        parentDiv.append(title);

        let label = document.createElement("label");
        label.for = "check";
        label.innerHTML = "Completed?";
        parentDiv.append(label);

        let markAsCompleteBtn = document.createElement("input");
        markAsCompleteBtn.name = "check";
        markAsCompleteBtn.type = "checkbox";
        markAsCompleteBtn.checked = saveData[completionSetName].has(i);
        parentDiv.append(markAsCompleteBtn);

        let sharedMarkers = [];

        for (let j = 0; j < array[i - startIndex].coords.length; j++) {
            let actualMarker = L.marker(array[i - startIndex].coords[j], {
                icon: icon,
                title: array[i - startIndex].display_name,
            });

            let locationTitle = document.createElement("h3");
            locationTitle.innerHTML = `Location ${j + 1}`;
            parentDiv.append(locationTitle);

            let description = document.createElement("p");
            description.innerHTML = array[i - startIndex].description[j];
            parentDiv.append(description);

            let video = document.createElement("button");
            video.innerHTML = "Video";
            video.addEventListener("click", function () {
                player.loadVideoById({
                    videoId: array[i - startIndex].video_id[j],
                    startSeconds: array[i - startIndex].video_timestamp[j],
                });
                document.getElementById("videoplayer").classList.add("s");
            });
            parentDiv.append(video);

            let zoom = document.createElement("button");
            zoom.innerHTML = "Zoom to Marker";
            zoom.addEventListener("click", function () {
                document.getElementById("gui_toggle_button_div").click();
                map.setView(array[i - startIndex].coords[j], 7);
                if (!map.hasLayer(actualMarker)) actualMarker.addTo(map);
            });

            actualMarker.on("click", () =>
                markerClickEvent(
                    linkDiv,
                    array[i - startIndex].coords[j],
                    title
                )
            );

            parentDiv.append(zoom);
            sharedMarkers.push(actualMarker);
        }

        onMapMarkers.push(sharedMarkers);

        markAsCompleteBtn.addEventListener("click", (e) => {
            if (e.target.checked) {
                saveData[completionSetName].add(i);
                for (let actualMarker of sharedMarkers) {
                    if (saveData[lastPickName] === "showCompleted") {
                        if (!map.hasLayer(actualMarker))
                            actualMarker.addTo(map);
                    } else if (saveData[lastPickName] === "hideCompleted") {
                        if (map.hasLayer(actualMarker)) actualMarker.remove();
                    }
                    if (map.hasLayer(actualMarker))
                        actualMarker._icon.classList.add("completed");
                }
            } else {
                saveData[completionSetName].delete(i);
                for (let actualMarker of sharedMarkers) {
                    if (saveData[lastPickName] === "showCompleted") {
                        if (map.hasLayer(actualMarker)) actualMarker.remove();
                    } else if (saveData[lastPickName] === "hideCompleted") {
                        if (!map.hasLayer(actualMarker))
                            actualMarker.addTo(map);
                    }
                    if (map.hasLayer(actualMarker))
                        actualMarker._icon.classList.remove("completed");
                }
            }
            if (completedAmountParagraphId != null)
                document.getElementById(
                    completedAmountParagraphId
                ).innerHTML = `Completed ${saveData[completionSetName].size}/${maxSetSize}`;
            saveDataSave();
        });
    }

    return onMapMarkers;
}

function genericCollectibleInsert(
    parentDivId,
    array,
    iconData,
    completionSetName,
    lastPickName,
    imgName,
    completedAmountParagraphId = null,
    maxSetSize = saveData[completionSetName].size,
    onMapMarkers = [],
    startIndex = 0
) {
    let parentDiv = document.getElementById(parentDivId);
    for (let i = startIndex; i - startIndex < array.length; i++) {
        let icon = iconFromIconData(iconData, i);

        let actualMarker = L.marker(array[i - startIndex].coords, {
            icon: icon,
            title: array[i - startIndex].display_name,
        });
        onMapMarkers.push(actualMarker);

        let hr = document.createElement("hr");
        hr.classList.add("twentyfive");
        parentDiv.append(hr);

        let linkDiv = document.createElement("div");
        linkDiv.id =
            "#" + array[i - startIndex].display_name.replaceAll(" ", "-");
        parentDiv.append(linkDiv);

        let title = document.createElement("h2");
        title.innerHTML = array[i - startIndex].display_name;
        parentDiv.append(title);

        let description = document.createElement("p");
        description.innerHTML = array[i - startIndex].description;
        parentDiv.append(description);

        let label = document.createElement("label");
        label.for = "check";
        label.innerHTML = "Completed?";
        parentDiv.append(label);

        let markAsCompleteBtn = document.createElement("input");
        markAsCompleteBtn.name = "check";
        markAsCompleteBtn.type = "checkbox";
        markAsCompleteBtn.addEventListener("click", (e) => {
            if (e.target.checked) {
                saveData[completionSetName].add(i);
                if (saveData[lastPickName] === "showCompleted") {
                    if (!map.hasLayer(actualMarker)) actualMarker.addTo(map);
                } else if (saveData[lastPickName] === "hideCompleted") {
                    if (map.hasLayer(actualMarker)) actualMarker.remove();
                }
                if (map.hasLayer(actualMarker))
                    actualMarker._icon.classList.add("completed");
            } else {
                saveData[completionSetName].delete(i);
                if (saveData[lastPickName] === "showCompleted") {
                    if (map.hasLayer(actualMarker)) actualMarker.remove();
                } else if (saveData[lastPickName] === "hideCompleted") {
                    if (!map.hasLayer(actualMarker)) actualMarker.addTo(map);
                }
                if (map.hasLayer(actualMarker))
                    actualMarker._icon.classList.remove("completed");
            }
            if (completedAmountParagraphId != null)
                document.getElementById(
                    completedAmountParagraphId
                ).innerHTML = `Completed ${saveData[completionSetName].size}/${maxSetSize}`;
            saveDataSave();
        });
        markAsCompleteBtn.checked = saveData[completionSetName].has(i);
        parentDiv.append(markAsCompleteBtn);
        parentDiv.append(document.createElement("br"));

        let video = document.createElement("button");
        video.innerHTML = "Video";
        video.addEventListener("click", function () {
            player.loadVideoById({
                videoId: array[i - startIndex].video_id,
                startSeconds: array[i - startIndex].video_timestamp,
            });
            document.getElementById("videoplayer").classList.add("s");
        });
        parentDiv.append(video);
        parentDiv.append(document.createElement("br"));

        let zoom = document.createElement("button");
        zoom.innerHTML = "Zoom to Marker";
        zoom.addEventListener("click", function () {
            document.getElementById("gui_toggle_button_div").click();
            map.setView(array[i - startIndex].coords, 7);
            if (!map.hasLayer(actualMarker)) actualMarker.addTo(map);
        });
        parentDiv.append(zoom);
        parentDiv.append(document.createElement("br"));

        let img = document.createElement("img");
        img.alt = "No image here? Submit one yourself on Github.";
        img.src = `./imgs/${imgName}/${i}.jpg`;
        img.classList.add("prevImage");
        parentDiv.append(img);

        actualMarker.on("click", () =>
            markerClickEvent(linkDiv, array[i - startIndex].coords, title)
        );
    }

    return onMapMarkers;
}
