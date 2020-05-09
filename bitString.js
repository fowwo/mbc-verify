function toByte(number) {
	return "" + bit(number, 7) + bit(number, 6)+ bit(number, 5)+ bit(number, 4)+ bit(number, 3)+ bit(number, 2)+ bit(number, 1)+ bit(number, 0);
}

function bit(number, position) {
	return (number & (1 << position)) === 0 ? 0 : 1;
}

function toDecimal(bitString) {

	var sum = 0;
	for (var i = 0; i < bitString.length; i++) {
		if (bitString[bitString.length - i - 1] === "1") {
			sum += Math.pow(2, i);
		}
	}
	return sum;

}
