/**Input where the password is shown */
const passwordInput = document.getElementById("password-field");
/** */
const generateButton = document.getElementById("generate-button");
/**Range input */
const lengthInput = document.getElementById("lengthPass");
/**Span field showing the number of characters */
const lengthValue = document.getElementById("lengthValue");
/**Input elements */
const includeLower = document.getElementById("includeLower");
const includeUpper = document.getElementById("includeUpper");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");

/**Array of symbols */
const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-","+", "=", "{", "[", "}", "]", ";", ":", "<", ",", ">", ".", "?", "/"];
/** Getting one symbol */
function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)]
}
 
function getLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
  


/** Update the value of the length */
lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value; 
});

generateButton.addEventListener("click", () => {
  const password = generatePassword();
  passwordInput.value = password;
});