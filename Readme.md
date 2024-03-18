# Movie and TV Series Information Portal

[Live Project Link here ](https://movix-react-firebase-app-by-deepanshu.netlify.app)

This project is a comprehensive platform for accessing detailed information about movies and TV series. It serves as a one-stop solution for users looking to explore everything related to their favorite films and TV shows, just like IMDb.

## Features

- **User Profiles**: Create and manage user profiles to keep track of your watched movies, TV series, and wishlists.

- **Trailers and Videos**: Watch trailers and additional videos related to your favorite titles.

- **Explore Genres**: Discover content by browsing through various genres and categories.

- **Search Functionality**: Easily search for specific movies or TV series by title, genre, or keyword.

- **Recommendations**: Receive personalized recommendations based on your viewing history.

- **Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.

## Folder Structure

- package-lock.json
- package.json
- vite.config.js

---

- src/App.css
  src/App. jsx --- **Rounting Of Pages and api call for some intial data **
- src/index.scss --- **Global Styles here**
- src/main.jsx
- src/mixins.scss--- **For media Queries**

---

- src/components/Footer/Footer.jsx
- src/components/Footer/style.scss
- src/components/Header/Header.jsx ---**navigation part here**
- src/components/Header/style.scss
- src/components/carousel/Carousel.jsx
- src/components/carousel/style.scss
- src/components/circleRating/CircleRating.jsx
- src/components/circleRating/style.scss
- src/components/contentWrapper/ContentWrapper.jsx
- src/components/contentWrapper/style.scss
- src/components/genres/Genres.jsx --- **All genres **
- src/components/genres/style.scss
- src/components/lazyLoadImage/Img.jsx ---- **Lazy Load to all Images**
- src/components/movieCard/MovieCard.jsx
- src/components/movieCard/style.scss
- src/components/skeletonCard/SkeletonCard.jsx
- src/components/skeletonCard/style.scss
- src/components/spinner/Spinner.jsx
- src/components/spinner/style.scss
- src/components/switchTab/SwitchTab.jsx --- **for select on in TV show and movie or day and week **
- src/components/switchTab/style.scss
- src/components/videoPopup/VideoPopup.jsx ---**Video player for trailer**
- src/components/videoPopup/style.scss

---

**Hook for API call**

- src/hooks/useFetch.js

---

**For Single Movie Details Page**

- src/pages/404/NotFoundPage.jsx
- src/pages/404/style.scss
- src/pages/Accounts/Profile.jsx
- src/pages/Accounts/WishList.jsx
- src/pages/Accounts/WishList.scss
- src/pages/Accounts/style.scss

---

- src/pages/Details/Details.jsx
- src/pages/Details/Playbtn.jsx
- src/pages/Details/carousels/Recommendation.jsx
- src/pages/Details/carousels/Similar.jsx
- src/pages/Details/cast/Cast.jsx
- src/pages/Details/cast/style.scss
- src/pages/Details/detailBanner/DetailBanner.jsx
- src/pages/Details/detailBanner/style.scss
- src/pages/Details/detailsBanner/DetailsBanner.jsx
- src/pages/Details/detailsBanner/style.scss
- src/pages/Details/style.scss
- src/pages/Details/videosSection/VideosSection.jsx
- src/pages/Details/videosSection/style.scss

---

- src/pages/Home/HeroBanner/HeroBanner.jsx
- src/pages/Home/HeroBanner/style.scss
- src/pages/Home/Home.jsx
- src/pages/Home/style.scss
- src/pages/Home/type/Popular.jsx
- src/pages/Home/type/TopRated.jsx
- src/pages/Home/type/Trending.jsx
- src/pages/Home/type/UpComing.jsx
- src/pages/explore/Explore.jsx
- src/pages/explore/style.scss
- src/pages/searchResult/SearchResult.jsx
- src/pages/searchResult/style.scss

---

**For Global States**

- src/store/Context.jsx
- src/store/homeSlice.js

---

**For Backend Configuration with google FireBase**

- src/utils/action.js
- src/utils/api.js
- src/utils/firebase-config.js

- **API For Data**: Access a vast database of movies and TV series from TMDB's api(https://www.themoviedb.org/), including detailed information about each title

## Environment Variables

- `VITE_TMDB_TOKEN` _This is For TMBD api token get it from tmdb website_
- `VITE_APIKEY` _This for firebase config add your credential_
- `VITE_AUTHDOMAIN` _This for firebase config add your credential_
- `VITE_PROJECTID` _This for firebase config add your credential_
- `VITE_STORAGEBUKET` _This for firebase config add your credential_
- `VITE_MSID` _This for firebase config add your credential_
- `VITE_APPID` _This for firebase config add your credential_
- `VITE_MEASUREMENTID` _This for firebase config add your credential_
