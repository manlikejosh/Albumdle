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
import dotenv from "dotenv";

const correctGuess: Album = {
  title: "Pink Moon",
  artist: "Nick Drake",
  date: 1972,
  main_genre: "Contemporary Folk Singer-Songwriter",
  sub_genre: "Folk Baroque",
  rating: 4.19,
  num_ratings: "47k",
  num_reviews: "690",
  ranking: 34,
  cover_url:
    "https://lastfm.freetls.fastly.net/i/u/300x300/dc70139e0457a04d2749fe062647fc79.png",
};

function App() {
  const [guessedAlbums, setGuessedAlbums] = useState<Album[]>([]);
  const [lives, setLives] = useState<string[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAlreayGuessed, setShowAlreadyGuess] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  console.log(import.meta.env.VITE_ALBUMDLE_API_KEY);
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

      setGuessedAlbums((prevGuessedAlbums) => {
        const updatedGuessedAlbums = [...prevGuessedAlbums, data[0]];
        saveProgress(lives, updatedGuessedAlbums); // Save after albums update
        return updatedGuessedAlbums;
      });

      return;
    }

    // Update both states in a controlled manner
    setGuessedAlbums((prevGuessedAlbums) => {
      const updatedGuessedAlbums = [...prevGuessedAlbums, data[0]];

      setLives((prevLives) => {
        if (prevLives.length === 0) return prevLives;

        const updatedLives = [...prevLives];
        updatedLives[updatedLives.length - 1] = "text-black"; // Change last life
        saveProgress(updatedLives, updatedGuessedAlbums); // Save progress after both updates
        return updatedLives.slice(0, -1); // Remove last life
      });

      return updatedGuessedAlbums;
    });

    if (lives.length === 1) {
      alert("You LOSE");
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
