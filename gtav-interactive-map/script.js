// true false;
let insertMarkersMode = false;

let saveData = {
    profile0: {
        
    }
}

var map = L.map('map', {
    center: [-90, 64.69999694824219],
    zoom: 0,
    inertia: true,
    worldCopyJump: false,
    attributionControl: false
});

L.tileLayer('https://s.rsg.sc/sc/images/games/GTAV/map/render/{z}/{x}/{y}.jpg', {
    maxZoom: 7,
    minZoom: 0,
    noWrap: true,
}).addTo(map);

const constantData = {
    icons: {
        figurine: L.icon({
            iconUrl: 'gtav-icons/figurine.svg',
            iconSize: [22,22]
        }),
        building: L.icon({
            iconUrl: 'gtav-icons/building.svg',
            iconSize: [22,22]
        }),
    },
}

async function loadDynamicData() {
    let x = [];
    x.push(
        fetch("./assets/figurines.json").then(r=>r.json()).then(r=>{
            genericCollectibleInsert(document.getElementById("actionFiguresDiv"), r, constantData.icons.figurine);
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
}
loadDynamicData();

document.getElementById("gui_toggle_button_div").addEventListener("click", function(e){
    document.getElementById("popupgui").classList.toggle("s");
    document.getElementById("gui_toggle_button").classList.toggle("s");
});

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