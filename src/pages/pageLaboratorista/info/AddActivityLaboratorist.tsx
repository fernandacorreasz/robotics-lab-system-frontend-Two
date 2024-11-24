import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Select,
  Modal,
  Table,
  message,
  UploadFile,
  Spin,
} from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { createActivity } from "../../../services/ActivityService";
import { fetchComponents } from "../../../services/ComponentService";
import type { TablePaginationConfig } from "antd/es/table";

const { Option } = Select;

interface FormValues {
  activityTitle: string;
  activityDescription: string;
  activityStatus: string;
  timeSpent: number;
  startDate: moment.Moment;
}

interface Component {
  id: string;
  name: string;
  description: string;
}

const AddActivityLaboratorist: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [componentPagination, setComponentPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const handleAdd = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const activityData = {
        ...values,
        timeSpent: values.timeSpent * 60,
        startDate: values.startDate.toISOString(),
        user: {
          id: localStorage.getItem("userId") || "",
        },
        componentsUsed: selectedComponents.map((comp) => ({ id: comp.id })),
      };

      const formData = new FormData();
      formData.append("activity", JSON.stringify(activityData));
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      await createActivity(formData);
      message.success("Atividade criada com sucesso!");
      navigate("/laboratorist/manage-activities");
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || "Erro ao criar atividade. Tente novamente.");
      } else {
        message.error("Erro desconhecido ao criar atividade.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const handleOpenModal = async () => {
    try {
      setLoading(true);
      const data = await fetchComponents(componentPagination.current - 1, componentPagination.pageSize);
      setComponents(data.content);
      setComponentPagination((prev) => ({
        ...prev,
        total: data.totalElements,
      }));
    } catch {
      message.error("Erro ao carregar componentes.");
    } finally {
      setLoading(false);
      setIsModalVisible(true);
    }
  };

  const handleComponentSelection = (selectedRowKeys: React.Key[], selectedRows: Component[]) => {
    setSelectedComponents(selectedRows);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleTableChange = async (pagination: TablePaginationConfig) => {
    try {
      setLoading(true);
      const data = await fetchComponents((pagination.current || 1) - 1, pagination.pageSize || 10);
      setComponents(data.content);
      setComponentPagination({
        current: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        total: data.totalElements,
      });
    } catch {
      message.error("Erro ao carregar componentes.");
    } finally {
      setLoading(false);
    }
  };

  const componentColumns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <Card title="Adicionar Nova Atividade - Laboratorista">
      <Form form={form} layout="vertical" onFinish={handleAdd}>
        <Form.Item
          name="activityTitle"
          label="Título"
          rules={[{ required: true, message: "Insira o título" }]}
        >
          <Input placeholder="Digite o título da atividade" />
        </Form.Item>
        <Form.Item
          name="activityDescription"
          label="Descrição"
          rules={[{ required: true, message: "Insira a descrição" }]}
        >
          <Input.TextArea placeholder="Digite a descrição da atividade" />
        </Form.Item>
        <Form.Item
          name="activityStatus"
          label="Status"
          rules={[{ required: true, message: "Selecione o status" }]}
        >
          <Select placeholder="Selecione o status">
            <Option value="NOT_STARTED">Não Iniciado</Option>
            <Option value="IN_PROGRESS">Em Progresso</Option>
            <Option value="COMPLETED">Concluído</Option>
            <Option value="CANCELED">Cancelado</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="timeSpent"
          label="Tempo Gasto (em horas)"
          rules={[{ required: true, message: "Insira o tempo gasto" }]}
        >
          <Input type="number" placeholder="Digite o tempo gasto (em horas)" />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Data de Início"
          rules={[{ required: true, message: "Selecione a data de início" }]}
        >
          <DatePicker showTime placeholder="Selecione a data e horário de início" />
        </Form.Item>
        <Form.Item label="Componentes Relacionados (Opcional)">
          <Button type="dashed" onClick={handleOpenModal} icon={<EyeOutlined />}>
            Selecionar Componentes
          </Button>
          <p>
            {selectedComponents.length} componente(s) selecionado(s)
          </p>
        </Form.Item>
        <Form.Item label="Imagem (Opcional)">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            multiple
            fileList={fileList}
            accept="image/png, image/jpeg, image/gif"
          >
            <Button icon={<UploadOutlined />}>Selecionar Imagem</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Adicionar Atividade"}
          </Button>
        </Form.Item>
      </Form>

      {/* Modal para seleção de componentes */}
      <Modal
        title="Selecionar Componentes"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        okText="Confirmar Seleção"
        cancelText="Cancelar"
      >
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            rowSelection={{
              type: "checkbox",
              onChange: handleComponentSelection,
            }}
            dataSource={components}
            columns={componentColumns}
            pagination={{
              current: componentPagination.current,
              pageSize: componentPagination.pageSize,
              total: componentPagination.total,
            }}
            rowKey="id"
            onChange={handleTableChange}
          />
        )}
      </Modal>
    </Card>
  );
};

export default AddActivityLaboratorist;
