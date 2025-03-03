import { useState } from 'react';
import { addCategory } from '../service/fireStore.service';

function CategoriesForm() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !color) return alert('Both fields are required');

    try {
      await addCategory({ name, color });
      alert('Category added successfully!');
      setName('');
      setColor('');
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div>
        <label className="block font-medium">Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg p-2"/>
      </div>
      <div>
        <label className="block font-medium">Color:</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="w-full border rounded-lg p-2"/>
      </div>
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
        Add Category
      </button>
    </form>
  );
}

export default CategoriesForm;
