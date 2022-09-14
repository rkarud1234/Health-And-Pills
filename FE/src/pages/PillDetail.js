import React from 'react'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import BackButton from '../components/buttons/BackButton'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import PillInfo from './Pills/PillInfo'
import PillReview from './Pills/PillReview'
const ScrollDiv = styled.div`
::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari, Opera 환경*/
scrollbar-height: none; /* firefox 환경 */
overflow-y: scroll;
height : 86vh;
`

const PillDetail = () => {

  const id = useParams().id
  return (
    <>
      <Header leftNone={true} leftChildren={<BackButton />} />
      <ScrollDiv>
        <PillInfo id={id} />
        <PillReview />
      </ScrollDiv>
      <Footer />
    </>
  )
}

export default PillDetail