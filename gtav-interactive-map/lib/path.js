function registerSingleLineArray(
    key,
    constantLayerData,
    markerData,
    jsonData,
    loadGUIFunc
) {
    let numericIdOffset = constantLayerData.length;
    for (let [i, line] of jsonData.entries()) {
        let layer = new MapLayer(
            key,
            line.display_name,
            i + numericIdOffset,
            markerData,
            constantLayerData
        );
        let actualLine = L.polyline(line.coords, line.options).bindTooltip(
            line.display_name,
            line.tooltip_options
        );
        actualLine.on("click", function (e) {
            let markersMenu = document.getElementById("menuScroll").children[1];
            if (markersMenu.classList.contains("selected")) markersMenu.click();
            markersMenu.click();
            loadGUIFunc();
            document
                .getElementById("contentPart1")
                .children[i + numericIdOffset].click();
        });
        layer.push(actualLine);
        for (let markerIdx of line.marker_points) {
            let circleMarker = L.circleMarker(line.coords[markerIdx], {
                radius: 10,
                color: "transparent",
                fillColor: line.options.color,
            }).bindTooltip(line.names[markerIdx]);
            circleMarker.on("click", function (e) {
                let markersMenu =
                    document.getElementById("menuScroll").children[1];
                if (markersMenu.classList.contains("selected"))
                    markersMenu.click();
                markersMenu.click();
                loadGUIFunc();
                document
                    .getElementById("contentPart1")
                    .children[i + numericIdOffset].click();
            });
            layer.push(circleMarker);
        }
        constantLayerData.push(layer);
        if (markerData.pick === "showAll") layer.addLayerToMap();
    }
}
