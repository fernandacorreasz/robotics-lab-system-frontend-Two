import { ConfigProvider, Layout } from "antd";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../styles/GlobalStyles";
import { Content, Header } from "antd/es/layout/layout";
import AppRoutes from "../routes/AppRoutes";
import { Theme } from "../styles/ThemeComponent";
import CustomButton from "../components/Common/CustomButton";
import CustomInput from "../components/Common/CustomInpu";
import CustomForm from "../components/Common/CustomForm";
import CascaderComponent from "../components/Common/CustomCascater";
import DropdownComponent from "../components/Common/CustomDropdown";
import CustomModal from "../components/Common/CustomModal";
import TableComponent from "../components/Common/CustomTable";
import TabsComponent from "../components/Common/CustomTabs";
import CustomBreadcrumb from "../components/Common/CustomBreadcrumb";

const PageInit: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const cascaderOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  const dropdownItems = [
    { key: "1", label: "Action 1" },
    { key: "2", label: "Action 2" },
  ];

  const dataSource = [
    { key: "1", name: "John Doe", age: 32, address: "123 Main St" },
    { key: "2", name: "Jane Doe", age: 28, address: "456 Maple Ave" },
  ];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
  ];

  const tabsItems = [
    { key: "1", label: "Tab 1", content: <div>Content of Tab 1</div> },
    { key: "2", label: "Tab 2", content: <div>Content of Tab 2</div> },
  ];

  return (
    <BrowserRouter>
      <ConfigProvider theme={Theme}>
        <GlobalStyles />
        <Layout style={{ minHeight: "100vh" }}>
          <Header />
          <Layout>
            {/* Conteúdo sidebar */}
            <Layout>
              <CustomBreadcrumb />
              <Content>
                <AppRoutes />

                {/* Componentes reutilizáveis para teste */}
                <h2>Testando Componentes Reutilizáveis</h2>

                <CustomButton
                  text="Abrir Modal"
                  onClick={() => setShowModal(true)}
                />

                <CustomInput
                  placeholder="Digite algo"
                  value=""
                  onChange={(e) => console.log("Input:", e.target.value)}
                />

                <CustomForm
                  fields={[]}
                  onFinish={() => {
                    console.log("Form submitted");
                  }}
                />

                <CascaderComponent
                  options={cascaderOptions}
                  onChange={(value) => console.log("Cascader:", value)}
                />

                <DropdownComponent
                  menuItems={dropdownItems}
                  handleMenuClick={(key) => console.log("Dropdown:", key)}
                />

                <CustomModal
                  title="Exemplo de Modal"
                  visible={showModal}
                  onOk={() => setShowModal(false)}
                  onCancel={() => setShowModal(false)}
                >
                  <p>Conteúdo do Modal</p>
                </CustomModal>

                <TableComponent
                  dataSource={dataSource}
                  columns={columns}
                  size={300}
                  numberOfElements={dataSource.length}
                />

                <TabsComponent items={tabsItems} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default PageInit;
