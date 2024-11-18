import React from "react";
import { Button, Col, Select, Input, DatePicker } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

interface FilterSectionProps {
  selectedFilter: string | null;
  filterValue: string | moment.Moment | null;
  onFilterChange: (value: string) => void;
  onFilterValueChange: (value: string | moment.Moment | null) => void;
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
      case "title":
      case "description":
        return (
          <Input
            placeholder={`Buscar por ${selectedFilter}`}
            value={filterValue as string}
            onChange={(e) => onFilterValueChange(e.target.value)}
            style={{ width: 200, marginRight: 8 }}
          />
        );
      case "status":
        return (
          <Select
            placeholder="Selecionar Status"
            onChange={(value) => onFilterValueChange(value)}
            style={{ width: 150, marginRight: 8 }}
            value={filterValue as string}
          >
            <Option value="NOT_STARTED">Não Iniciado</Option>
            <Option value="IN_PROGRESS">Em Progresso</Option>
            <Option value="COMPLETED">Concluído</Option>
            <Option value="CANCELED">Cancelado</Option>
          </Select>
        );
      case "startDate":
      case "endDate":
        return (
          <DatePicker
            onChange={(date) => onFilterValueChange(date)}
            style={{ marginRight: 8 }}
            value={filterValue as moment.Moment}
          />
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
        <Option value="title">Título</Option>
        <Option value="description">Descrição</Option>
        <Option value="status">Status</Option>
        <Option value="startDate">Data de Início</Option>
        <Option value="endDate">Data de Fim</Option>
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
