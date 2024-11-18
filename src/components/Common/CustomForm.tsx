import React from 'react';
import { Form, Input, FormItemProps } from 'antd';

interface FieldProps extends FormItemProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'textarea' | 'number' | 'date';
}

interface Props {
  fields: FieldProps[];
  initialValues?: Record<string, unknown>; 
  onFinish: (values: Record<string, unknown>) => void; // Especificando tipo genérico seguro
}

const CustomForm: React.FC<Props> = ({ fields, initialValues, onFinish }) => {
  const renderInput = (type: 'text' | 'textarea' | 'number' | 'date', placeholder?: string) => {
    switch (type) {
      case 'textarea':
        return <Input.TextArea placeholder={placeholder} />;
      case 'number':
        return <Input type="number" placeholder={placeholder} />;
      case 'date':
        return <Input type="date" placeholder={placeholder} />;
      default:
        return <Input placeholder={placeholder} />;
    }
  };

  return (
    <Form layout="vertical" initialValues={initialValues} onFinish={onFinish}>
      {fields.map((field) => (
        <Form.Item key={field.name} label={field.label} name={field.name} rules={field.rules}>
          {renderInput(field.type || 'text', field.placeholder)}
        </Form.Item>
      ))}
    </Form>
  );
};

export default CustomForm;
