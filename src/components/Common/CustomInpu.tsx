import { Input } from 'antd';
import React from 'react';

interface Props {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<Props> = ({ placeholder, value, onChange }) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomInput;
