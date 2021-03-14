import React, { useState } from "react";
import MainCard from "./MainCard";

function CardList(props) {
	// Variables
	const newList = [...props.list];

	// useState section
	const [cardA, setCardA] = useState(null);
	const [cardB, setCardB] = useState(null);
	const [showMenu, setShowMenu] = useState(false);
	const [showCards, setShowCards] = useState(false);
	const [dataA, setDataA] = useState([]);
	const [dataB, setDataB] = useState([]);
	// Set color after comparing the values of both estates
	const [priceIsGreater, setPriceIsGreater] = useState("white");
	const [floorAreaIsGreater, setFoorAreaIsGreater] = useState("white");
	const [landAreaIsGreater, setLandAreaIsGreater] = useState("white");

	// fetch section
	async function fetchCardA() {
		const url = `https://estate-comparison.codeboot.cz/detail.php?id=${cardA}`;
		const response = await fetch(url);
		const data = await response.json();
		setDataA(data);
	}

	async function fetchCardB() {
		const url = `https://estate-comparison.codeboot.cz/detail.php?id=${cardB}`;
		const response = await fetch(url);
		const data = await response.json();
		setDataB(data);
	}

	// Fetch comparison data and display cards
	function handleUpdate() {
		fetchCardA();
		fetchCardB();
		setShowCards(true);
	}

	function compareCards() {
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
	}

	return (
		<div className="card__list">
			<div>
				<button
					onClick={handleUpdate}
					onMouseOut={compareCards}
					className="card__list__update__button cursor--pointer "
				>
					Add selected estates
				</button>
			</div>
			<div
				className="card__list__gallery"
				onMouseEnter={() => setShowMenu(true)}
				onMouseLeave={() => setShowMenu(false)}
			>
				{newList.slice(0, 10).map((item, key) => {
					return (
						<div key={key} className="card__list__item cursor--pointer">
							<img src={item.images[0]} alt={item.name_extracted} className="card__list__image" />
							<div className="card__list__text">
								{item.name_extracted} {item.locality}
							</div>
							{/* Let user add to comparison when hovering over the item */}
							{showMenu ? (
								<div>
									<button
										className="card__list__button cursor--pointer"
										onClick={() => setCardA(item.id)}
									>
										A
									</button>
									<button
										className="card__list__button cursor--pointer"
										onClick={() => {
											setCardB(item.id);
										}}
									>
										B
									</button>
								</div>
							) : null}
						</div>
					);
				})}
			</div>
			{showCards ? (
				<div className="main__cards">
					<MainCard
						card={dataA}
						priceIsGreater={priceIsGreater[0]}
						floorAreaIsGreater={floorAreaIsGreater[0]}
						landAreaIsGreater={landAreaIsGreater[0]}
					/>

					<MainCard
						card={dataB}
						priceIsGreater={priceIsGreater[1]}
						floorAreaIsGreater={floorAreaIsGreater[1]}
						landAreaIsGreater={landAreaIsGreater[1]}
					/>
				</div>
			) : null}
		</div>
	);
}

export default CardList;
