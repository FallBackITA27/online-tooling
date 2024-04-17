const ctgpLinks = {
    1662: ["1F7B7D3331A3A008"], // FalB
    1597: ["1C6A832CF6B30CFF"], // Electrick
    1772: ["858060403046B78E"], // EliDiscord
    1556: ["9ED97E25E8149323"], // Cederic
    1441: ["A50190B9301E0C7A"], // ArthurOww
    1520: ["5F22F87EE4FFFD80","8B2AA1EB59B08E78","BBD2EC73FF52D568"], // Danny Boy
    1497: ["BA0BD8BF709C1E35"], // Ragemodepigeon
}

let players = {};

const ctgpIdsToTrackNums = {
    "1AE1A7D894960B38E09E7494373378D87305A163": 0,
    "90720A7D57A7C76E2347782F6BDE5D22342FB7DD": 1,
    "0E380357AFFCFD8722329994885699D9927F8276": 2,
    "1896AEA49617A571C66FF778D8F2ABBE9E5D7479": 3,
    "7752BB51EDBC4A95377C0A05B0E0DA1503786625": 4,
    "E4BF364CB0C5899907585D731621CA930A4EF85C": 5,
    "B02ED72E00B400647BDA6845BE387C47D251F9D1": 6,
    "D1A453B43D6920A78565E65A4597E353B177ABD0": 7,
    "72D0241C75BE4A5EBD242B9D8D89B1D6FD56BE8F": 8,
    "52F01AE3AED1E0FA4C7459A648494863E83A548C": 9,
    "48EBD9D64413C2B98D2B92E5EFC9B15ECD76FEE6": 10,
    "ACC0883AE0CE7879C6EFBA20CFE5B5909BF7841B": 11,
    "38486C4F706395772BD988C1AC5FA30D27CAE098": 12,
    "B13C515475D7DA207DFD5BADD886986147B906FF": 13,
    "B9821B14A89381F9C015669353CB24D7DB1BB25D": 14,
    "FFE518915E5FAAA889057C8A3D3E439868574508": 15,
    "8014488A60F4428EEF52D01F8C5861CA9565E1CA": 16,
    "8C854B087417A92425110CC71E23C944D6997806": 17,
    "071D697C4DDB66D3B210F36C7BF878502E79845B": 18,
    "49514E8F74FEA50E77273C0297086D67E58123E8": 19,
    "BA9BCFB3731A6CB17DBA219A8D37EA4D52332256": 20,
    "E8ED31605CC7D6660691998F024EED6BA8B4A33F": 21,
    "BC038E163D21D9A1181B60CF90B4D03EFAD9E0C5": 22,
    "418099824AF6BF1CD7F8BB44F61E3A9CC3007DAE": 23,
    "4EC538065FDC8ACF49674300CBDEC5B80CC05A0D": 24,
    "A4BEA41BE83D816F793F3FAD97D268F71AD99BF9": 25,
    "692D566B05434D8C66A55BDFF486698E0FC96095": 26,
    "1941A29AD2E7B7BBA8A29E6440C95EF5CF76B01D": 27,
    "077111B996E5C4F47D20EC29C2938504B53A8E76": 28,
    "F9A62BEF04CC8F499633E4023ACC7675A92771F0": 29,
    "B036864CF0016BE0581449EF29FB52B2E58D78A4": 30,
    "15B303B288F4707E5D0AF28367C8CE51CDEAB490": 31,
}

const track_names = [
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
];

const track_category = {
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
}

/*
This is a timesheet
{
    playerPPID: {
        Normal: {
            3lap: {
                trackId: timeInMilliseconds,
                ...
            },
            flap: {
                trackId: timeInMilliseconds,
                ...
            },
        },
        Unrestricted: {
            3lap: {
                trackId: timeInMilliseconds,
                ...
            },
            flap: {
                trackId: timeInMilliseconds,
                ...
            },
        }
    }
}
*/

function writeToOutput(d) {
    if (d == null) return;
    let out = document.createElement("p");
    out.innerHTML = d;
    document.getElementById("output").append(out);
}

function resetOutput() {
    document.getElementById("output").innerHTML = "";
}

document.getElementById("startChecker").addEventListener("click", async function() {
    document.getElementById("startChecker").disabled = "disabled";
    resetOutput();
    for (let ppid in ctgpLinks) {
        let data;
        await fetch(`https://corsproxy.io/?https://www.mariokart64.com/mkw/profile.php?pid=${ppid}`).then(r=>r.text()).then(r=>{
            let profileDocument = new DOMParser().parseFromString(r, "text/html");
            let unrestrictedTimes = parseMKWPPTable(profileDocument.getElementsByClassName("c")[0]);
            for (let track in unrestrictedTimes.flap) if (track_category[track]) delete unrestrictedTimes.flap[track];
            for (let track in unrestrictedTimes["3lap"]) if (track_category[track]) delete unrestrictedTimes["3lap"][track];
            data = {
                unrestricted: unrestrictedTimes,
                normal: parseMKWPPTable(profileDocument.getElementsByClassName("k")[0])
            }

            for (let track in data.unrestricted["3lap"]) {
                if ((data.normal["3lap"][track] != undefined && data.normal["3lap"][track] != undefined) && data.unrestricted["3lap"][track].time === data.normal["3lap"][track].time) delete data.unrestricted["3lap"][track];
            }

            for (let track in data.unrestricted.flap) {
                if ((data.normal.flap[track] != undefined && data.normal.flap[track] != undefined) && data.unrestricted.flap[track].time === data.normal.flap[track].time) delete data.unrestricted.flap[track];
            }
        });
        let awaiting = [];
        for (let id of ctgpLinks[ppid]) {
            awaiting.push(fetch(`https://tt.chadsoft.co.uk/players/${id.slice(0,2)}/${id.slice(2)}.json`).then(r=>r.json()).then(r=>{
                for (let ghost of r.ghosts) {
                    if (ghost["200cc"]) continue;
                    let track = ctgpIdsToTrackNums[ghost.trackId];
                    if (track == null || track == undefined) continue;
                    if (ghost.categoryId == 3 || ghost.categoryId == 5) continue;
                    let category;
                    if (ghost.categoryId == null || ghost.categoryId == undefined || ghost.categoryId == 2 || ghost.categoryId == 0) {
                        category = "normal";
                    } else {
                        category = "unrestricted";
                    }
                    let bestSplit = timeToMsColons(ghost.bestSplitSimple);
                    let finishTime = timeToMsColons(ghost.finishTimeSimple);

                    if (data[category]["3lap"][track] != null && data[category]["3lap"][track] != undefined) {
                        if (data[category]["3lap"][track].time >= finishTime) {
                            delete data[category]["3lap"][track];
                        }
                    }

                    if (data[category].flap[track] != null && data[category].flap[track] != undefined) {
                        if (data[category].flap[track].time >= bestSplit) delete data[category].flap[track];
                    }
                }
            }));
        }

        for (let i of awaiting) await i;

        console.log(data);
        for (let category in data)
            for (let lapType in data[category])
                for (let track in data[category][lapType])
                        writeToOutput(`(${data[category][lapType][track].date}) Missing Time for ${players[ppid]}: ${track_names[track]} ${category} ${lapType} ${formatMsToTime(data[category][lapType][track].time)}`);
    }
    document.getElementById("startChecker").disabled = "";
});

function parseMKWPPTable(table) {
    let output = {"flap": {}, "3lap": {}};
    let tbody = table.children[0];
    for (let i = 1; i < 65; i++) {
        let cell = tbody.children[i].children[1];
        if (cell.innerHTML === "NT") continue;
        let dateCell = tbody.children[i].children[6 - (i % 2 == 0)];
        output[i % 2 == 0 ? "flap" : "3lap"][Math.floor((i-1)/2)] = {time: timeToMs(cell.children[0].innerHTML), date: dateCell.innerHTML};
    }
    return output;
}

async function writeObservedPlayers() {
    fetch("https://www.mariokart64.com/mkw/profile.php").then(r=>r.text()).then(r=>{
        let profileDocument = new DOMParser().parseFromString(r, "text/html");
        let playerList = profileDocument.getElementsByClassName("playerslist")[0].children[0];
        for (let row of playerList.children) {
            let starterData = row.children[0].children[0];
            if (row.children[0].innerHTML === "Name") continue;
            let ppid = starterData.href.split("=")[1];
            if (!Object.keys(ctgpLinks).includes(ppid)) continue;
            starterData.href = `https://www.mariokart64.com/mkw/profile.php?pid=${ppid}`;
            let out = document.createElement("p");
            out.appendChild(starterData);
            players[ppid] = starterData.innerHTML;
            document.getElementById("info").appendChild(out);
        }
        document.getElementById("startChecker").disabled = "";
    });
}
writeObservedPlayers();

function formatMsToTime(i32) {
    let mins = Math.trunc(i32 / 60000);
    i32 %= 60000;
    let sec = Math.trunc(i32 / 1000);
    i32 %= 1000;
    let ret = `${mins.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${Math.trunc(i32).toString().padStart(3, "0")}`;
    return ret;
}
function timeToMs(timeStr) {
    let split = timeStr.split("'");
    let mins = parseInt(split[0]);
    let split2 = split[1].split("\"");
    let secs = parseInt(split2[0]);
    let ms = parseInt(split2[1]);
    return mins * 60000 + secs * 1000 + ms
}
function timeToMsColons(timeStr) {
    let split = timeStr.split(":");
    let mins = parseInt(split[0]);
    let split2 = split[1].split(".");
    let secs = parseInt(split2[0]);
    let ms = parseInt(split2[1]);
    return mins * 60000 + secs * 1000 + ms
}