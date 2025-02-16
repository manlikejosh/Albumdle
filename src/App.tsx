import "./index.css";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import SettingsModal from "./components/SettingsModal";
import { Album } from "./types/album";
import Header from "./components/header";
import LivesDisplay from "./components/LivesDisplay";
import AlreadyGuessed from "./components/AlreadyGuessed";
import GuessList from "./components/GuessList";
import {
  checkAndResetGameProgress,
  saveProgress,
  getProgress,
} from "./utilities/gameStorage";

const correctGuess: Album = {
  title: "Paul's Boutique",
  artist: "Beastie Boys",
  ratings: 4.72,
  year: 2017,
  genres: ["Electronic", "Hip Hop"],
  style: ["Cut-up/DJ", "Hip Hop"],
  tracklist: 15,
};

let count = 7; // Starting from 7 as lives length - 1

function App() {
  const [guessedAlbums, setGuessedAlbums] = useState<Album[]>([]);
  const [lives, setLives] = useState<string[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAlreayGuessed, setShowAlreadyGuess] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // Check and reset the game progress on page load
  useEffect(() => {
    checkAndResetGameProgress();
    const { lives, guessedAlbums } = getProgress();
    setLives(lives);
    setGuessedAlbums(guessedAlbums);
  }, []);

  const handleDuplicateGuess = () => {
    setShowAlreadyGuess(false); // Hide first
    setTimeout(() => {
      setResetKey((prev) => prev + 1);
      setShowAlreadyGuess(true);
    }, 0);
  };

  const handleGuessSubmission = (data: Album[]) => {
    const alreadyGuessed = guessedAlbums.some(
      (album) => album.title === data[0].title
    );

    if (alreadyGuessed) {
      handleDuplicateGuess();
      return;
    }
    if (data[0].title === correctGuess.title) {
      alert("Winner winner chicken dinner!");
      setGuessedAlbums((prevGuessedAlbums) => [...prevGuessedAlbums, data[0]]);
      saveProgress(lives, guessedAlbums); // Save progress after winning
      return;
    }

    setGuessedAlbums((prevGuessedAlbums) => [...prevGuessedAlbums, data[0]]);
    lives[count] = "text-black";
    count = count - 1;
    setLives([...lives]); // Update lives state

    if (count === -1) {
      alert("you LOSE");
      saveProgress(lives, guessedAlbums); // Save progress after losing
    } else {
      saveProgress(lives, guessedAlbums); // Save progress on each guess
    }
  };

  return (
    <>
      <Header
        onHelpClick={() => setShowHelpModal(true)}
        onSettingsClick={() => setShowSettingsModal(true)}
      />

      <div className="w-full flex flex-col">
        <SearchBar
          placeholder="Enter your guess..."
          onButtonClick={handleGuessSubmission}
        />
      </div>
      {showAlreayGuessed && <AlreadyGuessed resetKey={resetKey} />}

      <LivesDisplay lives={lives} />
      <GuessList guessedAlbums={guessedAlbums} correctGuess={correctGuess} />
      {showHelpModal && <Modal closeModal={() => setShowHelpModal(false)} />}

      {showSettingsModal && (
        <SettingsModal closeModal={() => setShowSettingsModal(false)} />
      )}
    </>
  );
}

export default App;
