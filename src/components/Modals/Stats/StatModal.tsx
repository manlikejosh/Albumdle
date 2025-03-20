import { Dispatch, SetStateAction } from "react";
import { UserStats } from "../../../types/types";

interface Props {
  stats: UserStats;
  closeModal: Dispatch<SetStateAction<boolean>>;
}

const StatModal: React.FC<Props> = ({ stats, closeModal }) => {
  let played = stats.losses + stats.wins;
  let averageGuesses =
    Math.round((stats.winningGuesses / stats.wins) * 100) / 100;
  let winPercentage = Math.round((stats.wins / played) * 10000) / 100;

  let displayAvg = isNaN(averageGuesses) ? "n/a" : averageGuesses.toString();
  let displayWinPercentage = isNaN(winPercentage)
    ? "No Wins"
    : winPercentage.toString() + "%";

  return (
    <>
      <div className="absolute w-full h-full bg-black bg-opacity-40 z-50 content-center  ">
        <div className="border-2 border-black bg-white rounded-md w-[300px] h-[400px] mx-auto  flex flex-col">
          <header className="font-bold tracking-wider  text-3xl border-b-2 border-black flex justify-between">
            <h3 className="pl-1 my-auto">STATISTICS</h3>
            <button
              onClick={() => {
                closeModal(false);
              }}
              className="bg-red-400 w-1/4 h-full p-1 py-3 text-white rounded-tr-sm "
            >
              X
            </button>
          </header>

          <ul className="grid grid-col-1 grid-flow-row h-full">
            <li className="flex justify-between px-8 border-b border-black items-center">
              <p className="font-semibold text-lg">Played:</p>
              <p> {played} </p>
            </li>
            <li className="flex justify-between px-8 border-b border-black items-center">
              <p className="font-semibold text-lg">Win %:</p>
              <p> {displayWinPercentage}</p>
            </li>
            <li className="flex justify-between px-8 border-b border-black items-center">
              <p className="font-semibold text-lg">Lost:</p>
              <p> {stats.losses} </p>
            </li>
            <li className="flex justify-between px-8 border-b border-black items-center">
              <p className="font-semibold text-lg">Won:</p>
              <p> {stats.wins} </p>
            </li>
            <li className="flex justify-between px-8 border-b border-black items-center">
              <p className="font-semibold text-lg">Avg. Guess:</p>
              <p> {displayAvg} </p>
            </li>
            <li className="flex justify-between px-8  items-center">
              <p className="font-semibold text-lg">Total Guesses:</p>
              <p> {stats.totalGuesses} </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default StatModal;

//
