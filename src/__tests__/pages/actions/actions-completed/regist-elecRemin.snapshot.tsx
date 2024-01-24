import { InviterContext, InviterContextType } from '@/contexts/inviter-context';
import { UserContext, UserContextType } from '@/contexts/user-context';
import { Inviter } from '@/models/Inviter';
import { User } from '@/models/User';
import Actions from '@/pages/actions';
import { cleanup, render } from '@testing-library/react';
import { Builder } from 'builder-pattern';

import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('Actions', () => {
  afterEach(cleanup);
    
  it('checks if the correct elements appear when the user has registered to vote and signed up for election reminders', async () => {
    const userInfo = Builder<User>().name('Test').avatar('1').registeredVoter(true).notifyElectionReminders(true).startedChallenge(false).build();
    const userCtxValue = Builder<UserContextType>().activeUser(userInfo).build();
    const inviter = Builder<Inviter>().name('Test Name').avatar(1).finishedChallenge(false).build();
    const inviterCtxValue = Builder<InviterContextType>().inviterInfo(inviter).build();

    const { container } = render(
      <UserContext.Provider value={userCtxValue}>
        <InviterContext.Provider value={inviterCtxValue}>
          <Actions />
        </InviterContext.Provider>
      </UserContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });
});