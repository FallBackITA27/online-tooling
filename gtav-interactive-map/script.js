// true false;
let insertMarkersMode = false;

let saveData = {
    version: "0.1.0",
    selectedTileLayer: "game",
    lastZoom: 2,
    lastCoords: [38.959409, -75.410156],
    casinoHeist: {
        startDate: false,
    },
    cayoPericoHeist: {
        startDate: false,
    },
    completionDataFigurines: new Set(),
    completionDataLastPickFigurines: "hideAll",
};

function loadInSaveData(dataStr) {
    if (dataStr != null) {
        let temporarySaveData = JSON.parse(dataStr, (key, value) =>
            ["completionDataFigurines"].includes(key) ? new Set(value) : value
        );
        if (temporarySaveData.version !== saveData.version) {
            if (temporarySaveData.version === undefined) {
                return;
            }
            // Here you check the version tag in the savedata and modify it to match the data right after - this way old save data will not be lost.
        }
        saveData = temporarySaveData;
    }
}
loadInSaveData(localStorage.getItem("saveData"));
saveDataSave();

document
    .getElementById("backupDataButton")
    .addEventListener("click", function () {
        saveDataSave();
        var element = document.createElement("a");
        element.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," +
                encodeURIComponent(localStorage.getItem("saveData"))
        );
        element.setAttribute("download", "GTA5InteractiveMapData.json");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });

document
    .getElementById("backupDataFile")
    .addEventListener("change", function (e) {
        let reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.addEventListener("load", function (res) {
            console.log(res);
            console.log(res.target.result);
            loadInSaveData(res.target.result);
            saveDataSave();
            window.location.reload();
        });
    });

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        playerVars: {
            autoplay: 1,
            enablejsapi: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin,
        },
        events: {
            onReady: loadDynamicData,
        },
    });
}

document
    .getElementById("casinoHeistStart")
    .addEventListener("click", function () {
        saveData.casinoHeist.startDate = +new Date();
        saveDataSave();
        Notification.requestPermission();
    });
document
    .getElementById("cayoPericoHeistStart")
    .addEventListener("click", function () {
        saveData.cayoPericoHeist.startDate = +new Date();
        saveDataSave();
        Notification.requestPermission();
    });

setInterval(async function () {
    function genericTimer(
        heistData,
        currentTime,
        progressBarElement,
        notifString,
        cooldown = 2880000
    ) {
        if (heistData.startDate !== false) {
            if (heistData.startDate + cooldown < currentTime) {
                new Notification(notifString);
                progressBarElement.value = cooldown;
                heistData.startDate = false;
                saveDataSave();
            } else {
                progressBarElement.value = currentTime - heistData.startDate;
            }
            let sec = Math.floor((cooldown - progressBarElement.value) / 1000);
            let hrs = Math.trunc(sec / 3600);
            sec %= 3600;
            let min = Math.trunc(sec / 60);
            sec %= 60;
            progressBarElement.innerHTML = `${hrs
                .toString()
                .padStart(1, "0")}hrs ${min
                .toString()
                .padStart(2, "0")}min ${sec
                .toString()
                .padStart(2, "0")}sec left`;
            progressBarElement.title = progressBarElement.innerHTML;
        }
    }

    let currentTime = +new Date();
    genericTimer(
        saveData.casinoHeist,
        currentTime,
        document.getElementById("casinoHeistProgressBar"),
        "Your Casino Heist is ready."
    );
    genericTimer(
        saveData.cayoPericoHeist,
        currentTime,
        document.getElementById("cayoPericoHeistProgressBar"),
        "Your Cayo Perico Heist is ready.",
        8640000
    );
}, 500);

let map = L.map("map", {
    center: saveData.lastCoords,
    zoom: saveData.lastZoom,
    inertia: true,
    worldCopyJump: false,
    attributionControl: false,
    maxZoom: 7,
    minZoom: 0,
    maxBounds: [
        [400, -270],
        [-60, 90],
    ],
    maxBoundsViscosity: 0.5,
});

const constantData = {
    icons: {
        figurine: L.divIcon({
            className: "collectible figurine",
            iconSize: [22, 22],
        }),
        building: L.divIcon({
            className: "building",
            iconSize: [22, 22],
        }),
    },
};

map.on("zoomend", function (e) {
    let x = map.getCenter();
    saveData.lastCoords = [
        parseFloat(x.lat.toFixed(6)),
        parseFloat(x.lng.toFixed(6)),
    ];
    saveData.lastZoom = map.getZoom();
    saveDataSave();
});

map.on("moveend", function (e) {
    let x = map.getCenter();
    saveData.lastCoords = [
        parseFloat(x.lat.toFixed(6)),
        parseFloat(x.lng.toFixed(6)),
    ];
    saveDataSave();
});

document
    .getElementById("gui_toggle_button_div")
    .addEventListener("click", function (e) {
        document.getElementById("popupgui").classList.toggle("s");
        document.getElementById("gui_toggle_button").classList.toggle("s");
    });

function saveDataSave() {
    console.log(saveData);
    localStorage.setItem(
        "saveData",
        JSON.stringify(saveData, (_key, value) =>
            value instanceof Set ? [...value] : value
        )
    );
}

async function loadDynamicData() {
    document
        .getElementById("videoplayer")
        .addEventListener("click", function (e) {
            e.target.classList.remove("s");
            player.stopVideo();
        });

    let x = [];
    x.push(
        fetch("./assets/figurines.json")
            .then((r) => r.json())
            .then((r) =>
                genericCollectibleInsert(
                    document.getElementById("actionFiguresDiv"),
                    r,
                    constantData.icons.figurine,
                    document.getElementById(
                        "markers-collectibles-show-all-btn"
                    ),
                    document.getElementById(
                        "markers-collectibles-hide-all-btn"
                    ),
                    document.getElementById(
                        "markers-collectibles-show-completed-btn"
                    ),
                    document.getElementById(
                        "markers-collectibles-hide-completed-btn"
                    ),
                    "completionDataFigurines",
                    "completionDataLastPickFigurines"
                )
            )
    );
    // x.push(
    //     fetch("./assets/buildings.json").then(r=>r.json()).then(r=>{
    //         for (marker of r) {
    //             let actualMarker = L.marker(marker.coords, { icon: constantData.icons.building, title: marker.name });
    //             let onMapMarker = L.layerGroup([actualMarker]);
    //             map.addLayer(onMapMarker);
    //         }
    //     })
    // );
    // x.push(
    //     fetch("./assets/inGameDistricts.json").then(r=>r.json()).then(r=>{
    //         for (polygon of r) L.polygon(polygon.points, {color:polygon.color}).bindTooltip(polygon.name, {permanent:true,direction:"center"}).addTo(map);
    //     })
    // );
    x.push(
        fetch("./assets/mapStyle.json")
            .then((r) => r.json())
            .then((r) => {
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
            })
    );
    x.push(
        fetch("./assets/counties.json")
            .then((r) => r.json())
            .then((r) => {
                let lsCountyPolygon = L.polygon(r.ls.points, {
                    color: r.ls.color,
                }).bindTooltip(r.ls.name, {
                    permanent: true,
                    direction: "center",
                });
                let blCountyPolygon = L.polygon(r.bl.points, {
                    color: r.bl.color,
                }).bindTooltip(r.bl.name, {
                    permanent: true,
                    direction: "center",
                });

                document
                    .getElementById(
                        "markers-locations-counties-blaine-show-btn"
                    )
                    .addEventListener("click", function () {
                        map.addLayer(blCountyPolygon);
                    });

                document
                    .getElementById("markers-locations-counties-ls-show-btn")
                    .addEventListener("click", function () {
                        map.addLayer(lsCountyPolygon);
                    });

                document
                    .getElementById(
                        "markers-locations-counties-blaine-hide-btn"
                    )
                    .addEventListener("click", function () {
                        map.removeLayer(blCountyPolygon);
                    });

                document
                    .getElementById("markers-locations-counties-ls-hide-btn")
                    .addEventListener("click", function () {
                        map.removeLayer(lsCountyPolygon);
                    });

                document
                    .getElementById("markers-locations-counties-show-btn")
                    .addEventListener("click", function () {
                        map.addLayer(lsCountyPolygon);
                        map.addLayer(blCountyPolygon);
                    });

                document
                    .getElementById("markers-locations-counties-hide-btn")
                    .addEventListener("click", function () {
                        map.removeLayer(lsCountyPolygon);
                        map.removeLayer(blCountyPolygon);
                    });
            })
    );

    for (let handle of x) await handle;
    if (window.location.hash !== "") {
        document.getElementById("gui_toggle_button_div").click();
        document
            .getElementById(window.location.hash.split("#")[1])
            .scrollIntoView();
    }
}

async function addSVGOverlay(url, coords) {
    let test = document.createElement("html");
    test.innerHTML = await fetch(url).then((r) => r.text());
    let svg = Array.from(test.getElementsByTagName("svg"))[0];
    L.svgOverlay(svg, coords).addTo(map);
}

if (insertMarkersMode)
    map.on("click", async function (e) {
        alert(e.latlng.lat.toFixed(6) + ", " + e.latlng.lng.toFixed(6));
    });
addSVGOverlay("overlayedMapItems/kortzCenter.svg", [
    [20.6, -145],
    [14.8, -139.7],
]);
addSVGOverlay("overlayedMapItems/prisonBlaineCounty.svg", [
    [55.9, -67],
    [50.9, -59.35],
]);
addSVGOverlay("overlayedMapItems/ship.svg", [
    [-41.43, -72.9],
    [-44.05, -71.9],
]);
addSVGOverlay("overlayedMapItems/vespucciBeachSewer.svg", [
    [-1.755, -132.3],
    [-9.7, -121.755],
]);
// addSVGOverlay('overlayedMapItems/fortZancudo.svg', [[63.5, -154.7], [55.1, -128.5]]);
L.imageOverlay("overlayedMapItems/fortZancudo.svg", [
    [63.5, -154.7],
    [55.1, -128.5],
]).addTo(map); // I don't get this bs.

async function genericCollectibleInsert(
    parentDiv,
    array,
    icon,
    showAllButton,
    hideAllButton,
    showCompletedButton,
    hideCompletedButton,
    completionSetName,
    lastPickVarName
) {
    let onMapMarkers = [];
    for (let i = 0; i < array.length; i++) {
        let actualMarker = L.marker(array[i].coords, {
            icon: icon,
            title: array[i].display_name,
        });
        onMapMarkers.push(actualMarker);

        let hr = document.createElement("hr");
        hr.classList.add("twentyfive");
        parentDiv.append(hr);

        let linkDiv = document.createElement("div");
        linkDiv.id = "#" + array[i].display_name.replaceAll(" ", "-");
        parentDiv.append(linkDiv);

        let title = document.createElement("h2");
        title.innerHTML = array[i].display_name;
        parentDiv.append(title);

        let description = document.createElement("p");
        description.innerHTML = array[i].description;
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
                if (saveData[lastPickVarName] === "showCompleted") {
                    if (!map.hasLayer(actualMarker)) actualMarker.addTo(map);
                } else if (saveData[lastPickVarName] === "hideCompleted") {
                    if (map.hasLayer(actualMarker)) actualMarker.remove();
                    return;
                }
                if (map.hasLayer(actualMarker))
                    actualMarker._icon.classList.add("completed");
            } else {
                saveData[completionSetName].delete(i);
                if (saveData[lastPickVarName] === "showCompleted") {
                    if (map.hasLayer(actualMarker)) actualMarker.remove();
                    return;
                } else if (saveData[lastPickVarName] === "hideCompleted") {
                    if (!map.hasLayer(actualMarker)) actualMarker.addTo(map);
                }
                if (map.hasLayer(actualMarker))
                    actualMarker._icon.classList.remove("completed");
            }
            saveDataSave();
        });
        markAsCompleteBtn.checked = saveData[completionSetName].has(i);
        parentDiv.append(markAsCompleteBtn);
        parentDiv.append(document.createElement("br"));

        let video = document.createElement("button");
        video.innerHTML = "Video";
        video.addEventListener("click", function () {
            player.loadVideoById({
                videoId: array[i].video_id,
                startSeconds: array[i].video_timestamp,
            });
            document.getElementById("videoplayer").classList.add("s");
        });
        parentDiv.append(video);
        parentDiv.append(document.createElement("br"));

        let zoom = document.createElement("button");
        zoom.innerHTML = "Zoom to Marker";
        zoom.addEventListener("click", function () {
            document.getElementById("gui_toggle_button_div").click();
            map.setView(array[i].coords, 7);
            if (!map.hasLayer(actualMarker)) actualMarker.addTo(map);
        });
        parentDiv.append(zoom);

        actualMarker.on("click", function (e) {
            document.getElementById("gui_toggle_button_div").click();
            linkDiv.scrollIntoView();
            map.setView(array[i].coords, 6);
        });
    }

    showAllButton.addEventListener("click", () => {
        saveData[lastPickVarName] = "showAll";
        saveDataSave();
        let i = 0;
        for (let marker of onMapMarkers) {
            if (!map.hasLayer(marker)) marker.addTo(map);
            if (saveData[completionSetName].has(i))
                marker._icon.classList.add("completed");
            i++;
        }
    });
    hideAllButton.addEventListener("click", () => {
        saveData[lastPickVarName] = "hideAll";
        saveDataSave();
        for (let marker of onMapMarkers)
            if (map.hasLayer(marker)) marker.remove();
    });
    showCompletedButton.addEventListener("click", () => {
        saveData[lastPickVarName] = "showCompleted";
        saveDataSave();
        let i = 0;
        for (let marker of onMapMarkers) {
            if (saveData[completionSetName].has(i)) {
                if (!map.hasLayer(marker)) marker.addTo(map);
                marker._icon.classList.add("completed");
            } else {
                marker.remove();
            }
            i++;
        }
    });
    hideCompletedButton.addEventListener("click", () => {
        saveData[lastPickVarName] = "hideCompleted";
        saveDataSave();
        let i = 0;
        for (let marker of onMapMarkers) {
            if (!saveData[completionSetName].has(i)) {
                if (!map.hasLayer(marker)) marker.addTo(map);
            } else {
                marker.remove();
            }
            i++;
        }
    });

    let lastPick = saveData[lastPickVarName];
    if (lastPick === "showAll") {
        showAllButton.click();
    } else if (lastPick === "hideAll") {
        hideAllButton.click();
    } else if (lastPick === "showCompleted") {
        showCompletedButton.click();
    } else if (lastPick === "hideCompleted") {
        hideCompletedButton.click();
    }
}

/*
    https://gtalens.com/assets/images/f2b13a.svg
    https://gtalens.com/assets/images/d12003.svg
    https://gtalens.com/assets/images/7171c7.svg
    https://gtalens.com/assets/images/143e45.svg
    https://gtalens.com/assets/images/968d80.svg
    https://gtalens.com/assets/images/a5eaeb.svg
    https://gtalens.com/assets/images/b29adb.svg
    https://gtalens.com/assets/images/1466c4.svg
    https://gtalens.com/assets/images/8c3883.svg
    https://gtalens.com/assets/images/a4f19c.svg
*/

console.log(map);
