import React from "react";
import { Album } from "../../types/types";

type Props = {
  album: Album;
};

const AlbumItem: React.FC<Props> = ({ album }) => {
  return (
    <>
      <div className="border-2 rounded-md border-black h-[100px] w-[300px] single:h-[150px] single:w-[450px]  flex overflow-scroll ">
        <div className="w-1/3 border-black">
          <img
            className="w-full h-full object-cover rounded-l-md"
            src={album.cover_url}
          />
        </div>
        <ul className="w-2/3 flex flex-col p-1 font-pantonT">
          <li className="text-xs single:text-lg">
            <p>{album.title}</p>
          </li>
          <li className="text-[0.625rem] single:text-md">
            <p>{album.artist}</p>
          </li>
          <li className="text-[0.625rem] single:text-sm">
            <p>Release year: {album.date}</p>
          </li>
          <li className="text-[0.625rem] single:text-xs ">
            <p>{album.main_genre}</p>
          </li>
          <li className="text-[0.625rem] single:text-xs">
            <p>{album.sub_genre}</p>
          </li>
          <li className="text-[0.625rem] single:text-xs">
            <p>Rate your music ranking: {album.ranking}</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AlbumItem;
