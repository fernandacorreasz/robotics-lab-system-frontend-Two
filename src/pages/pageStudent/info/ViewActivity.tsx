import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  message,
  Upload,
  Switch,
  Button,
} from "antd";
import { UploadOutlined, ClockCircleOutlined } from "@ant-design/icons";
import {
  fetchActivityWithCommentsById,
  fetchActivityPhoto,
  addCommentToActivity,
} from "../../../services/ActivityService";
import { ActivityView } from "../../../models/ActivityView";
import PomodoroTimer from "./PomodoroTimer";
import StatusTag from "../../../components/StatusDropdown/StatusTag";
import CommentList from "./CommentsList";
import CustomButton from "../../../components/Common/CustomButton";

const ViewActivity: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const [activity, setActivity] = useState<ActivityView | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [tempPhotoUrl, setTempPhotoUrl] = useState<string | null>(null); // Armazena temporariamente a nova foto
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [isPomodoroVisible, setIsPomodoroVisible] = useState(false);

  useEffect(() => {
    if (activityId) {
      setLoading(true);
      fetchActivityWithCommentsById(activityId)
        .then((data) => setActivity(data))
        .catch((error) => message.error(error.message))
        .finally(() => setLoading(false));

      fetchActivityPhoto(activityId)
        .then((url) => setPhotoUrl(url))
        .catch((error) => message.error(error.message));
    }
  }, [activityId]);

  const onFinish = (values: Partial<ActivityView>) => {
    console.log("Form values:", values);
    setPhotoUrl(tempPhotoUrl); // Confirma a imagem temporária ao salvar
    message.success("Atividade atualizada com sucesso!");
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      message.error("Por favor, selecione um arquivo de imagem válido.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTempPhotoUrl(reader.result as string); // Armazena a imagem temporariamente
      message.success("Imagem carregada com sucesso! Clique em 'Salvar Alterações' para confirmar.");
    };
    reader.readAsDataURL(file);
  };

  const beforeUpload = (file: File) => {
    handleImageUpload(file);
    return false;
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      if (newComment.length > 120) {
        message.error("O comentário não pode exceder 120 caracteres.");
        return;
      }

      try {
        await addCommentToActivity(activityId!, newComment);
        setActivity((prev) => {
          if (prev) {
            return {
              ...prev,
              comments: [
                ...prev.comments,
                {
                  id: `${Date.now()}`,
                  text: newComment,
                  createdDate: new Date().toISOString(),
                },
              ],
            };
          }
          return prev;
        });
        setNewComment("");
        message.success("Comentário adicionado com sucesso!");
      } catch (error: any) {
        message.error(error.message || "Erro ao adicionar comentário");
      }
    } else {
      message.error("Digite um comentário.");
    }
  };

  const handleEditComment = (commentId: string) => {
    console.log("Edit comment with ID:", commentId);
    message.info("Função de edição de comentário será implementada");
  };

  const handleDeleteComment = (commentId: string) => {
    console.log("Delete comment with ID:", commentId);
    setActivity((prev) => {
      if (prev) {
        return {
          ...prev,
          comments: prev.comments.filter((comment) => comment.id !== commentId),
        };
      }
      return prev;
    });
    message.success("Comentário excluído com sucesso!");
  };

  const openPomodoro = () => {
    setIsPomodoroVisible(true);
  };

  const closePomodoro = () => {
    setIsPomodoroVisible(false);
  };

  if (loading) return <p>Carregando...</p>;
  if (!activity) return <p>Atividade não encontrada</p>;

  return (
    <>
      <Card title="Atividade">
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>Modo de Edição:</span>
          <Switch
            checked={isEditing}
            onChange={(checked) => setIsEditing(checked)}
            checkedChildren="Ativo"
            unCheckedChildren="Desativado"
          />
          <Button
            type="default"
            style={{
              marginLeft: "10px",
              backgroundColor: "#E6E6FA",
              borderColor: "#E6E6FA",
              color: "#4B0082",
            }}
            onClick={openPomodoro}
            icon={<ClockCircleOutlined />}
          >
            Pomodoro
          </Button>
        </div>

        <div
          style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
        >
          <Form
            layout="vertical"
            initialValues={{
              activityTitle: activity.activityTitle,
              activityDescription: activity.activityDescription,
              activityStatus: activity.activityStatus,
              timeSpent: activity.timeSpent,
              startDate: activity.startDate,
              endDate: activity.endDate,
            }}
            onFinish={onFinish}
            style={{ flex: 1 }}
          >
            <Form.Item label="Título" name="activityTitle">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Descrição" name="activityDescription">
              <Input.TextArea disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Status" name="activityStatus">
              <StatusTag
                status={activity.activityStatus}
                editable={isEditing}
                onChange={(newStatus) =>
                  setActivity(
                    (prev) => prev && { ...prev, activityStatus: newStatus }
                  )
                }
              />
            </Form.Item>
            <Form.Item label="Tempo Investido (minutos)" name="timeSpent">
              <Input type="number" disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Data Inicial" name="startDate">
              <Input type="date" disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Data Final" name="endDate">
              <Input type="date" disabled={!isEditing} />
            </Form.Item>
            <Button type="primary" htmlType="submit" disabled={!isEditing}>
              Salvar Alterações
            </Button>
          </Form>

          <div style={{ textAlign: "center", width: "30%", aspectRatio: "1" }}>
            <img
              src={tempPhotoUrl || photoUrl}
              alt="Foto da Atividade"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Garante que a imagem preencha o contêiner sem distorção
                borderRadius: "8px",
              }}
            />
            <Upload
              beforeUpload={beforeUpload}
              showUploadList={false}
              accept="image/png, image/jpeg, image/gif"
              disabled={!isEditing} // Desativa o upload quando não está no modo de edição
            >
              <Button icon={<UploadOutlined />} disabled={!isEditing}>
                Alterar Imagem
              </Button>
            </Upload>
          </div>
        </div>
        <PomodoroTimer visible={isPomodoroVisible} onClose={closePomodoro} />
      </Card>

      <Card
        title="Suas anotações sobre essa atividade"
        style={{ marginTop: "20px" }}
      >
        <CommentList
          comments={activity.comments}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
        />
        <Input.TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Digite seu comentário (máximo 120 caracteres)"
          maxLength={120}
          rows={2}
          style={{ marginTop: "20px", borderColor: "#8e44ad" }}
        />
        <CustomButton
          text="Comentar"
          onClick={handleAddComment}
          style={{
            marginTop: "10px",
            backgroundColor: "#8e44ad",
            borderColor: "#8e44ad",
          }}
        />
      </Card>
    </>
  );
};

export default ViewActivity;
