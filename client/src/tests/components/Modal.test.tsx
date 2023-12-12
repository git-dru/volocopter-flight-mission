// @ts-nocheck
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Modal from "@/components/Modal";

describe("Modal Component", () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  it("should not render when isOpen is false", () => {
    render(
      <Modal
        title="Test Modal"
        confirmText="Confirm"
        isOpen={false}
        onClose={onClose}
        onConfirm={onConfirm}
      >
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("should render correctly when isOpen is true", () => {
    render(
      <Modal
        title="Test Modal"
        confirmText="Confirm"
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
      >
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should call onClose when the close button is clicked", async () => {
    render(
      <Modal
        title="Test Modal"
        confirmText="Confirm"
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
      >
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByTestId("close-button");
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
