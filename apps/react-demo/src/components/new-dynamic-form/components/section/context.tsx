import { createContext, useContext } from 'react'

export type SectionContextProps = {
  sectionId: string
  getCardIndex: (userId: string) => number
  getNumCards: () => number
}

export const SectionContext = createContext<SectionContextProps | null>(null)

export function useSectionContext() {
  const value = useContext(SectionContext)
  return value
}
