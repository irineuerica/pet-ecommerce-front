import { createContext, useContext, useRef } from 'react';
import { DialogConfirmationWithRef, IDialogConfirmationWithRef, OpenConfirmation } from '.';

export interface DialogConirmationProviderProps {
  children: React.ReactNode;
}
interface DialogConirmationContextProps {
  openDialogConfirmation(props: OpenConfirmation): void;
}

const DialogConfirmationContext = createContext({} as DialogConirmationContextProps);

export function DialogConfirmationProvider({ children }: DialogConirmationProviderProps) {
  const dialogConfirmationRef = useRef<IDialogConfirmationWithRef>(null);

  const openDialogConfirmation = (props: OpenConfirmation) => {
    dialogConfirmationRef.current?.openConfirmation(props);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DialogConfirmationContext.Provider value={{ openDialogConfirmation }}>
      {children}
      <DialogConfirmationWithRef ref={dialogConfirmationRef} />
    </DialogConfirmationContext.Provider>
  );
}

export function useDialogConfirmation() {
  return useContext(DialogConfirmationContext);
}
