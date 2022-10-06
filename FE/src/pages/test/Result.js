import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { reset } from '../../store/reducers/testSlice'
import { useParams } from 'react-router-dom'
import twenty from '../../assets/20s.jpg'
import forty from '../../assets/40s.jpg'
import sixty from '../../assets/60s.jpg'
import loading from '../../assets/loading.gif'

const ScrollDiv = styled.div`
::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari, Opera 환경*/
scrollbar-height: none; /* firefox 환경 */
overflow-y: scroll;
height : 100vh;
`

const Btn = styled.button`
font-size: 16px;
width: 80%;
height: 52px;
background-color: ${(props) => props.bgcolor};
font-family: 'GmarketSansBold';
color: ${props => props.color};
border-radius: 8px
`
const BtnBox = styled.div`
display: flex;
justify-content: center;
margin-bottom: 24px;
:hover {
  text-decoration: underline;
  text-decoration-color: ${props => props.tdcolor};
}
`
const TextBox = styled.div`
display: flex;
justify-content: center;
margin-bottom: 16px;
font-family: 'GmarketSans';
`
const PullBar = styled.div`
position: relative;
width: 80%;
height: 2px;
background: linear-gradient(180deg, #6A53FE 0%, #537CFE 100%);
border-radius: 4px;
`
const ImageBox = styled.div`
display:flex;
justify-content: center;
max-width: 500px;
min-width: 200px;
margin: 0 auto 24px;
`
const Img = styled.img`
background-size: contain;
width: 80%;
`

const LoadingBox = styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction:column;
height: 100vh;
background-color: #F1F2F3;
`

const Loading = styled.div`
background: url(${props => props.url});
background-size: contain;
width: 150px;
height: 150px;
`

const Result = () => {
  const id = useParams().id
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const countNum = useSelector(state => state.test.conuntNum)
  console.log(countNum)
  useEffect(() => {
    let timer = setTimeout(() => { setIsLoading(true) }, 1500)
  }, [])

  let imgUrl = ''

  if (id === '1' | id === '2') {
    imgUrl = twenty
  } else if (id === '3' | id === '4') {
    imgUrl = forty
  } else {
    imgUrl = sixty
  }

  // 카카오톡 공유를 사용하기 위한 스크립트를 실행해야 하는데, 리액트의 경우 렌더링이 2번되면서 2번실행되기 때문에 1번만 실행해주려고 useEffect 사용
  useEffect(() => {
    const script = document.createElement('script')
    script.src = "//developers.kakao.com/sdk/js/kakao.min.js"
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const copyUrl = () => {
    let tmp = document.createElement('input');
    let url = location.href;

    document.body.appendChild(tmp);
    tmp.value = url;
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);

    alert("URL이 복사되었습니다");
  }

  const sharekakao = () => {
    if (window.Kakao) {
      const Kakao = window.Kakao
      // 이미 init이 되있는 경우는 다시 init을 할 수 없으므로, 분기처리
      if (!Kakao.isInitialized()) {
        Kakao.init('857ce7c7801d04c36354fcecd2756595');
      }
    }
    let result_url = window.location.href;
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '나의 신체 나이는?',
        description: '지금 나의 건강상태를 알아보자!',
        imageUrl:
          `https://j7b203.p.ssafy.io/static/media/001.a26b8d48c31fe4e3c8bc.jpg`,
        link: {
          mobileWebUrl: 'https://j7b203.p.ssafy.io/pillLogo.png',
          webUrl: 'https://j7b203.p.ssafy.io/pillLogo.png',
        },
      },
      buttons: [
        {
          title: '결과 보러가기',
          link: {
            webUrl: result_url,
            mobileWebUrl: result_url,
          },
        },
        {
          title: '테스트 하러가기',
          link: {
            webUrl: 'https://j7b203.p.ssafy.io/form',
            mobileWebUrl: 'https://j7b203.p.ssafy.io/form',
          },
        },
      ],
    });
  }

  const sharefacebook = () => {
    let url = window.location.href;
    let facebook = 'http://www.facebook.com/sharer/sharer.php?u=';
    let link = facebook + url
    window.open(link);
  }
  let ageGroup = ''

  if (id === '1') {
    ageGroup = 20
  } else if (id === '2') {
    ageGroup = 30
  } else if (id === '3') {
    ageGroup = 40
  } else if (id === '4') {
    ageGroup = 50
  } else if (id === '5') {
    ageGroup = 60
  }
  return (
    <ScrollDiv>
      {!isLoading ?
        <LoadingBox >
          <TextBox style={{ fontSize: '24px', fontWeight: 'bold' }}>신체나이 분석 중...</TextBox>
          <Loading url={loading} />
        </LoadingBox>
        :
        <div style={{ backgroundColor: '#EAEFF1', paddingBottom: '50px' }}>
          {countNum === 777 &&
            <TextBox style={{ fontSize: '24px', fontWeight: 'bold', paddingTop: '20px' }}>
              <h1>축하합니다! 777번째 당첨!</h1>
            </TextBox>
          }
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TextBox style={{ paddingTop: '20px' }}>HP가 확인한 당신의 신체 나이 연령대는</TextBox>
          </div>
          <TextBox style={{ fontSize: '24px', fontWeight: 'bold' }}>
            <h1>{ageGroup}대 입니다.</h1>
          </TextBox>
          <ImageBox>
            <Img src={imgUrl} />
          </ImageBox>
          <BtnBox>
            <PullBar />
          </BtnBox>
          <BtnBox>
            <Btn className='kakao_share' onClick={copyUrl} bgcolor='white' >링크 복사하기</Btn>
          </BtnBox>
          <BtnBox>
            <Btn className='kakao_share' onClick={sharekakao} bgcolor='#f1d900'>카카오톡 공유하기</Btn>
          </BtnBox>
          <BtnBox tdcolor='white'>
            <Btn className='kakao_share' onClick={sharefacebook} bgcolor='#3b5998' color='white'>페이스북 공유하기</Btn>
          </BtnBox>
          <BtnBox>
            <PullBar />
          </BtnBox>
          <div>
            <TextBox>내 신체나이가 이럴리가... 없어!</TextBox>
            <BtnBox>
              <Btn className='kakao_share' onClick={() => { navigate('/form'); dispatch(reset()) }} bgcolor='white'>다시 검사하러 가기</Btn>
            </BtnBox>
          </div>
          <div>
            <TextBox>재미있었다. 홈으로 가야지!</TextBox>
            <BtnBox>
              <Btn className='kakao_share' onClick={() => { navigate('/'); dispatch(reset()) }} bgcolor='white'>홈으로 가기</Btn>
            </BtnBox>
          </div>
        </div>
      }
    </ScrollDiv>
  )
}

export default Result