const Guess = () => {
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
    date: "9 November 1993",
    main_genre: "East Coast Hip Hop Boom Bap Hardcore Hip Hop",
    sub_genre: "urban aggressive raw crime boastful violence rhythmic dark",
    description:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    img_url: null,
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

  return <div className="w-1/3 border-2 border-black "></div>;
};

export default Guess;
