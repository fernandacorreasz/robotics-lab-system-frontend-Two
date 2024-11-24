import React, { useEffect, useState } from "react";
import { Card, Row, Col, message } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { fetchActivitiesByUserId } from "../../services/ActivityService";
import { fetchForums } from "../../services/forumService";
import { Activity } from "../../models/Activity";
import { Forum } from "../../models/Forum";
import HeaderCardDashboard from "../../components/Cards/HeaderCardDashboard";

const DashboardStudent: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [forums, setForums] = useState<Forum[]>([]);
  const [activityMetrics, setActivityMetrics] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  });
  const [forumMetrics, setForumMetrics] = useState({
    questions: 0,
    comments: 0,
  });

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  useEffect(() => {
    const loadDashboardData = async () => {
      const userName = localStorage.getItem("name") || "";

      try {
        // Carregar atividades
        const userId = localStorage.getItem("userId");
        if (userId) {
          const activitiesData = await fetchActivitiesByUserId(userId);
          setActivities(activitiesData);

          const metrics = activitiesData.reduce(
            (acc, activity) => {
              acc.total += 1;
              if (activity.activityStatus === "COMPLETED") {
                acc.completed += 1;
              } else if (activity.activityStatus === "IN_PROGRESS") {
                acc.inProgress += 1;
              } else if (activity.activityStatus === "NOT_STARTED") {
                acc.notStarted += 1;
              }
              return acc;
            },
            { total: 0, completed: 0, inProgress: 0, notStarted: 0 }
          );

          setActivityMetrics(metrics);
        }

        // Carregar fóruns
        const forumsData = await fetchForums([], 0, 100);
        setForums(forumsData.content);

        const forumMetrics = forumsData.content.reduce(
          (acc, forum) => {
            if (forum.userName === userName) {
              acc.questions += 1;
            }
            forum.comments.forEach((comment) => {
              if (comment.userName === userName) {
                acc.comments += 1;
              }
            });
            return acc;
          },
          { questions: 0, comments: 0 }
        );

        setForumMetrics(forumMetrics);
      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : "Erro ao carregar os dados do dashboard."
        );
      }
    };

    loadDashboardData();
  }, []);

  const totalTimeSpent = activities.reduce(
    (acc, activity) => acc + activity.timeSpent,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <HeaderCardDashboard />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Distribuição de Atividades por Status">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Concluídas", value: activityMetrics.completed },
                    { name: "Em Progresso", value: activityMetrics.inProgress },
                    { name: "Não Iniciadas", value: activityMetrics.notStarted },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {["Concluídas", "Em Progresso", "Não Iniciadas"].map(
                    (_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    )
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              Veja como estão distribuídas as suas atividades.
            </p>
          </Card>
        </Col>

        {/* Contribuições no Fórum - Gráfico de Barras */}
        <Col span={12}>
          <Card title="Contribuições no Fórum">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Perguntas", value: forumMetrics.questions },
                  { name: "Comentários", value: forumMetrics.comments },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              Suas contribuições no fórum (perguntas e comentários).
            </p>
          </Card>
        </Col>

        {/* Tempo Total Gasto em Atividades */}
        <Col span={12}>
          <Card title="Tempo Total Gasto em Atividades">
            <h3 style={{ textAlign: "center", fontSize: "40px", color: "#82ca9d" }}>
              {Math.floor(totalTimeSpent / 60)}h {totalTimeSpent % 60}m
            </h3>
            <p style={{ textAlign: "center" }}>
              Este é o tempo total que você dedicou às suas atividades.
            </p>
          </Card>
        </Col>

        {/* Perguntas Recentes */}
        <Col span={24}>
          <Card title="Perguntas Recentes no Fórum">
            {forums
              .filter((forum) => forum.userName === localStorage.getItem("name"))
              .slice(0, 3)
              .map((forum) => (
                <div
                  key={forum.id}
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                  }}
                >
                  <h4>{forum.title}</h4>
                  <p>{forum.description}</p>
                  <p>Data de Criação: {new Date(forum.creationDate).toLocaleDateString()}</p>
                </div>
              ))}
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Estas são suas perguntas mais recentes no fórum.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardStudent;
