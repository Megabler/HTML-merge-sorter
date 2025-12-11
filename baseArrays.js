/**
* Methods that contain predefined values and creates arrays out of them after potentially filtering them
* @class
*/

/**
* Returns an array of Entry containing predefined values. The values are filtered according to the forms the user selected/deselected.
* @return {Array] Array of predefined, filtered Entry elements
* @function
*/
function initalizeArrayWithGenshin(){
	let newArr = [];
	const include4Stars = document.getElementById("raritySelector").checked;
	
	const inter = [
		["Illuga", "four", "Illuga", "Geo", "POLE"],
		["Zibai", "five", "Zibai", "Geo", "SWORD_ONE_HAND"],
		["Columbina", "five", "Columbina", "Hydro", "CATALYST"],
		["Jahoda", "four", "Jahoda", "Anemo", "BOW"],
		["Durin", "five", "Durin", "Pyro", "SWORD_ONE_HAND"],
		["Nefer", "five", "Nefer", "Dendro", "CATALYST"],
		["Aino", "four", "Aino", "Hydro", "CLAYMORE"],
		["Flins", "five", "Flins", "Electro", "POLE"],
		["Lauma", "five", "Lauma", "Dendro", "CATALYST"],
		["Ineffa", "five", "Ineffa", "Electro", "POLE"],
		["Dahlia", "four", "Dahlia", "Hydro", "SWORD_ONE_HAND"],
		["SkirkNew", "five", "Skirk", "Cryo", "SWORD_ONE_HAND"],
		["Ifa", "four", "Ifa", "Anemo", "CATALYST"],
		["Escoffier", "five", "Escoffier", "Cryo", "POLE"],
		["Varesa", "five", "Varesa", "Electro", "CATALYST"],
		["Iansan", "four", "Iansan", "Electro", "POLE"],
		["Mizuki", "five", "Yumemizuki Mizuki", "Anemo", "CATALYST"],
		["Lanyan", "four", "Lan Yan", "Anemo", "CATALYST"],
		["Citlali", "five", "Citlali", "Cryo", "CATALYST"],
		["Mavuika", "five", "Mavuika", "Pyro", "CLAYMORE"],
		["Olorun", "four", "Ororon", "Electro", "BOW"],
		["Chasca", "five", "Chasca", "Anemo", "BOW"],
		["Xilonen", "five", "Xilonen", "Geo", "SWORD_ONE_HAND"],
		["Mualani", "five", "Mualani", "Hydro", "CATALYST"],
		["Kinich", "five", "Kinich", "Dendro", "CLAYMORE"],
		["Kachina", "four", "Kachina", "Geo", "POLE"],
		["Emilie", "five", "Emilie", "Dendro", "POLE"],
		["Clorinde", "five", "Clorinde", "Electro", "SWORD_ONE_HAND"],
		["Sethos", "four", "Sethos", "Electro", "BOW"],
		["Arlecchino", "five", "Arlecchino", "Pyro", "POLE"],
		["Sigewinne", "five", "Sigewinne", "Hydro", "BOW"],
		["Chiori", "five", "Chiori", "Geo", "SWORD_ONE_HAND"],
		["Liuyun", "five", "Xianyun", "Anemo", "CATALYST"],
		["Gaming", "four", "Gaming", "Pyro", "CLAYMORE"],
		["Navia", "five", "Navia", "Geo", "CLAYMORE"],
		["Chevreuse", "four", "Chevreuse", "Pyro", "POLE"],
		["Furina", "five", "Furina", "Hydro", "SWORD_ONE_HAND"],
		["Charlotte", "four", "Charlotte", "Cryo", "CATALYST"],
		["Neuvillette", "five", "Neuvillette", "Hydro", "CATALYST"],
		["Wriothesley", "five", "Wriothesley", "Cryo", "CATALYST"],
		["Freminet", "four", "Freminet", "Cryo", "CLAYMORE"],
		["Liney", "five", "Lyney", "Pyro", "BOW"],
		["Linette", "four", "Lynette", "Anemo", "SWORD_ONE_HAND"],
		["Baizhuer", "five", "Baizhu", "Dendro", "CATALYST"],
		["Kaveh", "four", "Kaveh", "Dendro", "CLAYMORE"],
		["Mika", "four", "Mika", "Cryo", "POLE"],
		["Dehya", "five", "Dehya", "Pyro", "CLAYMORE"],
		["Alhatham", "five", "Alhaitham", "Dendro", "SWORD_ONE_HAND"],
		["Yaoyao", "four", "Yaoyao", "Dendro", "POLE"],
		["Faruzan", "four", "Faruzan", "Anemo", "BOW"],
		["Wanderer", "five", "Wanderer", "Anemo", "CATALYST"],
		["Layla", "four", "Layla", "Cryo", "SWORD_ONE_HAND"],
		["Nahida", "five", "Nahida", "Dendro", "CATALYST"],
		["Candace", "four", "Candace", "Hydro", "POLE"],
		["Cyno", "five", "Cyno", "Electro", "POLE"],
		["Nilou", "five", "Nilou", "Hydro", "SWORD_ONE_HAND"],
		["Tighnari", "five", "Tighnari", "Dendro", "BOW"],
		["Dori", "four", "Dori", "Electro", "CLAYMORE"],
		["Collei", "four", "Collei", "Dendro", "BOW"],
		["Ayato", "five", "Kamisato Ayato", "Hydro", "SWORD_ONE_HAND"],
		["Shinobu", "four", "Kuki Shinobu", "Electro", "SWORD_ONE_HAND"],
		["Yunjin", "four", "Yun Jin", "Geo", "POLE"],
		["Shenhe", "five", "Shenhe", "Cryo", "POLE"],
		["Momoka", "four", "Kirara", "Dendro", "SWORD_ONE_HAND"],
		["Yelan", "five", "Yelan", "Hydro", "BOW"],
		["Heizo", "four", "Shikanoin Heizou", "Anemo", "CATALYST"],
		["Yae", "five", "Yae Miko", "Electro", "CATALYST"],
		["Itto", "five", "Arataki Itto", "Geo", "CLAYMORE"],
		["Sara", "four", "Kujou Sara", "Electro", "BOW"],
		["Gorou", "four", "Gorou", "Geo", "BOW"],
		["Kokomi", "five", "Sangonomiya Kokomi", "Hydro", "CATALYST"],
		["Sayu", "four", "Sayu", "Anemo", "CLAYMORE"],
		["Shougun", "five", "Raiden Shogun", "Electro", "POLE"],
		["Eula", "five", "Eula", "Cryo", "CLAYMORE"],
		["Tohma", "four", "Thoma", "Pyro", "POLE"],
		["Yoimiya", "five", "Yoimiya", "Pyro", "BOW"],
		["Feiyan", "four", "Yanfei", "Pyro", "CATALYST"],
		["Kazuha", "five", "Kaedehara Kazuha", "Anemo", "SWORD_ONE_HAND"],
		["Hutao", "five", "Hu Tao", "Pyro", "POLE"],
		["Rosaria", "four", "Rosaria", "Cryo", "POLE"],
		["Xinyan", "four", "Xinyan", "Pyro", "CLAYMORE"],
		["Sucrose", "four", "Sucrose", "Anemo", "CATALYST"],
		["Keqing", "five", "Keqing", "Electro", "SWORD_ONE_HAND"],
		["Mona", "five", "Mona", "Hydro", "CATALYST"],
		["Diona", "four", "Diona", "Cryo", "BOW"],
		["Albedo", "five", "Albedo", "Geo", "SWORD_ONE_HAND"],
		["Ganyu", "five", "Ganyu", "Cryo", "BOW"],
		["Chongyun", "four", "Chongyun", "Cryo", "CLAYMORE"],
		["Qiqi", "five", "Qiqi", "Cryo", "SWORD_ONE_HAND"],
		["Noel", "four", "Noelle", "Geo", "CLAYMORE"],
		["Tartaglia", "five", "Tartaglia", "Hydro", "BOW"],
		["Bennett", "four", "Bennett", "Pyro", "SWORD_ONE_HAND"],
		["Fischl", "four", "Fischl", "Electro", "BOW"],
		["Zhongli", "five", "Zhongli", "Geo", "POLE"],
		["Klee", "five", "Klee", "Pyro", "CATALYST"],
		["Ningguang", "four", "Ningguang", "Geo", "CATALYST"],
		["Xiao", "five", "Xiao", "Anemo", "POLE"],
		["Xingqiu", "four", "Xingqiu", "Hydro", "SWORD_ONE_HAND"],
		["Beidou", "four", "Beidou", "Electro", "CLAYMORE"],
		["Xiangling", "four", "Xiangling", "Pyro", "POLE"],
		["Venti", "five", "Venti", "Anemo", "BOW"],
		["Ambor", "four", "Amber", "Pyro", "BOW"],
		["Razor", "four", "Razor", "Electro", "CLAYMORE"],
		["Diluc", "five", "Diluc", "Pyro", "CLAYMORE"],
		["Kaeya", "four", "Kaeya", "Cryo", "SWORD_ONE_HAND"],
		["Barbara", "four", "Barbara", "Hydro", "CATALYST"],
		["Lisa", "four", "Lisa", "Electro", "CATALYST"],
		["Qin", "five", "Jean", "Anemo", "SWORD_ONE_HAND"],
		["Ayaka", "five", "Kamisato Ayaka", "Cryo", "SWORD_ONE_HAND"]
	];
	for(const entry of inter){
		const elementId = "genshin" + capitalizeFirstLetter(entry[3]);
		const weaponId = "genshin" + entry[4] + "Weapons";
		if( (include4Stars || entry[1] === "five") && document.getElementById(elementId).checked && document.getElementById(weaponId).checked){ 
			newArr.push([new Entry(entry[2], entry[1], "https://api.hakush.in/gi/UI/UI_AvatarIcon_" + entry[0] + ".webp")]);
		}
	}
	
	// Copium options (i.e. Characters that likely won't be playable or at least are not so far)
	if(document.getElementById("copiumSelector").checked) {
		newArr.push([new Entry("Capitano", "five", "")]);
		newArr.push([new Entry("Kitsune Saiguu", "five", "")]);
		newArr.push([new Entry("Signora", "five", "")]);
		newArr.push([new Entry("Rerir", "five", "")]);
	}
	
	console.log("Loaded array: " + newArr);
	return newArr;
}

/**
* Returns an array of Entry containing predefined values. The values are filtered according to the forms the user selected/deselected.
* @return {Array] Array of predefined, filtered Entry elements
* @function
*/
function initalizeArrayWithHSR(){
	let newArr = [];
	const include4Stars = document.getElementById("raritySelector").checked;
	
	const inter = [
		["1321", "five", "The Dahlia", "fire", "Warlock"],
		["1415", "five", "Cyrene", "ice", "Memory"],
		["1412", "five", "Cerydra", "wind", "Shaman"],
		["1413", "five", "Evernight", "ice", "Memory"],
		["1410", "five", "Hysilens", "physical", "Warlock"],
		["1014", "five", "Saber", "wind", "Warrior"],
		["1015", "five", "Archer", "quantum", "Rogue"],
		["1408", "five", "Phainon", "physical", "Warrior"],
		["1406", "five", "Cipher", "quantum", "Warlock"],
		["1409", "five", "Hyacine", "wind", "Memory"],
		["1405", "five", "Anaxa", "wind", "Mage"],
		["1407", "five", "Castorice", "quantum", "Memory"],
		["1404", "five", "Mydei", "imaginary", "Warrior"],
		["1403", "five", "Tribbie", "quantum", "Shaman"],
		["1402", "five", "Aglaea", "thunder", "Memory"],
		["1401", "five", "The Herta", "ice", "Mage"],
		["1225", "five", "Fugue", "fire", "Warlock"],
		["1313", "five", "Sunday", "imaginary", "Shaman"],
		["1317", "five", "Rappa", "imaginary", "Mage"],
		["1222", "five", "Lingsha", "fire", "Priest"],
		["1220", "five", "Feixiao", "wind", "Rogue"],
		["1223", "four", "Moze", "thunder", "Rogue"],
		["1218", "five", "Jiaoqiu", "fire", "Warlock"],
		["1221", "five", "Yunli", "physical", "Warrior"],
		["1224", "four", "March 7th", "imaginary", "Rogue"],
		["1314", "five", "Jade", "quantum", "Mage"],
		["1310", "five", "Firefly", "fire", "Warrior"],
		["1315", "five", "Boothill", "physical", "Rogue"],
		["1309", "five", "Robin", "physical", "Shaman"],
		["1304", "five", "Aventurine", "imaginary", "Knight"],
		["1301", "four", "Gallagher", "fire", "Priest"],
		["1308", "five", "Acheron", "thunder", "Warlock"],
		["1312", "four", "Misha", "ice", "Warrior"],
		["1306", "five", "Sparkle", "quantum", "Shaman"],
		["1307", "five", "Black Swan", "wind", "Warlock"],
		["1305", "five", "Dr. Ratio", "imaginary", "Rogue"],
		["1214", "four", "Xueyi", "quantum", "Warrior"],
		["1303", "five", "Ruan Mei", "ice", "Shaman"],
		["1215", "four", "Hanya", "physical", "Shaman"],
		["1302", "five", "Argenti", "physical", "Mage"],
		["1217", "five", "Huohuo", "wind", "Priest"],
		["1112", "five", "Topaz & Numby", "fire", "Rogue"],
		["1210", "four", "Guinaifen", "fire", "Warlock"],
		["1212", "five", "Jingliu", "ice", "Warrior"],
		["1110", "four", "Lynx", "quantum", "Priest"],
		["1208", "five", "Fu Xuan", "quantum", "Knight"],
		["1213", "five", "Dan Heng • Imbibitor Lunae", "imaginary", "Warrior"],
		["1005", "five", "Kafka", "thunder", "Warlock"],
		["1111", "four", "Luka", "physical", "Warlock"],
		["1205", "five", "Blade", "wind", "Warrior"],
		["1203", "five", "Luocha", "imaginary", "Priest"],
		["1207", "four", "Yukong", "imaginary", "Shaman"],
		["1006", "five", "Silver Wolf", "quantum", "Warlock"],
		["1204", "five", "Jing Yuan", "thunder", "Mage"],
		["1001", "four", "March 7th", "ice", "Knight"],
		["1002", "four", "Dan Heng", "wind", "Rogue"],
		["1003", "five", "Himeko", "fire", "Mage"],
		["1004", "five", "Welt", "imaginary", "Warlock"],
		["1008", "four", "Arlan", "thunder", "Warrior"],
		["1009", "four", "Asta", "fire", "Shaman"],
		["1013", "four", "Herta", "ice", "Mage"],
		["1101", "five", "Bronya", "wind", "Shaman"],
		["1102", "five", "Seele", "quantum", "Rogue"],
		["1103", "four", "Serval", "thunder", "Mage"],
		["1104", "five", "Gepard", "ice", "Knight"],
		["1105", "four", "Natasha", "physical", "Priest"],
		["1106", "four", "Pela", "ice", "Warlock"],
		["1107", "five", "Clara", "physical", "Warrior"],
		["1108", "four", "Sampo", "wind", "Warlock"],
		["1109", "four", "Hook", "fire", "Warrior"],
		["1201", "four", "Qingque", "quantum", "Mage"],
		["1202", "four", "Tingyun", "thunder", "Shaman"],
		["1206", "four", "Sushang", "physical", "Rogue"],
		["1209", "five", "Yanqing", "ice", "Rogue"],
		["1211", "five", "Bailu", "thunder", "Priest"],
		["1414", "five", "Dan Heng • Permansor Terrae", "physical", "Knight"]
	];
	
	for(const entry of inter){
		const elementId = "hsr" + capitalizeFirstLetter(entry[3]);
		const weaponId = "hsr" + entry[4] + "Weapons";
		if( (include4Stars || entry[1] === "five") && document.getElementById(elementId).checked && document.getElementById(weaponId).checked){ 
			newArr.push([new Entry(entry[2], entry[1], "https://api.hakush.in/hsr/UI/avatarshopicon/" + entry[0] + ".webp")]);
		}
	}
	
	// Copium options (i.e. Characters that likely won't be playable or at least are not so far)
	if(document.getElementById("copiumSelector").checked) {
		newArr.push([new Entry("Smolrene", "five", "https://honkai-star-rail.fandom.com/wiki/Cyrene/Media?file=Sticker_PPG_24_Cyrene_05.png")]);
		newArr.push([new Entry("Cocolia", "five", "")]);
		newArr.push([new Entry("Tribios", "five", "")]);
	}
	
	console.log("Loaded array: " + newArr);
	return newArr;
}

/**
* Returns an array of Entry containing predefined values. The values are filtered according to the forms the user selected/deselected.
* @return {Array] Array of predefined, filtered Entry elements
* @function
*/
function initalizeArrayWithZZZ(){
	let newArr = [];
	const include4Stars = document.getElementById("raritySelector").checked;
	
	const inter = [
		["01", "four", "Anby", "Stun" ,"Electric"],
		["11", "five", "Nekomata", "AttackType" ,"Physical"],
		["12", "four", "Nicole", "Support" ,"Ether"],
		["05", "five", "Soldier 11", "AttackType" ,"Fire"],
		["52", "five", "Yidhari", "Rupture" ,"Ice"],
		["09", "four", "Corin", "AttackType" ,"Physical"],
		["25", "five", "Caesar", "Defense" ,"Physical"],
		["10", "four", "Billy", "AttackType" ,"Physical"],
		["13", "five", "Miyabi", "Anomaly" ,"Frost"],
		["14", "five", "Koleda", "Stun" ,"Fire"],
		["15", "four", "Anton", "AttackType" ,"Electric"],
		["16", "four", "Ben", "Defense" ,"Fire"],
		["17", "four", "Soukaku", "Support" ,"Ice"],
		["18", "five", "Lycaon", "Stun" ,"Ice"],
		["27", "four", "Lucy", "Support" ,"Fire"],
		["26", "five", "Lighter", "Stun" ,"Fire"],
		["32", "five", "Burnice", "Anomaly" ,"Fire"],
		["20", "five", "Grace", "Anomaly" ,"Electric"],
		["21", "five", "Ellen", "AttackType" ,"Ice"],
		["35", "five", "Harumasa", "AttackType" ,"Electric"],
		["22", "five", "Rina", "Support" ,"Electric"],
		["31", "five", "Yanagi", "Anomaly" ,"Electric"],
		["23", "five", "Zhu Yuan", "AttackType" ,"Ether"],
		["29", "five", "Qingyi", "Stun" ,"Electric"],
		["24", "five", "Jane", "Anomaly" ,"Physical"],
		["30", "four", "Seth", "Defense" ,"Electric"],
		["28", "four", "Piper", "Anomaly" ,"Physical"],
		["42", "five", "Hugo", "AttackType" ,"Ice"],
		["49", "five", "Orphie & Magus", "AttackType" ,"Fire"],
		["36", "five", "Astra Yao", "Support" ,"Ether"],
		["37", "five", "Evelyn", "AttackType" ,"Fire"],
		["41", "five", "Vivian", "Anomaly" ,"Ether"],
		["38", "four", "Pulchra", "Stun" ,"Physical"],
		["39", "five", "Trigger", "Stun" ,"Electric"],
		["44", "five", "Yixuan", "Rupture" ,"AuricInk"],
		["40", "five", "Soldier 0 - Anby", "AttackType" ,"Electric"],
		["43", "five", "Ju Fufu", "Stun" ,"Fire"],
		["46", "five", "Alice", "Anomaly" ,"Physical"],
		["47", "five", "Yuzuha", "Support" ,"Physical"],
		["45", "four", "Pan Yinhu", "Defense" ,"Physical"],
		["51", "four", "Manato", "Rupture" ,"Fire"],
		["50", "five", "Lucia", "Support" ,"Ether"],
		["48", "five", "Seed", "AttackType" ,"Electric"],
		["53", "five", "Banyue", "Rupture" ,"Fire"],
		["54", "five", "Dialyn", "Stun" ,"Physical"], 
		["55", "five", "Ye Shuanguang", "AttackType" ,"HonedEdge"], 
		["56", "five", "Zhao", "Defense" ,"Ice"], 
	];
	for(const entry of inter){
		entry[4] = specialTerm(entry[4]);
		const elementId = "zzz" + capitalizeFirstLetter(entry[4]);
		const weaponId = "zzz" + capitalizeFirstLetter(entry[3]) + "Weapons";
		if( (include4Stars || entry[1] === "five") && document.getElementById(elementId).checked && document.getElementById(weaponId).checked){ 
			newArr.push([new Entry(entry[2], entry[1], "https://api.hakush.in/zzz/UI/IconRoleCrop" + entry[0] + ".webp")]);
		}
	}
	
	// Copium options (i.e. Characters that likely won't be playable or at least are not so far)
	if(document.getElementById("copiumSelector").checked) {
		newArr.push([new Entry("Isolde", "five", "")]);
		newArr.push([new Entry("Sarah", "five", "")]);
		newArr.push([new Entry("Ye Shiyuan", "five", "")]);
		newArr.push([new Entry("Pompey", "five", "")]);
	}
	
	console.log("Loaded array: " + newArr + "; Length: " + newArr.length);
	return newArr;
}

/**
* Returns an array of Entry containing predefined values. The values are filtered according to the forms the user selected/deselected.
* @return {Array] Array of predefined, filtered Entry elements
* @function
*/
function initalizeArrayWithWuWa(){
	let newArr = [];
	const include4Stars = document.getElementById("raritySelector").checked;
	
	const inter = [
		["7", "four", "Sanhua", "Knife", "Ice"],
		["6", "four", "Baizhi", "Magic", "Ice"],
		["14", "five", "Lingyang", "Fist", "Ice"],
		["27", "five", "Zhezhi", "Magic", "Ice"],
		["31", "four", "Youhu", "Fist", "Ice"],
		["32", "five", "Carlotta", "Gun", "Ice"],
		["2", "four", "Chixia", "Gun", "Fire"],
		["8", "five", "Encore", "Magic", "Fire"],
		["13", "four", "Mortefi", "Gun", "Fire"],
		["26", "five", "Changli", "Knife", "Fire"],
		["44", "five", "Brant", "Knife", "Fire"],
		["46", "five", "Lupa", "Sword", "Fire"],
		["55", "five", "Galbrena", "Gun", "Fire"],
		["18", "five", "Calcharo", "Sword", "Thunder"],
		["17", "five", "Yinlin", "Magic", "Thunder"],
		["15", "four", "Yuanwu", "Fist", "Thunder"],
		["24", "five", "Jinhsi", "Sword", "Light"],
		["25", "five", "Xiangli Yao", "Fist", "Thunder"],
		["51", "five", "Augusta", "Sword", "Thunder"],
		["58", "four", "Buling", "Magic", "Thunder"],
		["1", "four", "Yangyang", "Knife", "Wind"],
		["12", "four", "Aalto", "Gun", "Wind"],
		["11", "five", "Jiyan", "Sword", "Wind"],
		["23", "five", "Jianxin", "Fist", "Wind"],
		["4", "five", "Rover: Aero", "Knife", "Wind"],
		["37", "five", "Ciaccona", "Gun", "Wind"],
		["5", "five", "Rover: Aero", "Knife", "Wind"],
		["40", "five", "Cartethyia", "Knife", "Wind"],
		["48", "five", "Iuno", "Fist", "Wind"],
		["56", "five", "Qiuyuan", "Knife", "Wind"],
		["4", "five", "Rover: Spectro", "Knife", "Light"],
		["5", "five", "Rover: Spectro", "Knife", "Light"],
		["3", "five", "Verina", "Magic", "Light"],
		["30", "four", "Lumi", "Sword", "Thunder"],
		["28", "five", "Shorekeeper", "Magic", "Light"],
		["45", "five", "Phoebe", "Magic", "Light"],
		["38", "five", "Zani", "Fist", "Light"],
		["57", "five", "Chisa", "Sword", "Dark"],
		["9", "four", "Taoqi", "Sword", "Dark"],
		["10", "four", "Danjin", "Knife", "Dark"],
		["29", "five", "Camellya", "Knife", "Dark"],
		["5", "five", "Rover: Havoc", "Knife", "Dark"],
		["4", "five", "Rover: Havoc", "Knife", "Dark"],
		["33", "five", "Roccia", "Fist", "Dark"],
		["34", "five", "Cantarella", "Magic", "Dark"],
		["41", "five", "Phrolova", "Magic", "Dark"]
	];
	for(const entry of inter){
		const elementId = "wuwa" + capitalizeFirstLetter(entry[4]);
		const weaponId = "wuwa" + capitalizeFirstLetter(entry[3]) + "Weapons";
		console.log(weaponId);
		if( (include4Stars || entry[1] === "five") && document.getElementById(elementId).checked && document.getElementById(weaponId).checked){ 
			newArr.push([new Entry(entry[2], entry[1], "https://api.hakush.in/ww/UI/UIResources/Common/Image/IconRoleHead256/T_IconRoleHead256_" + entry[0] + "_UI.webp")]);
		}
	}
	
	// Copium options (i.e. Characters that likely won't be playable or at least are not so far)
	if(document.getElementById("copiumSelector").checked) {
		//newArr.push([new Entry("Smolrene", "five", "")]);
	}
	
	console.log("Loaded array: " + newArr);
	return newArr;
}

/**
* Returns an array of Entry containing predefined values. Contains fewer elements and ignores filtering for faster testing
* @return {Array] Array of predefined, filtered Entry elements
* @function
*/
function testInit(){
	let newArr = [];
	const include4Stars = document.getElementById("raritySelector").checked;
	
	const inter = [
		["1321", "five", "The Dahlia", "fire"],
["1415", "five", "Cyrene", "ice"],
["1412", "five", "Cerydra", "wind"]
	];
	
	for(const entry of inter){
		if(include4Stars || entry[1] === "five"){ 
			newArr.push([new Entry(entry[2], entry[1], "https://api.hakush.in/hsr/UI/avatarshopicon/" + entry[0] + ".webp")]);
		}
	}
	
	if(document.getElementById("copiumSelector").checked) {
		newArr.push([new Entry("Smolrene", "five", "https://honkai-star-rail.fandom.com/wiki/Cyrene/Media?file=Sticker_PPG_24_Cyrene_05.png")]);
		newArr.push([new Entry("Cocolia", "five", "https://honkai-star-rail.fandom.com/wiki/Cyrene/Media?file=Sticker_PPG_24_Cyrene_05.png")]);
	}
	
	console.log("Loaded array: " + newArr);
	return newArr;
}

/**
* Entry class that represents a character and which characters are tied with it
* @class
* @classdesc Entry class that represents a character
*/
class Entry {

	constructor(name, rarity, imageSrc) {
		this.name = name;
		this.rarity = rarity;
		this.imageSrc = imageSrc;
		this.ties = [];
		//console.log("Created entry for " + name);
	}
	
	tie(otherEntry){
		this.ties.push(otherEntry);
		this.ties = this.ties.concat(otherEntry.ties);
	}

}

Entry.prototype.toString = function() {
	return "[" + this.name + ", " + this.rarity + "]";
}

function capitalizeFirstLetter(val) {
	return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

/**
* Rename certain terms to the more general version, e.g. Void Hunter element types to the overarching element. Keeps the original term if it already is the general term
* @param val {string} The term as string to rewrite
* @return {string} The corresponding term
* @function
*/
function specialTerm(val){
	switch(val){
		case "Frost":
			return "Ice";
		case "AuricInk":
			return "Ether";
		case "HonedEdge":
			return "Physical";
		default:
			return val;
	}
}