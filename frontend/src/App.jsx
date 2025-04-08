import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Dashboard/Admin";
import Home from "./pages/Home";
import Product from "./components/Dashboard/Admin/Product";
import LandingPage from "./components/Home/LandingPage";
import LoginForm from "./components/Common/LoginForm";
import SignupForm from "./components/Common/SignupForm";
import RequestedInventory from "./components/Dashboard/Admin/RequestedInventory";
import IssuedInventory from "./components/Dashboard/Admin/IssuedInventory";
import StudentOutlet from "./components/Dashboard/Admin/StudentOutlet";
import Student from "./pages/Dashboard/Student";
import ErrorPage from "./pages/ErrorPage";
import Inventory from "./pages/Inventory";
import InventoryItem from "./components/inventory/InventoryItem";
import AddInventoryItem from "./components/Dashboard/Admin/AddInventoryItem";
import UserProfile from "./components/Dashboard/Common/UserProfile";
import StudentRequestsTable from "./components/Dashboard/Admin/StudentRequestsTable";
import StudentIssuedTable from "./components/Dashboard/Admin/StudentIssuedTable";
import RequestedInventoryItem from "./components/Dashboard/Student/RequestedInventoryItem";
import IssuedInventoryItem from "./components/Dashboard/Student/IssuedInventoryItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "inventory/:id",
        element: <InventoryItem />,
      },
      {
        path: "signin",
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <SignupForm />,
      },
      {
        path: "admin-dashboard",
        element: <Admin />,
        children: [
          {
            index: true,
            element: <UserProfile />,
          },
          {
            path: "student",
            element: <StudentOutlet />,
          },
          {
            path: "inventory",
            element: <Product />,
          },
          {
            path:"inventory/editInventoryItem/:id",
            element:<AddInventoryItem/>
          },
          {
            path: "requestedInventory",
            element: <RequestedInventory />,
          },
          {
            path: "requestedInventory/:id",
            element: <StudentRequestsTable />,
          },
          {
            path: "issuedInventory",
            element: <IssuedInventory />,
          },
          {
            path: "issuedInventory/:id",
            element: <StudentIssuedTable />,
          },
          {
            path: "addInventoryItem",
            element: <AddInventoryItem />,
          },
        ],
      },
      {
        path: "student-dashboard",
        element: <Student />,
        children: [
          {
            index: true,
            element: <UserProfile />,
          },
          {
            path: "requestedInventory",
            element: <RequestedInventoryItem />,
          },
          {
            path: "issuedInventory",
            element: <IssuedInventoryItem />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
