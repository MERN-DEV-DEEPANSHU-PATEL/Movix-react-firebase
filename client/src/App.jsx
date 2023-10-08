import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFoundPage from "./pages/404/NotFoundPage";
import Explore from "./pages/explore/Explore";
import Home from "./pages/Home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import { useCallback, useContext, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import Details from "./pages/Details/Details";
import Profile from "./pages/Accounts/Profile";
import { Context } from "./store/Context";
import WishList from "./pages/Accounts/WishList";
import { auth } from "./utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const { setUrl, setGenres, user, setUser } = useContext(Context);
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    }
  }, [user]);
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  const fetchApiConfig = useCallback(() => {
    fetchDataFromApi("/configuration").then((res) => {
      const urls = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      setUrl(urls);
    });
  }, []);

  const genresCall = useCallback(async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    setGenres(allGenres);
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/wishlist" element={<WishList />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
