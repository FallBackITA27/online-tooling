function dataSettings() {
    resetContentPart2();
    let backupDataBtn = new OptionDivFactory(
        "Backup Data",
        "Click Here"
    ).createArrowless();
    contentPart2.append(backupDataBtn);

    backupDataBtn.addEventListener("click", function () {
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

    let loadBackupDataBtn = new OptionDivFactory(
        "Load Backup Data",
        "Click Here"
    ).createArrowless();
    contentPart2.append(loadBackupDataBtn);

    loadBackupDataBtn.addEventListener("click", function () {
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
}
