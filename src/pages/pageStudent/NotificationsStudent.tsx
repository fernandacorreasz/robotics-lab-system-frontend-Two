import { Card, Col, Row, List, Button } from 'antd';
import React, { useState } from 'react';

const NotificationsStudent: React.FC = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Devolução atrasada de componente", read: false },
    { id: 2, message: "Sua pergunta no fórum recebeu um comentário", read: false },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div>
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
            <h4 style={{ color: "#8e44ad", margin: 0, textAlign: "left" }}>
              Fique atento às suas notificações
            </h4>
            <p style={{ margin: 0, textAlign: "left" }}>
              Aqui você terá as notificações sobre suas atividades e atrasos de empréstimos, respostas de fórum e muito mais.
            </p>
          </Col>
        </Row>
      </Card>

      <List
        dataSource={notifications}
        renderItem={notification => (
          <List.Item
            style={{
              backgroundColor: notification.read ? "#f0f0f0" : "#fff",
              borderRadius: "8px",
              marginBottom: "10px",
              padding: "12px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row style={{ width: "100%" }}>
              <Col span={20}>
                <span style={{ color: notification.read ? "#999" : "#333" }}>
                  {notification.message}
                </span>
              </Col>
              <Col span={4} style={{ textAlign: "right" }}>
                {!notification.read && (
                  <Button type="link" onClick={() => markAsRead(notification.id)}>
                    Marcar como lida
                  </Button>
                )}
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationsStudent;
