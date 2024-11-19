import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, DatePicker, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

import { createActivity } from "../../../services/ActivityService";
import moment from "moment";

const { Option } = Select;

interface FormValues {
  activityTitle: string;
  activityDescription: string;
  activityStatus: string;
  timeSpent: number;
  startDate: moment.Moment;
  endDate: moment.Moment;
}

const AddActivity: React.FC = () => {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      message.error( "Erro ao criar atividade. Tente novamente.");
    }
  };

  const handleFileChange = (info: UploadChangeParam<UploadFile<unknown>>) => {
    const uploadedFile = info.file.originFileObj as File;
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  return (
    <Card title="Adicionar Nova Atividade">
      <Form form={form} layout="vertical" onFinish={handleAdd}>
        <Form.Item name="activityTitle" label="Título" rules={[{ required: true, message: "Insira o título" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="activityDescription" label="Descrição" rules={[{ required: true, message: "Insira a descrição" }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="activityStatus" label="Status" rules={[{ required: true, message: "Selecione o status" }]}>
          <Select>
            <Option value="NOT_STARTED">Não Iniciado</Option>
            <Option value="IN_PROGRESS">Em Progresso</Option>
            <Option value="COMPLETED">Concluído</Option>
            <Option value="CANCELED">Cancelado</Option>
          </Select>
        </Form.Item>
        <Form.Item name="timeSpent" label="Tempo Gasto (em horas)" rules={[{ required: true, message: "Insira o tempo gasto" }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="startDate" label="Data de Início" rules={[{ required: true, message: "Selecione a data de início" }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="endDate" label="Data de Término" rules={[{ required: true, message: "Selecione a data de término" }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item label="Imagem (Opcional)">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Selecionar Imagem</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Adicionar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddActivity;
