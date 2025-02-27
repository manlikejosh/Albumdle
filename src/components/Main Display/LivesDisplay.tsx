import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LivesProps = {
  lives: string[];
};

const LivesDisplay = ({ lives }: LivesProps) => {
  const iconStyles = {
    fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
  };

  return (
    <>
      <div className="flex flex-row mt-2 " id="lives">
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[0]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[1]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[2]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[3]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[4]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[5]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[6]}`}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={iconStyles}
          className={`p-1 mx-1 sm:mx-2  transition-colors duration-500 ${lives[7]}`}
        />
      </div>
    </>
  );
};
export default LivesDisplay;
