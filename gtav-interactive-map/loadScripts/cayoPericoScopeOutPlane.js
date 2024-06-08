let cayoPericoScopeOutPlaneFetchData = new LayerFetchData(
    "cayoPericoScopeOutPlane"
);

function loadCayoPericoScopeOutPlane(r) {
    if (constantData.layers.cayoPericoScopeOutPlane !== undefined) return;
    constantData.layers.cayoPericoScopeOutPlane = [];

    registerSingleMarkerArray(
        "cayoPericoScopeOutPlane",
        constantData.layers.cayoPericoScopeOutPlane,
        saveData.markerData.cayoPericoScopeOutPlane,
        constantData.icons.plane,
        r,
        loadCayoPericoScopeOutPlaneGUI
    );
}

cayoPericoScopeOutPlaneFetchData.fetchThis(loadCayoPericoScopeOutPlane);

async function loadCayoPericoScopeOutPlaneGUI() {
    if (!cayoPericoScopeOutPlaneFetchData.loaded)
        await cayoPericoScopeOutPlaneFetchData.fetchThis(
            loadCayoPericoScopeOutPlane
        );
    resetContentParts();
    for (let layer of constantData.layers.cayoPericoScopeOutPlane) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs = new GenericHTMLConglomerate().genericMarkerOptions(
                    layer
                );

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
