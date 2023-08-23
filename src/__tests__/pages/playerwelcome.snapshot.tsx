import PlayerWelcome from '@/pages/player-welcome';
import { cleanup, render } from '@testing-library/react';

import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('PlayerWelcome', () => {
  afterEach(cleanup);
  
  it('renders player-welcome page unchanged', () => {
    const { container } = render(<PlayerWelcome />);
    expect(container).toMatchSnapshot();
  });
});