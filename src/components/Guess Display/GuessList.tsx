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
      className="guess-area px-2 pt-5 w-full max-[553px]:overflow-x-auto  min-[553px]:flex min-[553px]:flex-col min-[553px]:items-center   "
    >
      {[...guessedAlbums].reverse().map((album, index) => (
        <Guess
          userGuess={album}
          correctGuess={correctGuess}
          key={index}
          isNew={index === guessedAlbums.length} // Only the first (newest) guess gets the fade-in effect... this shit doesn't work
        />
      ))}
    </div>
  );
};

export default React.memo(GuessList);
