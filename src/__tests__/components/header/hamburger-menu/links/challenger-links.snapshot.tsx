import { render, cleanup } from '@testing-library/react'
import ChallengerLinks from '@/components/header/hamburger-menu/links/challenger-links';

describe('ChallengerLinks', () => {
  afterEach(cleanup);

  it('renders challenger links unchanged', () => {
    const { container } = render(<ChallengerLinks />);
    expect(container).toMatchSnapshot();
  });
});
