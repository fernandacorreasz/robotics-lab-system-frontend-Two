import React from 'react';
import { Layout } from 'antd';
import { styled } from 'styled-components';

export const StyledHeader = styled(Layout.Header)`
  background-color: #000;
  height: 7vh;
  display: flex;
  align-items: center;
  padding: 0 2vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10; 

  img {
    max-width: 60%;
    max-height: 60%;
    height: auto;
  }
`;

const Header: React.FC = () => (
  <StyledHeader>
header
  </StyledHeader>
);

export default Header;
