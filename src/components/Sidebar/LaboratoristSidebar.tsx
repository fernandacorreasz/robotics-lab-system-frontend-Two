import React from 'react';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined, DashboardOutlined, StockOutlined, FileTextOutlined, MessageOutlined } from '@ant-design/icons';

const LaboratoristSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('permissionLevel');
    navigate('/');
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['dashboard']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout 
      </Menu.Item>
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/laboratorist/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="manage-activities" icon={<FileTextOutlined />}>
        <Link to="/laboratorist/manage-activities">Gerenciar Atividades</Link>
      </Menu.Item>
      <Menu.Item key="manage-stock" icon={<StockOutlined />}>
        <Link to="/laboratorist/manage-stock">Gerenciar Estoque</Link>
      </Menu.Item>
      <Menu.Item key="manage-loans" icon={<FileTextOutlined />}>
        <Link to="/laboratorist/manage-loans">Gerenciar Empréstimos</Link>
      </Menu.Item>
      <Menu.Item key="forum" icon={<MessageOutlined />}>
        <Link to="/laboratorist/forum">Fórum</Link>
      </Menu.Item>
    </Menu>
  );
};

export default LaboratoristSidebar;
