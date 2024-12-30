import React from "react";
import "./Loader.scss";

const Loader = ({ active }) => {
  if (!active) return null;

  return (
    <div className="loader">
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;
