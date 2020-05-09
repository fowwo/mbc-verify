function ParseDifficulty(array) {

	const HPDrainRate = array[1].split(":")[1];
	const circleSize = array[2].split(":")[1];
	const overallDifficulty = array[3].split(":")[1];
	const approachRate = array[4].split(":")[1];
	const sliderMultiplier = array[5].split(":")[1];
	const sliderTickRate = array[6].split(":")[1];

	return new Difficulty(HPDrainRate, circleSize, overallDifficulty, approachRate, sliderMultiplier, sliderTickRate);

}

function Difficulty(HPDrainRate, circleSize, overallDifficulty, approachRate, sliderMultiplier, sliderTickRate) {

	this.HPDrainRate = parseFloat(HPDrainRate);
	this.circleSize = parseFloat(circleSize);
	this.overallDifficulty = parseFloat(overallDifficulty);
	this.approachRate = parseFloat(approachRate);
	this.sliderMultiplier = parseFloat(sliderMultiplier);
	this.sliderTickRate = parseFloat(sliderTickRate);

}
