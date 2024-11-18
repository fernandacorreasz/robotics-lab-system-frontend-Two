import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, Row, Col } from 'antd';

interface SubCategory {
  id: string;
  subCategoryId: string;
  totalQuantity: number;
  subCategoryName: string;
  category: {
    id: string;
    categoryId: string;
    categoryName: string;
  };
}

interface Category {
  id: string;
  categoryId: string;
  categoryName: string;
}

interface Component {
  id: string;
  componentId: string;
  name: string;
  serialNumber: string;
  description: string;
  quantity: number;
  subCategory: SubCategory;
  category: Category;
}

const ManageStockLaboratorist: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    // Simulando dados que viriam da API
    const fetchedComponents: Component[] = [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        componentId: 'string',
        name: 'Arduino Uno',
        serialNumber: '123456',
        description: 'Placa de prototipagem eletrônica.',
        quantity: 10,
        subCategory: {
          id: 'subcat1',
          subCategoryId: 'subcat1',
          totalQuantity: 50,
          subCategoryName: 'Placas',
          category: {
            id: 'cat1',
            categoryId: 'cat1',
            categoryName: 'Arduino',
          },
        },
        category: {
          id: 'cat1',
          categoryId: 'cat1',
          categoryName: 'Arduino',
        },
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        componentId: 'string',
        name: 'Raspberry Pi',
        serialNumber: '654321',
        description: 'Placa de computação de baixo custo.',
        quantity: 5,
        subCategory: {
          id: 'subcat2',
          subCategoryId: 'subcat2',
          totalQuantity: 30,
          subCategoryName: 'Placas',
          category: {
            id: 'cat2',
            categoryId: 'cat2',
            categoryName: 'Raspberry',
          },
        },
        category: {
          id: 'cat2',
          categoryId: 'cat2',
          categoryName: 'Raspberry',
        },
      },
      // Adicione mais componentes conforme necessário
    ];
    setComponents(fetchedComponents);
  }, []);

  const filteredComponents = components.filter(component => 
    component.name.toLowerCase().includes(filterText.toLowerCase()) ||
    component.description.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Component ID',
      dataIndex: 'componentId',
      key: 'componentId',
    },
    {
      title: 'Nome do Componente',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Número de Série',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Subcategoria',
      dataIndex: ['subCategory', 'subCategoryName'],
      key: 'subCategoryName',
    },
    {
      title: 'Categoria',
      dataIndex: ['category', 'categoryName'],
      key: 'categoryName',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <Button type="primary">Editar</Button>
          <Button>Remover</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Input
            placeholder="Filtrar componentes"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button type="primary" style={{ backgroundColor: '#add8e6', color: '#000' }}>
              Adicionar Componente
            </Button>
            <Button type="default" style={{ backgroundColor: '#add8e6', color: '#000' }}>
              Importar CSV
            </Button>
          </Space>
        </Col>
      </Row>

      <Table 
        dataSource={filteredComponents} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 10 }} 
      />
    </div>
  );
};

export default ManageStockLaboratorist;
