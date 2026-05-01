//createWeaponSelections();
//document.getElementById("startButton").addEventListener("click", start);
let debug = false;

/**
* The array that contains the last complete result. In the first round it contains
* entries of all selected characters, in the second round it contains the result of the first 
* round (arrays of two entries, or a single entry with a tie), and so on.
* After completing all round contains the sorted result.
*/
let arr = [];

/**
* Parameters to represent round percent completion
*/
// How many characters were examined in this round (including tied characters).
let numExaminedCharacters = 0;
// How many characters were selected in the beginning.
let numTotalCharacters = arr.length;

//-------------- Sorting parameters
/**
* Three pointers to elements in arr. left and right point to the element currently
* shown in the left and right selection frame, respectively.
* next is the index to which the pointers will advance to.
* In further rounds, the internal pointer are necessary, since arr[left] can be an 
* array of entries. Thus, left will only be increased if all entries in arr[left] were 
* examined, i.e. if leftIntern===arr[left].length.
*/
//TODO remove next since left = right - 1 (i.e. they only increase when one round finishes, and then the other increases too)
//TODO replace left and right with index and index+1 (?)
let left = 0;
let right = 1;
let next = 2;
let rightIntern = 0;
let leftIntern = 0;

// Contains past states in order to return to them, thus undoing actions
let pastStatesQueue = [];

let finishVar = false;

/**
* Contains the sorted subarrays of this round. Will be the arr for the next round, or the final result
*/
let runningArray = [];
/**
* Contains the result of the comparison between arr[left] and arr[right].
* When left/right increases, curSubarray is pushed to runningArray and then emptied.
*/
let curSubarray = [];

window.onload = function(){
	// Show the selections based on the gameSelection form
	let elementSelector = document.getElementsByName('game');
	for (i = 0; i < elementSelector.length; i++) {
		if (elementSelector[i].checked){
			switch(elementSelector[i].id) {
			  case "zzzCheckbox":
					document.getElementById("zzzElements").style.display = '';
					document.getElementById("zzzWeapons").style.display = '';
				break;
			  case "hsrCheckbox":
					document.getElementById("hsrElements").style.display = '';
					document.getElementById("hsrWeapons").style.display = '';
				break;
			  case "wuwaCheckbox":
					document.getElementById("wuwaElements").style.display = '';
					document.getElementById("wuwaWeapons").style.display = '';
				break;
			  case "genshinCheckbox":
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
function startSorting(){
	document.getElementById("tableFrame").style.display = 'none';
	
	// Initialize arr with the data from the selected game
	let gameSelector = document.getElementsByName('game');
	arr = [];
	for (i = 0; i < gameSelector.length; i++) {
		if (gameSelector[i].checked){
			if(debug) {console.log("Selected " + gameSelector[i].id);}
			switch(gameSelector[i].id) {
			  case "zzzCheckbox":
				arr = arr.concat(initalizeArrayWithZZZ());
				break;
			  case "hsrCheckbox":
				arr = arr.concat(initalizeArrayWithHSR());
				break;
			  case "wuwaCheckbox":
				arr = arr.concat(initalizeArrayWithWuWa());
				break;
			  case "genshinCheckbox":
			  default:
				arr = arr.concat(initalizeArrayWithGenshin());
			}
		}
	}
	if(arr.length < 1){
		alert("No characters to sort selected. Select at least one game, element, and weapon or a game and mark the \"Copium?\" option.");
		return;
	}
	
	if(arr.length < 2){
		alert("Only one character to sort selected based on selected game, element, and weapon. Change selection to include at least two characters to start sorting.");
		return;
	}
	document.getElementById("startFrame").style.display = 'none';
	
	//arr = testInit();
	numExaminedCharacters = 0;
	numTotalCharacters = arr.length;
	
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
* OnClick function for the weapon and element selection forms.
* Changes the other corresponding input form if the event triggers on an "All" input element, or unchecks the corresponding "All" input element.
* Only changes the current form, e.g. clicking on genshinElements should not affect genshinWeapons or hsrElements.
* @function
*/
function changeSelector(event){
	if(event.target.tagName.toLowerCase() === 'input'){
		if(event.target.value.includes("All")){
			// Check or uncheck all other options
			let children = event.target.closest('form').children;
			if (debug) {console.log("All selector value: " + event.target.value);}
			for (let i = 0; i < children.length; i++) {
				// Set the other input elements to the same value as the "All" input element
				children[i].checked = event.target.checked;
			}
		} else if(!event.target.checked){
			// At least one option is unchecked, so the "All" option will be unchecked, which is the first input child
			const parentForm = event.target.closest('form');
			parentForm.querySelector('input').checked = false;
		} 
		else {
			// Check if every input form (excluding the "All" option) is now checked, and if yes also check the "All" option
			const parentForm = event.target.closest('form');
			let allTrue = true;
			for(const inputElement of parentForm.children) {
				if(inputElement.tagName.toLowerCase() === 'input' 
					&& !inputElement.checked 
					&& !inputElement.value.includes("All")){
					allTrue = false;
				}
			}
			if(allTrue){
				parentForm.querySelector('input').checked = true;
			}
		}
	}
}

/**
* OnClick function for the gameSelection form.
* Change which element and weapon icons are displayed depending on the selected games
* @function
*/
function changeSelectorDisplayed(event){
	if(debug){
		console.log("event.target");
		console.log(event.target);
	}
	if(event.target.tagName.toLowerCase() === 'input'){
		if(event.target.checked){
			showGameOptions(event.target.value);
		} else {
			hideGameOptions(event.target.value);
		}
	}
}

function showGameOptions(gameName){
	document.getElementById(gameName + "Elements").style.display = '';
	document.getElementById(gameName + "Weapons").style.display = '';
}

function hideGameOptions(gameName){
	document.getElementById(gameName + "Elements").style.display = 'none';
	document.getElementById(gameName + "Weapons").style.display = 'none';
}

function highlightOption(selectedElement){
	selectedElement.classList.add('selected');
	setTimeout(() => selectedElement.classList.remove('selected'), 200);
}

function returnToStartFrame(event){
	document.getElementById("tableFrame").style.display = 'none';
	document.getElementById("startFrame").style.display = '';
	resetValues();
}

function resetValues(){
	arr = [];
	numExaminedCharacters = 0;
	numTotalCharacters = arr.length;

	next = 2;
	left = 0;
	leftIntern = 0;
	right = 1;
	rightIntern = 0;
	finishVar = false;
	
	pastStatesQueue = [];

	runningArray = [];
	curSubarray = [];
	document.getElementById("roundCounter").innerHTML = +1;
	
}

//------ no longer used since the HTML form for weapon selection was manually written
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
