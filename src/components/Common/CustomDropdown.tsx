import React from 'react';
import { Button, Dropdown, Menu } from 'antd';

interface DropdownProps {
  menuItems?: { key: string; label: string }[];
  handleMenuClick: (key: string) => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({ menuItems, handleMenuClick }) => {
  const menu = (
    <Menu onClick={({ key }) => handleMenuClick(key)}>
      {menuItems?.map(item => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>Opções</Button>
    </Dropdown>
  );
};

export default DropdownComponent;
