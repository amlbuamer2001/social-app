import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NotFound from "./Components/NotFound";
import Profile from "./Components/Profile";
import { UserContextProvider } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import { PostsContextProvider } from "./Context/postsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostDetails from "./Components/postDetails";


const query = new QueryClient();

let route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "postDetails/:id",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export function App() {
  return (
    <UserContextProvider>
      <PostsContextProvider>
        <QueryClientProvider client={query}>
          <RouterProvider router={route} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>  
      </PostsContextProvider>
    </UserContextProvider>
  );
}
