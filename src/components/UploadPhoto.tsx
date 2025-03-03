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
    <div className="space-y-4 mt-4">
      <input type="file" onChange={handleImageChange} className="block w-full bg-gray-200 hover:bg-gray-300 transition-100 cursor-pointer rounded p-2" />
      <button onClick={handleUpload} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer">
        Upload to {category.name}
      </button>
    </div>
  );
};

export default UploadPhoto;
