import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/layouts/Footer";
import Carousel from "../components/carousel/Carousel";
import RecomPills from "./Pills/RecomPills";
import SearchSlide from "./Pills/SearchSlide";
import imgUrl from '../assets/togetherX.jpg'
import Lutein from '../assets/lutein.jpg'
import Omega3 from '../assets/omega3.jpg'
import Cmbzmulti from '../assets/cmbzmulti.jpg'
import styled from "styled-components";

const ScrollDiv = styled.div`
::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari, Opera 환경*/
scrollbar-height: none; /* firefox 환경 */
overflow-y: scroll;
height : 92vh;
position: relative;
`
const SearchBox = styled.div`
display: flex;
justify-content: center;
width: auto;
height: 48px;
`
const SearchBar = styled.div`
display: flex;
line-height: 24px;
border: 2px solid #AEB0B4;
cursor: pointer;
width: 94%;
border-radius: 4px;
margin: 8px;
`

const SearchButton = styled.button`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Pill = () => {
  const user = useSelector((state) => state.user);
  const images = [
    { id: 1, url: imgUrl },
    { id: 2, url: imgUrl },
    { id: 3, url: imgUrl },
    { id: 4, url: imgUrl },
    { id: 5, url: imgUrl },
    { id: 6, url: imgUrl },
  ]

  const pills = [
    { id: 1, text: '루테인', rating: 4.5, url: Lutein },
    { id: 2, text: '오메가3', rating: 4.7, url: Omega3 },
    { id: 3, text: '종합비타민', rating: 4.9, url: Cmbzmulti },
    { id: 4, text: '루테인', rating: 4.5, url: Lutein },
    { id: 5, text: '오메가3', rating: 4.7, url: Omega3 },
    { id: 6, text: '종합비타민', rating: 4.9, url: Cmbzmulti },
  ]

  const [isOpened, setIsOpened] = useState(false)
  const openHandler = () => {
    setIsOpened(!isOpened)
  }

  return (<>
    {!isOpened ? <ScrollDiv>
      < SearchBox >
        <SearchBar onClick={openHandler}>
          <SearchButton>
            <i className="fa-solid fa-magnifying-glass fa-lg"></i>
          </SearchButton>
          <div style={{ fontSize: '12px' }}>영양제를 검색하세요!</div>
        </SearchBar>
      </SearchBox>
      <Carousel images={images} />
      <RecomPills pills={pills} type='user' />
      <RecomPills pills={pills} type='age' />
      <Footer />
    </ScrollDiv > :
      <SearchSlide
        openHandler={openHandler}
        isOpened={isOpened}
      ></SearchSlide>}
  </>
  )
};

export default Pill;
