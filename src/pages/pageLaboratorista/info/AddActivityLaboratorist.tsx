import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, DatePicker, Upload, Select, message, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { createActivity } from "../../../services/ActivityService";
import { UploadChangeParam } from "antd/lib/upload/interface";

const { Option } = Select;

interface FormValues {
  activityTitle: string;
  activityDescription: string;
  activityStatus: string;
  timeSpent: number;
  startDate: moment.Moment;
  endDate?: moment.Moment;
}

const AddActivityLaboratorist: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  const handleAdd = async (values: FormValues) => {
    try {
      // Montar os dados da atividade
      const activityData = {
        activityTitle: values.activityTitle,
        activityDescription: values.activityDescription,
        activityStatus: values.activityStatus,
        timeSpent: values.timeSpent * 60,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate ? values.endDate.toISOString() : undefined,
        user: {
          id: localStorage.getItem("userId") || "",
        },
      };

      // Criar FormData e anexar os dados e o arquivo
      const formData = new FormData();
      formData.append("activity", JSON.stringify(activityData));
      if (file) {
        formData.append("files", file);
      }

      // Enviar para o backend
      await createActivity(formData);
      message.success("Atividade criada com sucesso!");
      navigate("/laboratorist/activities"); // Redirecionar para a lista de atividades
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || "Erro ao criar atividade. Tente novamente.");
      } else {
        message.error("Erro desconhecido ao criar atividade.");
      }
    }
  };

  const handleFileChange = (info: UploadChangeParam<UploadFile<unknown>>) => {
    const uploadedFile = info.file.originFileObj as File;
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

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
        <Form.Item name="endDate" label="Data de Término (Opcional)">
          <DatePicker showTime placeholder="Selecione a data e horário de término (se aplicável)" />
          <p style={{ fontSize: "12px", color: "gray", marginTop: "4px" }}>
            Deixe em branco se a atividade não possuir data de término definida.
          </p>
        </Form.Item>
        <Form.Item label="Imagem (Opcional)">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            maxCount={1}
            accept="image/png, image/jpeg"
          >
            <Button icon={<UploadOutlined />}>Selecionar Imagem</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Adicionar Atividade
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddActivityLaboratorist;
