import React, { useState } from 'react';
import { Table, Button, Tag, Space, Modal, message, Tooltip, Input, Dropdown, Menu } from 'antd';
import { InfoCircleOutlined, DownOutlined } from '@ant-design/icons';

const { Search } = Input;

// Dados mockados para os certificados
const mockCertificates = [
  {
    key: '1',
    userEmail: 'usuario1@gmail.com',
    userName: 'João Silva',
    activityTime: '10 horas',
    activityTitle: 'Experimento de Química',
    activityDescription: 'Experimento sobre reações químicas.',
    activityPeriod: '01/01/2024 - 05/01/2024',
    approvedBy: 'Carlos Souza',
    status: 'Aprovado',
    certificateGenerated: true,
  },
  {
    key: '2',
    userEmail: 'usuario2@gmail.com',
    userName: 'Maria Fernandes',
    activityTime: '15 horas',
    activityTitle: 'Laboratório de Física',
    activityDescription: 'Prática de circuitos elétricos.',
    activityPeriod: '10/01/2024 - 15/01/2024',
    approvedBy: '',
    status: 'Pendente',
    certificateGenerated: false,
  },
];

const CertificatesAdmin: React.FC = () => {
  const [certificates, setCertificates] = useState(mockCertificates);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const showModal = (record: any) => {
    setSelectedCertificate(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCertificate(null);
  };

  const handleDecision = (decision: string) => {
    if (!selectedCertificate) return;

    setCertificates(prevState =>
      prevState.map(cert =>
        cert.key === selectedCertificate.key
          ? {
              ...cert,
              status: decision === 'Aprovar' ? 'Aprovado' : 'Não Aprovado',
              approvedBy: 'Admin',
              certificateGenerated: decision === 'Aprovar',
            }
          : cert
      )
    );

    message.success(`Certificado ${decision === 'Aprovar' ? 'aprovado' : 'não aprovado'} com sucesso.`);
    handleModalClose();
  };

  const handleGenerateReport = (status: string) => {
    message.info(`Gerando relatório de certificados ${status === 'Aprovado' ? 'aprovados' : 'não aprovados'}...`);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredCertificates = certificates.filter(cert =>
    cert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.activityTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Email do Usuário',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: 'Nome do Usuário',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Tempo de Atividade',
      dataIndex: 'activityTime',
      key: 'activityTime',
    },
    {
      title: 'Título da Atividade',
      dataIndex: 'activityTitle',
      key: 'activityTitle',
    },
    {
      title: 'Descrição da Atividade',
      dataIndex: 'activityDescription',
      key: 'activityDescription',
    },
    {
      title: 'Período da Atividade',
      dataIndex: 'activityPeriod',
      key: 'activityPeriod',
    },
    {
      title: 'Laboratorista Aprovador',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
      render: (text: string) => (text ? text : <Tag color="orange">Pendente</Tag>),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Aprovado' ? 'green' : status === 'Não Aprovado' ? 'red' : 'gold';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Certificado',
      dataIndex: 'certificateGenerated',
      key: 'certificateGenerated',
      render: (generated: boolean) =>
        generated ? <Tag color="blue">Gerado</Tag> : <Tag color="volcano">Não Gerado</Tag>,
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Clique aqui para validar horas e gerar certificados">
            <Button
              type="primary"
              icon={<InfoCircleOutlined />}
              onClick={() => showModal(record)}
              disabled={record.status !== 'Pendente'}
            >
              Validar Solicitação
            </Button>
          </Tooltip>
          <Button
            type="primary"
            onClick={() => handleGenerateReport(record.status)}
            disabled={!record.certificateGenerated}
          >
            Visualizar Certificado
          </Button>
        </Space>
      ),
    },
  ];

  const menu = (
    <Menu onClick={(e) => handleGenerateReport(e.key)}>
      <Menu.Item key="Aprovado">Relatório de Aprovados</Menu.Item>
      <Menu.Item key="Não Aprovado">Relatório de Não Aprovados</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <h2>Certificados - Admin</h2>

      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Pesquisar usuário ou atividade"
          onSearch={handleSearch}
          enterButton
        />
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="primary">
            Gerar Relatório <DownOutlined />
          </Button>
        </Dropdown>
      </Space>

      <Table columns={columns} dataSource={filteredCertificates} rowKey="key" />

      <Modal
        title="Detalhes da Solicitação"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="reject" onClick={() => handleDecision('Recusar')}>
            Recusar Solicitação
          </Button>,
          <Button key="approve" type="primary" onClick={() => handleDecision('Aprovar')}>
            Aprovar e Gerar Certificado
          </Button>,
        ]}
      >
        {selectedCertificate && (
          <div>
            <p><strong>Email do Usuário:</strong> {selectedCertificate.userEmail}</p>
            <p><strong>Nome do Usuário:</strong> {selectedCertificate.userName}</p>
            <p><strong>Tempo de Atividade:</strong> {selectedCertificate.activityTime}</p>
            <p><strong>Título da Atividade:</strong> {selectedCertificate.activityTitle}</p>
            <p><strong>Descrição da Atividade:</strong> {selectedCertificate.activityDescription}</p>
            <p><strong>Período da Atividade:</strong> {selectedCertificate.activityPeriod}</p>
            <p><strong>Status:</strong> {selectedCertificate.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CertificatesAdmin;
