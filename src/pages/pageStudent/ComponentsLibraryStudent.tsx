import React, { useState } from 'react';
import { Select, Input, Cascader, Button, Collapse, Row, Col, Card, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import HeaderCard from '../../components/Cards/HeaderCardStudants';

const { Option } = Select;
const { Panel } = Collapse;

// Sample categories for the Cascader
const categories = [
  {
    value: 'arduino',
    label: 'Arduino',
    children: [
      { value: 'placa', label: 'Placa' },
      { value: 'sensor', label: 'Sensor' },
    ],
  },
  {
    value: 'raspberry',
    label: 'Raspberry',
    children: [
      { value: 'placa', label: 'Placa' },
      { value: 'acessory', label: 'Acessório' },
    ],
  },
];

// Sample components for display in cards
const components = [
  { name: 'Arduino Uno', image: 'link-to-image-1', category: 'Arduino' },
  { name: 'Arduino Mini', image: 'link-to-image-2', category: 'Arduino' },
  { name: 'Raspberry Pi', image: 'link-to-image-3', category: 'Raspberry' },
];

const ComponentsLibraryStudent: React.FC = () => {
  const [searchType, setSearchType] = useState<string>(''); // Estado para o tipo de solicitação
  const [inputValue, setInputValue] = useState<string>(''); // Estado para o input de componente
  const [cascaderValue, setCascaderValue] = useState<string[]>([]); // Estado para o Cascader
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20; // Number of components per page

  const handleSearchTypeChange = (value: string) => {
    setSearchType(value);
    setInputValue(''); // Limpa o input ao mudar o tipo
    setCascaderValue([]); // Limpa o cascader ao mudar o tipo
    setCurrentPage(1); // Reset to first page on search type change
  };

  // Calculate the components to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const currentComponents = components.slice(startIndex, startIndex + pageSize);

  return (
    <div>
       <HeaderCard />
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Filtro de Busca" key="1">
          <Row gutter={10}>
            <Col span={8}>
              <Select
                placeholder="Tipo de solicitação"
                onChange={handleSearchTypeChange}
                style={{ width: '100%', marginBottom: '10px' }}
              >
                <Option value="component">Busca por componente</Option>
                <Option value="category">Busca por categoria</Option>
              </Select>
            </Col>
            <Col span={8}>
              {searchType === 'component' && (
                <Input
                  placeholder="Digite o que busca"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{ marginBottom: '10px' }}
                />
              )}
              {searchType === 'category' && (
                <Cascader
                  options={categories}
                  onChange={setCascaderValue}
                  placeholder="Selecione uma categoria"
                  style={{ marginBottom: '10px', width: '100%' }}
                />
              )}
            </Col>
            <Button type="primary">Aplicar Filtro</Button>
          </Row>
        </Panel>
      </Collapse>

      {/* Grid of Components */}
      <Row gutter={6} style={{ marginTop: '20px' }}>
        {currentComponents.map((component) => (
          <Col span={6} key={component.name}>
            <Card
              hoverable
              cover={<img alt={component.name} src={component.image} />}
            >
              <Card.Meta 
                title={component.name} 
                description={
                  <Link to={`/student/components-library/${component.name}`}>Mais informações</Link>

                } 
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={components.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );
};

export default ComponentsLibraryStudent;
