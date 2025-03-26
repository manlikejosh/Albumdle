import "./index.css";
import SearchBar from "./components/Main Display/SearchBar";
import { useState, useEffect } from "react";
import { Album, UserStats } from "./types/types";
import Header from "./components/Main Display/Header";
import LivesDisplay from "./components/Main Display/LivesDisplay";
import AlreadyGuessed from "./components/Guess Display/AlreadyGuessed";
import GuessList from "./components/Guess Display/GuessList";
import {
  checkAndResetGameProgress,
  saveProgress,
  getProgress,
  getUserStats,
  saveNewUserStats,
  updateUserStats,
  saveGameOver,
  getGameOver,
  saveDailyResult,
  hasTodayResult,
  getDailyResult,
} from "./utilities/gameStorage";
import { Routes, Route, useLocation } from "react-router-dom";
import AlbumListPage from "./components/Glossary/AlbumListPage";
import EndScreen from "./components/Modals/Stats/EndScreen";
import HelpModal from "./components/Modals/HelpModal";
import StatModal from "./components/Modals/Stats/StatModal";
import { getDailyItem } from "./utilities/apiHelper";
import LoadingSpinner from "./components/Modals/Loading";

function App() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const [correctGuess, setDailyItem] = useState<Album | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const daily = await getDailyItem();
        setDailyItem(daily);
      } catch (err) {
        alert("There was an error, please refresh or come back later");
      }
    }
    fetchData();
  }, []);

  const [guessedAlbums, setGuessedAlbums] = useState<Album[]>([]);
  const [lives, setLives] = useState<string[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showStatModal, setShowStatModal] = useState(false);

  const [showAlreayGuessed, setShowAlreadyGuess] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [gameOver, setGameOver] = useState<boolean>(() => getGameOver());
  const [showEndScreen, setShowEndScreen] = useState<boolean>(false);

  // Load userStats from localStorage
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const savedStats = localStorage.getItem("userStats");
    return savedStats
      ? JSON.parse(savedStats)
      : { winningGuesses: 0, totalGuesses: 0, wins: 0, losses: 0 };
  });

  // handle page scroll when modals open
  useEffect(() => {
    if (isMainPage && (showHelpModal || showStatModal || showEndScreen)) {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0 });
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showHelpModal, showStatModal, showEndScreen, isMainPage]);

  useEffect(() => {
    if (gameOver) {
      saveGameOver(true);
      setShowEndScreen(true);
    } else {
      saveGameOver(false);
    }
  }, [gameOver]);

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

    if (correctGuess) {
      if (data[0].title === correctGuess.title) {
        setGuessedAlbums((prevGuessedAlbums) => {
          const updatedGuessedAlbums = [...prevGuessedAlbums, data[0]];
          saveProgress(lives, updatedGuessedAlbums);
          return updatedGuessedAlbums;
        });

        const updatedStats = handleStats(true, guessedAlbums.length + 1);
        setUserStats(updatedStats);
        setGameOver(true);

        // Save daily result for win
        if (correctGuess) {
          saveDailyResult(true, guessedAlbums.length + 1, correctGuess);
        }

        return;
      }
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
      setGameOver(true);

      // Save daily result for loss
      if (correctGuess) {
        saveDailyResult(false, 8, correctGuess);
      }
    }
  };

  useEffect(() => {
    checkAndResetGameProgress();
    const { lives, guessedAlbums } = getProgress();
    setLives(lives);
    setGuessedAlbums(guessedAlbums);

    // Check if we already have a result for today
    if (hasTodayResult()) {
      setGameOver(true);
    }

    // Only show end screen if game is over and we have guessed albums
    if (getGameOver() && guessedAlbums.length > 0) {
      setGameOver(true);
      setShowEndScreen(true);
    } else {
      setGameOver(false);
      setShowEndScreen(false);
    }
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
            {correctGuess ? (
              <>
                <div className="w-full flex flex-col">
                  <SearchBar
                    placeholder="Enter your guess..."
                    onButtonClick={handleGuessSubmission}
                    disabled={gameOver}
                  />
                </div>
                {showAlreayGuessed && <AlreadyGuessed resetKey={resetKey} />}
                <LivesDisplay lives={lives} />
                <div className="relative w-full">
                  <GuessList
                    guessedAlbums={guessedAlbums}
                    correctGuess={correctGuess}
                  />
                </div>
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
                    result={getDailyResult()?.win || false}
                    correctAlbum={correctGuess}
                    userStats={userStats}
                    closeModal={() => setShowEndScreen(false)}
                  />
                )}{" "}
              </>
            ) : (
              <LoadingSpinner />
            )}
          </>
        }
      ></Route>
      <Route path="/album-list" element={<AlbumListPage />} />
    </Routes>
  );
}

export default App;
