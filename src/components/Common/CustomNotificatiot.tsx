import React from 'react';
import { notification } from 'antd';

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  description?: string | JSX.Element;
}

const NotificationComponent: React.FC<NotificationProps> = ({ type, message, description }) => {
  const openNotification = () => {
    notification[type]({
      message: message,
      description: description,
      duration: 3,
    });
  };

  return (
    <button onClick={openNotification} style={{ display: 'none' }}></button>
  );
};

export default NotificationComponent;
