import { useState, useEffect } from "react";

import data from "./data.json";

// Define the type for your album data
interface Album {
  title: string;
  artist: string;
  ratings: number;
  year: number;
  genres: string[];
  style: string[];
  tracklist: number;
}

interface Props {
  placeholder: string;
  onButtonClick: (data: any) => void;
}

const SearchBar = ({ placeholder, onButtonClick }: Props) => {
  const [search, setSearch] = useState(""); // set the initial state of the searchbar value
  const [searchData, setSearchData] = useState<Album[]>([]); // Use the Album type here
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const target = e.target as HTMLParagraphElement;

    setSearch(target.innerText);
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
      <div className="flex text-center font-pantonT font-medium  mx-auto z-50">
        <div className="w-[60vw] max-w-[530px]">
          <input
            className="bg-white outline-none h-fit border-2 border-black px-2 py-3  w-full font-medium "
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div className="w-full relative">
            <div
              className={`bg-white border-2 z-50 border-black border-t-0 rounded-b-md  w-full overflow-scroll absolute text-start scroll-smooth max-h-[130px] ${
                search === "" || searchData.length === 0 ? "hidden" : "show"
              } `}
            >
              {searchData.slice(0, 10).map((data, index) => {
                return (
                  <p
                    className={`p-1 font-panto font-medium hover:bg-gray-200 focus:bg-gray-200 ${
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
          </div>
        </div>

        <button
          className="border-2 border-black px-2 border-l-0 bg-blue-200 h-[52px]"
          onClick={handleBtnClick}
        >
          GUESS
        </button>
      </div>
    </>
  );
};

export default SearchBar;
