import React, { useMemo } from 'react'
import styled from 'styled-components'
import useFetchData from "../../hooks/useFetchData";
import useIntersect from "../../hooks/useIntersect";
import { useNavigate } from 'react-router-dom'
import HorizPillCard from '../../components/cards/HorizPillCard'
import { SearchPill } from '../../store/actions/search';
import { useSelector } from 'react-redux';
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

const SearchResult = ({ searchData, data, setSearchWord }) => {
  const navigate = useNavigate()
  const similarWord = useSelector(state => state.search.similarWord)

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
        <div style={{ marginLeft: "16px" }}>
          <div style={{ marginBottom: "8px" }}>{text}</div>
          {similarWord &&
            <div style={{ display: 'flex' }}>
              <div>
                이 단어를 찾으셨나요?
              </div>
              <div
                style={{ marginLeft: "8px", color: "#537CFE", cursor: 'pointer' }}
                onClick={() => { setSearchWord(similarWord) }}>
                {similarWord}
              </div>
            </div>}
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