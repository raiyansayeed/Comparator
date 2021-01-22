import React from "react";
import { render, cleanup, screen } from "./test-utils";
import "@testing-library/jest-dom";
import { createRouter } from "next/router";
import Home from "../components/Home";


afterEach(cleanup);

it("should render Home", () => {
    const { getByTestId } = render(<Home />, {
        router: { pathname: "/" },
    });
    expect(screen.getByText("Object-Oriented")).toBeInTheDocument();
});
