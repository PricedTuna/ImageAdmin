import { useEffect, useState } from "react";
import { createSection, listenSection, updateSection } from "../../service/section.service";
import { getParentPageName, ParentPageEnum, parentPageList } from "../../interfaces/enums/ParentPage.enum";
import {
  getSectionStructureName,
  SectionStructureEnum,
  sectionStructureList
} from "../../interfaces/enums/SectionStructure.enum";
import { ISection } from "../../interfaces/Section";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";
import CenterComponent from "../microComponents/CenterComponent";
import Button from "../microComponents/Button";
import Text from "../microComponents/Text";
import FormPropWrapper from "../microComponents/FormPropWrapper";
import { useSwalAlert } from "../../hooks/useSwalAlert.ts";
import { IAlbum } from "../../interfaces/Album.ts";
import { getAllAlbums } from "../../service/album.service.ts";
import { FaPlus } from "react-icons/fa";
import { MdModeEditOutline, MdOpenInNew } from "react-icons/md";

const Section = () => {
  const alert = useSwalAlert();
  const navigate = useNavigate();

  const [section, setSection] = useState<ISection | null>(null);
  const [albums, setAlbums] = useState<IAlbum[] | null>(null);
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

  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);

  const resetValues = () => {
    setSection(null);

    setSectionId("");
    setTitle("");
    setText("");
    setOrder(0);
    setParentPage(ParentPageEnum.HOME);
    setAlbumId("");
    setStructureType(SectionStructureEnum.CAROUSEL);
  };

  const setValues = (section: ISection) => {
    console.log(JSON.stringify(section, null, 2))
    setSectionId(section.id ?? "");
    setTitle(section.title);
    setText(section.text);
    setOrder(section.order);
    setParentPage(section.parentPage);
    setAlbumId(section.albumId);
    setStructureType(section.structureType);
  };

  const fetchAlbums = async () => {
    setIsFetching(true);
    const albums = await getAllAlbums();
    setAlbums(albums);
    setIsFetching(false);
  };

  useEffect(() => {
    if (!sectionParamId) {
      resetValues();
      return;
    }

    setIsFetching(true);

    const unsubscribe = listenSection(sectionParamId, (sectionData) => {
      setSection(sectionData);
    });

    setIsFetching(false);

    return () => unsubscribe();
  }, [sectionParamId]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (!section) return;

    setValues(section);

  }, [section]);

  // Actualiza cualquier campo de la sección
  const handleUpdateSection = async () => {
    try {
      if (!await alert.confirm("¿Desea actualizar la sección?")) return;

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
      if(title.length === 0) {
        alert.error("La sección debe tener titulo")
        return;
      }

      if (!await alert.confirm("¿Desea crear la sección?")) return;

      const createData = {
        title,
        text,
        order,
        parentPage,
        albumId,
        structureType
      };

      const createdSection = await createSection(createData);
      alert.success("¡Sección creada!");
      navigate(`/sections/${createdSection.id}`)
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
          <Button
            icon={<MdOpenInNew/>}
            width={"full"}
            onClick={() => setIsTitleModalOpen(true)}
            variant={"light"}
            className={"max-w-xs"}
            truncate
          >
            {title.length ? title : "título aquí..."}
          </Button>
        </FormPropWrapper>

        {isTitleModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Fondo oscuro para el modal */}
            <div
              className="absolute inset-0 bg-gray-800 opacity-50"
              onClick={() => setIsTitleModalOpen(false)}
            ></div>
            {/* Contenido del modal */}
            <div className="bg-white p-6 rounded shadow-lg z-10 w-full max-w-lg h-full max-h-min">
              <h2 className="text-xl font-bold mb-4">Editar Título</h2>
              <Text as="label" className="block text-sm font-medium mb-1">
                Título:
              </Text>
              <textarea
                className="w-full border rounded p-2"
                onChange={(e) => setTitle(e.target.value)}
                rows={4}
                cols={50}
              >
                {title}
              </textarea>
              <Button onClick={() => setIsTitleModalOpen(false)} width={"full"} variant={"secondary"}>Cerrar</Button>
            </div>
          </div>
        )}

        <FormPropWrapper>
          <Text as="label" className="block text-sm font-medium mb-1 whitespace-nowrap">Texto:</Text>
          <Button
            icon={<MdOpenInNew/>}
            width={"full"}
            onClick={() => setIsTextModalOpen(true)}
            variant={"light"}
            className={"max-w-xs"}
            truncate
          >
            {text.length ? text : "texto aquí..."}
          </Button>
        </FormPropWrapper>

        {isTextModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Fondo oscuro para el modal */}
            <div
              className="absolute inset-0 bg-gray-800 opacity-50"
              onClick={() => setIsTextModalOpen(false)}
            ></div>
            {/* Contenido del modal */}
            <div className="bg-white p-6 rounded shadow-lg z-10 w-full max-w-lg h-full max-h-min">
              <h2 className="text-xl font-bold mb-4">Editar Título</h2>
              <Text as="label" className="block text-sm font-medium mb-1">
                Texto:
              </Text>
              <textarea
                className="w-full border rounded p-2"
                onChange={(e) => setText(e.target.value)}
                rows={4}
                cols={50}
              >
                {text}
              </textarea>
              <Button onClick={() => setIsTextModalOpen(false)} width={"full"} variant={"secondary"}>Cerrar</Button>
            </div>
          </div>
        )}

        <FormPropWrapper>
          <Text as="label" className="block text-sm font-medium mb-1 whitespace-nowrap">Album:</Text>
          <select
            className="w-full border rounded p-2"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
          >
            {albums && albums.map((album, index) => (
              <option key={album.id ?? index} value={album.id ?? album.name}>
                {album.name}
              </option>
            ))}
          </select>
        </FormPropWrapper>

        <FormPropWrapper>
          <Text as="label" className="block text-sm font-medium mb-1 whitespace-nowrap">
            Tipo:
          </Text>
          <select
            className="w-full border rounded p-2"
            value={structureType}
            onChange={(e) =>
              setStructureType(e.target.value as SectionStructureEnum)
            }
          >
            {
              sectionStructureList.map((structure, index) => (
                <option key={index} value={structure}>{getSectionStructureName(structure)}</option>
              ))
            }
          </select>
        </FormPropWrapper>

        <FormPropWrapper>
          <Text as="label" className="block text-sm font-medium mb-1 whitespace-nowrap">
            Página:
          </Text>
          <select
            className="w-full border rounded p-2"
            value={parentPage}
            onChange={(e) =>
              setParentPage(e.target.value as ParentPageEnum)
            }
          >
            {
              parentPageList.map((parentPage, index) => (
                <option key={index} value={parentPage}>{getParentPageName(parentPage)}</option>
              ))
            }
          </select>
        </FormPropWrapper>
      </div>

      <div className="flex-1 py-6">
        <CenterComponent className="p-2 mx-auto bg-gray-200 w-full h-full border-1">hola!</CenterComponent>
      </div>

      <div>
        {section?.id ? (
          <Button icon={<MdModeEditOutline/>} onClick={handleUpdateSection} width={"full"} variant={"success"}>
            Actualizar Sección
          </Button>
        ) : (
          <Button icon={<FaPlus/>} onClick={handleCreateSection} width={"full"} variant={"success"}>
            Crear Sección
          </Button>
        )}
      </div>
    </div>
  );
};

export default Section;
