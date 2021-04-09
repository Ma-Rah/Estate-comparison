function EstateDetails(props) {
  const {
    images,
    name,
    prize_czk,
    locality,
    locality_labels,
    labels,
    land_area,
    building_area,
    company_logo,
    company_name,
  } = props.data;

  const neighborhoodDetails = Object.values(locality_labels);

  return (
    <div className="estate">
      <button
        onClick={() => props.setDetailedCard(null)}
        className="main__card--close"
      >
        <span>Remove</span>
      </button>
      <div className="estate__card">
        {images ? (
          <div className="estate__image__container">
            <img src={images && images[0]} alt={name} />
            <img src={images && images[1]} alt={name} />
            <img src={images && images[2]} alt={name} />
          </div>
        ) : null}{" "}
        <div className="estate__detail__container">
          <div className="estate__details">
            <div>{name}</div>
            <div>
              <span className="text--bold">Price</span>
              <span>{prize_czk} CZK</span>
            </div>
            <div className="locality">
              <span className="text--bold">Locality</span>
              <span>{locality}</span>
            </div>
            <div>
              <span className="text--bold">Floor area</span>
              <span>{building_area} m²</span>
            </div>
            <div>
              <span className="text--bold ">Land area</span>
              <span>{land_area} m²</span>
            </div>
            {labels.garage || labels.parking_lots ? (
              <div>
                <span className="text--bold ">Parking</span>
                {labels.garage && "Garage "}
                {labels.parking_lots && "Parking lots "}{" "}
              </div>
            ) : null}
            {labels.furnished ||
            labels.partly_furnished ||
            labels.not_furnished ? (
              <div>
                <span className="text--bold ">Furnished</span>
                {labels.furnished && "Furnished "}
                {labels.partly_furnished && "Partly furnished "}
                {labels.not_furnished && "Not furnished "}
              </div>
            ) : null}
            {labels.basin || labels.cellar || labels.wooden ? (
              <div>
                <span className="text--bold ">Features</span>
                {labels.basin && "Basin "}
                {labels.cellar && "Cellar "}
                {labels.wooden && "Wooden "}
              </div>
            ) : null}

            <div>
              <span className="text--bold">Neighborhood</span>
            </div>
          </div>
          <div className="neighborhood">
            {neighborhoodDetails &&
              neighborhoodDetails.map((label, index) => {
                return (
                  <span key={index} className="neighborhood__detail">
                    {label}
                  </span>
                );
              })}
          </div>
        </div>
        <div className="main__card__company">
          {company_logo ? <img src={company_logo} alt={name} /> : null}
          <p>{company_name}</p>
        </div>
      </div>
    </div>
  );
}

export default EstateDetails;
