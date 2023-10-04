import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import Login from "./Login";

describe("Test Login component", () => {
  test("It should show error message when you type empty password", async () => {
    render(<Login />, { wrapper: Router });
    const emailInput = screen.getByLabelText('Email address');
    const submitButton = screen.getByText(/Submit/);

    userEvent.type(emailInput, "eve.holt@reqres.in");
    await waitFor(() => expect(emailInput).toHaveValue("eve.holt@reqres.in"));

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Password is required!/i)).toBeInTheDocument();
    });
  });

  test("It should show error message when you type wrong useremail", async () => {
    render(<Login />, { wrapper: Router });
    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/Submit/);

    userEvent.type(emailInput, "wrong@reqres.in");
    await waitFor(() => expect(emailInput).toHaveValue("wrong@reqres.in"));
    
    userEvent.type(passwordInput, "cityslicka");
    await waitFor(() => expect(passwordInput).toHaveValue("cityslicka"));

    userEvent.click(submitButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText(/User Not Found/i)).toBeInTheDocument();
      }, 1000);
    });
  });

  test("It should navigate to Main page when you type correct email and password", async () => {
    render(<Login />, { wrapper: Router });
    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/Submit/);

    userEvent.type(emailInput, "eve.holt@reqres.in");
    await waitFor(() => expect(emailInput).toHaveValue("eve.holt@reqres.in"));

   
    userEvent.type(passwordInput, "cityslicka");
    await waitFor(() => expect(passwordInput).toHaveValue("cityslicka"));
    
    userEvent.click(submitButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText(/Welcome to Prokeep!/i)).toBeInTheDocument();
      }, 1000);
    });
  });
});