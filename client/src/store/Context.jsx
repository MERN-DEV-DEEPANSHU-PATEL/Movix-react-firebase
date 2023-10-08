/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertText, setAlertText] = useState("");
  const [url, setUrl] = useState({});
  const [genres, setGenres] = useState({});
  const [user, setUser] = useState(null);
  const [wishList, setWishList] = useState([]);
  return (
    <Context.Provider
      value={{
        wishList,
        setWishList,
        isLoading,
        setIsLoading,
        showAlert,
        setShowAlert,
        alertText,
        setAlertText,
        alertType,
        setAlertType,
        url,
        setUrl,
        user,
        setUser,
        genres,
        setGenres,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
