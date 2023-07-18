import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useContext } from 'react';
import { UserContext, UserContextProvider } from '@/contexts/user-context';

function MockChildComponent() {
  const {activeUser} = useContext(UserContext);
  return (
    <div data-testid="test">{activeUser ? activeUser.name : "guest"}</div>
  );
}

describe('UserContextProvider', () => {
  afterEach(cleanup);
  it('defaults to an activeUser value of null.', () => {
    render(
    <UserContextProvider>
      <MockChildComponent />
    </UserContextProvider>
    );
    const signedOut = screen.queryByTestId('test');
    expect(signedOut).toHaveTextContent('guest');
  });
});
