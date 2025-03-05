import React from "react";
import { Album } from "../../types/types";
import Guess from "./Guess";

interface GuessListProps {
  guessedAlbums: Album[];
  correctGuess: Album;
}

const StickyHeader: React.FC = () => (
  <div className="overflow-y-auto sticky top-0  text-center min-w-[680px] max-w-[60vw] sm:p-2 gap-2 grid grid-cols-8 my-2 justify-items-center">
    {[
      "album img",
      "album title",
      "artist name",
      "avg rating",
      "release year",
      "main genre",
      "sub genre",
      "rym ranking",
    ].map((label, idx) => (
      <div
        key={idx}
        className="w-full  max-w-[100px] flex flex-col items-center justify-center"
      >
        <p>{label}</p>
      </div>
    ))}
  </div>
);

const GuessList: React.FC<GuessListProps> = ({
  guessedAlbums,
  correctGuess,
}) => {
  return (
    <div
      id="guessArea"
      className="guess-area overflow-scroll px-44 min-[650px]:p-0 min-[650px]:flex min-[650px]:flex-col items-center  w-full "
    >
      <StickyHeader />
      {[...guessedAlbums].reverse().map((album, index) => (
        <Guess
          userGuess={album}
          correctGuess={correctGuess}
          key={index}
          isNew={index === guessedAlbums.length - 1} // Only the first (newest) guess gets the fade-in effect... this shit doesn't work
        />
      ))}
    </div>
  );
};

export default React.memo(GuessList);
