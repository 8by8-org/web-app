import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChallengerWelcome from "@/pages/ChallengerWelcome/challenger-welcome";

describe("ChallengerWelcome", () => {
  afterEach(cleanup);
  it("Matches DOM Snapshot", () => {
    const { container } = render(<ChallengerWelcome />);
    expect(container).toMatchSnapshot();
  });
});
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
