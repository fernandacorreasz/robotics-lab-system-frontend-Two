import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import RequestLoanModal from './loan/RequestLoanModal';
import { fetchComponents } from '../../services/LoanService';

// Definir a interface para os detalhes do componente
interface ComponentDetails {
  id: string;
  name: string;
  serialNumber: string;
  description: string;
  totalQuantity: number;
  requestedQuantity: number;
  authorizedQuantity: number;
  borrowedQuantity: number;
  availableQuantity: number;
}

const ComponentsLibraryStudent: React.FC = () => {
  // Usar a interface para definir o tipo do estado
  const [components, setComponents] = useState<ComponentDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  useEffect(() => {
    const loadComponents = async () => {
      try {
        setLoading(true);
        // Usar a interface ComponentDetails[] como tipo esperado para os dados
        const data: ComponentDetails[] = await fetchComponents();
        setComponents(data);
      } catch (error) {
        // Generalizar o tipo do erro
        const errorMessage =
          error instanceof Error ? error.message : 'Erro inesperado ao carregar componentes';
        message.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadComponents();
  }, []);

  const columns = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Descrição', dataIndex: 'description', key: 'description' },
    { title: 'Quantidade Total', dataIndex: 'totalQuantity', key: 'totalQuantity' },
    { title: 'Solicitado', dataIndex: 'requestedQuantity', key: 'requestedQuantity' },
    { title: 'Autorizado', dataIndex: 'authorizedQuantity', key: 'authorizedQuantity' },
    { title: 'Emprestado', dataIndex: 'borrowedQuantity', key: 'borrowedQuantity' },
    { title: 'Disponível', dataIndex: 'availableQuantity', key: 'availableQuantity' },
    {
      title: 'Ação',
      key: 'action',
      render: (_: unknown, record: ComponentDetails) => (
        <Button
          type="primary"
          onClick={() => setSelectedComponent(record.name)}
          disabled={record.availableQuantity <= 0}
        >
          Solicitar Empréstimo
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={components} columns={columns} loading={loading} rowKey="id" />
      {selectedComponent && (
        <RequestLoanModal
          visible={!!selectedComponent}
          onClose={() => setSelectedComponent(null)}
          componentName={selectedComponent}
        />
      )}
    </>
  );
};

export default ComponentsLibraryStudent;
