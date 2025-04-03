import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Dashboard/Admin";
import Home from "./pages/Home";
import Product from "./components/Dashboard/Admin/Product";
import LandingPage from "./components/Home/LandingPage";
import LoginForm from "./components/Common/LoginForm";
import SignupForm from "./components/Common/SignupForm";
import LabInventoryManagement from "./pages/Dashboard/Temp";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Home></Home>,
    children:[
      {
        index:true,
        element:<LandingPage></LandingPage>
      },
      {
        path:"signin",
        element:<LoginForm></LoginForm>
      },
      {
        path:"signup",
        element:<SignupForm></SignupForm>
      },
      {
        path:"test",
        element:<LabInventoryManagement></LabInventoryManagement>
      },
      {
        path: "admin-dashboard",
        element: <Admin></Admin>,
        children: [
          {
            path: "student",
            element: <Home></Home>,
          },
          {
            path: "catalog",
            element: <Product></Product>,
          },
        ],
      },
    ]

  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
