import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useContext } from "react";
import {
  PartnerContext,
  PartnerContextProvider,
} from "@/contexts/partner-context";

function MockChildComponent() {
  const { partnersExist } = useContext(PartnerContext);
  return (
    <div data-testid="test">{partnersExist ? "partners" : "no partners"}</div>
  );
}

describe("PartnerContextProvider", () => {
  afterEach(cleanup);
  it("defaults to an partnersExist value of null.", () => {
    render(
      <PartnerContextProvider>
        <MockChildComponent />
      </PartnerContextProvider>
    );
    const signedOut = screen.queryByTestId("test");
    expect(signedOut).toHaveTextContent("no partners");
  });
});
