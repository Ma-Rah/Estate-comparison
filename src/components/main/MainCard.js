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
	} = props.card;

	return (
		<div className="main__card">
			<span className="main__card--close">X</span>
			<div>{images ? <img src={images && images[0]} alt={name} /> : null}</div>
			<div className="main__card__details">
				<div>{name}</div>
				<div
					style={{
						backgroundColor: props.priceIsGreater,
					}}
				>
					<span className="text--bold">Price</span>
					<span>{prize_czk} CZK</span>
				</div>
				<div>
					<span className="text--bold">Locality</span>
					<span>{locality}</span>
				</div>
				<div
					style={{
						backgroundColor: props.floorAreaIsGreater,
					}}
				>
					<span className="text--bold">Floor area</span>
					<span>{building_area} m²</span>
				</div>
				<div
					style={{
						backgroundColor: props.landAreaIsGreater,
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
		</div>
	);
}

export default MainCard;
