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

function setClickableToUsable() {
    Array.from(document.getElementsByClassName("clickable")).forEach(r=>r.addEventListener("click", function(e) {
        let type = "a";
        if (e.target.classList.includes("a")) type = "b";
        Array.from(document.getElementsByClassName("clickable")).classList.remove("selected");
        Array.from(document.getElementsByClassName("clickable")).classList.remove("a");
        Array.from(document.getElementsByClassName("clickable")).classList.remove("b");
        e.target.classList.add("selected");
        e.target.classList.add(type);
    }))
}

async function updateDisplay() {
    await selectionData.playerData.then(r=>{
        document.getElementById("timesheet").innerHTML = "<p class=\"clickable\">Track</p><p class=\"clickable\">Time</p><p class=\"clickable\">Date</p><p class=\"clickable\">Position</p>";
        setClickableToUsable();
        let sumPos = 0;
        let sumTime = 0;
        for (let i = 0; i < 32; i++) {
            let data = r[i.toString()][selectionData.category];
            pushElementToTimesheet(trackNumToName[i]);
            pushElementToTimesheet(formatMsToTime(data.time));
            pushElementToTimesheet(data.date);
            pushElementToTimesheet(data.pos);
            sumPos += data.pos;
            sumTime += data.time;
        }
        pushElementToTimesheet("Total");
        pushElementToTimesheet(formatMsToTime(sumTime));
        pushElementToTimesheet("");
        pushElementToTimesheet(sumPos / 32);
    });
}

function pushElementToTimesheet(data) {
    let p = document.createElement("p");
    p.innerHTML = data;
    document.getElementById("timesheet").appendChild(p);
}

function formatMsToTime(i32) {
    let mins = Math.trunc(i32 / 60000);
    i32 %= 60000;
    let sec = Math.trunc(i32 / 1000);
    i32 %= 1000;
    let ret = `${mins.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${Math.trunc(i32).toString().padStart(3, "0")}`;
    return ret;
}