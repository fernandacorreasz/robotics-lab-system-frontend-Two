import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Row, Col } from 'antd';

interface User {
  id: string;
  name: string;
  email: string;
  permissionLevel: string; // Ex: "Laboratorista", "Estudante"
  status: string; // Ex: "Ativo", "Inativo"
}

const ManageUsersLaboratorist: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    // Simulando dados que viriam da API
    const fetchedUsers: User[] = [
      { id: '1', name: 'Usuário 1', email: 'usuario1@example.com', permissionLevel: 'Laboratorista', status: 'Ativo' },
      { id: '2', name: 'Usuário 2', email: 'usuario2@example.com', permissionLevel: 'Estudante', status: 'Ativo' },
      { id: '3', name: 'Usuário 3', email: 'usuario3@example.com', permissionLevel: 'Laboratorista', status: 'Inativo' },
      // Adicione mais usuários conforme necessário
    ];
    setUsers(fetchedUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filterText.toLowerCase()) ||
    user.email.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Nível de Permissão',
      dataIndex: 'permissionLevel',
      key: 'permissionLevel',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any) => (
        <>
          <Button type="link">Editar</Button>
          <Button type="link" style={{ color: 'red' }}>Remover</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={18}>
          <Input
            placeholder="Filtrar Usuários"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Button type="primary" style={{ backgroundColor: '#add8e6', color: '#000' }}>
            Adicionar Usuário
          </Button>
        </Col>
      </Row>

      <Table 
        dataSource={filteredUsers} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 10 }} 
      />
    </div>
  );
};

export default ManageUsersLaboratorist;
