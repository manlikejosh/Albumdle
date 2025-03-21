import { useState, useEffect, useRef, useCallback } from "react";
import { Album } from "../../types/types";
import { getAllItems } from "../../utilities/apiHelper";

// Define the type for your album data

interface Props {
  placeholder: string;
  onButtonClick: (albums: Album[]) => void;
  disabled?: boolean;
}

const SearchBar = ({ onButtonClick, placeholder, disabled = false }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef<(HTMLParagraphElement | null)[]>([]); // Create refs for each list item
  const [isVisible, setIsVisible] = useState(false);
  const allAlbumsRef = useRef<Album[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // Fetch all albums once on component mount
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        allAlbumsRef.current = await getAllItems();
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback((query: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (query === "") {
        setFilteredAlbums([]);
        return;
      }

      const filtered = allAlbumsRef.current.filter(
        (album) =>
          album.title.toLowerCase().includes(query.toLowerCase()) ||
          album.artist.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered.length > 1) {
        const exactMatch = filtered.find((album: Album) => 
          album.title.toLowerCase() === query.toLowerCase()
        );
        if (exactMatch) {
          setFilteredAlbums([exactMatch]);
          return;
        }
      }
      setFilteredAlbums(filtered);
    }, 300); // 300ms debounce delay
  }, []);

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

  // Update search query and trigger debounced search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle click on individual album suggestions
  const handleSuggestionClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const target = e.target as HTMLParagraphElement;
    console.log(target);
    setSearchQuery(target.innerText.split("-")[0].trimEnd()); // split so only the ablum title is set as the serach query
  };

  // Handle the guess button click
  const handleSearchSubmit = () => {
    if (filteredAlbums.length === 0) {
      setIsVisible(true);
    } else {
      onButtonClick(filteredAlbums);
      console.log(filteredAlbums);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup function
  }, [isVisible]);

  return (
    <>
      <div className="flex text-center l font-medium mx-auto z-50 realtive">
        <div className="w-[60vw] max-w-[530px]">
          <input
            className={`bg-white outline-none h-fit border-2 border-black px-2 py-3 w-full font-medium ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
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
          className={`border-2 border-black px-2 border-l-0 bg-lightBlue active:bg-mediumBlue h-[52px] ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSearchSubmit}
          disabled={disabled}
        >
          GUESS
        </button>
      </div>

      <div className="h-6 flex justify-center mt-2">
        {isVisible && (
          <div className="bg-red-400 rounded-md px-4 left-1/2 fade-in-out">
            NO RESULT FOUND
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
