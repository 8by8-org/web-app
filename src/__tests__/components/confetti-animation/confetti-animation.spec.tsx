import ConfettiAnimation from '@/components/confetti-animation/confetti-animation';
import { act, cleanup, render, screen } from '@testing-library/react';

describe('ConfettiAnimation', () => {
  afterEach(cleanup);

  it('checkes if ConfettiAnimation is getting a width attribute', () => {
    render(<ConfettiAnimation time={1000}/>);
    const canvas = screen.getByTestId('confetti animation')
    expect(getComputedStyle(canvas).width).toBe("")
  });

  it('checks if the ConfettiAnimation disappears after the time limit', () => {
    jest.useFakeTimers()

    render(<ConfettiAnimation time={1000}/>);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(screen.getByTestId('confetti hidden'))

    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  });
});