document.getElementById("playerPicker").addEventListener("change", function(e) {
    fetch(`../assets/${e.target.value}.json`).then(r=>r.json()).then(r=>{
        console.log(r);
    });
});