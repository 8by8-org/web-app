import { render, cleanup } from '@testing-library/react'
import SignedOutLinks from '@/components/header/hamburger-menu/links/signed-out-links';

describe('SignedOutLinks', () => {
  afterEach(cleanup);

  it('renders signed out links unchanged', () => {
    const { container } = render(<SignedOutLinks />);
    expect(container).toMatchSnapshot();
  });
});
