import React from "react";
import { Modal, Form, Input, DatePicker, Button, message } from "antd";
import { requestLoan } from "../../../services/LoanService";

interface LoanFormValues {
  quantity: number;
  expectedReturnDate: moment.Moment;
}

interface RequestLoanModalProps {
  visible: boolean;
  onClose: () => void;
  componentName: string;
}

const RequestLoanModal: React.FC<RequestLoanModalProps> = ({
  visible,
  onClose,
  componentName,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: LoanFormValues) => {
    try {
      const loanData = {
        componentName,
        quantity: values.quantity,
        expectedReturnDate: values.expectedReturnDate.format("YYYY-MM-DD"),
        borrowerEmail: localStorage.getItem("email") || "",
      };

      await requestLoan(loanData);
      message.success("Empréstimo solicitado com sucesso!");
      form.resetFields(); 
      onClose(); 
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao solicitar empréstimo.";
      message.error(errorMessage);
    }
  };

  return (
    <Modal
      title={`Solicitar Empréstimo - ${componentName}`}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="quantity"
          label="Quantidade"
          rules={[{ required: true, message: "Insira a quantidade" }]}
        >
          <Input type="number" min={1} />
        </Form.Item>
        <Form.Item
          name="expectedReturnDate"
          label="Data de Retorno"
          rules={[{ required: true, message: "Selecione a data de retorno" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginTop: "10px" }}>
          Solicitar
        </Button>
      </Form>
    </Modal>
  );
};

export default RequestLoanModal;
