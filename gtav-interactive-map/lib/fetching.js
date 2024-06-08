class LayerFetchData {
    constructor(key) {
        this.url = `./assets/mapData/${key}.json`,
        this.loading = false,
        this.loaded = false,
        this.constantDataKey = key
    }

    async fetchThis(callbackFunc) {
        if (this.loading || this.loaded) return;
        this.loading = true;
        fetch(this.url).then(r=>r.json()).then(callbackFunc).then(r=>constantData.layers[this.key] = r);
        this.loaded = true;
    }
}