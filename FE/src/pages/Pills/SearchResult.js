import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PillCard from '../../components/cards/PillCard'

const CardDiv = styled.div`
margin: 16px 16px
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
                <PillCard
                  text={pill.pillName}
                  url={pill.pillThumbnail}
                  rating={pill.reviewAverage}
                ></PillCard>
              </CardDiv>
            )
          })
        }
      </FlexBox>
    </div>
  )
}

export default SearchResult