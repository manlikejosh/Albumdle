import AlbumList from "./AlbumList";

const AlbumListPage = () => {
  return (
    <>
      <div className=" w-full h-full opacity-0 min-[650px]:opacity-100 absolute ">
        <div className=" wave -z-50 absolute self-center"></div>
      </div>
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-4">All Albums</h1>
        <AlbumList />
      </div>
    </>
  );
};

export default AlbumListPage;
