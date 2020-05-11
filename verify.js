var rhythm = "";
fetch("rhythm.txt")
	.then(r => r.text())
	.then(data => {
		rhythm = data;
	});

function verify(fileContent) {

	try {

		const table = document.getElementById("log");
		table.innerHTML = "";
		
		const rawRhythmDifficulty = rhythm.replace(/\r/g, "").match(/(\[Difficulty\])(.+?)((\n){2}|$)/s)[0].trim().split("\n");
		const rawRhythmTimingPoints = rhythm.replace(/\r/g, "").match(/(\[TimingPoints\])(.+?)((\n){2}|$)/s)[0].trim().split("\n");
		const rawRhythmObjects = rhythm.replace(/\r/g, "").match(/(\[HitObjects\])(.+?)((\n){2}|$)/s)[0].trim().split("\n");
			
		var rawDifficulty;
		var rawTimingPoints;
		var rawObjects;
		try {
			rawDifficulty = fileContent.replace(/\r/g, "").match(/(\[Difficulty\])(.+?)((\n){2}|$)/s)[0].trim().split("\n");
		} catch (e) {
			outputError(e, "bro i think something is wrong with your .osu file... (failed to find <b>[Difficulty]</b>)");
			return;
		}
		try {
			rawTimingPoints = fileContent.replace(/\r/g, "").match(/(\[TimingPoints\])(.+?)((\n){2}|$)/s)[0].trim().split("\n");
		} catch (e) {
			outputError(e, "bro i think something is wrong with your .osu file... (failed to find <b>[TimingPoints]</b>)");
			return;
		}
		try {
			rawObjects = fileContent.replace(/\r/g, "").match(/(\[HitObjects\])(.+?)((\n){2}|$)/s)[0].trim().split("\n");
		} catch (e) {
			outputError(e, "bro i think something is wrong with your .osu file... (failed to find <b>[HitObjects]</b>)");
			return;
		}
		
		const rhythmDifficulty = new ParseDifficulty(rawRhythmDifficulty);
		var rhythmTimingPoints = [];
		var rhythmObjects = [];
		
		const difficulty = new ParseDifficulty(rawDifficulty);
		var timingPoints = [];
		var hitObjects = [];
		
		for (var i = 1; i < rawRhythmTimingPoints.length; i++) {
			rhythmTimingPoints.push(ParseTimingPoint(rawRhythmTimingPoints[i]));
		}
		for (var i = 1; i < rawRhythmObjects.length; i++) {
			rhythmObjects.push(ParseHitObject(rawRhythmObjects[i]));
		}
		
		for (var i = 1; i < rawTimingPoints.length; i++) {
			timingPoints.push(ParseTimingPoint(rawTimingPoints[i]));
		}
		for (var i = 1; i < rawObjects.length; i++) {
			hitObjects.push(ParseHitObject(rawObjects[i]));
		}
		
		let circles = 0;
		let sliders = 0;
		let spinners = 0;
		let rhythmCircles = 0;
		let rhythmSliders = 0;
		let rhythmSpinners = 0;

		for (var i = 0; i < rhythmObjects.length; i++) {
			let x = rhythmObjects[i];
			if (x.constructor.name == "Circle") {
				rhythmCircles++;
			} else if (x.constructor.name == "Slider") {
				rhythmSliders++;
			} else if (x.constructor.name == "Spinner") {
				rhythmSpinners++;
			} else {
				console.warn("the heck is this????? " + x);
			}
		}
		for (var i = 0; i < hitObjects.length; i++) {
			let x = hitObjects[i];
			if (x.constructor.name == "Circle") {
				circles++;
			} else if (x.constructor.name == "Slider") {
				sliders++;
			} else if (x.constructor.name == "Spinner") {
				spinners++;
			} else {
				console.warn("the heck is this????? " + x);
			}
		}

		var valid = true;
		if (rhythmCircles != circles) {
			outputFail(null, `This map has <b>${circles} circle${circles != 1 ? "s" : ""}</b> but should have <b>${rhythmCircles}</b>.`);
			valid = false;
		} 
		if (rhythmSliders != sliders) {
			outputFail(null, `This map has <b>${sliders} slider${sliders != 1 ? "s" : ""}</b> but should have <b>${rhythmSliders}</b>.`);
			valid = false;
		}
		if (rhythmSpinners != spinners) {
			outputFail(null, `This map has <b>${spinners} spinner${spinners != 1 ? "s" : ""}</b> but should have <b>${rhythmSpinners}</b>.`);
			valid = false;
		}
		for (var i = 0; i < rhythmObjects.length && i < hitObjects.length; i++) {
			let a = rhythmObjects[i];
			let b = hitObjects[i];
			if (a.time + 2 < b.time || a.time - 2 > b.time) {
				outputFail(formatTime(a.time), `There should be a <b>${a.constructor.name.toLowerCase()}</b> here.`);
				valid = false;
			} else if (a.constructor.name != b.constructor.name) {
				outputFail(formatTime(a.time), `This <b>${b.constructor.name.toLowerCase()}</b> should be a <b>${a.constructor.name.toLowerCase()}</b>.`);
				valid = false;
				break;
			} else if (a.constructor.name == "Slider") {
				if (a.slides != b.slides) {
					if (a.slides > 1) {
						outputFail(formatTime(a.time), `This <b>slider reverses ${b.slides - 1} time${b.slides - 1 != 1 ? "s" : ""}</b> but should <b>reverse ${a.slides - 1} time${a.slides - 1 != 1 ? "s" : ""}</b>.`);
					} else {
						outputFail(formatTime(a.time), `This <b>slider</b> should not <b>reverse</b>.`);
					}
					valid = false;
				} else {
					let rhythmDuration = a.getDuration(rhythmDifficulty, rhythmTimingPoints);
					let duration = b.getDuration(difficulty, timingPoints);
					if (duration < rhythmDuration) {
						outputFail(formatTime(a.time), `This slider is too short. It only lasts <b>${formatTime(duration)}</b> but should last <b>${formatTime(rhythmDuration)}</b>.`);
						valid = false;
					} else if (duration > rhythmDuration) {
						outputFail(formatTime(a.time), `This slider is too long. It lasts <b>${formatTime(duration)}</b> but should only last <b>${formatTime(rhythmDuration)}</b>.`);
						valid = false;
					}
				}
			} else if (a.constructor.name == "Spinner") {
				if (a.duration > b.duration) {
					outputFail(formatTime(a.time), `This spinner is too short. It only lasts <b>${formatTime(b.duration)}</b> but should last <b>${formatTime(a.duration)}</b>.`);
					valid = false;
				} else if (a.duration < b.duration) {
					outputFail(formatTime(a.time), `This spinner is too long. It lasts <b>${formatTime(b.duration)}</b> but should only last <b>${formatTime(a.duration)}</b>.`);
					valid = false;
				}
			}
		}
		if (rhythmObjects.length > hitObjects.length) {
			outputText(`+${rhythmObjects.length - hitObjects.length}${hitObjects.length > 0 ? " other" : ""} missing objects`);
		}
		if (valid) {
			outputSuccess(`This beatmap is <b>valid</b>!`);
		}

	} catch (e) {
		outputError(e, "<b>heck.</b> there is an <b>error</b>. uhhhhh i guess <b>check console log</b> and <b>pm fowwo</b> on osu!.");
	}

}
