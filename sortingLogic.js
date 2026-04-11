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
	if(debug) {
		console.log("Next: " + next);
		console.log(arr);
		console.log(runningArray);
		console.log(curSubarray);
	}
	
	if(selected.classList.contains("left")){
		pastStatesQueue.push(new State(
			left, leftIntern, right, rightIntern, next, "left"
		));
		highlightOption(selected);
		selectContentLeft(selected);
	} else if(selected.classList.contains("right")) {
		pastStatesQueue.push(new State(
			left, leftIntern, right, rightIntern, next, "right"
		));
		highlightOption(selected);
		selectContentRight(selected);
	} else {
		const selectedElement = event.target;
		highlightOption(selectedElement);
		
		if(selectedElement.id === "tieButton"){
			pastStatesQueue.push(new State(
				left, leftIntern, right, rightIntern, next, "tie"
			));
			tie(event);
		} else if(selectedElement.id === "undoButton"){
			undoSortingAction(event);
		}
	}
	if(debug) {
		console.log("After execution");
		console.log(runningArray);
		console.log(curSubarray);
		console.log(numExaminedCharacters);
	}
	
	updateRoundPercent();
}

/**
* Adds the Entry shown in the left div as the preferred option to the array. Advances internal pointer, and then updates either only the left div, or both divs
* @param HTML element that was selected and will be updated
* @function
*/
function selectContentLeft(selected){
	curSubarray.push(arr[left][leftIntern]);
	// The chosen characters and all characters that tied with it were handled
	numExaminedCharacters+=arr[left][leftIntern].ties.length + 1;
	leftIntern++;
		
	if(arr[left].length === leftIntern){
		finishRight();
		finishSubarray();
	} else {
		let newContent = arr[left][leftIntern];
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
	// The chosen characters and all characters that tied with it were handled
	numExaminedCharacters+=arr[right][rightIntern].ties.length + 1;
	rightIntern++;
		
	if(arr[right].length === rightIntern){
		finishLeft();
		finishSubarray();
	} else {
		let newContent = arr[right][rightIntern];
		update(selected, newContent);
	}
}

/**
* Displays the first two Entry in the left and right option frame, and unhides the main frame
* @function
*/
function initializeFirstOptions(){
	if (debug) {console.log("Start initialization");}
	update(document.getElementById("left"), arr[0][0]);
	update(document.getElementById("right"), arr[1][0]);
	
	document.getElementById("mainFrame").style.display = '';
	if (debug) {console.log(arr);}
}

/**
* Updates the optionFrame HTML element based on newContent
* @param optionFrame HTML element that will be updated
* @param newContent {Entry} Entry element that describes the name and image source for the new content
* @function
*/
function update(optionFrame, newContent){
	// Changes the content of the optionFrame element
	if (debug) {console.log("Load " + newContent);}
	optionFrame.getElementsByTagName('div')[0].innerHTML = newContent.name;
	optionFrame.getElementsByTagName('img')[0].src = newContent.imageSrc;
	optionFrame.getElementsByTagName('img')[0].alt = newContent.name;
}

/**
* Add the current subarray to the final runningArray, advance pointers correctly, and update the option frames.
* Should only be called if at least one internal pointer is at its end.
* @function
*/
function finishSubarray(){		
	runningArray.push(curSubarray);
	curSubarray = [];
	if(debug){
		console.log("Adding to running array: " + curSubarray.toString());
		console.log(runningArray);
		console.log(runningArray[runningArray.length - 1]);
		console.log(curSubarray);
		console.log("size of running array: " + runningArray.length);
	}
	
	// Check if a round is finished, i.e. if all elements (except one for odd amount of elements) were examined
	if(next === arr.length || next + 1 === arr.length){
		console.log("Round finished");
		finishRound();
		if(finishVar) return;
	}
	
	// Update left frame and pointers
	left = next;
	let newContent = arr[left][0];
	update(document.getElementById("left"), newContent); 
	leftIntern = 0;
	next++;
	
	// Update right frame and pointers
	right = next;
	newContent = arr[right][0];
	update(document.getElementById("right"), newContent); 
	rightIntern = 0;
	next++;
}

/**
* Add the remaining elements from the arr[right] to the subarray
* @function
*/
function finishRight(){
	while(rightIntern < arr[right].length){
		curSubarray.push(arr[right][rightIntern]);
		// The chosen characters and all characters that tied with it were handled
		numExaminedCharacters+=arr[right][rightIntern].ties.length + 1;
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
		// The chosen characters and all characters that tied with it were handled
		numExaminedCharacters+=arr[left][leftIntern].ties.length + 1;
		leftIntern++;
	}
}
	

/**
* Reset pointers and arrays. Potentially stop further selection if finished, i.e. if we obtained a clear ranking
* Should only be called if all options (except ties or potentially the last element for odd lengths) were examined in the current round.
* @function
*/
function finishRound(){
	console.log("All elements inspected");
	document.getElementById("roundCounter").innerHTML = +document.getElementById("roundCounter").innerHTML + 1;
	if(arr.length % 2 === 1){
		// Add the last element that was not inspected in the last round to the front
		runningArray.unshift(arr[arr.length - 1]);
	}
	
	arr = runningArray;
	runningArray = [];
	numExaminedCharacters = 0;
	console.log("New array: " + arr.toString());
	pastStatesQueue = [];
	next = 0;
	
	// Flatten ties to make sure that recentTies contains only action of the current round (or next round in this case)
	for(const entryArr of arr){
		for(const entry of entryArr) {
			entry.flattenTies();
		}
	}
	if(arr.length === 1){
		// Everything was sorted, so we move on to showing results
		finishVar = true;
		console.log("Everything sorted");
		
		// Flatten array 
		arr = arr[0];
		
		console.log("Final sorting: ")
		console.log(arr);
		
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
	
	// Every character that leftEntry (indirectly) tied with (which includes rightEntry) + leftEntry itself was handled in this action
	numExaminedCharacters+= leftEntry.tie(rightEntry) + 1;
	rightIntern++;
	leftIntern++;
	curSubarray.push(leftEntry);
	
	if(arr[right].length === rightIntern || arr[left].length === leftIntern){
		// If one internal pointer is out of bounds, we add the remaining elements of the other pointer and then advance the outer pointers left and right
		// Calling finishLeft (finishRight) if leftIntern (rightIntern) is out of bounds does nothing. So we call both to not have two cases between which pointer is out of bounds
		finishLeft();
		finishRight();
		finishSubarray();
	} else {
		let newContent = arr[right][rightIntern];
		update(document.getElementById('right'), newContent);
		newContent = arr[left][leftIntern];
		update(document.getElementById('left'), newContent);
	}
}

/**
* Calculate how much percent of the characters were examined in this round and sets it in the HTML file
* @function
*/
function updateRoundPercent() {
	const percent = Math.floor((numExaminedCharacters / numTotalCharacters) * 1000) / 10;
	document.getElementById("roundPercent").innerHTML = percent;
}

function undoSortingAction(event) {
	if (debug){
		console.log("Start of undo:")
		console.log(arr);
		console.log(runningArray);
		console.log(curSubarray);
	}
	if(pastStatesQueue.length === 0){
		alert("Undo not possible at beginning of rounds.");
		return;
	}
	let lastState = pastStatesQueue.pop();
	
	// Reset variables to previous state
	left = lastState.left;
	leftIntern = lastState.leftIntern;
	right = lastState.right;
	rightIntern = lastState.rightIntern;
	next = lastState.next;
	
	let entriesUndone = 0;
	
	// Remove added tie elements if last action was a tie
	if(lastState.choice === "tie") {
		entriesUndone+=arr[left][leftIntern].recentTies.length;
		arr[left][leftIntern].recentTies = [];
	}
	
	// Remove entries added in the last action to curSubarray or runningArray
	if(curSubarray.length === 0){
		// curSubarray is empty, so the last action actually pushed curSubarray to runningArray and then reset curSubarray
		curSubarray = runningArray.pop();
	}
	/** Pop elements from curSubarray until the last picked character is removed, which is the character in arr[right][rightIntern] 
	* if choice === "right", or arr[left][leftIntern]. Every element removed until then was chosen as "worse" in the last sorting action,
	* which might change depending on the users new decision.
	*/
	let lastPicked;
	if(lastState.choice === "right"){
		lastPicked = arr[right][rightIntern].name; // TODO perhaps change to imageSrc, since that is guaranteed unique?
	} else {
		lastPicked = arr[left][leftIntern].name; // TODO perhaps change to imageSrc, since that is guaranteed unique?
	}
	let lastPopped;
	do {
		lastPopped = curSubarray.pop();
		entriesUndone+=lastPopped.ties.length + lastPopped.recentTies.length + 1;
		if (debug){
			console.log("Loop:");
			console.log(entriesUndone);
			console.log(lastPopped);
		}
	} while (lastPicked !== lastPopped.name);
	
	numExaminedCharacters-=entriesUndone;
	
	update(document.getElementById("left"), arr[left][leftIntern]);
	update(document.getElementById("right"), arr[right][rightIntern]);
}

/**
* State class that represents a state of variables during sorting
* @class
* @classdesc State class that represents a sorting state
*/
class State {

	constructor(left, leftIntern, right, rightIntern, next, choice){
		this.left = left;
		this.leftIntern = leftIntern;
		this.right = right;
		this.rightIntern = rightIntern;
		this.next = next;
		this.choice = choice;
	}

}