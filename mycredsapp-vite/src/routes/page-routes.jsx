import { PageLayout } from "@/components/layouts";

import {
  AdminPage,
  AdminListPage,
  AdminCreatePage,
  AdminEditPage,
  AdminViewPage,
  BadgePage,
  CertificateTemplatePage,
  CoursePage,
  DashboardPage,
  InstitutionPage,
  ProfilePage,
  RolesPage,
  SettingsPage,
  StudentPage,
} from "@/pages";

const PageRoutes = {
  id: "page",
  path: "/",
  element: <PageLayout />,
  children: [
    {
      index: true,
      element: <DashboardPage />,
    },
    {
      path: "admin",
      element: <AdminPage />,
      children: [
        {
          index: true,
          element: <AdminListPage />,
        },
        {
          path: "create",
          element: <AdminCreatePage />,
        },
        {
          path: "edit/:id",
          element: <AdminEditPage />,
        },
        {
          path: "view/:id",
          element: <AdminViewPage />,
        },
      ],
    },
    {
      path: "student",
      element: <StudentPage />,
    },
    {
      path: "institution",
      element: <InstitutionPage />,
    },
    {
      path: "cert-template",
      element: <CertificateTemplatePage />,
    },
    {
      path: "course",
      element: <CoursePage />,
    },
    {
      path: "badge",
      element: <BadgePage />,
    },
    {
      path: "roles",
      element: <RolesPage />,
    },
    {
      path: "settings",
      element: <SettingsPage />,
    },
    {
      path: "profile",
      children: [
        {
          index: true,
          element: <ProfilePage />,
        },
      ],
    },
  ],
};

export default PageRoutes;
