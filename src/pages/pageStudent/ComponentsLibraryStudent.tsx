import React, { useEffect, useState } from "react";
import { Table, Button, message, Card, Row, Col, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import RequestLoanModal from "./loan/RequestLoanModal";
import { useNavigate } from "react-router-dom";

import RoboticImage from "../../assets/img/robotic.png";
import { fetchComponentsLoad } from "../../services/LoanService";

interface ComponentDetails {
  id: string;
  name: string;
  serialNumber: string;
  description: string;
  totalQuantity: number;
  requestedQuantity: number;
  authorizedQuantity: number;
  borrowedQuantity: number;
  availableQuantity: number;
}

const ComponentsLibraryStudent: React.FC = () => {
  const [components, setComponents] = useState<ComponentDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadComponents = async () => {
      try {
        setLoading(true);
        const data: ComponentDetails[] = await fetchComponentsLoad();
        setComponents(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Erro inesperado ao carregar componentes";
        message.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadComponents();
  }, []);

  const columns = [
    { title: "Nome do Componente", dataIndex: "name", key: "name" },
    { title: "Descrição", dataIndex: "description", key: "description" },
    { title: "Quantidade Total no Estoque", dataIndex: "totalQuantity", key: "totalQuantity" },
    { title: "Quantidade Solicitada", dataIndex: "requestedQuantity", key: "requestedQuantity" },
    { title: "Quantidade Autorizada", dataIndex: "authorizedQuantity", key: "authorizedQuantity" },
    { title: "Quantidade Emprestada", dataIndex: "borrowedQuantity", key: "borrowedQuantity" },
    { title: "Quantidade Disponível", dataIndex: "availableQuantity", key: "availableQuantity" },
    {
      title: "Ações",
      key: "action",
      render: (_: unknown, record: ComponentDetails) => (
        <>
          <Tooltip title="Visualizar detalhes do componente">
            <Button
              icon={<EyeOutlined />}
              onClick={() => navigate(`/student/components-library/${record.id}`)}
              style={{ marginRight: "8px" }}
            />
          </Tooltip>
          <Button
            type="primary"
            onClick={() => setSelectedComponent(record.name)}
            disabled={record.availableQuantity <= 0}
          >
            Solicitar Empréstimo
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
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
              Bem-vindo à Biblioteca de Componentes
            </h4>
            <p style={{ margin: 0, textAlign: "left" }}>
              Aqui você pode verificar os componentes disponíveis em nosso
              laboratório para uso. Explore a lista de itens, solicite
              empréstimos e acesse tutoriais e dicas para aproveitar ao máximo
              nossos recursos no lab.
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

      <Table
        dataSource={components}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
      {selectedComponent && (
        <RequestLoanModal
          visible={!!selectedComponent}
          onClose={() => setSelectedComponent(null)}
          componentName={selectedComponent}
        />
      )}
    </>
  );
};

export default ComponentsLibraryStudent;
