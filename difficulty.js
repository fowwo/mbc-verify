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

	this.HPDrainRate = HPDrainRate;
	this.circleSize = circleSize;
	this.overallDifficulty = overallDifficulty;
	this.approachRate = approachRate;
	this.sliderMultiplier = sliderMultiplier;
	this.sliderTickRate = sliderTickRate;

}
