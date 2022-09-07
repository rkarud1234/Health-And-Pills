import React from 'react'
import styled from 'styled-components'
// import { useSelector } from "react-redux";
import PillCard from '../../components/cards/PillCard.js'
import Lutein from '../../assets/lutein.jpg'
import Omega3 from '../../assets/omega3.jpg'
import Cmbzmulti from '../../assets/cmbzmulti.jpg'

const TextDiv = styled.div`
margin: 24px 0 0 16px;
`
const Text = styled.div`
font-size: 16px;
font-weight: bold;
`

const CardDiv = styled.div`
margin: 0px 16px
`

const FlexBox = styled.div`
::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari, Opera*/
scrollbar-width: none; /* firefox */
cursor: pointer;
display: flex;
overflow-x: scroll;
padding: 16px 0px 24px;
`

const RecomPills = () => {
  // const user = useSelector((state) => state.user);
  const username = '춘식이'
  const pills = [
    { id: 1, text: '루테인', rating: 4.5, url: Lutein },
    { id: 2, text: '오메가3', rating: 4.7, url: Omega3 },
    { id: 3, text: '종합비타민', rating: 4.9, url: Cmbzmulti },
    { id: 4, text: '루테인', rating: 4.5, url: Lutein },
    { id: 5, text: '오메가3', rating: 4.7, url: Omega3 },
    { id: 6, text: '종합비타민', rating: 4.9, url: Cmbzmulti },
  ]
  return (
    <>
      <TextDiv>
        <Text>'{username}' 님을 위한 맞춤 영양제 추천</Text>
      </TextDiv>
      <FlexBox>
        {pills ? pills.map(pill => {
          return (<CardDiv key={pill.id}>
            <PillCard url={pill.url} text={pill.text} rating={pill.rating} />
          </CardDiv>)
        }) : <></>}
      </FlexBox>

      <TextDiv>
        <Text>20대 여성이 많이 찾는 영양제 추천 </Text>
      </TextDiv>
      <FlexBox>
        {pills ? pills.map(pill => {
          return (<CardDiv key={pill.id}>
            <PillCard url={pill.url} text={pill.text} rating={pill.rating} />
          </CardDiv>)
        }) : <></>}
      </FlexBox>
    </>
  )
}

export default RecomPills