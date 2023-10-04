import React from "react";
import { render } from "@testing-library/react";
import Main from "./Main";

describe("Test Main Component", () => {
  test("renders Main component", () => {
    const { getByText } = render(<Main />);
    expect(getByText(/Welcome to Prokeep!/i)).toBeInTheDocument();
  })
});