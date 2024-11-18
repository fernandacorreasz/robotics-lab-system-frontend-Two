import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

interface TabItem {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

interface TabsComponentProps extends TabsProps {
  items: TabItem[];
}

const TabsComponent: React.FC<TabsComponentProps> = ({ items, ...rest }) => {
  return (
    <Tabs {...rest}>
      {items.map(item => (
        <Tabs.TabPane key={item.key} tab={item.label}>
          {item.content}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

export default TabsComponent;
