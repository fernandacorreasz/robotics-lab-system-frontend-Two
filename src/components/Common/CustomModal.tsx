import { Modal } from 'antd';
import React from 'react';

interface Props {
  title: string;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<Props> = ({ title, visible, onOk, onCancel, children }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
