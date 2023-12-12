import React, { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
  confirmText: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

function Modal({
	title,
	confirmText,
	isOpen,
    onClose,
    onConfirm,
    children
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto flex"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div
        ref={modalRef}
        className="relative p-4 bg-white w-full max-w-md m-auto flex-col flex rounded-lg text-left"
      >
        <div className="flex justify-between items-center py-2 border-b-2">
          <h2 className="text-xl">{title}</h2>
          <XMarkIcon
            className="h-6 w-6 mx-1 stroke-black-400 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="py-2">{children}</div>
        <div className="flex justify-end pt-2">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-500 focus:z-10"
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-slate-600 border border-gray-200 rounded-e-lg hover:bg-slate-500 hover:text-blue-500"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;