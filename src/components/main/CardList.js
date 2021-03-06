import React, { useState, useEffect } from "react";
import EstateDetails from "./EstateDetails";
import MainCard from "./MainCard";

function CardList() {
  // useState section
  const [list, setList] = useState([]);
  const [detailedCard, setDetailedCard] = useState(null);
  const [dataA, setDataA] = useState(null);
  const [dataB, setDataB] = useState(null);
  // Save data for returning to comparison after viewing details
  const [prevDataA, setPrevDataA] = useState(null);
  const [prevDataB, setPrevDataB] = useState(null);

  // Set color after comparing the values of both estates
  const [priceComparison, setPriceComparison] = useState(["white", "white"]);
  const [floorComparison, setFloorComparison] = useState(["white", "white"]);
  const [landComparison, setLandComparison] = useState(["white", "white"]);
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
      if (priceA === priceB) {
        setPriceComparison(["white", "white"]);
      } else if (priceA < priceB) {
        setPriceComparison(["lightgreen", "tomato"]);
      } else {
        setPriceComparison(["tomato", "lightgreen"]);
      }

      if (floorAreaA === floorAreaB) {
        setFloorComparison(["white", "white"]);
      } else if (floorAreaA > floorAreaB) {
        setFloorComparison(["lightgreen", "tomato"]);
      } else {
        setFloorComparison(["tomato", "lightgreen"]);
      }

      if (landAreaA === landAreaB) {
        setLandComparison(["white", "white"]);
      } else if (landAreaA > landAreaB) {
        setLandComparison(["lightgreen", "tomato"]);
      } else {
        setLandComparison(["tomato", "lightgreen"]);
      }

      setPrevDataA(dataA);
      setPrevDataB(dataB);
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
                  setDetailedCard(null);
                  !dataA ? setDataA(item) : setDataB(item);
                }}
              >
                <img
                  src={item.images[0]}
                  alt={item.name_extracted}
                  className="card__list__image"
                />
                <div className="card__list__text">
                  {item.name_extracted} {item.locality}
                </div>
              </div>
            );
          })}
        </div>
        {!dataA && !dataB && !detailedCard ? (
          <h2>Select two estates for comparison</h2>
        ) : null}

        {detailedCard && (
          <button
            onClick={() => {
              setDetailedCard(null);
              setDataA(prevDataA);
              setDataB(prevDataB);
            }}
            className="card__list__update__button text--bold"
          >
            {" "}
            Back to comparison{" "}
          </button>
        )}

        <div className="main__cards">
          {dataA ? (
            <div className="main__card">
              <button
                onClick={() => setDataA(null)}
                className="main__card--close"
              >
                Remove
              </button>
              <MainCard
                data={dataA}
                priceComparison={priceComparison[0]}
                floorComparison={floorComparison[0]}
                landComparison={landComparison[0]}
              />{" "}
              <button
                className="main__card--details"
                onClick={() => {
                  setDetailedCard(dataA);
                  setDataA(null);
                  setDataB(null);
                }}
              >
                View details
              </button>
            </div>
          ) : null}
          {dataB ? (
            <div className="main__card">
              <button
                onClick={() => setDataB(null)}
                className="main__card--close"
              >
                <span>Remove</span>
              </button>
              <MainCard
                data={dataB}
                priceComparison={priceComparison[1]}
                floorComparison={floorComparison[1]}
                landComparison={landComparison[1]}
              />{" "}
              <button
                className="main__card--details"
                onClick={() => {
                  setDetailedCard(dataB);
                  setDataA(null);
                  setDataB(null);
                }}
              >
                View details
              </button>
            </div>
          ) : null}
          {detailedCard && (
            <EstateDetails
              data={detailedCard}
              setDetailedCard={setDetailedCard}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CardList;
