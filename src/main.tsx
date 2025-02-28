import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import EndScreen from "./components/Modals/Stats/EndScreen";
import { Album, UserStats } from "./types/types.js";
// - Return index.html for all routes
// - This is automatic in Vite/CRA, but might need config in Nginx/Express

let numGuesses = 1;
let result = true;
let correctAlbum: Album = {
  title: "Illinois",
  artist: "Sufjan Stevens",
  date: 2005,
  main_genre: "Chamber Pop Singer-Songwriter",
  sub_genre: "Chamber Folk Progressive Pop",
  rating: 4.13,
  num_ratings: "40k",
  num_reviews: "474",
  ranking: 65,
  cover_url:
    "https://lastfm.freetls.fastly.net/i/u/300x300/4884fbb2a3714e42cef5a1782e10c26e.png",
};
let stats: UserStats = {
  winningGuesses: 26,
  totalGuesses: 36,
  wins: 4,
  losses: 3,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* <EndScreen
      numGuesses={numGuesses}
      result={result}
      correctAlbum={correctAlbum}
      userStats={stats}
    /> */}
  </StrictMode>
);
