import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Footer from '@/components/footer/footer';

describe('Footer', () => {
  afterEach(cleanup);
  it('opens the 8by8 facebook link when the corresponding button is clicked and isPreview is false.', async () => {
    window.open = jest.fn();
    const user = userEvent.setup();
    render (
      <Footer />
    );
    const fbBtn = screen.getAllByRole('button')[0];
    await user.click(fbBtn);
    expect(window.open).toHaveBeenCalledWith("https://www.facebook.com/8by8vote/", "_blank");
  });

  it('opens the 8by8 linkedin link when the corresponding button is clicked and isPreview is false.', async () => {
    window.open = jest.fn();
    const user = userEvent.setup();
    render (
      <Footer />
    );
    const linkedInBtn = screen.getAllByRole('button')[1];
    await user.click(linkedInBtn);
    expect(window.open).toHaveBeenCalledWith("https://www.linkedin.com/company/8by8vote/", "_blank");
  });

  it('opens the 8by8 instagram link when the corresponding button is clicked and isPreview is false.', async () => {
    window.open = jest.fn();
    const user = userEvent.setup();
    render (
      <Footer />
    );
    const instaBtn = screen.getAllByRole('button')[2];
    await user.click(instaBtn);
    expect(window.open).toHaveBeenCalledWith("https://www.instagram.com/8by8vote/", "_blank");
  });

  it('does not call window.open when isPreview is true.', async () => {
    window.open = jest.fn();
    const user = userEvent.setup();
    render (
      <Footer isPreview/>
    );
    const socialButtons = screen.getAllByRole('button');
    for(const btn of socialButtons) {
      await user.click(btn);
    }
    expect(window.open).not.toHaveBeenCalled();
  });
});