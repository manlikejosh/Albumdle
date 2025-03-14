import AlbumList from "./AlbumList";
import { getAllItems } from "../../utilities/apiHelper";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Modals/Loading";
import { Album } from "../../types/types";

const AlbumListPage = () => {
  const [data, setData] = useState<Album[] | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const allAlbums = await getAllItems();
        setData(allAlbums);
      } catch (error) {
        console.error("Error fetching albums:", error);
        alert(
          "There was an error fetching data, please refresh or come back later"
        );
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className=" w-full h-full opacity-0 min-[650px]:opacity-100 absolute ">
        <div className=" wave -z-50 absolute self-center"></div>
      </div>
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-4">All Albums</h1>
        {!data || data.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <AlbumList data={data} />
        )}{" "}
      </div>
    </>
  );
};

export default AlbumListPage;
