import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, message, Pagination } from 'antd';
import { fetchUsers, registerUser } from '../../services/UserService';
import { User } from '../../models/User';

const { Option } = Select;

const ManageUsersAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers();
  }, [page, pageSize]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers(page, pageSize);
      setUsers(data.content);
      setTotalElements(data.totalElements);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  };

  const showAddUserModal = () => {
    setIsModalVisible(true);
  };

  const handleAddUser = async (values: any) => {
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        roles: [values.role],
      });
      message.success('Usuário registrado com sucesso');
      setIsModalVisible(false);
      loadUsers();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Erro ao registrar usuário');
    }
  };

  const handlePageChange = (pageNumber: number, pageSize: number) => {
    setPage(pageNumber - 1);
    setPageSize(pageSize);
  };

  const columns = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Telefone', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Endereço', dataIndex: 'address', key: 'address' },
    { title: 'Roles', dataIndex: 'roles', key: 'roles', render: (roles: string[]) => roles.join(', ') },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <Card title="Ações" style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={showAddUserModal}>
          Criar Usuário
        </Button>
      </Card>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="email"
        loading={loading}
        pagination={false}
      />

      <Pagination
        current={page + 1}
        pageSize={pageSize}
        total={totalElements}
        onChange={handlePageChange}
        style={{ marginTop: '16px', textAlign: 'right' }}
      />

      <Modal
        title="Registrar Usuário"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddUser}>
          <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Insira o nome' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Insira o email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Senha" rules={[{ required: true, message: 'Insira a senha' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="Função" rules={[{ required: true, message: 'Selecione a função' }]}>
            <Select placeholder="Selecione a função">
              <Option value="ADMIN">Administrador</Option>
              <Option value="LABORATORIST">Laboratorista</Option>
              <Option value="STUDENT">Estudante</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Registrar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUsersAdmin;