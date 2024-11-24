import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Spin, message } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { fetchComponentDetails } from "../../../services/LoanService";

interface ComponentDetail {
  id: string;
  name: string;
  serialNumber: string;
  description: string;
  quantity: number;
  tutorialLink?: string;
  projectIdeas?: string;
  librarySuggestions?: string;
  subCategoryName: string;
  categoryName: string;
}

const ComponentDetailsStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [component, setComponent] = useState<ComponentDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [isTutorialVisible, setTutorialVisible] = useState<boolean>(false);
  const [isProjectsVisible, setProjectsVisible] = useState<boolean>(false);
  const [isLibrariesVisible, setLibrariesVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadDetails = async () => {
        try {
            setLoading(true);
            const data = await fetchComponentDetails(id!);
            setComponent(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                message.error(`Erro ao carregar os detalhes do componente: ${error}`);
            } else {
                message.error("Erro desconhecido ao carregar os detalhes do componente.");
            }
        } finally {
            setLoading(false);
        }
    };

    loadDetails();
  }, [id]);

  const getYouTubeEmbedLink = (url: string): string => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!component) {
    return <p>Detalhes não disponíveis.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Card Principal */}
      <Card
        style={{
          marginBottom: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row align="middle" gutter={[16, 16]}>
          <Col span={6}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "150px",
                backgroundColor: "#f0f2f5",
                borderRadius: "10px",
              }}
            >
              {/* Placeholder para a imagem */}
              <span style={{ fontSize: "48px", color: "#d9d9d9" }}>📷</span>
            </div>
          </Col>
          <Col
            span={18}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2 style={{ margin: 0 }}>{component.name}</h2>
            <p style={{ margin: "8px 0", fontSize: "14px", color: "#555" }}>
              {component.description}
            </p>
            <div
              style={{
                display: "inline-block",
                padding: "5px 15px",
                backgroundColor: "#f0f2f5",
                borderRadius: "15px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "10px",
                maxWidth: "150px",
              }}
            >
              QTD: {component.quantity}
            </div>
          </Col>
        </Row>
      </Card>

      {/* Tutorial de Uso */}
      {component.tutorialLink && (
        <Card style={{ marginBottom: "20px", padding: "10px" }}>
          <Row align="middle" justify="space-between">
            <Col>
              <h3 style={{ margin: 0, textAlign: "left" }}>
                Acessar Tutorial de Uso
              </h3>
            </Col>
            <Col>
              <Button
                type="link"
                icon={isTutorialVisible ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setTutorialVisible(!isTutorialVisible)}
              />
            </Col>
          </Row>
          {isTutorialVisible && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <iframe
                width="560"
                height="315"
                src={getYouTubeEmbedLink(component.tutorialLink)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </Card>
      )}

      {/* Ideias de Projetos */}
      {component.projectIdeas && (
        <Card style={{ marginBottom: "20px", padding: "10px" }}>
          <Row align="middle" justify="space-between">
            <Col>
              <h3 style={{ margin: 0, textAlign: "left" }}>
                Acessar Ideias de Projetos
              </h3>
            </Col>
            <Col>
              <Button
                type="link"
                icon={isProjectsVisible ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setProjectsVisible(!isProjectsVisible)}
              />
            </Col>
          </Row>
          {isProjectsVisible && (
            <div style={{ marginTop: "10px", textAlign: "left" }}>
              <p>{component.projectIdeas}</p>
            </div>
          )}
        </Card>
      )}

      {/* Uso de Bibliotecas */}
      {component.librarySuggestions && (
        <Card style={{ marginBottom: "20px", padding: "10px" }}>
          <Row align="middle" justify="space-between">
            <Col>
              <h3 style={{ margin: 0, textAlign: "left" }}>
                Acessar Sugestões de Bibliotecas
              </h3>
            </Col>
            <Col>
              <Button
                type="link"
                icon={isLibrariesVisible ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setLibrariesVisible(!isLibrariesVisible)}
              />
            </Col>
          </Row>
          {isLibrariesVisible && (
            <div style={{ marginTop: "10px", textAlign: "left" }}>
              <p>{component.librarySuggestions}</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default ComponentDetailsStudent;
