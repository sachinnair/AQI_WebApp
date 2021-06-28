import { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryTooltip,
  createContainer,
  VictoryVoronoiContainer,
} from "victory";

export default function ChartSector({ dataSet, cities, currentTime }) {
  const [chartData, setChartData] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState();
  const [zoomDomain, setZoomDomain] = useState();

  const CustomZoomVoronoiContainer = createContainer("zoom", "voronoi");

  function handleZoom(domain) {
    setSelectedDomain(domain);
  }

  function handleBrush(domain) {
    setZoomDomain(domain);
  }

  useEffect(() => {
    setChartData({});
  }, [cities]);

  useEffect(() => {
    const updatedChartData = { ...chartData };
    for (const city of cities) {
      const cityDetails = dataSet[city];
      console.log(cityDetails);
      if (cityDetails) {
        const dataPoint = {
          x: new Date(cityDetails.time),
          y: Number(cityDetails.val.toFixed(2)),
          l: `${city}: `,
        };

        const chartPoints = updatedChartData[city] || [];
        chartPoints.push(dataPoint);

        updatedChartData[city] = chartPoints;
      }
    }

    setChartData(updatedChartData);
  }, [dataSet]);

  return (
    <>
      <span>Click on city to view Live Data on Graph</span>
      <div style={{ width: "100%", height: "500px" }}>
        <VictoryChart
          domainPadding={{ y: 50 }}
          scale={{ x: "time", y: "linear" }}
          containerComponent={
            <CustomZoomVoronoiContainer
              zoomDimension="x"
              voronoiDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={handleZoom}
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
              labels={({ datum }) => `   ${datum.l} ${datum.y}   `}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={0}
                  flyoutStyle={{ fill: "white" }}
                />
              }
              data={chartData[x]}
            />
          ))}
        </VictoryChart>
      </div>

      {/* <VictoryChart
            width={550}
            height={90}
            scale={{x: "time"}}
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            containerComponent={
              <VictoryBrushContainer responsive={false}
                brushDimension="x"
                brushDomain={selectedDomain}
                onBrushDomainChange={handleBrush}
              />
            }
          >
            <VictoryAxis
              tickValues={[
                new Date(2020, 1, 1),
                new Date(2021, 1, 1),
                new Date(2022, 1, 1),
                new Date(2023, 1, 1),
                new Date(2024, 1, 1),
                new Date(2025, 1, 1)
              ]}
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={chartData}
            />
          </VictoryChart> */}
    </>
  );
}
