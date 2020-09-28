export const isNumeric = input => {
  return !isNaN(input);
}

export const isNumericOrFloat = inputArray => {
  return inputArray.every(input => isNumeric(input));
}