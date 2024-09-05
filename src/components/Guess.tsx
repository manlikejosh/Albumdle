// RANK IS THE ARRAY INDEX FROM THE JSON FILE
// alt will be the title
// only take the first entry of the genre --- everything before the first comma, if there is no comman take the entire thing
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";

interface Album {
  title: string;
  artist: string;
  average: string;
  ratings: string;
  reviews: string;
  date: string;
  main_genre: string;
  sub_genre: string;
  description: string;
  img_url: string | undefined;
}
const Guess = (userGuess: Album, correctGuess: Album) => {
  const clamp = {
    fontSize: "clamp(.5rem, 2.2vw, .8rem)",
  };
  const colors: { [key: string]: string } = {};

  const compare = (userGuess: Album, correctGuess: Album) => {
    if (userGuess.title === correctGuess.title) {
      return true;
    }

    // compare genre
    if (userGuess.main_genre === correctGuess.main_genre) {
      console.log("main genre is a complete match - green");
      colors.mainGenre = "bg-green-300";
    } else {
      // Split the sentences into words and convert them to sets
      const words1 = new Set(userGuess.main_genre.toLowerCase().split(/\W+/));
      const words2 = new Set(
        correctGuess.main_genre.toLowerCase().split(/\W+/)
      );

      // Find the intersection of the two sets
      const commonWords = new Set(
        [...words1].filter((word) => words2.has(word))
      );

      if (commonWords.size != 0) {
        console.log("genres are similar - yellow");
        colors.mainGenre = "bg-yellow-300";
      } else {
        console.log("genres are not similar - red");
        colors.mainGenre = "bg-red-300";
      }
    }

    // compare year
    if (userGuess.date === correctGuess.date) {
      console.log("date matches - green");
      colors.date = "bg-green-300";
    } else if (
      -10 <=
        parseInt(userGuess.date.split(" ").pop()!) -
          parseInt(correctGuess.date.split(" ").pop()!) ||
      parseInt(userGuess.date.split(" ").pop()!) -
        parseInt(correctGuess.date.split(" ").pop()!) >=
        10
    ) {
      console.log("date is within 10 years - yellow");
      colors.date = "bg-yellow-300";
    } else {
      console.log("dates do not match - red");
      colors.date = "bg-red-300";
    }

    // compare artist
    if (userGuess.artist === correctGuess.title) {
      console.log("artists match - green");
      colors.artists = "bg-green-300";
    } else {
      console.log("artists do not match - red");
      colors.artists = "bg-red-300";
    }

    // compare sub genre
    if (userGuess.sub_genre === correctGuess.sub_genre) {
      console.log("main genre is a complete match - green");
      colors.subGenre = "bg-green-300";
    } else {
      // Split the sentences into words and convert them to sets
      const words1 = new Set(userGuess.sub_genre.toLowerCase().split(/\W+/));
      const words2 = new Set(correctGuess.sub_genre.toLowerCase().split(/\W+/));

      // Find the intersection of the two sets
      const commonWords = new Set(
        [...words1].filter((word) => words2.has(word))
      );

      if (commonWords.size != 0) {
        console.log("genres are similar - yellow");
        colors.subGenre = "bg-yellow-300";
      } else {
        console.log("genres are not similar - red");
        colors.subGenre = "bg-red-300";
      }
    }
    return colors;
  };

  return (
    <>
      <div
        style={clamp}
        className="w-2/3 min-w-fit max-w-[500px] gap-2 grid grid-cols-3 min-[450px]:grid-cols-6 my-3 justify-items-center font-panton 
        "
      >
        <div className="aspect-square min-h-fit  w-full max-w-[82px]   content-center text-center rounded-lg">
          <img
            className="rounded-lg border-2  border-black"
            src={userGuess.img_url}
            alt="Pink Moon"
          />
        </div>
        <div
          className={`aspect-square text-[.55rem]  min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg overflow-hidden text-wrap ${colors.main_genre}`}
        >
          {userGuess.main_genre}
        </div>
        <div
          className={`aspect-square   min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colors.date}`}
        >
          {userGuess.date}
        </div>
        <div
          className={`aspect-square  min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colors.artists}`}
        >
          {userGuess.artist}
        </div>
        <div
          style={clamp}
          className={`aspect-square   min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg ${colors.sub_genre}`}
        >
          {userGuess.sub_genre}
        </div>
        <div
          className={`relative aspect-square bg-green-300 min-h-fit p-1 w-full max-w-[82px] border-2 border-black text-center rounded-lg flex items-center justify-center ${colors.rating}`}
        >
          <div className="absolute inset-0 flex items-center justify-center z-0 opacity-0">
            <FontAwesomeIcon icon={faUpLong} className="text-white text-7xl" />
          </div>
          <div className="relative z-10 text-black text-2xl font-bold">24</div>
        </div>
      </div>
    </>
  );
};

export default Guess;
