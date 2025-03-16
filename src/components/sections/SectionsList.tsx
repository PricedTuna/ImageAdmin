import { useState } from 'react';
import { ISection } from "../../interfaces/Section";
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';

interface Props {
  sections: ISection[];
  handleClick: (section: ISection) => void;
  updateOrderInDB: (sections: ISection[]) => void; // Función para actualizar la base de datos
}

function SortableSection({ section, handleClick }: { section: ISection, handleClick: (section: ISection) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id ?? "",
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer"
      onClick={() => handleClick(section)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{section.title}</h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Orden: {section.order}</span>
          {/* Drag handle: Solo esta zona activará el arrastre */}
          <span {...listeners} {...attributes} className="cursor-move">
            ICONO DE DND
          </span>
        </div>
      </div>
      <p className="text-gray-700 mt-2">{section.text}</p>
      <div className="mt-3 flex justify-between text-sm text-gray-600">
        <span>Tipo: {section.structureType}</span>
      </div>
    </li>
  );
}


export default function SectionsList({
  sections,
  handleClick,
  updateOrderInDB,
}: Props) {
  const [orderedSections, setOrderedSections] = useState(sections);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = orderedSections.findIndex((section) => section.id === active.id);
      const newIndex = orderedSections.findIndex((section) => section.id === over?.id);
      const newOrder = arrayMove(orderedSections, oldIndex, newIndex);

      // Actualiza la UI
      setOrderedSections(newOrder);

      // Aquí se actualiza la base de datos con el nuevo orden
      updateOrderInDB(newOrder);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedSections.map((section) => section.id??"")} strategy={verticalListSortingStrategy}>
          <ul className="space-y-4">
            {orderedSections.map((section) => (
              <SortableSection key={section.id} section={section} handleClick={handleClick} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
