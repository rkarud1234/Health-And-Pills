import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Footer from "../components/layouts/Footer";
import Carousel from "../components/carousel/Carousel";
import RecomPills from "./Pills/RecomPills";
import SearchSlide from "./Pills/SearchSlide";
import Loading from "../components/layouts/Loading";
import { BestPillsFetch, CustomPillsFetch, UserPillsFetch } from "../store/actions/recommend";
import { profile } from "../store/actions/user";
import imgUrl from '../assets/togetherX.jpg'

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
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.data);
  // 차례대로 베스트 추천/ 사용자 맞춤 추천/ 유사한 사용자 추천
  const bestPills = useSelector((state) => state.recommend.bestPills)
  const customPills = useSelector((state) => state.recommend.customPills)
  const userPills = useSelector((state) => state.recommend.userPills)
  // api 요청 진행상황
  const cStatus = useSelector((state) => state.recommend.cstatus)
  const uStatus = useSelector((state) => state.recommend.ustatus)
  const bStatus = useSelector((state) => state.recommend.bstatus)

  useEffect(() => {
    dispatch(profile())
  }, [])
  useEffect(() => {
    dispatch(BestPillsFetch())
  }, [])
  useEffect(() => {
    dispatch(CustomPillsFetch())
  }, [])
  useEffect(() => {
    dispatch(UserPillsFetch())
  }, [])

  const images = [
    { id: 1, url: imgUrl },
    { id: 2, url: imgUrl },
    { id: 3, url: imgUrl },
    { id: 4, url: imgUrl },
    { id: 5, url: imgUrl },
    { id: 6, url: imgUrl },
  ]

  const [isOpened, setIsOpened] = useState(false)
  const openHandler = () => {
    setIsOpened(!isOpened)
  }

  return (<div>
    {
      cStatus === 'succeeded' && bStatus === 'succeeded' && uStatus === 'succeeded' ?
        <div style={{ fontFamily: 'GmarketSans' }}>
          {!isOpened ? <ScrollDiv>
            < SearchBox >
              <SearchBar onClick={openHandler}>
                <SearchButton>
                  <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                </SearchButton>
                <div style={{ fontSize: '12px', lineHeight: '30px' }}>영양제를 검색하세요!</div>
              </SearchBar>
            </SearchBox>
            <Carousel images={images} />
            <RecomPills pills={bestPills} text='BEST 10 영양제 추천' />
            <RecomPills pills={customPills} text={user.userProfileNickname + '님을 위한 맞춤 영양제 추천'} />
            <RecomPills pills={userPills} text={user.userProfileNickname + '님과 유사한 유저들이 먹는 영양제 추천'} />
            <Footer />
          </ScrollDiv > :
            <SearchSlide
              openHandler={openHandler}
              isOpened={isOpened}
            ></SearchSlide>}
        </div>
        :
        <div>
          <Loading />
        </div>
    }</div>)
};

export default Pill;
