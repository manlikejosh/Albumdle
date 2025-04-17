import React from "react";
import { Album } from "../../types/types";
import Guess from "./Guess";

interface GuessListProps {
  guessedAlbums: Album[];
  correctGuess: Album;
}

const GuessList: React.FC<GuessListProps> = ({
  guessedAlbums,
  correctGuess,
}) => {
  return (
    <div
      id="guessArea"
      className="guess-area px-2 pt-5 w-full max-[553px]:overflow-x-auto max-[553px]:overflow-y-none max-[553px]:absolute min-[553px]:flex min-[553px]:flex-col min-[553px]:items-center "
    >
      <ul className="min-w-[680px] w-[60vw] sm:p-2 gap-2 grid grid-cols-8 justify-items-center text-xs ">
        <li className="  w-full  max-w-[100px] flex items-center justify-center">
          Cover
        </li>
        <li className="  w-full  max-w-[100px] flex items-center justify-center">
          Album Title
        </li>
        <li className="  w-full  max-w-[100px] flex items-center justify-center">
          Artist Name
        </li>
        <li className="  w-full  max-w-[100px] flex items-center justify-center">
          RYM Rating
        </li>
        <li className="  w-full  max-w-[100px] flex items-center justify-center">
          Release Year
        </li>
        <li className="  w-full  max-w-[100px] flex items-center justify-center">
          Main Genre
        </li>
        <li className="  w-full  max-w-[100px] flex items-center justify-center">
          Sub Genre
        </li>
        <li className="  w-full  max-w-[100px] flex items-center justify-center">
          RYM Ranking
        </li>
      </ul>
      <div>
        {[...guessedAlbums].reverse().map((album, index) => (
          <Guess
            userGuess={album}
            correctGuess={correctGuess}
            key={index}
            isNew={index === guessedAlbums.length} // Only the first (newest) guess gets the fade-in effect... this shit doesn't work
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(GuessList);
