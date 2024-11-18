import React, { useEffect, useState } from 'react';
import { List, Card } from 'antd';

interface Notification {
  id: string;
  message: string;
  date: string;
}

const NotificationsLaboratorist: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulando dados que viriam da API
    const fetchedNotifications: Notification[] = [
      {
        id: '1',
        message: 'O empréstimo do Arduino Uno está pendente.',
        date: '2024-01-10',
      },
      {
        id: '2',
        message: 'Raspberry Pi foi devolvido.',
        date: '2024-01-12',
      },
      {
        id: '3',
        message: 'Novos sensores foram adicionados ao estoque.',
        date: '2024-01-15',
      },
      {
        id: '4',
        message: 'A quantidade do componente X está baixa.',
        date: '2024-01-16',
      },
      {
        id: '5',
        message: 'Atualização no status do componente Y.',
        date: '2024-01-17',
      },
    ];
    setNotifications(fetchedNotifications);
  }, []);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={notification => (
          <List.Item>
            <Card style={{ width: '100%', marginBottom: '10px' }}>
              <p>{notification.message}</p>
              <p style={{ fontSize: 'small', color: 'gray' }}>{notification.date}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationsLaboratorist;
