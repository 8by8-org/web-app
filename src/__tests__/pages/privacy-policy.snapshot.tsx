import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import PrivacyPolicy from '@/pages/privacy-policy';

describe('PrivacyPolicy', () => {
  afterEach(cleanup);
  it('renders the privacy policy unchanged.', () => {
    const { container } = render(<PrivacyPolicy />);
    expect(container).toMatchSnapshot();
  });
});