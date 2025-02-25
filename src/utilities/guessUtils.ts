export const compareArrays = (
  correctArray: ReadonlyArray<string>,
  userGuess: ReadonlyArray<string>
): string[] => {
  const setArr2 = new Set(correctArray);
  return userGuess.filter((item) => setArr2.has(item));
};

export const compareNumbers = (
  correctNumber: number,
  guessedNumber: number,
  spread: number
): [string, string] => {
  let bgStyle: string;
  let arrowStyle: string;

  if (correctNumber === guessedNumber) {
    bgStyle = "bg-green-300";
    arrowStyle = "opacity-0";
  } else if (Math.abs(guessedNumber - correctNumber) <= spread) {
    bgStyle = "bg-yellow-300";
    arrowStyle = guessedNumber < correctNumber ? "" : "rotate-180";
  } else {
    bgStyle = "bg-red-300";
    arrowStyle = guessedNumber < correctNumber ? "" : "rotate-180";
  }
  return [bgStyle, arrowStyle];
};
