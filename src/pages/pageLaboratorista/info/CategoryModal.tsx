// CreateCategoryModal.tsx
import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { createCategory } from '../../../services/ComponentService';

const CreateCategoryModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCreateCategory = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await createCategory(values.categoryName);
      message.success('Categoria criada com sucesso!');
      onClose();
      form.resetFields();
    } catch {
      message.error('Erro ao criar categoria.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Criar Categoria"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancelar</Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleCreateCategory}>Criar</Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nome da Categoria"
          name="categoryName"
          rules={[{ required: true, message: 'Por favor, insira o nome da categoria.' }]}
        >
          <Input placeholder="Digite o nome da categoria" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCategoryModal;
