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
    markers: {}, // Load these dinamically
    counties: {}, // Load these dinamically
    polygons: [
        {
            name: "Los Santos International Airport",
            points: [
                [-29.219302, -112.082520],
                [-26.627818, -112.082520],
                [-26.627818, -122.080078],
                [-28.323725, -122.080078],
                [-28.323725, -122.838135],
                [-29.065773, -122.838135],
                [-29.065773, -123.508301],
                [-29.219302, -123.508301],
                [-29.219302, -127.155762],
                [-30.826781, -127.155762],
                [-30.826781, -128.979492],
                [-33.468108, -128.979492],
                [-33.468108, -129.946289],
                [-34.016242, -129.946289],
                [-34.016242, -132.407227],
                [-38.065392, -132.407227],
                [-38.065392, -134.296875],
                [-40.111689, -134.296875],
                [-40.111689, -135.505371],
                [-40.946714, -135.505371],
                [-40.946714, -136.779785],
                [-46.331758, -136.779785],
                [-46.331758, -135.109863],
                [-47.398349, -135.109863],
                [-47.398349, -133.439940],
                [-48.46494, -133.439940],
                [-48.46494, -129.495850],
                [-48.936935, -129.495850],
                [-48.936935, -127.001953],
                [-49.596470, -127.001953],
                [-49.596470, -124.387207],
                [-50.764259, -124.387207],
                [-50.764259, -112.280273],
                [-39.673370, -112.280273],
                [-39.673370, -106.677246],
                [-29.219302, -106.677246],
            ],
            fandom_url: "",
            color: "#2E0"
        },
        {
            name: "Elysian Island",
            points: [
                [-29.219302, -106.677246],
                [-39.673370, -106.677246],
                [-39.673370, -108.654785],
                [-42.423457, -108.654785],
                [-42.423457, -106.677246],
                [-39.673370, -106.677246],
                [-39.673370, -95.734863],
                [-48.806863, -95.734863],
                [-48.806863, -83.276367],
                [-39.095963, -83.276367],
                [-39.095963, -87.209473],
                [-33.339707, -87.209473],
                [-33.339707, -102.832031],
                [-29.219302, -102.832031],
            ],
            fandom_url: "",
            color: "#05C"
        },
        {
            name: "Terminal",
            points: [
                [-48.806863, -83.276367],
                [-39.095963, -83.276367],
                [-39.095963, -70.048828],
                [-48.806863, -70.048828],
            ],
            fandom_url: "",
            color: "#0FF"
        },
        {
            name: "Banning",
            points: [
                [-29.219302, -102.832031],
                [-33.339707, -102.832031],
                [-33.339707, -87.209473],
                [-30.297018, -87.209473],
                [-30.297018, -94.976807],
                [-27.430290, -94.976807],
                [-27.430290, -100.239258],
                [-29.219302, -100.239258],
            ],
            fandom_url: "",
            color: "#E60"
        },
        {
            name: "Cypress Flats",
            points: [
                [-39.095963, -87.209473],
                [-27.527758, -87.209473],
                [-27.527758, -84.858398],
                [-21.718680, -84.858398],
                [-21.718680, -78.706055],
                [-26.882880, -78.706055],
                [-26.882880, -76.289063],
                [-39.095963, -76.289063],
            ],
            fandom_url: "",
            color: "#F6F"
        },
        {
            name: "Maze Bank Arena",
            points: [
                [-29.219302, -106.677246],
                [-29.219302, -100.590820],
                [-28.873539, -100.590820],
                [-28.873539, -100.239258],
                [-22.93816, -100.239258],
                [-22.93816, -102.810059],
                [-23.503552, -102.810059],
                [-23.503552, -106.677246],
            ],
            fandom_url: "",
            color: "#3FF"
        },
        {
            name: "Port Of South Los Santos",
            points: [
                [-29.219302, -100.590820],
                [-28.873539, -100.590820],
                [-28.873539, -100.239258],
                [-29.219302, -100.239258],
            ],
            fandom_url: "",
            color: "#F33"
        },
        {
            name: "Rancho",
            points: [
                [-27.430290, -94.976807],
                [-30.297018, -94.976807],
                [-30.297018, -87.209473],
                [-27.527758, -87.209473],
                [-27.527758, -84.858398],
                [-18.093644, -84.858398],
                [-18.093644, -87.209473],
                [-16.425548, -87.209473],
                [-16.425548, -90.043945],
                [-20.293113, -90.043945],
                [-20.293113, -91.900635],
                [-22.674847, -91.900635],
                [-22.674847, -92.823486],
                [-27.430290, -92.823486],
            ],
            fandom_url: "",
            color: "#F89"
        },
        {
            name: "Davis",
            points: [
                [-16.425548, -90.043945],
                [-20.293113, -90.043945],
                [-20.293113, -91.900635],
                [-22.674847, -91.900635],
                [-22.674847, -92.823486],
                [-27.430290, -92.823486],
                [-27.430290, -100.239258],
                [-22.93816, -100.239258],
                [-22.93816, -98.305664],
                [-21.432617, -98.305664],
                [-21.432617, -95.240479],
                [-16.425548, -95.240479],
                [-16.425548, -95.240479],
            ],
            fandom_url: "",
            color: "#189"
        },
        {
            name: "Chamberlain Hills",
            points: [
                [-22.93816, -102.810059],
                [-22.93816, -98.305664],
                [-16.341226, -98.305664],
                [-16.341226, -102.810059],
            ],
            fandom_url: "",
            color: "#0DF"
        },
        {
            name: "La Puerta",
            points: [
                [-26.627818, -112.082520],
                [-29.219302, -112.082520],
                [-29.219302, -106.677246],
                [-23.503552, -106.677246],
                [-23.503552, -102.810059],
                [-16.341226, -102.810059],
                [-16.341226, -108.896484],
                [-11.350797, -108.896484],
                [-11.350797, -112.763672],
                [-12.254128, -112.763672],
                [-12.254128, -120.113525],
                [-19.082884, -120.113525],
                [-19.082884, -118.916016],
                [-22.652557, -118.916016],
                [-22.652557, -119.620264],
                [-22.998852, -119.620264],
                [-22.998852, -118.795166],
                [-26.627818, -118.795166],
            ],
            fandom_url: "",
            color: "#9A1"
        },
        {
            name: "Strawberry",
            points: [
                [-16.341226, -98.305664],
                [-21.432617, -98.305664],
                [-21.432617, -95.240479],
                [-16.425548, -95.240479],
                [-16.425548, -87.209473],
                [-11.329253, -87.209473],
                [-11.329253, -104.831543],
                [-16.341226, -104.831543],
            ],
            fandom_url: "",
            color: "#700"
        },
        {
            name: "Little Seoul",
            points: [
                [1.911269, -105.270996],
                [-2.471157, -105.270996],
                [-2.471157, -104.238281],
                [-11.329253, -104.238281],
                [-11.329253, -104.831543],
                [-16.341226, -104.831543],
                [-16.341226, -108.896484],
                [-11.350797, -108.896484],
                [-11.350797, -112.763672],
            ],
            fandom_url: "",
            color: "#53F"
        },
    ],
}

async function loadDynamicData() {
    let x = [];
    x.push(
        fetch("./modules/figurines.json").then(r=>r.json()).then(r=>{
            constantData.markers.figurines = r;
            genericCollectibleInsert(document.getElementById("actionFiguresDiv"), constantData.markers.figurines, constantData.icons.figurine);
        })
    );
    // x.push(
    //     fetch("./modules/buildings.json").then(r=>r.json()).then(r=>{
    //         constantData.markers.buildings = r;
    //         for (marker of constantData.markers.buildings) {
    //             let actualMarker = L.marker(marker.coords, { icon: constantData.icons.building, title: marker.name });
    //             let onMapMarker = L.layerGroup([actualMarker]);
    //             map.addLayer(onMapMarker);
    //         }
    //     })
    // );
    x.push(
        fetch("./modules/counties.json").then(r=>r.json()).then(r=>{
            constantData.counties = r;
            genericCollectibleInsert(document.getElementById("actionFiguresDiv"), constantData.markers.figurines, constantData.icons.figurine);
            let lsCountyPolygon = L.polygon(constantData.counties.ls.points, {color: constantData.counties.ls.color}).bindTooltip(constantData.counties.ls.name, {permanent:true,direction:"center"});
            let blCountyPolygon = L.polygon(constantData.counties.bl.points, {color: constantData.counties.bl.color}).bindTooltip(constantData.counties.bl.name, {permanent:true,direction:"center"});

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

L.tileLayer('https://s.rsg.sc/sc/images/games/GTAV/map/render/{z}/{x}/{y}.jpg', {
    maxZoom: 7,
    minZoom: 0,
    noWrap: true,
}).addTo(map);

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

// Load districts
// for (let polygon of constantData.polygons) {
//     L.polygon(polygon.points, {color:polygon.color}).bindTooltip(polygon.name, {permanent:true,direction:"center"}).addTo(map);
// }

let tileLayerData = {
    mainMap: {
        render: {
            oceanColor: "#384950",
            tileLayerOpts: {
                maxZoom: 7,
                minZoom: 0,
            }
        },
        game: {
            oceanColor: "#0D2B4F",
            tileLayerOpts: {
                maxZoom: 7,
                minZoom: 0,
            }
        },
        print: {
            oceanColor: "#4EB1D0",
            tileLayerOpts: {
                maxZoom: 7,
                minZoom: 0,
            }
        },
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