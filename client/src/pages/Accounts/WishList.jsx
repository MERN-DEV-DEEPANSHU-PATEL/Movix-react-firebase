import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../store/Context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase-config";
import { getMoviesFromWishlist } from "../../utils/action";
import "./WishList.scss";
import MovieCard from "../../components/movieCard/MovieCard";
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

const WishList = () => {
  const { user, setUser, wishList, setWishList } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [ifError, setIfError] = useState("");
  const fetchWishList = useCallback(async () => {
    try {
      const data = await getMoviesFromWishlist(user);
      if (data.name === "FirebaseError") {
        setIfError(data.message);
        setWishList([]);
      } else setWishList(data);
    } catch (error) {
      setIfError(error);
      setWishList([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      fetchWishList();
    }

    return () => {
      unsubscribe();
    };
  }, [user, setUser]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user || wishList === "No Movie" || wishList.length === 0) {
    return (
      <div className="empty-wl">
        <h2 className="empty-wl">
          {ifError ? ifError : "No Movies. Go explore and add your movies."}
        </h2>
        <Link className="btn-nav" to="/explore/movie">
          Explore
        </Link>
      </div>
    );
  } else {
    return (
      <div className="wishlist">
        {wishList?.map((movie) => (
          <MovieCard
            key={movie.id}
            profile={true}
            data={movie}
            mediaType={"movie"}
          />
        ))}
      </div>
    );
  }
};

export default WishList;
