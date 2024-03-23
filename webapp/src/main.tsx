import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UsersListPage } from "./pages/UsersListPage.tsx";
import { UserDetail } from "./pages/UserDetailPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { AboutPage } from "./pages/AboutPage.tsx";
import { getAllUsers, getUserById } from "./api/UsersApi.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,

    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "users",
        loader: async () => {
          const users = await getAllUsers();
          return { users };
        },
        element: <UsersListPage />,
      },
      {
        path: "users/:userId",
        loader: async ({ params }) => {
          const user = await getUserById(+params.userId!);
          return { user };
        },
        element: <UserDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
