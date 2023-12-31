import { useDispatch, useSelector } from "react-redux";
import "./Categories.scss";
import { useEffect, useRef, useState } from "react";
import CategoryService from "../../services/CategoryService";
import { setAllCategories } from "../../store/categorySlice";

const Categories = () => {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(
    window.innerWidth > 600 ? 5 : 3
  );

  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categoryStore);

  useEffect(() => {
    CategoryService.allCategories()
      .then((res) => {
        dispatch(setAllCategories(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(window.innerWidth > 600 ? 5 : 3);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateSlide = (newCurrent) => {
    setCurrent(newCurrent);
  };

  const nextSlide = () => {
    updateSlide(current === categories.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    updateSlide(current === 0 ? categories.length - 1 : current - 1);
  };

  const getSlides = () => {
    let slides = [];
    if (categories && categories.length > 0) {
      for (let i = 0; i < slidesToShow; i++) {
        const index = (current + i) % categories.length;
        if (categories[index]) {
          slides.push(categories[index]);
        }
      }
    }
    return slides;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prevCurrent) =>
        prevCurrent === categories.length - 1 ? 0 : prevCurrent + 1
      );
    }, 2000);

    return () => clearInterval(timer);
  }, [updateSlide]);

  const threshold = 50;

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX;
    const diff = startX - x;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setStartX(x);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const x = touch.clientX;
    const diff = startX - x;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) nextSlide();
      else prevSlide();
      setStartX(x);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="category-wrapper ">
      <div
        ref={sliderRef}
        className="slider"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {getSlides().map((category, i) => {
          let positionClass = "";
          if (window.innerWidth > 600) {
            if (i === 0) positionClass = "left2";
            else if (i === 1) positionClass = "left";
            else if (i === 2) positionClass = "center";
            else if (i === 3) positionClass = "right";
            else if (i === 4) positionClass = "right2";
          } else {
            if (i === 0) positionClass = "left";
            else if (i === 1) positionClass = "center";
            else if (i === 2) positionClass = "right";
          }
          return (
            <div key={i} className={`category-item ${positionClass}`}>
              <h6>{category.title}</h6>
              <img src={category.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
