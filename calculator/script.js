/**Input where the password is shown */
const passwordInput = document.getElementById("password-field");
/**Copy button element */
const copyButton = document.getElementById("copy-password");
/**Button generate password element */
const generateButton = document.getElementById("generate-button");
/**Range input */
const lengthPassInput = document.getElementById("lengthPass");
/**Span field showing the number of characters */
const lengthPassValue = document.getElementById("lengthPassValue");
/**Input elements with checkboxes */
const includeLower = document.getElementById("includeLower");
const includeUpper = document.getElementById("includeUpper");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");

/**Array of symbols */
const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-","+", "=", "{", "[", "}", "]", ";", ":", "<", ",", ">", ".", "?", "/"];

let selectedChars = [];
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
  
function generatePassword() {
  /** const to save the value of the slider */
  const lengthPass = parseInt(lengthPassInput.value);

  if (includeLower.checked) {
    selectedChars = selectedChars.concat(Array.from({ length: lengthPass }, getLowerCase));
  }
  if (includeUpper.checked) {
    selectedChars = selectedChars.concat(Array.from({ length: lengthPass }, getUpperCase));
  }
  if (includeNumbers.checked) {
    selectedChars = selectedChars.concat(Array.from({ length: lengthPass }, getNumber));
  }
  if (includeSymbols.checked) {
    selectedChars = selectedChars.concat(Array.from({ length: lengthPass }, getSymbol));
  }

  if (selectedChars.length === 0) {
    return ("Please select at least one option.");
  }

  let password = "";
  for (let i = 0; i < lengthPass; i++) {
    const randomIndex = Math.floor(Math.random() * selectedChars.length);
    password += selectedChars[randomIndex];
  }

  return password;
}

/** Update the value of the lengthPass */
lengthPassInput.addEventListener("input", () => {
  lengthPassValue.textContent = lengthPassInput.value;
  const password = generatePassword();
  passwordInput.value = password; 
});

generateButton.addEventListener("click", () => {
  const password = generatePassword();
  passwordInput.value = password;
});

/**Preventing selection of the password with the mouse */
passwordInput.addEventListener("mousedown", event => {
  event.preventDefault();
});

/** Adding a functionality to copy button */
copyButton.addEventListener("click", () => {
  if (
    passwordInput.value && 
    selectedChars.length > 0
    ) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(passwordInput.value)
        .then(() => {
          alert("Password copied to clipboard")
          /** Future idea to create a personalized alert message*/
          // let copyAlert = document.createElement("div");
          // copyAlert.classList.add("alert")
          // copyAlert.textContent = "Copied";
          // document.body.appendChild(copyAlert);
        })
        .catch((error) => {
          alert("Copy failed:", error);
        });
        
        /** Future idea to create a personalized alert message */
        // setTimeout(() => {
        //   document.querySelector(".alert").style.display = "none";
        //   document.body.removeChild(copyAlert);
        // }, 2000);
    }
  }

});