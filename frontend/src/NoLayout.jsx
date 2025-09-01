import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function Nolayout() {
  return <Outlet />;
}

export default Nolayout;
