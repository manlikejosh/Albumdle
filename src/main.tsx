import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { Album } from "./types/album.js";

const album: Album = {
  title: "To Pimp a Butterfly",
  artist: "Kendrick Lamar",
  date: 2015,
  main_genre: "Conscious Hip Hop West Coast Hip Hop Jazz Rap",
  sub_genre: "Political Hip Hop Neo-Soul",
  rating: 4.39,
  num_ratings: "90k",
  num_reviews: "844",
  ranking: 1,
  cover_url:
    "https://lastfm.freetls.fastly.net/i/u/300x300/86b35c4eb3c479da49c915d8771bbd1a.png",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
