import React, { ChangeEvent, useState } from "react";
import Modal from "./Modal";
import { CreateFlight } from "../types";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (inputFields: CreateFlight) => Promise<boolean>;
}

function AddFlightModal({ isOpen, closeModal, handleSubmit }: Props) {
  const [inputFields, setInputFields] = useState<CreateFlight>({
    title: "",
    description: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const onConfirm = async () => {
    const success: boolean = await handleSubmit(inputFields);

    if (success) {
      setInputFields({
        title: "",
        description: "",
      });
    }
  }

  return (
    <Modal
      title="ADD - MISSION"
      confirmText="CREATE"
      isOpen={isOpen}
      onClose={closeModal}
      onConfirm={onConfirm}
    >
      <div className="py-1">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title*
        </label>
        <input
          type="text"
          name="title"
          defaultValue={inputFields.title}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="py-1">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <input
          type="text"
          name="description"
          defaultValue={inputFields.description}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
    </Modal>
  );
}

export default AddFlightModal;
