import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Components/Nav.js";
import NavItem from "./Components/NavItem.js";
import Region from "./Components/Regions/Region";

import LiveArea from "./Components/Areas/Live";
import HistoricalArea from "./Components/Areas/Historical";

const webSocket = new WebSocket("wss://city-ws.herokuapp.com");

function App() {
  const [cityAQIMap, setCityAQIMap] = useState({});
  const [historicalData, setHistoricalData] = useState(new Map());

  function stopSocketConnection() {
    webSocket.close();
  }

  useEffect(() => {
    webSocket.onmessage = (event) => {
      const freshData = JSON.parse(event.data);

      // Details for Live Data stored in next Line
      setCityAQIMap((oldData) => {
        const currentDate = new Date();
        freshData &&
          freshData.forEach((x) => {
            oldData[x.city] = { val: x.aqi, time: currentDate.toString() };
          });

        return { ...oldData };
      });

      // Details for Historical Data stored in next line
      setHistoricalData((historyData) => {
        freshData &&
          freshData.forEach((x) => {
            const freshTime = new Date(event.timeStamp);

            const time = freshTime.getHours() + "_" + freshTime.getMinutes(); // TODO: Get upto 2 minute level

            let citiesList = historyData.get(time) || new Map(); // 21_05 => Map<cities>

            const arrAQIData = citiesList.get(x.city) || []; // Array<aqi>
            arrAQIData.push(x.aqi);
            citiesList.set(x.city, arrAQIData);
            historyData.set(time, citiesList);
          });

        return historyData;
      });
    };
  });

  return (
    <div className="container mx-auto">
      <Nav>
        <NavItem href="#live">Live</NavItem>
        <NavItem href="#historical">Historical</NavItem>
      </Nav>
      <section className="shadow-lg px-4 py-2">
        <Region regionId="live">
          <button
            className="rounded-full text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
            onClick={stopSocketConnection}
          >
            Disconnect
          </button>
          <br />
          <LiveArea dataSet={cityAQIMap} />
        </Region>
        <Region regionId="historical">
          <HistoricalArea dataSet={historicalData} />
        </Region>
      </section>
    </div>
  );
}

export default App;
