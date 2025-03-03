import { useState } from "react";
import CategoriesForm from "./components/CategoriesForm";
import CategoriesList from "./components/CategoriesList";
import { Category } from "./interfaces/Category";
import UploadPhoto from "./components/UploadPhoto";
import ImagesByCategory from "./components/ImagesByCategory";

function App() {
  const [catSelected, setCatSelected] = useState<Category>({} as Category);
  const [catToSeePhotos, setCatToSeePhotos] = useState<Category>(
    {} as Category
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <CategoriesForm />
      <CategoriesList
        onSelect={(cat) => setCatSelected(cat)}
        onRequestPhotos={(cat) => setCatToSeePhotos(cat)}
      />

      {catSelected && catSelected.name && (
        <div>
          <h3>Upload photo to selected category</h3>
          <UploadPhoto category={catSelected} />
        </div>
      )}

      {catToSeePhotos && catToSeePhotos.id && (
        <div>
          <ImagesByCategory category={catToSeePhotos} />
        </div>
      )}
    </div>
  );
}

export default App;
