import React, { useEffect, useState } from "react";
import { Album, UserStats } from "../../../types/types";
import Timer from "../../Main Display/Timer";
import { getDailyResult, DailyResult } from "../../../utilities/gameStorage";

type Props = {
  numGuesses: number;
  result: boolean;
  correctAlbum: Album;
  userStats: UserStats;
  closeModal: () => void;
};

const EndScreen: React.FC<Props> = ({
  numGuesses,
  result,
  correctAlbum,
  userStats,
  closeModal,
}: Props) => {
  const [savedResult, setSavedResult] = useState<DailyResult | null>(null);
  
  useEffect(() => {
    // Get the saved result from localStorage
    const dailyResult = getDailyResult();
    setSavedResult(dailyResult);
  }, []);
  
  // Use savedResult if available, otherwise use props
  const displayNumGuesses = savedResult ? savedResult.numGuesses : numGuesses;
  const displayResult = savedResult ? savedResult.win : result;
  
  let avg = Math.round((userStats.winningGuesses / userStats.wins) * 10) / 10;
  if (isNaN(avg)) { 
    avg = 0;
     }
  avg.toString();

  // fetch and calculate stats
  displayNumGuesses.toString();

  const winningMessage = (numGuesses: number) => {
    if (numGuesses == 1) {
      return (
        <div>
          Congrats on getting{" "}
          <span className="font-bold">{correctAlbum.title} </span> by{" "}
          <span className="font-bold"> {correctAlbum.artist}</span> first try!
          Are you a wizard??? Come back tomorrow for a new puzzle!
        </div>
      );
    } else {
      return (
        <div>
          Well done! It took you {numGuesses} tries to guess{" "}
          <span className="font-bold">{correctAlbum.title}</span> by{" "}
          <span className="font-bold">{correctAlbum.artist}</span>.. Come back
          tomorrow for a new puzzle!
        </div>
      );
    }
  };

  const losingMessage = () => {
    return (
      <div>
        Better luck next time... the correct album was{" "}
        <span className="font-bold">{correctAlbum.title}</span> by{" "}
        <span className="font-bold">{correctAlbum.artist}</span>. come back
        tomorrow and maybe you won't suck so much lolz.
      </div>
    );
  };

  return (
    <>
      <div className="absolute w-full h-full bg-black bg-opacity-40 z-50 content-center ">
        <div className="border-2 border-black bg-white rounded-md w-[300px] h-fit mx-auto overflow-y-scroll ">
          <header className="font-sans  font-bold tracking-wider  text-3xl  flex justify-center">
            <h3 className="  p-1">
              {displayResult ? "winner winner" : "loser loser"}
            </h3>
          </header>

          <section className="p-2 flex flex-col items-center gap-2">
            <div className="w-2/3 aspect-square">
              <img
                className="w-full h-full object-cover rounded-md"
                src={correctAlbum.cover_url}
              />
            </div>
            {displayResult ? winningMessage(displayNumGuesses) : losingMessage()}
            <ul className="flex w-full justify-evenly mb-2">
              <li className="flex flex-col items-center border-black rounded-md border-2 p-3 w-1/4">
                <p>Average</p>
                <p>{avg === 0 ? "n/a" : avg}</p>
              </li>
              <li className="flex flex-col items-center border-black rounded-md border-2 p-3 w-1/4">
                <p>Wins</p>
                <p>{userStats.wins}</p>
              </li>
              <li className="flex flex-col items-center border-black rounded-md border-2 p-3 w-1/4">
                <p>Losses</p>
                <p>{userStats.losses}</p>
              </li>
            </ul>
            <section className="p-2 min-w-full justify-center flex ">
              <Timer style={true} />
            </section>
            <button
              onClick={closeModal}
              className="mt-2 px-4 py-2 bg-black text-white rounded-md"
            >
              Close
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default EndScreen;
