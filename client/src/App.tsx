import { useEffect, useState } from "react";
import FlightBoard from "./components/FlightBoard";
import './App.css';

export const App = () => {
	const [apiStatus, setApiStatus] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/health")
			.then((response) => response.json())
			.then((data) => {
				setApiStatus(data.status);
			});
	}, []);

	return (
		<div>
			<FlightBoard />
		</div>
	);
};

