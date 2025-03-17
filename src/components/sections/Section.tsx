import { useEffect, useState } from "react";
import { createSection, getSection, updateSection } from "../../service/section.service";
import { ParentPageEnum } from "../../interfaces/enums/ParentPage.enum";
import { SectionStructureEnum } from "../../interfaces/enums/SectionStructure.enum";
import { ISection } from "../../interfaces/Section";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import CenterComponent from "../microComponents/CenterComponent";
import Button from "../microComponents/Button";
import Text from "../microComponents/Text";
import FormPropWrapper from "../microComponents/FormPropWrapper";
import { useSwalAlert } from "../../hooks/useSwalAlert.ts";

const Section = () => {
  const alert = useSwalAlert()

  const [section, setSection] = useState<ISection | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const { sectionId: sectionParamId } = useParams();

  const [sectionId, setSectionId] = useState(section?.id ?? "");
  const [title, setTitle] = useState(section?.title ?? "");
  const [text, setText] = useState(section?.text ?? "");
  const [order, setOrder] = useState(section?.order ?? 0);
  const [parentPage, setParentPage] = useState<ParentPageEnum>(
    section?.parentPage ?? ParentPageEnum.HOME
  );
  const [albumId, setAlbumId] = useState(section?.albumId ?? "");
  const [structureType, setStructureType] = useState<SectionStructureEnum>(
    section?.structureType ?? SectionStructureEnum.CAROUSEL
  );

  const resetValues = () => {
    setSection(null);

    setSectionId("");
    setTitle("");
    setText("");
    setOrder(0);
    setParentPage(ParentPageEnum.HOME);
    setAlbumId("");
    setStructureType(SectionStructureEnum.CAROUSEL);
  }

  const setValues = (section: ISection) => {
    setSectionId(section.id ?? "");
    setTitle(section.title);
    setText(section.text);
    setOrder(section.order);
    setParentPage(section.parentPage);
    setAlbumId(section.albumId);
    setStructureType(section.structureType);
  }

  const fetchSection = async () => {
    if (!sectionParamId) {
      resetValues()
      return;
    }

    setIsFetching(true);
    const section = await getSection(sectionParamId);
    setSection(section);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchSection();
  }, [sectionParamId]);

  useEffect(() => {
    if (!section) return;

    setValues(section)

  }, [section]);

  // Actualiza cualquier campo de la sección
  const handleUpdateSection = async () => {
    try {
      const updateData = {
        title,
        text,
        order,
        parentPage,
        albumId,
        structureType
      };
      await updateSection(sectionId, updateData);
      alert.success("¡Sección actualizada!");
    } catch (error) {
      console.error("Error al actualizar sección:", error);
      alert.error("Error al actualizar la sección.");
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
        structureType
      };

      await createSection(createData);
    } catch (error) {
      console.error("error al crear una sección: ", error);
      alert.error("Error al crear la sección");
    }
  };

  if (isFetching) {
    return <Spinner/>;
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-white shadow rounded">
      <div className="flex flex-col lg:flex-row justify-between">
        <FormPropWrapper>
          <Text as="label" className="block text-sm font-medium mb-1 whitespace-nowrap">
            Título:
          </Text>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormPropWrapper>

        <FormPropWrapper>
          <Text as="label" className="block text-sm font-medium mb-1 whitespace-nowrap">Texto:</Text>
          <input
            className="w-full border rounded p-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FormPropWrapper>

        <FormPropWrapper>
          <Text as="label" className="block text-sm font-medium mb-1 whitespace-nowrap">Album ID:</Text>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
          />
        </FormPropWrapper>

        <FormPropWrapper>
          <Text as="label" className="block text-sm font-medium mb-1 whitespace-nowrap">
            Structure Type:
          </Text>
          <select
            className="w-full border rounded p-2"
            value={structureType}
            onChange={(e) =>
              setStructureType(e.target.value as SectionStructureEnum)
            }
          >
            <option value={SectionStructureEnum.CAROUSEL}>CAROUSEL</option>
            <option value={SectionStructureEnum.DIVIDED}>DIVIDED</option>
            <option value={SectionStructureEnum.FULL_SCREEN}>
              FULL_SCREEN
            </option>
          </select>
        </FormPropWrapper>
      </div>

      <div className="flex-1 py-6">
        <CenterComponent className="p-2 mx-auto bg-gray-200 w-full h-full border-1">hola!</CenterComponent>
      </div>

      <div>
        {section?.id ? (
          <Button onClick={handleUpdateSection} width={"full"} variant={"success"}>
            Actualizar Sección
          </Button>
        ) : (
          <Button onClick={handleCreateSection} width={"full"} variant={"success"}>
            Crear Sección
          </Button>
        )}
      </div>
    </div>
  );
};

export default Section;
