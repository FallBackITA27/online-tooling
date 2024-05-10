var map = L.map('map', {
    center: [-90, 64.69999694824219],
    zoom: 0,
    inertia: true,
    worldCopyJump: false,
});

const constantData = {
    icons: {
        figurine: L.icon({
            iconUrl: 'icons/figurine.svg',
            iconSize: [22,22]
        }),
    }
}

L.tileLayer('https://s.rsg.sc/sc/images/games/GTAV/map/game/{z}/{x}/{y}.jpg', {
    maxZoom: 7,
    minZoom: 0,
    noWrap: true,
    attribution: '&copy; Rockstar Games'
}).addTo(map);

async function addSVGOverlay(url, coords) {
    let test = document.createElement('html');
    test.innerHTML = await fetch(url).then(r=>r.text());
    let svg = Array.from(test.getElementsByTagName('svg'))[0];
    L.svgOverlay(svg, coords).addTo(map);
}

async function registerMarker(icon, coordinates, title = "",) {
    L.marker(coordinates, { icon: icon, title: title }).addTo(map);
}

map.on('click', async function(e) {
    alert(e.latlng);
});

addSVGOverlay('overlayedMapItems/kortzCenter.svg', [[20.6, -145], [14.8, -139.7]]);
addSVGOverlay('overlayedMapItems/prisonBlaineCounty.svg', [[55.9, -67], [50.9, -59.35]]);
addSVGOverlay('overlayedMapItems/ship.svg', [[-41.43, -72.9], [-44.05, -71.9]]);
addSVGOverlay('overlayedMapItems/vespucciBeachSewer.svg', [[-1.755, -132.3], [-9.7, -121.755]]);
L.imageOverlay('overlayedMapItems/fortZancudo.svg', [[63.5, -154.7], [55.1, -128.5]]).addTo(map); // I don't get this bs.

let i = 0;
for (let coords of [
    [-42.3, -115.6], // Inside the Building
    [-28.526622, -115.037842], // Behind the Sign
    [-35.826721, -98.305664], // Inside the Building
    [-44.5, -94.163818], // Inside the Building
    [-44.816916, -87.51709], // Inside the Building
    [-36.633162, -72.322998], // Inside the Building
    [-29.238477, -67.236328], // Inside the Building
    [-29.878755, -79.705811],
    [-28.921631, -89.846191], // On the bench of the monument
    [-22.43134, -98.173828], // In the supermarket's backroom
    [-16.772987, -98.470459], // In the doghouse
    [-17.947381, -89.79126], // On the washbasin in the building
    [-12.103781, -93.823242], // Under the bridge
    [-3.283114, -87.945557], // On the floor in between the tied up carpets
    [-8.928487, -84.089355], // Inside the security's cubicle 
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
]) {
    i++;
    registerMarker(constantData.icons.figurine, coords, `Action Figure N. ${i}`);
}
i = 0;

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