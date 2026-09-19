import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface RightContentContextValue {
  rightContent: ReactNode | null;
  setRightContent: (content: ReactNode | null) => void;
}

const RightContentContext = createContext<RightContentContextValue>({
  rightContent: null,
  setRightContent: () => {},
});

export const useRightContent = () => useContext(RightContentContext);

export function RightContentProvider({ children }: { children: ReactNode }) {
  const [rightContent, setRightContent] = useState<ReactNode | null>(null);

  return (
    <RightContentContext.Provider value={{ rightContent, setRightContent }}>
      {children}
    </RightContentContext.Provider>
  );
}

/**
 * Composant PageRightContent :
 * Permet à n'importe quelle page de définir un contenu pour l'emplacement `rightcontent`.
 * Ce composant s'enregistre auprès du RightContentProvider et nettoie automatiquement
 * son contenu lors du démontage de la page.
 */
export function PageRightContent({ children }: { children: ReactNode }) {
  const { setRightContent } = useRightContent();
  const childrenRef = useRef(children);
  childrenRef.current = children;

  useEffect(() => {
    setRightContent(childrenRef.current);
    return () => {
      setRightContent(null);
    };
  }, [setRightContent]);

  return null;
}
