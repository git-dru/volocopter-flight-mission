import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Flight } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
	flight: Flight;
	color: string;
	deleteFlight: (id: Id) => void;
}

function FlightCard({ flight, deleteFlight, color }: Props) {
	const [mouseIsOver, setMouseIsOver] = useState(false);

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
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`rounded-md bg-white border ${color} p-3 border-l-[6px]`}
			onMouseEnter={() => {
				setMouseIsOver(true);
			}}
			onMouseLeave={() => {
				setMouseIsOver(false);
			}}
		>
			<div className="flex justify-between items-center pb-2 border-b">
				<p className="my-auto w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-sm font-bold">
					{flight.title}
				</p>
				<button
					onClick={() => {
						deleteFlight(flight.id);
					}}
					className="stroke-gray-500 rounded"
				>
					<TrashIcon />
				</button>
			</div>
			<p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap pt-2 text-sm">
				{flight.description}
			</p>

			{mouseIsOver && (
				<button
					onClick={() => {
						deleteFlight(flight.id);
					}}
					className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
				>
					<TrashIcon />
				</button>
			)}
		</div>
	);
}

export default FlightCard;
