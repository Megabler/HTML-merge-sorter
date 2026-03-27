//createWeaponSelections();
//document.getElementById("startButton").addEventListener("click", start);
let debug = false;

let arr = [];
let numExaminedCharacters = 0;
let numTotalCharacters = arr.length;

let next = 2;
let left = 0;
let leftIntern = 0;
let right = 1;
let rightIntern = 0;
let finishVar = false;

let runningArray = [];
let curSubarray = [];

window.onload = function(){
	// Show the selections based on the gameSelection form
	let elementSelector = document.getElementsByName('game');
	for (i = 0; i < elementSelector.length; i++) {
		if (elementSelector[i].checked){
			switch(elementSelector[i].id) {
			  case "allRadio":
					document.getElementById("genshinElements").style.display = '';
					document.getElementById("genshinWeapons").style.display = '';
					document.getElementById("hsrElements").style.display = '';
					document.getElementById("hsrWeapons").style.display = '';
					document.getElementById("zzzElements").style.display = '';
					document.getElementById("zzzWeapons").style.display = '';
					document.getElementById("wuwaElements").style.display = '';
					document.getElementById("wuwaWeapons").style.display = '';
				break;
			  case "zzzRadio":
					document.getElementById("zzzElements").style.display = '';
					document.getElementById("zzzWeapons").style.display = '';
				break;
			  case "hsrRadio":
					document.getElementById("hsrElements").style.display = '';
					document.getElementById("hsrWeapons").style.display = '';
				break;
			  case "wuwaRadio":
					document.getElementById("wuwaElements").style.display = '';
					document.getElementById("wuwaWeapons").style.display = '';
				break;
			  case "genshinRadio":
			  default:
					document.getElementById("genshinElements").style.display = '';
					document.getElementById("genshinWeapons").style.display = '';
			}
		}
	}
}

/**
* Initializes array based on selected games, and displays the main frame
* @function
*/
function start(){
	document.getElementById("startFrame").style.display = 'none';
	document.getElementById("tableFrame").style.display = 'none';
	
	// Initialize arr with the data from the selected game
	let gameSelector = document.getElementsByName('game');
	arr = [];
	for (i = 0; i < gameSelector.length; i++) {
		if (gameSelector[i].checked){
			console.log("Selected " + gameSelector[i].id);
			switch(gameSelector[i].id) {
			  case "allRadio":
				arr = initalizeArrayWithZZZ();
				arr = arr.concat(initalizeArrayWithHSR());
				arr = arr.concat(initalizeArrayWithWuWa());
				arr = arr.concat(initalizeArrayWithGenshin());
				console.log(arr);
				break;
			  case "zzzRadio":
				arr = initalizeArrayWithZZZ();
				break;
			  case "hsrRadio":
				arr = initalizeArrayWithHSR();
				break;
			  case "wuwaRadio":
				arr = initalizeArrayWithWuWa();
				break;
			  case "genshinRadio":
			  default:
				arr = initalizeArrayWithGenshin();
			}
		}
	}
	//arr = testInit();
	numExaminedCharacters = 0;
	numTotalCharacters = arr.length;
	
	if(arr.length < 2){
		alert("Not enough options available. Immediately show results");
		showResults();
		return;
	}
	initializeFirstOptions();
	document.getElementById("Main").addEventListener("click", activateSelection);
	setNumRounds();
	return arr;
}


/**
* Calculate how many rounds are needed to compare everything and set it in the HTML file
* @function
*/
function setNumRounds(){
	const numRounds = Math.ceil(Math.log2(arr.length));
	document.getElementById("numRounds").innerHTML = numRounds;
}

function notSupported(event){
	event.preventDefault();
	alert("Not implemented yet, sorry!");
}

/**
* Changes the other corresponding input form if the event triggers on an "All" input form, or unchecks the corresponding "All" input form
* @function
*/
function changeSelector(event){
	console.log(event.target);
	if(event.target.tagName.toLowerCase() === 'input'){
		if(event.target.value.includes("All")){
			// Check or uncheck all other options
			let children = event.target.closest('form').children;
			console.log(event.target.value);
			for (let i = 0; i < children.length; i++) {
				children[i].checked = event.target.checked;
			}
		} else if(!event.target.checked){
			// Uncheck the all option
			const parentForm = event.target.closest('form');
			parentForm.querySelector('input').checked = false;
		} else {
			// TODO check the all option if every input form is now checked
		}
	}
}

/**
*  Change which element and weapon icons are displayed depending on the selected games
* @function
*/
function changeSelectorDisplayed(event){
	if(event.target.tagName.toLowerCase() === 'input'){
		const selectors = document.getElementById("Selections").children;
		if(event.target.value === "all"){
			// Iterate over left and right selector frames
			for(const forms of selectors){
				for(const form of forms.children){
					form.style.display = '';
				}
			}
		} else {
			// First hide all selections, and then show the one that was clicked on 
			for(const forms of selectors){
				for(const form of forms.children){
					form.style.display = 'none';
				}
			}
			
			console.log(event.target.value + "Elements");
			document.getElementById(event.target.value + "Elements").style.display = '';
			console.log(event.target.value + "Weapons");
			document.getElementById(event.target.value + "Weapons").style.display = '';
		}
	}
}

/**
* Create a HTML form for each game
* Outdated, as this is done statically now.
* @function
*/
function createWeaponSelections(){
	const frame = document.getElementById("weaponSelection");
	const games = ["genshin", "hsr", "zzz", "wuwa"];
	const gameOptions = {
		genshin:["SWORD_ONE_HAND", "CATALYST", "CLAYMORE", "BOW", "POLE"],
		hsr:["knight", "mage", "priest", "rogue", "shaman", "warlock", "warrior", "memory"],
		zzz:["AttackType", "Stun", "Anomaly", "Support", "Defense", "Rupture"],
		wuwa:["Knife", "Sword", "Gun", "Fist", "Magic"],
	}
	for(const game of games){
		const form = document.createElement("form");
		frame.appendChild(form);
		form.setAttribute("id", game + "Weapons");
		form.addEventListener("click", (e) => changeSelector(e));
		form.setAttribute("style", "display:none");
		form.appendChild(document.createElement("br"));
		
		if(game === "genshin"){
			form.dataset.tooltip = "Has no effect yet for Genshin characters";	
		}
		
		createInput(game, "All", form);
		const options = gameOptions[game];
		for(const option of options){
			createInput(game, option, form);
		}
	}
}

/**
* Create a HTML checkbox input and corresponding label based on game and option to append to the form
* @param game {string} Name of game
* @param option {string} 
* @param form HTML form element to append the input element to
* @function
*/
function createInput(game, option, form){
	const input = document.createElement("input");
	form.appendChild(input);
	input.setAttribute("type", "checkbox");
	input.setAttribute("id", game + option + "Weapons");
	input.setAttribute("name", game + "Weapons");
	input.setAttribute("value", game + option + "Weapons");
	input.setAttribute("checked", "checked");
	
	
	const label = document.createElement("label");
	form.appendChild(label);
	label.setAttribute("for", game + option + "Weapons");
	if(option === "All"){
		switch(game){
			case "genshin":
				label.innerHTML = "All Weapons";
				break;
			case "hsr":
				label.innerHTML = "All Paths";
				break;
			case "zzz":
				label.innerHTML = "All Specialties";
				break;
			case "wuwa":
				label.innerHTML = "All Weapons";
				break;
			default:
				alert("Error while creating weapon icons. Found game " + game);
		}
	} else {
		switch(game){
			case "genshin":
				label.innerHTML = "<img src=\"https://api.hakush.in/gi/UI/WEAPON_" + option + ".webp\" alt=\"" + option + "\" class=\"selectionImage\"> ";
				break;
			case "hsr":
				label.innerHTML = "<img src=\"https://api.hakush.in/hsr/UI/pathicon/" + option + ".webp\" alt=\"" + option + "\" class=\"selectionImage\"> ";
				break;
			case "zzz":
				label.innerHTML = "<img src=\"https://api.hakush.in/zzz/UI/Icon" + option + ".webp\" alt=\"" + option + "\" class=\"selectionImage\"> ";
				break;
			case "wuwa":
				label.innerHTML = "<img src=\"https://api.hakush.in/ww/UI/Static/SP_IconNor" + option + ".webp\" alt=\"" + option + "\" class=\"selectionImage\"> ";
				break;
			default:
				alert("Error while creating weapon icons. Found game " + game);
		}
	}
	
}

function highlightOption(selectedElement){
	selectedElement.classList.add('selected');
	setTimeout(() => selectedElement.classList.remove('selected'), 200);
}
