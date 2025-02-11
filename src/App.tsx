import "./index.css";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import Modal from "./components/Modal";
import SettingsModal from "./components/SettingsModal";
import { Album } from "./types/album";
import Header from "./components/header";
import LivesDisplay from "./components/LivesDisplay";
import AlreadyGuessed from "./components/AlreadyGuessed";
import GuessList from "./components/GuessList";

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
  const [showAlreayGuessed, setShowAlreadyGuess] = useState(false);
  const [resetKey, setResetKey] = useState(0);

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
      return;
    }

    setGuessedAlbums((prevGuessedAlbums) => [...prevGuessedAlbums, data[0]]);
    lives[count] = "text-black";
    count = count - 1;
    console.log(guessedAlbums);

    if (count === -1) {
      alert("you LOSE");
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
