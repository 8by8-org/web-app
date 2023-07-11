import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChallengerWelcome from "@/pages/ChallengerWelcome/challenger-welcome";
import { useRouter } from "next/router";
import { UserContext, UserContextProvider } from "@/contexts/user-context";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
describe("ChallengerWelcome", () => {
  afterEach(cleanup);

  it("Matches DOM Snapshot", () => {
    const { container } = render(<ChallengerWelcome />);
    expect(container).toMatchSnapshot();
  });
  it("Goes to the sign up page when the buttons are clicked", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
    const { container } = render(<ChallengerWelcome />);
    const buttons = container.querySelectorAll("button");
    if (buttons[0]) {
      fireEvent.click(buttons[0]);
    }
    if (buttons[1]) {
      fireEvent.click(buttons[1]);
    }
    expect(push).toHaveBeenNthCalledWith(1, "/signup");
    expect(push).toHaveBeenNthCalledWith(2, "/signup");
  });
  it("Goes to the sign in page when the spans are clicked", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
    const { container } = render(
      <UserContextProvider>
        <ChallengerWelcome />
      </UserContextProvider>
    );

    const spans = container.querySelectorAll("span");
    if (spans[0]) {
      fireEvent.click(spans[0]);
    }
    if (spans[1]) {
      fireEvent.click(spans[1]);
    }
    expect(push).toHaveBeenNthCalledWith(1, "/signin");
    expect(push).toHaveBeenNthCalledWith(2, "/signin");
  });
  it("Goes to why8by8 page when the paragraph link is clicked", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
    const { container } = render(<ChallengerWelcome />);
    const pLink = container.querySelector(".link-2");
    if (pLink) {
      fireEvent.click(pLink);
    }
    expect(push).toHaveBeenCalledWith("/why8by8");
  });
});
