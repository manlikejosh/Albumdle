import "./index.css";
import Timer from "./components/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faGear,
  faLightbulb,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import Guess from "./components/Guess";
import Modal from "./components/Modal";
import SettingsModal from "./components/SettingsModal";

const timerStyles = {
  fontSize: "clamp(.75rem, 2.4vw, 1.2rem)",
};

const iconStyles = {
  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
};

const headingStyles = {
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

const correctGuess: Album = {
  title: "Paul's Boutique",
  artist: "Beastie Boys",
  ratings: 4.72,
  year: 2017,
  genres: ["Electronic", "Hip Hop"],
  style: ["Cut-up/DJ", "Hip Hop"],
  tracklist: 15,
};

let lives = [
  "text-red-500",
  "text-red-500",
  "text-red-500",
  "text-red-500",
  "text-red-500",
  "text-red-500",
  "text-red-500",
  "text-red-500",
];

let count = lives.length - 1;

function App() {
  const [guessedAlbums, setGuessedAlbums] = useState<Album[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const handleGuessSubmission = (data: Album[]) => {
    const alreadyGuessed = guessedAlbums.some(
      (album) => album.title === data[0].title
    );

    if (alreadyGuessed) {
      alert("Already guessed that one!");
      return;
    }

    if (data[0].title === correctGuess.title) {
      alert("Winner winner chicken dinner!");
      setGuessedAlbums((prevGuessedAlbums) => [...prevGuessedAlbums, data[0]]);
      return;
    }

    setGuessedAlbums((prevGuessedAlbums) => [...prevGuessedAlbums, data[0]]);
    lives[count] = "text-black";
    count = count - 1;

    if (count === -1) {
      alert("you LOSE");
    }
  };

  return (
    <>
      <header className="font-panton font-thin grid grid-cols-5 my-5 w-fit">
        <div className="col-span-1 my-auto text-left" style={timerStyles}>
          <Timer />
        </div>
        <h1
          style={headingStyles}
          className="font-bold tracking-wider col-span-3 text-center my-auto"
        >
          Albumdle
        </h1>
        <div
          id="icons"
          style={iconStyles}
          className="col-span-1 my-auto text-right"
        >
          <button onClick={() => setShowHelpModal(true)}>
            <FontAwesomeIcon icon={faQuestion} className="p-1" />
          </button>
          <button onClick={() => setShowSettingsModal(true)}>
            <FontAwesomeIcon icon={faGear} className="p-1" />
          </button>
          <FontAwesomeIcon icon={faLightbulb} className="p-1" />
        </div>
      </header>

      <div className="w-full flex flex-col">
        <SearchBar
          placeholder="Enter your guess..."
          onButtonClick={handleGuessSubmission}
        />
      </div>

      <div className=" flex flex-row mt-2 " id="lives">
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[0]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[1]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[2]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[3]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[4]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[5]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[6]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[7]}`}
        />
      </div>

      <div
        id="guessArea"
        className="flex flex-col-reverse px-1 w-full overflow-scroll sm:items-center border border-black"
      >
        {guessedAlbums.map((album, index) => (
          <Guess userGuess={album} correctGuess={correctGuess} key={index} />
        ))}

        <div className="flex flex-col px-1 w-screen sm:items-center">
          {/* Sticky Header */}
          {guessedAlbums.length > 0 && (
            <div className="overflow-y-auto sticky top-0 text-center min-w-[680px] max-w-[60vw] sm:p-2 gap-2 grid grid-cols-8 my-2 justify-items-center">
              <div className="w-full  max-w-[100px] flex flex-col items-center justify-center">
                <p>album img</p>
              </div>
              <div className="w-full  max-w-[100px] flex flex-col items-center justify-center">
                <p>album title</p>
              </div>
              <div className="w-full  max-w-[100px] flex flex-col items-center justify-center">
                <p>artist name</p>
              </div>
              <div className="w-full  max-w-[100px] flex flex-col items-center justify-center">
                <p>avg score</p>
              </div>
              <div className="w-full  max-w-[100px] flex flex-col items-center justify-center">
                <p>release year</p>
              </div>
              <div className="w-full  max-w-[100px] flex flex-col items-center justify-center">
                <p>main genre</p>
              </div>
              <div className="w-full  max-w-[100px] flex flex-col items-center justify-center">
                <p>sub genre</p>
              </div>
              <div className="w-full  max-w-[100px] flex flex-col items-center justify-center">
                <p>number tracks</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showHelpModal && <Modal closeModal={() => setShowHelpModal(false)} />}

      {showSettingsModal && (
        <SettingsModal closeModal={() => setShowSettingsModal(false)} />
      )}
    </>
  );
}

export default App;
