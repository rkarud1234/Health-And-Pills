import React, { useState } from 'react'
import styled from 'styled-components'
import { plus } from '../../store/reducers/testSlice';
import { useDispatch } from 'react-redux';

const TestDiv = styled.div`
max-width: 500px;
min-width: 250px;
margin: 24px auto;
height: 94vh
`

const QContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-size: 30px;
padding-bottom: 30px;
line-height: 1.3;
}
`

const AnswerDiv = styled.div`
font-size: 18px;
padding-bottom: 20px;
}
`

const Btn = styled.div`
font-size: 16px;
font-family: 'GmarketSans';
width: 88%;
height: 50px;
line-height: 42px;
padding: 5px;
border-style: none;
border-radius: 10px;
background: #fff;
color: black;
cursor: pointer;
border: 1px solid black;
:hover {background: #6A53FE;
  color: #fff;
  border: 1px solid #6A53FE;
}
`

const PullBar = styled.div`
position: relative;
width: auto;
height: 12px;

background: #A6A4A4;
border-radius: 4px;
`

const ProgressBar = styled.div`
position: absolute;
width: ${props => props.width};
height: 12px;
background: linear-gradient(180deg, #6A53FE 0%, #537CFE 100%);
border-radius: 4px;
`

const Image = styled.div`
max-width: 500px;
min-width: 250px;
width: 360px
`

const Question = ({ qNum, question, answers, nextBtnHandler, imgUrl }) => {
  const progress = qNum * 100 / 8 + '%'
  const dispatch = useDispatch();

  return (
    <TestDiv>
      <QContainer>
        <h3 style={{ fontFamily: "GmarketSansMedium" }}>{qNum}/8</h3>
        <div style={{ minWidth: '240px', maxWidth: '500px', width: '100%', paddingBottom: '30px' }}>
          <PullBar>
            <ProgressBar width={progress} />
          </PullBar>
        </div>
        <h3 style={{ fontFamily: "GmarketSansBold" }}>{question}</h3>
        <Image>
          <img src={imgUrl} style={{ width: '100%' }} />
        </Image>
      </QContainer>
      <AnswerDiv>
        {answers ? answers.map((answer, idx) => {
          return (
            <div key={idx} style={{ paddingBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <Btn onClick={() => {
                dispatch(plus(answer.value))
                nextBtnHandler(answer.value)
              }}>
                {answer.answer}
              </Btn>
            </div>)
        }) : <></>}
      </AnswerDiv>
    </TestDiv >
  )
}

export default Question