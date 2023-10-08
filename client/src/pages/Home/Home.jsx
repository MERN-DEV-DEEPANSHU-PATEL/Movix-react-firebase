import "./style.scss";
import React, { useEffect, useContext, Suspense } from "react";
import { Context } from "../../store/Context";
import { auth } from "../../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Spinner from "../../components/spinner/Spinner";
import HeroBanner from "./HeroBanner/HeroBanner";
const LazyTrending = React.lazy(() => import("./type/Trending"));
const LazyPopular = React.lazy(() => import("./type/Popular"));
const LazyTopRated = React.lazy(() => import("./type/TopRated"));
const LazyUpComing = React.lazy(() => import("./type/UpComing"));

const Home = () => {
  const { setUser, user } = useContext(Context);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  useEffect(() => {
    const reLogin = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => reLogin();
  }, [setUser]);

  return (
    <div className="homePage">
      <HeroBanner />
      <Suspense fallback={<Spinner />}>
        <LazyTrending />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <LazyPopular />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <LazyTopRated />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <LazyUpComing />
      </Suspense>
    </div>
  );
};

export default Home;
