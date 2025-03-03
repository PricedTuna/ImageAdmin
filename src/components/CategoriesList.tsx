import { useEffect, useState } from 'react';
import { getCategories } from '../service/fireStore.service';
import { Category } from '../interfaces/Category';

interface Props {
  onSelect: (cat: Category) => void
  onRequestPhotos: (cat: Category) => void
  onAddCategory: () => void
}

function CategoriesList({onSelect, onRequestPhotos, onAddCategory}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories as Category[]);
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <button className="bg-green-500 duration-150 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer w-full" onClick={onAddCategory}>Agregar categoría</button>
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center border-b pb-2">
            <span style={{display: 'flex', alignItems: 'center', gap: 5}}><div className='' style={{backgroundColor: `#${category.color}`, width: '15px', height: '15px', border: '2px solid black', borderRadius: '50%'}} /> {category.name}</span>
            <div className="space-x-2">
              <button onClick={() => onSelect(category)} className="bg-blue-500 hover:bg-blue-600 duration-150 text-white px-3 py-1 rounded-lg cursor-pointer">Upload Photo</button>
              <button onClick={() => onRequestPhotos(category)} className="bg-gray-500 hover:bg-gray-600 duration-100 text-white px-3 py-1 rounded-lg cursor-pointer">See Photos</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesList;
