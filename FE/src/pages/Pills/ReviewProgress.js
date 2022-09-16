import React from 'react'
import styled from 'styled-components'

const PullBar = styled.div`
position: relative;
width: 240px;
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
const ReviewProgress = ({ width }) => {
  return (
    <>
      <PullBar>
        <ProgressBar width={width} />
      </PullBar>
    </>
  )
}

export default ReviewProgress