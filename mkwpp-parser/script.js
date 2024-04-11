let data = {
    submissions: [],
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

document.addEventListener("DOMContentLoaded", async function() {
    fetch("https://www.mariokart64.com/mkw/profile.php").then(r=>r.text()).then(r=>{
        let profileDocument = new DOMParser().parseFromString(r);
        let playerList = profileDocument.getElementsByClassName("playerslist")[0]
        console.log(playerList);
    });
});

document.getElementById("readInput").addEventListener("click", async function() {
    let parserData = document.getElementById("inputTextArea").value.split("\n").filter(r=>r !== "");
    let currentSubmission = {skip:true};
    let skipToNextSubmission = false;
    for (let line of parserData) {
        let keywords = line.toLowerCase().split(" ").filter(r=>r !== "");
        console.log(keywords);
        if (keywords[0].startsWith("name")) {
            skipToNextSubmission = false
            data.submissions.push(currentSubmission);
            currentSubmission = {
                name: keywords.slice(1,keywords.length).join(" "),
                date: "",
                flapCatch: false,
                noscCatch: false,
            };
            console.log(currentSubmission);
        } else if (keywords[0].startsWith("date")) {
            let year;
            let month;
            let date;
            if (keywords.length > 4) {
                skipToNextSubmission = true;
                currentSubmission.skip = true;
            };
            for (let keyword of keywords.slice(1, keywords.length)) {
                let kw = keyword.replace(/,/g, "");
                if (kw.length === 4) {
                    year = kw;
                    continue;
                }
                let _break = false;
                for (let abbr in constants.months.keys()) if (kw.startsWith(abbr)) {
                    month = constants.months[abbr];
                    _break = true;
                    break;
                }
                if (_break) continue;
                let kwfiltered = kw.replace(/nth/g, "").replace(/rd/g, "").replace(/nd/g, "").replace(/st/g, "");
                date = kwfiltered.padStart(2,"0")
            };
            currentSubmission.date = `${year}-${month}-${date}`;
        }

        if (skipToNextSubmission) continue;
    }
    data.submissions.push(currentSubmission);
});

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

*/