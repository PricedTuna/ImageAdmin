import { useState, useEffect } from 'react';
import { getImagesByCategory } from '../service/imageStore.service';

export const useImagesByCategory = (categoryId: string) => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getImagesByCategory(categoryId);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchImages();
  }, [categoryId]);

  return { images, loading };
};
