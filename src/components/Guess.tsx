// RANK IS THE ARRAY INDEX FROM THE JSON FILE
// alt will be the title
// only take the first entry of the genre --- everything before the first comma, if there is no comman take the entire thing
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";

interface Album {
  title: string;
  artist: string;
  rating: number;
  year: number;
  genres: ReadonlyArray<string>;
  style: ReadonlyArray<string>;
  tracklist: number;
}

// album {
//   "title": "Channel Orange",
//     "artist": "Frank Ocean",
//     "ratings": 4.51,
//     "year": 2012,
//     "genres": ["Hip Hop", "Funk / Soul", "Pop"],
//     "style": ["Soul", "Contemporary R&B"],
//     "tracklist": 17
// }
const Guess = (userGuess: Album, correctGuess: Album) => {
  const clamp = {
    fontSize: "clamp(.5rem, 2.2vw, .8rem)",
  };
  let colors: { [key: string]: string } = {};

  const compareArrays = (
    correctArray: ReadonlyArray<string>,
    userGuess: ReadonlyArray<string>
  ) => {
    // Convert one of the arrays to a Set for faster lookups
    const setArr2 = new Set(correctArray);

    // Find matching entries
    const matches = userGuess.filter((item) => setArr2.has(item));

    return matches;
  };

  const compareNumebrs = (
    correctNumebr: number,
    guessedNumber: number,
    spread: number
  ) => {
    let styles: Array<string> = ["background-color", "arrow-style"];
    if (correctNumebr === guessedNumber) {
      styles[0] = "bg-green-300"; // background color
      styles[1] = "hide"; // hide the arrow
      return styles;
    }

    // test for background color
    if (
      spread <= userGuess.year - correctGuess.year ||
      userGuess.year - correctGuess.year >= spread
    ) {
      console.log("date is within 10 years - yellow");
      colors.year = "bg-yellow-300";
    } else {
      console.log("dates are not close - red");
      colors.year = "bg-red-300";
    }

    // test for arrow
    if (guessedNumber < correctNumebr) {
      styles[1] = " "; // arrow up (default)
    } else if (guessedNumber > correctNumebr) {
      styles[1] = "rotate-180"; // arrow down
    }

    return styles;
  };

  const compare = (userGuess: Album, correctGuess: Album) => {
    if (userGuess.title === correctGuess.title) {
      colors.title = "bg-green-300";
      colors.artist = "bg-green-300";
      colors.ratings = "bg-green-300";
      colors.year = "bg-green-300";
      colors.genres = "bg-green-300";
      colors.style = "bg-green-300";
      colors.tracklist = "bg-green-300";
      return true; // we don't need to go any further, everything is true. this will display correct guess
    } else {
      colors.title = "bg-red-300"; // titles are different
    }

    // compare genre, since it is an array, compare to see if values match
    if (userGuess.genres.every((el) => correctGuess.genres.includes(el))) {
      console.log("genre is a complete match - green");
      colors.genres = "bg-green-300";
    } else {
      const matches = compareArrays(correctGuess.genres, userGuess.genres); // this will give what genres are the same

      if (matches.length > 0) {
        console.log("genres are similar - yellow");
        colors.genres = "bg-yellow-300";
      } else {
        console.log("genres are not similar - red");
        colors.gneres = "bg-red-300";
      }
    }

    // compare date
    const yearStyles = compareNumebrs(correctGuess.year, userGuess.year, 10);
    colors.year = yearStyles[0]; //bg
    colors.yearRotate = yearStyles[1]; //arrow

    // compare rating
    const ratingStyles = compareNumebrs(
      correctGuess.rating,
      userGuess.rating,
      0.5
    );
    colors.rating = ratingStyles[0]; //bg
    colors.ratingRotate = ratingStyles[1]; //arrow

    // compare artist
    if (userGuess.artist === correctGuess.artist) {
      console.log("artists match - green");
      colors.artist = "bg-green-300";
    } else {
      console.log("artists do not match - red");
      colors.artist = "bg-red-300";
    }

    // compare style, since it is an array, compare to see if any values match
    if (userGuess.style.every((el) => correctGuess.style.includes(el))) {
      console.log("genre is a complete match - green");
      colors.style = "bg-green-300";
    } else {
      const styleMatches = compareArrays(correctGuess.style, userGuess.style);

      if (styleMatches.length != 0) {
        console.log("style are similar - yellow");
        colors.style = "bg-yellow-300";
      } else {
        console.log("style are not similar - red");
        colors.style = "bg-red-300";
      }
    }

    // compare number of tracks
    const tracklistStyles = compareNumebrs(
      correctGuess.tracklist,
      userGuess.tracklist,
      2
    );
    colors.tracklist = tracklistStyles[0]; //bg
    colors.tracklistRotate = tracklistStyles[1]; //arrow
  };

  const verify = compare(userGuess, correctGuess);
  if (verify === true) {
    console.log("you guessed the correct ablbum, nice job");
  }

  return (
    <>
      <div
        style={clamp}
        className="w-2/3 min-w-fit max-w-[750px] gap-2 grid grid-cols-4 min-[600px]:grid-cols-8 my-3 justify-items-center font-panton 
        "
      >
        {/* image */}
        <div className="aspect-square min-h-fit  w-full max-w-[82px]   content-center text-center rounded-lg">
          <img
            className="rounded-lg border-2  border-black"
            src="poopy"
            alt="Pink Moon"
          />
        </div>

        {/* title */}
        <div
          className={`aspect-square  min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colors.title}`}
        >
          {userGuess.title}
        </div>

        {/* artist */}
        <div
          className={`aspect-square  min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colors.artist}`}
        >
          {userGuess.artist}
        </div>

        {/* rating */}
        <div
          className={`relative aspect-square  min-h-fit p-1 w-full max-w-[82px] border-2 border-black text-center rounded-lg flex items-center justify-center ${colors.rating}`}
        >
          <div className="absolute inset-0 flex items-center justify-center z-0 opacity-0">
            <FontAwesomeIcon icon={faUpLong} className="text-white text-7xl" />
          </div>
          <div className="relative z-10 text-black text-2xl font-bold">
            {userGuess.rating}
          </div>
        </div>

        {/* year */}
        <div
          className={`aspect-square   min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colors.year}`}
        >
          {userGuess.year}
        </div>

        {/* genres */}
        <div
          className={`aspect-square text-[.55rem]  min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg overflow-hidden text-wrap ${colors.genres}`}
        >
          {userGuess.genres}
        </div>

        {/* style */}
        <div
          style={clamp}
          className={`aspect-square min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colors.style}`}
        >
          {userGuess.style}
        </div>

        {/* tracklsit */}
        <div
          className={`relative aspect-square  min-h-fit p-1 w-full max-w-[82px] border-2 border-black text-center rounded-lg flex items-center justify-center ${colors.tracklist}`}
        >
          <div className="absolute inset-0 flex items-center justify-center z-0 opacity-0">
            <FontAwesomeIcon icon={faUpLong} className="text-white text-7xl" />
          </div>
          <div className="relative z-10 text-black text-2xl font-bold">
            {userGuess.tracklist}
          </div>
        </div>
      </div>
    </>
  );
};

export default Guess;
