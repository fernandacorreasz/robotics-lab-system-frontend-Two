import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Tag, message } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Forum } from "../../../models/Forum";
import { fetchPostDetails } from "../../../services/forumService";
import CommentsSection from "./CommentsSectionForum";

const PostDetails: React.FC = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Forum | null>(null);
  const [isPostExpanded, setIsPostExpanded] = useState(true);

  useEffect(() => {
    if (postId) {
      loadPostDetails(postId);
    }
  }, [postId]);

  const loadPostDetails = async (id: string) => {
    try {
      const data = await fetchPostDetails(id);
      setPost(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(
          error.message || "Erro ao carregar os detalhes da postagem."
        );
      } else {
        message.error("Erro inesperado ao carregar os detalhes da postagem.");
      }
    }
  };

  if (!post) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <h4 style={{ margin: 0, color: "#fff" }}>Detalhes do Post</h4>
            <Button
              type="link"
              icon={isPostExpanded ? <UpOutlined /> : <DownOutlined />}
              onClick={() => setIsPostExpanded(!isPostExpanded)}
              style={{ color: "#fff" }}
            />
          </div>
        }
        style={{
          marginBottom: "20px",
        }}
        headStyle={{
          backgroundColor: "#69c4d3",
          color: "#fff",
        }}
      >
        {isPostExpanded && (
          <>
            <h2 style={{ textAlign: "left" }}>{post.title}</h2>
            <p style={{ textAlign: "left" }}>{post.description}</p>
            {post.codeSnippet && (
              <div style={{ maxWidth: "80%", margin: "10px 0" }}>
                <SyntaxHighlighter language="javascript" style={prism}>
                  {post.codeSnippet}
                </SyntaxHighlighter>
              </div>
            )}
            <p style={{ textAlign: "left" }}>
              Criado por: <strong>{post.userName}</strong> em{" "}
              {new Date(post.creationDate).toLocaleDateString()}
            </p>
            <div style={{ marginTop: "10px", textAlign: "left" }}>
              <strong>Tags:</strong>
              <div style={{ marginTop: "5px" }}>
                {post.tags.map((tag) => (
                  <Tag key={tag.id} color="blue">
                    {tag.name}
                  </Tag>
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <CommentsSection
        comments={post.comments}
        forumId={postId!}
        onCommentAdded={() => loadPostDetails(postId!)}
      />
    </div>
  );
};

export default PostDetails;
