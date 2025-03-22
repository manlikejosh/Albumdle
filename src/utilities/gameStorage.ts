import { Album, UserStats } from "../types/types";

// Define a type for daily result
export type DailyResult = {
  date: string;
  win: boolean;
  numGuesses: number;
  albumTitle: string;
  albumArtist: string;
};

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
    localStorage.setItem("gameOver", "false"); // Reset game over state
    localStorage.removeItem("showEndScreen"); // Remove any lingering end screen state
    localStorage.removeItem("dailyResult"); // Reset daily result
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
export const getProgress = (): {
  lives: string[];
  guessedAlbums: Album[];
} => {
  const lives = localStorage.getItem("lives");
  const guessedAlbums = localStorage.getItem("guessedAlbums");
  return {
    lives: lives ? JSON.parse(lives) : [],
    guessedAlbums: guessedAlbums ? JSON.parse(guessedAlbums) : [],
  };
};

// Function to save new user stats
export const saveNewUserStats = (
  result: boolean,
  numGuesses: number
): UserStats => {
  let newUserStat: UserStats = {
    wins: 0,
    losses: 0,
    winningGuesses: 0,
    totalGuesses: 0,
  };
  newUserStat.totalGuesses += numGuesses;
  if (result) {
    newUserStat.wins = 1;
    newUserStat.winningGuesses = numGuesses;
  } else {
    newUserStat.losses = 1;
  }

  localStorage.setItem("userStats", JSON.stringify(newUserStat));

  return newUserStat;
};

// Function to get user stats
export const getUserStats = (): UserStats => {
  let stats = localStorage.getItem("userStats");
  return stats
    ? (JSON.parse(stats) as UserStats)
    : { wins: 0, losses: 0, winningGuesses: 0, totalGuesses: 0 };
};

// Function to save game data
export const updateUserStats = (
  result: boolean,
  numGuesses: number,
  userStats: UserStats
): void => {
  userStats.totalGuesses += numGuesses;
  if (result) {
    userStats.wins += 1;
    userStats.winningGuesses += numGuesses;
  } else {
    userStats.losses += 1;
  }
  localStorage.setItem("userStats", JSON.stringify(userStats));
};

// User stats reset helper
export const resetUserStorage = (): void => {
  localStorage.removeItem("userStats");
};

// Function to save game over state
export const saveGameOver = (isOver: boolean): void => {
  localStorage.setItem("gameOver", isOver.toString());
};

// Function to get game over state
export const getGameOver = (): boolean => {
  return localStorage.getItem("gameOver") === "true";
};

// Function to save the day's result
export const saveDailyResult = (
  win: boolean,
  numGuesses: number,
  album: Album
): void => {
  const result: DailyResult = {
    date: getTodayDate(),
    win,
    numGuesses,
    albumTitle: album.title,
    albumArtist: album.artist
  };
  localStorage.setItem("dailyResult", JSON.stringify(result));
};

// Function to get the day's result
export const getDailyResult = (): DailyResult | null => {
  const resultStr = localStorage.getItem("dailyResult");
  return resultStr ? JSON.parse(resultStr) : null;
};

// Function to check if today's result already exists
export const hasTodayResult = (): boolean => {
  const result = getDailyResult();
  return result !== null && result.date === getTodayDate();
};
