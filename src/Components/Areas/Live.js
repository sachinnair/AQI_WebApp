// import React from 'react';
import { useState } from "react";
import ChartSector from "../Sectors/Chart";
import TableSector from "../Sectors/Table";




export default function LiveArea({ dataSet }) {
  const [cities, setCities] = useState([]);

  function setCityOnChart(e) {
    const cityName = (e.target.parentNode.dataset.cityid)

    const indexOfCity = cities.indexOf(cityName)
    if (indexOfCity === -1) {
      setCities(cities => [...cities, cityName])
    } else {
      setCities(cities => {
        const modCities = [...cities];
        modCities.splice(indexOfCity, 1);

        return modCities;
      })
    }
  }

  return (
    <>
      <ChartSector dataSet={dataSet} cities={cities} />
      <br/>
      <h1 className='font-bold'>Table Data:</h1>
      <TableSector dataSet={dataSet} setCityOnChart={setCityOnChart} />
    </>
  );
}
