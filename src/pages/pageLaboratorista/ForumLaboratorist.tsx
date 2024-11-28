import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, List, Pagination, Tag, message } from "antd";
import { CommentOutlined, PlusOutlined } from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  fetchForums,
  createForum,
  fetchTags,
  deleteForum,
  updateForum,
} from "../../services/forumService";
import { Forum, Tag as TagModel } from "../../models/Forum";
import RoboticImage from "../../assets/img/robotic.png";
import FilterForum from "../pageStudent/info/FilterForum";
import CreateQuestionModal from "../pageStudent/info/CreateQuestionForumModal";
import UpdateQuestionModal from "../pageStudent/info/UpdateQuestionModal";
import { useNavigate } from "react-router-dom";



const ForumLaboratorist: React.FC = () => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [tags, setTags] = useState<TagModel[]>([]);
  const [filters, setFilters] = useState<
    Array<{ column: string; filterType: string; value: string }>
  >([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newQuestion, setNewQuestion] = useState<{
    title: string;
    description: string;
    codeSnippet?: string;
    tagIds: string[];
  }>({
    title: "",
    description: "",
    codeSnippet: "",
    tagIds: [],
  });
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const [questionToEdit, setQuestionToEdit] = useState<{
    id: string;
    title: string;
    description: string;
    codeSnippet?: string;
  }>({ id: "", title: "", description: "", codeSnippet: "" });

  useEffect(() => {
    loadForums();
  }, [currentPage, filters]);

  const loadForums = async () => {
    try {
      const data = await fetchForums(filters, currentPage - 1, pageSize);
      setForums(data.content);
      setTags(await fetchTags());
      setTotalPages(data.totalPages);
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || "Erro ao carregar fóruns.");
      } else {
        message.error("Erro inesperado ao carregar fóruns.");
      }
    }
  };

  const handleFilterApply = (
    newFilters: Array<{ column: string; filterType: string; value: string }>
  ) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleAddQuestion = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("Usuário não autenticado.");

      const forumData = {
        ...newQuestion,
        status: "OPEN",
        userId,
      };

      await createForum(forumData);
      message.success("Pergunta adicionada com sucesso!");
      setIsModalVisible(false);
      setNewQuestion({
        title: "",
        description: "",
        codeSnippet: "",
        tagIds: [],
      });
      loadForums();
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || "Erro ao adicionar pergunta.");
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditQuestion = async () => {
    try {
      await updateForum(questionToEdit);
      message.success("Pergunta atualizada com sucesso!");
      setIsEditModalVisible(false);
      loadForums();
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Erro ao atualizar pergunta"
      );
    }
  };

  return (
    <div>
      <Card
        style={{
          marginBottom: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row align="middle" justify="start">
          <Col span={20}>
            <h4 style={{ color: "#69c4d3", margin: 0, textAlign: "left" }}>
              Bem-vindo ao Fórum do Laboratório!
            </h4>
            <p style={{ margin: 0, textAlign: "left" }}>
              Aqui no Fórum, você pode explorar problemas, dúvidas e discussões
              relacionadas aos nossos projetos e componentes. Este é um espaço
              colaborativo e exclusivo para os membros do nosso sistema.
              <br />
              Você pode:
              <ul>
                <li>
                  Visualizar perguntas e soluções compartilhadas por outros
                  usuários.
                </li>
                <li>
                  Contribuir com respostas ou comentários para ajudar a
                  comunidade.
                </li>
                <li>
                  Criar suas próprias perguntas para obter ajuda ou sugestões.
                </li>
              </ul>
              Aproveite o espaço para aprender, compartilhar e crescer junto com
              os outros membros!
            </p>
          </Col>
          <Col span={4}>
            <img
              src={RoboticImage}
              alt="Robô"
              style={{
                width: "70px",
                display: "block",
                marginLeft: "auto",
              }}
            />
          </Col>
        </Row>
      </Card>
      <Row align="middle" justify="space-between" style={{ marginBottom: "16px" }}>
        <Col>
          <FilterForum onApply={handleFilterApply} />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Criar Nova Pergunta
          </Button>
        </Col>
      </Row>
      <List
        dataSource={forums}
        renderItem={(forum: Forum) => {
          const userId = localStorage.getItem("userId"); 
          const isOwner = forum.userId === userId;

          return (
            <Card style={{ marginBottom: "10px", textAlign: "left" }}>
              <Row justify="start">
                <Col span={24}>
                  <p>
                    <strong>Pergunta/Título:</strong> {forum.title}
                  </p>
                </Col>
                <Col span={24}>
                  <p>
                    <strong>Descrição:</strong> {forum.description}
                  </p>
                </Col>
                <Col span={24}>
                  <p>
                    <strong>Autor:</strong> {forum.userName}
                  </p>
                </Col>
                <Col span={24}>
                  <p>
                    <strong>Data de Criação:</strong>{" "}
                    {new Date(forum.creationDate).toLocaleDateString()}
                  </p>
                </Col>
                <Col span={24}>
                  {forum.codeSnippet && (
                    <>
                      <p>
                        <strong>Código:</strong>
                      </p>
                      <SyntaxHighlighter language="javascript" style={prism}>
                        {forum.codeSnippet}
                      </SyntaxHighlighter>
                    </>
                  )}
                  {!forum.codeSnippet && (
                    <p>
                      <strong>Código:</strong> Nenhum código fornecido.
                    </p>
                  )}
                </Col>
                <Col span={24}>
                  <p>
                    <strong>Assuntos Relacionados:</strong>
                  </p>
                  <div>
                    {forum.tags.map((tag) => (
                      <Tag
                        key={tag.id}
                        color="blue"
                        style={{ marginBottom: "5px" }}
                      >
                        {tag.name}
                      </Tag>
                    ))}
                  </div>
                </Col>
              </Row>
              <Row justify="end" style={{ marginTop: "10px" }}>
              <Button
    icon={<CommentOutlined />}
    onClick={() => navigate(`/laboratorist/forum/${forum.id}`)}
  >
    Ver Comentários
  </Button>;
                {isOwner && (
                  <>
                    <Button
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        setQuestionToEdit({
                          id: forum.id,
                          title: forum.title,
                          description: forum.description,
                          codeSnippet: forum.codeSnippet || "",
                        });
                        setIsEditModalVisible(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      danger
                      style={{ marginLeft: "10px" }}
                      onClick={async () => {
                        try {
                          await deleteForum([forum.id]);
                          message.success("Pergunta deletada com sucesso!");
                          loadForums(); 
                        } catch (error) {
                          message.error(
                            error instanceof Error
                              ? error.message
                              : "Erro ao deletar pergunta"
                          );
                        }
                      }}
                    >
                      Deletar
                    </Button>
                  </>
                )}
              </Row>
            </Card>
          );
        }}
      />

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          total={totalPages * pageSize}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>

      <CreateQuestionModal
        visible={isModalVisible}
        onOk={handleAddQuestion}
        onCancel={() => setIsModalVisible(false)}
        question={newQuestion}
        setQuestion={setNewQuestion}
        tags={tags}
        refreshTags={async () => setTags(await fetchTags())}
      />
      <UpdateQuestionModal
        visible={isEditModalVisible}
        onOk={handleEditQuestion}
        onCancel={() => setIsEditModalVisible(false)}
        question={questionToEdit}
        setQuestion={setQuestionToEdit}
      />
    </div>
  );
};


export default ForumLaboratorist;
