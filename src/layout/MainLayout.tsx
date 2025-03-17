import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/*<div className={"h-screen overflow-hidden"}>*/}
        <Sidebar />
      {/*</div>*/}
      <main className="flex-1 max-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
