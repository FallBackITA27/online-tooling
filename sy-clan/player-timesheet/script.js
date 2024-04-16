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

let selectionData = {
    playerData: fetch(`../assets/falb.json`).then(r=>r.json()),
    category: "nosc",
};

document.getElementById("playerPicker").addEventListener("change", function(e) {
    selectionData.playerData = fetch(`../assets/${e.target.value}.json`).then(r=>r.json());
    updateDisplay();
});

document.getElementById("categoryPicker").addEventListener("change", function(e) {
    selectionData.category = e.target.value;
    updateDisplay();
});

async function updateDisplay() {
    await selectionData.playerData.then(r=>{
        for (let i = 0; i < 32; i++) {
            let data = r[i.toString()][selectionData.category];
            let trackName = trackNumToName[i];
        }
    });
}

function formatMsToTime(i32) {
    let mins = Math.trunc(i32 / 60000);
    i32 %= 60000;
    let sec = Math.trunc(i32 / 1000);
    i32 %= 1000;
    let ret = `${mins.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${Math.trunc(i32).toString().padStart(3, "0")}`;
    return ret;
}