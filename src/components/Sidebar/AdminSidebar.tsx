import React from 'react';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined, UserOutlined, BarChartOutlined, MessageOutlined} from '@ant-design/icons';
import LogoWickedBotz from "../../assets/img/logo-wickedbotz.svg";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissionLevel");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/");
  };

  const selectedKey = location.pathname.includes('/student/forum/')
  ? 'forum-sac' 
  : location.pathname.split('/')[2];
  const userName = localStorage.getItem("name");
  return (
    <Menu
    mode="inline"
    selectedKeys={[selectedKey]} // Garante que o item correto esteja selecionado
    style={{ height: '100%', borderRight: 0, textAlign: 'left' }}
  ><Menu.Item key="logout">
        <img
          src={LogoWickedBotz}
          alt="Logo WickedBotz"
          style={{
            height: "20px",
            marginRight: "6px",
            verticalAlign: "middle",
          }}
        />
        <span
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "#fff",
            verticalAlign: "middle",
          }}
        >
          Robotics Lab System
        </span>
      </Menu.Item>
      <Menu.Item key="logout">Bem-vindo, {userName}!</Menu.Item>
      <Menu.Item key="manage-users" icon={<UserOutlined />}>
        <Link to="/admin/manage-users">Gerenciar Usuários</Link>
      </Menu.Item>
      <Menu.Item key="performance-reports" icon={<BarChartOutlined />}>
        <Link to="/admin/performance-reports">Relatórios de Desempenho</Link>
      </Menu.Item>
      <Menu.Item key="forum-sac" icon={<MessageOutlined />}>
        <Link to="/admin/forum-sac">Fórum-SAC</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default AdminSidebar;
