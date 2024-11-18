import React from 'react';
import { ConfigProvider, Table, Empty, TableProps as AntTableProps } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';

interface CustomTableProps<T> {
  dataSource: T[];
  columns: AntTableProps<T>['columns'];
  size: string | number | undefined;
  loading?: boolean;
  isLoadData?: boolean;
  onClick?: (record: T) => void;
  rowSelection?: TableRowSelection<T> | undefined;
  style?: React.CSSProperties | undefined;
  numberOfElements?: number;
  rowKey?: string | ((record: T) => string) | undefined;
}

const CustomTable = <T extends object>({
  dataSource,
  columns,
  size,
  isLoadData,
  onClick,
  rowSelection,
  style,
  loading,
  numberOfElements,
  rowKey,
}: CustomTableProps<T>): React.ReactElement => {
  const handleRowOnClick = (record: T) => {
    if (onClick) {
      onClick(record);
    }
  };

  return (
    <ConfigProvider>
      <Table<T>
        dataSource={dataSource}
        columns={columns}
        scroll={{ y: size }}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowOnClick(record),
        })}
        rowSelection={rowSelection}
        style={style}
        loading={isLoadData || loading}
        locale={{
          emptyText: numberOfElements === 0 ? <Empty /> : null,
        }}
        rowKey={rowKey || 'id'}
      />
    </ConfigProvider>
  );
};

export default CustomTable;
