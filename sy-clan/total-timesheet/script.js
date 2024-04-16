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
    category: "nosc",
    totalTime: {nosc: 0, unr: 0},
    totalPos: {nosc: 0, unr: 0},
    dataSort: [0, 0],
    dataSorted: {nosc: [], unr: []},
};

document.getElementById("categoryPicker").addEventListener("change", function(e) {
    selectionData.category = e.target.value;
    updateDisplay();
});

async function start() {
    await fetch("../assets/filenames.json").then(r=>r.json()).then(async r=>{
        let namesConvert = await fetch("../assets/filenametoplayername.json").then(r=>r.json());
        let total = {unr: {}, nosc: {}};
        for (let filename of r) {
            let player = await fetch(`../assets/${filename}.json`).then(r=>r.json());
            for (let track in player) {
                for (let category in player[track]) {
                    let timeData = player[track][category];
                    if (total[category][track] == null || total[category][track] == undefined) {
                        total[category][track] = timeData;
                        total[category][track].player = namesConvert[filename];
                    } else if (total[category][track].time >= timeData.time ) {
                        if (total[category][track].time === timeData.time && Date.parse(total[category][track].date) > Date.parse(timeData.date)) continue;
                        total[category][track] = timeData;
                        total[category][track].player = namesConvert[filename];
                    }
                }
            }
        }
        for (let i = 0; i < 32; i++) {
            selectionData.dataSorted.unr.push([
                i,
                total.unr[i].player,
                total.unr[i].time,
                total.unr[i].date,
                total.unr[i].pos,
            ]);
            selectionData.totalPos.unr += total.unr[i].pos;
            selectionData.totalTime.unr += total.unr[i].time;

            selectionData.dataSorted.nosc.push([
                i,
                total.nosc[i].player,
                total.nosc[i].time,
                total.nosc[i].date,
                total.nosc[i].pos,
            ]);
            selectionData.totalPos.nosc += total.nosc[i].pos;
            selectionData.totalTime.nosc += total.nosc[i].time;
        }
    });
    updateDisplay();
};
start();

function setClickableToUsable() {
    Array.from(document.getElementsByClassName("clickable")).forEach(r=>r.addEventListener("click", function(e) {
        let type = "a";
        if (e.target.classList.contains("a")) type = "b";
        if (e.target.classList.contains("b")) type = "r";
        Array.from(document.getElementsByClassName("clickable")).forEach(r=>r.classList.remove("selected"));
        Array.from(document.getElementsByClassName("clickable")).forEach(r=>r.classList.remove("a"));
        Array.from(document.getElementsByClassName("clickable")).forEach(r=>r.classList.remove("b"));
        if (type === "r") {
            selectionData.dataSort = [0,0];
            sortDataSorted();
            updateDisplay();
            return;
        }
        e.target.classList.add("selected");
        e.target.classList.add(type);
        let x;
        if (e.target.innerHTML === "Player") x = 1;
        if (e.target.innerHTML === "Time") x = 2;
        if (e.target.innerHTML === "Date") x = 3;
        if (e.target.innerHTML === "Position") x = 4;
        let y;
        if (type === "a") y = 1;
        if (type === "b") y = 2;
        selectionData.dataSort = [x, y];
        sortDataSorted();
        updateDisplay();
    }))
}

async function updateDisplay() {
    let ts = document.getElementById("timesheet");
    ts.innerHTML = "<p>Track</p><p class=\"clickable\">Player</p><p class=\"clickable\">Time</p><p class=\"clickable\">Date</p><p class=\"clickable\">Position</p>";
    setClickableToUsable();
    if (selectionData.dataSort[0] != 0) {
        let element = ts.children[selectionData.dataSort[0]];
        element.classList.add("selected");
        selectionData.dataSort[1] === 1 ? element.classList.add("a") : element.classList.add("b");
    }
    for (let data of selectionData.dataSorted[selectionData.category]) {
        let date = new Date(data[3]);
        pushElementToTimesheet(trackNumToName[data[0]]);
        pushElementToTimesheet(data[1]);
        pushElementToTimesheet(formatMsToTime(data[2]));
        pushElementToTimesheet(`${date.getFullYear()}-${`${date.getMonth()}`.padStart(2,"0")}-${`${date.getDate()}`.padStart(2,"0")}`);
        pushElementToTimesheet(data[4]);
    }
    pushElementToTimesheet("Total");
    pushElementToTimesheet("0");
    pushElementToTimesheet(formatMsToTime(selectionData.totalTime[selectionData.category]));
    pushElementToTimesheet("");
    pushElementToTimesheet(selectionData.totalPos[selectionData.category] / 32);
}

async function sortDataSorted() {
    if (selectionData.dataSort[1] == 1 || selectionData.dataSort[0] == 0) {
        selectionData.dataSorted.unr.sort((a,b) => a[selectionData.dataSort[0]] - b[selectionData.dataSort[0]]);
        selectionData.dataSorted.nosc.sort((a,b) => a[selectionData.dataSort[0]] - b[selectionData.dataSort[0]]);
    } else if (selectionData.dataSort[1] == 2) {
        selectionData.dataSorted.unr.sort((a,b) => b[selectionData.dataSort[0]] - a[selectionData.dataSort[0]]);
        selectionData.dataSorted.nosc.sort((a,b) => b[selectionData.dataSort[0]] - a[selectionData.dataSort[0]]);
    }
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