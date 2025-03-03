import { useEffect, useState } from 'react';
import { getCategories } from '../service/fireStore.service';
import { Category } from '../interfaces/Category';

interface Props {
  onSelect: (cat: Category) => void
  onRequestPhotos: (cat: Category) => void
}

function CategoriesList({onSelect, onRequestPhotos}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories as Category[]);
    });
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} style={{ marginBottom: '10px' }}>
            <strong>{category.name}</strong> - {category.color}
            <button onClick={() => onSelect(category)} style={{ marginLeft: '10px' }}>
              Upload Photo
            </button>
            <button onClick={() => onRequestPhotos(category)} style={{ marginLeft: '10px' }}>
              See Photos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesList;
