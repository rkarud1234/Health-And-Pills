import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HorizPillCard from '../../components/cards/HorizPillCard'

const CardDiv = styled.div`
margin: 0px 16px;
width: 100%;
`

const FlexBox = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari, Opera 환경*/
scrollbar-height: none; /* firefox 환경 */
overflow-y: scroll;
height: 86vh;
`

const SearchResult = ({ isSearched }) => {
  const searchResult = useSelector(state => state.search.searchResult).content
  console.log(searchResult)
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
      <FlexBox>
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
                  reviewAverage={pill.reviewAverage}
                  companyName={pill.pillCompanyName}
                  reviewCount={pill.reviewCount}
                ></HorizPillCard>
              </CardDiv>
            )
          })
        }
      </FlexBox>
    </div>
  )
}

export default SearchResult