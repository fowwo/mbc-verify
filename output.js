function outputFail(time, message) {

	const content = document.getElementById("content-box");
	document.body.style.backgroundImage = "linear-gradient(#400, black)";

	let div = document.createElement("div");
	div.style = "float: left;";

	let img = document.createElement("img");
	img.className = "icon";
	img.style = "box-shadow: 0 0 50px #f00;";
	img.src = "img/fail.png";
	img.alt = "Fail!";
	div.appendChild(img);
	content.appendChild(div);

	div = document.createElement("div");
	div.style = "width: 100%; height: 50px; padding: 9px 0 0 0; word-wrap: break-word;";
	if (time == "" || time == null || time == undefined) {
		div.innerHTML = `&nbsp;${message}`;
	} else {
		div.innerHTML = `&nbsp;<b>${time}</b> - ${message}`;
	}
	content.appendChild(div);

}

function outputSuccess(message) {

	const content = document.getElementById("content-box");
	document.body.style.backgroundImage = "linear-gradient(#040, black)";

	let div = document.createElement("div");
	div.style = "float: left;";

	let img = document.createElement("img");
	img.className = "icon";
	img.style = "box-shadow: 0 0 50px #0f0;";
	img.src = "img/success.png";
	img.alt = "Success!";
	div.appendChild(img);
	content.appendChild(div);

	div = document.createElement("div");
	div.style = "width: 100%; height: 50px; padding: 9px 0 0 0; word-wrap: break-word;";
	div.innerHTML = `&nbsp;${message}`;
	content.appendChild(div);
	
}

function outputError(e, message) {

	console.error(e);

	const content = document.getElementById("content-box");
	document.body.style.backgroundImage = "linear-gradient(#440, black)";

	let div = document.createElement("div");
	div.style = "float: left;";

	let img = document.createElement("img");
	img.className = "icon";
	img.style = "box-shadow: 0 0 50px #ff0;";
	img.src = "img/error.png";
	img.alt = "Error!";
	div.appendChild(img);
	content.appendChild(div);

	div = document.createElement("div");
	div.style = "width: 100%; height: 50px; padding: 9px 0 0 0; word-wrap: break-word;";
	div.innerHTML = `&nbsp;${message}`;
	content.appendChild(div);
	
}

function outputText(message) {

	const content = document.getElementById("content-box");

	let div = document.createElement("div");
	div.style = "width: 100%; height: 50px; padding: 9px 0 0 0; word-wrap: break-word;";
	div.innerHTML = `&nbsp;${message}`;
	content.appendChild(div);

}
