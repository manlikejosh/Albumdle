import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";

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

  const compareArrays = (
    correctArray: ReadonlyArray<string>,
    userGuess: ReadonlyArray<string>
  ) => {
    const setArr2 = new Set(correctArray);
    return userGuess.filter((item) => setArr2.has(item)); // Find matching entries
  };

  const compareNumbers = (
    correctNumber: number,
    guessedNumber: number,
    spread: number
  ) => {
    let styles: string[] = ["background-color", "arrow-style"];
    if (correctNumber === guessedNumber) {
      styles[0] = "bg-green-300"; // background color
      styles[1] = "opacity-0"; // hide the arrow
    } else if (Math.abs(guessedNumber - correctNumber) <= spread) {
      styles[0] = "bg-yellow-300"; // Close enough, yellow
      styles[1] = guessedNumber < correctNumber ? "" : "rotate-180"; // arrow up/down
    } else {
      styles[0] = "bg-red-300"; // far off, red
      styles[1] = guessedNumber < correctNumber ? "" : "rotate-180";
    }
    return styles;
  };

  const colorsMemoized = useMemo(() => {
    let tempColors: { [key: string]: string } = {};

    if (userGuess.title === correctGuess.title) {
      tempColors = {
        title: "bg-green-300",
        artist: "bg-green-300",
        ratings: "bg-green-300",
        ratingRotate: "opacity-0",
        year: "bg-green-300",
        yearRotate: "opacity-0",
        genres: "bg-green-300",
        style: "bg-green-300",
        tracklist: "bg-green-300",
        tracklistRotate: "opacity-0",
      };
    } else {
      tempColors.title = "bg-red-300"; // titles are different

      // Compare genre
      if (userGuess.genres.every((el) => correctGuess.genres.includes(el))) {
        tempColors.genres = "bg-green-300";
      } else {
        const matches = compareArrays(correctGuess.genres, userGuess.genres);
        tempColors.genres = matches.length > 0 ? "bg-yellow-300" : "bg-red-300";
      }

      // Compare year
      const yearStyles = compareNumbers(correctGuess.year, userGuess.year, 10);
      tempColors.year = yearStyles[0]; // bg
      tempColors.yearRotate = yearStyles[1]; // arrow

      // Compare ratings
      const ratingStyles = compareNumbers(
        correctGuess.ratings,
        userGuess.ratings,
        0.5
      );
      tempColors.ratings = ratingStyles[0]; // bg
      tempColors.ratingRotate = ratingStyles[1]; // arrow

      // Compare artist
      tempColors.artist =
        userGuess.artist === correctGuess.artist
          ? "bg-green-300"
          : "bg-red-300";

      // Compare style
      const styleMatches = compareArrays(correctGuess.style, userGuess.style);
      tempColors.style =
        styleMatches.length > 0 ? "bg-yellow-300" : "bg-red-300";

      // Compare tracklist
      const tracklistStyles = compareNumbers(
        correctGuess.tracklist,
        userGuess.tracklist,
        2
      );
      tempColors.tracklist = tracklistStyles[0]; // bg
      tempColors.tracklistRotate = tracklistStyles[1]; // arrow
    }

    return tempColors;
  }, [userGuess, correctGuess]); // Dependencies: only re-run if these change

  return (
    <div
      style={clamp}
      className=" min-w-[680px] sm:p-2  gap-2 grid  grid-cols-8 my-3 justify-items-center font-panton animate-appear delay-700"
    >
      {/* Image */}
      <div className="aspect-square min-h-fit min-w-[50px] w-full max-w-[82px] content-center text-center rounded-lg">
        <img
          className="rounded-lg border-2 border-black"
          src="https://media.istockphoto.com/id/1361394182/photo/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg?s=612x612&w=0&k=20&c=6yvVxdufrNvkmc50nCLCd8OFGhoJd6vPTNotl90L-vo="
          alt="cool cat"
        />
      </div>

      {/* Title */}
      <div
        className={`aspect-square min-h-fit min-w-[50px] overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colorsMemoized.title}`}
      >
        {userGuess.title}
      </div>

      {/* Artist */}
      <div
        className={`aspect-square min-h-fit min-w-[50px] overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colorsMemoized.artist}`}
      >
        {userGuess.artist}
      </div>

      {/* Ratings */}
      <div
        className={`relative aspect-square min-h-fit min-w-[50px] overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black text-center rounded-lg flex items-center justify-center ${colorsMemoized.ratings}`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center z-0 ${colorsMemoized.ratingRotate}`}
        >
          <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
        </div>
        <div className="relative z-10 text-black text-xl font-bold">
          {userGuess.ratings}
        </div>
      </div>

      {/* Year */}
      <div
        className={`relative aspect-square min-h-fit min-w-[50px] overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black text-center rounded-lg flex items-center justify-center ${colorsMemoized.year}`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center z-0 ${colorsMemoized.yearRotate}`}
        >
          <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
        </div>
        <div className="relative z-10 text-black text-xl font-bold">
          {userGuess.year}
        </div>
      </div>

      {/* Genres */}
      <div
        className={`aspect-square min-h-fit min-w-[50px] overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg overflow-hidden text-wrap ${colorsMemoized.genres}`}
      >
        {userGuess.genres.join(" ")}
      </div>

      {/* Style */}
      <div
        style={clamp}
        className={`aspect-square min-h-fit min-w-[50px] overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colorsMemoized.style}`}
      >
        {userGuess.style.join(" ")}
      </div>

      {/* Tracklist */}
      <div
        className={`relative aspect-square min-h-fit min-w-[50px] overflow-y-scroll overflow-x-hidden px-2 p-2 w-full max-w-[82px] border-2 border-black text-center rounded-lg flex items-center justify-center ${colorsMemoized.tracklist}`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center z-0 ${colorsMemoized.tracklistRotate}`}
        >
          <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
        </div>
        <div className="relative z-10 text-black text-xl font-bold">
          {userGuess.tracklist}
        </div>
      </div>
    </div>
  );
};

export default Guess;
