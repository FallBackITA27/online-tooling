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
    totalTime: 0,
    totalPos: 0,
    dataSort: [0, 0],
    dataSorted: []
};

document.getElementById("playerPicker").addEventListener("change", function(e) {
    selectionData.playerData = fetch(`../assets/${e.target.value}.json`).then(r=>r.json());
    updateDataSorted();
});

document.getElementById("categoryPicker").addEventListener("change", function(e) {
    selectionData.category = e.target.value;
    updateDataSorted();
});

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
        if (e.target.innerHTML === "Time") x = 1;
        if (e.target.innerHTML === "Date") x = 2;
        if (e.target.innerHTML === "Position") x = 3;
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
    ts.innerHTML = "<p>Track</p><p class=\"clickable\">Time</p><p class=\"clickable\">Date</p><p class=\"clickable\">Position</p>";
    setClickableToUsable();
    if (selectionData.dataSort[0] != 0) {
        let element = ts.children[selectionData.dataSort[0]];
        element.classList.add("selected");
        selectionData.dataSort[1] === 1 ? element.classList.add("a") : element.classList.add("b");
    }
    for (let data of selectionData.dataSorted) {
        let date = new Date(data[2]);
        pushElementToTimesheet(trackNumToName[data[0]]);
        pushElementToTimesheet(formatMsToTime(data[1]));
        pushElementToTimesheet(`${date.getFullYear()}-${`${date.getMonth()}`.padStart(2,"0")}-${`${date.getDate()}`.padStart(2,"0")}`);
        pushElementToTimesheet(data[3]);
    }
    pushElementToTimesheet("Total");
    pushElementToTimesheet(formatMsToTime(selectionData.totalTime));
    pushElementToTimesheet("");
    pushElementToTimesheet(selectionData.totalPos / 32);
}

async function sortDataSorted() {
    if (selectionData.dataSort[1] == 1 || selectionData.dataSort[0] == 0) {
        selectionData.dataSorted.sort((a,b) => a[selectionData.dataSort[0]] - b[selectionData.dataSort[0]]);
    } else if (selectionData.dataSort[1] == 2) {
        selectionData.dataSorted.sort((a,b) => b[selectionData.dataSort[0]] - a[selectionData.dataSort[0]]);
    }
}

async function updateDataSorted() {
    selectionData.dataSorted = [];
    await selectionData.playerData.then(r=>{
        selectionData.totalPos = 0;
        selectionData.totalTime = 0;
        for (let i = 0; i < 32; i++) {
            let data = r[i.toString()][selectionData.category];
            selectionData.dataSorted.push(
                [
                    i,
                    data.time,
                    Date.parse(data.date),
                    data.pos
                ]
            );
            selectionData.totalPos += data.pos;
            selectionData.totalTime += data.time;
        }
    });
    sortDataSorted();
    updateDisplay();
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