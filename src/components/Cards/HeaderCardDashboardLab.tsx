import React from "react";
import { Card, Row, Col } from "antd";
import RoboticImage from "../../assets/img/robotic.png";

const HeaderCardDashboardLab: React.FC = () => {
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
        🚀 Pronto para Organizar o Laboratório?
      </h4>
      <p style={{ margin: "10px 0", textAlign: "left", color: "#0a9396" }}>
        Este é o seu centro de controle! Aqui você pode visualizar o progresso
        das atividades, os empréstimos realizados e a atividade no fórum. Tudo para
        deixar o laboratório funcionando perfeitamente!
      </p>
      <p style={{ margin: 0, textAlign: "left", fontWeight: "bold", color: "#94d2bd" }}>
        Continue o ótimo trabalho! 💡
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

export default HeaderCardDashboardLab;
