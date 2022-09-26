import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (fetcher) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const deleteData = useCallback((id) => {
    setData((prevState) => prevState.filter((item) => item.id !== id));
  }, []);

  const fetchData = useCallback(async () => {
    const { data } = await fetcher(page);
    setData((prevState) => prevState.concat(data.content));
    setPage(data.number + 1);
    setHasNextPage(!data.last);
    setFetching(false);
  }, [page]);
  useEffect(() => {
    if (isFetching && hasNextPage) fetchData();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, scrollWidth } =
        document.querySelector(".list-area");
      if (scrollWidth + scrollTop * 1.5 >= scrollHeight * 0.8) {
        setFetching(true);
      }
    };
    const listArea = document.querySelector(".list-area");
    setFetching(true);
    listArea.addEventListener("scroll", handleScroll);
    return () => listArea.removeEventListener("scroll", handleScroll);
  }, []);

  return { page, data, isFetching, hasNextPage, deleteData };
};

export default useInfiniteScroll;
