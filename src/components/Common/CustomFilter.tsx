import React from 'react';
import { Input, Button, ConfigProvider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Theme } from '../../styles/ThemeComponent';

interface SearchButtonProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

const CustomFilter: React.FC<SearchButtonProps> = ({ placeholder, onSearch }) => {
  const [value, setValue] = React.useState('');

  const handleSearch = () => {
    onSearch(value);
  };

  return (
    <ConfigProvider theme={{ components: { Button: Theme.components.Button } }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          style={{ width: 200, marginRight: '10px' }} // Ajuste o tamanho do input
        />
        <Button
          onClick={handleSearch}
          icon={<SearchOutlined />}
          type="primary"
        />
      </div>
    </ConfigProvider>
  );
};

export default CustomFilter;
