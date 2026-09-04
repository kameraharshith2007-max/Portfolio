import { createContext, useContext, useState, type ReactNode } from 'react';

type ContactContextType = {
  isOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
};

const ContactContext = createContext<ContactContextType | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactContext.Provider
      value={{
        isOpen,
        openContact: () => setIsOpen(true),
        closeContact: () => setIsOpen(false),
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error('useContact must be used within ContactProvider');
  return ctx;
}
