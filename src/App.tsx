import { Route, Routes } from "react-router-dom";
import Sections from "./components/Sections";
import SectionForm from "./components/Section";
import Album from "./components/Album";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Albums from "./components/Albums";
import Section from "./components/Section";

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="sections" element={<Sections handleClick={() => {}} />} />
        <Route path="sections/:sectionId" element={<Section />} />
        <Route path="create-section" element={<SectionForm />} />
        <Route path="albums" element={<Albums handleClick={() => {}} />} />
        <Route path="create-album" element={<Album />} />
      </Route>
    </Routes>
  );
}

export default App;
