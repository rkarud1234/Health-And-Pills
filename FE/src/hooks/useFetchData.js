import { useInfiniteQuery, useQueryClient, useMutation } from "react-query";

const useFetchData = (fetchUrl, queryKey, updateFn, deleteFn, ...rest) => {
  const queryClient = useQueryClient();
  const res = useInfiniteQuery(
    [queryKey],
    ({ pageParam = 0 }) => fetchUrl(pageParam, rest),
    {
      getNextPageParam: ({ data: { last, number } }) =>
        last ? undefined : number + 1,
    }
  );
  const updateMutation = useMutation(updateFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      alert("수정되었습니다.");
    },
  });

  const deleteMutation = useMutation(deleteFn, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
      alert("삭제되었습니다.");
    },
  });
  return { res, updateMutation, deleteMutation };
};

export default useFetchData;
