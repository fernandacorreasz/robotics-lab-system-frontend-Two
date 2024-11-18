import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Radar, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Card, Col, Row } from 'antd';
import dashboardData from '../../assets/data-teste/mockDashboardStudantData.json'; // Importar o JSON
import HeaderCard from '../../components/Cards/HeaderCardStudants';

// Tipos para os dados do Dashboard
interface ActivityMetrics {
  totalActivities: number;
  completed: number;
  inProgress: number;
  notStarted: number;
}

interface TimeSpentMetrics {
  labels: string[];
  data: number[];
}

interface ComponentsUsedMetrics {
  labels: string[];
  data: number[];
}

interface ForumMetrics {
  labels: string[];
  data: number[];
}

interface CardData {
  title: string;
  metrics: ActivityMetrics | TimeSpentMetrics | ComponentsUsedMetrics | ForumMetrics;
}

const DashboardStudent: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    // Simulando a requisição da API e setando os dados no estado
    setCards(dashboardData.cards);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <HeaderCard />
      <Row gutter={[16, 16]}>
        {/* Atividades Concluídas - Radar Chart */}
        <Col span={12}>
          <Card title={cards[0]?.title}>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={[
                { subject: 'Concluídas', value: (cards[0]?.metrics as ActivityMetrics)?.completed || 0, fullMark: 50 },
                { subject: 'Em Progresso', value: (cards[0]?.metrics as ActivityMetrics)?.inProgress || 0, fullMark: 50 },
                { subject: 'Não Iniciadas', value: (cards[0]?.metrics as ActivityMetrics)?.notStarted || 0, fullMark: 50 }
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 50]} />
                <Radar name="Atividades" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
            <p>Este gráfico mostra o progresso das atividades, dividindo entre concluídas, em progresso e não iniciadas.</p>
          </Card>
        </Col>

        {/* Tempo Investido - Line Chart */}
        <Col span={12}>
          <Card title={cards[1]?.title}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={(cards[1]?.metrics as TimeSpentMetrics)?.labels.map((label: string, index: number) => ({
                name: label,
                tempo: (cards[1]?.metrics as TimeSpentMetrics)?.data[index]
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tempo" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
            <p>Este gráfico de linha mostra o tempo investido por mês em atividades relacionadas ao laboratório.</p>
          </Card>
        </Col>

        {/* Componentes Utilizados - Bar Chart */}
        <Col span={12}>
          <Card title={cards[2]?.title}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={(cards[2]?.metrics as ComponentsUsedMetrics)?.labels.map((label: string, index: number) => ({
                name: label,
                quantidade: (cards[2]?.metrics as ComponentsUsedMetrics)?.data[index]
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <p>Este gráfico de barras mostra a quantidade de componentes eletrônicos utilizados durante as atividades.</p>
          </Card>
        </Col>

        {/* Participação no Fórum - Bar Chart */}
        <Col span={12}>
          <Card title={cards[3]?.title}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={(cards[3]?.metrics as ForumMetrics)?.labels.map((label: string, index: number) => ({
                name: label,
                valor: (cards[3]?.metrics as ForumMetrics)?.data[index]
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valor" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
            <p>Este gráfico de barras mostra a participação do estudante no fórum, incluindo postagens, respostas e curtidas.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardStudent;
