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

import imgUrl1 from '../assets/carousel/001.jpg'
import imgUrl2 from '../assets/carousel/002.jpg'
import imgUrl3 from '../assets/carousel/003.jpg'
import imgUrl4 from '../assets/carousel/004.jpg'
import imgUrl5 from '../assets/carousel/005.jpg'
import imgUrl6 from '../assets/carousel/006.jpg'


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
// border: 2px solid #AEB0B4;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2),0 1px 2px 0 rgba(0, 0, 0, 0.06);

cursor: pointer;
width: 96%;
border-radius: 4px;
margin: 8px;
padding: 0px 10px;
`

const SearchButton = styled.button`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Pill = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.data);
  const today = new Date()
  let age = ''
  let ageGroup = ''
  let gender = ''

  if (user) {
    age = today.getFullYear() - user.userProfileBirthday.slice(0, 4) + 1
  }
  if (age < 20) {
    ageGroup = '10대'
  } else if (age < 30) {
    ageGroup = '20대'
  } else if (age < 40) {
    ageGroup = '30대'
  } else if (age < 50) {
    ageGroup = '40대'
  } else if (age < 60) {
    ageGroup = '50대'
  } else if (age < 70) {
    ageGroup = '60대'
  } else if (age < 80) {
    ageGroup = '70대'
  }

  if (user) {
    if (user.userProfileGender === 'male') {
      gender = '남성'
    } else {
      gender = '여성'
    }
  }
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
    { id: 1, url: imgUrl1 },
    { id: 2, url: imgUrl2 },
    { id: 3, url: imgUrl3 },
    { id: 4, url: imgUrl4 },
    { id: 5, url: imgUrl5 },
    { id: 6, url: imgUrl6 },
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
                <div style={{ fontSize: '14px', lineHeight: '34px' }}>더 많은 영양제 찾아보기</div>
              </SearchBar>
            </SearchBox>
            <Carousel images={images} />
            <RecomPills pills={bestPills} text='BEST 10 영양제 추천' />
            <RecomPills pills={customPills} text={user.userProfileNickname + '님을 위한 맞춤 영양제 추천'} />
            <RecomPills pills={userPills} text={ageGroup + ' ' + gender + '이 많이 먹는 영양제'} />
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
