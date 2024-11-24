import React, { useEffect, useState } from "react";
import {
  Table, Button, message, Tag, Modal, Input, Row, Card, Col, Tooltip} from "antd";
import { Loan } from "../../models/Loan";
import {
  authorizeLoan,
  fetchComponentsLoad,
  listLoans,
  rejectLoan,
  returnLoan,
} from "../../services/LoanService";
import {
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ComponentDetails } from "../../models/ComponentDetails";
import HeaderCardLaboratorist from "../../components/Cards/HeaderCardLaboratorist";
import FilterLaonsLab from "./info/FilterLaonsLab";
interface Filter {
  column: string;
  filterType: string;
  value: string;
}
const statusMapping: { [key: string]: string } = {
  PENDING_AUTHORIZATION: "Pendente de Autorização",
  APPROVED: "Aprovado",
  REJECTED: "Recusado",
  IN_PROGRESS: "Em Andamento",
  RETURNED: "Devolvido",
  OVERDUE: "Atrasado",
};

const ManageLoansLaboratorist: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [authorizedQuantity, setAuthorizedQuantity] = useState<number>(1);
  const [isLoanCardVisible, setLoanCardVisible] = useState<boolean>(true);
  const [loadingLoans, setLoadingLoans] = useState<boolean>(false);
  const [loanComponents, setLoanComponents] = useState<ComponentDetails[]>([]);
  const [isFilteredCardVisible, setFilteredCardVisible] = useState<boolean>(true);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [filteredLoanComponents, setFilteredLoanComponents] = useState<
    ComponentDetails[]
  >([]);
  const [loanFilter, setLoanFilter] = useState<string>("");
  const navigate = useNavigate();
  const [returnModalVisible, setReturnModalVisible] = useState(false);
  const [returnQuantity, setReturnQuantity] = useState<number>(1);
  useEffect(() => {
    loadLoans();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const loadLoans = async () => {
    try {
      setLoading(true);
      const data = await listLoans(page, 10);
      setLoans(data.content);
      setFilteredLoans(data.content);
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Erro ao carregar empréstimos."
      );
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let updatedLoans = [...loans];
    filters.forEach((filter) => {
      updatedLoans = updatedLoans.filter((loan) => {
        const value = loan[filter.column as keyof Loan]?.toString() || "";
        if (filter.filterType === "like") {
          return value.toLowerCase().includes(filter.value.toLowerCase());
        } else if (filter.filterType === "equal") {
          return value === filter.value;
        } else if (filter.filterType === "not_equal") {
          return value !== filter.value;
        }
        return true;
      });
    });
    setFilteredLoans(updatedLoans);
  };

  const handleLoanFilter = (value: string) => {
    setLoanFilter(value);
    const filtered = loanComponents.filter((component) =>
      component.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLoanComponents(filtered);
  };

  useEffect(() => {
    loadLoanComponents();
  }, []);

  const loadLoanComponents = async () => {
    try {
      setLoadingLoans(true);
      const data: ComponentDetails[] = await fetchComponentsLoad();
      setLoanComponents(data);
      setFilteredLoanComponents(data); // Inicializa com todos os dados
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(
          `Erro ao carregar componentes para empréstimos: ${error.message}`
        );
      } else {
        message.error(
          "Erro desconhecido ao carregar componentes para empréstimos."
        );
      }
    } finally {
      setLoadingLoans(false);
    }
  };

  const handleAuthorizeLoan = async () => {
    if (!selectedLoan) return;

    const authorizerEmail = localStorage.getItem("email");
    if (!authorizerEmail) {
      message.error("E-mail do autorizador não encontrado.");
      return;
    }

    try {
      await authorizeLoan({
        loanId: selectedLoan.loanId,
        status: "APPROVED",
        authorizedQuantity,
        authorizerEmail,
      });
      message.success("Empréstimo autorizado com sucesso!");
      setIsModalVisible(false);
      loadLoans();
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Erro ao autorizar empréstimo."
      );
    }
  };

  const handleReturnLoan = async () => {
    if (!selectedLoan) return;

    const borrowerEmail = selectedLoan.borrowerEmail;
    if (!borrowerEmail) {
      message.error("E-mail do solicitante não encontrado.");
      return;
    }

    try {
      await returnLoan({
        loanId: selectedLoan.id,
        returnedQuantity: returnQuantity,
        borrowerEmail,
      });
      message.success("Devolução registrada com sucesso!");
      setReturnModalVisible(false);
      loadLoans();
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Erro ao registrar devolução."
      );
    }
  };
  
  const handleRejectLoan = async (loan: Loan) => {
    const authorizerEmail = localStorage.getItem("email");
    if (!authorizerEmail) {
      message.error("E-mail do autorizador não encontrado.");
      return;
    }
  
    try {
      await rejectLoan({ loanId: loan.id, authorizerEmail });
      message.success("Empréstimo recusado com sucesso!");
      loadLoans(); 
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Erro ao recusar empréstimo."
      );
    }
  };
  
  useEffect(() => {
    loadLoans();
  }, [page]);

  const columns = [
    {
      title: "ID Empréstimo",
      dataIndex: "loanId",
      key: "loanId",
      render: (value: string | null) => value || "Sem valor",
    },
    {
      title: "E-mail Solicitante",
      dataIndex: "borrowerEmail",
      key: "borrowerEmail",
      render: (value: string | null) => value || "Sem valor",
    },
    {
      title: "E-mail Autorizador",
      dataIndex: "authorizerEmail",
      key: "authorizerEmail",
      render: (value: string | null) => value || "Sem valor",
    },
    {
      title: "Componente",
      dataIndex: "componentName",
      key: "componentName",
      render: (value: string | null) => value || "Sem valor",
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      key: "quantity",
      render: (value: number | null) => (value !== null ? value : "Sem valor"),
    },
    {
      title: "Data Empréstimo",
      dataIndex: "loanDate",
      key: "loanDate",
      render: (value: string | null) =>
        value ? new Date(value).toLocaleDateString() : "Sem valor",
    },
    {
      title: "Data Retorno Esperado",
      dataIndex: "expectedReturnDate",
      key: "expectedReturnDate",
      render: (value: string | null) =>
        value ? new Date(value).toLocaleDateString() : "Sem valor",
    },
    {
      title: "Data Retorno Real",
      dataIndex: "actualReturnDate",
      key: "actualReturnDate",
      render: (value: string | null) =>
        value ? new Date(value).toLocaleDateString() : "Sem valor",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag>{statusMapping[status] || "Sem valor"}</Tag>
      ),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: unknown, record: Loan) => (
        <>
          {record.status === "PENDING_AUTHORIZATION" && (
            <Button
              type="primary"
              onClick={() => {
                setSelectedLoan(record);
                setAuthorizedQuantity(record.quantity);
                setIsModalVisible(true);
              }}
            >
              Autorizar
            </Button>
          )}
          {record.status === "PENDING_AUTHORIZATION" && (
            <Button style={{marginLeft:"2px", backgroundColor:"#A31F00", color:"#fff"}}  onClick={() => handleRejectLoan(record)}>
              RECUSAR
            </Button>
          )}
          {record.status === "APPROVED" && (
            <Button
              type="dashed"
              onClick={() => {
                setSelectedLoan(record);
                setReturnQuantity(record.quantity);
                setReturnModalVisible(true);
              }}
            >
              Registrar Devolução
            </Button>
          )}
          
        </>
        
      ),
    },
  ];

  const loanColumns = [
    {
      title: <Tooltip title="Nome do componente">Nome</Tooltip>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <Tooltip title="Descrição detalhada do componente">Descrição</Tooltip>
      ),
      dataIndex: "description",
      key: "description",
    },
    {
      title: (
        <Tooltip title="Quantidade total disponível no estoque">
          Total no Estoque
        </Tooltip>
      ),
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: (
        <Tooltip title="Quantidade atualmente solicitada">Solicitada</Tooltip>
      ),
      dataIndex: "requestedQuantity",
      key: "requestedQuantity",
    },
    {
      title: (
        <Tooltip title="Quantidade emprestado">
          Quantidade emprestado
        </Tooltip>
      ),
      dataIndex: "authorizedQuantity",
      key: "authorizedQuantity",
    },
    {
      title: (
        <Tooltip title="Quantidade disponível para empréstimo">
          Disponível
        </Tooltip>
      ),
      dataIndex: "availableQuantity",
      key: "availableQuantity",
    },
    {
      title: "Ações",
      key: "action",
      render: (_: unknown, record: ComponentDetails) => (
        <>
          <Tooltip title="Visualizar detalhes do componente">
            <Button
              icon={<EyeOutlined />}
              onClick={() =>
                navigate(`/laboratorist/manage-loans/${record.id}`)
              }
              style={{ marginRight: "8px" }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <HeaderCardLaboratorist></HeaderCardLaboratorist>

      <Card style={{ marginBottom: "20px", padding: "10px" }}>
        <Row align="middle" justify="space-between">
          <Col>
            <h3 style={{ margin: 0, textAlign: "left" }}>
              Monitoramento de empestrimos 
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
            <Row
              style={{ marginTop: "10px", marginBottom: "20px" }}
              justify="start"
            >
              <Col>
              <FilterLaonsLab
              onApply={(newFilters) => {
                setFilters(newFilters);
              }}
            />
              </Col>
            </Row>
            <Table
          dataSource={filteredLoans}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            current: page + 1,
            pageSize: 10,
            onChange: (p) => setPage(p - 1),
          }}
        />
          </>
        )}
      </Card>


      <Card style={{ marginBottom: "20px", padding: "10px" }}>
        <Row align="middle" justify="space-between">
          <Col>
            <h3 style={{ margin: 0, textAlign: "left" }}>
              Componentes para Empréstimos - Disponibilidade
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
            <Row
              style={{ marginTop: "10px", marginBottom: "20px" }}
              justify="start"
            >
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

      <Modal
        title="Autorizar Empréstimo"
        visible={isModalVisible}
        onOk={handleAuthorizeLoan}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Quantidade Solicitada: {selectedLoan?.quantity}</p>
        <Input
          type="number"
          min={1}
          max={selectedLoan?.quantity}
          value={authorizedQuantity}
          onChange={(e) => setAuthorizedQuantity(Number(e.target.value))}
        />
      </Modal>
      <Modal
        title="Registrar Devolução"
        visible={returnModalVisible}
        onOk={handleReturnLoan}
        onCancel={() => setReturnModalVisible(false)}
      >
        <p>Quantidade Emprestada: {selectedLoan?.quantity}</p>
        <Input
          type="number"
          min={1}
          max={selectedLoan?.quantity}
          value={returnQuantity}
          onChange={(e) => setReturnQuantity(Number(e.target.value))}
        />
      </Modal>
    </>
  );
};

export default ManageLoansLaboratorist;
