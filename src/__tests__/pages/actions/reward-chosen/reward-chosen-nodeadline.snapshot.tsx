import { InviterContext, InviterContextType } from '@/contexts/inviter-context';
import { RewardsContext, RewardsContextType } from '@/contexts/rewards-context';
import { UserContext, UserContextType } from '@/contexts/user-context';
import { Inviter } from '@/models/Inviter';
import { Rewards } from '@/models/Rewards';
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
    
  it('checks if the correct elements appear when the user has completed one action and the inviter has finished their challenge and a reward with no end date has been chosen', async () => {
    const userInfo = Builder<User>().name('Test').avatar('1').registeredVoter(true).notifyElectionReminders(false).startedChallenge(false).playerReward("Chefus").build();
    const userCtxValue = Builder<UserContextType>().activeUser(userInfo).build();
    const inviter = Builder<Inviter>().name('Test Name').avatar(1).finishedChallenge(true).build();
    const inviterCtxValue = Builder<InviterContextType>().inviterInfo(inviter).build();
    const rewards = Builder<Rewards>([{
      businessDescription:"At Chefus, everything we do is to bring a chef-made meal with fresh ingredients to your table at an incredible price.",
      businessLink:"https://www.chefus.com/",
      businessType:"Online deliveries",
      locationDescription:"Online",
      locationType:"Online",
      logo:"/assets/partner-logos/chefus.png",
      name:"Chefus",
      redemptionDescription:"Use code CHEFUS8BY8 at checkout.",
      rewardAvailable:true,
      rewardConditions:"CHEFUS8BY8",
      rewardDescription:"Get $10 off on orders of $20+.",
      rewardEndDate: undefined,
      rewardLink:"https://www.chefus.com/",
      rewardStartDate:new Date("2022-08-01"),
      rewardType:"Online",
    }]).build();
    const rewardsCtxValue = Builder<RewardsContextType>().rewardsInfo(rewards).build();

    const { container } = render(
      <RewardsContext.Provider value={rewardsCtxValue}>
        <UserContext.Provider value={userCtxValue}>
          <InviterContext.Provider value={inviterCtxValue}>
            <Actions />
          </InviterContext.Provider>
        </UserContext.Provider>
      </RewardsContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });
});