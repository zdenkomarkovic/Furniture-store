import { useDispatch, useSelector } from "react-redux";
import "./Categories.scss";
import { useEffect } from "react";
import CategoryService from "../../services/CategoryService";

import { setAllCategories } from "../../store/categorySlice";

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

  return (
    <div className="category-wrapper">
      <div className="slider">
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
