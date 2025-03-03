import { Dispatch, SetStateAction } from "react";

const Modal: React.FC<{ closeModal: Dispatch<SetStateAction<boolean>> }> = ({
  closeModal,
}) => {
  return (
    <>
      <div className="absolute w-full h-full bg-black bg-opacity-40 z-50 content-center ">
        <div className="border-2 border-black bg-white rounded-md w-[300px] h-[400px] mx-auto overflow-y-scroll ">
          <header className="l font-bold tracking-wider  text-3xl border-b-2 border-black flex justify-between">
            <h3 className=" pl-1 my-auto">HOW TO PLAY</h3>
            <button
              onClick={() => {
                closeModal(false);
              }}
              className="bg-red-400 w-1/4 h-full p-1 py-3 text-white rounded-tr-sm "
            >
              X
            </button>
          </header>

          <section className="p-2 l ">
            <p className="py-1">
              Every day a new album is presented for you to guess!
            </p>
            <p className="py-1">
              Type the name an album to start your turn. The color of the square
              indicates how close you are to the correct category.
            </p>
            <section className="text-center flex text-xs  justify-between py-1">
              <p>
                <span className="text-lg font-bold text-green-400">Green</span>
                <br /> Correct Guess
              </p>
              <p>
                <span className="text-lg font-bold text-yellow-400">
                  Yellow
                </span>
                <br /> Partially correct
              </p>
              <p>
                <span className="text-lg font-bold text-red-400">Red</span>
                <br /> Incorrect Guess
              </p>
            </section>

            <p className="py-1">
              The year, rating, and ranking boxes will include arrows showing if
              your guess was too high or low. A yellow box means your guess is
              within 10 years, 10 ranks, or 0.5 rating points of the correct
              album.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Modal;
