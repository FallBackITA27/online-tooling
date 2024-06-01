function formatMsToTime(i32) {
    let mins = Math.trunc(i32 / 60000);
    i32 %= 60000;
    let sec = Math.trunc(i32 / 1000);
    i32 %= 1000;
    let ret = `${mins.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${Math.trunc(i32).toString().padStart(3, "0")}`;
    return ret;
}

function timeToMs(timeStr) {
    let split = timeStr.split("'");
    let mins = parseInt(split[0]);
    let split2 = split[1].split("\"");
    let secs = parseInt(split2[0]);
    let ms = parseInt(split2[1]);
    return mins * 60000 + secs * 1000 + ms
}

function timeToMsColons(timeStr) {
    let split = timeStr.split(":");
    let mins = parseInt(split[0]);
    let split2 = split[1].split(".");
    let secs = parseInt(split2[0]);
    let ms = parseInt(split2[1]);
    return mins * 60000 + secs * 1000 + ms
}

function sumTimesColon(timeArray) {
    return formatMsToTime(timeArray.reduce((a,b)=>a+timeToMsColons(b),0));
}

function timeDiffColon(time1, time2) {
    return formatMsToTime(timeToMsColons(time2)-timeToMsColons(time1));
}