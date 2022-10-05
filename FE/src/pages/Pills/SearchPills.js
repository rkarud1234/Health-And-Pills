import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { SearchPill, AutoComplete, resetSelector } from '../../store/actions/search'

const CustomInput = styled.input`
width: 98%;
height: 36px;
// x 버튼 안보이게 하기
::-webkit-search-cancel-button{
  display:none
};
:focus{
  outline:none;
};
margin: 8px 0px 0px;
`
const AutoCompleteDiv = styled.div`
margin: 0px 0px 4px;
padding: 8px 0px 4px 12px;
color: black;
font-size: 12px;
cursor:pointer;
:hover {
  background: #AEB0B4;
};
`
const AutoCompleteBox = styled.div`
margin: 0px 16px;
position: fixed;
background-color: white;
min-width: 468px;
`
const SearchDiv = styled.div`
margin: 8px 16px 0px;
`
const SearchButton = styled.button`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 8px 0px 0px;
`

const SearchPills = ({ openHandler, setIsOpened, setSearchWord, searchWord }) => {

  const dispatch = useDispatch()
  const [autoCompleteOpened, setAutoCompleteOpened] = useState(false)
  let autoComplete = useSelector(state => state.search.autoComplete)

  const valueHandler = (e) => {
    setSearchWord(e.target.value)
    setAutoCompleteOpened(true)
    if (e.target.value !== '') {
      dispatch(AutoComplete(e.target.value))
    } else {
      dispatch(AutoComplete('ㅇ'))
    }
  }

  const searchHandler = () => {
    setAutoCompleteOpened(false)
    dispatch(resetSelector())
    setIsOpened(false)
  }

  const autoCompleteSearch = (e) => {
    setSearchWord(e)
    setAutoCompleteOpened(false)
    setIsOpened(false)
  }
  return (
    <div>
      <SearchDiv>
        <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #AEB0B4' }}>
          <SearchButton onClick={openHandler}><i className="fa-solid fa-angle-left fa-lg"></i></SearchButton>
          <div style={{ width: '94%', position: 'relative' }}>
            <CustomInput
              type="search"
              id="searchpill"
              name="searchpill"
              placeholder="검색어를 입력하세요"
              autoComplete='off'
              onChange={valueHandler}
              onKeyPress={(e) => { if (e.key === 'Enter') { searchHandler() } }}
              value={searchWord}
            />
          </div>
          <SearchButton onClick={(e) => {
            e.preventDefault()
            searchHandler()
          }}><i className="fa-solid fa-magnifying-glass fa-lg" ></i></SearchButton>
          <SearchButton><i className="fa-light fa-camera-viewfinder fa-lg"></i></SearchButton>
        </div>
      </SearchDiv >
      <div>
        {autoComplete && autoCompleteOpened &&
          <AutoCompleteBox>
            {autoComplete.map((e, idx) => {
              return (
                <AutoCompleteDiv key={idx} onClick={() => { autoCompleteSearch(e) }}>
                  {e}
                </AutoCompleteDiv>
              )
            })}
          </AutoCompleteBox>}
      </div>
    </div>
  )
}

export default SearchPills