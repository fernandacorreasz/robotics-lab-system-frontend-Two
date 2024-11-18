import React from "react";
import { Tag, Select } from "antd";

interface StatusTagProps {
  status: string;
  editable: boolean;
  onChange: (newStatus: string) => void;
}

const statusColors = {
  NOT_STARTED: "gray",
  IN_PROGRESS: "blue",
  COMPLETED: "green",
  CANCELED: "red",
};

const statusLabels = {
  NOT_STARTED: "Não Iniciado",
  IN_PROGRESS: "Em Andamento",
  COMPLETED: "Concluído",
  CANCELED: "Cancelado",
};

const StatusTag: React.FC<StatusTagProps> = ({ status, editable, onChange }) => {
  return (
    <div style={{ textAlign: "left" }}>
      {editable ? (
        <Select
          value={status}
          style={{ width: 150 }}
          onChange={onChange}
          options={Object.keys(statusColors).map((key) => ({
            value: key,
            label: statusLabels[key as keyof typeof statusLabels],
            style: { color: statusColors[key as keyof typeof statusColors] },
          }))}
        />
      ) : (
        <Tag color={statusColors[status as keyof typeof statusColors]}>
          {statusLabels[status as keyof typeof statusLabels]}
        </Tag>
      )}
    </div>
  );
};

export default StatusTag;
