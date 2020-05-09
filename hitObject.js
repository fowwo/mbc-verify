
function ParseHitObject(string) {

	const line = string.split(",");
	const x = line[0];
	const y = line[1];
	const time = line[2];
	const type = line[3];
	const combo = bit(type, 2) === 1; // for combo skip number: toDecimal("" + bit(type, 6) + bit(type, 5) + bit(type, 4));
	const hitSound = line[4];
	const hitSample = line[line.length - 1];

	if (bit(type, 0)) {
		return new Circle(x, y, time, combo, hitSound, hitSample);
	} else if (bit(type, 1)) {
		return new Slider(x, y, time, combo, hitSound, line[5], line[6], line[7], line[8], line[9], hitSample);
	} else if (bit(type, 3)) {
		return new Spinner(time, hitSound, line[5], hitSample);
	} else {
		console.warn(`uh oh... stinky... (this hitobject has an invalid type: ${type})`);
		return null;
	}

}

// x, y, time, type, hitSound, objectParams, hitSample

// x, y, time, type, hitSound, hitSample

function Circle(x, y, time, newCombo, hitSound, hitSample) {

	this.x = parseInt(x);
	this.y = parseInt(y);
	this.time = parseInt(time);
	this.newCombo = newCombo;
	this.hitSound = parseInt(hitSound);
	this.hitSample = hitSample;

}

// x, y, time, type, hitSound, curveType|curvePoints, slides, length, edgeSounds, edgeSets, hitSample
function Slider(x, y, time, newCombo, hitSound, curve, slides, length, edgeSounds, edgeSets, hitSample) {

	this.x = parseInt(x);
	this.y = parseInt(y);
	this.time = parseInt(time);
	this.newCombo = newCombo;
	this.hitSound = parseInt(hitSound);
	this.curve = curve;
	this.slides = parseInt(slides);
	this.length = parseFloat(length);
	this.edgeSounds = edgeSounds;
	this.edgeSets = edgeSets;
	this.hitSample = hitSample;

	this.getDuration = (difficulty, timingPoints) => {
		
		var beatLength;
		var multiplier;
		for (var i = 0; i < timingPoints.length; i++) {
			let t = timingPoints[i];
			if (t.time > this.time) {
				break;
			}
			if (t.uninherited) {
				beatLength = t.beatLength;
				multiplier = 1;
			} else {
				multiplier = -100 / t.beatLength;
			}
		}
		if (beatLength == undefined) {
			console.warn("bro... where's the uninherited timing point");
			return;
		}

		return Math.round(length / (difficulty.sliderMultiplier * 100) * (beatLength / multiplier) * slides * 1000) / 1000;
	
	}

}

// x, y, time, type, hitSound, endTime, hitSample
function Spinner(time, hitSound, endTime, hitSample) {

	this.time = parseInt(time);
	this.endTime = parseInt(endTime);
	this.hitSound = parseInt(hitSound);
	this.hitSample = hitSample;

	this.getDuration = () => {
		return endTime - time;
	}

}
