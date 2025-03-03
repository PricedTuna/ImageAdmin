import { useState, useEffect } from 'react';
import { getImagesByCategory } from '../service/imageStore.service';
import { Category } from '../interfaces/Category';

const ImagesByCategory = ({ category }: { category: Category }) => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getImagesByCategory(category.id);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category.id) fetchImages();
  }, [category.id]);

  if (loading) return <p>Loading images...</p>;

  return (
    <div>
      <h2>Images in {category.name}</h2>
      <ul>
        {images.map((image: any) => (
          <li key={image.id}>
            <img src={image.imageUrl} alt="Uploaded" style={{ width: '150px', height: '150px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImagesByCategory;
