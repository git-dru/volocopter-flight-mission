// @ts-nocheck
import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import FlightBoard from "@/components/FlightBoard"; // Adjust the import path as necessary
import "@testing-library/jest-dom";

// Mock the axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock data for testing
const mockFlights = [
  {
    id: "1",
    title: "Test Flight 1",
    description: "Description 1",
    state: "PRE_FLIGHT",
  },
  {
    id: "2",
    title: "Test Flight 2",
    description: "Description 2",
    state: "FLIGHT",
  },
  {
    id: "3",
    title: "Test Flight 3",
    description: "Description 3",
    state: "POST_FLIGHT",
  },
];

describe("FlightBoard Component", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: mockFlights, // Mock response for GET request
      status: 200,
    });
  });

  it("renders without crashing", async () => {
    render(<FlightBoard />);
    await waitFor(() => {
      expect(
        screen.getByText("Flight Mission Control Tool")
      ).toBeInTheDocument();
    });
  });

  it("opens and closes the AddFlightModal", async () => {
    render(<FlightBoard />);
    userEvent.click(screen.getByText("ADD MISSION"));

    await waitFor(() => {
      expect(screen.getByText("ADD - MISSION")).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole("button", { name: "CANCEL" }));
    await waitFor(() => {
      expect(screen.queryByText("ADD - MISSION")).not.toBeInTheDocument();
    });
  });
});
