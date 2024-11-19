import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Table, Button, message } from 'antd';
import { fetchCategoriesWithSubcategories, createSubCategory } from '../../../services/ComponentService';
import { Category } from '../../../models/Category';

const CreateSubCategoryModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoriesWithSubcategories();
        setCategories(data);
      } catch {
        message.error('Erro ao carregar categorias.');
      }
    };

    if (visible) loadCategories();
  }, [visible]);

  const handleCreateSubCategory = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      if (!selectedCategoryId) {
        message.warning('Selecione uma categoria.');
        return;
      }
      await createSubCategory(values.subCategoryName, selectedCategoryId);
      message.success('Subcategoria criada com sucesso!');
      onClose();
      form.resetFields();
    } catch {
      message.error('Erro ao criar subcategoria.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Nome da Categoria',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Quantidade de Subcategorias',
      dataIndex: 'subcategories',
      key: 'subcategories',
      render: (subcategories: Category['subcategories']) => subcategories.length,
    },
  ];

  return (
    <Modal
      title="Criar Subcategoria"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleCreateSubCategory}>
          Criar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nome da Subcategoria"
          name="subCategoryName"
          rules={[{ required: true, message: 'Por favor, insira o nome da subcategoria.' }]}
        >
          <Input placeholder="Digite o nome da subcategoria" />
        </Form.Item>
      </Form>
      <Table
        dataSource={categories}
        columns={columns}
        rowKey="categoryId"
        rowSelection={{
          type: 'radio',
          onChange: (_, selectedRows) => {
            if (selectedRows.length > 0) {
              setSelectedCategoryId(selectedRows[0].categoryId); // Armazena o ID da categoria selecionada
            }
          },
        }}
        pagination={false}
        style={{ marginTop: '16px' }}
      />
    </Modal>
  );
};

export default CreateSubCategoryModal;
