import { useMemo, useState } from "react";
import { Column, Id, Flight, FlightState } from "../types";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import ColumnContainer from "./ColumnContainer";
import FlightCard from "./FlightCard";

const defaultCols: Column[] = [
  {
    id: FlightState.PRE_FLIGHT,
    title: "Pre-Flight",
  },
  {
    id: FlightState.FLIGHT,
    title: "Flight",
  },
  {
    id: FlightState.POST_FLIGHT,
    title: "Post-Flight",
  },
];

const defaultFlights: Flight[] = [
  {
    id: "1",
    state: FlightState.PRE_FLIGHT,
    title: "pre_flight title",
    description: "pre_flight description",
  },
  {
    id: "2",a
    state: FlightState.FLIGHT,
    title: "flight title",
    description: "flight description",
  },
  {
    id: "3",
    state: FlightState.POST_FLIGHT,
    title: "prost_flight title",
    description: "post_flight description",
  },
];
function FlightBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [flights, setFlights] = useState<Flight[]>(defaultFlights);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeFlight, setActiveFlight] = useState<Flight | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div
      className="
				bg-mainBackgroundColor
        m-auto
        w-full
        min-h-screen
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[120px]
				py-[50px]
    "
    >
      <div className="flex justify-between mb-10">
        <div className="text-lg font-bold">Flight Mission Control Tool</div>
        <button
          className="bg-columnBackgroundColor font-bold text-sm rounded-md p-2"
          onClick={() => {}}
        >
          ADD MISSION
        </button>
      </div>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                createFlight={createFlight}
                deleteFlight={deleteFlight}
                flights={flights.filter((flight) => flight.state === col.id)}
              />
            ))}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                createFlight={createFlight}
                deleteFlight={deleteFlight}
                flights={flights.filter(
                  (flight) => flight.state === activeColumn.id
                )}
              />
            )}
            {activeFlight && (
              <FlightCard
                flight={activeFlight}
                deleteFlight={deleteFlight}
                color=""
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createFlight() {
    const newFlight: Flight = {
      id: flights.length + 1,
      state: FlightState.PRE_FLIGHT,
      title: `new title ${flights.length + 1}`,
      description: `new description ${flights.length + 1}`,
    };

    setFlights((flights) => [...flights, newFlight]);
  }

  function deleteFlight(id: Id) {
    setFlights((flights) => flights.filter((flight) => flight.id !== id));
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Flight") {
      setActiveFlight(event.active.data.current.flight);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveFlight(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAFlight = active.data.current?.type === "Flight";
    const isOverAFlight = over.data.current?.type === "Flight";

    if (!isActiveAFlight) return;

    // Im dropping a Flight over another Flight
    if (isActiveAFlight && isOverAFlight) {
      setFlights((flights) => {
        const activeIndex = flights.findIndex(
          (flight) => flight.id === activeId
        );
        const overIndex = flights.findIndex((flight) => flight.id === overId);

        if (flights[activeIndex].state != flights[overIndex].state) {
          // Fix introduced after video recording
          flights[activeIndex].state = flights[overIndex].state;
          return arrayMove(flights, activeIndex, overIndex - 1);
        }

        return arrayMove(flights, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveAFlight && isOverAColumn) {
      setFlights((flights) => {
        const activeIndex = flights.findIndex(
          (flight) => flight.id === activeId
        );

        flights[activeIndex].state = overId as FlightState;
        return arrayMove(flights, activeIndex, activeIndex);
      });
    }
  }
}

export default FlightBoard;
