import styled from "styled-components";
import BackButton from "../buttons/BackButton";
import Header from "./Header";

const SlidingMenuWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  background-color: #fff;
  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);
  &.hide {
    transform: translate3d(100vw, 0, 0);
  }
  &.active {
    transform: translate3d(0, 0, 0);
  }
`;

const SlidingMenu = ({ type, active, close, slidingMenuTitle }) => {
  return (
    <>
      <SlidingMenuWrapper className={active ? "active" : "hide"}>
        <Header
          centerChildren={slidingMenuTitle}
          leftNone={true}
          leftChildren={<BackButton onClick={close} />}
        />
        {type}
      </SlidingMenuWrapper>
    </>
  );
};

export default SlidingMenu;
