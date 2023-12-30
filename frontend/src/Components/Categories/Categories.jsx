import { useDispatch, useSelector } from "react-redux";
import "./Categories.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import CategoryService from "../../services/CategoryService";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { setAllCategories } from "../../store/categorySlice";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCards,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const Categories = () => {
  const [width, setWidth] = useState(0);
  const wrapper = useRef();
  const [imageIndex, setImageIndex] = useState(0);
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
  }, [categories]);

  useEffect(() => {
    setWidth(wrapper.current.scrollWidth - wrapper.current.offsetWidth);
  }, []);

  const handleShowNext = () => {};
  const handleShowPrevious = () => {};

  return (
    <div className="category-wrapper container">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        ref={wrapper}
        className="wrapper"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="inner-wrapper"
        >
          {categories.map((category, i) => {
            return (
              <motion.div key={i} className="category">
                <h6>{category.title}</h6>
                <img src={category.image} />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
      <div className="third-wrapper">
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Autoplay,
            EffectCards,
            EffectCoverflow,
          ]}
          effect={"coverflow"}
          coverflowEffect={{
            rotate: 0,
            strech: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
            scale: 1,
          }}
          autoplay={{ delay: 1500 }}
          slidesPerView={2}
          centeredSlides={true}
          loop={true}
          navigation
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            600: {
              slidesPerView: 3,
            },
          }}
        >
          {categories?.map((category, i) => {
            return (
              <SwiperSlide key={i}>
                <h6>{category.title}</h6>
                <img src={category.image} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
