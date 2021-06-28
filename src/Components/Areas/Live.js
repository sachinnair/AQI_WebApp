// import React from 'react';
import { useState } from "react";
import ChartSector from "../Sectors/Chart";
import TableSector from "../Sectors/Table";




export default function LiveArea({ dataSet }) {
  const [cities, setCities] = useState([]);
  const [startTime, setStartTime] = useState(new Date());

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
    
    setStartTime(new Date()); // TODO: Get rid
  }

  return (
    <>
      <ChartSector dataSet={dataSet} cities={cities} currentTime={startTime} />
      <br/>
      <h1 className='font-bold'>Table Data:</h1>
      <TableSector dataSet={dataSet} setCityOnChart={setCityOnChart} />
    </>
  );
}
