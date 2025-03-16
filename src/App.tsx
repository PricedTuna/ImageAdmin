import { Route, Routes, useNavigate } from "react-router-dom";
import Section from "./components/Section";
import MainLayout from "./layout/MainLayout";
import Albums from "./components/Albums";
import Album from "./components/Album";
import SectionsByParent from "./components/sections/SectionsByParent";

function App() {

  const navigate = useNavigate()

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={ <SectionsByParent /> } />

        <Route path="sections" element={ <SectionsByParent /> } />
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
