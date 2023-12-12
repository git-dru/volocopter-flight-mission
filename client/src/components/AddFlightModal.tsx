import { ChangeEvent, useState } from "react";
import Modal from "./Modal";
import { CreateFlight, FlightState } from "../types";
import toast from "../utils/toast";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (inputFields: CreateFlight) => Promise<boolean>;
}

function AddFlightModal({ isOpen, closeModal, handleSubmit }: Props) {
  const [inputFields, setInputFields] = useState<CreateFlight>({
    state: FlightState.PRE_FLIGHT,
    title: "",
    description: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const onConfirm = async () => {
    if (!inputFields.title.trim() || !inputFields.description.trim()) {
      toast({
        type: "error",
        title: "Valid Error!",
        text: "Please fill required fields.",
      });
    } else {
      const success: boolean = await handleSubmit(inputFields);
  
      if (success) {
        setInputFields({
          state: FlightState.PRE_FLIGHT,
          title: "",
          description: "",
        });
      }
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
          placeholder="Enter title..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="py-1">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description*
        </label>
        <input
          type="text"
          name="description"
          defaultValue={inputFields.description}
          placeholder="Enter description..."
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
    </Modal>
  );
}

export default AddFlightModal;
