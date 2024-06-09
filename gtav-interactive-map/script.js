let clickDebugFunction = function (e) {
    alert(
        e.latlng.lat.toFixed(6).replace(/0+$/, "") +
            ", " +
            e.latlng.lng.toFixed(6).replace(/0+$/, "")
    );
};

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
    layers: {},
    tileLayers: {
        mainMap: {
            render: L.tileLayer(
                "https://s.rsg.sc/sc/images/games/GTAV/map/render/{z}/{x}/{y}.jpg",
                {
                    maxNativeZoom: 7,
                    maxZoom: 7,
                    minNativeZoom: 0,
                    minZoom: 0,
                    keepBuffer: 4,
                    noWrap: true,
                    updateWhenIdle: true,
                }
            ),
            game: L.tileLayer(
                "https://s.rsg.sc/sc/images/games/GTAV/map/game/{z}/{x}/{y}.jpg",
                {
                    maxNativeZoom: 7,
                    maxZoom: 7,
                    minNativeZoom: 0,
                    minZoom: 0,
                    keepBuffer: 4,
                    noWrap: true,
                    updateWhenIdle: true,
                }
            ),
            print: L.tileLayer(
                "https://s.rsg.sc/sc/images/games/GTAV/map/print/{z}/{x}/{y}.jpg",
                {
                    maxNativeZoom: 7,
                    maxZoom: 7,
                    minNativeZoom: 0,
                    minZoom: 0,
                    keepBuffer: 4,
                    noWrap: true,
                    updateWhenIdle: true,
                }
            ),
        },
    },
    oceanColors: {
        mainMap: {
            render: "#0D2B4F",
            game: "#384950",
            print: "#4EB1D0",
        },
    },
    icons: {
        figurine: L.divIcon({
            className: "collectible figurine",
            iconSize: [22, 22],
        }),
        kosatka: L.divIcon({
            className: "kosatka",
            iconSize: [22, 22],
        }),
        kosatkaRed: L.divIcon({
            className: "kosatka red",
            iconSize: [22, 22],
        }),
        plane: L.divIcon({
            className: "plane",
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
        signalJammer: L.divIcon({
            className: "collectible signaljammer",
            iconSize: [22, 22],
        }),
        playingCard: L.divIcon({
            className: "collectible playingcard",
            iconSize: [22, 22],
        }),
        lamarDavis: L.divIcon({
            className: "lamardavis",
            iconSize: [22, 22],
        }),
        ldOrganics: L.divIcon({
            className: "collectible lamardavis",
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
        weaponLocker: L.divIcon({
            className: "weaponLocker",
            iconSize: [22, 22],
        }),
        boat: L.divIcon({
            className: "boat",
            iconSize: [22, 22],
        }),
        semitruck: L.divIcon({
            className: "semitruck",
            iconSize: [22, 22],
        }),
        objectiveA: L.divIcon({
            className: "objective a",
            iconSize: [22, 22],
        }),
        objectiveB: L.divIcon({
            className: "objective b",
            iconSize: [22, 22],
        }),
        objectiveC: L.divIcon({
            className: "objective c",
            iconSize: [22, 22],
        }),
        objectiveAyellow: L.divIcon({
            className: "objective a yellow",
            iconSize: [22, 22],
        }),
        objectiveByellow: L.divIcon({
            className: "objective b yellow",
            iconSize: [22, 22],
        }),
        objectiveCyellow: L.divIcon({
            className: "objective c yellow",
            iconSize: [22, 22],
        }),
        garage: L.divIcon({
            className: "garage",
            iconSize: [22, 22],
        }),
        garageyellow: L.divIcon({
            className: "garage yellow",
            iconSize: [22, 22],
        }),
        terrorbyteblue: L.divIcon({
            className: "terrorbyte blue",
            iconSize: [22, 22],
        }),
        laptopgreen: L.divIcon({
            className: "laptop green",
            iconSize: [22, 22],
        }),
    },
};

document.getElementById("map").style.background =
    constantData.oceanColors.mainMap[saveData.selectedTileLayer];
constantData.tileLayers.mainMap[saveData.selectedTileLayer].addTo(map);

Array.from(document.getElementById("menuScroll").children).forEach((r) =>
    r.addEventListener("click", async function (e) {
        mainContent.classList = [];

        if (
            e.target.classList.contains("selected") ||
            e.target.value === "map"
        ) {
            resetContentParts();
            Array.from(document.getElementsByClassName("selected")).forEach(
                (x) => x.classList.remove("selected")
            );
            document
                .getElementById("menuScroll")
                .children[0].classList.add("selected");
            mainContent.style = "display: none";
            return;
        }
        mainContent.style = "";

        Array.from(document.getElementsByClassName("selected")).forEach((x) =>
            x.classList.remove("selected")
        );
        e.target.classList.add("selected");

        resetContentParts();

        if (e.target.value === "changelog") {
            mainContent.classList.add("styleTextPara");
            await fetch("./assets/uiText/changelog.json")
                .then((data) => data.json())
                .then((data) => {
                    let textDiv = document.createElement("div");
                    let header = document.createElement("header");
                    header.appendChild(document.createElement("h1"));
                    header.appendChild(document.createElement("h2"));
                    textDiv.appendChild(header);
                    textDiv.appendChild(document.createElement("p"));
                    contentPart2.appendChild(textDiv);
                    contentPart2.appendChild(document.createElement("p"));
                    contentPart2.children[0].children[1].classList.add(
                        "paragraphText"
                    );
                    contentPart2.children[1].classList.add("signature");
                    for (let nData of data) {
                        let element = addToContentPart1List(nData.title);
                        element.classList.add("versionText");
                        element.addEventListener("click", function () {
                            contentPart2.children[0].children[0].children[0].innerHTML =
                                "Version " + nData.title;
                            contentPart2.children[0].children[0].children[1].innerHTML =
                                new Date(nData.timestamp).toLocaleDateString(
                                    undefined,
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                );
                            contentPart2.children[0].children[1].innerHTML =
                                nData.innerHTML;
                            contentPart2.children[1].innerHTML =
                                "Signatures: " + nData.signatures.join(", ");
                        });
                    }
                    contentPart1.children[0].click();
                });
            return;
        }

        if (e.target.value === "faq") {
            mainContent.classList.add("styleTextPara");
            await fetch("./assets/uiText/faq.json")
                .then((data) => data.json())
                .then((data) => {
                    let textDiv = document.createElement("div");
                    textDiv.appendChild(document.createElement("h1"));
                    textDiv.appendChild(document.createElement("p"));
                    contentPart2.appendChild(textDiv);
                    contentPart2.appendChild(document.createElement("p"));
                    contentPart2.children[0].children[1].classList.add(
                        "paragraphText"
                    );
                    contentPart2.children[1].classList.add("signature");
                    for (let nData of data) {
                        let element = addToContentPart1List(nData.title);
                        element.addEventListener("click", function () {
                            contentPart2.children[0].children[0].innerHTML =
                                nData.extendedTitle
                                    ? nData.extendedTitle
                                    : nData.title;
                            contentPart2.children[0].children[1].innerHTML =
                                nData.innerHTML;
                            contentPart2.children[1].innerHTML =
                                "Signatures: " + nData.signatures.join(", ");
                        });
                    }
                    contentPart1.children[0].click();
                });
            return;
        }

        if (e.target.value === "settings") {
            // This is all so fucking cursed
            mainContent.classList.add("styleClassic");

            /* Map Style Options */
            let mapStyleButton = addToContentPart1List("Map Style");
            mapStyleButton.addEventListener("click", function () {
                resetContentPart2();
                const names = ["game", "render", "print"];
                const namesDisp = ["In Game", "Satellite", "Game Manual"];

                let optionDiv = document.createElement("div");
                optionDiv.innerHTML = "Map Style";

                let interactiveDiv = document.createElement("div");

                let img1 = document.createElement("img");
                img1.src = "./websiteIcons/small_arr_left.svg";
                interactiveDiv.appendChild(img1);

                interactiveDiv.innerHTML += `<p>${
                    namesDisp[names.indexOf(saveData.selectedTileLayer)]
                }</p>`;

                let img2 = document.createElement("img");
                img2.src = "./websiteIcons/small_arr_right.svg";
                interactiveDiv.appendChild(img2);

                interactiveDiv.style = "display: flex; align-items: center;";
                optionDiv.appendChild(interactiveDiv);

                contentPart2.append(optionDiv);

                function refreshMap(idx) {
                    interactiveDiv.children[1].innerHTML = namesDisp[idx];
                    constantData.tileLayers.mainMap[
                        saveData.selectedTileLayer
                    ].remove();
                    saveData.selectedTileLayer = names[idx];
                    saveDataSave();
                    constantData.tileLayers.mainMap[
                        saveData.selectedTileLayer
                    ].addTo(map);
                    document.getElementById("map").style.background =
                        constantData.oceanColors.mainMap[
                            saveData.selectedTileLayer
                        ];
                }

                optionDiv.addEventListener("click", function () {
                    let idx = names.indexOf(saveData.selectedTileLayer) + 1;
                    if (idx === 3) idx = 0;
                    refreshMap(idx);
                });
            });

            /* Debug Options */
            let debugButton = addToContentPart1List("Debug");
            debugButton.addEventListener("click", function () {
                resetContentPart2();
                let optionDiv = document.createElement("div");
                optionDiv.innerHTML = "On Click Coordinates";

                let interactiveDiv = document.createElement("div");

                let img1 = document.createElement("img");
                img1.src = "./websiteIcons/small_arr_left.svg";
                interactiveDiv.appendChild(img1);

                interactiveDiv.innerHTML += `<p>${
                    saveData.pointerMode ? "True" : "False"
                }</p>`;

                let img2 = document.createElement("img");
                img2.src = "./websiteIcons/small_arr_right.svg";
                interactiveDiv.appendChild(img2);
                interactiveDiv.style = "display: flex; align-items: center;";

                optionDiv.appendChild(interactiveDiv);
                optionDiv.addEventListener("click", function () {
                    saveData.pointerMode = !saveData.pointerMode;
                    saveDataSave();
                    interactiveDiv.children[1].innerHTML = saveData.pointerMode
                        ? "True"
                        : "False";

                    if (saveData.pointerMode) {
                        map.on("click", clickDebugFunction);
                    } else {
                        map.off("click", clickDebugFunction);
                    }
                });

                contentPart2.append(optionDiv);
            });

            /* Data Options */
            let dataButton = addToContentPart1List("Data");

            dataButton.addEventListener("click", function () {
                resetContentPart2();
                let optionDiv = document.createElement("div");
                optionDiv.innerHTML = "Backup Data<p>Click Here</p>";

                optionDiv.addEventListener("click", function () {
                    saveDataSave();
                    var element = document.createElement("a");
                    element.setAttribute(
                        "href",
                        "data:text/plain;charset=utf-8," +
                            encodeURIComponent(localStorage.getItem("saveData"))
                    );
                    element.setAttribute(
                        "download",
                        "GTA5InteractiveMapData.json"
                    );
                    element.style.display = "none";
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                });

                contentPart2.append(optionDiv);

                let option2Div = document.createElement("div");
                option2Div.innerHTML = "Load Backup Data<p>Click Here</p>";

                option2Div.addEventListener("click", function () {
                    var element = document.createElement("input");
                    element.type = "File";
                    element.accept = "application/json, text/plain";
                    element.addEventListener("change", function (e) {
                        let reader = new FileReader();
                        reader.addEventListener("load", function (res) {
                            console.log(res.target.result);
                            loadInSaveData(res.target.result);
                            saveDataSave();
                            window.location.reload();
                        });
                        reader.readAsText(e.target.files[0]);
                    });
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                });

                contentPart2.append(option2Div);
            });

            contentPart1.children[0].click();
            return;
        }

        if (e.target.value === "tools") {
            mainContent.classList.add("styleClassic");

            addToContentPart1List("Timers").addEventListener("click", toolsTimers);

            contentPart1.children[0].click();
            return;
        }

        if (e.target.value === "markers") {
            mainContent.classList.add("styleClassic");

            addToContentPart1List("POIs").addEventListener(
                "click",
                function () {
                    resetContentParts();
                    addToContentPart1List("Counties").addEventListener(
                        "click",
                        loadCountiesGUI
                    );
                }
            );
            addToContentPart1List("Collectibles").addEventListener(
                "click",
                function () {
                    resetContentParts();
                    addToContentPart1List("Action Figures").addEventListener(
                        "click",
                        loadFigurinesGUI
                    );
                    addToContentPart1List("Movie Props").addEventListener(
                        "click",
                        moviePropsGUI
                    );
                    addToContentPart1List("Playing Cards").addEventListener(
                        "click",
                        loadPlayingCardsGUI
                    );
                    addToContentPart1List("Signal Jammers").addEventListener(
                        "click",
                        loadSignalJammersGUI
                    );
                    addToContentPart1List(
                        "LD Organics Products"
                    ).addEventListener("click", loadLDOrganicsGUI);
                }
            );
            addToContentPart1List("The Cayo Perico Heist").addEventListener(
                "click",
                function () {
                    resetContentParts();
                    addToContentPart1List("General").addEventListener(
                        "click",
                        function () {
                            resetContentParts();
                            addToContentPart1List(
                                "Kosatka Fast Travels"
                            ).addEventListener(
                                "click",
                                loadKosatkaFastTravelsGUI
                            );
                            addToContentPart1List(
                                "Scope Out Planes"
                            ).addEventListener(
                                "click",
                                loadCayoPericoScopeOutPlaneGUI
                            );
                        }
                    );
                    addToContentPart1List("Equipment").addEventListener(
                        "click",
                        function () {
                            resetContentParts();
                            addToContentPart1List(
                                "Fingerprint Cloner"
                            ).addEventListener(
                                "click",
                                loadCayoPericoFingerprintClonerGUI
                            );
                            addToContentPart1List(
                                "Plasma Cutter"
                            ).addEventListener(
                                "click",
                                loadCayoPericoPlasmaCutterGUI
                            );
                            addToContentPart1List(
                                "Cutting Torch"
                            ).addEventListener(
                                "click",
                                loadCayoPericoCuttingTorchGUI
                            );
                            addToContentPart1List(
                                "Weapon Loadout"
                            ).addEventListener(
                                "click",
                                loadCayoPericoWeaponLoadoutGUI
                            );
                        }
                    );
                    addToContentPart1List("Approach Vehicles").addEventListener(
                        "click",
                        function () {
                            resetContentParts();
                            addToContentPart1List("Kosatka").addEventListener(
                                "click",
                                loadCayoPericoKosatkaApproachVehicleGUI
                            );
                            addToContentPart1List("Longfin").addEventListener(
                                "click",
                                loadCayoPericoLongfinApproachVehicleGUI
                            );
                        }
                    );
                }
            );
            addToContentPart1List(
                "The Cluckin' Bell Farm Raid"
            ).addEventListener("click", function () {
                resetContentParts();
                addToContentPart1List("Slush Fund").addEventListener(
                    "click",
                    loadVincentHeistSlushFundGUI
                );
                addToContentPart1List("Breaking and Entering").addEventListener(
                    "click",
                    loadVincentHeistBreakingAndEnteringGUI
                );
                addToContentPart1List("Concealed Weapons").addEventListener(
                    "click",
                    loadVincentHeistConcealedWeaponsGUI
                );
                addToContentPart1List("Hit and Run").addEventListener(
                    "click",
                    loadVincentHeistHitAndRunGUI
                );
                addToContentPart1List("Disorganized Crime").addEventListener(
                    "click",
                    loadVincentHeistDisorganizedCrimeGUI
                );
                addToContentPart1List("Scene of the Crime").addEventListener(
                    "click",
                    loadVincentHeistSceneOfTheCrimeGUI
                );
            });

            return;
        }
    })
);

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

async function loadDynamicData() {
    if (saveData.pointerMode) {
        map.on("click", clickDebugFunction);
    } else {
        map.off("click", clickDebugFunction);
    }

    document
        .getElementById("videoplayer")
        .addEventListener("click", function (e) {
            e.target.classList.remove("s");
            player.stopVideo();
        });
}

async function addSVGOverlay(url, coords) {
    let test = document.createElement("html");
    test.innerHTML = await fetch(url).then((r) => r.text());
    let svg = Array.from(test.getElementsByTagName("svg"))[0];
    L.svgOverlay(svg, coords).addTo(map);
}

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
