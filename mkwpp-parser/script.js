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
    await fetch("https://www.mariokart64.com/mkw/profile.php").then(r=>r.text()).then(r=>{
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
    document.getElementById("readInput").disabled = "disabled";
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
        console.log(data)
        if (lowercaseLine.includes("—")) {
            writeToOutput(`Skipped line "${line}", it's a discord line.`);
            continue;
        }
        if (lowercaseLine.startsWith("date")) {
            skipToNextSubmission = false
            flapCatch = false;
            let year;
            let month;
            let date;
            let keywords = lowercaseLine.split(" ").filter(r=>r !== "");
            if (keywords.length > 4) {
                skipToNextSubmission = true;
                writeToOutput(`submission starting at "${line}", cannot parse date`);
            };
            outerLoop: for (let keyword of keywords.slice(1, keywords.length)) {
                let kw = keyword.replace(/,/g, "").replace(/th/g, "").replace(/rd/g, "").replace(/nd/g, "").replace(/st/g, "");
                for (let abbr of Object.keys(constants.months)) if (kw.startsWith(abbr)) {
                    console.log(kw);
                    month = constants.months[abbr];
                    continue outerLoop;
                }
                if (kw.length === 4 && !isNaN(parseInt(kw))) {
                    year = kw;
                    continue;
                }
                date = kw.padStart(2,"0");
            };
            currentDate = `${year}-${month}-${date}`;
            continue;
        }
        if (skipToNextSubmission) continue;
        if (lowercaseLine.startsWith("name")) {
            let keywords = lowercaseLine.split(" ").filter(r=>r !== "");
            currentName = keywords.slice(1,keywords.length).join(" ");
            if (data.players[currentName] != null && data.players[currentName] != undefined) continue;
            skipToNextSubmission = true;
            writeToOutput(`Skipped submission starting at "${line}", could not identify the player.`);
        }

        if (lowercaseLine.split(" ").filter(r=>r !== "").length === 1 && (lowercaseLine.startsWith("f") || lowercaseLine.startsWith("l"))) {
            flapCatch = true;
            continue;
        };

        let track = -1;
        let trackData = lowercaseLine.split(" ").filter(r=>r!=="");
        let trackDataRef = line.split(" ").filter(r=>r!=="");

        for (let abbr of Object.keys(constants.tracks)) if (trackData[0].startsWith(abbr)) {
            track = constants.tracks[abbr];
            break;
        }
        trackData = trackData.slice(1,trackData.length);

        if (track === -1) {
            writeToOutput(`Skipped line "${line}" for player ${data.players[currentName]}, could not detect track.`);
            continue;
        }

        let nosc = false;
        let flap = flapCatch;

        for (let i = 0; i < trackData.length; i++) {
            let token = trackData[i];
            if (token.startsWith("n")) {
                nosc = true;
                trackData.splice(i,1);
                i--;
            }
            if (token.startsWith("f") || token.startsWith("l")) {
                flap = true;
                trackData.splice(i,1);
                i--;
            }
        }
        trackData = trackData.filter(r=>r!=="");
        trackDataRef = trackDataRef.filter(r=>r!=="");

        let pushToUser = [];
        if (trackData.includes("/") || trackData.includes("\\")) {
            let trackData1 = [];
            let trackData2 = [];
            let refTrackData1 = [];
            let refTrackData2 = [];
            let x = false;
            for (let [i, token] of trackData.entries()) {
                if (token === "/" || token === "\\") {
                    x = true;
                    continue;
                }
                if (x) {
                    trackData2.push(token);
                    trackData2.push(trackDataRef[i]);
                } else {
                    trackData1.push(token);
                    trackData1.push(trackDataRef[i]);
                }
            }
            let finalData1 = handleTime(trackData1,refTrackData1,currentDate);
            finalData1.flap = false;
            let finalData2 = handleTime(trackData2,refTrackData2,currentDate);
            finalData2.flap = false;
            pushToUser.push(finalData1);
            pushToUser.push(finalData2);
        } else {
            let finalData = handleTime(trackData,trackDataRef,currentDate);
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
                    writeToOutput(`>> ${time.date} ${constants.track_names[track]}: ${bflap ? " flap" : ""}${bnosc ? " nosc" : ""} ${formatMsToTime(time.time)}${time.comment !== "" ? " " + time.comment : ""}`);
                    let catString = "Combined";
                    if (bnosc && !constants.track_category[track]) catString = "NonSC";
                    if (track === 29 && !bflap) catString = "NonSC";
                    out.push(`${data.players[player]},${catString},${track*2 + bflap},${time.time / 1000},${time.date},${time.comment === "" ? "N/A" : time.comment}`);
                }
    }
    writeToOutput("<sub>-------</sub> FINAL OUTPUT <sub>-------</sub>");
    for (let i of out) writeToOutput(i);
    document.getElementById("readInput").disabled = "";
});

function formatMsToTime(i32) {
    let mins = Math.trunc(i32 / 60000);
    i32 %= 60000;
    let sec = Math.trunc(i32 / 1000);
    i32 %= 1000;
    let ret = `${mins.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${Math.trunc(i32).toString().padStart(3, "0")}`;
    return ret;
}

function handleTime(data, refData, date) {
    console.log("TrackData", data);
    console.log("RefData", refData);
    let time = 0;
    let comment = "";
    for (let [i, token] of data.entries()) {
        console.log("new token: "+ token);
        if (token.includes("youtu") || token.includes("twitch")) {
            comment = refData[i];
            continue;
        }
        let total = 0;
        if (token.includes(":") || token.includes(".") || token.includes("\"") || token.includes("'")) {
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
            time = parseInt(token);
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
Date: June 16, 2024
Name: Owen Smith

MH: 1:45.025 https://youtu.be/YzsMl8YP4w4
BC: 2:14.430 https://youtu.be/ooDAUlNYk9w
BC flap: 43.080 https://youtu.be/-Z3rX3ld7Wg
rDH flap: 28.803 https://youtu.be/EYql7W4ituA
rDH nosc flap: 30.152 https://youtu.be/3fv9hgpQA7w
rDKJP flap: 18.356 https://youtu.be/jVjyaBpBib8
Date: June 16, 2024
Name: Cqrt3r

rDH flap: 28.160
MG nosc: 1:41.876
MT flap: 27.164
MC: 1:09.320
Date: June 16th, 2024
Name: Danny Boy

MH: 1:43.802 https://youtu.be/mb7kuIQLQRo
MH Flap: 33.248 https://youtu.be/F6nnEG1oXiE?t=41 
Date: June 16th, 2024
Name: Derpness

rMR: 1:49.244
GV2 No-Glitch: 56.388 https://youtu.be/7l31vuQj-Fo
Date: June 17, 2024
Name: Intel Core

rMC3: 1:18.977
Date: June 17, 2024
Name: Shane Hogan

MH: 1:43.961
MH flap: 33.207 
Date: June 16, 2024
Name: Daelyn

rGV2 nosc: 53.937
Date: June 16th, 2024
Name: .VNix

rSGB no-sc flap: 26.476 https://youtu.be/ehvYIGoL18w
rDH no-sc flap: 30.605 https://youtu.be/DiA3gpzZBKI

Date: June 17th, 2024
Name: .VNix

rDS flap: 40.271 https://www.youtube.com/watch?v=YmRyLyq9-RI 
Date: June 16, 2024
Name: Dane Allen
DKS: 1:48.946
Date: April 15th 2024
Name: Kasper

rDKJP no-sc flap: 42.054
Date: May 6th 2024
Name: Kasper

rMR: 1:41.983
Date: 17 Jun 2024
Name: Daelyn

MT: 2:10.817 https://youtu.be/o6uLrPeuR04
MT flap: 32.293 https://youtu.be/o6uLrPeuR04?t=58
Date: 13 June 2024
Name: Max1001

rDKJP: 1:22.829
Date: June 17th, 2024
Name: Hockeylord900

rSL no-sc: 2:05.558
Date: June 17, 2024
Name: Dane Allen
rPB: 1:07.206
Date: June 18, 2024
Name: Dane Allen
rBC3: 1:59.530
DDR Flap: 33.325 
Date: 18th June 2024
Name: Shojiro

LC: 1:09.417 
Date: June 17th, 2024
Name: Dwt89_

MMM 1:18.551
CM flap 4.391
DKSC 1:54.174
MH flap 34.380
BC nosc flap 48.219
rPB nosc 1:14.866 / 23.167
rGV2 nosc flap 16.902
rSL nosc 2:07.829 / 41.131
rDS flap 39.733
rDKJP 1:55.472 / 23.441
Date: 18 Jun 2024
Name: Cederic

DC: 1:30.970
Date: June 6th, 2024
Name: Ian Beler

3lap
MMM 1:17.144
Date: June 9th, 2024
Name: Danny Boy

rDH: 1:32.727 https://youtu.be/hwdCqYtK9pk

Date: April 20th, 2024
Name: Danny Boy

rDH Flap: 27.608 https://youtu.be/IFVgFMU9QSM?t=39
rDH No-SC Flap: 29.713 https://youtu.be/K_1I7zuWj6g?t=39

Date: October 22nd, 2022
Name: Danny Boy

rDKJP No-SC Flap: 42.427 https://youtu.be/lt1RTXcQ_KE?t=102

Date: April 6th, 2024
Name: Danny Boy

rPG No-SC Flap: 38.719 https://youtu.be/w_Psickbc_Y?t=52

Date: December 31st, 2023
Name: Danny Boy

rDKM No-SC Flap: 41.390 https://youtu.be/P0eGM5qJQIo?t=59

Date: July 22nd, 2023
Name: Danny Boy

rDKM Flap: 39.045 https://youtu.be/JFsBaTSGjS8?t=113

Date: December 15th, 2021
Name: Danny Boy

rBC No-SC Flap: 49.270 https://youtu.be/__fiTT4bcvg?t=63
Date: 18 June 2024
Name: Daelyn

DC: 1:32.025 
Date: June 18th, 2024
Name: Trenton Steinburg

MH: 1:50.596
MH Flap: 35.150
BC no-glitch: 2:34.542
BC no-glitch flap: 50.450
RR no-glitch: 2:38.491
RR no-glitch flap: 52.645
rPB no-glitch: 1:16.575
rPB no-glitch flap: 24.154
rYF: 1:03.660
rYF flap: 20.139
rMR 1:47.269
rMR flap: 34.305
rSL no-glitch: 2:11.163
rSL no-glitch flap: 43.468
rSGB no-glitch: 1:26.181
rSGB no-glitch flap: 27.139
rDS: 2:12.853
rDS flap: 42.693
rDH no-glitch: 1:43.029
rDH no-glitch flap: 31.707
rDKJP no-glitch: 2:20.217
rDKJP no-glitch flap: 46.411
rMC no-glitch: 1:39.266
rMC no-glitch flap: 31.215
rPG no-glitch: 2:09.549
rPG no-glitch flap: 41.075
rDKM no-glitch: 2:20.122
rDKM no-glitch flap: 44.538
Date: June 18th, 2024
Name: Mystogan

rSL nosc: 2:05.537
Date: June 19th, 2024
Name: Danny Boy

MC: 54.962 https://youtu.be/MeCvG8DMjOA
MT: 1:56.331 
Date: June 19th, 2024
Name: Ian Beler

MMM 1:17.107 / 24.065

Date: June 20 2024
Name: ChromaQ

DKS: 1:56.329 / 37.634 
Date: 20 Jun 2024
Name: Bryce

MG: 19.698 https://www.youtube.com/watch?v=y5V_s3dMJ4k

Date: 18 Jun 2024
Name: Jay Rangthale

rSL No-Glitch: 2:03.656
Date: 20 June 2024
Name: Daelyn

rBC3: 2:02.049
Date: 20 June 2024
Name: Ben Yafe

TF: 1:48.199
Date: June 19th, 2024
Name: Dwt89_

MT 2:10.776 / 30.747
rPB flap 16.445
*/