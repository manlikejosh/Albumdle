// RANK IS THE ARRAY INDEX FROM THE JSON FILE
// alt will be the title
// only take the first entry of the genre --- everything before the first comma, if there is no comman take the entire thing
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";

interface Album {
  title: string;
  artist: string;
  ratings: number;
  year: number;
  genres: string[];
  style: string[];
  tracklist: number;
}

type Props = {
  userGuess: Album;
  correctGuess: Album;
};

const Guess = ({ userGuess, correctGuess }: Props) => {
  const clamp = {
    fontSize: "clamp(.4rem, 2.2vw, .7rem)",
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
    let styles: string[] = ["background-color", "arrow-style"];
    if (correctNumebr === guessedNumber) {
      styles[0] = "bg-green-300"; // background color
      styles[1] = "opacity-0"; // hide the arrow
      return styles;
    }

    // test for background color
    if (
      -spread <= guessedNumber - correctNumebr ||
      guessedNumber - correctNumebr >= spread
    ) {
      styles[0] = "bg-yellow-300";
    } else {
      styles[0] = "bg-red-300";
      // console.log("bg test done");
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
      colors.ratingRotate = "opacity-0";

      colors.year = "bg-green-300";
      colors.yearRotate = "opacity-0";

      colors.genres = "bg-green-300";
      colors.style = "bg-green-300";
      colors.tracklist = "bg-green-300";
      colors.tracklistRotate = "opacity-0";

      return true; // we don't need to go any further, everything is true. this will display correct guess
    } else {
      colors.title = "bg-red-300"; // titles are different
    }

    // compare genre, since it is an array, compare to see if values match
    if (userGuess.genres.every((el) => correctGuess.genres.includes(el))) {
      // console.log("genre is a complete match - green");
      colors.genres = "bg-green-300";
    } else {
      const matches = compareArrays(correctGuess.genres, userGuess.genres); // this will give what genres are the same

      if (matches.length > 0) {
        // console.log("genres are similar - yellow");
        colors.genres = "bg-yellow-300";
      } else {
        colors.genres = "bg-red-300";
      }
    }

    // compare date
    const yearStyles = compareNumebrs(correctGuess.year, userGuess.year, 10);
    // console.log(yearStyles);
    colors.year = yearStyles[0]; //bg
    colors.yearRotate = yearStyles[1]; //arrow

    // compare rating
    const ratingStyles = compareNumebrs(
      correctGuess.ratings,
      userGuess.ratings,
      0.5
    );
    colors.ratings = ratingStyles[0]; //bg
    // console.log("rating colors", colors.rating);
    colors.ratingRotate = ratingStyles[1]; //arrow

    // compare artist
    if (userGuess.artist === correctGuess.artist) {
      // console.log("artists match - green");
      colors.artist = "bg-green-300";
    } else {
      // console.log("artists do not match - red");
      colors.artist = "bg-red-300";
    }

    // compare style, since it is an array, compare to see if any values match
    if (userGuess.style.every((el) => correctGuess.style.includes(el))) {
      // console.log("style is a complete match - green");
      colors.style = "bg-green-300";
    } else {
      const styleMatches = compareArrays(correctGuess.style, userGuess.style);

      if (styleMatches.length != 0) {
        // console.log("style are similar - yellow");
        colors.style = "bg-yellow-300";
      } else {
        // console.log("style are not similar - red");
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

  compare(userGuess, correctGuess);

  return (
    <>
      <div
        style={clamp}
        className="w-2/3 min-w-fit max-w-[750px] gap-2 grid grid-cols-4 min-[600px]:grid-cols-8 my-3 justify-items-center font-panton animate-appear delay-700
        "
      >
        {/* image */}
        <div className="aspect-square min-h-fit  w-full max-w-[82px]   content-center text-center rounded-lg">
          <img
            className="rounded-lg border-2  border-black"
            src="https://media.istockphoto.com/id/1361394182/photo/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg?s=612x612&w=0&k=20&c=6yvVxdufrNvkmc50nCLCd8OFGhoJd6vPTNotl90L-vo="
            alt="cool cat"
          />
        </div>

        {/* title */}
        <div
          className={`aspect-square min-h-fit overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colors.title}`}
        >
          {userGuess.title}
        </div>

        {/* artist */}
        <div
          className={`aspect-square min-h-fit overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colors.artist}`}
        >
          {userGuess.artist}
        </div>

        {/* rating */}
        <div
          className={`relative aspect-square min-h-fit overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black text-center rounded-lg flex items-center justify-center ${colors.ratings}`}
        >
          <div
            className={`absolute inset-0 flex items-center justify-center z-0 ${colors.ratingRotate}`}
          >
            <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
          </div>
          <div className="relative z-10 text-black text-xl font-bold">
            {userGuess.ratings}
          </div>
        </div>

        {/* year */}
        <div
          className={`relative aspect-square min-h-fit overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black text-center rounded-lg flex items-center justify-center ${colors.year}`}
        >
          <div
            className={`absolute inset-0 flex items-center justify-center z-0 ${colors.yearRotate}`}
          >
            <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
          </div>
          <div className="relative z-10 text-black text-xl font-bold">
            {userGuess.year}
          </div>
        </div>

        {/* genres */}
        <div
          className={`aspect-square min-h-fit overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg overflow-hidden text-wrap ${colors.genres}`}
        >
          {userGuess.genres.join(" ")}
        </div>

        {/* style */}
        <div
          style={clamp}
          className={`aspect-square min-h-fit overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colors.style}`}
        >
          {userGuess.style.join(" ")}
        </div>

        {/* tracklsit */}
        <div
          className={`relative aspect-square min-h-fit overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black text-center rounded-lg flex items-center justify-center ${colors.tracklist}`}
        >
          <div
            className={`absolute inset-0 flex items-center justify-center z-0 ${colors.tracklistRotate}`}
          >
            <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
          </div>
          <div className="relative z-10 text-black text-xl font-bold">
            {userGuess.tracklist}
          </div>
        </div>
      </div>
    </>
  );
};

export default Guess;
