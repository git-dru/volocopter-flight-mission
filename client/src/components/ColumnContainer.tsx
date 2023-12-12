import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Flight, FlightState } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import FlightCard from "./FlightCard";

interface Props {
	column: Column;
	createFlight: (columnId: FlightState) => void;
	deleteFlight: (id: Id) => void;
	flights: Flight[];
}

function ColumnContainer({
	column,
	deleteFlight,
	flights,
}: Props) {

	const flightsIds = useMemo(() => {
		return flights.map((flight) => flight.id);
	}, [flights]);

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: column.id,
		data: {
			type: "Column",
			column,
		},
		disabled: true,
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
				className="
					bg-columnBackgroundColor
					opacity-40
					border-2
					border-pink-500
					w-[33%]
					h-[500px]
					max-h-[500px]
					rounded-md
					flex
					flex-col
				"
			></div>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="
				bg-columnBackgroundColor
				w-[33%]
				h-[700px]
				max-h-[80%]
				rounded-md
				flex
				flex-col
			"
		>
			{/* Column title */}
			<div
				{...attributes}
				{...listeners}
				className="
					text-sm
					h-[60px]
					cursor-grab
					rounded-md
					rounded-b-none
					p-3
					font-bold
					flex
					items-center
					justify-between
				"
			>
				<div className="flex items-center gap-1">
					{column.title}
					<div>
						{`(0)`}
					</div>

				</div>
			</div>

			{/* Column flight container */}
			<div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
				<SortableContext items={flightsIds}>
					{flights.map((flight) => (
						<FlightCard
							color={column.id === FlightState.PRE_FLIGHT ? `border-preFlight` : (column.id === FlightState.FLIGHT ? 'border-flight' : 'border-postFlight')}
							key={flight.id}
							flight={flight}
							deleteFlight={deleteFlight}
						/>
					))}
				</SortableContext>
			</div>
		</div>
	);
}

export default ColumnContainer;
