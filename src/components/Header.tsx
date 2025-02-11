import {
  faQuestion,
  faGear,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timer from "./Timer";

type HeaderProps = {
  onHelpClick: () => void;
  onSettingsClick: () => void;
};

function Header({ onHelpClick, onSettingsClick }: HeaderProps) {
  const headingStyles = {
    fontSize: "clamp(2rem, 8vw, 4.5rem)",
  };
  const timerStyles = {
    fontSize: "clamp(.75rem, 2.4vw, 1.2rem)",
  };
  const iconStyles = {
    fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
  };

  return (
    <>
      <header className="font-panton font-thin grid grid-cols-5 my-5 w-fit">
        <div className="col-span-1 my-auto text-left" style={timerStyles}>
          <Timer />
        </div>
        <h1
          style={headingStyles}
          className="font-bold tracking-wider col-span-3 text-center my-auto"
        >
          Albumdle
        </h1>
        <div
          id="icons"
          style={iconStyles}
          className="col-span-1 my-auto text-right"
        >
          <button onClick={onHelpClick}>
            <FontAwesomeIcon icon={faQuestion} className="p-1" />
          </button>
          <button onClick={onSettingsClick}>
            <FontAwesomeIcon icon={faGear} className="p-1" />
          </button>
          <FontAwesomeIcon icon={faLightbulb} className="p-1" />
        </div>
      </header>
    </>
  );
}

export default Header;
