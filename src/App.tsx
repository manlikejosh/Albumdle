import "./index.css";
import SearchBar from "./components/Main Display/SearchBar";
import { useState, useEffect } from "react";
import { Album, UserStats } from "./types/types";
import data from "./data/data.json";

import Header from "./components/Main Display/Header";
import LivesDisplay from "./components/Main Display/LivesDisplay";
import AlreadyGuessed from "./components/Guess Display/AlreadyGuessed";
import GuessList from "./components/Guess Display/GuessList";
import {
  checkAndResetGameProgress,
  saveProgress,
  getProgress,
  resetGameProgress,
  getUserStats,
  saveNewUserStats,
  updateUserStats,
  resetUserStorage,
} from "./utilities/gameStorage";
import { Routes, Route } from "react-router-dom";
import AlbumListPage from "./components/Glossary/AlbumListPage";
import EndScreen from "./components/Modals/Stats/EndScreen";
import HelpModal from "./components/Modals/HelpModal";
import StatModal from "./components/Modals/Stats/StatModal";

const correctGuess: Album = {
  title: "Pornography",
  artist: "The Cure",
  date: 1982,
  main_genre: ["Gothic Rock", "Post-Punk"],
  sub_genre: ["Coldwave", "Neo-Psychedelia"],
  rating: 4.07,
  num_ratings: "34k",
  num_reviews: "346",
  ranking: 100,
  cover_url:
    "https://lastfm.freetls.fastly.net/i/u/300x300/dcf7ccf93e1c445583ff952f49eb7a5d.png",
};
const dumbStats: UserStats = {
  winningGuesses: 123,
  totalGuesses: 123,
  wins: 10,
  losses: 13,
};
function App() {
  const [guessedAlbums, setGuessedAlbums] = useState<Album[]>([]);
  const [lives, setLives] = useState<string[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showStatModal, setShowStatModal] = useState(false);

  const [showAlreayGuessed, setShowAlreadyGuess] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [endGame, setEndGame] = useState<boolean>(() => {
    return localStorage.getItem("endGame") === "true";
  });
  // Load EndScreen state from localStorage
  const [showEndScreen, setShowEndScreen] = useState<boolean>(() => {
    return localStorage.getItem("showEndScreen") === "true";
  });

  // Load userStats from localStorage
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const savedStats = localStorage.getItem("userStats");
    return savedStats
      ? JSON.parse(savedStats)
      : { winningGuesses: 0, totalGuesses: 0, wins: 0, losses: 0 };
  });

  useEffect(() => {
    if (showEndScreen) {
      localStorage.setItem("showEndScreen", "true");
    } else {
      localStorage.removeItem("showEndScreen");
    }
  }, [showEndScreen]);
  useEffect(() => {
    if (endGame) {
      localStorage.setItem("endGame", "true");
    } else {
      localStorage.removeItem("endGame");
    }
  }, [endGame]);

  useEffect(() => {
    localStorage.setItem("userStats", JSON.stringify(userStats));
  }, [userStats]);

  const handleStats = (result: boolean, numGuesses: number) => {
    let stats: UserStats = getUserStats();
    if (stats.totalGuesses === 0) {
      // if there have been no guesses yet
      let newStats = saveNewUserStats(result, numGuesses);
      return newStats;
    }
    updateUserStats(result, numGuesses, stats);
    let updatedStats = getUserStats();
    return updatedStats;
  };

  const resetGame = () => {
    resetGameProgress();
    localStorage.removeItem("showEndScreen");
    window.location.reload();
  };

  const resetUser = () => {
    resetUserStorage();
    localStorage.removeItem("showEndScreen");
    localStorage.removeItem("userStats");
    window.location.reload();
  };

  const resetAll = () => {
    resetGameProgress();
    resetUserStorage();
    localStorage.removeItem("showEndScreen");
    localStorage.removeItem("userStats");
    window.location.reload();
  };

  const handleDuplicateGuess = () => {
    setShowAlreadyGuess(false);
    setTimeout(() => {
      setResetKey((prev) => prev + 1);
      setShowAlreadyGuess(true);
    }, 0);
  };

  const handleGuessSubmission = (data: Album[]) => {
    if (guessedAlbums.some((album) => album.title === data[0].title)) {
      handleDuplicateGuess();
      return;
    }

    if (data[0].title === correctGuess.title) {
      setGuessedAlbums((prevGuessedAlbums) => {
        const updatedGuessedAlbums = [...prevGuessedAlbums, data[0]];
        saveProgress(lives, updatedGuessedAlbums);
        return updatedGuessedAlbums;
      });

      const updatedStats = handleStats(true, guessedAlbums.length + 1);
      setUserStats(updatedStats);
      setEndGame(true);
      setShowEndScreen(true);
      return;
    }

    setGuessedAlbums((prevGuessedAlbums) => {
      const updatedGuessedAlbums = [...prevGuessedAlbums, data[0]];

      setLives((prevLives) => {
        if (prevLives.length === 0) return prevLives;
        const updatedLives = [...prevLives];
        updatedLives[updatedLives.length - 1] = "text-black";
        saveProgress(updatedLives, updatedGuessedAlbums);
        return updatedLives.slice(0, -1);
      });

      return updatedGuessedAlbums;
    });

    if (lives.length === 1) {
      const updatedStats = handleStats(false, 8);
      setUserStats(updatedStats);
      setShowEndScreen(true);
      setEndGame(true);
    }
  };

  useEffect(() => {
    checkAndResetGameProgress();
    const { lives, guessedAlbums } = getProgress();
    setLives(lives);
    setGuessedAlbums(guessedAlbums);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className=" w-full h-full opacity-0 min-[650px]:opacity-100 absolute ">
              <div className=" wave -z-50 absolute "></div>
            </div>

            <Header
              onHelpClick={() => setShowHelpModal(true)}
              onStatClick={() => setShowStatModal(true)}
            />
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
              <HelpModal closeModal={() => setShowHelpModal(false)} />
            )}
            {showStatModal && (
              <StatModal
                stats={userStats}
                closeModal={() => setShowStatModal(false)}
              />
            )}

            {showEndScreen && (
              <EndScreen
                numGuesses={guessedAlbums.length}
                result={true}
                correctAlbum={correctGuess}
                userStats={userStats}
              />
            )}
            <div className="flex gap-5 z-50">
              <button
                onClick={() => resetGame()}
                className="border-4 rounded-md font-bold border-black bg-red-500 px-4 py-2"
              >
                RESET GAME
              </button>
              <button
                onClick={() => resetUser()}
                className="border-4 rounded-md font-bold border-black bg-red-500 px-4 py-2"
              >
                RESET USER
              </button>
              <button
                onClick={() => resetAll()}
                className="border-4 rounded-md font-bold border-black bg-red-500 px-4 py-2"
              >
                RESET ALL
              </button>
            </div>
          </>
        }
      ></Route>
      <Route path="/album-list" element={<AlbumListPage />} />
    </Routes>
  );
}

export default App;
