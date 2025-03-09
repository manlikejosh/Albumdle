import { useState, useEffect, useRef } from "react";
import data from "../../data/data.json";
import { Album } from "../../types/types";

// Define the type for your album data

interface Props {
  placeholder: string;
  onButtonClick: (albums: Album[]) => void;
}

const SearchBar = ({ placeholder, onButtonClick }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef<(HTMLParagraphElement | null)[]>([]); // Create refs for each list item

  // Handle keydown events for navigation and selection in the search list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (highlightedIndex < filteredAlbums.length) {
      if (e.key === "ArrowUp" && highlightedIndex > 0) {
        setHighlightedIndex((prevIndex) => prevIndex - 1);
      } else if (
        e.key === "ArrowDown" &&
        highlightedIndex < filteredAlbums.length - 1
      ) {
        setHighlightedIndex((prevIndex) => prevIndex + 1);
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        setSearchQuery(filteredAlbums[highlightedIndex].title);
      }
    } else {
      setHighlightedIndex(-1);
    }
  };

  // Update search query state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle click on individual album suggestions
  const handleSuggestionClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const target = e.target as HTMLParagraphElement;
    setSearchQuery(target.innerText.split("-")[0].trimEnd()); // split so only the ablum title is set as the serach query
  };

  // Update filtered albums based on search query
  useEffect(() => {
    if (searchQuery !== "") {
      const newFilteredAlbums = data.filter(
        (album: Album) =>
          album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          album.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAlbums(newFilteredAlbums);
    } else {
      setFilteredAlbums([]);
    }
  }, [searchQuery]);

  // Handle the guess button click
  const handleSearchSubmit = () => {
    if (filteredAlbums.length === 0) {
      alert("No results found");
    } else {
      onButtonClick(filteredAlbums);
    }
    setSearchQuery("");
    setFilteredAlbums([]);
  };

  // Use effect to scroll the highlighted item into view when the index changes
  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  return (
    <>
      <div className="flex text-center l font-medium mx-auto z-50">
        <div className="w-[60vw] max-w-[530px]">
          <input
            className="bg-white outline-none h-fit border-2 border-black px-2 py-3 w-full font-medium"
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <div className="w-full relative">
            <div
              className={`bg-white border-2 z-50 border-black border-t-0 rounded-b-md w-full overflow-scroll absolute text-start scroll-smooth max-h-[130px] ${
                searchQuery === "" || filteredAlbums.length === 0
                  ? "hidden"
                  : "show"
              }`}
            >
              {filteredAlbums.map((album, index) => (
                <p
                  className={`p-1 l font-medium hover:bg-gray-200 ${
                    highlightedIndex === index ? "bg-gray-200" : ""
                  }`}
                  key={index}
                  onClick={handleSuggestionClick}
                  ref={(el) => (itemRefs.current[index] = el)} // Assign ref to each item
                >
                  {album.title} -{" "}
                  <span className={`pointer-events-none	 font-normal`}>
                    {album.artist}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <button
          className="border-2 border-black px-2 border-l-0 bg-lightBlue active:bg-mediumBlue h-[52px]"
          onClick={handleSearchSubmit}
        >
          GUESS
        </button>
      </div>
    </>
  );
};

export default SearchBar;
