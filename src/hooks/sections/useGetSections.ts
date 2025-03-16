import { useEffect, useState } from 'react';
import { ISection } from '../../interfaces/Section';
import { getAllSections } from '../../service/section.service';
import { useOrderSections } from '../useOrderSections';

function useGetSections() {
  const [sections, setSections] = useState<ISection[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const handleFetchSections = async () => {
    setIsFetching(true)

    const sections = await getAllSections()
    
    setIsFetching(false)
    
    return sections
  }

  useEffect(() => {
    handleFetchSections().then(sections => setSections(useOrderSections(sections)))
  }, [])


  return { sections, isFetching }
}

export default useGetSections