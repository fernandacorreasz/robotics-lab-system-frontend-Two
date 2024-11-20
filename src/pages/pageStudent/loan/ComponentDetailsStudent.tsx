import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Collapse, message, Spin } from "antd";
import { fetchComponentDetails } from "../../../services/LoanService";

const { Panel } = Collapse;

interface ComponentDetail {
  id: string;
  name: string;
  serialNumber: string;
  description: string;
  quantity: number;
  subCategoryName: string;
  categoryName: string;
}

const ComponentDetailsStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [component, setComponent] = useState<ComponentDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchComponentDetails(id!);
        setComponent(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        message.error("Erro ao carregar os detalhes do componente.");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!component) {
    return <p>Detalhes não disponíveis.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Descriptions title="Detalhes do Componente" bordered>
        <Descriptions.Item label="Nome">{component.name}</Descriptions.Item>
        <Descriptions.Item label="Serial">{component.serialNumber}</Descriptions.Item>
        <Descriptions.Item label="Descrição">{component.description}</Descriptions.Item>
        <Descriptions.Item label="Quantidade">{component.quantity}</Descriptions.Item>
        <Descriptions.Item label="Subcategoria">{component.subCategoryName}</Descriptions.Item>
        <Descriptions.Item label="Categoria">{component.categoryName}</Descriptions.Item>
      </Descriptions>

      <Collapse defaultActiveKey={["1"]} style={{ marginTop: "20px" }}>
        <Panel header="Tutorial de Uso" key="1">
          <p>Aqui ficará um link para um vídeo do YouTube ou um guia de uso detalhado.</p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ComponentDetailsStudent;
