

const lengthInput = document.getElementById("lengthPass");
const lengthValue = document.getElementById("lengthValue");

const chars = {
  numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  symbols: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-","+", "=", "{", "[", "}", "]", ";", ":", "<", ",", ">", ".", "?", "/"],
  upperCase: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
  "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
  "W", "X", "Y", "Z"],
  lowerCase: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
  "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
  "w", "x", "y", "z"]
};
//console.log(Object.keys(chars.numbers).length);

/** Update the value of the length */
lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value; 
});