// Section.tsx

import React, { useState } from 'react';
import { createSection, updateSection } from '../service/section.service';
import { ParentPageEnum } from '../interfaces/enums/ParentPage.enum';
import { SectionStructureEnum } from '../interfaces/enums/SectionStructure.enum';

const Section: React.FC = () => {
  const [sectionId, setSectionId] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [order, setOrder] = useState(0);
  const [parentPage, setParentPage] = useState<ParentPageEnum>(ParentPageEnum.HOME);
  const [albumId, setAlbumId] = useState('');
  const [structureType, setStructureType] = useState<SectionStructureEnum>(SectionStructureEnum.CAROUSEL);

  // Actualiza cualquier campo de la sección
  const handleUpdateSection = async () => {
    try {
      const updateData = {
        title,
        text,
        order,
        parentPage,
        albumId,
        structureType,
      };
      await updateSection(sectionId, updateData);
      alert('¡Sección actualizada!');
    } catch (error) {
      console.error('Error al actualizar sección:', error);
      alert('Error al actualizar la sección.');
    }
  };

  // Crear una sección nueva
  const handleCreateSection = async () => {
    try {
      const createData = {
        title,
        text,
        order,
        parentPage,
        albumId,
        structureType,
      };

      await createSection(createData)
    } catch (error) {
      console.error("error al crear una sección: ", error)
      alert('Error al crear la sección')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-4">
      <h2 className="text-xl font-bold mb-4">Prueba de Sección</h2>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Section ID:</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={sectionId} 
          onChange={(e) => setSectionId(e.target.value)} 
        />
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Título:</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Texto:</label>
        <textarea 
          className="w-full p-2 border rounded" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Orden:</label>
        <input 
          type="number" 
          className="w-full p-2 border rounded" 
          value={order} 
          onChange={(e) => setOrder(parseInt(e.target.value))}
        />
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Parent Page:</label>
        <select 
          className="w-full p-2 border rounded" 
          value={parentPage} 
          onChange={(e) => setParentPage(e.target.value as ParentPageEnum)}
        >
          <option value={ParentPageEnum.HOME}>HOME</option>
          <option value={ParentPageEnum.DESCRIPTION}>DESCRIPTION</option>
          <option value={ParentPageEnum.ABOUT_ME}>ABOUT_ME</option>
        </select>
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Album ID:</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={albumId} 
          onChange={(e) => setAlbumId(e.target.value)} 
        />
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Structure Type:</label>
        <select 
          className="w-full p-2 border rounded" 
          value={structureType} 
          onChange={(e) => setStructureType(e.target.value as SectionStructureEnum)}
        >
          <option value={SectionStructureEnum.CAROUSEL}>CAROUSEL</option>
          <option value={SectionStructureEnum.DIVIDED}>DIVIDED</option>
          <option value={SectionStructureEnum.FULL_SCREEN}>FULL_SCREEN</option>
        </select>
      </div>
      
      <button 
        onClick={handleCreateSection} 
        className="w-full bg-green-500 text-white p-2 rounded mt-4 cursor-pointer"
      >
        Crear Sección
      </button>
      <button 
        onClick={handleUpdateSection} 
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 cursor-pointer"
      >
        Actualizar Sección
      </button>
    </div>
  );
};

export default Section;
