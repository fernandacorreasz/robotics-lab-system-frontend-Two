import React, { useState } from 'react';
import { Layout } from 'antd';
import LaboratoristSidebar from '../../components/Sidebar/LaboratoristSidebar';
import CustomBreadcrumb from '../../components/Common/CustomBreadcrumb';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const PageLaboratorist: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh', width: "100%"  }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
        <LaboratoristSidebar />
      </Sider>
      <Layout>
        <Header>
          Painel do Laboratorista
        </Header>
        <CustomBreadcrumb />
        <Content style={{ margin: '16px', padding: '24px', background: '#fff', minHeight: '280px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2024 Robotics Lab Laboratorist Panel
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLaboratorist;
