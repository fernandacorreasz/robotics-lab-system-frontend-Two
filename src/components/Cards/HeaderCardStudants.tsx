import React from "react";
import { Card, Row, Col } from "antd";
import RoboticImage from "../../assets/img/robotic.png";

const HeaderCard: React.FC = () => {
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
            Vamos Conferir Suas Proezas no Laboratório!
          </h4>
          <p style={{ margin: 0, textAlign: "left" }}>
            Bem-vindo à sua Central de Atividades, onde toda a magia
            acontece! Aqui, você pode acompanhar todas as atividades que
            você tem realizado dentro do laboratório.
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

export default HeaderCard;
