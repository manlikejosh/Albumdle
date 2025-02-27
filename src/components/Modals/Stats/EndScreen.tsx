import React from "react";
import { getUserStats } from "../../../utilities/gameStorage";

type Props = {
  numGuesses: number;
  result: boolean;
};

const EndScreen: React.FC<Props> = ({ numGuesses, result }: Props) => {
  // fetch and calculate stats

  return (
    <div>
      <h1>{result ? "Winner winner" : "Sucka loser"}</h1>
    </div>
  );
};

export default EndScreen;
