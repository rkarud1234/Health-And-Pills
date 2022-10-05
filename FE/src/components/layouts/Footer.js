import styled from "styled-components";
import { NavLink } from "react-router-dom";
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

const NavLinkStyle = styled(NavLink)`
  &.active i {
    background: linear-gradient(to right, #537cfe, #6a53fe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <ul>
        <li>
          <NavLinkStyle to="/" activeclassname="active">
            <i className="fa-solid fa-house"></i>
          </NavLinkStyle>
        </li>
        <li>
          <NavLinkStyle to="/health" activeclassname="active">
            <i className="fas fa-dumbbell"></i>
          </NavLinkStyle>
        </li>
        <li>
          <NavLinkStyle to="/pills" activeclassname="active">
            <i className="fas fa-capsules"></i>
          </NavLinkStyle>
        </li>
        <li>
          <NavLinkStyle to="/schedule" activeclassname="active">
            <i className="far fa-calendar-check"></i>
          </NavLinkStyle>
        </li>
        <li>
          <NavLinkStyle to="/profiles" activeclassname="active">
            <i className="fas fa-user"></i>
          </NavLinkStyle>
        </li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
