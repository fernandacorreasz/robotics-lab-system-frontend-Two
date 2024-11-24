import React from "react";
import { Card, Row, Col } from "antd";
import RoboticImage from "../../assets/img/robotic.png";

const HeaderCardLaboratorist: React.FC = () => {
  return (
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
          Bem-vindo ao módulo de gerenciamento de empréstimos!
        </h4>
        <p style={{ margin: 0, textAlign: "left" }}>
          Olá, Laboratorista! Aqui você encontrará  as ferramentas necessárias para
          monitorar, aprovar ou rejeitar solicitações de empréstimos. <br />
          <br />
          Explore a lista de solicitações em aberto, acompanhe o status dos
          componentes e tome ações rápidas e precisas para garantir o melhor uso
          dos recursos do laboratório. <br />
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
  
  );
};

export default HeaderCardLaboratorist;
