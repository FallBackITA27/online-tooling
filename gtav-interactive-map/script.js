// true false;
let insertMarkersMode = true;

let saveData = {
    version: "0.3.0",
    selectedTileLayer: "game",
    lastZoom: 2,
    lastCoords: [38.959409, -75.410156],
    casinoHeist: {
        startDate: false,
    },
    cayoPericoHeist: {
        startDate: false,
    },
    blCountyShow: false,
    lsCountyShow: false,
    completionDataFigurines: new Set(),
    lastPickFigurines: "hideAll",
    completionDataPlayingCards: new Set(),
    lastPickPlayingCards: "hideAll",
    completionDataMovieProps: new Set(),
    lastPickMovieProps: "hideAll",
};

function loadInSaveData(dataStr) {
    if (dataStr != null) {
        let temporarySaveData = JSON.parse(dataStr, (key, value) =>
            ["completionDataFigurines", "completionDataMovieProps", "completionDataPlayingCards"].includes(
                key
            )
                ? new Set(value)
                : value
        );
        if (temporarySaveData.version !== saveData.version) {
            if (temporarySaveData.version == undefined) {
                // Save data pre-0.1.0 had no tag, there is no way to save it at this point.
                return;
            }
            if (temporarySaveData.version === "0.1.0") {
                temporarySaveData.version = "0.1.1";
                temporarySaveData.blCountyShow = false;
                temporarySaveData.lsCountyShow = false;
            }
            if (temporarySaveData.version === "0.1.1") {
                temporarySaveData.version = "0.1.2";
                temporarySaveData.completionDataMovieProps = new Set();
                temporarySaveData.lastPickMovieProps = "hideAll";
                temporarySaveData.lastPickFigurines =
                    temporarySaveData.completionDataLastPickFigurines;
                delete temporarySaveData.completionDataLastPickFigurines;
            }
            if (temporarySaveData.version === "0.1.2") {
                temporarySaveData.version = "0.2.0";
            }
            if (temporarySaveData.version === "0.2.0") {
                temporarySaveData.version = "0.3.0";
                temporarySaveData.completionDataPlayingCards = new Set();
                temporarySaveData.lastPickPlayingCards = "hideAll";
            }
            if (temporarySaveData.version === "0.3.0") {
                // Current version
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
        movieProp: L.divIcon({
            className: "collectible movieprop",
            iconSize: [22, 22],
        }),
        building: L.divIcon({
            className: "building",
            iconSize: [22, 22],
        }),
        truck: L.divIcon({
            className: "collectible truck",
            iconSize: [22, 22],
        }),
        playingCard: L.divIcon({
            className: "collectible playingcard",
            iconSize: [22, 22],
        }),
        moviePropTruckRumpo: L.divIcon({
            className: "collectible truck movieprop rumpo",
            iconSize: [22, 22],
        }),
        moviePropTruckPony: L.divIcon({
            className: "collectible truck movieprop pony",
            iconSize: [22, 22],
        }),
        moviePropTruckRebel: L.divIcon({
            className: "collectible truck movieprop rebel",
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
            .then((r) => {
                let onMapMarkers = genericCollectibleInsert(
                    "actionFiguresDiv",
                    r,
                    constantData.icons.figurine,
                    "completionDataFigurines",
                    "lastPickFigurines",
                    "markers-collectibles-actionfigures-completion-number",
                    100
                );

                document.getElementById(
                    "markers-collectibles-actionfigures-completion-number"
                ).innerHTML = `Completed ${saveData.completionDataFigurines.size}/100`;

                completionButtonsDivUpdates(
                    "markers-collectibles-actionfigures-show-all-btn",
                    "markers-collectibles-actionfigures-hide-all-btn",
                    "markers-collectibles-actionfigures-show-completed-btn",
                    "markers-collectibles-actionfigures-hide-completed-btn",
                    onMapMarkers,
                    "lastPickFigurines",
                    "completionDataFigurines"
                );
            })
    );
    x.push(
        fetch("./assets/playingCards.json")
            .then((r) => r.json())
            .then((r) => {
                let onMapMarkers = genericCollectibleInsert(
                    "playingCardsDiv",
                    r,
                    constantData.icons.playingCard,
                    "completionDataPlayingCards",
                    "lastPickPlayingCards",
                    "markers-collectibles-playingcards-completion-number",
                    54
                );

                document.getElementById(
                    "markers-collectibles-playingcards-completion-number"
                ).innerHTML = `Completed ${saveData.completionDataPlayingCards.size}/54`;

                completionButtonsDivUpdates(
                    "markers-collectibles-playingcards-show-all-btn",
                    "markers-collectibles-playingcards-hide-all-btn",
                    "markers-collectibles-playingcards-show-completed-btn",
                    "markers-collectibles-playingcards-hide-completed-btn",
                    onMapMarkers,
                    "lastPickPlayingCards",
                    "completionDataPlayingCards"
                );
            })
    );
    x.push(
        fetch("./assets/movieProps.json")
            .then((r) => r.json())
            .then((r) => {
                let onMapMarkers = genericCollectibleInsert(
                    "moviePropsDiv",
                    r.singleMarker,
                    constantData.icons.movieProp,
                    "completionDataMovieProps",
                    "lastPickMovieProps",
                    "markers-collectibles-movieprops-completion-number",
                    10
                );

                document.getElementById(
                    "markers-collectibles-movieprops-completion-number"
                ).innerHTML = `Completed ${saveData.completionDataMovieProps.size}/10`;

                onMapMarkers = multiMarkerCollectibleInsert(
                    "moviePropsDiv",
                    r.multiMarker,
                    [
                        [constantData.icons.moviePropTruckRebel, 9],
                        [constantData.icons.moviePropTruckRumpo, 8],
                        [constantData.icons.moviePropTruckPony, 7]
                    ],
                    "completionDataMovieProps",
                    "lastPickMovieProps",
                    "markers-collectibles-movieprops-completion-number",
                    10,
                    onMapMarkers,
                    7
                );

                completionButtonsDivUpdates(
                    "markers-collectibles-movieprops-show-all-btn",
                    "markers-collectibles-movieprops-hide-all-btn",
                    "markers-collectibles-movieprops-show-completed-btn",
                    "markers-collectibles-movieprops-hide-completed-btn",
                    onMapMarkers,
                    "lastPickMovieProps",
                    "completionDataMovieProps"
                );
            })
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

                if (saveData.blCountyShow) blCountyPolygon.addTo(map);
                if (saveData.lsCountyShow) lsCountyPolygon.addTo(map);

                document
                    .getElementById(
                        "markers-locations-counties-blaine-show-btn"
                    )
                    .addEventListener("click", function () {
                        blCountyPolygon.addTo(map);
                        saveData.blCountyShow = true;
                        saveDataSave();
                    });

                document
                    .getElementById("markers-locations-counties-ls-show-btn")
                    .addEventListener("click", function () {
                        lsCountyPolygon.addTo(map);
                        saveData.lsCountyShow = true;
                        saveDataSave();
                    });

                document
                    .getElementById(
                        "markers-locations-counties-blaine-hide-btn"
                    )
                    .addEventListener("click", function () {
                        blCountyPolygon.remove();
                        saveData.blCountyShow = false;
                        saveDataSave();
                    });

                document
                    .getElementById("markers-locations-counties-ls-hide-btn")
                    .addEventListener("click", function () {
                        lsCountyPolygon.remove();
                        saveData.lsCountyShow = false;
                        saveDataSave();
                    });

                document
                    .getElementById("markers-locations-counties-show-btn")
                    .addEventListener("click", function () {
                        document
                            .getElementById(
                                "markers-locations-counties-ls-show-btn"
                            )
                            .click();
                        document
                            .getElementById(
                                "markers-locations-counties-blaine-show-btn"
                            )
                            .click();
                    });

                document
                    .getElementById("markers-locations-counties-hide-btn")
                    .addEventListener("click", function () {
                        document
                            .getElementById(
                                "markers-locations-counties-ls-hide-btn"
                            )
                            .click();
                        document
                            .getElementById(
                                "markers-locations-counties-blaine-hide-btn"
                            )
                            .click();
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
        let icon = iconData;
        if (iconData instanceof Array) for (let [possibleIcon, index] of iconData) {
            icon = possibleIcon;
            if (index <= i) break;
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

            actualMarker.on("click", function () {
                document.getElementById("gui_toggle_button_div").click();
                linkDiv.scrollIntoView();
                map.setView(array[i - startIndex].coords[j], 6);
            });

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
    completedAmountParagraphId = null,
    maxSetSize = saveData[completionSetName].size,
    onMapMarkers = [],
    startIndex = 0
) {
    let parentDiv = document.getElementById(parentDivId);
    for (let i = startIndex; i - startIndex < array.length; i++) {

        let icon = iconData;
        if (iconData instanceof Array) for (let [possibleIcon, index] of iconData) {
            icon = possibleIcon;
            if (index <= i) break;
        }

        let actualMarker = L.marker(array[i - startIndex].coords, {
            icon: icon,
            title: array[i - startIndex].display_name,
        });
        onMapMarkers.push(actualMarker);

        let hr = document.createElement("hr");
        hr.classList.add("twentyfive");
        parentDiv.append(hr);

        let linkDiv = document.createElement("div");
        linkDiv.id = "#" + array[i - startIndex].display_name.replaceAll(" ", "-");
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

        actualMarker.on("click", function (e) {
            document.getElementById("gui_toggle_button_div").click();
            linkDiv.scrollIntoView();
            map.setView(array[i - startIndex].coords, 6);
        });
    }

    return onMapMarkers;
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
