// statusStyles.ts
import styled from "styled-components";

export const statusColors = {
  NOT_STARTED: "#D3D3D3",
  IN_PROGRESS: "#FFEBB2",
  COMPLETED: "#B2FFB2",
  CANCELED: "#FFB2B2",
};

export const statusLabels = {
  NOT_STARTED: "Não Iniciado",
  IN_PROGRESS: "Em Andamento",
  COMPLETED: "Concluído",
  CANCELED: "Cancelado",
};

export const columnHeaderStyles = {
  NOT_STARTED: { backgroundColor: "#D3D3D3", color: "#595959" },
  IN_PROGRESS: { backgroundColor: "#FFEBB2", color: "#FF8C00" },
  COMPLETED: { backgroundColor: "#B2FFB2", color: "#4CAF50" },
  CANCELED: { backgroundColor: "#FFB2B2", color: "#E57373" },
};

// Styled components
export const ColumnHeader = styled.div<{ status: keyof typeof columnHeaderStyles }>`
  text-align: center;
  padding: 8px;
  font-weight: bold;
  border-radius: 4px 4px 0 0;
  margin-bottom: 8px;
  background-color: ${({ status }) => columnHeaderStyles[status].backgroundColor};
  color: ${({ status }) => columnHeaderStyles[status].color};
`;

export const ActivityCard = styled.div<{ status: keyof typeof columnHeaderStyles }>`
  background-color: ${({ status }) => columnHeaderStyles[status].backgroundColor};
  padding: 8px;
  border-radius: 8px 8px 0 0;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
`;

export const CardContainer = styled.div`
  margin-bottom: 8px;
  border-color: #e6e6e6;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CardContent = styled.div`
  padding: 6px;
  font-size: 12px;
  color: #595959;
`;

export const InfoText = styled.span`
  color: #595959;
`;

