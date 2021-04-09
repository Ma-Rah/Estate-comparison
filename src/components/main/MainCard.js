import React, { useState } from "react";

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

  //    Allow user to go through the images
  const [imageIndex, setImageIndex] = useState(0);

  // go to next image or set index to first image
  function nextImage() {
    if (imageIndex < 2) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  }
  // go to previous image or set index to last image
  function previousImage() {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(2);
    }
  }

  return (
    <>
      <div className="main__card__image__container">
        {images ? (
          <div>
            <img src={images && images[imageIndex]} alt={name} />
          </div>
        ) : null}{" "}
      </div>
      <div className="image__button__container">
        <span onClick={previousImage} className="image__button">
          ⬅
        </span>
        <span onClick={nextImage} className="image__button">
          ➡
        </span>
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
