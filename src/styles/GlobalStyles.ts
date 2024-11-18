import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #000;
  }

  .ant-breadcrumb {
    margin-left: 12px;
    margin-bottom:0px;
    margin-top:15px;
  }
  .ant-breadcrumb a{
    color: #344767;
  }
`;

export default GlobalStyles;
