let isNotReady = true;
const trackNumToName = {
    0: "Luigi Circuit",
    1: "Moo Moo Meadows",
    2: "Mushroom Gorge",
    3: "Toad's Factory",
    4: "Mario Circuit",
    5: "Coconut Mall",
    6: "DK Snowboard Cross",
    7: "Wario's Gold Mine",
    8: "Daisy Circuit",
    9: "Koopa Cape",
    10: "Maple Treeway",
    11: "Grumble Volcano",
    12: "Dry Dry Ruins",
    13: "Moonview Highway",
    14: "Bowser's Castle",
    15: "Rainbow Road",
    16: "GCN Peach Beach",
    17: "DS Yoshi Falls",
    18: "SNES Ghost Valley 2",
    19: "N64 Mario Raceway",
    20: "N64 Sherbet Land",
    21: "GBA Shy Guy Beach",
    22: "DS Delfino Square",
    23: "GCN Waluigi Stadium",
    24: "DS Desert Hills",
    25: "GBA Bowser Castle 3",
    26: "N64 DK's Jungle Parkway",
    27: "GCN Mario Circuit",
    28: "SNES Mario Circuit 3",
    29: "DS Peach Gardens",
    30: "GCN DK Mountain",
    31: "N64 Bowser's Castle",
}

let constants = {};

let selectionData = {
    playerData: fetch(`../assets/falb.json`).then(r=>r.json()),
    track: "0",
    category: "nosc",
    totalTime: 0,
    totalPos: 0,
    dataSort: [0, 0],
    dataSorted: []
};

document.getElementById("trackPicker").addEventListener("change", function(e) {
    selectionData.track = e.target.value;
    updateDisplay();
});

document.getElementById("categoryPicker").addEventListener("change", function(e) {
    selectionData.category = e.target.value;
    updateDisplay();
});

async function updateDisplay() {
    if (isNotReady) return;
    document.getElementById("leaderboard").innerHTML = "<p>Placement</p><p>Player</p><p>Mii</p><p>Nationality</p><p>Time</p><p>Date</p><p>Position</p>";
    let data = [];
    for (let player in constants.jsons) {
        let timeData = constants.jsons[player][selectionData.track][selectionData.category];
        timeData.player = constants.filenametoplayername[player];
        timeData.mii = constants.filenametomiistr[player];
        timeData.nationality = constants.filenametonationality[player];
        data.push(timeData);
    }
    data.sort((a,b)=>a.time - b.time);
    let i = 1;
    for (let timeData of data) {
        if (i == 1) {
            pushElementToLeaderboard("1st");
        } else if (i == 2) {
            pushElementToLeaderboard("2nd");
        } else if (i == 3) {
            pushElementToLeaderboard("3rd");
        } else {
            pushElementToLeaderboard(`${i}th`);
        }

        pushElementToLeaderboard(timeData.player);
        pushImageElementToLeaderboard(`http://165.232.116.130/imgs/miis/${timeData.mii}`, "mii");
        pushImageElementToLeaderboard(`https://www.mkleaderboards.com/images/flags/${timeData.nationality}.png`, timeData.nationality);
        pushElementToLeaderboard(formatMsToTime(timeData.time));
        pushElementToLeaderboard(timeData.date);
        pushElementToLeaderboard(timeData.pos);

        i++;
    }
}

function pushCustomElementToLeaderboard(element) {
    document.getElementById("leaderboard").appendChild(element);
}

function pushElementToLeaderboard(data) {
    let p = document.createElement("p");
    p.innerHTML = data;
    pushCustomElementToLeaderboard(p)
}

function pushImageElementToLeaderboard(src, alt="") {
    let img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    pushCustomElementToLeaderboard(img);
}

function formatMsToTime(i32) {
    let mins = Math.trunc(i32 / 60000);
    i32 %= 60000;
    let sec = Math.trunc(i32 / 1000);
    i32 %= 1000;
    let ret = `${mins.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${Math.trunc(i32).toString().padStart(3, "0")}`;
    return ret;
}

async function start() {
    await fetch("../assets/filenames.json").then(r=>r.json()).then(async r=>{
        constants.jsons = {};
        for (let filename of r) constants.jsons[filename] = await fetch(`../assets/${filename}.json`).then(r=>r.json());
    });
    let x = fetch("../assets/filenametoplayermiistr.json").then(r=>r.json());
    let y = fetch("../assets/filenametoplayername.json").then(r=>r.json());
    constants.filenametonationality = await fetch("../assets/filenametoplayernationality.json").then(r=>r.json());
    constants.filenametomiistr = await x;
    constants.filenametoplayername = await y;
    isNotReady = false;
    updateDisplay();
};
start();