// @ts-nocheck
import React from "react";
import { render, screen } from "@testing-library/react";
import ColumnContainer from "@/components/ColumnContainer"; // Adjust the import path as necessary
import "@testing-library/jest-dom";

describe("ColumnContainer Component", () => {
  const mockColumn = {
    id: "1",
    title: "Test Column",
  };

  const mockFlights = [
    { id: "1", title: "Flight 1", description: "Desc 1", state: "Flight" },
    { id: "2", title: "Flight 2", description: "Desc 2", state: "Flight" },
  ];

  const deleteFlightMock = jest.fn();

  test("renders column with flights", () => {
    render(
      <ColumnContainer
        column={mockColumn}
        deleteFlight={deleteFlightMock}
        flights={mockFlights}
      />
    );

    // Check if the column title is rendered
    expect(screen.getByText("Test Column")).toBeInTheDocument();

    // Check if flights are rendered
    mockFlights.forEach((flight) => {
      expect(screen.getByText(flight.title)).toBeInTheDocument();
    });
  });
});
