let data = {
    submissions: [],
};

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
    for (let line of parserData) {
        let keywords = line.toLowerCase().split(" ").filter(r=>r !== "");
        console.log(keywords);
        if (keywords[0].contains("name")) {
            if (!currentSubmission.skip) data.submissions.push(currentSubmission);
            currentSubmission = {
                name: keywords.slice(1,keywords.length).join(" "),
                date: "",
                flapCatch: false,
                noscCatch: false,
            };
            console.log(currentSubmission);
        }
    }
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