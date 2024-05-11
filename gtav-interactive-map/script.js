let insertMarkersMode = false;

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

if (insertMarkersMode) map.on('click', async function(e) {
    alert(e.latlng.lat.toFixed(6) + ", " + e.latlng.lng.toFixed(6));
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
    [-17.947381, -83.638916], // Inside the rusty bobcat bucket
    [-17.332843, -72.966712], // Inside the fire department
    [-1.30726, -74.476318], // In the washbasin inside the building
    [9.275622, -77.431641], // Past the Automatic Garage door
    [3.83137, -84.737549], // Inside the sewers
    [0.703107, -93.768311], // Inside the under construction underground metro
    [4.718778, -102.930908], // Inside the underground metro
    [-0.725078, -100.623779], // On the Arcadius statue
    [-5.101887, -99.547119], // On the fountain
    [-6.064086, -111.335449], // Inside the market
    [-10.844096, -115.411377], // On the ladder to the billboard
    [-6.500899, -121.717529], // On the small wooden pier
    [-18.573362, -124.266357], // In the shark statue's mouth
    [-9.795678, -130.133057], // On the trash can under the pillar
    [-2.054003, -135.241699], // On the lifeguard's cabin
    [7.351571, -131.726074], // Next to a tomb on the first row behind the bench
    [3.00887, -128.0896], // On a table, on the second floor of the plaza
    [1.713612, -118.278809], // Inside the camper used for the Creator mode
    [10.844096, -106.940918], // Past the gate.
    [13.816744, -92.867432], // On the black metal stairs in the lot next to the small parking lot
    [16.488765, -100.041504], // On the comic's store sign
    [19.47695, -107.358398], // Inside the house, behind the second plant on the right from the main entrance
    [15.623037, -117.663574], // Under the arch of the small building next to the tennis court
    [15.707663, -126.210938], // Inside the pool's cave
    [10.087854, -117.301025], // Right in front of the hole 6 sign
    [16.730907, -141.921387], // On the fountain
    [20.07657, -133.341064], // On the leftmost couch on the balcony
    [27.235095, -127.111816], // On a lamp on the gravelly path
    [28.246328, -112.543945], // On the slide
    [29.42046, -98.997803], // On the sun lounger
    [27.166695, -95.493164], // On the right side of the rail
    [22.116177, -84.034424], // Second last column, second block of benches
    [33.979809, -83.408203], // On top of the letter N of the VINEWOOD sign
    [33.220308, -68.928223], // On the Kitchen area in front of the pool in Madrazo's backyard
    [11.910354, -63.885498], // Inside the dam's restricted area
    [4.171115, -47.186279], // On the entrance's sign
    [19.425154, -46.230469], // In the supermarket's backroom
    [41.672912, -44.813232], // Inside the train control cubicle
    [48.268569, -69.093018], // In the house's doghouse
    [48.319734, -80.233154], // On the shelves with the boxes outside the building
    [45.228481, -98.371582], // Next to the trash bin
    [40.178873, -106.116943], // On the counter of the juice stand
    [47.294134, -109.291992], // To the right of the mine's entrance
    [39.027719, -127.463379], // On the wooden pier, inside a small lifeboat<sup>(?)</sup>
    [12.790375, -157.554932], // On the counter for the pool's bar
    [19.331878, -156.467285], // In the supermarket's backroom
    [30.391830, -162.070313], // In the trash bin next to the ATM
    [50.269272, -148.353412], // On the freezer
    [46.634351, -135.087891], // On the pot next to the church entrance
    [53.225768, -122.772217], // Behind the monument's inscription
    [56.583692, -103.073730], // On the chopped tree trunk
    [53.429174, -89.450684], // On the camper's back side
    [54.239551, -73.443604], // Inside the LS Customs
    [54.914514, -60.238037], // Inside the tower
    [61.159138, -63.171387], // Inside the tower
    [66.652977, -59.414063], // Behind the glass door
    [64.081805, -69.345703], // In the backroom of Chef's Supermarket
    [59.051856, -86.418457], // On the rusty boat's backtail
    [64.727262, -95.910645], // On the toilet in the middle of the walls
    [58.418977, -130.155029], // Inside the random carton trash pile
    [62.349609, -138.043213], // On whatever that thing is called
    [69.150831, -140.932617], // Right outside the portapotties
    [74.94513, -140.625], // On the wood pile outside the hut
    [77.892647, -110.961914], // On the foot of the statue
    [75.628632, -108.248291], // On the turnings inside the factory
    [73.763497, -119.597168], // Inside the small Mount Chiliad hole
    [72.238865, -102.139893], // Right in front of the voltage door inside the tunnel
    [76.780655, -88.066406], // At the top of the Ski lift
    [79.775315, -103.40332], // Inside the random carton trash pile
    [80.05046, -93.647461], // Next to the carton boxes
    [80.559141, -70.532227], // Inside the small drainage pipe
    [79.804527, -66.401367], // On the couch outside the camper
    [76.970245, -52.69043], // On the couch in front of the trespassers sign/confederate flag
    [72.685765, -62.973633], // Past the glass (You have to break it to pass it)
    [69.553715, -71.268311], // Inside the hung tire
    [73.846230, -48.889160], // In between the farm's ajar door
    [74.930855, -31.113281], // Inside the doghouse
    [70.685421, -21.159668], // On the wooden stake
    [71.649833, -38.441162], // Right besides the parked train carriage
    [68.403224, -42.659912], // Besides the gnome
    [65.275094, -47.526855], // On the hood of the car with the ufo sculture on it
    [65.357677, -26.949463], // On the Humane Labs sign
    [57.521723, -44.439697], // Inside the train control cabin
    [58.898971, -49.207764], // Spawns only after collecting 98 Action Figures, atop the train parts
    [58.893296, -49.361572], // Spawns only after collecting 98 Action Figures, on the open plane door
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