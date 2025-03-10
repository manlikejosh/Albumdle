const Error = () => {
  return (
    <>
      <div className="border-2 border-black bg-white rounded-md w-[300px] h-fit mx-auto overflow-y-scroll">
        <h1>
          Sorry, there was an error. Try refreshing the page or come back later!
        </h1>
        <button
          className="px-4 py-2 bg-lightBlue text-white"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    </>
  );
};
