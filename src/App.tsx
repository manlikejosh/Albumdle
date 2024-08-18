import "./index.css";
import Timer from "./components/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faGear,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import Guess from "./components/Guess";

const clampTimer = {
  fontSize: "clamp(.75rem, 2.4vw, 1.2rem)",
};

const clampIcons = {
  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
};

const clampHead = {
  fontSize: "clamp(2rem, 8vw, 4.5rem)",
};
function App() {
  const [displayData, setDisplayData] = useState<any[]>([]);

  const handleBtnClick = (data: any) => {
    setDisplayData([...displayData, data]);

    console.log("displaying data:");
    console.log(displayData);
  };

  return (
    <>
      <header className=" font-panton font-thin   grid grid-cols-5 my-5 w-fit">
        <div className="  col-span-1  my-auto text-left" style={clampTimer}>
          <Timer />
        </div>
        <h1
          style={clampHead}
          className="font-bold tracking-wider     col-span-3 text-center my-auto"
        >
          Albumdle
        </h1>
        <div
          id="icons"
          style={clampIcons}
          className="    col-span-1 my-auto text-right"
        >
          <FontAwesomeIcon icon={faQuestion} className=" p-1" />
          <FontAwesomeIcon icon={faGear} className=" p-1" />
          <FontAwesomeIcon icon={faLightbulb} className=" p-1" />
        </div>
      </header>

      <div className="w-full flex flex-col ">
        <SearchBar
          placeholder="Enter your guess..."
          onButtonClick={handleBtnClick}
        />
      </div>

      {/* <div className="bg-red-300 min-h-20 border border-black w-20 mt-10">
        {displayData.map((data, index) => {
          return <p key={index}>{data.title}</p>;
        })}
      </div> */}

      <Guess />
    </>
  );
}

export default App;
