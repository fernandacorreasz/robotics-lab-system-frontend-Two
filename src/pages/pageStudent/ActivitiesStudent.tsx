import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row, Card, message, Tag } from "antd";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  RightOutlined,
  CalendarOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Activity } from "../../models/Activity";
import { fetchActivitiesByUserId } from "../../services/ActivityService";
import moment from "moment";
import HeaderCard from "../../components/Cards/HeaderCardStudants";
import FilterSection from "./info/FilterSection";
import { statusColors, statusLabels, columnHeaderStyles } from "../../styles/statusStyles";

const ActivitiesStudent: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | moment.Moment | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetchActivitiesByUserId(userId)
        .then((data) => {
          setActivities(data);
          setFilteredActivities(data);
        })
        .catch((error) => message.error(error.message));
    } else {
      message.error("Usuário não identificado.");
    }
  }, []);

  const applyFilter = () => {
    const filtered = activities.filter((activity) => {
      if (!selectedFilter || filterValue === null) return true;

      switch (selectedFilter) {
        case "title":
          return activity.activityTitle
            .toLowerCase()
            .includes((filterValue as string).toLowerCase());
        case "description":
          return activity.activityDescription
            .toLowerCase()
            .includes((filterValue as string).toLowerCase());
        case "status":
          return activity.activityStatus === filterValue;
        case "startDate":
          return moment(activity.startDate).isSame(filterValue, "day");
        case "endDate":
          return moment(activity.endDate).isSame(filterValue, "day");
        default:
          return true;
      }
    });
    setFilteredActivities(filtered);
  };

  const clearFilter = () => {
    setSelectedFilter(null);
    setFilterValue(null);
    setFilteredActivities(activities);
  };

  const scrollStyle = `
    ::-webkit-scrollbar {
      width: 2px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #e6e6e6;
      border-radius: 10px;
    }
    /* Firefox scrollbar */
    scrollbar-width: thin;
    scrollbar-color: #e6e6e6 transparent;
  `;

  const renderColumn = (status: keyof typeof statusLabels, title: string) => (
    <Col span={5} key={status} style={{ paddingTop: "16px" }}>
      <div
        style={{
          ...columnHeaderStyles[status],
          textAlign: "center",
          padding: "8px",
          fontWeight: "bold",
          borderRadius: "4px 4px 0 0",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          maxHeight: "1000px",
          overflowY: "auto",
          paddingRight: "4px",
        }}
      >
        <style>{scrollStyle}</style>
        {filteredActivities
          .filter((activity) => activity.activityStatus === status)
          .map((activity) => (
            <Card
              key={activity.id}
              style={{
                marginBottom: 8,
                borderColor: "#e6e6e6",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              actions={[
                <DeleteOutlined onClick={() => console.log("Excluir", activity)} style={{ color: "#f5222d" }} />,
                <Link to={`/student/activities/view/${activity.id}`}>
                  <RightOutlined style={{ color: "#52c41a" }} />
                </Link>,
              ]}
            >
              <div
                style={{
                  backgroundColor: columnHeaderStyles[status].backgroundColor,
                  padding: "8px",
                  borderRadius: "8px 8px 0 0",
                  color: "#ffffff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {activity.activityTitle}
              </div>
              <div style={{ padding: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "6px", fontSize: "12px" }}>
                  <InfoCircleOutlined style={{ color: "#8e44ad", marginRight: 4 }} />
                  <span>{activity.activityDescription}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "4px", fontSize: "12px" }}>
                  <ClockCircleOutlined style={{ color: "#1890ff", marginRight: 4 }} />
                  <span>{Math.floor(activity.timeSpent / 60)}h {activity.timeSpent % 60}m</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "4px", fontSize: "12px" }}>
                  <CalendarOutlined style={{ color: "#faad14", marginRight: 4 }} />
                  <span>{new Date(activity.startDate).toLocaleDateString()} - {new Date(activity.endDate).toLocaleDateString()}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: "#8c8c8c" }}>
                  <UserOutlined style={{ marginRight: 4 }} />
                  {activity.userEmail}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
                  <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </Col>
  );

  return (
    <div style={{ padding: "16px" }}>
      <HeaderCard />
      <Card title="Ações na página" style={{ marginBottom: 16 }}>
        <Row justify="space-between">
          <Col>
            <FilterSection
              selectedFilter={selectedFilter}
              filterValue={filterValue}
              onFilterChange={setSelectedFilter}
              onFilterValueChange={setFilterValue}
              onApplyFilter={applyFilter}
              onClearFilter={clearFilter}
            />
          </Col>
          <Col>
            <Button type="primary" style={{ marginRight: 8 }}>
              Relatório
            </Button>
            <Button type="primary">
              <Link to="/student/activities/add" style={{ color: "white" }}>
                Adicionar Atividade
              </Link>
            </Button>
          </Col>
        </Row>
      </Card>
      <Row gutter={16} justify="space-between">
        {renderColumn("NOT_STARTED", "Não Iniciado")}
        {renderColumn("IN_PROGRESS", "Em Progresso")}
        {renderColumn("COMPLETED", "Concluída")}
        {renderColumn("CANCELED", "Cancelada")}
      </Row>
    </div>
  );
};

export default ActivitiesStudent;
