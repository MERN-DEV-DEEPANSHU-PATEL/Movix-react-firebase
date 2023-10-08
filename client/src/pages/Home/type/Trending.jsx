import React, { useState, useMemo } from "react";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Trending = () => {
  const onTabChange = (tab) => {
    setMediaType(tab === "Day" ? "day" : "week");
  };

  const [mediaType, setMediaType] = useState("day");
  const { data, loading, error } = useFetch(`/trending/all/${mediaType}`);

  // Memoize the Carousel component and its dependencies
  const memoizedCarousel = useMemo(() => {
    return error ? (
      <h3 className="error">Here is some problem </h3>
    ) : (
      <Carousel data={data?.results} loading={loading} mediaType={"movie"} />
    );
  }, [data, loading, error]);
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      {memoizedCarousel}
    </div>
  );
};

export default React.memo(Trending);
