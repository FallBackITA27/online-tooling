let selectionData = {
    playerData: fetch(`../assets/falb.json`).then(r=>r.json()),
    category: "nosc",
};

document.getElementById("playerPicker").addEventListener("change", function(e) {
    selectionData.playerData = fetch(`../assets/${e.target.value}.json`).then(r=>r.json());
    updateDisplay();
});

document.getElementById("categoryPicker").addEventListener("change", function(e) {
    selectionData.category = e.target.value;
    updateDisplay();
});

async function updateDisplay() {
    await selectionData.playerData.then(r=>{
        for (let i = 0; i < 32; i++) {
            console.log(r);
            console.log(i.toString());
            console.log(selectionData.category);
            let data = r[i.toString()][selectionData.category];
            console.log(data);
        }
    });
}

function formatMsToTime(i32) {
    let mins = Math.trunc(i32 / 60000);
    i32 %= 60000;
    let sec = Math.trunc(i32 / 1000);
    i32 %= 1000;
    let ret = `${mins.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${Math.trunc(i32).toString().padStart(3, "0")}`;
    return ret;
}