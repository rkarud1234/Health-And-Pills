import React, { useState, useEffect } from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import BackButton from "../components/buttons/BackButton";
import styled from "styled-components";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PillInfo from "./Pills/PillInfo";
import PillReview from "./Pills/PillReview";
import { useDispatch, useSelector } from "react-redux";
import { PillDetailFetch } from "../store/actions/pills";

const ScrollDiv = styled.div`
  ::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera 환경*/
  scrollbar-height: none; /* firefox 환경 */
  overflow-y: scroll;
  height: 82vh;
  font-family: "GmarketSans";
`;

const Tab = styled.div`
  width: 100%;
  height: 48px;
  cursor: pointer;
  text-align: center;
  background: ${(props) => props.background};
  // border: 1px solid #A6A4A4;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 44px;
  color: white;
`;
const TabList = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const PillDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [tabNum, setTabNum] = useState(1);

  const id = useParams().id;
  const pillDetail = useSelector((state) => state.pill.pillDetail);
  const status = useSelector((state) => state.pill.status);

  useEffect(() => {
    dispatch(PillDetailFetch(id));
  }, [id]);

  let Tabs = "";
  if (tabNum === 1) {
    Tabs = (
      <TabList>
        <Tab
          background="linear-gradient(to right, #537CFE, #6A53FE);"
          onClick={() => {
            setTabNum(1);
          }}
        >
          상세정보
        </Tab>
        <Tab
          background="#d6d6d6"
          onClick={() => {
            setTabNum(2);
          }}
        >
          리뷰 ({pillDetail.pillReviewCount})
        </Tab>
      </TabList>
    );
  } else {
    Tabs = (
      <TabList>
        <Tab
          background="#d6d6d6"
          onClick={() => {
            setTabNum(1);
          }}
        >
          상세정보
        </Tab>
        <Tab
          background="linear-gradient(to right, #537CFE, #6A53FE);"
          onClick={() => {
            setTabNum(2);
          }}
        >
          리뷰 ({pillDetail.pillReviewCount})
        </Tab>
      </TabList>
    );
  }
  console.log(state);

  return (
    <>
      {status ? (
        <>
          <Header
            leftNone={true}
            centerChildren={pillDetail.pillName}
            leftChildren={
              <BackButton
                onClick={() => {
                  if (state === null) {
                    navigate(-1);
                  } else {
                    if (state.prevPath) {
                      navigate("/profiles", {
                        replace: true,
                        state: {
                          infoType: state.prevPath,
                          title: state.title,
                          type: state.type,
                        },
                      });
                    }
                  }
                }}
              />
            }
          />
          <ScrollDiv id="scrollDiv">
            {Tabs}
            {tabNum === 1 ? (
              <PillInfo id={id} {...pillDetail} key={"pillInfo"} />
            ) : (
              <PillReview id={id} {...pillDetail} key={"pillReview"} />
            )}
          </ScrollDiv>
          <Footer />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PillDetail;
