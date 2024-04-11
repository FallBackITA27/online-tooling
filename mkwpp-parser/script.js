var data = {
    submissions: [],
};

var constants = {
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
        "rmc": 27,
        "rmc3": 28,
        "rpb": 29,
        "rdkm": 30,
        "rbc": 31,
    }
}

function writeToOutput(d) {
    if (d == null) return;
    let out = document.createElement("p");
    out.innerHTML = d;
    document.getElementById("output").append(out);
}

function resetOutput() {
    document.getElementById("output").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("readInput").addEventListener("click", async function() {
        console.log("Started");
        let parserData = document.getElementById("inputTextArea").value.split("\n").filter(r=>r !== "");
        let currentSubmission = {skip:true};
        let skipToNextSubmission = false;
        for (let line of parserData) {
            let lowercaseLine = line.toLowerCase();
            if (lowercaseLine.startsWith("date")) {
                skipToNextSubmission = false
                data.submissions.push(currentSubmission);
                let year;
                let month;
                let date;
                let keywords = lowercaseLine.split(" ").filter(r=>r !== " ");
                if (keywords.length > 4) {
                    skipToNextSubmission = true;
                    currentSubmission.err = true;
                    currentSubmission.errString = "Cannot parse date";
                };
                for (let keyword of keywords.slice(1, keywords.length)) {
                    let kw = keyword.replace(/,/g, "");
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
                    let kwfiltered = kw.replace(/nth/g, "").replace(/rd/g, "").replace(/nd/g, "").replace(/st/g, "");
                    date = kwfiltered.padStart(2,"0")
                };
                currentSubmission = {
                    name: "",
                    date: `${year}-${month}-${date}`,
                    flapCatch: false,
                    times: [],
                };
            } else if (lowercaseLine.startsWith("name")) {
                let keywords = lowercaseLine.split(" ").filter(r=>r !== " ");
                currentSubmission.name = keywords.slice(1,keywords.length).join(" ");
            }
            if (skipToNextSubmission) continue;

            if (lowercaseLine.split(" ").filter(r=>r !== "").length === 1 && (lowercaseLine.startsWith("f") || lowercaseLine.startsWith("l"))) {
                currentSubmission.flapCatch = true
                continue;
            };

            let track = -1;
            let data = lowercaseLine.split(" ").filter(r=>r!=="");

            for (let abbr of Object.keys(constants.tracks)) if (data[0].startsWith(abbr)) {
                track = constants.tracks[abbr];
                break;
            }
            data.slice(1,data.length);

            if (track === -1) {
                // report line skip
                continue
            }

            let nosc = false;
            let flap = currentSubmission.flapCatch;

            let i = 0;
            let remove = [];
            for (let token of data) {
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
            for (let x of remove) data[x] = "";
            data = data.filter(r=>r!=="");

            if (lowercaseLine.contains("/") || lowercaseLine.contains("\\")) {
                let data1 = [];
                let data2 = [];
                let x = false;
                for (let token of data) {
                    if (token === "/" || token === "\\") {
                        x = true;
                        continue;
                    }
                    if (x) {
                        data2.push(token);
                    } else {
                        data1.push(token);
                    }
                }
                if (data1.length !== 0) data.submissions.times.push(handleTime(data1,track,nosc,false));
                if (data2.length !== 0) data.submissions.times.push(handleTime(data2,track,nosc,true));
                continue;
            }

            data.submissions.times.push(handleTime(data,track,nosc,flap));
        }
        data.submissions.push(currentSubmission);
        console.log("Finished");
    });

    // fetch("https://www.mariokart64.com/mkw/profile.php").then(r=>r.text()).then(r=>{
    //     let profileDocument = new DOMParser().parseFromString(r);
    //     let playerList = profileDocument.getElementsByClassName("playerslist")[0]
    //     console.log(playerList);
    // });
});

function handleTime(data, track, nosc, flap) {
    let calculated = track * 2;
    if (flap) calculated++;
    let time = 0;
    let comment = "";
    for (let token of data) {
        if (token.includes("youtu") || token.includes("twitch")) comment = token;
        let total = 0;
        if ((str.includes(":")) || (str.includes(".")) || (str.includes("\"")) || (str.includes("'"))) {
            if (str.includes(":")) {
                total += parseInt(str.split(":")[0]) * 60000;
                str = str.split(":")[1];
            } else if (str.includes("\"")) {
                total += parseInt(str.split("\"")[0]) * 60000;
                str = str.split("\"")[1];
            }
            if (str.includes(".")) {
                total += parseInt(str.split(".")[0]) * 1000;
                total += parseInt(str.split(".")[1]);
            } else if (str.includes("'")) {
                total += parseInt(str.split("'")[0]) * 1000;
                total += parseInt(str.split("'")[1]);
            }
        } else {
            time = parseInt("str")
        }
        time = total;
    }
    return {
        track: calculated,
        time: time,
        comment: comment,
        nosc: nosc
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