import { useEffect, useState } from "react";
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
			<p>Volocopter Code Challenge</p>
			<p>API Status: {apiStatus}</p>
		</div>
	);
};

