// CommentList.tsx
import React from "react";
import { List } from "antd";
import { EditOutlined, DeleteOutlined, CommentOutlined } from "@ant-design/icons";
import { Comment } from "../../../models/ActivityView";
import CustomButton from "../../../components/Common/CustomButton";

interface CommentListProps {
  comments: Comment[];
  onEdit: (commentId: string) => void;
  onDelete: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onEdit, onDelete }) => {
  const commentColors = ["#E6E6FA", "#B3E5FC", "#F5F5F5"];

  return (
    <div
      style={{
        maxHeight: "calc(95vh - 120px)",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <style>
        {`
          ::-webkit-scrollbar {
            width: 2px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #00579D;
            border-radius: 10px;
          }
        `}
      </style>
      <List
        dataSource={comments}
        renderItem={(comment, index) => (
          <List.Item
            style={{
              backgroundColor: commentColors[index % commentColors.length],
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
            actions={[
              <CustomButton
                type="link"
                text=""
                icon={<EditOutlined />}
                onClick={() => onEdit(comment.id)}
              />,
              <CustomButton
                type="link"
                text=""
                icon={<DeleteOutlined />}
                onClick={() => onDelete(comment.id)}
                danger
              />,
            ]}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "5px", color: "#888" }}>
                <CommentOutlined style={{ marginRight: "5px" }} />
                <span>{new Date(comment.createdDate).toLocaleString()}</span>
              </div>
              <p style={{ margin: 0, fontWeight: "normal", fontSize: "14px" }}>{comment.text}</p>
            </div>
          </List.Item>
        )}
        locale={{ emptyText: "Nenhum comentário adicionado" }}
      />
    </div>
  );
};

export default CommentList;
