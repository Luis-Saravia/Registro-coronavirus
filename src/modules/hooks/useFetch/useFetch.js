import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  // "https://disease.sh/v3/covid-19/historical/all?lastdays=all"

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);
    fetch(url, { signal: abortController.signal })
      .then((res) => res.json())
      .then((info) => setData(info))
      .catch((error) => {
        if (error.name === "AboutError") {
          console.log("Request Canceled")
        } else {
          setError(error);
        }
      })
      .finally(() => setLoading(false));

    // return () =>{ return abortController.abort() };
  }, []);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Request Canceled");
    }
  };

  return { data, loading, error, handleCancelRequest };
}
