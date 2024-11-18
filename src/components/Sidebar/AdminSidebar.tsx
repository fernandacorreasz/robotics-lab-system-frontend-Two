import React from 'react';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined, DashboardOutlined, UserOutlined, FileTextOutlined, BarChartOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';

const AdminSidebar: React.FC = () => {
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
        <Link to="/admin/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="manage-users" icon={<UserOutlined />}>
        <Link to="/admin/manage-users">Gerenciar Usuários</Link>
      </Menu.Item>
      <Menu.Item key="certificates" icon={<FileTextOutlined />}>
        <Link to="/admin/certificates">Certificados</Link>
      </Menu.Item>
      <Menu.Item key="performance-reports" icon={<BarChartOutlined />}>
        <Link to="/admin/performance-reports">Relatórios de Desempenho</Link>
      </Menu.Item>
      <Menu.Item key="forum-sac" icon={<MessageOutlined />}>
        <Link to="/admin/forum-sac">Fórum-SAC</Link>
      </Menu.Item>
      <Menu.Item key="profile-settings" icon={<SettingOutlined />}>
        <Link to="/admin/profile-settings">Configuração de Perfil</Link>
      </Menu.Item>
    </Menu>
  );
};

export default AdminSidebar;
