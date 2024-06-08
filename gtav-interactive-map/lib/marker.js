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