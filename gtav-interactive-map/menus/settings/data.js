function dataSettings() {
    resetContentPart2();
    let optionDiv = document.createElement("div");
    optionDiv.innerHTML = "Backup Data<p>Click Here</p>";

    optionDiv.addEventListener("click", function () {
        saveDataSave();
        var element = document.createElement("a");
        element.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," +
                encodeURIComponent(localStorage.getItem("saveData"))
        );
        element.setAttribute("download", "GTA5InteractiveMapData.json");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });

    contentPart2.append(optionDiv);

    let option2Div = document.createElement("div");
    option2Div.innerHTML = "Load Backup Data<p>Click Here</p>";

    option2Div.addEventListener("click", function () {
        var element = document.createElement("input");
        element.type = "File";
        element.accept = "application/json, text/plain";
        element.addEventListener("change", function (e) {
            let reader = new FileReader();
            reader.addEventListener("load", function (res) {
                console.log(res.target.result);
                loadInSaveData(res.target.result);
                saveDataSave();
                window.location.reload();
            });
            reader.readAsText(e.target.files[0]);
        });
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });

    contentPart2.append(option2Div);
}
