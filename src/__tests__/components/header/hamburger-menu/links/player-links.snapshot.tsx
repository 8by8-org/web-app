import { render, cleanup } from '@testing-library/react'
import PlayerLinks from '@/components/header/hamburger-menu/links/player-links';

describe('PlayerLinks', () => {
  afterEach(cleanup);

  it('renders player links unchanged', () => {
    const { container } = render(<PlayerLinks />);
    expect(container).toMatchSnapshot();
  });
});
