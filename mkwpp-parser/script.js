let data = {
    submissions: {},
    players: {}
};

let constants = {
    months: {
        "ja": "01",
        "f": "02",
        "mar": "03",
        "ap": "04",
        "may": "05",
        "jun": "06",
        "jul": "07",
        "au": "08",
        "s": "09",
        "o": "10",
        "n": "11",
        "d": "12",
    },

    tracks: {
        "l": 0,
        "mm": 1,
        "mg": 2,
        "t": 3,
        "mc": 4,
        "cm": 5,
        "dk": 6,
        "w": 7,
        "dc": 8,
        "k": 9,
        "mt": 10,
        "g": 11,
        "dd": 12,
        "mh": 13,
        "b": 14,
        "rr": 15,
        "rpb": 16,
        "ry": 17,
        "rg": 18,
        "rmr": 19,
        "rsl": 20,
        "rsg": 21,
        "rds": 22,
        "rw": 23,
        "rdh": 24,
        "rbc3": 25,
        "rdkj": 26,
        "rmc3": 28,
        "rmc": 27,
        "rpg": 29,
        "rdkm": 30,
        "rbc": 31,
    },

    track_category: {
        0: true,
        1: true,
        2: false,
        3: false,
        4: false,
        5: false,
        6: true,
        7: false,
        8: true,
        9: false,
        10: false,
        11: false,
        12: true,
        13: true,
        14: false,
        15: false,
        16: false,
        17: true,
        18: false,
        19: true,
        20: false,
        21: false,
        22: true,
        23: false,
        24: false,
        25: false,
        26: false,
        27: false,
        28: true,
        29: false,
        30: false,
        31: false,
    },

    track_names: [
        "Luigi Circuit",
        "Moo Moo Meadows",
        "Mushroom Gorge",
        "Toad's Factory",
        "Mario Circuit",
        "Coconut Mall",
        "DK's Snowboard Cross",
        "Wario's Gold Mine",
        "Daisy Circuit",
        "Koopa Cape",
        "Maple Treeway",
        "Grumble Volcano",
        "Dry Dry Ruins",
        "Moonview Highway",
        "Bowser's Castle",
        "Rainbow Road",
        "GCN Peach Beach",
        "DS Yoshi Falls",
        "SNES Ghost Valley 2",
        "N64 Mario Raceway",
        "N64 Sherbet Land",
        "GBA Shy Guy Beach",
        "DS Delfino Square",
        "GCN Waluigi Stadium",
        "DS Desert Hills",
        "GBA Bowser Castle 3",
        "N64 DK's Jungle Parkway",
        "GCN Mario Circuit",
        "SNES Mario Circuit 3",
        "DS Peach Gardens",
        "GCN DK Mountain",
        "N64 Bowser's Castle",
    ]
}

async function loadStuff() {
    await fetch("https://corsproxy.io/?https://www.mariokart64.com/mkw/profile.php").then(r=>r.text()).then(r=>{
        let profileDocument = new DOMParser().parseFromString(r, "text/html");
        let playerList = profileDocument.getElementsByClassName("playerslist")[0].children[0];
        for (let row of playerList.children) {
            console.log(row);
            let starterData = row.children[0].children[0];
            if (row.children[0].innerHTML === "Name") continue;
            data.players[starterData.innerHTML.toLowerCase()] = starterData.innerHTML;
        }
        document.getElementById("readInput").disabled = "";
    });
}
loadStuff();

function writeToOutput(d) {
    if (d == null) return;
    let out = document.createElement("p");
    out.innerHTML = d;
    document.getElementById("output").append(out);
}

function resetOutput() {
    document.getElementById("output").innerHTML = "";
}

document.getElementById("readInput").addEventListener("click", async function() {
    console.log("Started");
    data.submissions = {};
    resetOutput();
    let parserData = document.getElementById("inputTextArea").value.split("\n").filter(r=>r !== "");
    let currentName = "";
    let currentDate = "";
    let flapCatch = false;
    let skipToNextSubmission = false;
    console.log(parserData);
    for (let line of parserData) {
        let lowercaseLine = line.toLowerCase();
        console.log(lowercaseLine);
        if (lowercaseLine.startsWith("date")) {
            skipToNextSubmission = false
            flapCatch = false;
            let year;
            let month;
            let date;
            let keywords = lowercaseLine.split(" ").filter(r=>r !== " ");
            if (keywords.length > 4) {
                skipToNextSubmission = true;
                writeToOutput(`submission starting at "${line}", cannot parse date`);
            };
            for (let keyword of keywords.slice(1, keywords.length)) {
                let kw = keyword.replace(/,/g, "").replace(/th/g, "").replace(/rd/g, "").replace(/nd/g, "").replace(/st/g, "");
                if (kw.length === 4) {
                    year = kw;
                    continue;
                }
                let _break = false;
                for (let abbr of Object.keys(constants.months)) if (kw.startsWith(abbr)) {
                    month = constants.months[abbr];
                    _break = true;
                    break;
                }
                if (_break) continue;
                date = kw.padStart(2,"0");
            };
            currentDate = `${year}-${month}-${date}`;
            continue;
        }
        if (skipToNextSubmission) continue;
        if (lowercaseLine.startsWith("name")) {
            let keywords = lowercaseLine.split(" ").filter(r=>r !== " ");
            currentName = keywords.slice(1,keywords.length).join(" ");
            if (data.players[currentName] != null || data.players[currentName] != undefined) continue;
            skipToNextSubmission = true;
            writeToOutput(`Skipped submission starting at "${line}", could not identify the player.`);
        }

        if (lowercaseLine.split(" ").filter(r=>r !== "").length === 1 && (lowercaseLine.startsWith("f") || lowercaseLine.startsWith("l"))) {
            flapCatch = true;
            continue;
        };

        let track = -1;
        let trackData = lowercaseLine.split(" ").filter(r=>r!=="");

        for (let abbr of Object.keys(constants.tracks)) if (trackData[0].startsWith(abbr)) {
            track = constants.tracks[abbr];
            break;
        }
        trackData.slice(1,trackData.length);

        if (track === -1) {
            writeToOutput(`Skipped line "${line}" for player ${data.players[currentName]}, could not detect track.`);
            continue;
        }

        let nosc = false;
        let flap = flapCatch;

        let i = 0;
        let remove = [];
        for (let token of trackData) {
            if (token.startsWith("n")) {
                nosc = true;
                remove.push(i);
            }
            if (token.startsWith("f") || token.startsWith("l")) {
                flap = true;
                remove.push(i);
            }
            i++;
        }
        for (let x of remove) trackData[x] = "";
        trackData = trackData.filter(r=>r!=="");

        let pushToUser = [];
        if (lowercaseLine.includes("/") || lowercaseLine.includes("\\")) {
            let trackData1 = [];
            let trackData2 = [];
            let x = false;
            for (let token of trackData) {
                if (token === "/" || token === "\\") {
                    x = true;
                    continue;
                }
                if (x) {
                    trackData2.push(token);
                } else {
                    trackData1.push(token);
                }
            }
            let finalData1 = handleTime(trackData1,currentDate);
            finalData1.flap = false;
            let finalData2 = handleTime(trackData2,currentDate);
            finalData2.flap = false;
            pushToUser.push(finalData1);
            pushToUser.push(finalData2);
        } else {
            let finalData = handleTime(trackData,currentDate);
            finalData.flap = flap;
            pushToUser.push(finalData);
        }

        for (let time of pushToUser) {
            let finalIsFlap = time.flap;
            delete time.flap;
            if (data.submissions[currentName] == null || data.submissions[currentName] == undefined) data.submissions[currentName] = {};
            if (data.submissions[currentName][track] == null || data.submissions[currentName][track] == undefined) data.submissions[currentName][track] = {};
            if (data.submissions[currentName][track][nosc] == null || data.submissions[currentName][track][nosc] == undefined) data.submissions[currentName][track][nosc] = {};
            if (data.submissions[currentName][track][nosc][finalIsFlap] == null || data.submissions[currentName][track][nosc][finalIsFlap] == undefined) {
                data.submissions[currentName][track][nosc][finalIsFlap] = time;
            } else {
                let cmpTime = data.submissions[currentName][track][nosc][finalIsFlap];
                if (cmpTime.time < time.time) continue;
                if (cmpTime.comment === "" && time.comment === "") continue;
                data.submissions[currentName][track][nosc][finalIsFlap] = time;
            }
        }
    }
    console.log("Finished");

    let out = [];
    for (let player of Object.keys(data.submissions)) {
        writeToOutput("Name: "+data.players[player]);
        for (let track of Object.keys(data.submissions[player]).sort((a,b)=>a-b))
            for (let nosc of Object.keys(data.submissions[player][track]).sort((a,b)=>a-b))
                for (let flap of Object.keys(data.submissions[player][track][nosc]).sort((a,b)=>b-a)) {
                    let time = data.submissions[player][track][nosc][flap];
                    let bflap = flap === "true";
                    let bnosc = nosc === "true";
                    writeToOutput(`>> ${constants.track_names[track]}: ${time.date} ${bflap ? " flap" : ""}${bnosc ? " nosc" : ""} ${formatMsToTime(time.time)}${time.comment !== "" ? " " + time.comment : ""}`);
                    let catString = "Combined";
                    if (bnosc && !constants.track_category[track]) catString = "NonSC";
                    if (track === 29 && !bflap) catString = "NonSC";
                    out.push(`(${data.players[player]},${catString},${track*2 + bflap},${time.time / 1000},${time.date},${time.comment === "" ? "N/A" : time.comment})`);
                }
    }
    writeToOutput("<sub>-------</sub> FINAL OUTPUT <sub>-------</sub>");
    for (let i of out) writeToOutput(i);
});

function formatMsToTime(i32) {
    let mins = Math.trunc(i32 / 60000);
    i32 %= 60000;
    let sec = Math.trunc(i32 / 1000);
    i32 %= 1000;
    let ret = `${mins.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${Math.trunc(i32).toString().padStart(3, "0")}`;
    return ret;
}

function handleTime(data, date) {
    let time = 0;
    let comment = "";
    for (let token of data) {
        if (token.includes("youtu") || token.includes("twitch")) comment = token;
        let total = 0;
        if ((token.includes(":")) || (token.includes(".")) || (token.includes("\"")) || (token.includes("'"))) {
            if (token.includes(":")) {
                total += parseInt(token.split(":")[0]) * 60000;
                token = token.split(":")[1];
            } else if (token.includes("\"")) {
                total += parseInt(token.split("\"")[0]) * 60000;
                token = token.split("\"")[1];
            }
            if (token.includes(".")) {
                total += parseInt(token.split(".")[0]) * 1000;
                total += parseInt(token.split(".")[1]);
            } else if (token.includes("'")) {
                total += parseInt(token.split("'")[0]) * 1000;
                total += parseInt(token.split("'")[1]);
            }
        } else {
            time = parseInt(token)
        }
        time = total;
    }
    return {
        time: time,
        comment: comment,
        date: date
    }
}

/* example data
Date: April 10, 2024
Name: ChromaQ

rSGB nosc: 1:27.593
DKS: 1:58.875
LC flap: 23.035
MMM flap: 25.464
MG flap: 16.692
TF nosc flap: 37.231
MC flap: 12.179
CM flap: 11.130
DKS flap: 39.208
WGM flap: 15.958
DC flap: 30.843
KC flap: 47.642
MT flap: 33.636
GV flap: 6.167
BC flap: 47.880
RSL flap: 22.502
RBC3 flap: 42.815

Date: April 11th 2024
Name: Sergio
MH: 1:46.423/34.866

Date: April 11, 2024
Name: ARK..

MG no-sc 1:53.782
MC no-sc 1:26.557
MH 1:55.099
*/