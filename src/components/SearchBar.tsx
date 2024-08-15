import { useState, useEffect } from "react";

import data from "./data.json";

// Define the type for your album data
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

interface Props {
  placeholder: string;
  onButtonClick: (data: any) => void;
}

const SearchBar = ({ placeholder, onButtonClick }: Props) => {
  const object = (obj: {} | undefined) => {
    return obj;
  };
  const [search, setSearch] = useState(""); // set the initial state of the searchbar value
  const [searchData, setSearchData] = useState<Album[]>([]); // Use the Album type here
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedItem < searchData.length) {
      if (e.key === "ArrowUp" && selectedItem > 0) {
        setSelectedItem((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedItem < searchData.length - 1
      ) {
        setSelectedItem((prev) => prev + 1);
      } else if (e.key === "Enter" && selectedItem >= 0) {
        setSearch(searchData[selectedItem].title);
      }
    } else {
      setSelectedItem(-1);
    }
  };

  // change the event type || this function updates the state of the searchbar when it is changed (input is taken)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClick = (e: { target: { innerText: any } }) => {
    setSearch(e.target.innerText);
  };

  // this function will be called whenever the search array is updated (when you start typing in the input field)
  useEffect(() => {
    if (search !== "") {
      const newFilteredData = data.filter((album: Album) => {
        return album.title.toLowerCase().includes(search.toLowerCase());
      });

      setSearchData(newFilteredData);
    }
  }, [search]);

  const handleBtnClick = () => {
    if (searchData === null || searchData.length == 0) {
      alert("nothin");
    } else {
      console.log("sent over: ");
      console.log(searchData);
      onButtonClick(searchData);
    }
    setSearch("");
    setSearchData([]);
  };

  return (
    <>
      <div className="flex text-center font-panton font-thin z-10">
        <input
          className="bg-white outline-none py-6 px-2 pl-4 h-[30px] w-5/6 border-4 border-black rounded-b-none rounded-l-lg font-light"
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="border-black border-l-0 border-4 align-middle px-8 rounded-b-none rounded-r-lg bg-blue-400 w-1/6"
          onClick={handleBtnClick}
        >
          GUESS
        </button>
      </div>
      <div
        className={`bg-white border-black border-4 border-t-0 relative w-5/6 rounded-b-lg max-h-[10rem] overflow-scroll ${
          search === "" || searchData.length === 0 ? "hidden" : "show"
        } `}
      >
        {searchData.slice(0, 10).map((data, index) => {
          return (
            <p
              className={`p-2 font-panto font-thin hover:bg-gray-200 focus:bg-gray-200 ${
                selectedItem === index ? "bg-gray-200" : ""
              }`}
              key={index}
              onClick={handleClick}
            >
              {data.title}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default SearchBar;
