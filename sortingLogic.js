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
		highlightOption(selected);
		selectContentLeft(selected);
	} else if(selected.classList.contains("right")) {
		highlightOption(selected);
		selectContentRight(selected);
	} else {
		const selectedElement = event.target;
		highlightOption(selectedElement);
		
		if(selectedElement.id === "tieButton"){
			tie(event);
		} else if(selectedElement.id === "undoButton"){
			// TODO undo buttons
			notSupported(event);
		}
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
	leftIntern++;
	numExaminedCharacters++;
		
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
	numExaminedCharacters++;
		
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
* Displays the first two Entry in the left and right option frame, and unhides the main frame
* @function
*/
function initializeFirstOptions(){
	update(document.getElementById("left"), arr[0][0]);
	update(document.getElementById("right"), arr[1][0]);
	
	document.getElementById("frame").style.display = '';
}

/**
* Updates the optionFrame HTML element based on newContent
* @param optionFrame HTML element that will be updated
* @param newContent {Entry} Entry element that describes the name and image source for the new content
* @function
*/
function update(optionFrame, newContent){
	// Changes the content of the optionFrame element
	//console.log("Load " + newContent);
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
	if(debug){
		console.log("Adding to new array: " + curSubarray.toString());
		console.log("size of new array: " + runningArray.length);
	}
	curSubarray = [];
	
	// Check if an iteration is finished, if all elements (except one for odd amount of elements) were examined
	if(next === arr.length || next + 1 === arr.length){
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
		numExaminedCharacters++;
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
		numExaminedCharacters++;
	}
}
	

/**
* Reset pointers and arrays. Potentially stop further selection if finished, i.e. if we obtained a clear ranking
* Should only be called if all options (except ties or potentially the last element for odd lengths) were examined in the current iteration.
* @function
*/
function finishIteration(){
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
	next = 0;
	if(arr.length === 1){
		// Everything was sorted, so we move on to showing results
		finishVar = true;
		console.log("Everything sorted");
		
		// Flatten array 
		arr = arr[0];
		console.log("Final sorting: ")
		console.log(arr);
		
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
	
	numExaminedCharacters+= leftEntry.tie(rightEntry) + 1;
	rightIntern++;
	leftIntern++;
	curSubarray.push(leftEntry);
	
	// If one internal pointer is out of bounds, we add the remaining elements of the other pointer and then advance the outer pointers left and right
	if(arr[right].length === rightIntern || arr[left].length === leftIntern){
		// Calling finishLeft (finishRight) if leftIntern (rightIntern) is out of bounds does nothing. So we call both to not have two cases between which pointer is out of bounds
		finishLeft()
		finishRight()
		finishSubarray();
	} else {
		newContent = arr[right][rightIntern];
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