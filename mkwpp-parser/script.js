let data = {};

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
    let parserData = document.getElementById("inputTextArea").value;
    console.log(parserData);
});