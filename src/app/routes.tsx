import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardHome } from "./pages/DashboardHome";
import { NewProjectWizard } from "./pages/NewProjectWizard";
import { AuditChat } from "./pages/AuditChat";
import { AuditChatStreaming } from "./pages/AuditChatStreaming";
import { ReportPreview } from "./pages/ReportPreview";
import { SystemSettings } from "./pages/SystemSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: LoginPage,
      },
      {
        path: "dashboard",
        Component: DashboardLayout,
        children: [
          { index: true, Component: DashboardHome },
          { path: "new-project", Component: NewProjectWizard },
          { path: "audit-chat", Component: AuditChat },
          { path: "audit-chat-streaming", Component: AuditChatStreaming },
          { path: "report", Component: ReportPreview },
          { path: "settings", Component: SystemSettings },
        ],
      },
    ],
  },
]);