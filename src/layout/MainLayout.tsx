import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 max-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
