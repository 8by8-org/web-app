import { render, cleanup } from '@testing-library/react'
import {Builder} from 'builder-pattern';
import { User } from '@/models/User';
import { UserContextType, UserContext } from '@/contexts/user-context';
import Links from '@/components/header/hamburger-menu/links/links';
import { UserType } from '@/models/UserType';

describe('Links--Player', () => {
  afterEach(cleanup);

  it('renders player links unchanged', () => {
    const user = Builder<User>().avatar("2").name("Test").type(UserType.PLAYER).build();
    const userContextValue = Builder<UserContextType>().activeUser(user).build();
    const {container} = render(
      <UserContext.Provider value={userContextValue}>
        <Links />
      </UserContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });
});