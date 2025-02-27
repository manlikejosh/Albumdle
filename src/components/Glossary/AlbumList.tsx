import data from "../data.json";
import AlbumItem from "./AlbumItem";
import { Album } from "../../types/types";

const AlbumList = () => {
  const albums: Album[] = data as Album[];

  return (
    <>
      <div className="grid single:grid-cols-1 double:grid-cols-2 py-2 gap-2">
        {albums.map((album, index) => (
          <AlbumItem album={album} key={index} />
        ))}
      </div>
    </>
  );
};
export default AlbumList;
