// ATM machines allow 4 or 6 digit PIN codes and PIN codes cannot contain anything but exactly 4 digits or exactly 6 digits.
//
// If the function is passed a valid PIN string, return true, else return false.
//
// eg:
//
// validatePIN("1234") === true
// validatePIN("12345") === false
// validatePIN("a234") === false


function validatePIN (pin) {
  if (!isNaN(pin)) {
    if (pin.replace(/^[0-9]+$/).length === 4 || pin.replace(/^[0-9]+$/).length === 6)
    return(true); else {
      return(false);
    }
  }
  return(false);
}


validatePIN('1234');
