import React from "react";

function MainCard(props) {
	const {
		images,
		name,
		prize_czk,
		locality,
		land_area,
		building_area,
		company_logo,
		company_name,
	} = props.data;

	const {
		priceComparison: priceColor,
		floorComparison: areaColor,
		landComparison: landColor,
	} = props;

	return (
		<>
			<span className="main__card--close">X</span>
			<div className="main__card__image__container">
				{images ? <img src={images && images[0]} alt={name} /> : null}
			</div>
			<div className="main__card__details">
				<div>{name}</div>
				<div
					style={{
						backgroundColor: priceColor,
					}}
				>
					<span className="text--bold">Price</span>
					<span>{prize_czk} CZK</span>
				</div>
				<div className="locality">
					<span className="text--bold">Locality</span>
					<span>{locality}</span>
				</div>
				<div
					style={{
						backgroundColor: areaColor,
					}}
				>
					<span className="text--bold">Floor area</span>
					<span>{building_area} m²</span>
				</div>
				<div
					style={{
						backgroundColor: landColor,
					}}
				>
					<span className="text--bold ">Land area</span>
					<span>{land_area} m²</span>
				</div>
			</div>
			<div className="main__card__company">
				{company_logo ? <img src={company_logo} alt={name} /> : null}
				<p>{company_name}</p>
			</div>
		</>
	);
}

export default MainCard;
