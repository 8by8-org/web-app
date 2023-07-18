import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/components/footer/footer';

describe('Footer', () => {
  afterEach(cleanup);
  it('renders the Footer unchanged.', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});