import { Route, Routes } from "react-router-dom";
import Sections from "./components/Sections";
import SectionForm from "./components/Section";
import AlbumsList from "./components/AlbumsList";
import Album from "./components/Album";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="sections" element={<Sections />} />
        <Route path="create-section" element={<SectionForm />} />
        <Route path="albums" element={<AlbumsList />} />
        <Route path="create-album" element={<Album />} />
      </Route>
    </Routes>
  );
}

export default App;
