function iconFromIconData(iconData, i) {
    if (iconData instanceof Array)
        for (let [possibleIcon, index] of iconData)
            if (index <= i) return possibleIcon;
    return iconData;
}

function registerSingleMarkerArray(
    key,
    constantLayerData,
    markerData,
    iconData,
    jsonData,
    loadGUIFunc
) {
    let numericIdOffset = constantLayerData.length;
    for (let [i, marker] of jsonData.entries()) {
        let layer = new MapLayer(
            key,
            marker.display_name,
            i + numericIdOffset,
            markerData,
            constantLayerData
        );
        let actualMarker = L.marker(marker.coords, {
            icon: iconFromIconData(iconData, i),
            title: marker.display_name,
        });
        layer.push(actualMarker);
        constantLayerData.push(layer);
        actualMarker.on("click", function (e) {
            let markersMenu = document.getElementById("menuScroll").children[1];
            if (markersMenu.classList.contains("selected")) markersMenu.click();
            markersMenu.click();
            loadGUIFunc();
            document
                .getElementById("contentPart1")
                .children[i + numericIdOffset].click();
        });
        if (markerData.pick === "showAll") layer.addLayerToMap();
    }
}

function registerSingleCollectibleMarkerArray(
    key,
    constantLayerData,
    markerData,
    iconData,
    jsonData,
    loadGUIFunc
) {
    let numericIdOffset = constantLayerData.length;
    for (let [i, marker] of jsonData.entries()) {
        let layer = new MapLayer(
            key,
            marker.display_name,
            i + numericIdOffset,
            markerData,
            constantLayerData,
            {
                description: marker.description,
                video_id: marker.video_id,
                video_timestamp: marker.video_timestamp
            }
        );
        let actualMarker = L.marker(marker.coords, {
            icon: iconFromIconData(iconData, i),
            title: marker.display_name,
        });
        layer.push(actualMarker);
        constantLayerData.push(layer);
        actualMarker.on("click", function (e) {
            let markersMenu = document.getElementById("menuScroll").children[1];
            if (markersMenu.classList.contains("selected")) markersMenu.click();
            markersMenu.click();
            loadGUIFunc();
            document
                .getElementById("contentPart1")
                .children[i + numericIdOffset].click();
        });
        if (markerData.pick === "showAll") {
            layer.addLayerToMap();
        } else if (
            markerData.pick === "showCompleted" &&
            markerData.set.has(i)
        ) {
            layer.addLayerToMap();
        } else if (
            markerData.pick === "hideCompleted" &&
            !markerData.set.has(i)
        ) {
            layer.addLayerToMap();
        }
    }
}

function registerMultiCollectibleMarkerArray(
    key,
    constantLayerData,
    markerData,
    iconData,
    jsonData,
    loadGUIFunc
) {
    let numericIdOffset = constantLayerData.length;
    for (let [i, marker] of jsonData.entries()) {
        let layer = new MapLayer(
            key,
            marker.display_name,
            i + numericIdOffset,
            markerData,
            constantLayerData,
            {
                description: marker.description,
                video_id: marker.video_id,
                video_timestamp: marker.video_timestamp
            }
        );
        for (let coords of marker.coords) {
            let actualMarker = L.marker(coords, {
                icon: iconFromIconData(iconData, i),
                title: marker.display_name,
            });
            layer.push(actualMarker);
            actualMarker.on("click", function (e) {
                let markersMenu = document.getElementById("menuScroll").children[1];
                if (markersMenu.classList.contains("selected")) markersMenu.click();
                markersMenu.click();
                loadGUIFunc();
                document
                    .getElementById("contentPart1")
                    .children[i + numericIdOffset].click();
            });
        }
        constantLayerData.push(layer);
        if (markerData.pick === "showAll") {
            layer.addLayerToMap();
        } else if (
            markerData.pick === "showCompleted" &&
            markerData.set.has(i)
        ) {
            layer.addLayerToMap();
        } else if (
            markerData.pick === "hideCompleted" &&
            !markerData.set.has(i)
        ) {
            layer.addLayerToMap();
        }
    }
}

function registerSingleCircleMarkerArray(
    key,
    constantLayerData,
    markerData,
    jsonData,
    loadGUIFunc
) {
    let numericIdOffset = constantLayerData.length;
    for (let [i, marker] of jsonData.entries()) {
        let layer = new MapLayer(
            key,
            marker.display_name,
            i + numericIdOffset,
            markerData,
            constantLayerData
        );
        let actualMarker = L.circleMarker(marker.coords, marker.options);
        if (marker.tooltip_options !== false)
            actualMarker.bindTooltip(
                marker.display_name,
                marker.tooltip_options
            );
        actualMarker.on("click", function (e) {
            let markersMenu = document.getElementById("menuScroll").children[1];
            if (markersMenu.classList.contains("selected")) markersMenu.click();
            markersMenu.click();
            loadGUIFunc();
            document
                .getElementById("contentPart1")
                .children[i + numericIdOffset].click();
        });
        layer.push(actualMarker);
        constantLayerData.push(layer);
        if (markerData.pick === "showAll") layer.addLayerToMap();
    }
}

function multiMarkerCollectibleInsert(
    parentDivId,
    array,
    iconData,
    completionSetName,
    lastPickName,
    completedAmountParagraphId = null,
    maxSetSize = saveData[completionSetName].size,
    layers = [],
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
            layers.pushMapLayer(actualMarker, i);
        }

        markAsCompleteBtn.addEventListener("click", (e) => {
            if (e.target.checked) {
                saveData[completionSetName].add(i);
                for (let actualMarker of layers[i]) {
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
                for (let actualMarker of layers[i]) {
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

    return layers;
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
    layers = [],
    startIndex = 0
) {
    let parentDiv = document.getElementById(parentDivId);
    for (let i = startIndex; i - startIndex < array.length; i++) {
        let icon = iconFromIconData(iconData, i);

        let actualMarker = L.marker(array[i - startIndex].coords, {
            icon: icon,
            title: array[i - startIndex].display_name,
        });
        layers.pushMapLayer(actualMarker, i);

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

    return layers;
}
