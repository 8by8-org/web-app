import { render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Builder } from 'builder-pattern';
import { User } from '@/models/User';
import { UserContext, UserContextType } from '@/contexts/user-context';
import Greeting from '@/components/header/hamburger-menu/greeting';

describe('Greeting', () => {
  afterEach(cleanup);
  it('Displays "Hi there!" when activeUser is null.', () => {
    const userCtxValue = Builder<UserContextType>().activeUser(null).build();
    render(
      <UserContext.Provider value={userCtxValue}>
        <Greeting />
      </UserContext.Provider>
    );
    const greeting = screen.queryByText("Hi there!");
    expect(greeting).toBeInTheDocument();
  });

  it("Displays the user's name when activeUser is not null.", () => {
    const user = Builder<User>().name('Test').build();
    const userCtxValue = Builder<UserContextType>().activeUser(user).build();
    render(
      <UserContext.Provider value={userCtxValue}>
        <Greeting />
      </UserContext.Provider>
    );
    const greeting = screen.queryByText(`Hi ${user.name}!`);
    expect(greeting).toBeInTheDocument();
  });

  it("Display's the user's avatar when the user has one.", () => {
    const user = Builder<User>().name('Test').avatar('2').build();
    const userCtxValue = Builder<UserContextType>().activeUser(user).build();
    render(
      <UserContext.Provider value={userCtxValue}>
        <Greeting />
      </UserContext.Provider>
    );
      const avatar = screen.getByAltText('user avatar');
      expect(avatar).toHaveAttribute('src', `/assets/3-avatars/avatar-${user.avatar}.svg`);
  });

  it("Display's the user's avatar when the user doesn't have one.", () => {
    const user = Builder<User>().name('Test').build();
    const userCtxValue = Builder<UserContextType>().activeUser(user).build();
    render(
      <UserContext.Provider value={userCtxValue}>
        <Greeting />
      </UserContext.Provider>
    );
      const avatar = screen.getByAltText('user avatar');
      expect(avatar).toHaveAttribute('src', `/assets/3-avatars/avatar-1.svg`);
  });
});
