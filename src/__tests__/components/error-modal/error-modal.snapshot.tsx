import ErrorModal from '@/components/error-modal/error-modal';
import { cleanup, render } from '@testing-library/react';
import { useState } from "react";

describe('ErrorModal', () => {
  HTMLDialogElement.prototype.showModal = () => {};
  HTMLDialogElement.prototype.close = () => {};
  
  afterEach(cleanup);
  it('renders the ErrorModal unchanged.', () => {
    const { container } = render(<ErrorModal isErrorModalShown={true} closeErrorModal={() => {}}/>);
    expect(container).toMatchSnapshot();
  });
});