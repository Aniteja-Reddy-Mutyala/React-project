import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Homepage";
import ArticlesListPage from "./pages/ArticlesListPage";
import AboutPage from "./pages/AboutPage";
import ArticlePage,{loader as articleLoader} from "./pages/ArticlePage";
import Layout from "./Layouts";
import NotFoundPage from "./pages/NotFoundPage";
import axios from 'axios'
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";
const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement:<NotFoundPage/>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/articles",
        element: <ArticlesListPage />,
      },
      {
        path: "/articles/:name",
        element: <ArticlePage />,
        loader:articleLoader
      },
      {
        path:"/login",
        element:<LoginPage/>
      },{
        path:"/create-account",
        element:<CreateAccount/>
      }
    ],
  },
];
const router = createBrowserRouter(routes);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
