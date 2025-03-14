import AlbumItem from "./AlbumItem";
import { Album } from "../../types/types";

type Props = {
  data: Album[];
};

const AlbumList = ({ data }: Props) => {
  return (
    <>
      <div className="grid single:grid-cols-1 double:grid-cols-2 py-2 gap-2">
        {data.map((album, index) => (
          <AlbumItem album={album} key={index} />
        ))}
      </div>
    </>
  );
};
export default AlbumList;
