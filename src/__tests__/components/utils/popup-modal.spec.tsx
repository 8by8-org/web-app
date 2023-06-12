import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PopupModal from '@/components/utils/popup-modal';
import { useState } from 'react';

describe('PopupModal', () => {
  //add showModal and close to HTMLDialogElement.prototype as they are not recognized
  //as properties of this type of element by the testing framework
  HTMLDialogElement.prototype.showModal = () => {};
  HTMLDialogElement.prototype.close = () => {};
  
  afterEach(cleanup);
  
  it('renders a child component', () => {
    render(
      <PopupModal
        ariaLabel='test modal'
        theme='dark'
        isOpen={true}
        closeModal={() => {}}
        
      >
        <div data-testid='test'></div>
      </PopupModal>
    );
    const modal = screen.queryByTestId('test');
    expect(modal).toBeInTheDocument();
  });

  it('calls HTMLDialogElement.prototype.showModal() and HTMLDialogElement.prototype.close() as the open prop is updated.', async () => {
    function ModalWrapper() {
      const [isOpen, setIsOpen] = useState(true);
      const closeModal = () => setIsOpen(false);
      return (
        <PopupModal
          ariaLabel='test modal'
          theme='dark'
          isOpen={isOpen}
          closeModal={closeModal}
        >
        </PopupModal>
      );
    }
    const user = userEvent.setup();
    jest.spyOn(HTMLDialogElement.prototype, 'showModal');
    jest.spyOn(HTMLDialogElement.prototype, 'close');
    render(<ModalWrapper />);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    const closeBtn = screen.getByLabelText('close dialog');
    await user.click(closeBtn);
    await waitFor(() => expect(HTMLDialogElement.prototype.close).toHaveBeenCalled());
  });

  it('calls closeModal() when the escape key is pressed.', async () => {
    const closeModal = jest.fn();
    render(
      <PopupModal
        ariaLabel='test modal'
        theme='light'
        isOpen={true}
        closeModal={closeModal}
      >
      </PopupModal>
    );
    const dialog = document.querySelector('dialog');
    if(dialog) {
      fireEvent.keyDown(dialog, {
        key: 'Escape'
      });
    }
    expect(closeModal).toHaveBeenCalled();
  });
});

