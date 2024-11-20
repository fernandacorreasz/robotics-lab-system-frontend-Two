import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/login/LoginPage";
import PageAdmin from "../pages/pageAdmin/PageAdmin";
import PageLaboratorist from "../pages/pageLaboratorista/PageLaboratorist";
import PageStudent from "../pages/pageStudent/PageStudent";
import DashboardAdmin from "../pages/pageAdmin/DashboardAdmin";
import ManageUsersAdmin from "../pages/pageAdmin/ManageUsersAdmin";
import CertificatesAdmin from "../pages/pageAdmin/CertificatesAdmin";
import PerformanceReportsAdmin from "../pages/pageAdmin/PerformanceReportsAdmin";
import ForumSACAdmin from "../pages/pageAdmin/ForumSACAdmin";
import ProfileSettingsAdmin from "../pages/pageAdmin/ProfileSettingsAdmin";
import DashboardLaboratorist from "../pages/pageLaboratorista/DashboardLaboratorist";
import ManageActivitiesLaboratorist from "../pages/pageLaboratorista/ManageActivitiesLaboratorist";
import ManageStockLaboratorist from "../pages/pageLaboratorista/ManageStockLaboratorist";
import ManageLoansLaboratorist from "../pages/pageLaboratorista/ManageLoansLaboratorist";
import ForumLaboratorist from "../pages/pageLaboratorista/ForumLaboratorist";
import DashboardStudent from "../pages/pageStudent/DashboardStudent";
import ActivitiesStudent from "../pages/pageStudent/ActivitiesStudent";
import ComponentsLibraryStudent from "../pages/pageStudent/ComponentsLibraryStudent";
import NotificationsStudent from "../pages/pageStudent/NotificationsStudent";
import ForumStudent from "../pages/pageStudent/ForumStudent";
import RequestCertificateStudent from "../pages/pageStudent/RequestCertificateStudent";
import PostDetails from "../components/Forum/PostDetails";
import ViewActivity from "../pages/pageStudent/info/ViewActivity";
import AddActivity from "../pages/pageStudent/info/AddActivity";
import BulkAddComponentsPage from "../pages/pageLaboratorista/info/BulkAddComponentsPage";
import AddActivityLaboratorist from "../pages/pageLaboratorista/info/AddActivityLaboratorist";
import ViewActivityLaboratorist from "../pages/pageLaboratorista/info/ViewActivityLaboratorist"; 
import ComponentDetailsStudent from "../pages/pageStudent/loan/ComponentDetailsStudent";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute requiredPermission={3}>
            <PageAdmin />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="manage-users" element={<ManageUsersAdmin />} />
        <Route path="certificates" element={<CertificatesAdmin />} />
        <Route
          path="performance-reports"
          element={<PerformanceReportsAdmin />}
        />
        <Route path="forum-sac" element={<ForumSACAdmin />} />
        <Route path="profile-settings" element={<ProfileSettingsAdmin />} />
      </Route>

      {/* Laboratorist Routes */}
      <Route
        path="/laboratorist"
        element={
          <PrivateRoute requiredPermission={2}>
            <PageLaboratorist />
          </PrivateRoute>
        }
      >
        <Route
          path="manage-stock/bulk-add"
          element={<BulkAddComponentsPage />}
        />
        <Route path="dashboard" element={<DashboardLaboratorist />} />
        <Route
          path="manage-activities"
          element={<ManageActivitiesLaboratorist />}
        />
        <Route
          path="manage-activities/add"
          element={<AddActivityLaboratorist />}
        />
        <Route
          path="manage-activities/view/:activityId"
          element={<ViewActivityLaboratorist />}
        />{" "}
        <Route path="manage-stock" element={<ManageStockLaboratorist />} />
        <Route path="manage-loans" element={<ManageLoansLaboratorist />} />
        <Route path="forum" element={<ForumLaboratorist />} />
      </Route>
      <Route
        path="/student"
        element={
          <PrivateRoute requiredPermission={1}>
            <PageStudent />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<DashboardStudent />} />
        <Route path="activities" element={<ActivitiesStudent />} />
        <Route path="activities/view/:activityId" element={<ViewActivity />} />
        <Route path="activities/add" element={<AddActivity />} />
        <Route
          path="components-library"
          element={<ComponentsLibraryStudent />}
        /><Route
        path="components-library/:id"
        element={<ComponentDetailsStudent />}
      />
      

        <Route path="notifications" element={<NotificationsStudent />} />
        <Route path="forum" element={<ForumStudent />} />
        <Route path="forum/:postId" element={<PostDetails />} />
        <Route
          path="request-certificate"
          element={<RequestCertificateStudent />}
        />
      </Route>
    </Routes>
  );
};

export const routeNames: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/manage-users": "Gerenciar Usuários",
  "/admin/certificates": "Certificados",
  "/admin/performance-reports": "Relatórios de Desempenho",
  "/admin/forum-sac": "Fórum-SAC",
  "/admin/profile-settings": "Configuração de Perfil",

  "/laboratorist/dashboard": "Dashboard",
  "/laboratorist/manage-activities": "Gerenciar Atividades",
  "/laboratorist/notifications": "Notificações de Alunos",
  "/laboratorist/manage-stock": "Gerenciar Estoque",
  "/laboratorist/manage-loans": "Gerenciar Empréstimos",
  "/laboratorist/forum": "Fórum",
  "/laboratorist/manage-users": "Gerenciar Usuários",

  "/student/dashboard": "Dashboard",
  "/student/activities": "Atividades",
  "/student/components-library": "Biblioteca de Componentes",
  "/student/notifications": "Notificações",
  "/student/forum": "Fórum",
  "/student/reports": "Relatórios",
  "/student/request-certificate": "Solicitar Certificado",
};

export default AppRoutes;
