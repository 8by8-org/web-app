import { render, cleanup } from '@testing-library/react'
import Header from '@/components/header/header';

describe('Header', () => {
  //add showModal and close to HTMLDialogElement.prototype as they are not recognized
  //as properties of this type of element by the testing framework
  HTMLDialogElement.prototype.showModal = () => {};
  HTMLDialogElement.prototype.close = () => {};
  afterEach(cleanup);

  it('renders the header unchanged', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
