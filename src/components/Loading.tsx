import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const LoadingSpinner: React.FC = () => {
  return (
    <div className=" justify-center items-center p-2 flex flex-col">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin text-6xl mb-3"
      />
      <p>Loading data.... </p>
    </div>
  );
};

export default LoadingSpinner;
