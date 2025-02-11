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
  const compareArrays = (
    correctArray: ReadonlyArray<string>,
    userGuess: ReadonlyArray<string>
  ) => {
    const setArr2 = new Set(correctArray);
    return userGuess.filter((item) => setArr2.has(item));
  };

  const compareNumbers = (
    correctNumber: number,
    guessedNumber: number,
    spread: number
  ) => {
    let styles: string[] = ["background-color", "arrow-style"];
    if (correctNumber === guessedNumber) {
      styles[0] = "bg-green-300";
      styles[1] = "opacity-0";
    } else if (Math.abs(guessedNumber - correctNumber) <= spread) {
      styles[0] = "bg-yellow-300";
      styles[1] = guessedNumber < correctNumber ? "" : "rotate-180";
    } else {
      styles[0] = "bg-red-300";
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
  }, [userGuess, correctGuess]);

  return (
    <div className="min-w-[680px] max-w-[60vw] sm:p-2 gap-2 grid grid-cols-8 my-2 border border-black justify-items-center font-panton animate-appear delay-700 text-sm">
      {/* Image */}
      <div className="h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg overflow-hidden flex items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src="https://media.istockphoto.com/id/1361394182/photo/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg"
          alt="Album cover"
        />
      </div>

      {/* Title */}
      <div
        className={`h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg p-1 ${colorsMemoized.title} flex items-center justify-center`}
      >
        <div className="break-words hyphens-auto overflow-y-auto text-center">
          {userGuess.title}
        </div>
      </div>

      {/* Artist */}
      <div
        className={`h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg p-1 ${colorsMemoized.artist} flex items-center justify-center`}
      >
        <div className="break-words hyphens-auto overflow-y-auto text-center">
          {userGuess.artist}
        </div>
      </div>

      {/* Ratings */}
      <div
        className={`relative h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg flex items-center justify-center ${colorsMemoized.ratings}`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center z-0 ${colorsMemoized.ratingRotate}`}
        >
          <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
        </div>
        <div className="relative z-10 font-bold">{userGuess.ratings}</div>
      </div>

      {/* Year */}
      <div
        className={`relative h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg flex items-center justify-center ${colorsMemoized.year}`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center z-0 ${colorsMemoized.yearRotate}`}
        >
          <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
        </div>
        <div className="relative z-10 font-bold">{userGuess.year}</div>
      </div>

      {/* Genres */}
      <div
        className={`h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg p-1 ${colorsMemoized.genres} flex items-center justify-center`}
      >
        <div className="break-words hyphens-auto overflow-y-auto text-center">
          {userGuess.genres.join(", ")}
        </div>
      </div>

      {/* Style */}
      <div
        className={`h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg p-1 ${colorsMemoized.style} flex items-center justify-center`}
      >
        <div className="break-words hyphens-auto overflow-y-auto text-center">
          {userGuess.style.join(", ")}
        </div>
      </div>

      {/* Tracklist */}
      <div
        className={`relative h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg flex items-center justify-center ${colorsMemoized.tracklist}`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center z-0 ${colorsMemoized.tracklistRotate}`}
        >
          <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
        </div>
        <div className="relative z-10 font-bold">{userGuess.tracklist}</div>
      </div>
    </div>
  );
};

export default Guess;
