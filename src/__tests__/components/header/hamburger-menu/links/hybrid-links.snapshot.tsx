import { render, cleanup } from '@testing-library/react'
import HybridLinks from '@/components/header/hamburger-menu/links/hybrid-links';

describe('HybridLinks', () => {
  afterEach(cleanup);

  it('renders hybrid links unchanged', () => {
    const { container } = render(<HybridLinks />);
    expect(container).toMatchSnapshot();
  });
});
