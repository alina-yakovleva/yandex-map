export const SEPARATOR = "-";

export const getUniqCities = (array) => {
  const cache = {};

  return array.filter((el) => {
    if (cache[el.CITY]) {
      return false;
    }

    cache[el.CITY] = true;

    return true;
  });
};

export const getUniqMarkers = (array) => {
  const cache = {};

  return array.filter((el) => {
    const key = [el.LAT, el.LNG].join(SEPARATOR);

    if (cache[key]) {
      return false;
    }

    cache[key] = true;

    return true;
  });
};
