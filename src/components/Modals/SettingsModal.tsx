import { Dispatch, SetStateAction } from "react";

const Modal: React.FC<{ closeModal: Dispatch<SetStateAction<boolean>> }> = ({
  closeModal,
}) => {
  return (
    <>
      <div className="absolute w-full h-full bg-black bg-opacity-40 z-50 content-center ">
        <div className="border-2 border-black bg-white rounded-md w-[300px] h-[400px] mx-auto overflow-y-scroll ">
          <header className="l font-bold tracking-wider  text-3xl border-b-2 border-black flex justify-between">
            <h3 className=" pl-1 my-auto">SETTINGS</h3>
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
            <p>
              Click{" "}
              <button
                onClick={() => window.open("/album-list", "_blank")}
                className="underline"
              >
                Here
              </button>{" "}
              to see the full list of albums!
            </p>

            <p></p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Modal;
