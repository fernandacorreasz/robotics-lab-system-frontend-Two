// components/FilterComponent.tsx
import React, { useState } from "react";
import { Button, Input, Select, Space } from "antd";
import { FilterOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface Filter {
  column: string;
  filterType: string;
  value: string;
}

interface FilterComponentProps {
  onApply: (filters: Filter[]) => void;
}

const { Option } = Select;

const FilterLaonsLab: React.FC<FilterComponentProps> = ({ onApply }) => {
  const [filter, setFilter] = useState<Filter>({
    column: "",
    filterType: "",
    value: "",
  });

  const handleFilterChange = (key: keyof Filter, value: string) => {
    setFilter({ ...filter, [key]: value });
  };

  const handleApply = () => {
    onApply([filter]);
  };

  const handleClearFilters = () => {
    setFilter({ column: "", filterType: "", value: "" });
    onApply([]);
  };

  return (
    <div>
      <Space style={{ marginBottom: 8 }}>
        <Select
          placeholder="Selecione uma coluna"
          style={{ width: 150 }}
          value={filter.column || undefined}
          onChange={(value) => handleFilterChange("column", value)}
        >
          <Option value="loanId">ID Empréstimo</Option>
          <Option value="borrowerEmail">E-mail Solicitante</Option>
          <Option value="authorizerEmail">E-mail Autorizador</Option>
          <Option value="componentName">Componente</Option>
          <Option value="quantity">Quantidade</Option>
          <Option value="status">Status</Option>
        </Select>

        <Select
          placeholder="Selecione o tipo de filtro"
          style={{ width: 120 }}
          value={filter.filterType || undefined}
          onChange={(value) => handleFilterChange("filterType", value)}
        >
          <Option value="equal">Igual</Option>
          <Option value="like">Contém</Option>
          <Option value="not_equal">Diferente</Option>
        </Select>

        <Input
          placeholder="Digite o valor"
          style={{ width: 200 }}
          value={filter.value}
          onChange={(e) => handleFilterChange("value", e.target.value)}
        />
      </Space>

      <Space>
        <Button
          type="primary"
          style={{ marginLeft: "4px" }}
          icon={<FilterOutlined />}
          onClick={handleApply}
        />
        <Button
          type="default"
          icon={<CloseCircleOutlined />}
          onClick={handleClearFilters}
        />
      </Space>
    </div>
  );
};

export default FilterLaonsLab;
