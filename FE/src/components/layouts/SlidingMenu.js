import styled from "styled-components";
import BackButton from "../buttons/BackButton";
import Header from "./Header";

const SlidingMenuWrapper = styled.div`
  max-width: 500px;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  /* left: 0px; */
  background-color: #fff;
  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);
  &.hide {
    transform: translate3d(100%, 0, 0);
  }
  &.active {
    transform: translate3d(0, 0, 0);
  }
`;

const SlidingMenu = ({ type, active, close, slidingMenuTitle, contents }) => {
  return (
    <>
      <SlidingMenuWrapper className={active ? "active" : "hide"}>
        <Header
          centerChildren={slidingMenuTitle}
          leftNone={true}
          leftChildren={<BackButton onClick={close} />}
        />
        {contents}
      </SlidingMenuWrapper>
    </>
  );
};

export default SlidingMenu;
