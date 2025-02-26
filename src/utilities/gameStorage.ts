import { Album } from "../types/album";

// Utility function to get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  const date = new Date();
  return date.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
};

// Function to check if the game progress should be reset
export const checkAndResetGameProgress = (): void => {
  const savedDate = localStorage.getItem("lastPlayedDate");
  const today = getTodayDate();

  if (savedDate !== today) {
    // Reset lives and guessedAlbums if it's a new day
    localStorage.setItem(
      "lives",
      JSON.stringify([
        "text-red-500",
        "text-red-500",
        "text-red-500",
        "text-red-500",
        "text-red-500",
        "text-red-500",
        "text-red-500",
        "text-red-500",
      ])
    );
    localStorage.setItem("guessedAlbums", JSON.stringify([])); // Empty array for new guesses
    localStorage.setItem("lastPlayedDate", today); // Store today's date
  }
};

// Function to reset game progress (for testing)
export const resetGameProgress = (): void => {
  localStorage.setItem(
    "lives",
    JSON.stringify([
      "text-red-500",
      "text-red-500",
      "text-red-500",
      "text-red-500",
      "text-red-500",
      "text-red-500",
      "text-red-500",
      "text-red-500",
    ])
  );
  localStorage.setItem("guessedAlbums", JSON.stringify([]));
};

// Function to save lives and guessed albums
export const saveProgress = (lives: string[], guessedAlbums: Album[]): void => {
  localStorage.setItem("lives", JSON.stringify(lives));
  localStorage.setItem("guessedAlbums", JSON.stringify(guessedAlbums));
};

// Function to get saved lives and guessed albums
export const getProgress = (): { lives: string[]; guessedAlbums: Album[] } => {
  const lives = localStorage.getItem("lives");
  const guessedAlbums = localStorage.getItem("guessedAlbums");
  return {
    lives: lives ? JSON.parse(lives) : [],
    guessedAlbums: guessedAlbums ? JSON.parse(guessedAlbums) : [],
  };
};
