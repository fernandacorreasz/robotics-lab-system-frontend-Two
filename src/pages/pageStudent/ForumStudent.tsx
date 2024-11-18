import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import forumData from '../../assets/data-teste/forumData.json'; // Importar o arquivo JSON

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  comments: CommentForum[];
}

interface CommentForum {
  id: number;
  content: string;
  author: string;
  date: string;
}

const ForumStudent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterText, setFilterText] = useState('');
  const [showMyPosts, setShowMyPosts] = useState(false);
  const currentUser = "NomeDoUsuario"; // Substitua pelo nome do usuário atual

  useEffect(() => {
    // Carregar os dados do JSON
    setPosts(forumData as Post[]);
  }, []);

  const filteredPosts = posts.filter(post =>
    (post.title.toLowerCase().includes(filterText.toLowerCase()) ||
    post.content.toLowerCase().includes(filterText.toLowerCase())) &&
    (!showMyPosts || post.author === currentUser) // Filtra por autor se showMyPosts for verdadeiro
  );

  return (
    <div style={{ padding: '20px' }}>
  

  <Card
        style={{
          marginBottom: "20px",
          padding: "12px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row align="middle" justify="start">
          <Col span={20}>
            <h4 style={{ color: "#8e44ad", margin: 0, textAlign: "left" }}>
              Fique atento às suas notificações
            </h4>
            <p style={{ margin: 0, textAlign: "left" }}>
              Aqui você terá as notificações sobre suas atividades e atrasos de empréstimos, respostas de fórum e muito mais.
            </p>
          </Col>
        </Row>
      </Card>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Input
            placeholder="Filtrar Pergunta"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Button
            type={showMyPosts ? "primary" : "default"}
            onClick={() => setShowMyPosts(!showMyPosts)}
            style={{ width: '100%' }}
          >
            Minhas Perguntas
          </Button>
        </Col>
        <Col span={6}>
          <Link to="/student/forum/add" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
            <Button type="primary" style={{ backgroundColor: '#add8e6', color: '#000', borderColor: '#add8e6' }}>
              Add Pergunta
            </Button>
          </Link>
        </Col>
      </Row>

      <Row gutter={16}>
        {filteredPosts.map((post) => (
          <Col span={8} key={post.id} style={{ marginBottom: '20px' }}>
            <Card title={post.title} style={{ borderRadius: '8px' }}>
              <p>
                <strong>Autor:</strong> {post.author} | <strong>Data:</strong> {post.date}
              </p>
              <p>{post.content}</p>
              <Link to={`/student/forum/${post.id}`}>
                <Button style={{ backgroundColor: '#add8e6', color: '#000', borderColor: '#add8e6' }}>
                  Ver Comentários
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ForumStudent;
