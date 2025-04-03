import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { ISection } from "../../../interfaces/Section";
import SortableSection from './SectionListElement';
import { updateSection } from '../../../service/section.service';

interface Props {
  sections: ISection[];
  handleClick: (section: ISection) => void;
  scaleOnHover?: boolean;
  isDraggable?: boolean;
  onDelete?: (sectionId: string) => void;
}

export default function SectionsList({
  sections,
  handleClick,
  onDelete,
  scaleOnHover = true,
  isDraggable = true
}: Props) {
  const [orderedSections, setOrderedSections] = useState(sections);

  const updateOrders = (orderedSections: ISection[]) => {
    orderedSections.map((section, index) => {
      updateSection(section.id ?? "", { order: index });
    });
  };

  useEffect(() => {
    setOrderedSections(sections);
  }, [sections]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = orderedSections.findIndex((section) => section.id === active.id);
      const newIndex = orderedSections.findIndex((section) => section.id === over?.id);
      const newOrderedSections = arrayMove(orderedSections, oldIndex, newIndex);

      if (newOrderedSections === orderedSections) return; // son iguales, no hubieron cambios en el orden, asi nos evitamos llamadas innecesarias a la bd y renderizaciones

      setOrderedSections(newOrderedSections);
      updateOrders(newOrderedSections);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={orderedSections.map((section) => section.id ?? "")}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-4">
            {orderedSections.map((section) => (
              <SortableSection
                key={section.id}
                section={section}
                handleClick={handleClick}
                scaleOnHover={scaleOnHover}
                isDraggable={isDraggable}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
