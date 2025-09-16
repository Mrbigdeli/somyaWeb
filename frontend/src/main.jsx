import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Error from "./components/Error/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import "./assets/styles/generals.css";
import "./assets/styles/global.css";
import "./i18n";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
);
