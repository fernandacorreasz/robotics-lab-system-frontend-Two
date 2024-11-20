import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LogoutOutlined,
  DashboardOutlined,
  FileTextOutlined,
  BookOutlined,
  MessageOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

const StudentSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('permissionLevel');
    navigate('/');
  };


  const selectedKey = location.pathname.includes('/student/forum/')
    ? 'forum' 
    : location.pathname.split('/')[2];

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]} // Garante que o item correto esteja selecionado
      style={{ height: '100%', borderRight: 0, textAlign: 'left' }}
    >
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{ textAlign: 'left' }}
      >
        Logout
      </Menu.Item>
      <Menu.Item key="dashboard" icon={<DashboardOutlined />} style={{ textAlign: 'left' }}>
        <Link to="/student/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="activities" icon={<FileTextOutlined />} style={{ textAlign: 'left' }}>
        <Link to="/student/activities">Atividades</Link>
      </Menu.Item>
      <Menu.Item key="components-library" icon={<BookOutlined />} style={{ textAlign: 'left' }}>
        <Link to="/student/components-library">Biblioteca de Componentes</Link>
      </Menu.Item>
      <Menu.Item key="forum" icon={<MessageOutlined />} style={{ textAlign: 'left' }}>
        <Link to="/student/forum">Fórum</Link>
      </Menu.Item>
      <Menu.Item key="request-certificate" icon={<TrophyOutlined />} style={{ textAlign: 'left' }}>
        <Link to="/student/request-certificate">Solicitar Certificado</Link>
      </Menu.Item>
    </Menu>
  );
};

export default StudentSidebar;
