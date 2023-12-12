import { useState } from "react";
import axios from "axios";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Modal from "./Modal";
import toast from "../utils/toast";
import TrashIcon from "../icons/TrashIcon";
import { Id, Flight, ApiError } from "../types";
import { BASE_URL } from "../config";

interface Props {
  flight: Flight;
  color: string;
  deleteFlight: (id: Id) => void;
}

function FlightCard({ flight, deleteFlight, color }: Props) {
  const [deleteId, setDeleteId] = useState<number | string | null>(null);
  const [isOpenDelModal, setIsOpenDelModal] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: flight.id,
    data: {
      type: "Flight",
      flight,
    },
    disabled: false,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDelete = () => {
    axios.delete(`${BASE_URL}/flight/${deleteId}`).then(() => {
      toast({
        type: "success",
        title: "Successfully deleted mission",
        text: "New mission is deleted from pre-flight",
      });

      deleteFlight(deleteId as Id);
      setDeleteId(null);
      setIsOpenDelModal(false);
    })
    .catch((err: ApiError) => {
      toast({
        type: "error",
        title: err.name,
        text: err.message,
      });
    })
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex-1 opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] 
					items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`rounded-md bg-white border ${color} p-3 border-l-[6px]`}
      >
        <div className="flex justify-between items-center pb-2 border-b">
          <p className="my-auto w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-sm font-bold">
            {flight.title}
          </p>
          <button
            onClick={() => {
              setDeleteId(flight.id);
              setIsOpenDelModal(true);
            }}
            className="stroke-gray-500 rounded"
          >
            <TrashIcon />
          </button>
        </div>
        <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap pt-2 text-sm">
          {flight.description}
        </p>

        <Modal
          title="DELETE - MISSION"
          confirmText="DELETE"
          isOpen={isOpenDelModal}
          onClose={() => setIsOpenDelModal(false)}
          onConfirm={handleDelete}
        >
          <h3 className="text-sm font-semibold py-4">
            Are you sure? You can't undo this action afterwards
          </h3>
        </Modal>
      </div>
    </>
  );
}

export default FlightCard;
