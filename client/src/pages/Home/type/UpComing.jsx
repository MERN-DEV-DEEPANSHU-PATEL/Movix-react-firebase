import React, { useMemo } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
const UpComing = () => {
  const { data, loading, error } = useFetch(`/movie/upcoming`);
  const memoizedCarousel = useMemo(() => {
    return error ? (
      <h3 className="error">Here is some problem </h3>
    ) : (
      <Carousel data={data?.results} loading={loading} mediaType={"movie"} />
    );
  }, [data, error]);
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">UpComing Movies</span>
      </ContentWrapper>
      {memoizedCarousel}
    </div>
  );
};

export default UpComing;
