function registerSinglePolygonArray(
    key,
    constantLayerData,
    markerData,
    jsonData,
    loadGUIFunc
) {
    let numericIdOffset = constantLayerData.length;
    for (let [i, polygon] of jsonData.entries()) {
        let layer = new MapLayer(
            key,
            polygon.display_name,
            i + numericIdOffset,
            markerData,
            constantLayerData
        );
        let actualPolygon = L.polygon(
            polygon.coords,
            polygon.options
        ).bindTooltip(polygon.display_name, polygon.tooltip_options);
        actualPolygon.on("click", function (e) {
            let markersMenu = document.getElementById("menuScroll").children[1];
            if (markersMenu.classList.contains("selected")) markersMenu.click();
            markersMenu.click();
            loadGUIFunc();
            document
                .getElementById("contentPart1")
                .children[i + numericIdOffset].click();
        });
        layer.push(actualPolygon);
        constantLayerData.push(layer);
        if (markerData.pick === "showAll") layer.addLayerToMap();
    }
}
