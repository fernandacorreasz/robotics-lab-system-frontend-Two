import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Input, Button, List } from 'antd';
import forumData from '../../assets/data-teste/forumData.json'; // Importar o arquivo JSON
import { Post } from '../../models/Post';
import { CommentForum } from '../../models/CommentForum';

const { TextArea } = Input;

const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const foundPost = forumData.find((p) => p.id === Number(postId));
    if (foundPost) {
      setPost(foundPost);
    }
  }, [postId]);

  const handleCommentSubmit = () => {
    if (post) {
      const newCommentData: CommentForum = {
        id: post.comments.length + 1,
        content: newComment,
        author: 'Usuário 3',
        date: new Date().toLocaleDateString(),
      };
      setPost({
        ...post,
        comments: [...post.comments, newCommentData],
      });
      setNewComment('');
    }
  };

  if (!post) {
    return <div>Loading...</div>; // Caso não encontre o post
  }

  // Adicionando comentários de exemplo
  const exampleComments: CommentForum[] = [
    { id: 1, content: 'Experimente usar o IDE do Arduino.', author: 'Usuário 2', date: '02/01/2024' },
    { id: 2, content: 'Tente verificar suas conexões.', author: 'Usuário 4', date: '03/01/2024' },
    { id: 3, content: 'O Raspberry Pi é muito versátil.', author: 'Usuário 5', date: '04/01/2024' },
    { id: 4, content: 'Você pode usar bibliotecas específicas.', author: 'Usuário 6', date: '05/01/2024' },
    { id: 5, content: 'Faça testes com diferentes sensores.', author: 'Usuário 7', date: '06/01/2024' },
  ];

  // Incorporando os comentários de exemplo ao post
  const combinedComments = [...post.comments, ...exampleComments];

  return (
    <div style={{ padding: '20px', textAlign: 'left' }}>
      {/* Card com detalhes do post */}
      <Card
        style={{
          backgroundColor: '#00BFFF', // Cor de fundo azul claro
          color: '#fff',
          marginBottom: '20px',
        }}
      >
        <h2>{post.title}</h2>
        <p>
          <strong>Autor:</strong> {post.author} | <strong>Data:</strong> {post.date}
        </p>
        <p>{post.content}</p>
      </Card>


      {/* Listagem de comentários */}
      <Card title="Comentários" style={{ background:'#f1f1f1', textAlign: 'left' }}>
        <List style={{ maxHeight: '300px', overflowY: 'scroll',background:'#fff', padding:'10px' }}
          itemLayout="vertical"
          dataSource={combinedComments}
          renderItem={(comment) => (
            <List.Item style={{ marginBottom: '10px', textAlign: 'left'}}>
              <List.Item.Meta
                title={<span style={{ textAlign: 'left' }}>{comment.author}</span>}
                description={
                  <>
                  <p style={{ fontSize: 'small', color: 'gray', textAlign: 'left' }}>{comment.date}</p>
                    <p style={{ textAlign: 'left' }}>{comment.content}</p>
                    
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>

           {/* Card para adicionar comentários */}
           <Card title="Deixe seu comentário" style={{ marginTop: '20px', background:'#f1f1f1' }}>
        <TextArea
          placeholder="Aqui você poderá digitar"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          style={{ marginBottom: '10px'}}
        />
        <Button
          type="primary"
          onClick={handleCommentSubmit}
          style={{ backgroundColor: '#add8e6', color: '#000', borderColor: '#add8e6' }}
        >
          Botão de Confirmar
        </Button>
      </Card>
    </div>
  );
};

export default PostDetails;
