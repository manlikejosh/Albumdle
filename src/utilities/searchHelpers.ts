import { Album } from "../types/types";

export const filterAlbums = (albums: Album[], query: string): Album[] => {
  if (query === "") return [];

  const lowerQuery = query.toLowerCase();
  const filtered = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(lowerQuery) ||
      album.artist.toLowerCase().includes(lowerQuery)
  );

  // Sort albums by relevance: titles starting with the query come first
  filtered.sort((a, b) => {
    const aTitleLower = a.title.toLowerCase();
    const bTitleLower = b.title.toLowerCase();
    const aStarts = aTitleLower.startsWith(lowerQuery);
    const bStarts = bTitleLower.startsWith(lowerQuery);

    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return aTitleLower.localeCompare(bTitleLower);
  });

  // Check for exact title match regardless of filtered array length
  const exactMatch = filtered.find(
    (album) => album.title.toLowerCase() === lowerQuery
  );

  if (exactMatch) {
    return [exactMatch];
  }

  return filtered;
};

export const handleKeyNavigation = (
  e: React.KeyboardEvent<HTMLInputElement>,
  highlightedIndex: number,
  filteredAlbums: Album[],
  setHighlightedIndex: (index: number) => void,
  setSearchQuery: (query: string) => void
): void => {
  if (highlightedIndex < filteredAlbums.length) {
    if (e.key === "ArrowUp" && highlightedIndex > 0) {
      setHighlightedIndex(highlightedIndex - 1);
    } else if (
      e.key === "ArrowDown" &&
      highlightedIndex < filteredAlbums.length - 1
    ) {
      setHighlightedIndex(highlightedIndex + 1);
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      setSearchQuery(filteredAlbums[highlightedIndex].title);
    }
  } else {
    setHighlightedIndex(-1);
  }
};

export const handleSuggestionClick = (
  e: React.MouseEvent<HTMLParagraphElement>,
  setSearchQuery: (query: string) => void
): void => {
  const target = e.target as HTMLParagraphElement;
  setSearchQuery(target.innerText.split("-")[0].trimEnd());
}; 