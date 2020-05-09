/**
 * Converts seconds into a stopwatch time format.
 * @param {Number} seconds - The number of seconds.
 * @returns A formatted string.
 */
function formatTime(ms) {

	return padZeros(Math.floor(ms / 1000 / 60 % 60), 2) + 
	":" + padZeros(Math.floor(ms / 1000 % 60), 2) + 
	"."  + padZeros(Math.floor(ms % 1000), 3);

}

/**
 * Adds trailing zeros to the beginning of a number.
 * @param {Number | String} number - The number to be padded with zeros.
 * @param {Number} length - The maximum string length.
 * @returns The string padded with zeros.
 */
function padZeros(number, length) {

	var string = "" + number;
	while (string.length < length) {
		string = "0" + string;
	}
	return string;

}
