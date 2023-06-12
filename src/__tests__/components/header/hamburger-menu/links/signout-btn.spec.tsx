import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Builder } from 'builder-pattern';
import SignoutBtn from '@/components/header/hamburger-menu/links/signout-btn';
import { HeaderContext, HeaderContextType } from '@/components/header/header-context';

describe('SignoutBtn', () => {
  afterEach(cleanup);

  it('renders a button inside of an li.', () => {
    render(
      <SignoutBtn />
    );
    const li = screen.queryByRole('listitem');
    const button = screen.queryByRole('button');
    expect(li).toContainElement(button);
  });

  it('calls openSignoutModal() through the HeaderContext when the button is clicked.', async () => {
    const openSignoutModal = jest.fn();
    const headerCtxValue = Builder<HeaderContextType>().openSignoutModal(openSignoutModal).build();
    const user = userEvent.setup();
    render(
      <HeaderContext.Provider value={headerCtxValue}>
        <SignoutBtn />
      </HeaderContext.Provider>
    );
    const button = screen.getByRole('button');
    await user.click(button);
    expect(openSignoutModal).toHaveBeenCalled();
  });
});