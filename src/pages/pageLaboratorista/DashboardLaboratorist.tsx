import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import { Card, Row, Col, message } from "antd";
import { fetchActivitiesByUserId } from "../../services/ActivityService";
import { listLoans } from "../../services/LoanService";
import { fetchForums } from "../../services/forumService";
import { ActivityMetrics, LoanChartData, Loan } from "../../models/interfaces";
import { Forum } from "../../models/Forum";
import { Activity } from "../../models/Activity";
import HeaderCardDashboardLab from "../../components/Cards/HeaderCardDashboardLab";

const DashboardLaboratorist: React.FC = () => {
  const [activityMetrics, setActivityMetrics] = useState<ActivityMetrics>({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    canceled: 0,
  });
  const [loanChartData, setLoanChartData] = useState<LoanChartData[]>([]);
  const [forumMetrics, setForumMetrics] = useState({ questions: 0, comments: 0 });
  const [forumChartData, setForumChartData] = useState<
    { month: string; questions: number; comments: number }[]
  >([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    const loadDashboardData = async () => {
      const userName = localStorage.getItem("name") || "";

      try {
        // Fetch atividades
        const userId = localStorage.getItem("userId");
        if (userId) {
          const activitiesData = await fetchActivitiesByUserId(userId);
          setActivities(activitiesData);

          const metrics = activitiesData.reduce(
            (acc: ActivityMetrics, activity) => {
              acc.total += 1;
              if (activity.activityStatus === "COMPLETED") {
                acc.completed += 1;
              } else if (activity.activityStatus === "IN_PROGRESS") {
                acc.inProgress += 1;
              } else if (activity.activityStatus === "NOT_STARTED") {
                acc.notStarted += 1;
              } else if (activity.activityStatus === "CANCELED") {
                acc.canceled += 1;
              }
              return acc;
            },
            { total: 0, completed: 0, inProgress: 0, notStarted: 0, canceled: 0 }
          );

          setActivityMetrics(metrics);
        }

        // Fetch empréstimos
        const loanResponse = await listLoans(0, 100);
        const monthlyLoans = loanResponse.content.reduce((acc: Record<string, number>, loan: Loan) => {
          const month = new Date(loan.loanDate).toLocaleString("default", {
            month: "short",
          });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        const formattedLoanData: LoanChartData[] = Object.entries(monthlyLoans).map(
          ([month, count]) => ({ month, count })
        );

        setLoanChartData(formattedLoanData);

        // Fetch fóruns
        const forumResponse = await fetchForums([], 0, 100);
        const monthlyForumData = forumResponse.content.reduce(
          (acc: Record<string, { questions: number; comments: number }>, forum: Forum) => {
            const month = new Date(forum.creationDate).toLocaleString("default", {
              month: "short",
            });
            acc[month] = acc[month] || { questions: 0, comments: 0 };
            acc[month].questions += 1;
            acc[month].comments += forum.comments.length;
            return acc;
          },
          {}
        );

        const forumMetrics = forumResponse.content.reduce(
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

        const formattedForumData = Object.entries(monthlyForumData).map(
          ([month, data]) => ({
            month,
            questions: data.questions,
            comments: data.comments,
          })
        );

        setForumMetrics(forumMetrics);
        setForumChartData(formattedForumData);
      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : "Erro ao carregar dados do dashboard."
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
      <HeaderCardDashboardLab />
      <Row gutter={[16, 16]}>
        {/* Radar Chart - Progresso de Atividades */}
        <Col span={12}>
          <Card title="Progresso de Atividades">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart
                outerRadius={90}
                data={[
                  { subject: "Concluído", value: activityMetrics.completed },
                  { subject: "Em Progresso", value: activityMetrics.inProgress },
                  { subject: "Não Iniciado", value: activityMetrics.notStarted },
                  { subject: "Cancelado", value: activityMetrics.canceled },
                ]}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, activityMetrics.total]} />
                <Radar
                  name="Status"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
            <p>Este gráfico mostra o status das atividades associadas ao laboratorista.</p>
          </Card>
        </Col>

        {/* Empréstimos Solicitados - Bar Chart */}
        <Col span={12}>
          <Card title="Empréstimos Solicitados">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={loanChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <p>Este gráfico mostra a quantidade de empréstimos solicitados ao longo dos meses.</p>
          </Card>
        </Col>

        {/* Fórum - Perguntas e Comentários */}
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
            <p>Suas contribuições no fórum (perguntas e comentários).</p>
          </Card>
        </Col>

        {/* Tempo Total Gasto em Atividades */}
        <Col span={12}>
          <Card title="Tempo Total Gasto em Atividades">
            <h3 style={{ textAlign: "center", fontSize: "40px", color: "#82ca9d" }}>
              {Math.floor(totalTimeSpent / 60)}h {totalTimeSpent % 60}m
            </h3>
            <p>Este é o tempo total que você dedicou às suas atividades.</p>
          </Card>
        </Col>

        {/* Fórum Mensal - Gráfico de Barras */}
        <Col span={24}>
          <Card title="Atividade Mensal no Fórum">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={forumChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="questions" stackId="a" fill="#82ca9d" name="Perguntas" />
                <Bar dataKey="comments" stackId="a" fill="#8884d8" name="Comentários" />
              </BarChart>
            </ResponsiveContainer>
            <p>Quantidade de perguntas e comentários feitos no fórum ao longo dos meses.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardLaboratorist;
