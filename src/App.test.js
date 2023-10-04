import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import App from "./App";

describe("Test App Component", () => {
  test("renders Login component when path is '/'", () => {
    const { getByText } = render(<App />, { wrapper: Router });
    expect(getByText(/Sign In/i)).toBeInTheDocument();
  });

  test("renders Main component when path is '/welcome'", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/welcome"]}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/Welcome to Prokeep!/i)).toBeInTheDocument();
  });
});
