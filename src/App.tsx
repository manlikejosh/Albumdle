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

function App() {
  const [displayData, setDisplayData] = useState<any[]>([]);

  const handleBtnClick = (data: any) => {
    setDisplayData([...displayData, data]);

    console.log("displaying data:");
    console.log(displayData);
  };

  return (
    <>
      <header className=" font-panton font-thin  flex flex-row justify-center p-4 mt-4 ">
        <div className=" mr-5  h-fit my-auto">
          <Timer />
        </div>
        <h1 className="text-6xl  mx-auto font-bold tracking-wider">Albumdle</h1>
        <div
          id="icons"
          className="text-2xl flex flex-row justify-center items-center   ml-5 h-fit my-auto"
        >
          <FontAwesomeIcon icon={faQuestion} className=" p-1" />
          <FontAwesomeIcon icon={faGear} className=" p-1" />
          <FontAwesomeIcon icon={faLightbulb} className=" p-1" />
        </div>
      </header>

      <div className="w-1/2 ">
        <SearchBar
          placeholder="Enter your guess..."
          onButtonClick={handleBtnClick}
        />
      </div>

      <div className="bg-red-300 min-h-20 border border-black w-20">
        {displayData.map((data, index) => {
          return <p key={index}>{data.title}</p>;
        })}
      </div>
    </>
  );
}

export default App;
