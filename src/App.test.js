import { render, screen } from "@testing-library/react";
import App from "./App";
import { renderWithProviders } from "./test/test-uitils";

test("renders App", () => {
    renderWithProviders(<App />);
    const linkElement = screen.getByText(/TeckCraft Assessment/i);
    expect(linkElement).toBeInTheDocument();
});
