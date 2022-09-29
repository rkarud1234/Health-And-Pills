import { useInfiniteQuery, useQueryClient, useMutation } from "react-query";

const useFetchData = (fetchUrl, queryKey, updateFn, deleteFn) => {
  const queryClient = useQueryClient();
  const res = useInfiniteQuery(
    [queryKey],
    ({ pageParam = 0 }) => fetchUrl(pageParam),
    {
      getNextPageParam: ({ data: { last, number } }) =>
        last ? undefined : number + 1,
    }
  );
  const updateMutation = useMutation(updateFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const deleteMutation = useMutation(deleteFn, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
  });
  return { res, updateMutation, deleteMutation };
};

export default useFetchData;
