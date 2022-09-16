import styled from "styled-components";

const StyeldModalCloseButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: transparent;
  padding: 0px;
  position: absolute;
  text-align: center;
  right: 10px;
  top: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const ModalCloseButton = ({ onClick }) => {
  return (
    <StyeldModalCloseButton onClick={onClick}>
      <i className="fa-solid fa-xmark"></i>
    </StyeldModalCloseButton>
  );
};

export default ModalCloseButton;
