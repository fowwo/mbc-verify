function outputFail(time, message) {

	const table = document.getElementById("log");
	document.body.style.backgroundImage = "linear-gradient(#400, black)";

	let row = document.createElement("tr");

	let cell = document.createElement("td");
	cell.style = "vertical-align: top;";

	let img = document.createElement("img");
	img.className = "icon";
	img.style = "box-shadow: 0 0 50px #f00;";
	img.src = "img/fail.png";
	img.alt = "Fail!";
	cell.appendChild(img);

	row.appendChild(cell);

	cell = document.createElement("td");
	cell.style = "padding: 0 5px;";
	if (time == "" || time == null || time == undefined) {
		cell.innerHTML = message;
	} else {
		cell.innerHTML = `<b>${time}</b> - ${message}`;
	}
	row.appendChild(cell);

	table.appendChild(row);

}

function outputSuccess(message) {

	const table = document.getElementById("log");
	document.body.style.backgroundImage = "linear-gradient(#040, black)";

	let row = document.createElement("tr");

	let cell = document.createElement("td");
	cell.style = "vertical-align: top;";

	let img = document.createElement("img");
	img.className = "icon";
	img.style = "box-shadow: 0 0 50px #0f0;";
	img.src = "img/success.png";
	img.alt = "Success!";
	cell.appendChild(img);

	row.appendChild(cell);

	cell = document.createElement("td");
	cell.style = "padding: 0 5px;";
	cell.innerHTML = message;
	row.appendChild(cell);

	table.appendChild(row);
	
}

function outputError(e, message) {

	console.error(e);

	const table = document.getElementById("log");
	document.body.style.backgroundImage = "linear-gradient(#440, black)";

	let row = document.createElement("tr");

	let cell = document.createElement("td");
	cell.style = "vertical-align: top;";

	let img = document.createElement("img");
	img.className = "icon";
	img.style = "box-shadow: 0 0 50px #ff0;";
	img.src = "img/error.png";
	img.alt = "Error!";
	cell.appendChild(img);

	row.appendChild(cell);

	cell = document.createElement("td");
	cell.style = "padding: 0 5px;";
	cell.innerHTML = message;
	row.appendChild(cell);

	table.appendChild(row);
	
}

function outputText(message) {

	const table = document.getElementById("log");

	let row = document.createElement("tr");

	let cell = document.createElement("td");
	cell.style = "vertical-align: top;";

	let img = document.createElement("img");
	img.className = "icon";
	img.style = "box-shadow: 0 0 50px #fff;";
	img.src = "img/info.png";
	img.alt = "Info";
	cell.appendChild(img);

	row.appendChild(cell);

	cell = document.createElement("td");
	cell.style = "padding: 0 5px;";
	cell.innerHTML = message;
	row.appendChild(cell);

	table.appendChild(row);

}
