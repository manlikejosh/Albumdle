export interface Album {
  title: string;
  artist: string;
  date: number;
  main_genre: string[];
  sub_genre: string[];
  rating: number;
  num_ratings: string;
  num_reviews: string;
  ranking: number;
  cover_url: string;
}

export interface UserStats {
  winningGuesses: number;
  totalGuesses: number;
  wins: number;
  losses: number;
}

export interface ComputedResults {
  avgGuesses: number;
  totalGuesses: number;
  totalWins: number;
  totalLosses: number;
}
