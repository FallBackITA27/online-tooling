function loadCounties(r) {
    let lsCountyPolygon = L.polygon(r.ls.points, {
        color: r.ls.color,
    }).bindTooltip(r.ls.name, {
        permanent: true,
        direction: "center",
    });
    let blCountyPolygon = L.polygon(r.bl.points, {
        color: r.bl.color,
    }).bindTooltip(r.bl.name, {
        permanent: true,
        direction: "center",
    });

    if (saveData.blCountyShow) blCountyPolygon.addTo(map);
    if (saveData.lsCountyShow) lsCountyPolygon.addTo(map);

    document
        .getElementById("markers-locations-counties-blaine-show-btn")
        .addEventListener("click", function () {
            blCountyPolygon.addTo(map);
            saveData.blCountyShow = true;
            saveDataSave();
        });

    document
        .getElementById("markers-locations-counties-ls-show-btn")
        .addEventListener("click", function () {
            lsCountyPolygon.addTo(map);
            saveData.lsCountyShow = true;
            saveDataSave();
        });

    document
        .getElementById("markers-locations-counties-blaine-hide-btn")
        .addEventListener("click", function () {
            blCountyPolygon.remove();
            saveData.blCountyShow = false;
            saveDataSave();
        });

    document
        .getElementById("markers-locations-counties-ls-hide-btn")
        .addEventListener("click", function () {
            lsCountyPolygon.remove();
            saveData.lsCountyShow = false;
            saveDataSave();
        });

    document
        .getElementById("markers-locations-counties-show-btn")
        .addEventListener("click", function () {
            document
                .getElementById("markers-locations-counties-ls-show-btn")
                .click();
            document
                .getElementById("markers-locations-counties-blaine-show-btn")
                .click();
        });

    document
        .getElementById("markers-locations-counties-hide-btn")
        .addEventListener("click", function () {
            document
                .getElementById("markers-locations-counties-ls-hide-btn")
                .click();
            document
                .getElementById("markers-locations-counties-blaine-hide-btn")
                .click();
        });
}
