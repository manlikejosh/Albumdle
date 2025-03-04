import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { compareArrays, compareNumbers } from "../../utilities/guessUtils";
import { Album } from "../../types/types";

type GuessProps = {
  userGuess: Album;
  correctGuess: Album;
  isNew?: boolean; // Optional prop to indicate a new guess... this shit don't work
};

const Guess: React.FC<GuessProps> = ({
  userGuess,
  correctGuess,
  isNew = false,
}) => {
  const colorsMemoized = useMemo(() => {
    let tempColors: { [key: string]: string } = {};

    // if they have the same title, it is the same album
    if (userGuess.title === correctGuess.title) {
      tempColors = {
        title: "bg-green-300",
        artist: "bg-green-300",
        rating: "bg-green-300",
        ratingRotate: "opacity-0",
        date: "bg-green-300",
        dateRotate: "opacity-0",
        mainGenre: "bg-green-300",
        subGenre: "bg-green-300",
        ranking: "bg-green-300",
        rankingRotate: "opacity-0",
      };
    } else {
      // titles are different
      tempColors.title = "bg-red-300";

      // Compare genre

      if (
        userGuess.main_genre.every((el) => correctGuess.main_genre.includes(el))
      ) {
        tempColors.mainGenre = "bg-green-300";
      } else {
        const matches = compareArrays(
          correctGuess.main_genre,
          userGuess.main_genre
        );
        tempColors.mainGenre =
          matches.length > 0 ? "bg-yellow-300" : "bg-red-300";
      }

      // Compare sub genre

      if (
        userGuess.sub_genre.every((el) => correctGuess.sub_genre.includes(el))
      ) {
        tempColors.subGenre = "bg-green-300";
      } else {
        const matches = compareArrays(
          correctGuess.sub_genre,
          userGuess.sub_genre
        );
        tempColors.subGenre =
          matches.length > 0 ? "bg-yellow-300" : "bg-red-300";
      }

      // Compare date
      const dateStyle = compareNumbers(correctGuess.date, userGuess.date, 10);
      tempColors.date = dateStyle[0];
      tempColors.dateRotate = dateStyle[1];

      // Compare rating
      const ratingStyles = compareNumbers(
        correctGuess.rating,
        userGuess.rating,
        0.5
      );
      tempColors.rating = ratingStyles[0];
      tempColors.ratingRotate = ratingStyles[1];

      // Compare ranking - switch em up cause number 1 is best on this
      const rankingStyles = compareNumbers(
        userGuess.ranking,
        correctGuess.ranking,
        10
      );
      tempColors.ranking = rankingStyles[0];
      tempColors.rankingRotate = rankingStyles[1];

      // Compare artist
      tempColors.artist =
        userGuess.artist === correctGuess.artist
          ? "bg-green-300"
          : "bg-red-300";
    }

    return tempColors;
  }, [userGuess, correctGuess]);

  // Only apply the fade-in animation if this is the newest guess... this shit doesn't work
  const animationClasses = isNew ? "SHITNEW animate-appear delay-700" : "";

  return (
    <div
      className={`min-w-[680px] max-w-[60vw] sm:p-2 gap-2 grid grid-cols-8 my-2 justify-items-center l text-sm ${animationClasses}`}
    >
      {/* Image */}
      <div className="h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg overflow-hidden flex items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src={userGuess.cover_url}
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

      {/* Rating */}
      <div
        className={`relative h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg flex items-center justify-center ${colorsMemoized.rating}`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center z-0 ${colorsMemoized.ratingRotate}`}
        >
          <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
        </div>
        <div className="relative z-10 font-bold">{userGuess.rating}</div>
      </div>

      {/* date */}
      <div
        className={`relative h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg flex items-center justify-center ${colorsMemoized.date}`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center z-0 ${colorsMemoized.dateRotate}`}
        >
          <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
        </div>
        <div className="relative z-10 font-bold">{userGuess.date}</div>
      </div>

      {/* Main genre */}
      <div
        className={`h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg p-1 ${colorsMemoized.mainGenre} flex items-center justify-center`}
      >
        <div className="break-words hyphens-auto overflow-y-auto text-center">
          {userGuess.main_genre.join(", ")}
        </div>
      </div>

      {/* Sub genre  */}
      <div
        className={`h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg p-1 ${colorsMemoized.subGenre} flex items-center justify-center`}
      >
        <div className="break-words hyphens-auto overflow-y-auto text-center">
          {userGuess.sub_genre.join(", ")}
        </div>
      </div>

      {/* Ranking */}
      <div
        className={`relative h-full w-full min-h-[80px] max-w-[100px] border-2 border-black rounded-lg flex items-center justify-center ${colorsMemoized.ranking}`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center z-0 ${colorsMemoized.rankingRotate}`}
        >
          <FontAwesomeIcon icon={faUpLong} className="text-white text-6xl" />
        </div>
        <div className="relative z-10 font-bold">{userGuess.ranking}</div>
      </div>
    </div>
  );
};

export default React.memo(Guess);
