import {render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { HamburgerMenuState, HeaderContext, HeaderContextType } from '@/components/header/header-context';
import { Builder } from 'builder-pattern';
import HamburgerMenu from '@/components/header/hamburger-menu/hamburger-menu';
import styles from '@/styles/modules/components/header/hamburger-menu/hamburger-menu.module.scss';
import { PropsWithChildren, useRef } from 'react';

describe('HamburgerMenu', () => {
  afterEach(cleanup);
  it('renders an outer div with a className of "hidden" when hamburgerMenuState is closed.', async () => {
    render(
      <MockHeaderCtx 
        menuState={HamburgerMenuState.closed}
        closeHamburgerMenu={jest.fn()}
      >
        <HamburgerMenu />
      </MockHeaderCtx>
    );
    const hiddenElements = document.getElementsByClassName("hidden");
    expect(hiddenElements.length).toBe(1);
  });

  it(`renders an outer div with a className of ${styles.hamburger_menu_outer_container} when hamburgerMenuState is open.`, () => {
    render(
      <MockHeaderCtx 
        menuState={HamburgerMenuState.open}
        closeHamburgerMenu={jest.fn()}
      >
        <HamburgerMenu />
      </MockHeaderCtx>
    );
    const outerContainers = document.getElementsByClassName(styles.hamburger_menu_outer_container);
    expect(outerContainers.length).toBe(1);
  });

  it(`renders a nav with a className of ${styles.hamburger_menu_closing} when hamburgerMenuState is closing.`, () => {
    render(
      <MockHeaderCtx 
        menuState={HamburgerMenuState.closing}
        closeHamburgerMenu={jest.fn()}
      >
        <HamburgerMenu />
      </MockHeaderCtx>
    );
    const nav = document.getElementsByClassName(styles.hamburger_menu_closing);
    expect(nav.length).toBe(1);
  });

  
  it(`renders a nav with a className of ${styles.hamburger_menu_open} when hamburgerMenuState is not closed or closing.`, () => {
    render(
      <MockHeaderCtx 
        menuState={HamburgerMenuState.opening}
        closeHamburgerMenu={jest.fn()}
      >
        <HamburgerMenu />
      </MockHeaderCtx>
    );
    const nav = document.getElementsByClassName(styles.hamburger_menu_open);
    expect(nav.length).toBe(1);
  });

  it(`renders a calls closeHamburgerMenu when the close button is clicked.`, async () => {
    const user = userEvent.setup();
    const closeHamburgerMenu = jest.fn();
    render(
      <MockHeaderCtx 
        menuState={HamburgerMenuState.open}
        closeHamburgerMenu={closeHamburgerMenu}
      >
        <HamburgerMenu />
      </MockHeaderCtx>
    );
    const closeHamburgerBtn = screen.getByRole('button');
    await user.click(closeHamburgerBtn);
    expect(closeHamburgerMenu).toHaveBeenCalled();
  });
});

type MockHeaderCtxProps = PropsWithChildren & {
  menuState:HamburgerMenuState;
  closeHamburgerMenu:()=>void;
}

function MockHeaderCtx({menuState, closeHamburgerMenu, children}:MockHeaderCtxProps) {
  const headerCtxValue = Builder<HeaderContextType>()
      .hamburgerMenuState(menuState)
      .hamburgerMenuRef(useRef<HTMLElement>(null))
      .closeHamburgerMenuBtnRef(useRef<HTMLButtonElement>(null))
      .closeHamburgerMenu(closeHamburgerMenu)
      .build();

  return (
    <HeaderContext.Provider value={headerCtxValue}>
      {children}
    </HeaderContext.Provider>
  )
}