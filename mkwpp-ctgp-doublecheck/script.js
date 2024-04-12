const ctgpLinks = {
    1662: ["1F7B7D3331A3A008"], // FalB
    1597: ["1C6A832CF6B30CFF"], // Electrick
    1772: ["858060403046B78E"], // EliDiscord
    1556: ["9ED97E25E8149323"], // Cederic
    1441: ["A50190B9301E0C7A"], // ArthurOww
    1520: ["5F22F87EE4FFFD80","8B2AA1EB59B08E78","BBD2EC73FF52D568"], // Danny Boy
    1497: ["BA0BD8BF709C1E35"], // Ragemodepigeon
}

let data = {};

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
    for (let ppid in ctgpLinks) {
        let chadsoftTimeSheet = {};
        let mkwppTimesheetRequest = fetch(`https://corsproxy.io/?https://www.mariokart64.com/mkw/profile.php?pid=${ppid}`).then(r=>r.text()).then(r=>{
            let profileDocument = new DOMParser().parseFromString(r, "text/html");
            data[ppid] = {
                unrestricted: parseMKWPPTable(profileDocument.getElementsByClassName("c")[0]),
                normal: parseMKWPPTable(profileDocument.getElementsByClassName("k")[0])
            }
        });
        for (let id of ctgpLinks[ppid]) {
            
        }
        await mkwppTimesheetRequest;
    }
    document.getElementById("startChecker").disabled = "";
});

function parseMKWPPTable(table) {
    let output = {};
    let tbody = table.children[0];
    for (let i = 1; i < 65; i++) {
        console.log(i);
        let cell = tbody.children[i].children[1];
        console.log(cell);
        if (cell.innerHTML === "NT") continue;
        console.log(timeToMs(cell.children[0].innerHTML));
        output[i % 2 == 0 ? "flap" : "3lap"] = {};
        output[i % 2 == 0 ? "flap" : "3lap"][Math.floor((i-1)/2)] = timeToMs(cell.children[0].innerHTML);
    }
    return output;
}

async function parseTimesheetCTGP(link) {
    
}

async function writeObservedPlayers() {
    fetch("https://corsproxy.io/?https://www.mariokart64.com/mkw/profile.php").then(r=>r.text()).then(r=>{
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