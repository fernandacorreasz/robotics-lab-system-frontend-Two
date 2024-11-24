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
  DatePicker,
  Row,
  Tag,
} from "antd";
import { UploadOutlined, ClockCircleOutlined } from "@ant-design/icons";
import {
  fetchActivityWithCommentsById,
  fetchActivityPhoto,
  addCommentToActivity,
  updateActivity,
} from "../../../services/ActivityService";
import { ActivityView } from "../../../models/ActivityView";
import StatusTag from "../../../components/StatusDropdown/StatusTag";
import CustomButton from "../../../components/Common/CustomButton";
import CommentList from "../../pageStudent/info/CommentsList";
import PomodoroTimer from "../../pageStudent/info/PomodoroTimer";
import moment from "moment";
import { ActivityUpdatePayload } from "../../../models/ActivityUpdatePayload";

const ViewActivityLaboratorist: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const [activity, setActivity] = useState<ActivityView | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [tempPhotoUrl, setTempPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [isPomodoroVisible, setIsPomodoroVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (activityId) {
      setLoading(true);
      fetchActivityWithCommentsById(activityId)
        .then((data) => setActivity(data))
        .finally(() => setLoading(false));

      fetchActivityPhoto(activityId).then((url) => setPhotoUrl(url));
    }
  }, [activityId]);

  const onFinish = async (values: Partial<ActivityView>) => {
    if (!activityId || !activity) return;

    const updates: ActivityUpdatePayload = {
      activityTitle: values.activityTitle || activity.activityTitle,
      activityDescription: values.activityDescription || activity.activityDescription,
      activityStatus: values.activityStatus || activity.activityStatus,
      timeSpent: values.timeSpent || 0,
      endDate: values.endDate ? moment(values.endDate).valueOf() : null,
    };

    try {
      await updateActivity(activityId, updates);
      message.success("Atividade atualizada com sucesso!");

      setActivity((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          ...updates,
          endDate: updates.endDate ? new Date(updates.endDate).toISOString() : null,
        };
      });

      setIsEditing(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || "Erro ao atualizar atividade");
      } else {
        message.error("Erro desconhecido ao atualizar atividade");
      }
    }
  };
  

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      message.error("Por favor, selecione um arquivo de imagem válido.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTempPhotoUrl(reader.result as string);
      message.success(
        "Imagem carregada com sucesso! Clique em 'Salvar Alterações' para confirmar."
      );
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          message.error(error.message || "Erro ao adicionar comentário");
        } else {
          message.error("Erro desconhecido ao adicionar comentário");
        }
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
   <Card title="Atividade - Laboratorista">
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

        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        <Form
            form={form}
            layout="vertical"
            initialValues={{
              activityTitle: activity.activityTitle,
              activityDescription: activity.activityDescription,
              activityStatus: activity.activityStatus,
              timeSpent: activity.timeSpent || 0,
              endDate: activity.endDate ? moment(activity.endDate) : null,
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
                  setActivity((prev) =>
                    prev ? { ...prev, activityStatus: newStatus } : prev
                  )
                }
              />
            </Form.Item>
            <Form.Item label="Tempo Investido (minutos)" name="timeSpent">
              <Input type="number" disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Data Final" name="endDate">
              <DatePicker
                format="YYYY-MM-DD HH:mm"
                showTime
                disabled={!isEditing}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>

          <div
            style={{
              textAlign: "center",
              width: "30%",
              aspectRatio: "1",
              border: "1px solid #e6e6e6",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            {tempPhotoUrl || photoUrl ? (
              <img
                src={tempPhotoUrl || photoUrl || undefined}
                alt="Foto da Atividade"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#aaa",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Sem Imagem
              </div>
            )}
            <Upload
              beforeUpload={beforeUpload}
              showUploadList={false}
              accept="image/png, image/jpeg, image/gif"
              disabled={!isEditing}
            >
              <Button
                icon={<UploadOutlined />}
                disabled={!isEditing}
                style={{ marginTop: "10px" }}
              >
                Alterar Imagem
              </Button>
            </Upload>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <strong>Componentes Utilizados:</strong>
          <div style={{ marginTop: "10px" }}>
            {activity.componentsUsed.length > 0 ? (
              activity.componentsUsed.map((component) => (
                <Tag key={component.id} color="blue">
                  {component.name}
                </Tag>
              ))
            ) : (
              <p>Nenhum componente associado a esta atividade.</p>
            )}
          </div>
        </div>
        <PomodoroTimer visible={isPomodoroVisible} onClose={closePomodoro} />
        <Row justify="end" style={{ marginTop: "20px" }}>
        <Button
          type="primary"
          onClick={() => form.submit()}
          disabled={!isEditing}
        >
          Salvar Alterações
        </Button>
      </Row>
      </Card>


      <Card
        title="Anotações sobre essa atividade"
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
          style={{ marginTop: "20px", borderColor: "#8e44ad", marginBottom: "20px" }}
        />
        <Row justify="end">
        <CustomButton
          text="Comentar"
          onClick={handleAddComment}
          style={{
            marginTop: "10px",
            backgroundColor: "#8e44ad",
            borderColor: "#8e44ad",
          }}
        /></Row>
      </Card>
    </>
  );
};

export default ViewActivityLaboratorist;
