import React from 'react';
import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { Layout } from 'antd';


const StyledContent = styled(Layout.Content)`
  max-width: 100%;
  padding: 7px 12px 13px 11px;
  backgroun: #000;
`;

const Content: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <StyledContent>
    {children}
  </StyledContent>
);

export default Content;
