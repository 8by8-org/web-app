import { InviterContext, InviterContextType } from '@/contexts/inviter-context';
import { Inviter } from '@/models/Inviter';
import PlayerWelcome from '@/pages/player-welcome';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Builder } from 'builder-pattern';
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';

jest.mock('next/router', () => require('next-router-mock'));

describe('playerwelcome', () => {
    afterEach(cleanup);
    it('opens the actions page when the first button is clicked', async () => {
      mockRouter.push("/initial-path");
      const user = userEvent.setup();
      render (
        <PlayerWelcome />
      );
      const fgetStartedbtn = screen.getAllByRole('button')[0];
      await user.click(fgetStartedbtn);
      expect(mockRouter).toMatchObject({asPath: "/actions"});
    });

    it('opens the actions page when the second button is clicked', async () => {
      mockRouter.push("/initial-path");
      const user = userEvent.setup();
      render (
        <PlayerWelcome />
      );
      const fgetStartedbtn = screen.getAllByRole('button')[1];
      await user.click(fgetStartedbtn); 
      expect(mockRouter).toMatchObject({asPath: "/actions"});
    });

    it("Displays the inviter's name when inviterInfo is not null.", async () => {
      const inviter = Builder<Inviter>().name('Test Name').build();
      const inviterCtxValue = Builder<InviterContextType>().inviterInfo(inviter).build();
      render(
        <InviterContext.Provider value={inviterCtxValue}>
          <PlayerWelcome />
        </InviterContext.Provider>
      );
      
      const greeting = screen.queryByText(new RegExp(`${inviter.name}'s 8by8 Challenge!`));
      expect(greeting).toBeInTheDocument();
      const content = screen.queryByText(new RegExp(`Help ${inviter.name} win their`));
      expect(content).toBeInTheDocument();
    });
  });