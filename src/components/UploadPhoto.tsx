import { useState } from 'react';
import { uploadImageToCategory } from '../service/imageStore.service';
import { Category } from '../interfaces/Category';

const UploadPhoto = ({ category }: { category: Category }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image || !category.id) return;

    try {
      await uploadImageToCategory(image, category.id);
      alert('Image uploaded successfully!');
      setImage(null);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload to {category.name}</button>
    </div>
  );
};

export default UploadPhoto;
