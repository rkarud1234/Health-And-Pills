import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundWrapper = styled.div`
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & p {
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

const NotFoundImageWrapper = styled.div`
  width: 300px;
  margin-right: 10px;
  position: relative;
`;

const NotFoundImage = styled.img`
  border-radius: 40px;
  object-fit: fill;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const MainLink = styled(Link)`
  font-size: 20px;
  -webkit-text-decoration: none;
  text-decoration: none;
  color: black;
  top: 36px;
  left: 5%;
  font-weight: 700;
`;
const NotFound = () => {
  return (
    <NotFoundWrapper>
      <NotFoundImageWrapper>
        <NotFoundImage src={process.env.PUBLIC_URL + "/errorImages/404.png"} />
      </NotFoundImageWrapper>
      <p>메인으로 돌아갈까요?</p>
      <MainLink to="/">Click!!!</MainLink>
    </NotFoundWrapper>
  );
};

export default NotFound;
