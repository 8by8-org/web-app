import { InviterContext, InviterContextProvider } from '@/contexts/inviter-context';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { useContext } from 'react';

function MockChildComponent() {
  const {inviterInfo} = useContext(InviterContext);
  return (
    <div data-testid="test">{inviterInfo ? inviterInfo.name : "your friend"}</div>
  );
}

describe('UserContextProvider', () => {
  afterEach(cleanup);
  it('defaults to an inviterInfo value of null.', () => {
    render(
    <InviterContextProvider>
      <MockChildComponent />
    </InviterContextProvider>
    );
    const noInviter = screen.queryByTestId('test');
    expect(noInviter).toHaveTextContent('your friend');
  });
});
