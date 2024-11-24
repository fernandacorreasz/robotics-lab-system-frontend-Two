import React from "react";
import { Modal, Input } from "antd";

interface UpdateQuestionModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  question: {
    id: string;
    title: string;
    description: string;
    codeSnippet?: string;
  };
  setQuestion: (question: {
    id: string;
    title: string;
    description: string;
    codeSnippet?: string;
  }) => void;
}

const UpdateQuestionModal: React.FC<UpdateQuestionModalProps> = ({
  visible,
  onOk,
  onCancel,
  question,
  setQuestion,
}) => {
  return (
    <Modal
      title="Editar Pergunta"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Salvar"
      cancelText="Cancelar"
    >
      <Input
        placeholder="Título"
        value={question.title}
        onChange={(e) =>
          setQuestion({ ...question, title: e.target.value })
        }
        style={{ marginBottom: "10px" }}
      />
      <Input.TextArea
        placeholder="Descrição"
        value={question.description}
        onChange={(e) =>
          setQuestion({ ...question, description: e.target.value })
        }
        style={{ marginBottom: "10px" }}
      />
      <Input.TextArea
        placeholder="Trecho de código (opcional)"
        value={question.codeSnippet}
        onChange={(e) =>
          setQuestion({ ...question, codeSnippet: e.target.value })
        }
        style={{ marginBottom: "10px" }}
      />
    </Modal>
  );
};

export default UpdateQuestionModal;
