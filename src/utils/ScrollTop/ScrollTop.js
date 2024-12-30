import React, { useState, useEffect } from "react";
import "./ScrollTop.scss";

const ScrollTop = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isScrolled && (
        <button className="scroll-to-top-button" onClick={scrollTop}>
          &#9650;
        </button>
      )}
    </>
  );
};

export default ScrollTop;
