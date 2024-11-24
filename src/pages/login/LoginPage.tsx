import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginData, loginUser } from "../../services/LoginService";
import logo from "../../assets/logo.png";
import illustration from "../../assets/il.png";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginData) => {
    setLoading(true);
    try {
      localStorage.setItem("email", values.email);

      const response = await loginUser(values);
      message.success("Login realizado com sucesso");
      if (response.permissionLevel === 3) {
        navigate("/admin/manage-users");
      } else if (response.permissionLevel === 2) {
        navigate("/laboratorist/manage-activities");
      } else if (response.permissionLevel === 1) {
        navigate("/student/activities");
      } else {
        navigate("/unauthorized");
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || "Erro ao realizar login. Por favor, tente novamente.");
      } else {
        message.error("Erro desconhecido ao realizar login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row style={{ height: "100vh" }}>
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={logo} alt="Logo" style={{ width: "150px" }} />
          </div>
          <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ width: "100%" }}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Por favor, insira seu email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
            >
              <Input.Password placeholder="Senha" />
            </Form.Item>

            <div style={{ marginBottom: "10px", fontSize: "14px" }}>
              <a href="/forgot-password" style={{ color: "#4B0082" }}>
                Esqueceu sua senha? Clique aqui
              </a>
            </div>
            <div style={{ marginBottom: "20px", fontSize: "14px" }}>
              <a href="/register" style={{ color: "#4B0082" }}>
                Não tem uma conta? Clique aqui para Cadastrar
              </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  width: "100%",
                  backgroundColor: "#4B0082",
                  borderColor: "#4B0082",
                }}
              >
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>

      <Col
        xs={0}
        md={12}
        style={{
          backgroundColor: "#4B0082",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={illustration}
          alt="Ilustração"
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
            objectFit: "contain",
          }}
        />
      </Col>
    </Row>
  );
};

export default LoginPage;
