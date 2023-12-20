import { useRouter } from 'next/router';
import mockRouter from 'next-router-mock';

import { render, cleanup, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Notification from "@/components/notification/notifications";

jest.mock('next/router', () => require('next-router-mock'));

describe('Notifications', () => {
  afterEach(() => cleanup());

  it('renders notifications component', () => {
    const {container} = render(<Notification enable={false} text={""}></Notification>);

    expect(container).toMatchSnapshot();
  });

  it('renders notifications component with enable', () => {
    const {container} = render(<Notification enable={true} text={""}></Notification>);

    expect(container).toMatchSnapshot();
  });

  it('renders notifications component with text', () => {
    const {container} = render(<Notification enable={false} text={"Test"}></Notification>);

    expect(container).toMatchSnapshot();
  });

  it('triggers useEffect on prop change', async () => {
    const { rerender } = render(<Notification enable={false} text={"Test"} />);

    act(() => {
      rerender(<Notification enable={true} text={"Test"} />);
    });

    act(() => {
      rerender(<Notification enable={true} text={""} />);
    });
  });
});