import React, { useState, useEffect } from "react";
import MainCard from "./MainCard";

function CardList() {
	// useState section
	const [list, setList] = useState([]);
	const [dataA, setDataA] = useState(false);
	const [dataB, setDataB] = useState(false);

	// Set color after comparing the values of both estates
	const [priceIsGreater, setPriceIsGreater] = useState("white");
	const [floorAreaIsGreater, setFoorAreaIsGreater] = useState("white");
	const [landAreaIsGreater, setLandAreaIsGreater] = useState("white");
	const [pageIndex, setPageIndex] = useState([0, 10]);

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

	useEffect(() => {
		compareCards();
	}, [dataA, dataB]);

	function compareCards() {
		if (dataA && dataB) {
			// convert object strings to numbers for comparison
			let priceA = dataA.prize_czk;
			let priceB = dataB.prize_czk;
			let floorAreaA = Number(dataA.building_area);
			let floorAreaB = Number(dataB.building_area);
			let landAreaA = Number(dataA.land_area);
			let landAreaB = Number(dataB.land_area);

			// update color to red or green depending on value
			if (priceA > priceB) {
				setPriceIsGreater(["tomato", "lightgreen"]);
			} else {
				setPriceIsGreater(["lightgreen", "tomato"]);
			}

			if (floorAreaA > floorAreaB) {
				setFoorAreaIsGreater(["lightgreen", "tomato"]);
			} else {
				setFoorAreaIsGreater(["tomato", "lightgreen"]);
			}

			if (landAreaA > landAreaB) {
				setLandAreaIsGreater(["lightgreen", "tomato"]);
			} else {
				setLandAreaIsGreater(["tomato", "lightgreen"]);
			}
		} else {
			return;
		}
	}

	function nextPage() {
		if (pageIndex[1] <= list.length) {
			setPageIndex([pageIndex[0] + 10, pageIndex[1] + 10]);
		} else {
			return;
		}
	}

	function previousPage() {
		if (pageIndex[0] >= 10) {
			setPageIndex([pageIndex[0] - 10, pageIndex[1] - 10]);
		} else {
			return;
		}
	}

	return (
		<div className="card__list">
			<div className="card__list__gallery">
				<span className="card__list__update__button" onClick={previousPage}>
					Previous 10
				</span>
				{list.slice(pageIndex[0], pageIndex[1]).map((item, key) => {
					return (
						<div
							key={key}
							className="card__list__item cursor--pointer"
							onClick={() => {
								!dataA ? setDataA(item) : setDataB(item);
							}}
						>
							<img src={item.images[0]} alt={item.name_extracted} className="card__list__image" />
							<div className="card__list__text">
								{item.name_extracted} {item.locality}
							</div>
						</div>
					);
				})}
				<span className="card__list__update__button" onClick={nextPage}>
					Next 10
				</span>
			</div>

			<div className="main__cards">
				{dataA ? (
					<div onClick={() => setDataA(null)}>
						<MainCard
							card={dataA}
							priceIsGreater={priceIsGreater[0]}
							floorAreaIsGreater={floorAreaIsGreater[0]}
							landAreaIsGreater={landAreaIsGreater[0]}
						/>
					</div>
				) : null}

				{dataB ? (
					<div onClick={() => setDataB(null)}>
						<MainCard
							card={dataB}
							priceIsGreater={priceIsGreater[1]}
							floorAreaIsGreater={floorAreaIsGreater[1]}
							landAreaIsGreater={landAreaIsGreater[1]}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default CardList;
