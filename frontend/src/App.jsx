import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Dashboard/Admin";
import Home from "./pages/Home";
import Product from "./components/Dashboard/Admin/Product";
import LandingPage from "./components/Home/LandingPage";
import LoginForm from "./components/Common/LoginForm";
import SignupForm from "./components/Common/SignupForm";
import LabInventoryManagement from "./pages/Dashboard/Temp";
import RequestedInventory from "./components/Dashboard/Common/RequestedInventory";
import IssuedInventory from "./components/Dashboard/Common/IssuedInventory";
import StudentOutlet from "./components/Dashboard/Admin/StudentOutlet";
import Student from "./pages/Dashboard/Student";
import ErrorPage from "./pages/ErrorPage";
import Inventory from "./pages/Inventory";
import InventoryItem from "./components/inventory/InventoryItem";
import InventoryCardsPage from "./pages/Inventory";
import AddInventoryItem from "./components/Dashboard/Admin/AddInventoryItem";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Home></Home>,
    children:[
      {
        index:true,
        element:<LandingPage/>
      },
      {
        path:"/inventory",
        element:<Inventory/>,
        children:[
          {
            path:"inventoryItem",
            element:<InventoryItem/>
          }
        ]
      },
      {
        path:"signin",
        element:<LoginForm/>
      },
      {
        path:"signup",
        element:<SignupForm/>
      },
      {
        path:"test",
        element:<LabInventoryManagement/>
      },
      {
        path: "admin-dashboard",
        element: <Admin/>,
        children: [
          {
            path: "student",
            element: <StudentOutlet />
          },
          {
            path: "inventory",
            element: <Product/>
          },
          {
            path : "requestedInventory",
            element : <RequestedInventory/>
          },
          {
            path : "issuedInventory",
            element:<IssuedInventory/>
          },
          {
            path:"addInventoryItem",
            element:<AddInventoryItem/>
          }
        ],
      },
      {
        path:"student-dashboard",
        element:<Student/>,
        children:[
          {
            path:"requestedInventory",
            element: <RequestedInventory/>
          },
          {
            path:"issuedInventory",
            element:<IssuedInventory/>
          }
        ]
      }

    ],
  },
  
  {
    path:"*",
    element:<ErrorPage/>
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
