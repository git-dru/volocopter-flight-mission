export type Id = string | number;

export enum FlightState {
    PRE_FLIGHT = "Pre-Flight",
    FLIGHT = "Flight",
    POST_FLIGHT = "Post-Flight",
}

export type Column = {
    id: FlightState;
    title: string;
};

export type Flight = {
    id: Id;
    state: FlightState;
    title: string;
    description: string;
};