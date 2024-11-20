import React, { useState } from "react";
import { Card, Button, Input, List, message } from "antd";
import { UpOutlined, DownOutlined, UserOutlined, CommentOutlined, CodeOutlined } from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { createComment } from "../../../services/forumService";

const { TextArea } = Input;

interface Comment {
  id: string;
  content: string;
  codeSnippet?: string;
  userName: string;
}

interface CommentsSectionProps {
  comments: Comment[];
  forumId: string;
  onCommentAdded: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, forumId, onCommentAdded }) => {
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(true);
  const [newComment, setNewComment] = useState({
    content: "",
    codeSnippet: "",
  });

  const userId = localStorage.getItem("userId"); // ID do usuário logado

  const handleAddComment = async () => {
    if (!newComment.content.trim()) {
      message.error("O comentário não pode estar vazio.");
      return;
    }
  
    try {
      if (!userId) throw new Error("Usuário não autenticado.");
  
      await createComment({
        forumId,
        userId,
        content: newComment.content,
        codeSnippet: newComment.codeSnippet,
      });
  
      message.success("Comentário adicionado com sucesso!");
      setNewComment({ content: "", codeSnippet: "" });
      onCommentAdded();
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || "Erro ao adicionar comentário.");
      } else {
        message.error("Erro inesperado ao adicionar comentário.");
      }
    }
  };
  

  return (
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
          <h4 style={{ margin: 0, color: "#fff" }}>Comentários</h4>
          <Button
            type="link"
            icon={isCommentsExpanded ? <UpOutlined /> : <DownOutlined />}
            onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
            style={{ color: "#fff" }}
          />
        </div>
      }
      style={{
        marginTop: "20px",
      }}
      headStyle={{
        backgroundColor: "#69c4d3",
        color: "#fff",
      }}
    >
      {isCommentsExpanded && (
        <>
          <List
            dataSource={comments}
            renderItem={(comment: Comment) => (
              <Card style={{ marginBottom: "10px", textAlign: "left" }}>
                <p>
                  <UserOutlined style={{ marginRight: "8px" }} />
                  <strong>Comentário feito por:</strong> {comment.userName}
                </p>
                <p>
                  <CommentOutlined style={{ marginRight: "8px" }} />
                  <strong>Comentário:</strong> {comment.content}
                </p>
                <p style={{ marginTop: "10px", marginBottom: "5px" }}>
                  <CodeOutlined style={{ marginRight: "8px" }} />
                  <strong>Código Sugerido:</strong>
                </p>
                {comment.codeSnippet ? (
                  <div style={{ maxWidth: "80%", margin: "10px 0" }}>
                    <SyntaxHighlighter language="javascript" style={prism}>
                      {comment.codeSnippet}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <p style={{ color: "#888", marginLeft: "26px" }}>Nenhum código sugerido.</p>
                )}
              </Card>
            )}
          />

          <div style={{ marginTop: "20px" }}>
            <h4>Adicionar Comentário</h4>
            <TextArea
              placeholder="Escreva seu comentário aqui..."
              value={newComment.content}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
              style={{ marginBottom: "10px" }}
            />
            <TextArea
              placeholder="Trecho de código (opcional)"
              value={newComment.codeSnippet}
              onChange={(e) =>
                setNewComment({ ...newComment, codeSnippet: e.target.value })
              }
              style={{ marginBottom: "10px" }}
            />
            <Button type="primary" onClick={handleAddComment}>
              Adicionar Comentário
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default CommentsSection;
