// CustomButton.tsx
import React from "react";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";

interface Props extends ButtonProps {
  text: string;
  icon?: React.ReactNode;
  danger?: boolean;
}

const CustomButton: React.FC<Props> = ({ type = "primary", text, icon, onClick, danger = false }) => {
  return (
    <Button type={type} icon={icon} onClick={onClick} danger={danger}>
      {text}
    </Button>
  );
};

export default CustomButton;
