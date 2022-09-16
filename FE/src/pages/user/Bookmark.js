import { useEffect, useState } from "react";
import styled from "styled-components";

const pillBookmark = [
  {
    userInfoId: 1,
    id: 1,
    name: "비타민C",
    rating: 4.8,
    img: "",
  },
  {
    userInfoId: 2,
    id: 2,
    name: "숭구리당당",
    rating: 4.8,
    img: "",
  },
  {
    userInfoId: 3,
    id: 3,
    name: "올리고당",
    rating: 4.3,
    img: "",
  },
  {
    userInfoId: 4,
    id: 4,
    name: "큰일났당",
    rating: 4.1,
    img: "",
  },
];

const exerciseBookmark = [
  {
    userInfoId: 1,
    id: 1,
    name: "숨쉬기운동",
    type: "core",
  },
  {
    userInfoId: 2,
    id: 2,
    name: "암것도안함",
    type: "core",
  },
  {
    userInfoId: 3,
    id: 3,
    name: "러닝",
    type: "core",
  },
  {
    userInfoId: 4,
    id: 4,
    name: "푸시업",
    type: "arm",
  },
];

const StyledTypeButton = styled.button`
  padding: 8px;
  width: 52px;
  background-color: transparent;
`;

const empty = [];
const BookmarkWrapper = styled.div`
  padding: 8px 20px;
`;
const fetchUserBookmark = async (type) => {
  //   const result = await type에따른 북마크 요청 api
  const result = 1;
  return result;
};
const Bookmark = () => {
  const [typeState, setTypeState] = useState("pill");
  const [bookmarkState, setBookmarkState] = useState([]);
  useEffect(() => {
    // const result = fetchUserBookmark(typeState);
    const result = typeState === "pill" ? empty : exerciseBookmark;
    setBookmarkState([...result]);
  }, [typeState]);

  const onHandleTypeChange = (type) => {
    setTypeState(type);
  };
  return (
    <BookmarkWrapper>
      <div>
        <StyledTypeButton onClick={() => onHandleTypeChange("pill")}>
          영양제
        </StyledTypeButton>
        <StyledTypeButton onClick={() => onHandleTypeChange("exercise")}>
          운동
        </StyledTypeButton>
      </div>
      {bookmarkState.length !== 0 ? (
        bookmarkState.map((item) => (
          <div style={{ display: "flex" }} key={item.id}>
            <div>{item.id}</div>
            <div>{item.name}</div>
          </div>
        ))
      ) : (
        <>등록된 북마크가 없습니다.</>
      )}
    </BookmarkWrapper>
  );
};

export default Bookmark;
