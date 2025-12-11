//createWeaponSelections();
//document.getElementById("startButton").addEventListener("click", start);


window.onload = function(){
	// Show the selections based on the radio form
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
* Initializes array based on selected game, and displays the main frame
* @function
*/
function start(){
	document.getElementById("startFrame").style.display = 'none';
	document.getElementById("tableFrame").style.display = 'none';
	
	// Initialize arr with the data from the selected game
	let gameSelector = document.getElementsByName('game');
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

let arr = [];

let next = 2;
let left = 0;
let leftIntern = 0;
let right = 1;
let rightIntern = 0;
let finishVar = false;

let runningArray = [];
let curSubarray = [];


//------- Logic behind the sorting
/**
* Calls the corresponding functions based on the element that was clicked
* @function
*/
function activateSelection(){
	if(finishVar){
		// If finished, we should no longer sort
		alert("Done");
		return;
	}
	const selected = event.target.closest('span');
	console.log("Next: " + next);
	console.log(arr);
	
	if(selected.classList.contains("left")){
		selected.classList.add('selected');
		setTimeout(() => selected.classList.remove('selected'), 200);
		selectContentLeft(selected);
	} else if(selected.classList.contains("right")) {
		selected.classList.add('selected');
		setTimeout(() => selected.classList.remove('selected'), 200);
		selectContentRight(selected);
	} else {
		const element = event.target;
		element.classList.add('selected');
		setTimeout(() => element.classList.remove('selected'), 200);
		console.log("Neither left nor right was clicked");
		if(element.id === "tieButton"){
			tie(event);
		} else if(element.id === "copiumButton"){
			// TODO undo buttons
			notSupported(event);
		}
	}
}

/**
* Adds the Entry shown in the left div as the preferred option to the array. Advances internal pointer, and then updates either only the left div, or both divs
* @param HTML element that was selected and will be updated
* @function
*/
function selectContentLeft(selected){
	curSubarray.push(arr[left][leftIntern]);
	leftIntern++;
		
	let newContent;
	if(arr[left].length === leftIntern){
		finishRight();
		finishSubarray();
	} else {
		newContent = arr[left][leftIntern];
		update(selected, newContent);
	}
}

/**
* Adds the Entry shown in the right div as the preferred option to the array. Advances internal pointer, and then updates either only the right div, or both divs
* @param HTML element that was selected and will be updated
* @function
*/
function selectContentRight(selected){
	// Add new preferred element to current subarray
	curSubarray.push(arr[right][rightIntern]);
	rightIntern++;
		
	let newContent;
	if(arr[right].length === rightIntern){
		finishLeft();
		finishSubarray();
	} else {
		newContent = arr[right][rightIntern];
		update(selected, newContent);
	}
}

/**
* Updates the optionFrame HTML element based on newContent
* @param optionFrame HTML element that will be updated
* @param newContent {Entry} Entry element that describes the name and image source for the new content
* @function
*/
function update(optionFrame, newContent){
	// Changes the content of the optionFrame element
	console.log("Load " + newContent);
	optionFrame.getElementsByTagName('div')[0].innerHTML = newContent.name;
	optionFrame.getElementsByTagName('img')[0].src = newContent.imageSrc;
	optionFrame.getElementsByTagName('img')[0].alt = newContent.name;
}

/**
* Add the current subarray to the final runningArray, advance pointers correctly, and updates the option frames.
* Should only be called if at least one internal pointer is at its end.
* @function
*/
function finishSubarray(){		
	runningArray.push(curSubarray);
	console.log("Adding to new array: " + curSubarray.toString());
	console.log("size of new array: " + runningArray.length);
	curSubarray = [];
	console.log((next === arr.length ) + ", " + ( next + 1 === arr.length))
	if(next === arr.length || next + 1 === arr.length){
		// Examined everything once (except one subarray if there is an odd number) so reset pointers
		console.log("Iteration finished");
		finishIteration();
		if(finishVar) return;
	}
	
	// Update left frame and pointers
	newContent = arr[next][0];
	update(document.getElementById("left"), newContent); 
	leftIntern = 0;
	left = next;
	next++;
	
	// Update right frame and pointers
	newContent = arr[next][0];
	update(document.getElementById("right"), newContent); 
	rightIntern = 0;
	right = next;
	next++;
}

/**
* Add the remaining elements from the arr[right] to the subarray
* @function
*/
function finishRight(){
	while(rightIntern < arr[right].length){
		curSubarray.push(arr[right][rightIntern]);
		rightIntern++;
	}
}

/**
* Add the remaining elements from arr[left] to the subarray
* @function
*/
function finishLeft(){
// Add the remaining elements from the left subarray to the current subarray
	while(leftIntern < arr[left].length){
		curSubarray.push(arr[left][leftIntern]);
		leftIntern++;
	}
}
	

/**
* Reset pointers and arrays. Potentially stop further selection if finished, i.e. if we obtained a clear ranking
* Should only be called if all options (except ties or potentially the last element for odd lengths) were examined in the current iteration.
* @function
*/
function finishIteration(){
	console.log("All elements inspected");
	document.getElementById("counter").innerHTML = +document.getElementById("counter").innerHTML + 1;
	if(arr.length % 2 === 1){
		// Add the last element that was not inspected in the last round to the front
		runningArray.unshift(arr[arr.length - 1]);
	}
	
	arr = runningArray;
	runningArray = [];
	console.log("New array: " + arr.toString());
	next = 0;
	if(arr.length === 1){
		// Everything was sorted, so we move on to showing results
		finishVar = true;
		console.log("Everything sorted");
		
		// Flatten array 
		arr = arr[0];
		
		document.getElementById("Main").style.display = 'none';
		showResults();
	}
}

/**
* Adds the right element to the tied Entries of the left Entry. Then updates displayed Entries and pointers
* @param The event that was triggered. Should be a "click" event
* @function
*/
function tie(event){
	event.stopPropagation();
	const leftEntry = arr[left][leftIntern];
	const rightEntry = arr[right][rightIntern];
	
	leftEntry.tie(rightEntry);
	rightIntern++;
	leftIntern++;
	curSubarray.push(leftEntry);
	console.log(curSubarray);
	
	// Advance both internal pointers. If one pointer would then be out of bounds, we advance the outer pointers left and right
	if(arr[right].length === rightIntern || arr[left].length === leftIntern){
		finishSubarray();
	} else {
		newContent = arr[right][rightIntern];
		update(document.getElementById('right'), newContent);
		newContent = arr[left][leftIntern];
		update(document.getElementById('left'), newContent);
	}
}

/**
* Calculate how many rounds are needed to compare everything and set it in the HTML file
* @function
*/
function setNumRounds(){
	const numRounds = Math.ceil(Math.log2(arr.length));
	document.getElementById("numRounds").innerHTML = numRounds;
}

/**
* Displays the first two Entry in the left and right option frame, and unhides the main frame
* @function
*/
function initializeFirstOptions(){
	document.getElementById("left").getElementsByTagName('div')[0].innerHTML = arr[0][0].name;
	document.getElementById("left").getElementsByTagName('img')[0].src = arr[0][0].imageSrc;
	document.getElementById("left").getElementsByTagName('img')[0].alt = arr[0][0].name;
	
	document.getElementById("right").getElementsByTagName('div')[0].innerHTML = arr[1][0].name;
	document.getElementById("right").getElementsByTagName('img')[0].src = arr[1][0].imageSrc;
	document.getElementById("right").getElementsByTagName('img')[0].alt = arr[1][0].name;
	
	document.getElementById("frame").style.display = '';
}

//----- Result representation
/**
* Hides other frames and displays only the table frame. Then creates a table inside the table frame
* @function
*/
function showResults(){
	console.log("Change table");
	
	document.getElementById("startFrame").style.display = 'none';
	document.getElementById("frame").style.display = 'none';
	document.getElementById("tableFrame").style.display = '';
	
	let numImages = document.getElementById("imgNumbers").value;
	
	if(numImages === "none"){
		numImages = 0;
	} else if(numImages === "all"){
		numImages = arr.length;
	} else {
		numImages = +numImages;
	}
	createTable(numImages);
}

/**
* Resets the table displaying the results, and recreates it
* @param numImages {number} Until which rank an image should be displayed. E.g. for numImages = 2, then only entries with rank 1 or 2 are displayed with an image
* @function
*/
function createTable(numImages){
	// https://stackoverflow.com/questions/14643617/create-table-using-javascript
	const tbl = document.getElementById('resultTable');
	tbl.innerHTML = "";
	
	let orderArrayHeader = ["Rank", "", "Name"];
	let thead = document.createElement('thead');

	tbl.appendChild(thead);
	for (let i = 0; i < orderArrayHeader.length; i++) {
		thead.appendChild(document.createElement("th")).
			  appendChild(document.createTextNode(orderArrayHeader[i]));
	}
	
	for (let counter = 0; counter < arr.length; counter++) {
		insertRowFunc(counter + 1, arr[counter], tbl, numImages);
		// Add the elements that tied with the current element 
		for(const tieEntry of arr[counter].ties){
			insertRowFunc(counter + 1, tieEntry, tbl, counter < numImages);
		}
		counter += arr[counter].ties.length;
	}
}

/**
* Creates a row based on rank and entry, and insert it into the table tbl
* @param rank {number} The rank of the entry
* @param entry {Object} The entry of the game character
* @param tbl The HTML table into which the row is inserted
* @param displayImage {boolean} The rank of the entry
* @function
*/
function insertRowFunc(rank, entry, tbl, displayImage){
	// Create a table row to insert into tbl.
	// The row's cells are: rank in the first column, the entry's name in the third column, and entry's image in the second column if displayImage
	const tr = tbl.insertRow();
	
	let td = tr.insertCell();
	td.appendChild(document.createTextNode(rank));
	
	td = tr.insertCell();
	if(displayImage){
		const img = document.createElement('img');
		img.src = entry.imageSrc;
		td.appendChild(img);
	}
	
	td = tr.insertCell();
	td.appendChild(document.createTextNode(entry.name));
	console.log("Main: " + entry);
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

