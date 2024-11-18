import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginData, loginUser } from '../../services/LoginService';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginData) => {
    setLoading(true);
    try {
      const response = await loginUser(values);

      message.success('Login realizado com sucesso');
      
      // Redirecionar com base no nível de permissão
      if (response.permissionLevel === 3) {
        navigate('/admin');
      } else if (response.permissionLevel === 2) {
        navigate('/laboratorist');
      } else if (response.permissionLevel === 1) {
        navigate('/student');
      } else {
        navigate('/unauthorized');
      }
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message || 'Erro desconhecido');
        } else {
          throw new Error('Ocorreu um erro inesperado');
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '40px' }}>
      <h2>Login</h2>
      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password placeholder="Senha" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
