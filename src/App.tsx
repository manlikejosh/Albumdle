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

const clampTimer = {
  fontSize: "clamp(.75rem, 2.4vw, 1.2rem)",
};

const clampIcons = {
  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
};

const clampHead = {
  fontSize: "clamp(2rem, 8vw, 4.5rem)",
};

const correctGuess = {
  title: "The Low End Theory",
  artist: "A Tribe Called Quest",
  ratings: 4.69,
  year: 1996,
  genres: ["Hip Hop"],
  style: ["Conscious", "Jazzy Hip-Hop"],
  tracklist: 14,
};

let userGuess = {
  title: "Selected Ambient Works 85-92",
  artist: "Aphex Twin",
  ratings: 4.72,
  year: 2013,
  genres: ["Electronic"],
  style: ["IDM", "Techno", "Electro", "Experimental", "Ambient"],
  tracklist: 13,
};

function App() {
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingModal] = useState(false);

  const handleBtnClick = (data: string) => {
    setDisplayData((displayData) => {
      return [...displayData, data];
    });

    console.log("displaying data:");
    console.log(displayData);
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

      <div id="guessArea" className="px-1 ">
        <Guess />
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
