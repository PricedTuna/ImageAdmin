import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
