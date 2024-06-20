import { PageLayout } from "@/components/layouts";

import {
  AdminPage,
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
import StudentBadgeCerts from "@/pages/student/student_badge_certs";

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
    },
    {
      path: "student",
      element: <StudentPage />,
    },
    {
      path:"student_badge_certifications",
      element: <StudentBadgeCerts/>
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
