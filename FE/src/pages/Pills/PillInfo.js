import React, { useState, useRef, useMemo } from 'react'
import styled from 'styled-components'
import Lutein from '../../assets/lutein.jpg'
import Omega3 from '../../assets/omega3.jpg'
import Cmbzmulti from '../../assets/cmbzmulti.jpg'
import RecomPills from './RecomPills'

const ImgDiv = styled.div`
margin: 8px 8px 24px 8px
`
const LabelDiv = styled.div`
display: flex;
justify-content: space-between;
margin: 8px 24px;
`
const NameDiv = styled.div`
font-size: 24px;
`
const InfoDiv = styled.div`
margin: 8px 48px 24px;
background-color: #D9D9D9;
display: flex;
flex-direction: column;
justify-content: space-between;
`
const DetailDiv = styled.div`
margin: 8px 8px 24px 8px;
background-color: white;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 10px
`
const TextDiv = styled.div`
padding: 0px 16px;
padding-top: 12px;
line-height: 32px
`

const PillInfo = ({
  id,
  pillName,
  pillCompanyName,
  pillContent,
  pillDomestic,
  pillExpirationDate,
  nutrients,
  pillTakeProcess,
  pillTakeWarning,
  pillThumbnail,
}) => {
  const pills = [
    { id: 1, text: '루테인', rating: 4.5, url: Lutein, detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 2, text: '오메가3', rating: 4.7, url: Omega3, detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 3, text: '종합비타민', rating: 4.9, url: Cmbzmulti, detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 4, text: '루테인', rating: 4.5, url: Lutein, detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 5, text: '오메가3', rating: 4.7, url: Omega3, detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 6, text: '종합비타민', rating: 4.9, url: Cmbzmulti, detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  ]

  let searchQuery = ''
  if (pillName) {
    searchQuery = pillName.replaceAll(' ', '%20')
  }

  const [isShowMore, setIsShowMore] = useState(false)
  const textLimit = useRef(130)
  const commenter = useMemo(() => {
    if (pillContent) {
      const shortInfo = pillContent.slice(0, textLimit.current) + '...'
      if (pillContent.length > textLimit.current) {
        if (isShowMore) { return pillContent; }
        return shortInfo;
      }
      return pillContent;
    }
  }, [isShowMore]);
  return (
    <>
      <ImgDiv>
        <img id={id} src={pillThumbnail} alt='영양제 이미지' style={{ width: "100%", height: "30vh" }} />
      </ImgDiv>
      <LabelDiv>
        <NameDiv>{pillName}</NameDiv>
        <div style={{ width: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <input type="checkbox" id="복용중" />
          <label htmlFor="복용중">복용중</label>
        </div>
      </LabelDiv>
      <InfoDiv>
        <TextDiv>
          제조사 : {pillCompanyName}
        </TextDiv>
        <TextDiv>
          영양소 : {nutrients}
        </TextDiv>
        <TextDiv>
          섭취방법 : {pillTakeProcess}
        </TextDiv>
        <TextDiv>
          국내산 여부 : {pillDomestic}
        </TextDiv>
        <TextDiv>
          유통기한 : {pillExpirationDate}
        </TextDiv>
        <TextDiv>
          섭취시 주의점 : {pillTakeWarning}
        </TextDiv>
        <TextDiv style={{ textDecoration: 'underline' }}>
          <a
            href={`https://search.shopping.naver.com/search/all?query=${searchQuery}&cat_id=&frm=NVSHATC`}
            target="_blank"
            rel="noreferrer"
          >이 제품 구매하러 가기(링크)</a>
        </TextDiv>
      </InfoDiv>
      <DetailDiv>
        <TextDiv style={{ borderBottom: '1px solid #595959', display: 'flex', justifyContent: 'space-between' }}>
          제품 상세 정보
          {(pillContent && pillContent.length > textLimit.current) &&
            (isShowMore ?
              <i className="fa-duotone fa-chevron-up" onClick={() => setIsShowMore(!isShowMore)}></i> :
              <i className="fa-duotone fa-chevron-down" onClick={() => setIsShowMore(!isShowMore)}></i>)}
        </TextDiv>
        <TextDiv >
          {commenter}
        </TextDiv>
      </DetailDiv>
      <RecomPills pills={pills} type='pill' />
    </>
  )
}

export default PillInfo