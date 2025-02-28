import "./index.css";
import SearchBar from "./components/Main Display/SearchBar";
import { useState, useEffect } from "react";
import Modal from "./components/Modals/Modal";
import { Album } from "./types/types";
import data from "./components/data.json";

import Header from "./components/Main Display/Header";
import LivesDisplay from "./components/Main Display/LivesDisplay";
import AlreadyGuessed from "./components/Guess Display/AlreadyGuessed";
import GuessList from "./components/Guess Display/GuessList";
import {
  checkAndResetGameProgress,
  saveProgress,
  getProgress,
  resetGameProgress,
} from "./utilities/gameStorage";
import { Routes, Route } from "react-router-dom";
import AlbumListPage from "./components/Glossary/AlbumListPage";

let random = Math.floor(Math.random() * (119 - 1 + 1) + 1);

const correctGuess: Album = data[random];
function App() {
  const [guessedAlbums, setGuessedAlbums] = useState<Album[]>([]);
  const [lives, setLives] = useState<string[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAlreayGuessed, setShowAlreadyGuess] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const reset = () => {
    resetGameProgress();
    window.location.reload();
  };
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
      alert(correctGuess.title);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header onHelpClick={() => setShowHelpModal(true)} />

            <div className="w-full flex flex-col">
              <SearchBar
                placeholder="Enter your guess..."
                onButtonClick={handleGuessSubmission}
              />
            </div>
            {showAlreayGuessed && <AlreadyGuessed resetKey={resetKey} />}

            <LivesDisplay lives={lives} />
            <GuessList
              guessedAlbums={guessedAlbums}
              correctGuess={correctGuess}
            />
            {showHelpModal && (
              <Modal closeModal={() => setShowHelpModal(false)} />
            )}

            <button
              onClick={() => reset()}
              className="border-4 rounded-md font-bold border-black bg-red-500 px-4 py-2"
            >
              RESET
            </button>
          </>
        }
      ></Route>
      <Route path="/album-list" element={<AlbumListPage />} />
    </Routes>
  );
}

export default App;
