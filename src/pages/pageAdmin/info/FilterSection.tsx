// components/FilterSection.tsx
import React from "react";
import { Button, Col, Select, Input } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const { Option } = Select;

interface FilterSectionProps {
  selectedFilter: string | null;
  filterValue: string | null;
  onFilterChange: (value: string) => void;
  onFilterValueChange: (value: string | null) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedFilter,
  filterValue,
  onFilterChange,
  onFilterValueChange,
  onApplyFilter,
  onClearFilter,
}) => {
  const renderFilterInput = () => {
    if (!selectedFilter) return null;

    switch (selectedFilter) {
      case "name":
      case "email":
        return (
          <Input
            placeholder={`Buscar por ${selectedFilter}`}
            value={filterValue || ""}
            onChange={(e) => onFilterValueChange(e.target.value)}
            style={{ width: 200, marginRight: 8 }}
          />
        );
      case "role":
        return (
          <Select
            placeholder="Selecionar Função"
            onChange={(value) => onFilterValueChange(value)}
            style={{ width: 150, marginRight: 8 }}
            value={filterValue}
          >
            <Option value="ADMIN">Administrador</Option>
            <Option value="LABORATORIST">Laboratorista</Option>
            <Option value="STUDENT">Estudante</Option>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <Col>
      <Select
        placeholder="Selecionar Campo de Filtro"
        onChange={(value) => {
          onFilterChange(value);
          onFilterValueChange(null); // Reset filter value on field change
        }}
        style={{ width: 200, marginRight: 8 }}
        value={selectedFilter}
      >
        <Option value="name">Nome</Option>
        <Option value="email">Email</Option>
        <Option value="role">Função</Option>
      </Select>
      {renderFilterInput()}
      <Button type="primary" icon={<FilterOutlined />} onClick={onApplyFilter}>
        Filtrar
      </Button>
      <Button onClick={onClearFilter} style={{ marginLeft: 8 }}>
        Limpar Filtro
      </Button>
    </Col>
  );
};

export default FilterSection;
