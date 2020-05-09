function ParseTimingPoint(string) {

	const line = string.split(",");
	return new TimingPoint(line[0], line[1], line[2], line[3], line[4], line[5], line[6] == "1", line[7]);

}

// time, beatLength, meter, sampleSet, sampleIndex, volume, uninherited, effects

function TimingPoint(time, beatLength, meter, sampleSet, sampleIndex, volume, uninherited, effects) {

	this.time = time;
	this.beatLength = beatLength;
	this.meter = meter;
	this.sampleSet = sampleSet;
	this.sampleIndex = sampleIndex;
	this.volume = volume;
	this.uninherited = uninherited;
	this.effects = effects;

	this.bpm = () => {
		return 100 / beatLength;
	}

}
