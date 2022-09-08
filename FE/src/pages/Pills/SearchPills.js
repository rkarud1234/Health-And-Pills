import React, { useState } from 'react'
import styled from 'styled-components'

const CustomInput = styled.input`
width: 94%;
height: 48px;
background-color: #EAEFF1;
// x 버튼 안보이게 하기
::-webkit-search-cancel-button{
  display:none
};
:focus{
  outline:none;
};
`

const SearchDiv = styled.div`
  border-bottom: 1px solid #AEB0B4;
  margin: 8px 16px;
`

const SearchButton = styled.button`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`


const SearchPills = () => {
  const [value, setValue] = useState('')
  const valueHandler = (e) => {
    setValue(e.target.value)
  }

  return (
    <SearchDiv>
      <form style={{ width: 'auto', display: 'flex', justifyContent: 'center' }}>
        <CustomInput
          type="search"
          id="searchpill"
          name="searchpill"
          placeholder="영양제를 검색해주세요"
          onChange={valueHandler}
          value={value} />
        <SearchButton><i className="fa-solid fa-magnifying-glass fa-lg" style={{}}></i></SearchButton>
        <SearchButton><i className="fa-light fa-camera-viewfinder fa-lg"></i></SearchButton>
      </form>
    </SearchDiv>
  )
}

export default SearchPills