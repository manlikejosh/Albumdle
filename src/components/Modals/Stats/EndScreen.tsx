import React from "react";
import { Album, UserStats } from "../../../types/types";
import Timer from "../../Main Display/Timer";

type Props = {
  numGuesses: number;
  result: boolean;
  correctAlbum: Album;
  userStats: UserStats;
};

const EndScreen: React.FC<Props> = ({
  numGuesses,
  result,
  correctAlbum,
  userStats,
}: Props) => {
  numGuesses = 5;
  result = true;

  let avg = userStats.winningGuesses / userStats.wins;
  // fetch and calculate stats
  const winningMessage = (numGuesses: number) => {
    numGuesses.toString();
    if (numGuesses == 1) {
      return (
        <p>
          Congrats on getting{" "}
          <span className="font-bold">{correctAlbum.title} </span> by{" "}
          <span className="font-bold"> {correctAlbum.artist}</span> first try!
          Are you a wizard??? Come back tomorrow for a new puzzle!
        </p>
      );
    } else {
      return (
        <p>
          Well done! It took you {numGuesses} tries to guess{" "}
          <span className="font-bold">{correctAlbum.title}</span> by{" "}
          <span className="font-bold">{correctAlbum.artist}</span>.. Come back
          tomorrow for a new puzzle!
        </p>
      );
    }
  };

  const losingMessage = () => {
    return (
      <p>
        Better luck next time... the correct album was{" "}
        <span className="font-bold">{correctAlbum.title}</span> by{" "}
        <span className="font-bold">{correctAlbum.artist}</span>. come back
        tomorrow and maybe you won't suck so much lolz.
      </p>
    );
  };

  return (
    <>
      <div className="absolute w-full h-full bg-black bg-opacity-40 z-50 content-center ">
        <div className="border-2 border-black bg-white rounded-md w-[300px] h-fit mx-auto overflow-y-scroll ">
          <header className="font-sans  font-bold tracking-wider  text-3xl  flex justify-center">
            <h3 className="  p-1">
              {result ? "winner winner" : "loser loser"}
            </h3>
          </header>

          <section className="p-2 flex flex-col items-center gap-2">
            <div className="w-2/3 aspect-square">
              <img
                className="w-full h-full object-cover rounded-md"
                src={correctAlbum.cover_url}
              />
            </div>
            <p>{result ? winningMessage(numGuesses) : losingMessage()}</p>
            <ul className="flex w-full justify-evenly mb-2">
              <li className="flex flex-col items-center border-black rounded-md border-2 p-3 w-1/4">
                <p>Average</p>
                <p>{avg}</p>
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
          </section>
        </div>
      </div>
    </>
  );
};

export default EndScreen;
