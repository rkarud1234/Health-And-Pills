import { useInfiniteQuery } from "react-query";
import { fetchUserPill } from "../api/users";

const useFetchData = () => {
  const res = useInfiniteQuery(
    ["infiniteData"],
    ({ pageParam = 0 }) => fetchUserPill(pageParam),
    {
      getNextPageParam: ({ data: { last, number } }) =>
        last ? undefined : number + 1,
    }
  );
  return res;
};

export default useFetchData;
