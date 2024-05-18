// true false;
let insertMarkersMode = false;

let saveData = {
    version: "0.3.1",
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
            [
                "completionDataFigurines",
                "completionDataMovieProps",
                "completionDataPlayingCards",
            ].includes(key)
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
                temporarySaveData.version = "0.3.1";
            }
            if (temporarySaveData.version === "0.3.1") {
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
            .then(loadFigurines)
    );
    x.push(
        fetch("./assets/playingCards.json")
            .then((r) => r.json())
            .then(loadPlayingCards)
    );
    x.push(
        fetch("./assets/movieProps.json")
            .then((r) => r.json())
            .then(loadMovieProps)
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
            .then(loadMapStyle)
    );
    x.push(
        fetch("./assets/counties.json")
            .then((r) => r.json())
            .then(loadCounties)
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
