import { Navigate, Route, Routes } from "react-router-dom";
import SectionsList from "./components/SectionsList";
import SectionForm from "./components/Section";
import AlbumsList from "./components/AlbumsList";
import Album from "./components/Album";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sections" replace />} />

      <Route path="/sections" element={<SectionsList />} />
      <Route path="/create-section" element={<SectionForm />} />

      <Route path="/albums" element={<AlbumsList />} />
      <Route path="/create-album" element={<Album />} />
    </Routes>
  );
}

export default App;
