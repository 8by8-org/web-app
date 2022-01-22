import React from "react";
import { cleanup, fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
const randomEmail = require('random-email')
import '@testing-library/jest-dom';
import SignupPage from "./SignupPage";
import { useAuth } from "./../../contexts/AuthContext";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);


// Right now this test doesn't work the way as intended
// because it is not rendering the challenge page (we need to figure out how to do this)
// As a temporary solution, it is reading a success text being set in Signup the instant
// Before the page loads
test("User can Sign Up successfully", async () => {
	// Load the page
	render(
		<SignupPage />
	);

	// The email for the test signup
	const email = randomEmail();

	// Fillout the form
	fireEvent.change(screen.getByPlaceholderText("Name:", { exact: false }), {target: {value: 'tester mctester'}});
	fireEvent.change(screen.getByPlaceholderText("Email:", { exact: true }), {target: {value: email}});
	fireEvent.change(screen.getByPlaceholderText("Confirm Email:", { exact: false }), { target: {value: email}});
	fireEvent.click(screen.getByTestId("avatar"));
	fireEvent.click(screen.getByTestId("continue-button"));

	// Make sure we load the challenger page
	expect(await screen.findByText("Success")).toBeVisible();
});

test("Non-matching emails throws an error", () => {
	// Load the page
	render(<SignupPage />);

	// Fillout the form
	fireEvent.change(screen.getByPlaceholderText("Name:", { exact: false }), {target: {value: 'tester mctester'}});
	fireEvent.change(screen.getByPlaceholderText("Email:", { exact: true }), {target: {value: randomEmail()}});
	fireEvent.change(screen.getByPlaceholderText("Confirm Email:", { exact: false }), { target: {value: randomEmail()}});
	fireEvent.click(screen.getByTestId("avatar"));
	fireEvent.click(screen.getByTestId("continue-button"));
	expect(screen.getByText("Emails do not match", { exact: true })).toBeInTheDocument();
});
