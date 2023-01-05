let rksysByteArray = [];

const chars = ["Mario","Baby Peach","Waluigi","Bowser","Baby Daisy","Dry Bones","Baby Mario","Luigi","Toad","Donkey Kong","Yoshi","Wario","Baby Luigi","Toadette","Koopa Troopa","Daisy","Peach","Birdo","Diddy Kong","King Boo","Bowser Jr.","Dry Bowser","Funky Kong","Rosalina","Small Mii Outfit A (Male)","Small Mii Outfit A (Female)","Small Mii Outfit B (Male)","Small Mii Outfit B (Female)","Small Mii Outfit C (Male)","Small Mii Outfit C (Female)","Medium Mii Outfit A (Male)","Medium Mii Outfit A (Female)","Medium Mii Outfit B (Male)","Medium Mii Outfit B (Female)","Medium Mii Outfit C (Male)","Medium Mii Outfit C (Female)","Large Mii Outfit A (Male)","Large Mii Outfit A (Female)","Large Mii Outfit B (Male)","Large Mii Outfit B (Female)","Large Mii Outfit C (Male)","Large Mii Outfit C (Female)","Medium Mii","Small Mii","Large Mii","Peach Biker Outfit","Daisy Biker Outfit","Rosalina Biker Outfit"]
const cons = ["Wii Wheel","Nunchuck","Classic","GCN","USB"]
const vehs = ["Standard Kart S","Standard Kart M","Standard Kart L","Baby Booster","Classic Dragster","Offroader","Mini Beast","Wild Wing","Flame Flyer","Cheep Charger","Super Blooper","Piranha Prowler","Rally Romper","Daytripper","Jetsetter","Blue Falcon","Sprinter","Honeycoupe","Standard Bike S","Standard Bike M","Standard Bike L","Bullet Bike","Mach Bike","Bowser Bike","Bit Bike","Sugarscoot","Wario Bike","Quacker","Zip Zip","Shooting Star","Magikruiser","Sneakster","Torpedo","Jet Bubble","Dolphin Dasher","Phantom"]

/* ==== Copied from MiiInfoEditorLite * Modified slightly ==== */
const MII_FILE_SIZE = 0x4A;
const MII_NAME_LENGTH = 10;
const ID_LENGTH = 0x4;
const UNEDIT1_SIZE = 2;
const UNEDIT2_SIZE = 0x14;
const MAKEUP = [0,1,6,9,0,0,0,0,0,10,0,0];
const WRINKLES = [0,0,0,0,5,2,3,7,8,0,9,11];
var editMii = {
	//0x0
	invalid:false,
    isGirl:false,
    month:0,
	day:0,
    favColor:0,
	isFavorite:false,
	//0x2
	name:'',
	//0x16
    height:0x40,
	//0x17
	weight:0x40,
	//0x18
    miiID:[0x86,0xb4,0x03,0xf0],
	//0x1C
    consoleID:[0xec,0xff,0x82,0xd2],
	//0x20
	unEdit1:[0x00,0x00],
	mingleOff:true,
	//0x22
　　unEdit2:[0x42,0x40,0x31,0xbd,0x28,0xa2,0x08,0x8c,0x08,0x40,0x14,0x49,0xb8,0x8d,0x00,0x8a,0x00,0x8a,0x25,0x04,0x00],
	//0x36
	creatorName:'',
	studio:new Uint8Array([0x08,0x00,0x40,0x03,0x08,0x04,0x04,0x02,0x02,0x0c,0x03,0x01,0x06,0x04,0x06,0x02,0x0a,0x00,0x00,0x00,0x00,0x00,0x00,0x08,0x04,0x00,0x0a,0x01,0x00,0x21,0x40,0x04,0x00,0x02,0x14,0x03,0x13,0x04,0x17,0x0d,0x04,0x00,0x0a,0x04,0x01,0x09]),
	previewData:'000f165d6574777a7f848f9399a6a9b6bbb8bfc6cdd4dbe2f1fc0310181f450c0f161b161c1619151f22292a353b39'
};
function byteToString(int){
    var str = int.toString(16);
    if(str.length < 2)str = '0' + str;
    return str;
}
function buftoUint16(data,addr){
    return (data[addr] << 8) + data[addr + 1];
}
function encodeStudio(studio){
    var n = 0;
    var eo;
    var dest= byteToString(n);
    for(var i = 0;i < studio.length;i++){
        eo = (7 + (studio[i] ^ n)) & 0xFF;
        n = eo;
        dest += byteToString(eo);
    }
    return dest;
}
function getBoolean(int){
	if(int === 1)return true;
	return false;
}
function getInt(boolean){
	if(boolean === true)return 1;
	return 0;
}
function bufToUtf16String(buf){
	var tmpU16,i,string;
	string = '';
	for(i = 0;i < MII_NAME_LENGTH;i++){
		tmpU16 = buf[i * 2] * 256 + buf[i * 2 + 1];
		if(tmpU16 === 0)break;
		string += String.fromCharCode(tmpU16);
	}
	return string;
}
function miiFileRead(buf){
	editMii.invalid = getBoolean(buf[0] >>> 7);
	editMii.studio[0x16] = (buf[0] >>> 6) & 1;
	editMii.isGirl = getBoolean(editMii.studio[0x16]);
	editMii.month = (buf[0] >>> 2) &　0xf;
	editMii.day = ((buf[0] & 3) << 3) + (buf[1] >>> 5);
	editMii.favColor = (buf[1] >>> 1) & 0xf;
	editMii.studio[0x15] = editMii.favColor;
	editMii.isFavorite = getBoolean(buf[1] & 1);
	var i;
	var stringBuf = [MII_NAME_LENGTH * 2];
	for(i = 0;i < MII_NAME_LENGTH;i++){
		stringBuf[i * 2] = buf[i * 2 + 0x2];
		stringBuf[i * 2 + 1] = buf[i * 2 + 0x2 + 1];
	}
	editMii.name = bufToUtf16String(stringBuf);
	editMii.height = buf[0x16];
	editMii.studio[0x1E] = editMii.height;
	editMii.weight = buf[0x17];
	editMii.studio[2] = editMii.weight;
	for(i = 0;i < ID_LENGTH;i++){
		editMii.miiID[i] = buf[0x18 + i];
		editMii.consoleID[i] = buf[0x1C + i];
	}
	editMii.unEdit1[0] = buf[0x20];
	editMii.mingleOff = getBoolean((buf[0x21] >>> 2) & 1);
	editMii.unEdit1[1] = buf[0x21] & 0xfb;
	for(i = 0;i < UNEDIT2_SIZE;i++){
        editMii.unEdit2[i] = buf[0x22 + i];
	}
	for(i = 0;i < MII_NAME_LENGTH;i++){
		stringBuf[i * 2] = buf[i * 2 + 0x36];
		stringBuf[i * 2 + 1] = buf[i * 2 + 0x36 + 1];
	}
	editMii.creatorName = bufToUtf16String(stringBuf);
	var faceShape = buf[0x20] >>> 5;
	var skinColor = (buf[0x20] >>> 2) & 7;
	var tmpU16 = buftoUint16(buf,0x20);
	var facialFeature = (tmpU16 >>> 6) & 0xF;
	editMii.studio[0x13] = faceShape;
	editMii.studio[0x11] = skinColor;
	editMii.studio[0x12] = MAKEUP[facialFeature];
	editMii.studio[0x14] = WRINKLES[facialFeature];
	var hairType = buf[0x22] >>> 1;
	tmpU16 = buftoUint16(buf,0x22);
	var hairColor = (tmpU16 >>> 6) & 7;
	var hairPart = (buf[0x23] >>> 5) & 1;
	editMii.studio[0x1D] = hairType;
	if(!hairColor)hairColor = 8;
	editMii.studio[0x1B] = hairColor;
	editMii.studio[0x1C] = hairPart;
	var eyebrowType = buf[0x24] >>> 3;
	tmpU16 = buftoUint16(buf,0x24);
	var eyebrowRotation = (tmpU16 >>> 6) & 0xF;
	var eyebrowColor = buf[0x26] >>> 5;
	var eyebrowSize = (buf[0x26] >>> 1) & 0xF;
	tmpU16 = buftoUint16(buf,0x26);
	var eyebrowVertPos = (tmpU16 >>> 4) & 0x1F;
	var eyebrowHorizSpacing = buf[0x27] & 0xF;
	editMii.studio[0xE] = eyebrowType;
	editMii.studio[0xC] = eyebrowRotation;
	if(!eyebrowColor)eyebrowColor = 8;
	editMii.studio[0xB] = eyebrowColor;
	editMii.studio[0xD] = eyebrowSize;
	editMii.studio[0x10] = eyebrowVertPos;
	editMii.studio[0xF] = eyebrowHorizSpacing;
	var eyeType = buf[0x28] >>> 2;
	var eyeRotation = buf[0x29] >>> 5;
	var eyeVertPos = buf[0x29] & 0x1F;
	var eyeColor = buf[0x2A] >>> 5;
	var eyeSize = (buf[0x2A] >>> 1) & 7;
	tmpU16 = buftoUint16(buf,0x2A);
	var eyeHorizSpacing = (tmpU16 >>> 5) & 0xF;
	editMii.studio[7] = eyeType;
	editMii.studio[5] = eyeRotation;
	editMii.studio[9] = eyeVertPos;
	editMii.studio[4] = eyeColor + 8;
	editMii.studio[6] = eyeSize;
	editMii.studio[8] = eyeHorizSpacing;
	var noseType = buf[0x2C] >>> 4;
	var noseSize = buf[0x2C] & 0xF;
	var noseVertPos = buf[0x2D] >>> 3;
	editMii.studio[0x2C] = noseType;
	editMii.studio[0x2B] = noseSize;
	editMii.studio[0x2D] = noseVertPos;
	var lipType = buf[0x2E] >>> 3;
	var lipColor = (buf[0x2E] >>> 1) & 3;
	tmpU16 = buftoUint16(buf,0x2E);
	var lipSize = (tmpU16 >>> 5) & 0xF;
	var lipVertPos = buf[0x2F] & 0x1F;
	editMii.studio[0x26] = lipType;
	if(lipColor < 4){
		lipColor += 19;
	}else{
		lipColor = 0;
	}
	editMii.studio[0x24] = lipColor;
	editMii.studio[0x25] = lipSize;
	editMii.studio[0x27] = lipVertPos;
	var glassesType = buf[0x30] >>> 4;
	var glassesColor = (buf[0x30] >>> 1) & 7;
	var glassesSize = buf[0x31] >>> 5;
	var glassesVertPos = buf[0x31] & 0x1F;
	editMii.studio[0x19] = glassesType;
	if(!glassesColor){
		glassesColor = 8;
	}else if(glassesColor < 6){
		glassesColor += 13;
	}else{
		glassesColor = 0;
	}
	editMii.studio[0x17] = glassesColor;
	editMii.studio[0x18] = glassesSize;
	editMii.studio[0x1A] = glassesVertPos;
	var mustacheType = buf[0x32] >>> 6;
	var beardType = (buf[0x32] >>> 4) & 3;
	var facialHairColor = (buf[0x32] >>> 1) & 7;
	tmpU16 = buftoUint16(buf,0x32);
	var mustacheSize = (tmpU16 >>> 5) & 0xF;
	var mustacheVertPos = buf[0x33] & 0x1F;
	editMii.studio[0x29] = mustacheType;
	editMii.studio[1] = beardType;
	if(!facialHairColor)facialHairColor = 8;
	editMii.studio[0] = facialHairColor;
	editMii.studio[0x28] = mustacheSize;
	editMii.studio[0x2A] = mustacheVertPos;
	var moleOn = buf[0x34] >>> 7;
	var moleSize = (buf[0x34] >>> 3) & 0xF;
	tmpU16 = buftoUint16(buf,0x34);
	var moleVertpos = (tmpU16 >>> 6) & 0x1F;
	var moleHoriznPos = (buf[0x35] >>> 1) & 0x1F;
	editMii.previewData = encodeStudio(editMii.studio);
	editMii.studio[0x20] = moleOn;
	editMii.studio[0x1F] = moleSize;
	editMii.studio[0x22] = moleVertpos;
	editMii.studio[0x21] = moleHoriznPos;
	editMii.previewData = encodeStudio(editMii.studio);
    return [editMii.previewData,editMii.name];
}
/* ==== Copied from MiiInfoEditorLite up to here ==== */

async function refresh(rksysByteArray) {
    const noFile = new Error("No file selected.");
    if (rksysByteArray.length===0) throw noFile;
    /*
        0x08    Top left license
        0x8CC8  Top right license
        0x11988 Bottom left license
        0x1A648 Bottom right license

        +   0xDC0   all Rank 1     
        +   0x19C0	all Rank 2     
        +   0x25C0	all Rank 3     
        +   0x31C0	all Rank 4     
        +   0x3DC0	all Rank 5     
        +   0x49C0	all Fastest lap

        Length singular Track = 0x60
    */
    const tracks = ["LC","MMM","MG","TF","MC","CM","DKSC","WGM","DC","KC","GV","MT","MH","DDR","BC","RR","rSGB","rGV2","rMC3","rBC3","rSL","rMR","rDKJP","rBC","rPB","rMC","rWS","rDKM","rYF","rDH","rPG","rDS"];
    const license1 = 0x08;
    const license2 = 0x8CC8;
    const license3 = 0x11988;
    const license4 = 0x1A648;
    const rank1 = 0xDC0;
    const rank2 = 0x19C0;
    const rank3 = 0x25C0;
    const rank4 = 0x31C0;
    const rank5 = 0x3DC0;
    const flaps = 0x49C0;
    const top5scr = [rank1,rank2,rank3,rank4,rank5,flaps];
    const trackLength = 0x60;
    const divIds = ["p1","p2","p3","p4","p5","p6"]

    let selectedLicense;
    switch(licenseInput.value){
        case "1":
            selectedLicense = license1;
            break;
        case "2":
            selectedLicense = license2;
            break;
        case "3":
            selectedLicense = license3;
            break;
        case "4":
            selectedLicense = license4;
            break;
    }
    
    const trackToCheck = (tracks.indexOf(trackInput.value)*trackLength)+selectedLicense;
    console.log(tracks.indexOf(trackInput.value))
    console.log(trackInput.value)
    
    for (let i = 0; i < 6; i++) {
        let emId = divIds[i];
		if (emId!=="p6") document.getElementById("vert"+emId).innerHTML = `<img id="img${emId}" class="image" src="" alt="N/A">`;
        let startPoint = trackToCheck + top5scr[i];
        let trackData = rksysByteArray.slice(startPoint,startPoint+trackLength);
        let miiData = trackData.slice(0,MII_FILE_SIZE);
        console.log(miiData.map(r=>r.toString(16).padStart(2,"0")).join(""))
        let timeData = trackData.slice(0x4C,0x4F).map(r=>r.toString(2).padStart(8,"0")).join("");
        let minutes = parseInt(timeData.slice(0,7),2);
        let seconds = parseInt(timeData.slice(7,14),2);
        let ms = parseInt(timeData.slice(14),2);
        if(ms===0&&seconds===0&&minutes===0) {
            document.getElementById("time"+emId).innerHTML = "No time set."
            if (emId!=="p6") document.getElementById("name"+emId).innerHTML = "";
            document.getElementById("char"+emId).innerHTML = "";
            document.getElementById("con"+emId).innerHTML = "";
            document.getElementById("veh"+emId).innerHTML = "";
            continue;
        }
        let miiDataElab = miiFileRead(miiData);
        if (emId!=="p6") document.getElementById("img"+emId).setAttribute("src",`https://studio.mii.nintendo.com/miis/image.png?data=${miiDataElab[0]}&type=face&expression=normal&width=512&bgColor=FFFFFF00&clothesColor=default&cameraXRotate=0&cameraYRotate=335&cameraZRotate=0&characterXRotate=0&characterYRotate=0&characterZRotate=0&lightDirectionMode=none&instanceCount=1&instanceRotationMode=model`);
        document.getElementById("time"+emId).innerHTML = minutes.toString().padStart(2,"0")+":"+seconds.toString().padStart(2,"0")+"."+ms.toString().padStart(3,"0");
        if (emId!=="p6") document.getElementById("name"+emId).innerHTML = miiDataElab[1];
        document.getElementById("char"+emId).innerHTML = chars[parseInt(trackData[0x50].toString(2).padStart(8,"0").substring(1),2)];
        document.getElementById("con"+emId).innerHTML = cons[parseInt(trackData[0x51].toString(2).padStart(8,"0").substring(0,3),2)];
        document.getElementById("veh"+emId).innerHTML = vehs[parseInt(trackData[0x4F].toString(2).padStart(8,"0").substring(0,6),2)];
		if (emId!=="p6") document.getElementById("vert"+emId).innerHTML += `<a id="dl${emId}" download="Mii${emId}.miigx" href="${URL.createObjectURL(new Blob([new Uint8Array(miiData)]))}"><img class="dlimage" src="https://png.pngtree.com/png-vector/20190116/ourlarge/pngtree-vector-download-icon-png-image_322161.jpg" alt=""></a>`;
    }
}

const licenseInput = document.getElementById("license");
const trackInput = document.getElementById("trackSelect");

const rksysInput = document.getElementById("savefile");
rksysInput.addEventListener("change", function checkFile(){
    rksysByteArray = [];
    const rksysHeader = [82,75,83,68,48,48,48,54];
    const corrFile = new Error("File is corrupted.");
    const notFile = new Error("Not an MKW Savefile.");
    if (this.files[0].size !== 2867200) throw corrFile
    let reader = new FileReader();
    reader.readAsArrayBuffer(this.files[0]);
    let pass = true;
    reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
            let arrayBuffer = evt.target.result, array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < array.length; i++) rksysByteArray.push(array[i]);
            for (let i = 0; i < 8; i++) if (rksysByteArray[i]!==rksysHeader[i]) throw notFile;
            refresh(rksysByteArray);
        }
    }
}, false);

trackInput.addEventListener("change", function(){refresh(rksysByteArray)});
licenseInput.addEventListener("change", function(){refresh(rksysByteArray)});
