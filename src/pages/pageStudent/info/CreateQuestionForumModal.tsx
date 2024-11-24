import React, { useState } from "react";
import { Modal, Input, Select, Button, message } from "antd";
import { createTag } from "../../../services/forumService";

const { Option } = Select;

interface CreateQuestionModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  question: {
    title: string;
    description: string;
    codeSnippet?: string;
    tagIds: string[];
  };
  setQuestion: (question: {
    title: string;
    description: string;
    codeSnippet?: string;
    tagIds: string[];
  }) => void;
  tags: Array<{ id: string; name: string }>;
  refreshTags: () => void; 
}

const CreateQuestionModal: React.FC<CreateQuestionModalProps> = ({
  visible,
  onOk,
  onCancel,
  question,
  setQuestion,
  tags,
  refreshTags,
}) => {
  const [newTagName, setNewTagName] = useState("");

  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      message.error("O nome da tag não pode estar vazio.");
      return;
    }
  
    try {
      await createTag({ name: newTagName });
      message.success(`Tag "${newTagName}" criada com sucesso!`);
      setNewTagName("");
      refreshTags();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      message.error(`Erro ao criar a tag: ${errorMessage}`);
    }
  };
  
  return (
    <Modal
      title="Criar Nova Pergunta"
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
      <Select
        mode="multiple"
        placeholder="Selecione tags"
        style={{ width: "100%", marginBottom: "10px" }}
        value={question.tagIds}
        onChange={(value) =>
          setQuestion({ ...question, tagIds: value })
        }
      >
        {tags.map((tag) => (
          <Option key={tag.id} value={tag.id}>
            {tag.name}
          </Option>
        ))}
      </Select>

      <div style={{ marginTop: "20px" }}>
        <h4>Adicionar Nova Tag</h4>
        <Input
          placeholder="Nome da nova tag"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button type="primary" onClick={handleCreateTag}>
          Criar Tag
        </Button>
      </div>
    </Modal>
  );
};

export default CreateQuestionModal;
