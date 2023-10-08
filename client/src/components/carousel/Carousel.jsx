import React, { useContext, useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";

import SkeletonCard from "../skeletonCard/SkeletonCard";
import { Context } from "../../store/Context";
import MovieCard from "../movieCard/MovieCard";
const Carousel = ({ profile = false, data, loading, mediaType, title }) => {
  const carouselContainer = useRef();
  const { url } = useContext(Context);
  console.log(data);
  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - container.offsetWidth
        : container.scrollLeft + container.offsetWidth;
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item, index) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <MovieCard
                  profile={profile}
                  key={item.id}
                  data={item}
                  mediaType={mediaType}
                />
              );
            })}
          </div>
        ) : (
          <SkeletonCard />
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
