function genericLine(
    parentDivId,
    array,
    layers = [],
    startIndex = 0
) {
    let parentDiv = document.getElementById(parentDivId);
    for (let i = startIndex; i - startIndex < array.length; i++) {
        let line = L.polyline(array[i - startIndex].coords, array[i - startIndex].options).bindTooltip(array[i - startIndex].display_name, array[i - startIndex].tooltip_options);

        layers.pushMapLayer(line, i);

        for (let markerIdx of array[i-startIndex].marker_points) {
            layers.pushMapLayer(L.circleMarker(array[i - startIndex].coords[markerIdx], {
                radius: 10,
                color: "transparent",
                fillColor: array[i - startIndex].options.color,
            }).bindTooltip(array[i - startIndex].names[markerIdx]), i);
        }

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
        zoom.innerHTML = "Zoom to Line";
        zoom.addEventListener("click", function () {
            document.getElementById("gui_toggle_button_div").click();
            map.fitBounds(line.getBounds());
            if (!map.hasLayer(line)) layers[i].addLayerToMap();
        });
        parentDiv.append(zoom);

        line.on("click", () =>{
            document.getElementById("gui_toggle_button_div").click();
            linkDiv.scrollIntoView();
            map.fitBounds(line.getBounds());
            Array.from(document.getElementsByClassName("hl")).forEach((r) =>
                r.classList.remove("hl")
            );
            title.classList.add("hl");
        });
    }

    return layers;
}