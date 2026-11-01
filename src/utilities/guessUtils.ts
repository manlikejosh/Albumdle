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

  // round the difference so float math doesn't break it (4.3 - 4.1 = 0.20000000000000018)
  const difference = Math.round(Math.abs(guessedNumber - correctNumber) * 100) / 100;

  if (correctNumber === guessedNumber) {
    bgStyle = "bg-green-300";
    arrowStyle = "opacity-0";
  } else if (difference <= spread) {
    bgStyle = "bg-yellow-300";
    arrowStyle = guessedNumber < correctNumber ? "" : "rotate-180";
  } else {
    bgStyle = "bg-red-300";
    arrowStyle = guessedNumber < correctNumber ? "" : "rotate-180";
  }
  return [bgStyle, arrowStyle];
};

// Broad genre families - if a genre name has the keyword in it, it belongs to that family
// a genre can be in more than one family (Jazz Rap is Hip Hop and Jazz)
const genreFamilies: [string, string][] = [
  ["Metal", "Metal"],
  ["Rock", "Rock"],
  ["Grunge", "Rock"],
  ["Shoegaze", "Rock"],
  ["Prog", "Rock"],
  ["Jam Band", "Rock"],
  ["Punk", "Punk"],
  ["Post-Hardcore", "Punk"],
  ["Emo", "Punk"],
  ["New Wave", "Punk"],
  ["Coldwave", "Punk"],
  ["Pop", "Pop"],
  ["Dance", "Pop"],
  ["Hip Hop", "Hip Hop"],
  ["Rap", "Hip Hop"],
  ["Boom Bap", "Hip Hop"],
  ["Turntablism", "Hip Hop"],
  ["Jazz", "Jazz"],
  ["Bop", "Jazz"],
  ["Big Band", "Jazz"],
  ["Third Stream", "Jazz"],
  ["Soul", "Soul/R&B"],
  ["R&B", "Soul/R&B"],
  ["Funk", "Soul/R&B"],
  ["Afrobeat", "Soul/R&B"],
  ["Folk", "Folk"],
  ["Singer-Songwriter", "Folk"],
  ["Americana", "Folk"],
  ["Country", "Folk"],
  ["Acoustic", "Folk"],
  ["MPB", "Folk"],
  ["Electro", "Electronic"],
  ["House", "Electronic"],
  ["Techno", "Electronic"],
  ["IDM", "Electronic"],
  ["Glitch", "Electronic"],
  ["Downtempo", "Electronic"],
  ["Chill", "Electronic"],
  ["Trip Hop", "Electronic"],
  ["Disco", "Electronic"],
  ["Dub", "Electronic"],
  ["Ambient", "Ambient"],
  ["Drone", "Ambient"],
  ["Ethereal", "Ambient"],
  ["Industrial", "Industrial"],
  ["Psych", "Psychedelic"],
  ["Experimental", "Experimental"],
  ["Avant", "Experimental"],
  ["Plunderphonics", "Experimental"],
  ["Sound Collage", "Experimental"],
  ["Field Recordings", "Experimental"],
  ["Totalism", "Experimental"],
  ["Spoken Word", "Experimental"],
  ["Chamber Music", "Classical"],
  ["Soundtrack", "Classical"],
];

const getFamilies = (genres: ReadonlyArray<string>): Set<string> => {
  const families = new Set<string>();
  genres.forEach((genre) => {
    genreFamilies.forEach(([keyword, family]) => {
      if (genre.toLowerCase().includes(keyword.toLowerCase())) {
        families.add(family);
      }
    });
  });
  return families;
};

// green = exact same genres, yellow = share a genre or a family, red = nothing in common
export const compareGenres = (
  correctGenres: ReadonlyArray<string>,
  guessedGenres: ReadonlyArray<string>
): string => {
  const sameLength = correctGenres.length === guessedGenres.length;
  if (sameLength && guessedGenres.every((el) => correctGenres.includes(el))) {
    return "bg-green-300";
  }

  if (compareArrays(correctGenres, guessedGenres).length > 0) {
    return "bg-yellow-300";
  }

  const correctFamilies = getFamilies(correctGenres);
  const sharesFamily = [...getFamilies(guessedGenres)].some((family) =>
    correctFamilies.has(family)
  );
  return sharesFamily ? "bg-yellow-300" : "bg-red-300";
};
