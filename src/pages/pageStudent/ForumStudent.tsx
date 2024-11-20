import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Row,
  Col,
  List,
  Pagination,
  Tag,
  message,
  Select,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { fetchForums, createForum } from "../../services/forumService";
import { Forum, Tag as TagModel } from "../../models/Forum";
import RoboticImage from "../../assets/img/robotic.png";

const { Option } = Select;

const ForumStudent: React.FC = () => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [tags, setTags] = useState<TagModel[]>([]);
  const [filter, setFilter] = useState<string>("");
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

  useEffect(() => {
    loadForums();
  }, [currentPage]);

  const loadForums = async () => {
    try {
      const filters = filter
        ? [
            {
              column: "title",
              filterType: "like",
              value: filter,
            },
          ]
        : [];
      const data = await fetchForums(filters, currentPage - 1, pageSize);
      setForums(data.content);
      setTags(extractUniqueTags(data.content));
      setTotalPages(data.totalPages);
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || "Erro ao carregar fóruns.");
      } else {
        message.error("Erro inesperado ao carregar fóruns.");
      }
    }
  };

  const extractUniqueTags = (forums: Forum[]): TagModel[] => {
    const allTags = forums.flatMap((forum) => forum.tags);
    const uniqueTags = Array.from(new Map(allTags.map((tag) => [tag.id, tag])).values());
    return uniqueTags;
  };

  const handleAddQuestion = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Buscando o ID do usuário no localStorage
      if (!userId) throw new Error("Usuário não autenticado.");

      const forumData = {
        ...newQuestion,
        status: "OPEN",
        userId,
      };

      await createForum(forumData);
      message.success("Pergunta adicionada com sucesso!");
      setIsModalVisible(false);
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
          <li>Visualizar perguntas e soluções compartilhadas por outros usuários.</li>
          <li>Contribuir com respostas ou comentários para ajudar a comunidade.</li>
          <li>Criar suas próprias perguntas para obter ajuda ou sugestões.</li>
        </ul>
        Aproveite o espaço para aprender, compartilhar e crescer junto com os outros membros!
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

      <Card style={{ marginBottom: "20px", padding: "10px" }}>
        <Row align="middle" justify="space-between">
          <Col span={18}>
            <Input
              placeholder="Filtrar perguntas"
              prefix={<SearchOutlined />}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onPressEnter={() => {
                setCurrentPage(1);
                loadForums();
              }}
            />
          </Col>
          <Col span={4} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              Adicionar Pergunta
            </Button>
          </Col>
        </Row>
      </Card>

      <List
        dataSource={forums}
        renderItem={(forum: Forum) => (
          <Card style={{ marginBottom: "10px" }}>
            <Row align="top" justify="space-between">
              <Col span={24}>
                <h4 style={{ margin: "0 0 8px 0" }}>{forum.title}</h4>
                <p style={{ margin: "8px 0" }}>{forum.description}</p>
                <p style={{ fontWeight: "bold", margin: "8px 0" }}>
                  Assuntos relacionados:
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
              <Col span={24} style={{ textAlign: "left", marginTop: "10px" }}>
                Criado por: <strong>{forum.userName}</strong> em{" "}
                {new Date(forum.creationDate).toLocaleDateString()}
              </Col>
              <Col span={24} style={{ textAlign: "right", marginTop: "10px" }}>
                <Button
                  icon={<CommentOutlined />}
                  onClick={() =>
                    (window.location.href = `/student/forum/${forum.id}`)
                  }
                >
                  Ver Comentários
                </Button>
              </Col>
            </Row>
          </Card>
        )}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          total={totalPages * pageSize}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>

      {/* Modal para Adicionar Pergunta */}
      {isModalVisible && (
        <Card
          title="Adicionar Nova Pergunta"
          style={{ marginTop: "20px" }}
          extra={
            <Button onClick={() => setIsModalVisible(false)}>Fechar</Button>
          }
        >
          <Input
            placeholder="Título"
            value={newQuestion.title}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, title: e.target.value })
            }
            style={{ marginBottom: "10px" }}
          />
          <Input.TextArea
            placeholder="Descrição"
            value={newQuestion.description}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, description: e.target.value })
            }
            style={{ marginBottom: "10px" }}
          />
          <Input.TextArea
            placeholder="Trecho de código (opcional)"
            value={newQuestion.codeSnippet}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, codeSnippet: e.target.value })
            }
            style={{ marginBottom: "10px" }}
          />
          <Select
            mode="multiple"
            placeholder="Selecione tags"
            style={{ width: "100%", marginBottom: "10px" }}
            value={newQuestion.tagIds}
            onChange={(value) =>
              setNewQuestion({ ...newQuestion, tagIds: value })
            }
          >
            {tags.map((tag) => (
              <Option key={tag.id} value={tag.id}>
                {tag.name}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={handleAddQuestion}
            style={{ marginTop: "10px" }}
          >
            Salvar
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ForumStudent;
