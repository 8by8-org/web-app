import { RewardsContext, RewardsContextProvider } from '@/contexts/rewards-context';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { useContext } from 'react';

function MockChildComponent() {
  const {rewardsInfo} = useContext(RewardsContext);
  return (
    <div data-testid="test">{rewardsInfo ? rewardsInfo[0].name : "your friend"}</div>
  );
}

describe('RewardsContextProvider', () => {
  afterEach(cleanup);
  it('defaults to an rewardsInfo value of null.', () => {
    render(
    <RewardsContextProvider>
      <MockChildComponent />
    </RewardsContextProvider>
    );
    const noRewards = screen.queryByTestId('test');
    expect(noRewards).toHaveTextContent('your friend');
  });
});
