import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Carousel from "../../components/carousel/Carousel";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data, loading, error } = useFetch(`/${mediaType}/${id}`);

  const {
    data: videosList,
    loading: videosListLoading,
    error: videosListError,
  } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  const { data: similarList, loading: similarListLoading } = useFetch(
    `/${mediaType}/${id}/similar`
  );
  const { data: recommendationsList, loading: recommendationsListLoading } =
    useFetch(`/${mediaType}/${id}/recommendations`);
  return (
    <div>
      <DetailsBanner
        video={videosList?.results?.[0]}
        crew={credits?.crew}
        data={data}
        loading={loading}
        error={error}
      />
      <Cast data={credits?.cast} loading={creditsLoading} />
      {videosList?.results?.length !== 0 && (
        <VideosSection data={videosList} loading={videosListLoading} />
      )}
      {similarList?.results?.length !== 0 && (
        <Carousel
          title="Similar"
          mediaType={mediaType}
          data={similarList?.results}
          loading={similarListLoading}
        />
      )}
      {recommendationsList?.results?.length !== 0 && (
        <Carousel
          title="Recommendations"
          mediaType={mediaType}
          data={recommendationsList?.results}
          loading={recommendationsListLoading}
        />
      )}
    </div>
  );
};

export default Details;
