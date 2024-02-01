import { Outlet } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";

const Template = () => {
  return (
    <>
      <MyHeader />
      <Outlet />
      <MyFooter />
    </>
  );
};

export default Template;
