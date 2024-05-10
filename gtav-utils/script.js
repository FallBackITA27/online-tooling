var map = L.map('map', {
    center: [-90, 64.69999694824219],
    zoom: 0,
    inertia: true,
    worldCopyJump: false,
});

L.tileLayer('https://s.rsg.sc/sc/images/games/GTAV/map/render/{z}/{x}/{y}.jpg', {
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

addSVGOverlay('overlayedMapItems/fortZancudo.svg', [[63.5, -154.7], [55.1, -128.5]]);
addSVGOverlay('overlayedMapItems/kortzCenter.svg', [[20.6, -145], [14.8, -139.7]]);
addSVGOverlay('overlayedMapItems/vespucciBeachSewer.svg', [[-1.755, -132.3], [-9.7, -121.755]]);
addSVGOverlay('overlayedMapItems/prison.svg', [[55.9, -67], [50.9, -59.35]]);

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