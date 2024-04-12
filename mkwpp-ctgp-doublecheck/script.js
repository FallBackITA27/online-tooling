const ctgpLinks = {
    1662: ["1F7B7D3331A3A008"], // FalB
    1597: ["1C6A832CF6B30CFF"], // Electrick
    1772: ["858060403046B78E"], // EliDiscord
    1556: ["9ED97E25E8149323"], // Cederic
    1441: ["A50190B9301E0C7A"], // ArthurOww
    1520: ["5F22F87EE4FFFD80","8B2AA1EB59B08E78","BBD2EC73FF52D568"], // Danny Boy
    1497: ["BA0BD8BF709C1E35"], // Ragemodepigeon
}

/*
This is a timesheet
{
    playerPPID: {
        Normal: {
            3lap: {
                trackId: {
                    time: timeInMilliseconds
                }
                ...
            },
            flap: {
                trackId: {
                    time: timeInMilliseconds
                }
                ...
            },
        },
        Unrestricted: {
            3lap: {
                trackId: {
                    time: timeInMilliseconds
                }
                ...
            },
            flap: {
                trackId: {
                    time: timeInMilliseconds
                }
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
    for (let ppid in ctgpLinks) {
        let chadsoftTimeSheet = {};
        let mkwppTimesheetRequest = parseTimesheetMKWPP(`https://corsproxy.io/?https://www.mariokart64.com/mkw/profile.php?pid=${i}`);

        let mkwppTimesheet = await mkwppTimesheetRequest;
    }
});

async function parseTimesheetMKWPP(link) {

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
            starterData.href = `https://www.mariokart64.com/mkw/profile=${ppid}`;
            let out = document.createElement("p");
            out.appendChild(starterData);
            document.getElementById("info").appendChild(out);
        }
        document.getElementById("startChecker").disabled = "";
    });
}
writeObservedPlayers();