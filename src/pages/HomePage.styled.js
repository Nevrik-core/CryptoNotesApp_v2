import styled from "styled-components";
import theme from "constants/theme";
import { NavLink } from "react-router-dom";

export const Navbar = styled.div`
  background-color: ${theme.colors.blue};
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const BottomMenu = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: ${theme.colors.blue};
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
  box-sizing: border-box;
  z-index: 100;
`;

export const TopStyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #ffffff9d;
  margin-right: auto;
  font-weight: normal;
  transition: font-weight 0.3s ease-in-out;
  
  &.active {
    color: #FFFFFF;
    font-weight: bold;
  }
`;

export const BottomStyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #ffffff9d;
  font-weight: normal;
  transition: font-weight 0.3s ease-in-out;
  
  &.active {
    color: #FFFFFF;
    font-weight: bold;
  }
`;

export const SignOutButton = styled.button`
  color: #ffffff;
  background-color: transparent;
  border: none;
`;

export const ContentContainer = styled.div`
  height: calc(100vh - 80px); 
  overflow: auto;
`;