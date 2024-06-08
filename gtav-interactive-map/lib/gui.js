class OptionDivFactory {
    constructor(heading, footer) {
        (this.heading = heading), (this.footer = footer);
    }

    createArrowless() {
        let x = document.createElement("div");
        x.innerHTML = `${this.heading}<p>${this.footer}</p>`;
        return x;
    }

    createArrowful() {
        let x = document.createElement("div");
        x.innerHTML = `${this.heading}`;

        let interactiveDiv = document.createElement("div");
        let img1 = document.createElement("img");
        img1.src = "./websiteIcons/small_arr_left.svg";
        interactiveDiv.appendChild(img1);

        interactiveDiv.innerHTML += `<p>${this.footer}</p>`;

        let img2 = document.createElement("img");
        img2.src = "./websiteIcons/small_arr_right.svg";
        interactiveDiv.appendChild(img2);

        interactiveDiv.style = "display: flex; align-items: center;";
        x.appendChild(interactiveDiv);

        return x;
    }

    createGenericZoomButton(layer, markerStatusParagraph, obj = 0) {
        let x = this.createArrowless();

        x.addEventListener("click", function () {
            if (!layer.isOnMap) {
                layer.addLayerToMap();
                markerStatusParagraph.innerHTML = saveDataLastPicktoString(
                    lastPickOpts[1]
                );
            }
            map.setView(layer.objects[obj].getLatLng(), 7);
        });

        return x;
    }

    createPolygonZoomButton(layer, markerStatusParagraph) {
        let x = this.createArrowless();

        x.addEventListener("click", function () {
            if (!layer.isOnMap) {
                layer.addLayerToMap();
                markerStatusParagraph.innerHTML = saveDataLastPicktoString(
                    lastPickOpts[1]
                );
            }
            map.fitBounds(layer.objects[0].getBounds());
        });

        return x;
    }
}

class GenericHTMLConglomerate {
    constructor() {}

    genericMarkerOptions(layer) {
        let markerOptions = new OptionDivFactory(
            "Marker Visibility",
            ""
        ).createArrowful();
        markerOptions.children[0].children[1].innerHTML =
            saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);
        markerOptions.addEventListener("click", function () {
            if (layer.isOnMap) {
                layer.removeLayerFromMap();
            } else {
                layer.addLayerToMap();
            }
            markerOptions.children[0].children[1].innerHTML =
                saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);
        });

        let categoryOptions = new OptionDivFactory(
            "Category Visibility",
            ""
        ).createArrowful();
        categoryOptions.children[0].children[1].innerHTML =
            saveDataLastPicktoString(layer.markerData.pick);
        categoryOptions.addEventListener("click", function () {
            let idx = lastPickOpts.indexOf(layer.markerData.pick) + 1;
            if (idx === lastPickOpts.length) idx = 0;
            layer.markerData.pick = lastPickOpts[idx];
            saveDataSave();
            markerOptions.children[0].children[1].innerHTML =
                categoryOptions.children[0].children[1].innerHTML =
                    saveDataLastPicktoString(layer.markerData.pick);
            if (layer.markerData.pick === "hideAll") {
                layer.constantData.forEach((r) => r.removeLayerFromMap());
            } else if (layer.markerData.pick === "showAll") {
                layer.constantData.forEach((r) => r.addLayerToMap());
            }
        });

        return [
            categoryOptions,
            markerOptions,
            new OptionDivFactory(
                "Zoom to Marker",
                "Click Here"
            ).createGenericZoomButton(
                layer,
                markerOptions.children[0].children[1]
            ),
        ];
    }

    genericCollectibleMarkerOptions(layer, collectibleNum) {
        let descriptionDiv = document.createElement("div");
        let img = document.createElement("img");
        img.alt = "No image here? Submit one yourself on Github.";
        img.src = `./imgs/${layer.key}/${layer.numericId}.jpg`;
        img.classList.add("prevImage");
        let descriptionParagraph = document.createElement("p");
        descriptionParagraph.style = "margin:10px;";
        descriptionParagraph.innerHTML = layer.extraData.description;
        descriptionDiv.appendChild(img);
        descriptionDiv.appendChild(descriptionParagraph);
        descriptionDiv.style =
            "cursor:default;flex-direction:column;max-height:unset;margin-bottom:7px;";

        let videoDiv = new OptionDivFactory(
            "View Video",
            "Click Here"
        ).createArrowless();
        videoDiv.addEventListener("click", function () {
            player.loadVideoById({
                videoId: layer.extraData.video_id,
                startSeconds: layer.extraData.video_timestamp,
            });
            document.getElementById("videoplayer").classList.add("s");
        });

        let categoryCollected = new OptionDivFactory(
            "Collectibles Collected",
            `${layer.markerData.set.size}/${collectibleNum}`
        ).createArrowless();
        categoryCollected.style = "cursor:default;";

        let markerVisibility = new OptionDivFactory(
            "Collectible Visibility",
            ""
        ).createArrowful();

        let markerCollected = new OptionDivFactory(
            "Collected?",
            layer.markerData.set.has(layer.numericId) ? "True" : "False"
        ).createArrowful();
        markerCollected.addEventListener("click", function () {
            if (layer.markerData.set.has(layer.numericId)) {
                layer.markerData.set.delete(layer.numericId);
                if (layer.isOnMap) layer.removeCompletedClass();
                if (layer.markerData.pick === "showCompleted") {
                    layer.removeLayerFromMap();
                } else if (layer.markerData.pick === "hideCompleted")
                    layer.addLayerToMap();
            } else {
                layer.markerData.set.add(layer.numericId);
                if (layer.isOnMap) layer.addCompletedClass();
                if (layer.markerData.pick === "hideCompleted") {
                    layer.removeLayerFromMap();
                } else if (layer.markerData.pick === "showCompleted")
                    layer.addLayerToMap();
            }
            saveDataSave();
            markerVisibility.children[0].children[1].innerHTML =
                saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);
            markerCollected.children[0].children[1].innerHTML =
                layer.markerData.set.has(layer.numericId) ? "True" : "False";
            categoryCollected.children[0].innerHTML = `${layer.markerData.set.size}/${collectibleNum}`;
        });

        let categoryVisibility = new OptionDivFactory(
            "Category Visibility",
            ""
        ).createArrowful();
        markerVisibility.children[0].children[1].innerHTML =
            saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);

        categoryVisibility.children[0].children[1].innerHTML =
            saveDataLastPicktoString(layer.markerData.pick);

        categoryVisibility.addEventListener("click", function () {
            let idx =
                lastPickCollectibleOpts.indexOf(layer.markerData.pick) + 1;
            if (idx === lastPickCollectibleOpts.length) idx = 0;
            layer.markerData.pick = lastPickCollectibleOpts[idx];
            saveDataSave();
            categoryVisibility.children[0].children[1].innerHTML =
                saveDataLastPicktoString(layer.markerData.pick);
            if (layer.markerData.pick === "hideAll") {
                layer.constantData.forEach((r) => r.removeLayerFromMap());
            } else if (layer.markerData.pick === "showAll") {
                layer.constantData.forEach((r) => r.addLayerToMap());
            } else if (layer.markerData.pick === "hideCompleted") {
                for (let r of layer.constantData) {
                    if (layer.markerData.set.has(r.numericId) && r.isOnMap) {
                        r.removeLayerFromMap();
                    } else if (
                        !layer.markerData.set.has(r.numericId) &&
                        !r.isOnMap
                    )
                        r.addLayerToMap();
                }
            } else if (layer.markerData.pick === "showCompleted") {
                for (let r of layer.constantData) {
                    if (layer.markerData.set.has(r.numericId) && !r.isOnMap) {
                        r.addLayerToMap();
                    } else if (
                        !layer.markerData.set.has(r.numericId) &&
                        r.isOnMap
                    )
                        r.removeLayerFromMap();
                }
            }

            markerVisibility.children[0].children[1].innerHTML =
                saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);
        });

        markerVisibility.addEventListener("click", function () {
            if (layer.isOnMap) {
                layer.removeLayerFromMap();
            } else {
                layer.addLayerToMap();
            }
            markerVisibility.children[0].children[1].innerHTML =
                saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);
        });

        return [
            descriptionDiv,
            videoDiv,
            categoryCollected,
            categoryVisibility,
            markerCollected,
            markerVisibility,
            new OptionDivFactory(
                "Zoom to Collectible",
                "Click Here"
            ).createGenericZoomButton(
                layer,
                markerVisibility.children[0].children[1]
            ),
        ];
    }

    genericCollectibleMultiMarkerOptions(layer, collectibleNum) {
        layer.extraData.currentlySelected = 0;
        let descriptionDiv = document.createElement("div");
        descriptionDiv.innerHTML =
            layer.extraData.description[layer.extraData.currentlySelected];
        descriptionDiv.style =
            "cursor:default;margin-bottom:7px;justify-content:center;";

        let selectedLocationDiv = new OptionDivFactory(
            "Selected Location",
            "1"
        ).createArrowful();
        selectedLocationDiv.addEventListener("click", function () {
            layer.extraData.currentlySelected++;
            if (layer.extraData.currentlySelected === layer.objects.length)
                layer.extraData.currentlySelected = 0;
            selectedLocationDiv.children[0].children[1].innerHTML =
                layer.extraData.currentlySelected + 1;
            descriptionDiv.innerHTML =
                layer.extraData.description[layer.extraData.currentlySelected];
        });

        let videoDiv = new OptionDivFactory(
            "View Video",
            "Click Here"
        ).createArrowless();
        videoDiv.addEventListener("click", function () {
            player.loadVideoById({
                videoId:
                    layer.extraData.video_id[layer.extraData.currentlySelected],
                startSeconds:
                    layer.extraData.video_timestamp[
                        layer.extraData.currentlySelected
                    ],
            });
            document.getElementById("videoplayer").classList.add("s");
        });

        let categoryCollected = new OptionDivFactory(
            "Collectibles Collected",
            `${layer.markerData.set.size}/${collectibleNum}`
        ).createArrowless();
        categoryCollected.style = "cursor:default;";

        let markerVisibility = new OptionDivFactory(
            "Collectible Visibility",
            ""
        ).createArrowful();

        let markerCollected = new OptionDivFactory(
            "Collected?",
            layer.markerData.set.has(layer.numericId) ? "True" : "False"
        ).createArrowful();
        markerCollected.addEventListener("click", function () {
            if (layer.markerData.set.has(layer.numericId)) {
                layer.markerData.set.delete(layer.numericId);
                if (layer.isOnMap) layer.removeCompletedClass();
                if (layer.markerData.pick === "showCompleted") {
                    layer.removeLayerFromMap();
                } else if (layer.markerData.pick === "hideCompleted")
                    layer.addLayerToMap();
            } else {
                layer.markerData.set.add(layer.numericId);
                if (layer.isOnMap) layer.addCompletedClass();
                if (layer.markerData.pick === "hideCompleted") {
                    layer.removeLayerFromMap();
                } else if (layer.markerData.pick === "showCompleted")
                    layer.addLayerToMap();
            }
            saveDataSave();
            markerVisibility.children[0].children[1].innerHTML =
                saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);
            markerCollected.children[0].children[1].innerHTML =
                layer.markerData.set.has(layer.numericId) ? "True" : "False";
            categoryCollected.children[0].innerHTML = `${layer.markerData.set.size}/${collectibleNum}`;
        });

        let categoryVisibility = new OptionDivFactory(
            "Category Visibility",
            ""
        ).createArrowful();
        markerVisibility.children[0].children[1].innerHTML =
            saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);

        categoryVisibility.children[0].children[1].innerHTML =
            saveDataLastPicktoString(layer.markerData.pick);

        categoryVisibility.addEventListener("click", function () {
            let idx =
                lastPickCollectibleOpts.indexOf(layer.markerData.pick) + 1;
            if (idx === lastPickCollectibleOpts.length) idx = 0;
            layer.markerData.pick = lastPickCollectibleOpts[idx];
            saveDataSave();
            categoryVisibility.children[0].children[1].innerHTML =
                saveDataLastPicktoString(layer.markerData.pick);
            if (layer.markerData.pick === "hideAll") {
                layer.constantData.forEach((r) => r.removeLayerFromMap());
            } else if (layer.markerData.pick === "showAll") {
                layer.constantData.forEach((r) => r.addLayerToMap());
            } else if (layer.markerData.pick === "hideCompleted") {
                for (let r of layer.constantData) {
                    if (layer.markerData.set.has(r.numericId) && r.isOnMap) {
                        r.removeLayerFromMap();
                    } else if (
                        !layer.markerData.set.has(r.numericId) &&
                        !r.isOnMap
                    )
                        r.addLayerToMap();
                }
            } else if (layer.markerData.pick === "showCompleted") {
                for (let r of layer.constantData) {
                    if (layer.markerData.set.has(r.numericId) && !r.isOnMap) {
                        r.addLayerToMap();
                    } else if (
                        !layer.markerData.set.has(r.numericId) &&
                        r.isOnMap
                    )
                        r.removeLayerFromMap();
                }
            }

            markerVisibility.children[0].children[1].innerHTML =
                saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);
        });

        markerVisibility.addEventListener("click", function () {
            if (layer.isOnMap) {
                layer.removeLayerFromMap();
            } else {
                layer.addLayerToMap();
            }
            markerVisibility.children[0].children[1].innerHTML =
                saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);
        });

        let customZoomButton = new OptionDivFactory(
            "Zoom to Collectible",
            "Click Here"
        ).createArrowless();
        customZoomButton.addEventListener("click", function () {
            if (!layer.isOnMap) {
                layer.addLayerToMap();
                markerStatusParagraph.innerHTML = saveDataLastPicktoString(
                    lastPickOpts[1]
                );
            }
            map.setView(layer.objects[layer.extraData.currentlySelected].getLatLng(), 7);
        });
        return [
            selectedLocationDiv,
            descriptionDiv,
            videoDiv,
            categoryCollected,
            categoryVisibility,
            markerCollected,
            markerVisibility,
            customZoomButton
        ];
    }

    genericPolygonOptions(layer) {
        let markerOptions = new OptionDivFactory(
            "Polygon Visibility",
            ""
        ).createArrowful();
        let categoryOptions = new OptionDivFactory(
            "Category Visibility",
            ""
        ).createArrowful();
        markerOptions.children[0].children[1].innerHTML =
            saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);

        categoryOptions.children[0].children[1].innerHTML =
            saveDataLastPicktoString(layer.markerData.pick);

        categoryOptions.addEventListener("click", function () {
            let idx = lastPickOpts.indexOf(layer.markerData.pick) + 1;
            if (idx === lastPickOpts.length) idx = 0;
            layer.markerData.pick = lastPickOpts[idx];
            saveDataSave();
            markerOptions.children[0].children[1].innerHTML =
                categoryOptions.children[0].children[1].innerHTML =
                    saveDataLastPicktoString(layer.markerData.pick);
            if (layer.markerData.pick === "hideAll") {
                layer.constantData.forEach((r) => r.removeLayerFromMap());
            } else if (layer.markerData.pick === "showAll") {
                layer.constantData.forEach((r) => r.addLayerToMap());
            }
        });

        markerOptions.addEventListener("click", function () {
            if (layer.isOnMap) {
                layer.removeLayerFromMap();
            } else {
                layer.addLayerToMap();
            }
            markerOptions.children[0].children[1].innerHTML =
                saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);
        });

        return [
            categoryOptions,
            markerOptions,
            new OptionDivFactory(
                "Zoom to Polygon",
                "Click Here"
            ).createPolygonZoomButton(
                layer,
                markerOptions.children[0].children[1]
            ),
        ];
    }

    genericLineOptions(layer) {
        let markerOptions = new OptionDivFactory(
            "Line Visibility",
            ""
        ).createArrowful();
        let categoryOptions = new OptionDivFactory(
            "Category Visibility",
            ""
        ).createArrowful();
        markerOptions.children[0].children[1].innerHTML =
            saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);

        categoryOptions.children[0].children[1].innerHTML =
            saveDataLastPicktoString(layer.markerData.pick);

        categoryOptions.addEventListener("click", function () {
            let idx = lastPickOpts.indexOf(layer.markerData.pick) + 1;
            if (idx === lastPickOpts.length) idx = 0;
            layer.markerData.pick = lastPickOpts[idx];
            saveDataSave();
            markerOptions.children[0].children[1].innerHTML =
                categoryOptions.children[0].children[1].innerHTML =
                    saveDataLastPicktoString(layer.markerData.pick);
            if (layer.markerData.pick === "hideAll") {
                layer.constantData.forEach((r) => r.removeLayerFromMap());
            } else if (layer.markerData.pick === "showAll") {
                layer.constantData.forEach((r) => r.addLayerToMap());
            }
        });

        markerOptions.addEventListener("click", function () {
            if (layer.isOnMap) {
                layer.removeLayerFromMap();
            } else {
                layer.addLayerToMap();
            }
            markerOptions.children[0].children[1].innerHTML =
                saveDataLastPicktoString(lastPickOpts[layer.isOnMap ? 1 : 0]);
        });

        return [
            categoryOptions,
            markerOptions,
            new OptionDivFactory(
                "Zoom to Line",
                "Click Here"
            ).createPolygonZoomButton(
                layer,
                markerOptions.children[0].children[1]
            ),
        ];
    }
}

function saveDataLastPicktoString(v) {
    if (v === "showAll") {
        return "Show All";
    } else if (v === "hideAll") {
        return "Hide All";
    } else if (v === "showCompleted") {
        return "Show Completed";
    } else if (v === "hideCompleted") {
        return "Hide Completed";
    }
}

function addToContentPart1List(title) {
    let element = document.createElement("button");
    element.classList.add("menuScrollElement");
    element.innerHTML = title;
    contentPart1.appendChild(element);
    element.addEventListener("click", function (z) {
        Array.from(document.getElementsByClassName("sel")).forEach((a) =>
            a.classList.remove("sel")
        );
        z.target.classList.add("sel");
    });
    return element;
}

function resetContentParts() {
    resetContentPart1();
    resetContentPart2();
}

function resetContentPart1() {
    let contentPart1 = document.getElementById("contentPart1");
    let childrenClone = [...contentPart1.children];
    for (let child of childrenClone) {
        child.classList.remove("sel");
        contentPart1.removeChild(child);
    }
}

function resetContentPart2() {
    let contentPart2 = document.getElementById("contentPart2");
    let childrenClone = [...contentPart2.children];
    for (let child of childrenClone) {
        contentPart2.removeChild(child);
    }
}
