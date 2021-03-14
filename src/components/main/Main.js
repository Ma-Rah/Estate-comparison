import React, { useEffect, useState } from "react";
import CardList from "./CardList";

function Main() {
	// State section
	const [list, setList] = useState([]);

	// fetch section
	async function fetchList() {
		const url = "https://estate-comparison.codeboot.cz/list.php";
		const response = await fetch(url);
		const data = await response.json();
		setList(data);
	}

	useEffect(() => {
		fetchList();
	}, []);

	return (
		<div>
			<CardList list={list} />
		</div>
	);
}

export default Main;
