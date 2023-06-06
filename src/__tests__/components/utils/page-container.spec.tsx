import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import PageContainer from '@/components/utils/page-container'

describe('PageContainer', () => {
  afterEach(cleanup);

  it('renders a child component', () => {
    render(<PageContainer><div data-testid="childComponent"></div></PageContainer>);

    const childComponent = screen.queryByTestId("childComponent");

    expect(childComponent).toBeInTheDocument();
  });
});