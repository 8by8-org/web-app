import { render, cleanup } from '@testing-library/react'
import {Builder} from 'builder-pattern';
import { UserContextType, UserContext } from '@/contexts/user-context';
import Links from '@/components/header/hamburger-menu/links/links';

describe('Links--Signed Out', () => {
  afterEach(cleanup);

  it('renders signed out links unchanged', () => {
    const userContextValue = Builder<UserContextType>().activeUser(null).build();
    const {container} = render(
      <UserContext.Provider value={userContextValue}>
        <Links />
      </UserContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });
});