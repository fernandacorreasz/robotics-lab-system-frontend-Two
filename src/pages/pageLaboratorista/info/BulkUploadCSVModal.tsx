import React, { useState } from 'react';
import { Modal, Button, Upload, Table, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, RcFile, UploadFile } from 'antd/lib/upload/interface';
import { uploadComponentsCSV } from '../../../services/ComponentService';
import { Component } from '../../../models/Component';

const { Text } = Typography;

const BulkUploadCSVModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const [file, setFile] = useState<RcFile | null>(null);
  const [dataPreview, setDataPreview] = useState<Component[]>([]);
  const [errorDetails, setErrorDetails] = useState<{ identifier: string; errorMessage: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (info: UploadChangeParam<UploadFile<unknown>>) => {
    const uploadedFile = info.file.originFileObj as RcFile;
    if (uploadedFile) {
      setFile(uploadedFile);
      parseCSV(uploadedFile);
    }
  };

  const parseCSV = async (file: RcFile) => {
    try {
      const text = await file.text();
      const rows = text.split('\n').slice(1).filter((row) => row.trim() !== ''); // Remove header and empty rows
      const previewData: Component[] = rows.map((row) => {
        const [name, serialNumber, description, quantity, subCategoryName] = row.split(',').map((col) => col.trim());
        return {
          name,
          serialNumber,
          description,
          quantity: parseInt(quantity, 10) || 0,
          subCategoryName,
        } as Component;
      });
      setDataPreview(previewData);
    } catch (error) {
      setDataPreview([]);
      console.error('Erro ao processar o arquivo CSV:', error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorDetails([{ identifier: 'Arquivo não selecionado', errorMessage: 'Por favor, selecione um arquivo CSV.' }]);
      return;
    }

    try {
      setLoading(true);
      const text = await file.text();
      const response = await uploadComponentsCSV(text);

      if (Array.isArray(response) && response.some((item) => item.errorMessage)) {
        setErrorDetails(response);
      } else {
        setErrorDetails([]);
        setDataPreview([]);
        setFile(null);
        onClose();
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      setErrorDetails([{ identifier: 'Erro desconhecido', errorMessage: 'Erro ao realizar o upload do arquivo CSV.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setDataPreview([]);
    setErrorDetails([]);
  };

  const downloadCSVTemplate = () => {
    const csvContent =
      'name,serialNumber,description,quantity,subCategoryName\nResistor,1235554556,Resistor,100,Subcategoria';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'modelo-cadastro-massivo.csv';
    link.click();
  };

  const previewColumns = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Número de Série', dataIndex: 'serialNumber', key: 'serialNumber' },
    { title: 'Descrição', dataIndex: 'description', key: 'description' },
    { title: 'Quantidade', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Subcategoria', dataIndex: 'subCategoryName', key: 'subCategoryName' },
  ];

  const errorColumns = [
    { title: 'Identificador', dataIndex: 'identifier', key: 'identifier' },
    { title: 'Mensagem de Erro', dataIndex: 'errorMessage', key: 'errorMessage' },
  ];

  return (
    <Modal
      title="Cadastro Massivo via CSV"
      visible={visible}
      onCancel={() => {
        handleReset();
        onClose();
      }}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="upload" type="primary" onClick={handleUpload} loading={loading}>
          Enviar CSV
        </Button>,
      ]}
    >
      <Button onClick={downloadCSVTemplate} style={{ marginBottom: '16px' }}>
        Baixar Modelo CSV
      </Button>
      <Upload
        beforeUpload={() => false}
        onChange={handleFileChange}
        maxCount={1}
        showUploadList
        onRemove={handleReset}
      >
        <Button icon={<UploadOutlined />}>Selecionar CSV</Button>
      </Upload>

      {file && <Text type="secondary" style={{ marginTop: '16px' }}>Arquivo Selecionado: {file.name}</Text>}

      {dataPreview.length > 0 && (
        <>
          <Text strong style={{ display: 'block', marginTop: '16px' }}>
            Pré-visualização dos dados
          </Text>
          <Table
            dataSource={dataPreview}
            columns={previewColumns}
            pagination={false}
            rowKey="serialNumber"
            style={{ marginTop: '8px' }}
          />
        </>
      )}

      {errorDetails.length > 0 && (
        <>
          <Text type="danger" strong style={{ display: 'block', marginTop: '16px' }}>
            Detalhes dos Erros
          </Text>
          <Table
            dataSource={errorDetails}
            columns={errorColumns}
            pagination={{ pageSize: 5 }}
            rowKey="identifier"
            scroll={{ y: 240 }}
            style={{ marginTop: '8px' }}
          />
        </>
      )}
    </Modal>
  );
};

export default BulkUploadCSVModal;
