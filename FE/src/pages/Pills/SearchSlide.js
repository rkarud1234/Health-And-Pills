import React, { useState, useEffect, useRef } from 'react'
import SearchPills from './SearchPills'
import SearchResult from './SearchResult'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { FunctionalitiesFetch, NutrientsFetch } from '../../store/actions/search'
import { domesticSelector, nutrientSelector, functionalitySelector, resetSelector } from '../../store/actions/search.js'
import { SearchPill } from '../../store/actions/search'

const Tab = styled.div`
cursor: pointer;
text-align: center;
&.selected {
  background: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
 }
&.other {
  font-weight: bold;
}
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 44px;
margin: 16px 16px 8px;
border-bottom: ${props => props.state};
`
const TabList = styled.div`
 display: flex;
 width: 100vw;
 max-width: 500px;
`
const RadioDiv = styled.div`
margin: 16px 16px
`
const CategoryBox = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari, Opera 환경*/
scrollbar-height: none; /* firefox 환경 */
overflow-y: scroll;
height: 40vh;
`
const SelectedBox = styled.div`
display: flex;
width: 96%;
padding: 4px;
overflow: hidden;
::-webkit-scrollbar {
display: none;
}
white-space: nowrap;
scrollbar-width: none;
cursor: pointer;
`
const Category = styled.div`
background-color: white;
position: fixed;
bottom: 0;
z-index: 999;
border-top: 1px solid #CAD1D5;
border-radius: 10px;
box-shadow: rgb(100 100 111 / 35%) 0px 7px 29px 0px;
max-width: 500px;
`
const CategoryBtn = styled.div`
display: flex;
margin: 4px 2px 4px 4px;
// border: 1.5px solid transparent;
border: 1px solid #646464;
border-radius: 20px;
font-size: 12px;
&.noselected {
  background-image: linear-gradient(#fff, #fff), 
  linear-gradient(to right, #537CFE 0%,  #6A53FE 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  cursor: pointer;
}
&.selected {
  // background-image: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%); 
  background-image: #fff;
  background-clip: content-box, border-box;
  background: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  border: 1px solid #537cfe;  
  cursor: pointer;
  // :hover{
  //   background: linear-gradient(180deg, #6A53FE 0%, #537CFE 100%);
  // }
}
// :hover{
//   background-image: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%); 
//   background-origin: border-box;
//   background-clip: content-box, border-box;
//   color:#fff;
// }
`
const CategoryOpenBtn = styled.div`
margin: 4px;
height: 36px;
border: 1.5px solid #e0e0e0;
font-size: 16px;
line-height: 18px;
color: #7B7B7B;
border-radius: 10px;
cursor: pointer;
`
const CustomBtn = styled.button`
  width: 40%;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border: solid 2px;
  border-radius: 30px;
  margin: 8px;
  &.search {
  background: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border: 1px solid #537cfe; 
    // :hover{
    //   background: linear-gradient(180deg, #6A53FE 0%, #537CFE 100%);
    // }
  }
  &.cancel {
    background-image: linear-gradient(#fff, #fff);
    border-radius: 30px;
    border: 1px solid #6d6d6d;
    color: #6d6d6d;
    :hover{
      border-color: black;
      color:black;
    }
  }
`
const SearchSlide = ({ openHandler }) => {

  const dispatch = useDispatch()
  const [tabNum, setTabNum] = useState(1)
  const [isOpened, setIsOpened] = useState(false)
  const [isSearched, setIsSearched] = useState(false)
  const functionalities = useSelector(state => state.search.functionalities)
  const nutrients = useSelector(state => state.search.nutrients)

  const domestic = useSelector(state => state.search.domestic)
  const functionalityList = useSelector(state => state.search.functionalityList)
  const nutrientList = useSelector(state => state.search.nutrientList)
  // console.log(domestic, functionalities, nutrients)

  // 선택한 카테고리 횡스크롤
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);

    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  const domesticHandler = (e) => {
    dispatch(domesticSelector(e.target.value))
  }

  const nutrientHandler = (nutrientId) => {
    dispatch(nutrientSelector(nutrientId))
  }

  const functionalityHandler = (functionalityId) => {
    dispatch(functionalitySelector(functionalityId))
  }

  const backBtnHandler = () => {
    dispatch(resetSelector())
    openHandler()
  }

  const categoryHandler = () => {
    setIsOpened(!isOpened)
  }

  const searchHandler = () => {
    const data = {
      searchWord: '',
      domestic: domestic,
      functionalityList: functionalityList,
      nutrientList: nutrientList
    }
    dispatch(SearchPill(data))
    setIsOpened(false)
  }

  useEffect(() => {
    dispatch(FunctionalitiesFetch())
  }, [])
  useEffect(() => {
    dispatch(NutrientsFetch())
  }, [])

  let Tabs = ''
  if (tabNum === 1) {
    Tabs =
      <div>
        <div style={{ height: '24px', display: 'flex', justifyContent: 'center', paddingTop: '16px' }}>
          <div>필터</div>
        </div>
        <TabList>
          <Tab className='selected' state='3px solid #6A53FE' onClick={() => { setTabNum(1) }}>제품 구분</Tab>
          <Tab onClick={() => { setTabNum(2) }}>영양소 </Tab>
          <Tab onClick={() => { setTabNum(3) }}>생리활성 기능 </Tab>
        </TabList>
      </div>
  } else if (tabNum === 2) {
    Tabs =
      <div>
        <div style={{ height: '24px', display: 'flex', justifyContent: 'center', paddingTop: '16px' }}>
          <div>필터</div>
        </div>
        <div style={{ display: 'flex', maxWidth: '500px' }} >
          <Tab onClick={() => { setTabNum(1) }}>제품 구분</Tab>
          <Tab className='selected' state='3px solid #6A53FE' onClick={() => { setTabNum(2) }}>영양소 </Tab>
          <Tab onClick={() => { setTabNum(3) }}>생리활성 기능 </Tab>
        </div>
      </div>
  } else {
    Tabs =
      <div>
        <div style={{ height: '24px', display: 'flex', justifyContent: 'center', paddingTop: '16px' }}>
          <div>필터</div>
        </div>
        <div style={{ display: 'flex', maxWidth: '500px' }}>
          <Tab onClick={() => { setTabNum(1) }}>제품 구분</Tab>
          <Tab onClick={() => { setTabNum(2) }}>영양소 </Tab>
          <Tab className='selected' state='3px solid #6A53FE' onClick={() => { setTabNum(3) }}>생리활성 기능 </Tab>
        </div>
      </div>
  }

  return (
    <div>
      <SearchPills openHandler={backBtnHandler} setIsSearched={setIsSearched} setIsOpened={setIsOpened}></SearchPills>
      <CategoryOpenBtn onClick={() => { setIsOpened(!isOpened) }}>
        <div style={{ margin: '8px', textAlign: 'center' }}>
          카테고리로 검색하기
        </div>
      </CategoryOpenBtn>
      <SelectedBox
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scrollRef}
      >
        {nutrients &&
          nutrients.map((nutrient) => {
            if (nutrientList.includes(nutrient.nutrientId)) {
              return (
                <CategoryBtn
                  key={nutrient.nutrientId}
                  style={{ cursor: 'auto' }}
                  className='selected'>
                  <div style={{ margin: '8px 12px', display: 'flex' }}>
                    <div style={{ marginRight: isOpened ? '8px' : '0px' }}>
                      {nutrient.nutrientName}
                    </div>
                    {isOpened &&
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => { nutrientHandler(nutrient.nutrientId) }}
                      >
                        <i className="fa-regular fa-xmark fa-lg"></i>
                      </div>
                    }
                  </div>
                </CategoryBtn>
              )
            }
          })
        }
        {functionalities &&
          functionalities.map((functionalitiy) => {
            if (functionalityList.includes(functionalitiy.functionalityId)) {
              return (
                <CategoryBtn
                  key={functionalitiy.functionalityId}
                  style={{ cursor: 'auto' }}
                  className='selected'>
                  <div style={{ margin: '8px', display: 'flex' }}>
                    <div style={{ marginRight: isOpened ? '8px' : '0px' }}>
                      {functionalitiy.functionalityContent}
                    </div>
                    {isOpened &&
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => { functionalityHandler(functionalitiy.functionalityId) }}
                      >
                        <i className="fa-solid fa-xmark fa-lg"></i>
                      </div>
                    }
                  </div>
                </CategoryBtn>
              )
            }
          })
        }
      </SelectedBox>
      {
        isOpened &&
        <Category>
          {Tabs}
          {tabNum === 1 &&
            <CategoryBox style={{ flexDirection: 'column' }}>
              <RadioDiv>
                <label><input onChange={domesticHandler} checked={domestic === "" && true} type="radio" name="제품 구분" value="" />통합</label>
              </RadioDiv>
              <RadioDiv>
                <label><input onChange={domesticHandler} checked={domestic === "Y" && true} type="radio" name="제품 구분" value="Y" />국내</label>
              </RadioDiv>
              <RadioDiv>
                <label><input onChange={domesticHandler} checked={domestic === "N" && true} type="radio" name="제품 구분" value="N" />수입</label>
              </RadioDiv>
            </CategoryBox>
          }
          {tabNum === 2 &&
            <CategoryBox>
              {nutrients &&
                nutrients.map((nutrient) => {
                  return (
                    <CategoryBtn
                      className={nutrientList.includes(nutrient.nutrientId) ? 'selected' : 'noselected'}
                      key={nutrient.nutrientId}
                      onClick={() => { nutrientHandler(nutrient.nutrientId) }}>
                      <div style={{ margin: '8px' }}>
                        {nutrient.nutrientName}
                      </div>
                    </CategoryBtn>
                  )
                })
              }
            </CategoryBox>
          }
          {tabNum === 3 &&
            <CategoryBox>
              {functionalities &&
                functionalities.map((functionalitiy) => {
                  return (
                    <CategoryBtn
                      className={functionalityList.includes(functionalitiy.functionalityId) ? 'selected' : 'noselected'}
                      key={functionalitiy.functionalityId}
                      onClick={() => { functionalityHandler(functionalitiy.functionalityId) }}
                    >
                      <div style={{ margin: '8px' }}>
                        {functionalitiy.functionalityContent}
                      </div>
                    </CategoryBtn>
                  )
                })
              }
            </CategoryBox>
          }
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CustomBtn onClick={() => {
              dispatch(resetSelector())
              categoryHandler()
            }} className='cancel'>닫기</CustomBtn>
            <CustomBtn onClick={searchHandler} className='search'>바로 검색</CustomBtn>
          </div>
        </Category>
      }
      <SearchResult isSearched={isSearched}></SearchResult>
    </div>
  );
};

export default SearchSlide;
