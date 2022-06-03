import { useState } from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";

import data from "./data.json";

import { getUniqCities, getUniqMarkers, SEPARATOR } from "./utils";

const preparedData = getUniqCities(data);
const markers = getUniqMarkers(data);

function App() {
  const [coordinates, setCoordinates] = useState([55.751244, 37.618423]);
  const [zoom, setZoom] = useState(5);

  preparedData.sort(function (a, b) {
    if (a.CITY < b.CITY) return -1;
    if (a.CITY > b.CITY) return 1;
    return 0;
  });

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
            Города
          </h3>

          <select value={coordinates.join(SEPARATOR)} onChange={handleChange}>
            {preparedData.map((obj) => (
              <option key={obj.CITY} value={[obj.LAT, obj.LNG].join(SEPARATOR)}>
                {obj.CITY}
              </option>
            ))}
          </select>
        </div>
        <YMaps>
          <Map
            width="1000px"
            height="600px"
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
  );
}

export default App;
