import React from "react";
import { Card, Row, Col } from "antd";
import RoboticImage from "../../assets/img/robotic.png";

const HeaderCardDashboard: React.FC = () => {
  return (
<Card
  style={{
    marginBottom: "20px",
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f0f9ff",
  }}
>
  <Row align="middle" justify="start">
    <Col span={18}>
      <h4 style={{ color: "#005f73", margin: 0, textAlign: "left" }}>
        🌟 Vamos Descobrir Seus Sucessos!
      </h4>
      <p style={{ margin: "10px 0", textAlign: "left", color: "#0a9396" }}>
        Este é o seu portal para brilhar! Veja como você está se saindo em suas
        atividades e contribuições no fórum. Aqui, cada esforço é celebrado e cada progresso importa.
      </p>
      <p style={{ margin: 0, textAlign: "left", fontWeight: "bold", color: "#94d2bd" }}>
        Continue brilhando! 🌈
      </p>
    </Col>
    <Col span={6}>
      <img
        src={RoboticImage}
        alt="Robô Animado"
        style={{
          width: "80px",
          display: "block",
          marginLeft: "auto",
        }}
      />
    </Col>
  </Row>
</Card>

  );
};

export default HeaderCardDashboard;
