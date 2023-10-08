import React, { useMemo, useState } from "react";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
const Popular = () => {
  const onTabChange = (tab) => {
    setMediaType(tab === "Movies" ? "movie" : "tv");
  };
  const [mediaType, setMediaType] = useState("movie");
  const { data, loading, error } = useFetch(`/${mediaType}/popular`);

  const memoizedCarousel = useMemo(() => {
    return error ? (
      <h3 className="error">Here is some problem </h3>
    ) : (
      <Carousel data={data?.results} loading={loading} mediaType={mediaType} />
    );
  }, [data, loading, error]);
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Popular</span>
        <SwitchTab data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      {memoizedCarousel}
    </div>
  );
};

export default Popular;
