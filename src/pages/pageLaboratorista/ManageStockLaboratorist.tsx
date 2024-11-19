import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Row,
  Col,
  Pagination,
  Dropdown,
  Menu,
  Modal,
  Tooltip,
  message,
  Card,
} from "antd";
import { DownOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  fetchComponents,
  filterComponents,
  deleteComponent,
} from "../../services/ComponentService";
import CustomTable from "../../components/Common/CustomTable";
import FilterComponent from "./info/FilterComponent";
import { Component } from "../../models/Component";
import BulkUploadCSVModal from "./info/BulkUploadCSVModal";
import CategoryModal from "./info/CategoryModal";
import SubCategoryModal from "./info/SubCategoryModal";
import { ColumnsType } from "antd/es/table";
import RoboticImage from "../../assets/img/robotic.png";

const ManageStockLaboratorist: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [isCSVModalVisible, setCSVModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isSubCategoryModalVisible, setSubCategoryModalVisible] =
    useState(false);
  const [deleteSerialNumber, setDeleteSerialNumber] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    loadComponents(currentPage - 1, pageSize);
  }, [currentPage]);

  const loadComponents = async (page: number, size: number) => {
    setLoading(true);
    const data = await fetchComponents(page, size);
    setComponents(data.content);
    setTotalElements(data.totalElements);
    setLoading(false);
  };

  const handleApplyFilter = async (
    filters: { column: string; filterType: string; value: string }[]
  ) => {
    setLoading(true);
    const data = await filterComponents(filters, currentPage - 1, pageSize);
    setComponents(data.content);
    setTotalElements(data.totalElements);
    setLoading(false);
  };

  const handleDeleteComponent = async () => {
    if (!deleteSerialNumber) return;
    try {
      await deleteComponent([deleteSerialNumber]);
      message.success("Componente deletado com sucesso!");
      setDeleteSerialNumber(null);
      loadComponents(currentPage - 1, pageSize);
    } catch {
      message.error("Erro ao deletar o componente.");
    }
  };

  const columns: ColumnsType<Component> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nome do Componente", dataIndex: "name", key: "name" },
    {
      title: "Número de Série",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    { title: "Descrição", dataIndex: "description", key: "description" },
    { title: "Quantidade", dataIndex: "quantity", key: "quantity" },
    {
      title: "Subcategoria",
      dataIndex: "subCategoryName",
      key: "subCategoryName",
    },
    { title: "Categoria", dataIndex: "categoryName", key: "categoryName" },
    {
      title: "Ações",
      key: "actions",
      render: (_: unknown, record: Component) => (
        <Tooltip title="Deletar Componente">
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => setDeleteSerialNumber(record.serialNumber)}
          />
        </Tooltip>
      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="bulk-csv" onClick={() => setCSVModalVisible(true)}>
        Cadastro Massivo de Componentes via CSV
      </Menu.Item>
      <Menu.Item
        key="bulk-screen"
        onClick={() => navigate("/laboratorist/manage-stock/bulk-add")}
      >
        Cadastro Massivo de Componentes em Tela
      </Menu.Item>
      <Menu.Item key="category" onClick={() => setCategoryModalVisible(true)}>
        Cadastrar Categoria
      </Menu.Item>
      <Menu.Item
        key="subcategory"
        onClick={() => setSubCategoryModalVisible(true)}
      >
        Cadastrar Subcategoria
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Card
        style={{
          marginBottom: "20px",
          padding: "12px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row align="middle" justify="start">
          <Col span={20}>
            <h4 style={{ color: "#69c4d3", margin: 0, textAlign: "left" }}>
              Controle de Estoque de Componentes
            </h4>
            <p style={{ margin: 0, textAlign: "left" }}>
              Esta é a área principal para gerenciamento do estoque de
              componentes no laboratório. Aqui você pode cadastrar, visualizar,
              filtrar, e deletar componentes. Gerencie categorias, subcategorias
              e utilize ferramentas de cadastro massivo para manter tudo
              organizado!
            </p>
          </Col>
          <Col span={4}>
            <img
              src={RoboticImage}
              alt="Robô"
              style={{
                width: "60px",
                display: "block",
                marginLeft: "auto",
              }}
            />
          </Col>
        </Row>
      </Card>

      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={18} style={{ textAlign: "left" }}>
          <FilterComponent onApply={handleApplyFilter} />
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Space>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button type="primary">
                Cadastros <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        </Col>
      </Row>

      <CustomTable
        dataSource={components}
        columns={columns}
        size="500px"
        loading={loading}
        rowKey="id"
        numberOfElements={components.length}
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalElements}
        onChange={(page) => setCurrentPage(page)}
        style={{ textAlign: "right", marginTop: "20px" }}
      />

      <BulkUploadCSVModal
        visible={isCSVModalVisible}
        onClose={() => setCSVModalVisible(false)}
      />
      <CategoryModal
        visible={isCategoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
      />
      <SubCategoryModal
        visible={isSubCategoryModalVisible}
        onClose={() => setSubCategoryModalVisible(false)}
      />

      <Modal
        visible={!!deleteSerialNumber}
        title="Confirmar Exclusão"
        onCancel={() => setDeleteSerialNumber(null)}
        onOk={handleDeleteComponent}
        okText="Deletar"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja deletar este componente?</p>
      </Modal>
    </div>
  );
};

export default ManageStockLaboratorist;
