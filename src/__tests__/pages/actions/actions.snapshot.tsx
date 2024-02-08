import Actions from '@/pages/actions';
import { cleanup, render } from '@testing-library/react';

import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('Actions', () => {
  afterEach(cleanup);
  
  it('renders actions page unchanged', () => {
    const { container } = render(<Actions />); 
    expect(container).toMatchSnapshot();
  });
});