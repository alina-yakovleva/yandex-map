import { useState } from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";

import data from "./data.json";

import { getUniqCities, getUniqMarkers, SEPARATOR } from "./utils";

const preparedData = getUniqCities(data);

preparedData.sort(function (a, b) {
  if (a.CITY < b.CITY) return -1;
  if (a.CITY > b.CITY) return 1;
  return 0;
});

const markers = getUniqMarkers(data);

function App() {
  const [coordinates, setCoordinates] = useState([55.751244, 37.618423]);
  const [zoom, setZoom] = useState(5);

  const handleChange = (event) => {
    const coordinates = event.target.value.split(SEPARATOR).map(Number);
    setCoordinates(coordinates);

    setZoom(10);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="select">
          <h3 style={{ textAlign: "center", margin: "10px" }} variant="h4">
            Магазины
          </h3>

          <select value={coordinates.join(SEPARATOR)} onChange={handleChange}>
            <option value={[55.751244, 37.618423].join(SEPARATOR)} disabled>
              Выберите город
            </option>
            {preparedData.map((obj) => (
              <option key={obj.CITY} value={[obj.LAT, obj.LNG].join(SEPARATOR)}>
                {obj.CITY}
              </option>
            ))}
          </select>
        </div>
        <div className="map">
          <h2 className="loader">Загрузка карты...</h2>
          <YMaps>
            <Map
              width="100%"
              height="100%"
              state={{ center: coordinates, zoom }}
            >
              {markers.map((marker) => (
                <Placemark
                  options={{
                    preset: "islands#blueDotIcon",
                  }}
                  key={[marker.LAT, marker.LNG].join(SEPARATOR)}
                  geometry={[marker.LAT, marker.LNG]}
                />
              ))}
            </Map>
          </YMaps>
        </div>
      </div>
    </div>
  );
}

export default App;
