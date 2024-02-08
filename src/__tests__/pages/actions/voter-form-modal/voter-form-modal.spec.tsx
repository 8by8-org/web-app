import { InviterContext, InviterContextType } from '@/contexts/inviter-context';
import { UserContext, UserContextType } from '@/contexts/user-context';
import { Inviter } from '@/models/Inviter';
import { User } from '@/models/User';
import Actions from '@/pages/actions';
import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Builder } from 'builder-pattern';

import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('Actions', () => {
  afterEach(cleanup);

  it('checks if the voter form modal appears when the user completed all the actions and clicks on the \"Get your registration form again\" button', async () => {
    const userInfo = Builder<User>().name('Test').avatar('1').registeredVoter(true).notifyElectionReminders(true).startedChallenge(true).build();
    const userCtxValue = Builder<UserContextType>().activeUser(userInfo).build();
    const inviter = Builder<Inviter>().name('Test Name').avatar(1).finishedChallenge(true).build();
    const inviterCtxValue = Builder<InviterContextType>().inviterInfo(inviter).build();

    const user = userEvent.setup();

    HTMLDialogElement.prototype.show = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = true;
    })
    
    HTMLDialogElement.prototype.showModal = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = true;
    })
    
    HTMLDialogElement.prototype.close = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = false;
    })

    render(
      <UserContext.Provider value={userCtxValue}>
        <InviterContext.Provider value={inviterCtxValue}>
          <Actions />
        </InviterContext.Provider>
      </UserContext.Provider>
    );
    
    const voterFormModalLink = await screen.findByText('Get your registration form again');
    await user.click(voterFormModalLink);
    const modalText = screen.queryByText('We emailed you!')
    await waitFor(() => {
      expect(modalText).toBeVisible();
    });
    const closeModalBtn = await screen.findByText('OK');
    await user.click(closeModalBtn);
    expect(modalText).not.toBeVisible()
  });
});