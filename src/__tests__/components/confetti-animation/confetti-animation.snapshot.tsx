import ConfettiAnimation from '@/components/confetti-animation/confetti-animation';
import { cleanup, render } from '@testing-library/react';

describe('ConfettiAnimation', () => {
  afterEach(cleanup);
  it('renders the ConfettiAnimation unchanged.', () => {
    const { container } = render(<ConfettiAnimation time={8000}/>);
    expect(container).toMatchSnapshot();
  });
});