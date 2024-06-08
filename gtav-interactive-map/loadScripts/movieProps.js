let moviePropsFetchData = new LayerFetchData("movieProps");

function movieProps(r) {
    if (constantData.layers.movieProps !== undefined) return;
    constantData.layers.movieProps = [];

    registerSingleCollectibleMarkerArray(
        "movieProps",
        constantData.layers.movieProps,
        saveData.markerData.movieProps,
        constantData.icons.movieProp,
        r.singleMarker,
        moviePropsGUI
    );

    registerMultiCollectibleMarkerArray(
        "movieProps",
        constantData.layers.movieProps,
        saveData.markerData.movieProps,
        [
            [constantData.icons.moviePropTruckRebel, 2],
            [constantData.icons.moviePropTruckRumpo, 1],
            [constantData.icons.moviePropTruckPony, 0],
        ],
        r.multiMarker,
        moviePropsGUI
    );
}

moviePropsFetchData.fetchThis(movieProps);

async function moviePropsGUI() {
    if (!moviePropsFetchData.loaded)
        await moviePropsFetchData.fetchThis(movieProps);
    resetContentParts();
    for (let layer of constantData.layers.movieProps) {
        addToContentPart1List(layer.title).addEventListener(
            "click",
            function () {
                resetContentPart2();
                let divs =
                    layer.extraData.description instanceof Array
                        ? new GenericHTMLConglomerate().genericCollectibleMultiMarkerOptions(
                              layer,
                              constantData.layers.movieProps.length
                          )
                        : new GenericHTMLConglomerate().genericCollectibleMarkerOptions(
                              layer,
                              constantData.layers.movieProps.length
                          );

                for (let x of divs)
                    document.getElementById("contentPart2").appendChild(x);
            }
        );
    }
}
