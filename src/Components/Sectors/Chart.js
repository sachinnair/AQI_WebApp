import { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTooltip,
  createContainer,
} from "victory";

export default function ChartSector({ dataSet, cities }) {
  const [chartData, setChartData] = useState({});

  const CustomZoomVoronoiContainer = createContainer("zoom", "voronoi");


  useEffect(() => {
    setChartData({})
/*     setChartData(chartData => {
      const newChartData = {}
      for(const city of cities) {
        newChartData[city] = chartData[city];
      }

      return newChartData
    }); */
  }, [cities]);

  useEffect(() => {
    const updatedChartData = { ...chartData };
    for (const city of cities) {
      const cityDetails = dataSet[city];
      console.log(cityDetails);
      if (cityDetails) {
        const dataPoint = {
          x: new Date(cityDetails.time),
          y: Number(cityDetails.val),
          l: `${city}`,
        };

        const chartPoints = updatedChartData[city] || [];
        if (chartPoints.map(a => a.y).indexOf(dataPoint.y) === -1)
          chartPoints.push(dataPoint);

        updatedChartData[city] = chartPoints;
      }
    }

    setChartData(updatedChartData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSet]);

  return (
    <div className={`container shadow my-10`}>

      <span className={'font-serif mx-5'}>Click on cities to view Live Data on Graph</span>
      {cities.length > 0 && 
      <div style={{ width: "100%", height: "500px" }}>
        <VictoryChart
          domainPadding={{ y: 50 }}
          scale={{ x: "time", y: "linear" }}
          containerComponent={
            <CustomZoomVoronoiContainer
              zoomDimension="x"
              voronoiDimension="x"
              labels={({ datum }) => `   ${datum.l}: ${datum.y.toFixed(2)}  `}
              /* labels={({ datum }) => `   ${datum.l}: ${datum.y.toFixed(2)} 
                \n Time: ${(datum.x).getHours()}:${(datum.x).getMinutes()}:${(datum.x).getSeconds()}`} */
              labelComponent={
                <VictoryTooltip
                  style={{fontSize: 6}}
                  cornerRadius={0}
                  flyoutStyle={{ fill: "white" }}
                />
              }
            />
          }
        >
          <VictoryAxis
            label="Time"
            style={{
              axisLabel: { fontSize: 10, fontWeight: 800 },
              tickLabels: { fontSize: 8 },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="AQI"
            style={{
              axisLabel: { padding: 40, fontSize: 10, fontWeight: 800 },
              tickLabels: { fontSize: 8 },
            }}
            domain={{ y: [0, 600] }}
            offsetY={200}
          />
          {Object.keys(chartData).map((x) => (
            <VictoryLine
              data={chartData[x]}
            />
          ))}
        </VictoryChart>
      </div>}
    </div>
  );
}
