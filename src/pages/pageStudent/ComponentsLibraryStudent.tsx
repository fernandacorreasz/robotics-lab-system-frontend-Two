import React, { useEffect, useState } from "react";
import { Table, Button, message, Card, Row, Col, Tooltip, Input } from "antd";
import { EyeOutlined, DownOutlined, UpOutlined, SearchOutlined } from "@ant-design/icons";
import RequestLoanModal from "./loan/RequestLoanModal";
import { useNavigate } from "react-router-dom";
import RoboticImage from "../../assets/img/robotic.png";
import { fetchComponents, filterComponents } from "../../services/ComponentService";
import { fetchComponentsLoad } from "../../services/LoanService";
import FilterComponent from "../pageLaboratorista/info/FilterComponent";

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

interface ComponentList {
  id: string;
  name: string;
  serialNumber: string;
  description: string;
  quantity: number;
  subCategoryName: string;
  categoryName: string;
}

interface Filter {
  column: string;
  filterType: string;
  value: string;
}

const ComponentsLibraryStudent: React.FC = () => {
  const [filteredComponents, setFilteredComponents] = useState<ComponentList[]>([]);
  const [loanComponents, setLoanComponents] = useState<ComponentDetails[]>([]);
  const [filteredLoanComponents, setFilteredLoanComponents] = useState<ComponentDetails[]>([]);
  const [loadingFiltered, setLoadingFiltered] = useState<boolean>(false);
  const [loadingLoans, setLoadingLoans] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isFilteredCardVisible, setFilteredCardVisible] = useState<boolean>(true);
  const [isLoanCardVisible, setLoanCardVisible] = useState<boolean>(true);
  const [loanFilter, setLoanFilter] = useState<string>("");
  const navigate = useNavigate();

  // Carrega os componentes filtrados para a primeira tabela
  const loadFilteredComponents = async (filters: Filter[] = [], page = 0, size = 10) => {
    try {
      setLoadingFiltered(true);
      const data = filters.length > 0 ? await filterComponents(filters, page, size) : await fetchComponents(page, size);
      setFilteredComponents(data.content);
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(`Erro ao carregar a lista de componentes: ${error.message}`);
      } else {
        message.error("Erro desconhecido ao carregar a lista de componentes.");
      }
    } finally {
      setLoadingFiltered(false);
    }
  };

  // Carrega os componentes para empréstimos para a segunda tabela
  const loadLoanComponents = async () => {
    try {
      setLoadingLoans(true);
      const data: ComponentDetails[] = await fetchComponentsLoad();
      setLoanComponents(data);
      setFilteredLoanComponents(data); // Inicializa com todos os dados
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(`Erro ao carregar componentes para empréstimos: ${error.message}`);
      } else {
        message.error("Erro desconhecido ao carregar componentes para empréstimos.");
      }
    } finally {
      setLoadingLoans(false);
    }
  };

  useEffect(() => {
    loadFilteredComponents();
    loadLoanComponents();
  }, []);

  // Atualiza os componentes filtrados na segunda tabela
  const handleLoanFilter = (value: string) => {
    setLoanFilter(value);
    const filtered = loanComponents.filter((component) =>
      component.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLoanComponents(filtered);
  };

  // Colunas para a primeira tabela
  const filteredColumns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Número de Série", dataIndex: "serialNumber", key: "serialNumber" },
    { title: "Descrição", dataIndex: "description", key: "description" },
    { title: "Quantidade", dataIndex: "quantity", key: "quantity" },
    { title: "Subcategoria", dataIndex: "subCategoryName", key: "subCategoryName" },
    { title: "Categoria", dataIndex: "categoryName", key: "categoryName" },
    {
      title: "Ações",
      key: "actions",
      render: (_: unknown, record: ComponentList) => (
        <Tooltip title="Visualizar detalhes do componente">
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/student/components-library/${record.id}`)}
          />
        </Tooltip>
      ),
    },
  ];

  // Colunas para a segunda tabela
  const loanColumns = [
    { title: <Tooltip title="Nome do componente">Nome</Tooltip>, dataIndex: "name", key: "name" },
    { title: <Tooltip title="Descrição detalhada do componente">Descrição</Tooltip>, dataIndex: "description", key: "description" },
    { title: <Tooltip title="Quantidade total disponível no estoque">Total no Estoque</Tooltip>, dataIndex: "totalQuantity", key: "totalQuantity" },
    { title: <Tooltip title="Quantidade atualmente solicitada">Solicitada</Tooltip>, dataIndex: "requestedQuantity", key: "requestedQuantity" },
    { title: <Tooltip title="Quantidade autorizada para empréstimo">Autorizada</Tooltip>, dataIndex: "authorizedQuantity", key: "authorizedQuantity" },
    { title: <Tooltip title="Quantidade emprestada no momento">Emprestada</Tooltip>, dataIndex: "borrowedQuantity", key: "borrowedQuantity" },
    { title: <Tooltip title="Quantidade disponível para empréstimo">Disponível</Tooltip>, dataIndex: "availableQuantity", key: "availableQuantity" },
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
          <Tooltip title="Solicitar empréstimo deste componente">
            <Button
              type="primary"
              onClick={() => setSelectedComponent(record.name)}
              disabled={record.availableQuantity <= 0}
            >
              Solicitar Empréstimo
            </Button>
          </Tooltip>
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
        Bem-vindo à Biblioteca de Componentes!
      </h4>
      <p style={{ margin: 0, textAlign: "left" }}>
        Olá, aluno! Este é o módulo de biblioteca de componentes do nosso laboratório. 
        <br /> Aqui você pode explorar todos os recursos que temos a oferecer. 
        <br />Consulte a disponibilidade de componentes, solicite empréstimos para seus projetos, 
        <br /> visualize descrições detalhadas e em breve  acesse tutoriais que te ajudarão a usar cada item da melhor forma possível.
        <br />
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

<Card
  style={{ marginBottom: "20px", padding: "10px" }}
>
  <Row align="middle" justify="space-between">
    <Col>
      <h3 style={{ margin: 0, textAlign: "left" }}>
        Lista de Componentes
      </h3>
    </Col>
    <Col>
      <Button
        type="link"
        icon={isFilteredCardVisible ? <UpOutlined /> : <DownOutlined />}
        onClick={() => setFilteredCardVisible(!isFilteredCardVisible)}
      />
    </Col>
  </Row>
  {isFilteredCardVisible && (
    <>
      <Row style={{ marginTop: "10px", marginBottom: "20px" }} justify="start">
        <Col>
          <FilterComponent onApply={(filters) => loadFilteredComponents(filters)} />
        </Col>
      </Row>
      <Table
        dataSource={filteredComponents}
        columns={filteredColumns}
        loading={loadingFiltered}
        rowKey="id"
      />
    </>
  )}
</Card>
<Card
  style={{ marginBottom: "20px", padding: "10px" }}
>
  <Row align="middle" justify="space-between">
    <Col>
      <h3 style={{ margin: 0,  textAlign: "left" }}>
        Componentes para Empréstimos
      </h3>
    </Col>
    <Col>
      <Button
        type="link"
        icon={isLoanCardVisible ? <UpOutlined /> : <DownOutlined />}
        onClick={() => setLoanCardVisible(!isLoanCardVisible)}
      />
    </Col>
  </Row>
  {isLoanCardVisible && (
    <>
      <Row style={{ marginTop: "10px", marginBottom: "20px" }} justify="start">
        <Col>
          <Input
            placeholder="Filtrar por nome..."
            prefix={<SearchOutlined />}
            style={{ marginBottom: "10px", width: "300px" }}
            value={loanFilter}
            onChange={(e) => handleLoanFilter(e.target.value)}
          />
        </Col>
      </Row>
      <Table
        dataSource={filteredLoanComponents}
        columns={loanColumns}
        loading={loadingLoans}
        rowKey="id"
      />
    </>
  )}
</Card>


      {/* Modal para Solicitar Empréstimo */}
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
