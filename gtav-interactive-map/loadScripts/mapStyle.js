function loadMapStyle(r) {
    let tileLayers = {
        render: L.tileLayer(r.mainMap.render.url, {
            maxNativeZoom: r.mainMap.render.maxNativeZoom,
            maxZoom: r.mainMap.render.maxNativeZoom,
            minNativeZoom: r.mainMap.render.minNativeZoom,
            minZoom: r.mainMap.render.minNativeZoom,
            keepBuffer: 4,
            noWrap: true,
            updateWhenIdle: true,
        }),
        game: L.tileLayer(r.mainMap.game.url, {
            maxNativeZoom: r.mainMap.game.maxNativeZoom,
            maxZoom: r.mainMap.game.maxNativeZoom,
            minNativeZoom: r.mainMap.game.minNativeZoom,
            minZoom: r.mainMap.game.minNativeZoom,
            keepBuffer: 4,
            noWrap: true,
            updateWhenIdle: true,
        }),
        print: L.tileLayer(r.mainMap.print.url, {
            maxNativeZoom: r.mainMap.print.maxNativeZoom,
            maxZoom: r.mainMap.print.maxNativeZoom,
            minNativeZoom: r.mainMap.print.minNativeZoom,
            minZoom: r.mainMap.print.minNativeZoom,
            keepBuffer: 4,
            noWrap: true,
            updateWhenIdle: true,
        }),
    };

    let mapStyleClassElements = Array.from(
        document.getElementsByClassName("mapStyle")
    );

    mapStyleClassElements.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            let sl = saveData.selectedTileLayer;
            if (sl === e.target.value) return;
            tileLayers[sl].remove();
            saveData.selectedTileLayer = e.target.value;
            saveDataSave();
            tileLayers[e.target.value].addTo(map);
            document.getElementById("map").style.background =
                r.mainMap[e.target.value].oceanColor;
        });
        if (saveData.selectedTileLayer == btn.value) btn.click();
    });

    document.getElementById("map").style.background =
        r.mainMap[saveData.selectedTileLayer].oceanColor;
    tileLayers[saveData.selectedTileLayer].addTo(map);
}
