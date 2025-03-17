import { useEffect, useState } from 'react';
import { ISection } from '../../interfaces/Section';
import { listenAllSections } from '../../service/section.service';
import { useOrderSections } from '../useOrderSections';

function useGetSections() {
  const [sections, setSections] = useState<ISection[]>([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setIsFetching(true)

    const unsubscribe = listenAllSections((sections) => {
      setSections(useOrderSections(sections))
    });

    setIsFetching(false)

    return () => unsubscribe();
  }, [])


  return { sections, isFetching }
}

export default useGetSections
