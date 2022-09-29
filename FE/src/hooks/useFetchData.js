import { useInfiniteQuery } from "react-query";

const useFetchData = (fetchUrl, queryKey) => {
  const res = useInfiniteQuery(
    [queryKey],
    ({ pageParam = 0 }) => fetchUrl(pageParam),
    {
      getNextPageParam: ({ data: { last, number } }) =>
        last ? undefined : number + 1,
    }
  );
  return res;
};

export default useFetchData;
