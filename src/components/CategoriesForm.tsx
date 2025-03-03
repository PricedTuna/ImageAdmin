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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Color:
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
      </label>
      <button type="submit">Add Category</button>
    </form>
  );
}

export default CategoriesForm;
