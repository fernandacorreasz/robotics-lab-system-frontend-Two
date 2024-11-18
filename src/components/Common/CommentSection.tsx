import React, { useState } from 'react';
import { List, Input, Button, Form } from 'antd';

const CustomComment: React.FC<{ comments: string[], onAddComment: (comment: string) => void }> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState<string>('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div>
      <List
        header={<div>Comentários</div>}
        bordered
        dataSource={comments}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{ maxHeight: '200px', overflowY: 'auto' }}
      />
      <Form.Item>
        <Input
          placeholder="Adicionar um comentário"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="primary" onClick={handleAddComment} style={{ marginLeft: '10px' }}>
          Adicionar
        </Button>
      </Form.Item>
    </div>
  );
};

export default CustomComment;
