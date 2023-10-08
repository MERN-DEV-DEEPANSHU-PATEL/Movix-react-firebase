import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchDataFromApi(url)
      .then((res) => {
        if (isMounted) {
          if (res.name === "AxiosError") {
            setError("Something went wrong For this movie data!");
            setLoading(false);
          } else {
            setData(res);
            setError(null);
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.response?.data?.message || "Something went wrong!");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false; // Prevent state updates if the component unmounts before the fetch completes
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
