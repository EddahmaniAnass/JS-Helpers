const lookup = Object.freeze({
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M",
});

function convert(number) {
    let solution = "";
    const lookupArray = Object.entries(lookup);

    if (number <= 0 || number > 4000) {
        solution = 'Overflow';
    } else {
        for (let i = lookupArray.length - 1; i >= 0; i--) {
            while (number >= lookupArray[i][0]) {
                solution += lookupArray[i][1]
                number -= lookupArray[i][0]
            }
        }
    }
    console.log(solution);
}