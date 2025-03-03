import { useState } from "react";
import CategoriesForm from "./components/CategoriesForm";
import CategoriesList from "./components/CategoriesList";
import { Category } from "./interfaces/Category";
import UploadPhoto from "./components/UploadPhoto";
import ImagesByCategory from "./components/ImagesByCategory";

function App() {
  const [catSelected, setCatSelected] = useState<Category | null>(null);
  const [catToSeePhotos, setCatToSeePhotos] = useState<Category | null>(null);
  const [isAddCatModalVisible, setIsAddCatModalVisible] = useState<boolean>(false)

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Image Categories App</h1>
      <CategoriesList
        onSelect={setCatSelected}
        onRequestPhotos={setCatToSeePhotos}
        onAddCategory={() => setIsAddCatModalVisible(true)}
      />

      {isAddCatModalVisible && <CategoriesForm />}

      {catSelected && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <div className="flex align-items-center justify-between">
          <h3 className="text-lg font-semibold mb-4">
            Upload photo to "{catSelected.name}"
          </h3>
          <button className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 cursor-pointer" onClick={() => setCatSelected(null)}>Close</button>
          </div>
          <UploadPhoto category={catSelected} />
        </div>
      )}

      {catToSeePhotos && (
        <div className="mt-6">
          <ImagesByCategory category={catToSeePhotos} />
        </div>
      )}
    </div>
  );
}

export default App;
