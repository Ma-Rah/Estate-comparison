import React, { useState, useEffect } from "react";
import MainCard from "./MainCard";

function CardList() {
	// useState section
	const [list, setList] = useState([]);
	const [dataA, setDataA] = useState(false);
	const [dataB, setDataB] = useState(false);

	// Set color after comparing the values of both estates
	const [priceComparison, setPriceComparison] = useState("white");
	const [floorComparison, setFloorComparison] = useState("white");
	const [landComparison, setLandComparison] = useState("white");
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
				setPriceComparison(["tomato", "lightgreen"]);
			} else {
				setPriceComparison(["lightgreen", "tomato"]);
			}

			if (floorAreaA > floorAreaB) {
				setFloorComparison(["lightgreen", "tomato"]);
			} else {
				setFloorComparison(["tomato", "lightgreen"]);
			}

			if (landAreaA > landAreaB) {
				setLandComparison(["lightgreen", "tomato"]);
			} else {
				setLandComparison(["tomato", "lightgreen"]);
			}
		} else {
			return;
		}
	}, [dataA, dataB]);

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
		<div className="container">
			<div className="card__list">
				<div className="card__list__navigation">
					<div className="card__list__update__button" onClick={previousPage}>
						Previous 10
					</div>
					<div className="card__list__update__button" onClick={nextPage}>
						Next 10
					</div>
				</div>

				<div className="card__list__gallery">
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
				</div>

				<div className="main__cards">
					{dataA ? (
						<div onClick={() => setDataA(null)}>
							<MainCard
								data={dataA}
								priceComparison={priceComparison[0]}
								floorComparison={floorComparison[0]}
								landComparison={landComparison[0]}
							/>
						</div>
					) : null}

					{dataB ? (
						<div onClick={() => setDataB(null)}>
							<MainCard
								data={dataB}
								priceComparison={priceComparison[1]}
								floorComparison={floorComparison[1]}
								landComparison={landComparison[1]}
							/>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default CardList;
