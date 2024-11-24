import React from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  DashboardOutlined,
  StockOutlined,
  FileTextOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import LogoWickedBotz from "../../assets/img/logo-wickedbotz.svg";


const LaboratoristSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissionLevel");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/");
  };
  const selectedKey = location.pathname.includes("/student/forum/")
    ? "forum"
    : location.pathname.split("/")[2];

  const userName = localStorage.getItem("name");

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      style={{ height: "100%", borderRight: 0, textAlign: "left" }}
    >
      <Menu.Item key="logout">
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
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default LaboratoristSidebar;
