import PlayerWelcome from '@/pages/player-welcome';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';

jest.mock('next/router', () => require('next-router-mock'));

describe('playerwelcome', () => {
    afterEach(cleanup);
    it('opens the actions page when the first button is clicked', async () => {
      mockRouter.push("/initial-path");
      render (
        <PlayerWelcome />
      );
      const fgetStartedbtn = screen.getAllByRole('button')[0];
      await fireEvent.click(fgetStartedbtn);
      expect(mockRouter).toMatchObject({asPath: "/actions"});
    });

    it('opens the actions page when the second button is clicked', async () => {
      mockRouter.push("/initial-path");
      render (
        <PlayerWelcome />
      );
      const fgetStartedbtn = screen.getAllByRole('button')[1];
      await fireEvent.click(fgetStartedbtn);
      expect(mockRouter).toMatchObject({asPath: "/actions"});
    });
  });