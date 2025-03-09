import { Section } from "../../interfaces/Section";

interface Props { 
  sections: Section[] 
}

export default function SectionList({ sections }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Secciones</h2>
      <ul className="space-y-4">
        {sections.map((section) => (
          <li
            key={section.id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <span className="text-sm text-gray-500">
                Orden: {section.order}
              </span>
            </div>
            <p className="text-gray-700 mt-2">{section.text}</p>
            <div className="mt-3 flex justify-between text-sm text-gray-600">
              <span>Página: {section.parentPage}</span>
              <span>Tipo: {section.structureType}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
