import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Albums from "./components/albums/Albums";
import Album from "./components/albums/Album";
import Section from "./components/sections/Section.tsx";
import SectionsPage from "./components/sections/SectionsPage.tsx";

function App() {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={ <SectionsPage /> } />

        <Route path="sections" element={ <SectionsPage /> } />
        <Route path="sections/:sectionId" element={<Section />} />
        <Route path="create-section" element={<Section />} />
        <Route path="albums" element={<Albums handleClick={(album) => {navigate(`albums/${album.id}`)}} />} />
        <Route path="albums/:albumId" element={<Album />} />
        <Route path="create-album" element={<Album />} />
      </Route>
    </Routes>
  );
}

export default App;
