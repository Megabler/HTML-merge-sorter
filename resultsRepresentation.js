
//----- Result representation
/**
* Hides other frames and displays only the table frame. Then creates a table inside the table frame
* @function
*/
function showResults(){
	console.log("Change table");
	
	document.getElementById("startFrame").style.display = 'none';
	document.getElementById("mainFrame").style.display = 'none';
	document.getElementById("tableFrame").style.display = '';
	
	let numImages = document.getElementById("imgNumbers").value;
	
	if(numImages === "none"){
		numImages = 0;
	} else if(numImages === "all"){
		numImages = numTotalCharacters;
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
	
	let ranking = 1;
	for (let counter = 0; counter < arr.length; counter++) {
		insertRowFunc(ranking, arr[counter], tbl, ranking <= numImages);
		// Add the elements that tied with the current element and give them the same rank
		for(const tieEntry of arr[counter].ties){
			insertRowFunc(ranking, tieEntry, tbl, ranking <= numImages);
		}
		ranking += arr[counter].ties.length + 1; // Update ranks. If there are e.g. 2 first places (i.e. arr[1].tie.length == 1), then there is no second place, and the next best is third place
	}
}

/**
* Creates a row based on rank and entry, and insert it into the table tbl
* @param rank {number} The rank of the entry
* @param entry {Object} The entry of the game character, containing the name and source to an image
* @param tbl The HTML table into which the row is inserted
* @param displayImage {boolean} Whether the image should be displayed in the table
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
		img.classList.add('characterImgTable');
		td.appendChild(img);
	}
	
	td = tr.insertCell();
	td.appendChild(document.createTextNode(entry.name));
	//console.log("Main: " + entry);
}