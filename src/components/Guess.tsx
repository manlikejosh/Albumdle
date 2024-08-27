// RANK IS THE ARRAY INDEX FROM THE JSON FILE
// alt will be the title
// only take the first entry of the genre --- everything before the first comma, if there is no comman take the entire thing
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
const Guess = () => {
  const clamp = {
    fontSize: "clamp(.5rem, 2.2vw, .8rem)",
  };
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
    img_url: string | null;
  }
  const correctGuess = {
    title: "Enter the Wu-Tang (36 Chambers)",
    artist: "Wu-Tang Clan",
    average: "4.22",
    ratings: "42,143",
    reviews: "481",
    date: "1993",
    main_genre: "East Coast Hip Hop",
    sub_genre: "violence rhythmic dark",
    description:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    img_url:
      "https://upload.wikimedia.org/wikipedia/en/3/3c/NickDrakePinkMoon.jpg",
  };

  const userGuess = {
    title: "The Rise and Fall of Ziggy Stardust and the Spiders From Mars",
    artist: "David Bowie",
    average: "4.26",
    ratings: "57,802",
    reviews: "811",
    date: "16 June 1972",
    main_genre: "Glam Rock Pop Rock",
    sub_genre: "Art Rock Rock Opera",
    description:
      "science fiction melodic concept album passionate anthemic rock opera bittersweet energetic",
    img_url:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  };

  const compare = (userGuess: Album, correctGuess: Album) => {
    const colors: { [key: string]: string } = {};

    if (userGuess.title === correctGuess.title) {
      return true;
    }

    // compare genre
    if (userGuess.main_genre === correctGuess.main_genre) {
      console.log("main genre is a complete match - green");
      colors.mainGenre = "green";
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
        colors.mainGenre = "yellow";
      } else {
        console.log("genres are not similar - red");
        colors.mainGenre = "red";
      }
    }

    // compare year
    if (userGuess.date === correctGuess.date) {
      console.log("date matches - green");
      colors.date = "green";
    } else if (
      -10 <=
        parseInt(userGuess.date.split(" ").pop()!) -
          parseInt(correctGuess.date.split(" ").pop()!) ||
      parseInt(userGuess.date.split(" ").pop()!) -
        parseInt(correctGuess.date.split(" ").pop()!) >=
        10
    ) {
      console.log("date is within 10 years - yellow");
      colors.date = "yellow";
    } else {
      console.log("dates do not match - red");
      colors.date = "red";
    }

    // compare artist
    if (userGuess.artist === correctGuess.title) {
      console.log("artists match - green");
      colors.artists = "green";
    } else {
      console.log("artists do not match - red");
      colors.artists = "red";
    }

    // compare sub genre
    if (userGuess.sub_genre === correctGuess.sub_genre) {
      console.log("main genre is a complete match - green");
      colors.subGenre = "green";
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
        colors.subGenre = "yellow";
      } else {
        console.log("genres are not similar - red");
        colors.subGenre = "green";
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
            src={correctGuess.img_url}
            alt="Pink Moon"
          />
        </div>
        <div className="aspect-square text-[.55rem] bg-green-300 min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg overflow-hidden text-wrap">
          {correctGuess.main_genre}
        </div>
        <div className="aspect-square  bg-green-300 min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg">
          {correctGuess.date}
        </div>
        <div className="aspect-square  bg-green-300 min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg">
          {correctGuess.artist}
        </div>
        <div
          style={clamp}
          className="aspect-square  bg-green-300 min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg"
        >
          {correctGuess.sub_genre}
        </div>
        <div className="relative aspect-square bg-green-300 min-h-fit p-1 w-full max-w-[82px] border-2 border-black text-center rounded-lg flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center z-0 opacity-0">
            <FontAwesomeIcon icon={faUpLong} className="text-white text-7xl" />
          </div>
          <div className="relative z-10 text-black text-2xl font-bold">24</div>
        </div>
      </div>

      {/* next card */}
      <div
        style={clamp}
        className="w-2/3 min-w-fit max-w-[500px] gap-2 grid grid-cols-3 min-[450px]:grid-cols-6 my-3 justify-items-center font-panton text-sm"
      >
        <div className="aspect-square  min-h-fit  w-full max-w-[82px]  content-center text-center rounded-lg">
          <img
            className="rounded-lg border-2  border-black"
            src="https://upload.wikimedia.org/wikipedia/en/0/01/ZiggyStardust.jpg"
            alt="The Rise and Fall of Ziggy Stardust"
          />
        </div>
        <div className="aspect-square bg-red-300 min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg">
          Glam Rock
        </div>
        <div className="aspect-square  bg-green-300 min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg">
          1972
        </div>
        <div className="aspect-square  bg-red-300 min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg">
          David Bowie
        </div>
        <div className="aspect-square  bg-red-300 min-h-fit p-1 w-full max-w-[82px] border-2 border-black content-center text-center rounded-lg">
          Art Rock Rock Opera
        </div>
        <div className="relative aspect-square bg-red-300 min-h-fit p-1 w-full max-w-[82px] border-2 border-black text-center rounded-lg flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center z-0 opacity-70">
            <FontAwesomeIcon icon={faUpLong} className="text-white text-7xl" />
          </div>
          <div className="relative z-10 text-black text-2xl font-bold">13</div>
        </div>
      </div>
    </>
  );
};

export default Guess;
