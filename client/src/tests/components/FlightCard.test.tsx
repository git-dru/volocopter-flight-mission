// @ts-nocheck
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FlightCard from "@/components/FlightCard";
import "@testing-library/jest-dom";

const mockFlight = {
  id: "1",
  title: "Test Flight",
  description: "This is a test flight",
  state: "PRE_FLIGHT",
};

const mockDeleteFlight = jest.fn();

describe("FlightCard Component", () => {
  it("renders correctly with flight data", () => {
    render(<FlightCard flight={mockFlight} deleteFlight={mockDeleteFlight} />);

    expect(screen.getByText("Test Flight")).toBeInTheDocument();
    expect(screen.getByText("This is a test flight")).toBeInTheDocument();
  });
});
