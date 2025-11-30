import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NotFound from "./Components/NotFound";
import Profile from "./Components/Profile";
import { UserContextProvider } from "./Context/UserContext";

let route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [{ index: true, element: <Home /> },
        {path:'login', element: <Login/>},
        {path:'register', element: <Register/>},
        {path:'profile', element: <Profile/>},
        {path:'*', element: <NotFound/>},
    ],
  },
]);

export function App() {
  return (
   <UserContextProvider>
    <RouterProvider router={route}>
    <Layout/>
   </RouterProvider>
   </UserContextProvider>
  );
}
