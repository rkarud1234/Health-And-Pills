import React, { useState, useEffect } from 'react'
import SearchPills from './SearchPills'
import SearchResult from './SearchResult'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { FunctionalitiesFetch, NutrientsFetch } from '../../store/actions/search'
import { domesticSelector, nutrientSelector, functionalitySelector, resetSelector } from '../../store/actions/search.js'

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
height: 50vh;
`
const SelectedBox = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`
const Category = styled.div`
background-color: white;
position: fixed;
bottom: 0;
z-index: 999;
border-top: 1px solid;
border-radius: 10px;
max-width: 500px;
`

const CategoryBtn = styled.div`
display: flex;
margin: 4px;
border: 2px solid transparent;
border-radius: 20px;
&.noselected {
  background-image: linear-gradient(#fff, #fff), 
  linear-gradient(to right, #537CFE 0%,  #6A53FE 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  cursor: pointer;
}
&.selected {
  background-image: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%); 
  background-origin: border-box;
  background-clip: content-box, border-box;
  color:#fff;
  cursor: pointer; 
}
:hover{
  background-image: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%); 
  background-origin: border-box;
  background-clip: content-box, border-box;
  color:#fff;
}
`
const CategoryOpenBtn = styled.div`
margin: 4px;
height: 40px;
border: 2px solid #DDDDDD;
font-size: 16px;
line-height: 18px;
color: #7B7B7B;
border-radius: 20px;
cursor: pointer;
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
  // console.log(domestic, functionalityList, nutrientList)

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
        <div style={{ height: '24px', display: 'flex', justifyContent: 'center' }}>
          <div onClick={categoryHandler} style={{ margin: '16px 16px', backgroundColor: '#718096', height: '8px', width: '100px', borderRadius: '10px', cursor: 'pointer' }}></div>
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
        <div style={{ height: '24px', display: 'flex', justifyContent: 'center' }}>
          <div onClick={categoryHandler} style={{ margin: '16px 16px', backgroundColor: '#718096', height: '8px', width: '100px', borderRadius: '10px', cursor: 'pointer' }}></div>
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
        <div style={{ height: '24px', display: 'flex', justifyContent: 'center' }}>
          <div onClick={categoryHandler} style={{ margin: '16px 16px', backgroundColor: '#718096', height: '8px', width: '100px', borderRadius: '10px', cursor: 'pointer' }}></div>
        </div>
        <div style={{ display: 'flex', maxWidth: '500px' }}>
          <Tab onClick={() => { setTabNum(1) }}>제품 구분</Tab>
          <Tab onClick={() => { setTabNum(2) }}>영양소 </Tab>
          <Tab className='selected' state='3px solid #6A53FE' onClick={() => { setTabNum(3) }}>생리활성 기능 </Tab>
        </div>
      </div>
  }

  return (
    <>
      <SearchPills openHandler={backBtnHandler} setIsSearched={setIsSearched} setIsOpened={setIsOpened}></SearchPills>
      <SelectedBox>
        <CategoryOpenBtn onClick={() => { setIsOpened(!isOpened) }}>
          <div style={{ margin: '8px' }}>
            카테고리
          </div>
        </CategoryOpenBtn>
        {nutrients &&
          nutrients.map((nutrient) => {
            if (nutrientList.includes(nutrient.nutrientId)) {
              return (
                <CategoryBtn
                  key={nutrient.nutrientId}
                  style={{ cursor: 'auto' }}
                  className='selected'>
                  <div style={{ margin: '8px', display: 'flex' }}>
                    <div style={{ marginRight: '8px' }}>
                      {nutrient.nutrientName}
                    </div>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => { nutrientHandler(nutrient.nutrientId) }}
                    >
                      <i className="fa-solid fa-xmark fa-lg"></i>
                    </div>
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
                    <div style={{ marginRight: '8px' }}>
                      {functionalitiy.functionalityContent}
                    </div>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => { functionalityHandler(functionalitiy.functionalityId) }}
                    >
                      <i className="fa-solid fa-xmark fa-lg"></i>
                    </div>
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
        </Category>
      }
      <SearchResult isSearched={isSearched}></SearchResult>
    </>
  );
};

export default SearchSlide;
