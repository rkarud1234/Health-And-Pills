import styled from "styled-components";
import { Link } from "react-router-dom";
const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  min-width: 240px;
  max-width: 500px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #eee;
  height: 60px;
  & ul {
    display: flex;
    justify-content: space-around;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <ul>
        <li>
          <Link to="/">
            <i className="fa-solid fa-house"></i>
          </Link>
        </li>
        <li>
          <Link to="/health">
            <i className="fas fa-dumbbell"></i>
          </Link>
        </li>
        <li>
          <Link to="/pills">
            <i className="fas fa-capsules"></i>
          </Link>
        </li>
        <li>
          <Link to="/">
            <i className="far fa-calendar-check"></i>
          </Link>
        </li>
        <li>
          <Link to="/">
            <i className="fas fa-user"></i>
          </Link>
        </li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
