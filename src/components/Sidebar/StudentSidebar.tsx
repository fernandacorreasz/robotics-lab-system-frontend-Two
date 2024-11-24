import React from "react";
import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  DashboardOutlined,
  FileTextOutlined,
  BookOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import LogoWickedBotz from "../../assets/img/logo-wickedbotz.svg";

const StudentSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      selectedKeys={[selectedKey]} // Garante que o item correto esteja selecionado
      style={{ height: "100%", borderRight: 0, textAlign: "left" }}
    >
      {" "}
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
      <Menu.Item
        key="dashboard"
        icon={<DashboardOutlined />}
        style={{ textAlign: "left" }}
      >
        <Link to="/student/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item
        key="activities"
        icon={<FileTextOutlined />}
        style={{ textAlign: "left" }}
      >
        <Link to="/student/activities">Atividades</Link>
      </Menu.Item>
      <Menu.Item
        key="components-library"
        icon={<BookOutlined />}
        style={{ textAlign: "left" }}
      >
        <Link to="/student/components-library">Biblioteca de Componentes</Link>
      </Menu.Item>
      <Menu.Item
        key="forum"
        icon={<MessageOutlined />}
        style={{ textAlign: "left" }}
      >
        <Link to="/student/forum">Fórum</Link>
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{ textAlign: "left" }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default StudentSidebar;
