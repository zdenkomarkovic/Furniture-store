import { useEffect } from "react";
import { useState } from "react";

import { BsFillArrowUpCircleFill } from "react-icons/bs";
import "./ScrollToTopButton.scss";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-btn  ${isVisible ? "" : "hide"}`}
      onClick={scrollToTop}
    >
      <BsFillArrowUpCircleFill className="icon" />
    </button>
  );
};

export default ScrollToTopButton;
