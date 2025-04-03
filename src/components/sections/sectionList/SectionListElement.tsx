import {
  useSortable
} from '@dnd-kit/sortable';
import { MdDragIndicator } from "react-icons/md";
import { ISection } from "../../../interfaces/Section.ts";
import { FaTrash } from "react-icons/fa";

interface Props {
  section: ISection,
  handleClick: (section: ISection) => void,
  scaleOnHover?: boolean;
  isDraggable?: boolean;
  onDelete?: (sectionId: string) => void;
}

const SortableSection = ({ section, handleClick, scaleOnHover = true, isDraggable = true, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id ?? ""
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`bg-white shadow-lg rounded-lg p-4 border border-gray-200 cursor-pointer ${scaleOnHover ? "duration-200 hover:scale-105" : ""} `}
      onClick={() => handleClick(section)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold truncate">{section.title}</h3>

        <div className={"flex gap-2"}>
          {onDelete && (

            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // evitar que se dispare handleClick
                  onDelete(section.id ?? "");
                }}
                className="text-red-500 hover:text-red-700"
                title="Eliminar sección"
              >
                <FaTrash className="text-md cursor-pointer"/>
              </button>
            </div>
          )}

          {
            isDraggable && (
              <div>
                <span {...listeners} {...attributes} className="cursor-move">
                  <MdDragIndicator/>
                </span>
              </div>
            )
          }
        </div>
      </div>
      <p className="text-gray-700 mt-2 line-clamp-2">{section.text}</p>
      <div className="mt-3 flex justify-between text-sm text-gray-600">
        <span>Tipo: {section.structureType}</span>
      </div>
    </li>
  );
};

export default SortableSection;
