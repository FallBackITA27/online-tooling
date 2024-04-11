function writeToOutput(d) {
    if (d == null) return;
    let out = document.createElement("p");
    out.innerHTML = d;
    document.getElementById("output").append(out);
}

function resetOutput() {
    document.getElementById("output").innerHTML = "";
}