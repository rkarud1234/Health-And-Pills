import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Question from './Question'
import styled from 'styled-components'
import water from '../../assets/water.jpg'
import arms from '../../assets/arms.jpg'
import back from '../../assets/back.jpg'
import hand from '../../assets/hand.jpeg'
import sleep from '../../assets/sleep.jpg'
import smoking from '../../assets/smoking.jpg'
import walking from '../../assets/walking.jpg'
import onefoot from '../../assets/onefoot.jpg'

const SurveyDiv = styled.div`
display: flex;
justify-content: center;
background-color: #EAEFF1;
`

const BodyAgeTest = () => {
  const questions = [
    {
      qNum: 1,
      question: "하루에 평균적으로 물을 얼마나 마시나요?",
      answers: [
        { value: 20, answer: "1. 2L 이상" },
        { value: 35, answer: "2. 1L 이상" },
        { value: 45, answer: "3. 550 ml 이상" },
        { value: 55, answer: "4. 550 ml 이하" }],
      imgUrl: water
    },
    {
      qNum: 2,
      question: "하루에 걷는 시간이 평균적으로 어떻게 되시나요?",
      answers: [
        { value: 20, answer: "1. 1시간 이상" },
        { value: 35, answer: "2. 35분 이상" },
        { value: 45, answer: "3. 35분 미만" },
        { value: 55, answer: "4. 10분 미만" }],
      imgUrl: walking
    },
    {
      qNum: 3,
      question: "살면서 흡연을 한 기간이 어떻게 되시나요?",
      answers: [
        { value: 20, answer: "1. 피워본 적 없다." },
        { value: 35, answer: "2. 1년 미만" },
        { value: 45, answer: "3. 5년 미만" },
        { value: 55, answer: "4. 5년 이상" }],
      imgUrl: smoking
    },
    {
      qNum: 4,
      question: "당신의 하루 평균 수면시간이 어떻게 되시나요?",
      answers: [
        { value: 20, answer: "1. 8시간 이상" },
        { value: 35, answer: "2. 6시간 반 이상" },
        { value: 45, answer: "3. 4시간 이상" },
        { value: 55, answer: "4. 4시간 미만" }],
      imgUrl: sleep
    },
    {
      qNum: 5,
      question: "손등의 피부를 5초간 최대한 당겼다가 놓았을 때, 원상태로 돌아 오는데 얼마나 걸리셨나요?",
      answers: [
        { value: 20, answer: "1. 2초 미만" },
        { value: 35, answer: "2. 2~3초" },
        { value: 45, answer: "3. 3~5초" },
        { value: 55, answer: "4. 5초 이상" }],
      imgUrl: hand
    }, {
      qNum: 6,
      question: "사진과 같은 동작을 취했을때, 팔꿈치가 어디까지 올라가나요?",
      answers: [
        { value: 20, answer: "1. 눈 위" },
        { value: 35, answer: "2. 코 위" },
        { value: 45, answer: "3. 입 위" },
        { value: 55, answer: "4. 턱" }],
      imgUrl: arms
    }, {
      qNum: 7,
      question: "사진과 같은 동작을 취했을때, 양 손이 어디까지 닿나요?",
      answers: [
        { value: 20, answer: "1. 손 전체" },
        { value: 35, answer: "2. 손바닥까지 닿음" },
        { value: 45, answer: "3. 손가락 마디가 닿음" },
        { value: 55, answer: "4. 손가락 끝이 닿거나 아예 닿지 않음" }],
      imgUrl: back
    }, {
      qNum: 8,
      question: "제자리에서 사진과 같은 자세를 취했을때, 자세가 무너질때 까지 걸리는 시간이 얼마인가요?",
      answers: [
        { value: 20, answer: "1. 80초 이상" },
        { value: 35, answer: "2. 75초 이상" },
        { value: 45, answer: "3. 45초 이상" },
        { value: 55, answer: "4. 45초 미만" }],
      imgUrl: onefoot
    }
  ]
  const [num, setNum] = useState(1)
  const navigate = useNavigate()
  let average = useSelector(state => state.sum.sum)
  const nextBtnHandler = (value) => {
    setNum(num + 1)
    if (num === 8) {
      average = Math.floor((average + value) / 8)
      if (average < 40) {
        navigate('/result/1')
      } else if (average < 50) {
        navigate('/result/2')
      } else {
        navigate('/result/3')
      }
    }
  }
  return (
    <SurveyDiv>
      <form id='form'>
        {questions.map((question) => {
          if (question.qNum === num) {
            return (
              <Question
                key={question.qNum}
                qNum={question.qNum}
                question={question.question}
                answers={question.answers}
                imgUrl={question.imgUrl}
                nextBtnHandler={nextBtnHandler}>
              </Question>
            )
          }
        })}
      </form>
    </SurveyDiv>
  )
}

export default BodyAgeTest