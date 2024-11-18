
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './App.css';
import { ConfigProvider } from 'antd';
import { Theme } from './styles/ThemeComponent';

function App() {
  return (
    <ConfigProvider theme={Theme}>
    <Router>
      <AppRoutes />
    </Router></ConfigProvider>
  );
}

export default App;
