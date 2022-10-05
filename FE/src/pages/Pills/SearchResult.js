import React, { useMemo } from 'react'
import styled from 'styled-components'
import useFetchData from "../../hooks/useFetchData";
import useIntersect from "../../hooks/useIntersect";
import { useNavigate } from 'react-router-dom'
import HorizPillCard from '../../components/cards/HorizPillCard'
import { SearchPill } from '../../store/actions/search';

const CardDiv = styled.div`
margin: 0px;
width: 100%;
`
const Box = styled.div`
::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari, Opera 환경*/
scrollbar-height: none; /* firefox 환경 */
overflow-y: scroll;
height: 78vh;
`
const Target = styled.div`
  height: 1px;
`;

const SearchResult = ({ searchData, data }) => {
  const navigate = useNavigate()

  let searchParams = {}

  if (!data.domestic && data.functionalityList.length === 0 && data.nutrientList.length === 0) {
    searchParams = searchData
  } else {
    searchParams = data
  }
  const { res } = useFetchData(
    SearchPill,
    "searchPill",
    () => { },
    () => { },
    searchParams
  );


  const searchRes = useMemo(
    () =>
      res.data
        ? res.data.pages.flatMap((item) => {
          return item.data.content;
        })
        : [],
    [res.data]
  );
  let text = ''

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (res.hasNextPage && !res.isFetching) {
      res.fetchNextPage();
    }
  });
  if (searchRes.length === 0) {
    text = '검색 결과가 없습니다.'
  }
  return (
    <div>
      {searchRes.length === 0 &&
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div>{text}</div>
        </div>
      }
      <Box>
        {
          searchRes &&
          searchRes.map((pill) => {
            return (
              <CardDiv
                key={pill.pillId}
                onClick={() => { navigate(`/pills/detail/${pill.pillId}`) }}
              >
                <HorizPillCard
                  name={pill.pillName}
                  url={pill.pillThumbnail}
                  reviewAverage={pill.pillReviewAverage}
                  companyName={pill.pillCompanyName}
                  reviewCount={pill.pillReviewCount}
                ></HorizPillCard>
              </CardDiv>
            )
          })
        }
        <Target ref={ref} />
      </Box>
    </div>
  )
}

export default SearchResult