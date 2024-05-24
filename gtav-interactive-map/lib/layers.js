Array.prototype.pushMapLayer = function(em, idx) {
    if (this[idx] == undefined) {
        if (em instanceof Array) {
            this[idx] = em;
        } else {
            this[idx] = [em];
        }
    } else {
        if (em instanceof Array) {
            this[idx].push(...em);
        } else {
            this[idx].push(em);
        }
    }
}

Array.prototype.addLayerToMap = function() {
    for (let element of this) element.addTo(map);
}