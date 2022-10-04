import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HorizPillCard from '../../components/cards/HorizPillCard'

const CardDiv = styled.div`
margin: 0px 16px;
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

const SearchResult = ({ isSearched }) => {
  const searchResult = useSelector(state => state.search.searchResult).content
  const navigate = useNavigate()
  let text = ''

  if (searchResult && searchResult.length === 0) {
    text = '검색 결과가 없습니다.'
  }
  return (
    <div>
      {isSearched &&
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div>{text}</div>
        </div>
      }
      <Box>
        {
          searchResult &&
          searchResult.map((pill) => {
            return (
              <CardDiv
                key={pill.pillId}
                onClick={() => { navigate(`/pill/detail/${pill.pillId}`) }}
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
      </Box>
    </div>
  )
}

export default SearchResult