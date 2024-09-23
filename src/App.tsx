import "./index.css";
import Timer from "./components/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faGear,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import Guess from "./components/Guess";
import Modal from "./components/Modal";
import SettingsModal from "./components/SettingsModal";
import { convertCompilerOptionsFromJson } from "typescript";

const clampTimer = {
  fontSize: "clamp(.75rem, 2.4vw, 1.2rem)",
};

const clampIcons = {
  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
};

const clampHead = {
  fontSize: "clamp(2rem, 8vw, 4.5rem)",
};

interface Album {
  title: string;
  artist: string;
  ratings: number;
  year: number;
  genres: string[];
  style: string[];
  tracklist: number;
}

// const userGuess: Album = {
//   title: "The Low End Theory",
//   artist: "A Tribe Called Quest",
//   ratings: 4.69,
//   year: 1996,
//   genres: ["Hip Hop"],
//   style: ["Conscious", "Jazzy Hip-Hop"],
//   tracklist: 14,
// };

const correctGuess: Album = {
  title: "Paul's Boutique",
  artist: "Beastie Boys",
  ratings: 4.72,
  year: 2017,
  genres: ["Electronic", "Hip Hop"],
  style: ["Cut-up/DJ", "Hip Hop"],
  tracklist: 15,
};
function App() {
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingModal] = useState(false);

  const handleBtnClick = (data: any) => {
    for (let i = 0; i < displayData.length; i++) {
      if (displayData[i][0].title === data[0].title) {
        alert("already guessed that one dumbass");
        return;
      }
    }

    setDisplayData((displayData) => {
      return [...displayData, data];
    });
  };

  return (
    <>
      <header className=" font-panton font-thin   grid grid-cols-5 my-5 w-fit ">
        <div className="  col-span-1  my-auto text-left" style={clampTimer}>
          <Timer />
        </div>
        <h1
          style={clampHead}
          className="font-bold tracking-wider  col-span-3 text-center my-auto"
        >
          Albumdle
        </h1>
        <div
          id="icons"
          style={clampIcons}
          className="    col-span-1 my-auto text-right"
        >
          <button
            onClick={() => {
              setShowHelpModal(true);
            }}
          >
            <FontAwesomeIcon icon={faQuestion} className=" p-1" />
          </button>
          <button
            onClick={() => {
              setShowSettingModal(true);
            }}
          >
            <FontAwesomeIcon icon={faGear} className=" p-1" />
          </button>
          <FontAwesomeIcon icon={faLightbulb} className=" p-1" />
        </div>
      </header>

      <div className="w-full flex flex-col  ">
        <SearchBar
          placeholder="Enter your guess..."
          onButtonClick={handleBtnClick}
        />
      </div>

      <div className="">
        {displayData &&
          displayData.map((data, index) => {
            return <p key={index}>{data.title}</p>;
          })}
      </div>
      <div id="guessArea" className="flex flex-col-reverse px-1 ">
        {displayData.map((data, index) => {
          return (
            <Guess
              userGuess={data[0]}
              correctGuess={correctGuess}
              key={index}
            ></Guess>
          );
        })}
      </div>

      {showHelpModal && (
        <Modal
          closeModal={() => {
            setShowHelpModal(false);
          }}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          closeModal={() => {
            setShowSettingModal(false);
          }}
        />
      )}
    </>
  );
}

export default App;
