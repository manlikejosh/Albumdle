import { useState, useEffect, useRef, useCallback } from "react";
import { Album } from "../../types/types";
import { getAllItems } from "../../utilities/apiHelper";
import { filterAlbums, handleKeyNavigation } from "../../utilities/searchHelpers";

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
      setFilteredAlbums(filterAlbums(allAlbumsRef.current, query));
    }, 300);
  }, []);

  // Handle keydown events for navigation and selection in the search list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyNavigation(e, highlightedIndex, filteredAlbums, setHighlightedIndex, setSearchQuery);
  };

  // Update search query and trigger debounced search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle the guess button click
  const handleSubmit = () => {
    if (filteredAlbums.length === 0) {
      setIsVisible(true);
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
    onClick={(e) => {
      // Extract the title from the clicked element
      const target = e.target as HTMLParagraphElement;
      let title = target.innerText.split(" - ")[0].trimEnd();
      
      // Update the search query
      setSearchQuery(title);
      // Immediately find and set the exact album
      const exactAlbum = allAlbumsRef.current.find(
        (a) => a.title.toLowerCase() === title.toLowerCase()
      );
      console.log(exactAlbum);
      setFilteredAlbums(exactAlbum ? [exactAlbum] : []);
    }}
    ref={(el) => (itemRefs.current[index] = el)}
  >
    {album.title} -{" "}
    <span className={`pointer-events-none font-normal`}>
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
          onClick={handleSubmit}
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
