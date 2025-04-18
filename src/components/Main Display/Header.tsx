import {
  faQuestion,
  faBook,
  faBarChart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timer from "./Timer";

type HeaderProps = {
  onHelpClick: () => void;
  onStatClick: () => void;
};

function Header({ onHelpClick, onStatClick }: HeaderProps) {
  const headingStyles = {
    fontSize: "clamp(1.5rem, 6.5vw, 4.5rem)",
  };
  const timerStyles = {
    fontSize: "clamp(.75rem, 2.4vw, 1.2rem)",
  };
  const iconStyles = {
    fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
  };

  return (
    <>
      <header className="grid grid-cols-5 my-5 w-fit z-50 ">
        <div className="col-span-1 my-auto text-left" style={timerStyles}>
          <Timer style={false} />
        </div>
        <h1
          style={headingStyles}
          className="font-bold tracking-wider col-span-3 text-center my-auto"
        >
          Album Guesser
        </h1>
        <div
          id="icons"
          style={iconStyles}
          className="col-span-1 my-auto text-right"
        >
          <button onClick={onHelpClick}>
            <FontAwesomeIcon icon={faQuestion} className="p-1" />
          </button>
          <button onClick={onStatClick}>
            <FontAwesomeIcon icon={faBarChart} className="p-1" />
          </button>
          <button onClick={() => window.open("/album-list", "_blank")}>
            <FontAwesomeIcon icon={faBook} className="p-1" />
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
