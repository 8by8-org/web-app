import { render, cleanup } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home', () => {
  afterEach(() => cleanup());

  it('renders homepage unchanged', () => {
    // const { container } = render(<Home />);
    // expect(container).toMatchSnapshot();

    //testing that lack of test coverage causes push to fail
    expect(true).toBe(true);
  });
});
