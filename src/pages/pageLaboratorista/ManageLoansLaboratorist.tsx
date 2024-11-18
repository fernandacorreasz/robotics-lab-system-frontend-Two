import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Row, Col, Select } from 'antd';

interface Loan {
  id: string;
  componentName: string;
  userName: string;
  loanDate: string; // Data de empréstimo
  returnDate: string; // Data de devolução
  status: string; // Pendente, Devolvido, etc.
}

const { Option } = Select;

const ManageLoansLaboratorist: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Simulando dados que viriam da API
    const fetchedLoans: Loan[] = [
      {
        id: '1',
        componentName: 'Arduino Uno',
        userName: 'Usuário 1',
        loanDate: '2024-01-01',
        returnDate: '2024-01-10',
        status: 'Pendente',
      },
      {
        id: '2',
        componentName: 'Raspberry Pi',
        userName: 'Usuário 2',
        loanDate: '2024-01-05',
        returnDate: '2024-01-12',
        status: 'Devolvido',
      },
      {
        id: '3',
        componentName: 'Sensor de Movimento',
        userName: 'Usuário 3',
        loanDate: '2024-01-03',
        returnDate: '2024-01-11',
        status: 'Pendente',
      },

    ];
    setLoans(fetchedLoans);
  }, []);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  const filteredLoans = loans.filter(loan => {
    const matchesText = loan.componentName.toLowerCase().includes(filterText.toLowerCase()) ||
                        loan.userName.toLowerCase().includes(filterText.toLowerCase());

    const matchesStatus = statusFilter ? loan.status === statusFilter : true;

    return matchesText && matchesStatus;
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome do Componente',
      dataIndex: 'componentName',
      key: 'componentName',
    },
    {
      title: 'Nome do Usuário',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Data de Empréstimo',
      dataIndex: 'loanDate',
      key: 'loanDate',
    },
    {
      title: 'Data de Devolução',
      dataIndex: 'returnDate',
      key: 'returnDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Input
            placeholder="Filtrar Empréstimos"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Select
            placeholder="Filtrar por Status"
            value={statusFilter}
            onChange={handleStatusChange}
            style={{ width: '100%' }}
          >
            <Option value="">Todos</Option>
            <Option value="Pendente">Atrasados</Option>
            <Option value="Devolvido">Já Entregues</Option>
          </Select>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Button type="primary" style={{ backgroundColor: '#add8e6', color: '#000' }}>
            Adicionar Empréstimo
          </Button>
        </Col>
      </Row>

      <Table 
        dataSource={filteredLoans} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 10 }} 
      />
    </div>
  );
};

export default ManageLoansLaboratorist;
