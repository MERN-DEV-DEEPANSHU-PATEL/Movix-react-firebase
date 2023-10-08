import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { Context } from "../../../store/Context";

const HeroBanner = () => {
  const navigate = useNavigate();

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { url } = useContext(Context);
  const { data, loading, error } = useFetch("/movie/upcoming");

  // Memoize the random background calculation
  const getRandomBackground = useCallback(() => {
    if (error) {
      return "none";
    } else {
      const randomIndex = Math.floor(Math.random() * 20);
      return url.backdrop + data?.results?.[randomIndex]?.backdrop_path;
    }
  }, [url.backdrop, data]);

  useEffect(() => {
    if (!loading) {
      setBackground(getRandomBackground());
    }
  }, [data, loading, getRandomBackground]); // Use getRandomBackground in dependency array

  const searchQueryHandler = (event) => {
    if (
      (event.key === "Enter" && query.length > 0) ||
      (event.target.tagName === "BUTTON" && query.length > 0)
    ) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of movies, TV shows, and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or TV show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={searchQueryHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
