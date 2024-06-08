class MapLayer {
    constructor(key, title, numericId, markerData, constantData, extraData) {
        this.key = key;
        this.title = title;
        this.numericId = numericId;
        this.objects = [];
        this.isOnMap = false;
        this.markerData = markerData;
        this.constantData = constantData;
        this.extraData = extraData
    }

    addLayerToMap() {
        this.isOnMap = true;
        for (let obj of this.objects) {
            obj.addTo(map);
            if (
                this.markerData.set != undefined &&
                this.markerData.set.has(this.numericId)
            )
                obj._icon.classList.add("completed");
        }
    }

    removeLayerFromMap() {
        this.isOnMap = false;
        for (let obj of this.objects) obj.remove();
    }

    addCompletedClass() {
        if (this.isOnMap)
            for (let obj of this.objects) obj._icon.classList.add("completed");
    }

    removeCompletedClass() {
        if (this.isOnMap)
            for (let obj of this.objects)
                obj._icon.classList.remove("completed");
    }

    push(x) {
        this.objects.push(x);
    }
}
