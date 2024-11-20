import React, { useState } from "react";
import { Button, Input, Select, Space } from "antd";
import { FilterOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Filter {
  column: string;
  filterType: string;
  value: string;
}

interface FilterComponentProps {
  onApply: (filters: Filter[]) => void;
}

const ForumFilterComponent: React.FC<FilterComponentProps> = ({ onApply }) => {
  const [filter, setFilter] = useState<Filter>({ column: "", filterType: "", value: "" });

  const handleFilterChange = (key: keyof Filter, value: string) => {
    setFilter({ ...filter, [key]: value });
  };

  const handleApply = () => {
    if (filter.column && filter.filterType && filter.value) {
      onApply([filter]);
    }
  };

  const handleClearFilters = () => {
    setFilter({ column: "", filterType: "", value: "" });
    onApply([]);
  };

  return (
    <div>
      <Space style={{ marginBottom: 8 }}>
        <Select
          placeholder="Coluna"
          style={{ width: 150 }}
          value={filter.column || undefined}
          onChange={(value) => handleFilterChange("column", value)}
        >
          <Option value="title">Título</Option>
          <Option value="description">Descrição</Option>
          <Option value="status">Status</Option>
          <Option value="userName">Usuário</Option>
        </Select>

        <Select
          placeholder="Tipo de Filtro"
          style={{ width: 120 }}
          value={filter.filterType || undefined}
          onChange={(value) => handleFilterChange("filterType", value)}
        >
          <Option value="equal">Igual</Option>
          <Option value="like">Contém</Option>
          <Option value="not_equal">Diferente</Option>
        </Select>

        <Input
          placeholder="Valor"
          style={{ width: 200 }}
          value={filter.value}
          onChange={(e) => handleFilterChange("value", e.target.value)}
        />
      </Space>

      <Space>
        <Button type="primary" icon={<FilterOutlined />} onClick={handleApply}>
          Aplicar
        </Button>
        <Button type="default" icon={<CloseCircleOutlined />} onClick={handleClearFilters}>
          Limpar
        </Button>
      </Space>
    </div>
  );
};

export default ForumFilterComponent;
