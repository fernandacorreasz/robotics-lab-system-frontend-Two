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
  Input,
  Form,
  Select,
} from "antd";
import {
  DownOutlined,
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  fetchComponents,
  filterComponents,
  deleteComponent,
  updateComponent,
} from "../../services/ComponentService";
import CustomTable from "../../components/Common/CustomTable";
import FilterComponent from "./info/FilterComponent";
import { Component } from "../../models/Component";
import BulkUploadCSVModal from "./info/BulkUploadCSVModal";
import CategoryModal from "./info/CategoryModal";
import SubCategoryModal from "./info/SubCategoryModal";
import { ColumnsType } from "antd/es/table";
import RoboticImage from "../../assets/img/robotic.png";
import { saveAs } from "file-saver";


const convertToCSV = (data: any[]): string => {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => `"${value}"`)
      .join(",")
  );

  return [headers, ...rows].join("\n");
};

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
  const [editComponent, setEditComponent] = useState<Component | null>(null);
  const navigate = useNavigate();
  const [descriptionModal, setDescriptionModal] = useState<{
    visible: boolean;
    description: string;
  }>({
    visible: false,
    description: "",
  });

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

  const handleEditComponent = async (values: Partial<Component>) => {
    if (!editComponent) return;
    try {
      await updateComponent(editComponent.id, values);
      message.success("Componente atualizado com sucesso!");
      setEditComponent(null);
      loadComponents(currentPage - 1, pageSize);
    } catch {
      throw new Error("Erro ao  atualizar o componente.");
    }
  };

  const columns: ColumnsType<Component> = [
    { title: "Nome do Componente", dataIndex: "name", key: "name" },
    {
      title: "Número de Série",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      render: (_text: string, record: Component) => (
        <Tooltip title="Ver Descrição Completa">
          <Button
            type="link"
            icon={<FileTextOutlined />}
            onClick={() =>
              setDescriptionModal({
                visible: true,
                description: record.description,
              })
            }
          />
        </Tooltip>
      ),
    },
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
        <Space>
          <Tooltip title="Editar Componente">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => setEditComponent(record)}
            />
          </Tooltip>
          <Tooltip title="Deletar Componente">
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
              onClick={() => setDeleteSerialNumber(record.serialNumber)}
            />
          </Tooltip>
        </Space>
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
  const handleGenerateReport = (type: string) => {
    let filteredData;
    let filename;

    switch (type) {
      case "disposables":
        filteredData = components.map((c) => ({
          Nome: c.name,
          Quantidade: c.quantity,
          "Itens Descartados": c.discardedQuantity,
        }));
        filename = "relatorio_descartaveis.csv";
        break;

      case "registered":
        filteredData = components.map((c) => ({
          ID: c.id,
          Nome: c.name,
          Categoria: c.categoryName,
          Subcategoria: c.subCategoryName,
          "Número de Série": c.serialNumber,
          Quantidade: c.quantity,
        }));
        filename = "relatorio_cadastrados.csv";
        break;

      case "unavailable":
        filteredData = components
          .filter((c) => c.status !== "AVAILABLE")
          .map((c) => ({
            Nome: c.name,
            Status: c.status,
            Quantidade: c.quantity,
          }));
        filename = "relatorio_indisponiveis.csv";
        break;

      default:
        message.error("Tipo de relatório inválido.");
        return;
    }

    const csvData = convertToCSV(filteredData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, filename);
    message.success(`Relatório "${type}" gerado com sucesso!`);
  };

  const menut = (
    <Menu>
      <Menu.Item key="disposables" onClick={() => handleGenerateReport("disposables")}>
        Relatório de Componentes Descartáveis
      </Menu.Item>
      <Menu.Item key="registered" onClick={() => handleGenerateReport("registered")}>
        Relatório de Componentes Cadastrados
      </Menu.Item>
      <Menu.Item key="unavailable" onClick={() => handleGenerateReport("unavailable")}>
        Relatório de Componentes Indisponíveis
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
              componentes no laboratório.
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
        <Col span={16} style={{ textAlign: "left" }}>
          <FilterComponent onApply={handleApplyFilter} />
        </Col>
        <Col span={4} style={{ textAlign: "right" }}>
          <Space>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button type="primary">
                Cadastros <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        </Col>
          <Col span={4}>
          <Space>
            <Dropdown overlay={menut} trigger={["click"]}>
              <Button type="primary">
                Exportar Relatórios <DownOutlined />
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
        visible={descriptionModal.visible}
        title="Descrição Completa"
        onCancel={() =>
          setDescriptionModal({ visible: false, description: "" })
        }
        footer={[
          <Button
            key="close"
            onClick={() =>
              setDescriptionModal({ visible: false, description: "" })
            }
          >
            Fechar
          </Button>,
        ]}
      >
        <p>{descriptionModal.description}</p>
      </Modal>
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

      {editComponent && (
     <Modal
     visible={!!editComponent}
     title="Editar Componente"
     onCancel={() => setEditComponent(null)}
     onOk={() => {
       if (
         editComponent?.discardedQuantity &&
         editComponent?.discardedQuantity > (editComponent?.quantity || 0)
       ) {
         message.error(
           "A quantidade descartada não pode ser superior à quantidade total disponível."
         );
         return;
       }
   
       handleEditComponent({
         name: editComponent.name,
         serialNumber: editComponent.serialNumber,
         description: editComponent.description,
         quantity: editComponent.quantity,
         tutorialLink: editComponent.tutorialLink,
         projectIdeas: editComponent.projectIdeas,
         librarySuggestions: editComponent.librarySuggestions,
         defectiveQuantity: editComponent.defectiveQuantity,
         discardedQuantity: editComponent.discardedQuantity,
         status: editComponent.status,
       });
     }}
     okText="Salvar"
     cancelText="Cancelar"
   >
     <Form layout="vertical" initialValues={editComponent}>
       <Form.Item label="Nome" name="name">
         <Input
           defaultValue={editComponent?.name}
           onChange={(e) =>
             setEditComponent({ ...editComponent, name: e.target.value })
           }
         />
       </Form.Item>
       <Form.Item label="Número de Série" name="serialNumber">
         <Input
           defaultValue={editComponent?.serialNumber}
           onChange={(e) =>
             setEditComponent({
               ...editComponent,
               serialNumber: e.target.value,
             })
           }
         />
       </Form.Item>
       <Form.Item label="Descrição" name="description">
         <Input.TextArea
           defaultValue={editComponent?.description}
           onChange={(e) =>
             setEditComponent({
               ...editComponent,
               description: e.target.value,
             })
           }
         />
       </Form.Item>
       <Form.Item label="Quantidade" name="quantity">
         <Input
           type="number"
           defaultValue={editComponent?.quantity}
           onChange={(e) =>
             setEditComponent({
               ...editComponent,
               quantity: parseInt(e.target.value, 10),
             })
           }
         />
       </Form.Item>
       <Form.Item label="Itens Defeituosos" name="defectiveQuantity">
         <Input
           type="number"
           min={0}
           defaultValue={editComponent?.defectiveQuantity}
           onChange={(e) =>
             setEditComponent({
               ...editComponent,
               defectiveQuantity: parseInt(e.target.value, 10),
             })
           }
         />
       </Form.Item>
       <Form.Item
         label={
           <Tooltip title="A quantidade descartada será subtraída da quantidade total disponível.">
             Itens Descartados
           </Tooltip>
         }
         name="discardedQuantity"
       >
         <Input
           type="number"
           min={0}
           defaultValue={editComponent?.discardedQuantity}
           onChange={(e) => {
             const discarded = parseInt(e.target.value, 10);
             if (discarded > (editComponent?.quantity || 0)) {
               message.error(
                 "A quantidade descartada não pode ser superior à quantidade total disponível."
               );
               return;
             }
             setEditComponent({
               ...editComponent,
               discardedQuantity: discarded,
             });
           }}
         />
       </Form.Item>
       <Form.Item label="Status" name="status">
         <Select
           defaultValue={editComponent?.status}
           onChange={(value) =>
             setEditComponent({
               ...editComponent,
               status: value,
             })
           }
         >
           <Select.Option value="AVAILABLE">Disponível</Select.Option>
           <Select.Option value="DEFECTIVE">Com Defeito</Select.Option>
           <Select.Option value="DISCARDED">Descartado</Select.Option>
           <Select.Option value="IN_USE">Em Uso</Select.Option>
           <Select.Option value="UNDER_MAINTENANCE">
             Em Manutenção
           </Select.Option>
         </Select>
       </Form.Item>
       <Form.Item
         label="Link para Tutorial (YouTube)"
         name="tutorialLink"
         rules={[
           {
             type: "url",
             message: "Insira um URL válido.",
           },
           {
             pattern: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
             message: "Insira um link do YouTube válido.",
           },
         ]}
       >
         <Input
           placeholder="Ex.: https://www.youtube.com/..."
           defaultValue={editComponent?.tutorialLink}
           onChange={(e) =>
             setEditComponent({
               ...editComponent,
               tutorialLink: e.target.value,
             })
           }
         />
       </Form.Item>
       <Form.Item label="Ideias de Projetos" name="projectIdeas">
         <Input.TextArea
           placeholder="Dicas para projetos usando o componente"
           defaultValue={editComponent?.projectIdeas}
           onChange={(e) =>
             setEditComponent({
               ...editComponent,
               projectIdeas: e.target.value,
             })
           }
         />
       </Form.Item>
       <Form.Item label="Sugestões de Bibliotecas" name="librarySuggestions">
         <Input.TextArea
           placeholder="Sugestões de bibliotecas para usar com o componente"
           defaultValue={editComponent?.librarySuggestions}
           onChange={(e) =>
             setEditComponent({
               ...editComponent,
               librarySuggestions: e.target.value,
             })
           }
         />
       </Form.Item>
     </Form>
   </Modal>
   
      )}
    </div>
  );
};

export default ManageStockLaboratorist;
