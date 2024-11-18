import React, { useState } from 'react';
import { Layout } from 'antd';
import CustomBreadcrumb from '../../components/Common/CustomBreadcrumb';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../../components/Sidebar/StudentSidebar';

const {Content, Footer, Sider } = Layout;

const PageStudent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh', width: "100%"  }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
        <StudentSidebar />
      </Sider>
      <Layout>
        <CustomBreadcrumb />
        <Content style={{padding: '18px', background: '#fff', minHeight: '280px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2024 Robotics Lab Student Panel
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageStudent;
