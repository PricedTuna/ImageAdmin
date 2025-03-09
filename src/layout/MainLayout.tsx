import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-100 shadow">
        <h1 className="text-xl font-bold">Mi Aplicación</h1>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <footer className="p-4 bg-gray-100">
        <p>Copyright © 2025</p>
      </footer>
    </div>
  );
};

export default MainLayout;