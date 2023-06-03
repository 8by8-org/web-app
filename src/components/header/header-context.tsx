import {
  createContext, 
  useState, 
  useRef, 
  RefObject, 
  PropsWithChildren
} from 'react';

type HeaderContextType = {
  hamburgerMenuState:HamburgerMenuState;
  openHamburgerMenu:() => void;
  closeHamburgerMenu:() => void;
  openSignoutModal:() => void;
  hamburgerMenuRef:RefObject<HTMLElement>;
  openHamburgerMenuBtnRef:RefObject<HTMLButtonElement>;
  closeHamburgerMenuBtnRef:RefObject<HTMLButtonElement>;
}

export enum HamburgerMenuState {
  open,
  opening,
  closing,
  closed
}

export const HeaderContext = createContext<HeaderContextType>({} as HeaderContextType);

export function HeaderContextProvider({children}:PropsWithChildren) {
  const [hamburgerMenuState, setHamburgerMenuState] = useState(HamburgerMenuState.closed);
  const hamburgerMenuRef = useRef<HTMLElement>(null);
  const openHamburgerMenuBtnRef = useRef<HTMLButtonElement>(null);
  const closeHamburgerMenuBtnRef = useRef<HTMLButtonElement>(null);
  const openHamburgerMenu = () => {
    setHamburgerMenuState(HamburgerMenuState.opening);
    hamburgerMenuRef
      .current?.addEventListener("animationend", () => {
        setHamburgerMenuState(HamburgerMenuState.open);
        closeHamburgerMenuBtnRef.current?.focus();
      }, {once: true});
  }
  const closeHamburgerMenu = () => {
    setHamburgerMenuState(HamburgerMenuState.closing);
    hamburgerMenuRef.current?.addEventListener("animationend", () => {
      setHamburgerMenuState(HamburgerMenuState.closed);
      openHamburgerMenuBtnRef.current?.focus();
    }, {once: true});
  }
  const openSignoutModal = () => {};

  return (
    <HeaderContext.Provider
      value={
        {
          hamburgerMenuState,
          hamburgerMenuRef,
          openHamburgerMenuBtnRef,
          closeHamburgerMenuBtnRef,
          openHamburgerMenu,
          closeHamburgerMenu,
          openSignoutModal
        }
      }
    >
      {children}
    </HeaderContext.Provider>
  )
}