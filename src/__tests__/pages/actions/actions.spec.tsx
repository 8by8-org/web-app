import { InviterContext, InviterContextType } from '@/contexts/inviter-context';
import { RewardsContext, RewardsContextType } from '@/contexts/rewards-context';
import { UserContext, UserContextType } from '@/contexts/user-context';
import { Inviter } from '@/models/Inviter';
import { Rewards } from '@/models/Rewards';
import { User } from '@/models/User';
import Actions from '@/pages/actions';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Builder } from 'builder-pattern';
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';

jest.mock('next/router', () => require('next-router-mock'));

describe('playerwelcome', () => {
  afterEach(cleanup);

  it('opens the voterreg page when the first button is clicked', async () => {
    const userInfo = Builder<User>().name('Test').avatar('1').registeredVoter(false).notifyElectionReminders(false).startedChallenge(false).build();
    const userCtxValue = Builder<UserContextType>().activeUser(userInfo).build();
    const inviter = Builder<Inviter>().name('Test Name').avatar(1).finishedChallenge(false).build();
    const inviterCtxValue = Builder<InviterContextType>().inviterInfo(inviter).build();

    mockRouter.push("/initial-path");
    const user = userEvent.setup();

    render(
      <UserContext.Provider value={userCtxValue}>
        <InviterContext.Provider value={inviterCtxValue}>
          <Actions />
        </InviterContext.Provider>
      </UserContext.Provider>
    ); 

    const voterregBtn = screen.getByText('Register to vote');
    await user.click(voterregBtn);
    expect(mockRouter).toMatchObject({asPath: "/voterreg"});
  });

  it('opens the electionreminders page when the second button is clicked', async () => {
    const userInfo = Builder<User>().name('Test').avatar('1').registeredVoter(false).notifyElectionReminders(false).startedChallenge(false).build();
    const userCtxValue = Builder<UserContextType>().activeUser(userInfo).build();
    const inviter = Builder<Inviter>().name('Test Name').avatar(1).finishedChallenge(false).build();
    const inviterCtxValue = Builder<InviterContextType>().inviterInfo(inviter).build();

    mockRouter.push("/initial-path");
    const user = userEvent.setup();

    render(
      <UserContext.Provider value={userCtxValue}>
        <InviterContext.Provider value={inviterCtxValue}>
          <Actions />
        </InviterContext.Provider>
      </UserContext.Provider>
    ); 

    const electionreminderBtn = screen.getByText('Get election reminders');
    await user.click(electionreminderBtn); 
    expect(mockRouter).toMatchObject({asPath: "/electionreminders"});
  });

  it('opens the challengerwelcome page when the third button is clicked', async () => {
    const userInfo = Builder<User>().name('Test').avatar('1').registeredVoter(false).notifyElectionReminders(false).startedChallenge(false).build();
    const userCtxValue = Builder<UserContextType>().activeUser(userInfo).build();
    const inviter = Builder<Inviter>().name('Test Name').avatar(1).finishedChallenge(false).build();
    const inviterCtxValue = Builder<InviterContextType>().inviterInfo(inviter).build();

    mockRouter.push("/initial-path");
    const user = userEvent.setup();

    render(
      <UserContext.Provider value={userCtxValue}>
        <InviterContext.Provider value={inviterCtxValue}>
          <Actions />
        </InviterContext.Provider>
      </UserContext.Provider>
    ); 

    const challengerwelcomeBtn = screen.getByText('Take the challenge');
    await user.click(challengerwelcomeBtn); 
    expect(mockRouter).toMatchObject({asPath: "/challengerwelcome"});
  });

  it('opens the choosereward page when the inviter has finished the challenge but the player has not completed all the actions and the reward button is visible and clicked', async () => {
    const rewards = Builder<Rewards>([{
      businessDescription:"Test",
      businessLink:"Test",
      businessType:"Test",
      locationDescription:"Online",
      locationType:"Online",
      logo:"Test",
      name:"Test Name",
      redemptionDescription:"Test",
      rewardAvailable:true,
      rewardConditions:"Test",
      rewardDescription:"Test",
      rewardEndDate: new Date(),
      rewardLink:"Test",
      rewardStartDate:new Date(),
      rewardType:"Online",
    }]).build();
    const rewardsCtxValue = Builder<RewardsContextType>().rewardsInfo(rewards).build();
    const userInfo = Builder<User>().name('Test').avatar('1').registeredVoter(true).notifyElectionReminders(false).startedChallenge(false).build();
    const userCtxValue = Builder<UserContextType>().activeUser(userInfo).build();
    const inviter = Builder<Inviter>().name('Test Name').avatar(1).finishedChallenge(true).build();
    const inviterCtxValue = Builder<InviterContextType>().inviterInfo(inviter).build();
    
    mockRouter.push("/initial-path");
    const user = userEvent.setup();

    render(
      <RewardsContext.Provider value={rewardsCtxValue}>
        <UserContext.Provider value={userCtxValue}>
          <InviterContext.Provider value={inviterCtxValue}>
            <Actions />
          </InviterContext.Provider>
        </UserContext.Provider>
      </RewardsContext.Provider>
    ); 

    const chooserewardBtn = await screen.findByText('Choose a Reward');
    await user.click(chooserewardBtn); 
    expect(mockRouter).toMatchObject({asPath: "/choosereward"});
  });

  it('opens the choosereward page when the inviter has finished the challenge and the player has completed all the actions and the reward button is visible and clicked', async () => {
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
      rewardEndDate: new Date("2050-09-01"),
      rewardLink:"https://www.chefus.com/",
      rewardStartDate:new Date("2022-08-01"),
      rewardType:"Online",
    }]).build();
    const rewardsCtxValue = Builder<RewardsContextType>().rewardsInfo(rewards).build();
    const userInfo = Builder<User>().name('Test').avatar('1').registeredVoter(true).notifyElectionReminders(true).startedChallenge(true).build();
    const userCtxValue = Builder<UserContextType>().activeUser(userInfo).build();
    const inviter = Builder<Inviter>().name('Test Name').avatar(1).finishedChallenge(true).build();
    const inviterCtxValue = Builder<InviterContextType>().inviterInfo(inviter).build();

    mockRouter.push("/initial-path");
    const user = userEvent.setup();

    render(
      <RewardsContext.Provider value={rewardsCtxValue}>
        <UserContext.Provider value={userCtxValue}>
          <InviterContext.Provider value={inviterCtxValue}>
            <Actions />
          </InviterContext.Provider>
        </UserContext.Provider>
      </RewardsContext.Provider>
    ); 
    
    const chooserewardBtn = await screen.findByText('Choose a Reward');
    await user.click(chooserewardBtn); 
    expect(mockRouter).toMatchObject({asPath: "/choosereward"});
  });

  it('opens the signin page when the current user has completed all their actions and the first button is clicked', async () => {
    const userInfo = Builder<User>().name('Test').avatar('1').registeredVoter(true).notifyElectionReminders(true).startedChallenge(true).build();
    const userCtxValue = Builder<UserContextType>().activeUser(userInfo).build();
    const inviter = Builder<Inviter>().name('Test Name').avatar(1).finishedChallenge(true).build();
    const inviterCtxValue = Builder<InviterContextType>().inviterInfo(inviter).build();

    mockRouter.push("/initial-path");
    const user = userEvent.setup();

    render(
      <UserContext.Provider value={userCtxValue}>
        <InviterContext.Provider value={inviterCtxValue}>
          <Actions />
        </InviterContext.Provider>
      </UserContext.Provider>
    );

    const signinBtn = screen.getByText('See Your Challenge');
    await user.click(signinBtn); 
    expect(mockRouter).toMatchObject({asPath: "/signin"});
  });
  
  it(`opens the voter's state's voter registration page when the current user has completed all their actions and the 'Go to state website' button is clicked`, async () => {
    const userInfo = Builder<User>().name('Test').avatar('1').registeredVoter(true).notifyElectionReminders(true).startedChallenge(true).playerState('NY').build();
    const userCtxValue = Builder<UserContextType>().activeUser(userInfo).build();
    const inviter = Builder<Inviter>().name('Test Name').avatar(1).finishedChallenge(true).build();
    const inviterCtxValue = Builder<InviterContextType>().inviterInfo(inviter).build();

    const user = userEvent.setup();
    const mockOpen = jest.fn();
    window.open = mockOpen;

    render(
      <UserContext.Provider value={userCtxValue}>
        <InviterContext.Provider value={inviterCtxValue}>
          <Actions />
        </InviterContext.Provider>
      </UserContext.Provider>
    );

    const signinBtn = screen.getByText('Go to state website');
    await user.click(signinBtn); 
    expect(mockOpen).toHaveBeenCalledWith('https://voterreg.dmv.ny.gov/MotorVoter/', '_blank');
  });
});