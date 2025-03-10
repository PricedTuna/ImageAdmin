import { Route, Routes, useNavigate } from "react-router-dom";
import Sections from "./components/Sections";
import Section from "./components/Section";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Albums from "./components/Albums";
import Album from "./components/Album";

function App() {

  const navigate = useNavigate()

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="sections" element={<Sections handleClick={() => {}} />} />
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
