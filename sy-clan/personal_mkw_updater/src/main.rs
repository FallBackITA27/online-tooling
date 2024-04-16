const ONLY_UNR: [i32; 10] = [0, 2, 12, 16, 24, 26, 34, 38, 44, 56];

pub fn time_to_ms(time: String) -> i32 {
    let mut colon_str_split = time.split(':');
    let mins_str = colon_str_split.next();
    if mins_str.is_none() {
        return -1;
    }
    let seconds_and_ms_str = colon_str_split.last();
    if seconds_and_ms_str.is_none() {
        return -1;
    }
    let mut dot_split = seconds_and_ms_str.unwrap().split('.');
    let sec_str = dot_split.next();
    if sec_str.is_none() {
        return -1;
    }
    let ms_str = dot_split.last();
    if ms_str.is_none() {
        return -1;
    }
    let mins: u32 = mins_str.unwrap().parse().unwrap();
    let sec: u32 = sec_str.unwrap().parse().unwrap();
    let ms: u32 = ms_str.unwrap().parse().unwrap();
    return (mins * 60000 + sec * 1000 + ms).try_into().unwrap();
}

pub fn ms_to_time(mut ms: i32) -> String {
    let mins = ms / 60000;
    ms %= 60000;
    let sec = ms / 1000;
    ms %= 1000;
    return format!("{:02}:{:02}.{:03}", mins, sec, ms);
}

use phf::phf_set;
use std::io::Write;

const FALB_CHADSOFT: [&str; 1] =
    ["https://tt.chadsoft.co.uk/players/1F/7B7D3331A3A008.json?times=pb"];
const ARTHUR_CHADSOFT: [&str; 1] =
    ["https://tt.chadsoft.co.uk/players/A5/0190B9301E0C7A.json?times=pb"];
const CEDERIC_CHADSOFT: [&str; 1] =
    ["https://tt.chadsoft.co.uk/players/9E/D97E25E8149323.json?times=pb"];
const LOWERCASELETTERS_CHADSOFT: [&str; 1] =
    ["https://tt.chadsoft.co.uk/players/6A/FF24C4CFA23817.json?times=pb"];
const BROOKE_CHADSOFT: [&str; 2] = [
    "https://tt.chadsoft.co.uk/players/61/101EC38298F2A9.json?times=pb",
    "https://tt.chadsoft.co.uk/players/97/9EC358D2E93FF6.json?times=pb",

];
const DANNYBOY_CHADSOFT: [&str; 3] = [
    "https://tt.chadsoft.co.uk/players/5F/22F87EE4FFFD80.json?times=pb",
    "https://tt.chadsoft.co.uk/players/8B/2AA1EB59B08E78.json?times=pb",
    "https://tt.chadsoft.co.uk/players/BB/D2EC73FF52D568.json?times=pb",
];
const RAGEMODEPIGEON_CHADSOFT: [&str; 1] =
    ["https://tt.chadsoft.co.uk/players/BA/0BD8BF709C1E35.json?times=pb"];
const ELECTRICK_CHADSOFT: [&str; 1] =
    ["https://tt.chadsoft.co.uk/players/1C/6A832CF6B30CFF.json?times=pb"];
const ELI_CHADSOFT: [&str; 1] =
    ["https://tt.chadsoft.co.uk/players/85/8060403046B78E.json?times=pb"];

static ALLOWED_TRACKNAMES: phf::Set<&'static str> = phf_set!(
    "Luigi Circuit",
    "Moo Moo Meadows",
    "Mushroom Gorge",
    "Toad's Factory",
    "Mario Circuit",
    "Coconut Mall",
    "DK Summit",
    "Wario's Gold Mine",
    "Daisy Circuit",
    "Koopa Cape",
    "Maple Treeway",
    "Grumble Volcano",
    "Dry Dry Ruins",
    "Moonview Highway",
    "Bowser's Castle",
    "Rainbow Road",
    "GCN Peach Beach",
    "DS Yoshi Falls",
    "SNES Ghost Valley 2",
    "N64 Mario Raceway",
    "N64 Sherbet Land",
    "GBA Shy Guy Beach",
    "DS Delfino Square",
    "GCN Waluigi Stadium",
    "DS Desert Hills",
    "GBA Bowser Castle 3",
    "N64 DK's Jungle Parkway",
    "GCN Mario Circuit",
    "SNES Mario Circuit 3",
    "DS Peach Gardens",
    "GCN DK Mountain",
    "N64 Bowser's Castle"
);

static CSV_HEADERS: [&str; 32] = [
    "Luigi Circuit",
    "Moo Moo Meadows",
    "Mushroom Gorge",
    "Toad's Factory",
    "Mario Circuit",
    "Coconut Mall",
    "DK Summit",
    "Wario's Gold Mine",
    "Daisy Circuit",
    "Koopa Cape",
    "Maple Treeway",
    "Grumble Volcano",
    "Dry Dry Ruins",
    "Moonview Highway",
    "Bowser's Castle",
    "Rainbow Road",
    "GCN Peach Beach",
    "DS Yoshi Falls",
    "SNES Ghost Valley 2",
    "N64 Mario Raceway",
    "N64 Sherbet Land",
    "GBA Shy Guy Beach",
    "DS Delfino Square",
    "GCN Waluigi Stadium",
    "DS Desert Hills",
    "GBA Bowser Castle 3",
    "N64 DK's Jungle Parkway",
    "GCN Mario Circuit",
    "SNES Mario Circuit 3",
    "DS Peach Gardens",
    "GCN DK Mountain",
    "N64 Bowser's Castle",
];

macro_rules! user {
    ($arr: ident, $path: literal) => {
        let mut timesheet = Timesheet::new();
        let path = format!("../assets/{}.json",$path);
        for url in $arr {
            grab_pbs_from_chadsoft(url, &mut timesheet).await;
        }
        timesheet_cleanup(&mut timesheet);
        let mut file = std::fs::File::create(path).unwrap();
        file.write(ts_to_json(&timesheet).await.as_bytes()).unwrap();
    };
}

#[tokio::main]
async fn main() {
    println!("Running");
    if !std::path::Path::new("../assets").is_dir() {
        std::fs::create_dir("../assets").unwrap();
    }
    println!("Started Brooke");
    user!(BROOKE_CHADSOFT, "brooke");
    println!("Started ElecTrick");
    user!(ELECTRICK_CHADSOFT, "electrick");
    println!("Started FalB");
    user!(FALB_CHADSOFT, "falb");
    println!("Started Arthur");
    user!(ARTHUR_CHADSOFT, "arthur");
    println!("Started Cederic");
    user!(CEDERIC_CHADSOFT, "cederic");
    println!("Started LCL");
    user!(LOWERCASELETTERS_CHADSOFT, "lowercaseletters");
    println!("Started Danny");
    user!(DANNYBOY_CHADSOFT, "dannyboy");
    println!("Started Ragemodepigeon");
    user!(RAGEMODEPIGEON_CHADSOFT, "ragemodepigeon");
    println!("Started Eli");
    user!(ELI_CHADSOFT, "eli");
    println!("Ended");
}
#[derive(serde::Serialize, serde::Deserialize, Clone)]
struct Time {
    time: i32,
    date: String,
}

#[derive(serde::Serialize, serde::Deserialize, Clone)]
struct Timesheet {
    normal: std::collections::HashMap<String, Time>,
    glitch: std::collections::HashMap<String, Time>,
}

impl Timesheet {
    fn new() -> Self {
        Self {
            normal: std::collections::HashMap::new(),
            glitch: std::collections::HashMap::new(),
        }
    }
}
#[derive(serde::Serialize, serde::Deserialize)]
struct ChadsoftPlayerPageJSON {
    ghosts: Vec<ChadsoftPlayerPageGhostJSON>,
}

#[derive(serde::Serialize, serde::Deserialize)]
#[allow(non_snake_case)]
struct ChadsoftPlayerPageGhostJSON {
    #[serde(alias = "200cc")]
    cc: bool,
    #[serde(default)]
    categoryId: u8,
    trackName: Option<String>,
    finishTimeSimple: String,
    dateSet: String,
}

async fn grab_pbs_from_chadsoft(url: &str, player_ts: &mut Timesheet) {
    let times: ChadsoftPlayerPageJSON =
        serde_json::from_str(&reqwest::get(url).await.unwrap().text().await.unwrap()).unwrap();
    for time in times.ghosts {
        if time.cc
            || time.trackName.is_none()
            || !ALLOWED_TRACKNAMES.contains(time.trackName.clone().unwrap().as_str())
        {
            continue;
        }
        let is_unr = time.categoryId != 2 && time.categoryId != 0;

        let cmp_track = if is_unr {
            player_ts
                .glitch
                .get(time.trackName.clone().unwrap().as_str())
        } else {
            player_ts
                .normal
                .get(time.trackName.clone().unwrap().as_str())
        };

        let i32_time = time_to_ms(time.finishTimeSimple);

        if cmp_track.is_none() || cmp_track.as_ref().unwrap().time > i32_time {
            if is_unr {
                player_ts.glitch.insert(
                    time.trackName.clone().unwrap(),
                    Time {
                        time: i32_time,
                        date: time.dateSet,
                    },
                );
            } else {
                player_ts.normal.insert(
                    time.trackName.clone().unwrap(),
                    Time {
                        time: i32_time,
                        date: time.dateSet,
                    },
                );
            }
        }
    }
}

fn timesheet_cleanup(player_ts: &mut Timesheet) {
    let keys = player_ts.clone().glitch;
    for key in keys.keys() {
        let track_time_glitch = player_ts.glitch.get(key).unwrap().time;
        let normal = player_ts.normal.get(key);
        if normal.is_none() {
            continue;
        }
        if track_time_glitch > normal.unwrap().time {
            player_ts.glitch.remove(key);
        }
    }
}

async fn get_last_place_in_tops(url: String) -> u32 {
    let page = reqwest::get(url.split("&start=").next().unwrap())
        .await
        .unwrap()
        .text()
        .await
        .unwrap();

    if page.contains("This chart has 0 matches, sorry.") {
        return 0;
    }
    return u32::from_str_radix(
        page.split("Showing results")
            .nth(1)
            .unwrap()
            .split("</b")
            .next()
            .unwrap()
            .split("/ ")
            .nth(1)
            .unwrap(),
        10,
    )
    .unwrap()
        + 1;
}

async fn get_pos_from_pp(mut url: String) -> u32 {
    let mut page = reqwest::get(url.clone())
        .await
        .unwrap()
        .text()
        .await
        .unwrap();
    if page.contains("This chart has 0 matches, sorry.") {
        return 0;
    }
    while page.contains("falls outside this table.") {
        let mut url_split = url.split("&start=");
        url = format!(
            "{}&start={}",
            url_split.next().unwrap(),
            u32::from_str_radix(url_split.next().unwrap(), 10).unwrap() + 100
        );
        page = reqwest::get(url.clone())
            .await
            .unwrap()
            .text()
            .await
            .unwrap();
    }
    if page.contains("would normally fit here.") {
        return u32::from_str_radix(
            page.split("class='hlmiss'>")
                .nth(1)
                .unwrap()
                .split("<td>")
                .nth(1)
                .unwrap()
                .split('<')
                .next()
                .unwrap(),
            10,
        )
        .unwrap();
    };
    return u32::from_str_radix(
        page.split("class='hl'>")
            .nth(1)
            .unwrap()
            .split('<')
            .next()
            .unwrap(),
        10,
    )
    .unwrap();
}

async fn ts_to_json(player_ts: &Timesheet) -> String {
    let mut out = String::from("{");
    let mut i = 0;
    for header in CSV_HEADERS {
        let normal_time = player_ts.normal.get(header);
        let glitch_time = player_ts.glitch.get(header);

        out += "\"";
        out += header;
        out += "\":{";

        if ONLY_UNR.contains(&i) {
            if normal_time.is_some() {
                let time = normal_time.unwrap();
                let time_str = time.time.to_string();
                let time_str = time_str.split_at(time_str.len() - 3);
                let out_str = format!(
                    r##"{{"time":{},"date":"{}","pos":{}"}},"##,
                    time.time,
                    time.date.split("T").next().unwrap(),
                    get_pos_from_pp(format!(
                        "https://www.mariokartplayers.com/mkw/coursec.php?cid={i}&hl={}.{}&start=001",
                        time_str.0, time_str.1
                    ))
                    .await
                );
                out += "\"nosc\":";
                out += &out_str;
                out += ",\"unr\":";
                out += &out_str;
            } else {
                let last_place = get_last_place_in_tops(format!(
                    "https://www.mariokartplayers.com/mkw/coursec.php?cid={i}"
                )).await;
                out += &format!(r##""nosc":{{"time":359999,"date":"2009-04-01","pos":{}"}},"unr":{{"time":359999,"date":"2009-04-01","pos":{}"}}"##, last_place, last_place);
            }
            i += 2;
            continue;
        }

        if normal_time.is_some() {
            let time = normal_time.unwrap();
            let time_str = time.time.to_string();
            let time_str = time_str.split_at(time_str.len() - 3);
            out += &format!(
                r##""nosc":{{"time":{},"date":"{}","pos":{}"}},"##,
                time.time,
                time.date.split("T").next().unwrap(),
                get_pos_from_pp(format!(
                    "https://www.mariokartplayers.com/mkw/coursek.php?cid={i}&hl={}.{}&start=001",
                    time_str.0, time_str.1
                ))
                .await
            );
            if glitch_time.is_some() {
                let time = glitch_time.unwrap();
                let time_str = time.time.to_string();
                let time_str = time_str.split_at(time_str.len() - 3);
                out += &format!(
                    r##""unr":{{"time":{},"date":"{}","pos":{}"}}"##,
                    time.time,
                    time.date.split("T").next().unwrap(),
                    get_pos_from_pp(format!(
                        "https://www.mariokartplayers.com/mkw/coursec.php?cid={i}&hl={}.{}&start=001",
                        time_str.0, time_str.1
                    ))
                    .await
                );
            } else {
                out += &format!(
                    r##""unr":{{"time":{},"date":"{}","pos":{}"}},"##,
                    time.time,
                    time.date.split("T").next().unwrap(),
                    get_pos_from_pp(format!(
                        "https://www.mariokartplayers.com/mkw/coursek.php?cid={i}&hl={}.{}&start=001",
                        time_str.0, time_str.1
                    ))
                    .await
                );
            }
        } else {
            out += &format!(
                r##""nosc":{{"time":359999,"date":"2009-04-01","pos":{}"}},"##,
                get_last_place_in_tops(format!(
                    "https://www.mariokartplayers.com/mkw/coursek.php?cid={i}"
                ))
                .await
            );
            if glitch_time.is_some() {
                let time = glitch_time.unwrap();
                let time_str = time.time.to_string();
                let time_str = time_str.split_at(time_str.len() - 3);
                out += &format!(
                    r##""unr":{{"time":{},"date":"{}","pos":{}"}}"##,
                    time.time,
                    time.date.split("T").next().unwrap(),
                    get_pos_from_pp(format!(
                        "https://www.mariokartplayers.com/mkw/coursec.php?cid={i}&hl={}.{}&start=001",
                        time_str.0, time_str.1
                    ))
                    .await
                );
            } else {
                out += &format!(
                    r##""unr":{{"time":359999,"date":"2009-04-01","pos":{}"}}"##,
                    get_last_place_in_tops(format!(
                        "https://www.mariokartplayers.com/mkw/coursec.php?cid={i}"
                    ))
                    .await
                );
            }
        }
        i += 2;
        out += "},";
    }

    return out.strip_suffix(',').unwrap().to_string() + "}";
}
