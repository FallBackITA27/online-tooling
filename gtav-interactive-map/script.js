// true false;
let insertMarkersMode = false;

let saveData = {
    profile0: {
        selectedTileLayer: "game",
        lastZoom: 0,
        lastCoords: [-90, 64.69999694824219],
        heistData: {
            casinoHeist: {
                startDate: false
            },
            cayoPericoHeist: {
                startDate: false
            }
        }
    }
}

let temporarySaveDataStr = localStorage.getItem("saveData");
if (temporarySaveDataStr != null) {
    let temporarySaveData = JSON.parse(temporarySaveDataStr);
    for (key in saveData.profile0)
        if (temporarySaveData.profile0[key] == null)
            temporarySaveData.profile0[key] = saveData.profile0[key];
    saveData = temporarySaveData;

}
saveDataSave();

document.getElementById("casinoHeistStart").addEventListener("click", function() {
    saveData.profile0.heistData.casinoHeist.startDate = (+ new Date());
    saveDataSave();
    Notification.requestPermission();
})
document.getElementById("cayoPericoHeistStart").addEventListener("click", function() {
    saveData.profile0.heistData.cayoPericoHeist.startDate = (+ new Date());
    saveDataSave();
    Notification.requestPermission();
})

setInterval(async function() {
    function genericTimer(heistData, currentTime, progressBarElement, notifString, cooldown = 2880000) {
        if (heistData.startDate !== false) {
            if ((heistData.startDate + cooldown) < currentTime) {
                new Notification(notifString);
                progressBarElement.value = cooldown;
                heistData.startDate = false;
            } else {
                progressBarElement.value = currentTime - heistData.startDate;
            }
            let sec = Math.floor((cooldown - progressBarElement.value) / 1000);
            let hrs = Math.trunc(sec / 3600);
            sec %= 3600;
            let min = Math.trunc(sec / 60);
            sec %= 60;
            progressBarElement.innerHTML = `${hrs.toString().padStart(1, "0")}hrs ${min.toString().padStart(2, "0")}min ${sec.toString().padStart(2, "0")}sec left`;
            progressBarElement.title = progressBarElement.innerHTML;
        }
    }

    let currentTime = (+ new Date());
    genericTimer(saveData.profile0.heistData.casinoHeist, currentTime, document.getElementById("casinoHeistProgressBar"), "Your Casino Heist is ready.");
    genericTimer(saveData.profile0.heistData.cayoPericoHeist, currentTime, document.getElementById("cayoPericoHeistProgressBar"), "Your Cayo Perico Heist is ready.", 8640000);
}, 500);

let map = L.map('map', {
    center: saveData.profile0.lastCoords,
    zoom: saveData.profile0.lastZoom,
    inertia: true,
    worldCopyJump: false,
    attributionControl: false
});

const constantData = {
    icons: {
        figurine: L.icon({
            iconUrl: 'gtavIcons/figurine.svg',
            iconSize: [22,22]
        }),
        building: L.icon({
            iconUrl: 'gtavIcons/building.svg',
            iconSize: [22,22]
        }),
    },
}

map.on("zoomend", function (e) {
    let x = map.getCenter();
    saveData.profile0.lastCoords = [x.lat.toFixed(6), x.lng.toFixed(6)];
    saveData.profile0.lastZoom = map.getZoom();
    saveDataSave();
});

map.on("moveend", function(e) {
    let x = map.getCenter();
    saveData.profile0.lastCoords = [x.lat.toFixed(6), x.lng.toFixed(6)];
    saveDataSave();
});

document.getElementById("gui_toggle_button_div").addEventListener("click", function(e){
    document.getElementById("popupgui").classList.toggle("s");
    document.getElementById("gui_toggle_button").classList.toggle("s");
});

function saveDataSave() {
    console.log(saveData);
    localStorage.setItem("saveData", JSON.stringify(saveData));
}

async function loadDynamicData() {
    let x = [];
    x.push(
        fetch("./assets/figurines.json").then(r=>r.json()).then(r=>genericCollectibleInsert(document.getElementById("actionFiguresDiv"), r, constantData.icons.figurine))
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
        fetch("./assets/mapStyle.json").then(r=>r.json()).then(r=>{
            let tileLayers = {
                render: L.tileLayer(r.mainMap.render.url, {
                    maxZoom: r.mainMap.render.maxZoom,
                    minZoom: r.mainMap.render.minZoom,
                    noWrap: true,
                }),
                game: L.tileLayer(r.mainMap.game.url, {
                    maxZoom: r.mainMap.game.maxZoom,
                    minZoom: r.mainMap.game.minZoom,
                    noWrap: true,
                }),
                print: L.tileLayer(r.mainMap.print.url, {
                    maxZoom: r.mainMap.print.maxZoom,
                    minZoom: r.mainMap.print.minZoom,
                    noWrap: true,
                }),
            }

            let mapStyleClassElements = Array.from(document.getElementsByClassName("mapStyle"));

            mapStyleClassElements.forEach(function(btn){
                btn.addEventListener("click",function(e){
                    let sl = saveData.profile0.selectedTileLayer;
                    if (sl === e.target.value) return;
                    map.removeLayer(tileLayers[sl]);
                    saveData.profile0.selectedTileLayer = e.target.value;
                    saveDataSave();
                    map.addLayer(tileLayers[e.target.value]);
                    document.getElementById("map").style.background = r.mainMap[e.target.value].oceanColor;
                });
                if (saveData.profile0.selectedTileLayer == btn.value) btn.click();
            })

            document.getElementById("map").style.background = r.mainMap[saveData.profile0.selectedTileLayer].oceanColor;
            map.addLayer(tileLayers[saveData.profile0.selectedTileLayer]);
        })
    )
    x.push(
        fetch("./assets/counties.json").then(r=>r.json()).then(r=>{
            let lsCountyPolygon = L.polygon(r.ls.points, {color: r.ls.color}).bindTooltip(r.ls.name, {permanent:true,direction:"center"});
            let blCountyPolygon = L.polygon(r.bl.points, {color: r.bl.color}).bindTooltip(r.bl.name, {permanent:true,direction:"center"});

            document.getElementById("markers-locations-counties-blaine-show-btn").addEventListener("click", function(){
                map.addLayer(blCountyPolygon);
            })

            document.getElementById("markers-locations-counties-ls-show-btn").addEventListener("click", function(){
                map.addLayer(lsCountyPolygon);
            })

            document.getElementById("markers-locations-counties-blaine-hide-btn").addEventListener("click", function(){
                map.removeLayer(blCountyPolygon);
            })

            document.getElementById("markers-locations-counties-ls-hide-btn").addEventListener("click", function(){
                map.removeLayer(lsCountyPolygon);
            })

            document.getElementById("markers-locations-counties-show-btn").addEventListener("click", function(){
                map.addLayer(lsCountyPolygon);
                map.addLayer(blCountyPolygon);
            });

            document.getElementById("markers-locations-counties-hide-btn").addEventListener("click", function(){
                map.removeLayer(lsCountyPolygon);
                map.removeLayer(blCountyPolygon);
            });
        })
    );

    for (let handle of x) await handle;
    if (window.location.href.includes("#")) {
        document.getElementById("gui_toggle_button_div").click();
        document.getElementById(window.location.href.split("#")[1]).scrollIntoView();
    }
}
loadDynamicData();

async function addSVGOverlay(url, coords) {
    let test = document.createElement('html');
    test.innerHTML = await fetch(url).then(r=>r.text());
    let svg = Array.from(test.getElementsByTagName('svg'))[0];
    L.svgOverlay(svg, coords).addTo(map);
}

if (insertMarkersMode) map.on('click', async function(e) {
    alert(e.latlng.lat.toFixed(6) + ", " + e.latlng.lng.toFixed(6));
});
addSVGOverlay('overlayedMapItems/kortzCenter.svg', [[20.6, -145], [14.8, -139.7]]);
addSVGOverlay('overlayedMapItems/prisonBlaineCounty.svg', [[55.9, -67], [50.9, -59.35]]);
addSVGOverlay('overlayedMapItems/ship.svg', [[-41.43, -72.9], [-44.05, -71.9]]);
addSVGOverlay('overlayedMapItems/vespucciBeachSewer.svg', [[-1.755, -132.3], [-9.7, -121.755]]);
// addSVGOverlay('overlayedMapItems/fortZancudo.svg', [[63.5, -154.7], [55.1, -128.5]]);
L.imageOverlay('overlayedMapItems/fortZancudo.svg', [[63.5, -154.7], [55.1, -128.5]]).addTo(map); // I don't get this bs.

document.getElementById("videoplayer").addEventListener("click", function(e) {
    e.target.classList.remove("s");
});

async function genericCollectibleInsert(parentDiv, array, icon) {
    for (let marker of array) {
        let hr = document.createElement("hr");
        hr.classList.add("twentyfive");
        parentDiv.append(hr);

        let linkDiv = document.createElement("div");
        linkDiv.id = "#" + marker.display_name.replaceAll(" ", "-");
        parentDiv.append(linkDiv);

        let title = document.createElement("h2");
        title.innerHTML = marker.display_name;
        parentDiv.append(title);

        let description = document.createElement("p");
        description.innerHTML = marker.description;
        parentDiv.append(description);

        let video = document.createElement("button");
        video.innerHTML = "Video";
        video.addEventListener("click", function() {
            document.getElementById("videoplayeriframe").src = marker.video_url;
            document.getElementById("videoplayer").classList.add("s");
        })
        parentDiv.append(video);

        let zoom = document.createElement("button");
        zoom.innerHTML = "Zoom to Marker";
        zoom.addEventListener("click", function() {
            document.getElementById("gui_toggle_button_div").click();
            map.setView(marker.coords, 7);
            map.addLayer(onMapMarker);
        })
        parentDiv.append(zoom);

        let actualMarker = L.marker(marker.coords, { icon: icon, title: marker.display_name });
        let onMapMarker = L.layerGroup([actualMarker]);

        actualMarker.on("click",function(e) {
            document.getElementById("gui_toggle_button_div").click();
            linkDiv.scrollIntoView();
            map.setView(marker.coords, 6);
        });
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