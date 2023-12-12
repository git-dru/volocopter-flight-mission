import FlightBoard from "./components/FlightBoard";
import { ToastContainer } from "react-toastify";

import './App.css';
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
	return (
		<div>
      <ToastContainer />
			<FlightBoard />
		</div>
	);
};

