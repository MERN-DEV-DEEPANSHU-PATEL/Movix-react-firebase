import React, { useCallback, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import { MdAdd, MdDeleteForever } from "react-icons/md";
import { Context } from "../../store/Context";
import {
  addMovieInWishlist,
  removeMovieFromWishlist,
} from "../../utils/action";
const MovieCard = ({ profile = false, data, mediaType }) => {
  const { url, user, setWishList } = useContext(Context);
  const [showAddedMessage, setShowAddedMessage] = useState({
    show: false,
    message: "",
    type: "",
  });
  var timeRemove = null; // Initialize timeRemove to null

  const navigate = useNavigate();
  const posterUrl = data?.poster_path
    ? url.poster + data?.poster_path
    : PosterFallback;

  const addToList = useCallback(
    async (movie, event) => {
      event.stopPropagation();
      movie.media_Type = mediaType;
      const data = await addMovieInWishlist(user, movie);
      if (data === "Not User") {
        setShowAddedMessage({
          show: true,
          message: "Please Login",
          type: "alert-yellow",
        });
      } else if (data === "Already Added") {
        setShowAddedMessage({
          show: true,
          message: "Already Added",
          type: "alert-yellow",
        });
      } else if (data.code) {
        setShowAddedMessage({
          show: true,
          message: data.message,
          type: "alert-red",
        });
      } else {
        setWishList(() => data);
        setShowAddedMessage({
          show: true,
          message: "Movie Added",
          type: "alert-green",
        });
      }
      clearTimeout(timeRemove);
      timeRemove = setTimeout(() => {
        setShowAddedMessage({ show: false });
      }, 1500);
    },
    [user]
  );

  const removeFromList = useCallback(
    async (movie, event) => {
      event.stopPropagation();
      const data = await removeMovieFromWishlist(user, movie);
      if (data.code) {
        setShowAddedMessage({
          show: true,
          message: data.message,
          type: "alert-red",
        });
      } else {
        setWishList(data);
      }
    },
    [user]
  );
  return (
    <>
      <div
        className="movieCard"
        onClick={() =>
          navigate(`/${data.media_Type ? data.media_Type : "movie"}/${data.id}`)
        }
      >
        {showAddedMessage.show && (
          <div className={`movieAddedMessage ${showAddedMessage.type}`}>
            {showAddedMessage.message}
          </div>
        )}

        <div className="posterBlock">
          <Img className="posterImg" src={posterUrl} />
          <React.Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
          {profile ? (
            <button
              className="add"
              title="Add to wishlist"
              onClick={(event) => removeFromList(data, event)}
            >
              <MdDeleteForever />
            </button>
          ) : (
            <button
              className="add"
              title="Add to wishlist"
              onClick={(event) => addToList(data, event)}
            >
              <MdAdd />
            </button>
          )}
        </div>
        <div className="textBlock">
          <span className="title">{data.title || data.name}</span>
          <span className="date">
            {dayjs(data.release_date).format("MMM D, YYYY")}
          </span>
        </div>
      </div>
    </>
  );
};

export default React.memo(MovieCard);
