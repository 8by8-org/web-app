import { createContext, PropsWithChildren, useState } from "react";

export type PartnerContextType = {
  partnersExist: boolean;
};

//setting the default context to {partnersExist:false} allows for testing unwrapped components
export const PartnerContext = createContext<PartnerContextType>({
  partnersExist: false,
});

export function PartnerContextProvider({ children }: PropsWithChildren) {
  const [partnersExist, setPartnersExist] = useState(false);
  return (
    <PartnerContext.Provider value={{ partnersExist }}>
      {children}
    </PartnerContext.Provider>
  );
}
