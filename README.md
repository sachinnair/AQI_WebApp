In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




# AQI Live Tracker

## Summary:
This project tracks live AQI(Air Quality Index) for cities, received from a websocket connection. A web application is hosted for users to view the live data for multiple cities through a chart and table.

## Web Application URL:
User can load the web application at <insert URL here> 

## Usage:
Once the application is loaded, users are provided with two options to check _Live_ and _Historical_ data

<Insert screenshot here - Tab bar with mouse over Live >

### On clicking _Live_ tab:
Users will view a table showcasing data as seen in screenshot below:
    <Insert screenshot here - Table with data> 

### Table columns:

**City**: Contains unique list of cities whose AQI records are fetched. Cities are randomly listed based on availability of data.

**AQI (Air Quality Index)**: It showcases latest AQI data for a city. The values are color coded based on category as seen in following image.
    <Insert screenshot here - Color Category table>

**Last Updated**: Provides information on when the data was last updated.

### How to view a Chart?

By clicking on records of the table, users will be able to view a chart above the table. Users can select / deselect cities by clicking on the record. For visual understanding, when rows are selected they are highlighted with a gray background and clicking on selected cities deselects them by removing the gray highlight. 

### Chart:

Chart showcases Time vs AQI data of a city or multiple cities as per selections on the table. Each time a city is added or removed from the list, data on chart is reset. 

Features: 
    - Has a tooltip. 
    - Can be zoomed on Time (x-axis) 


#### Assessment of Chart Library:

I had created a list of criteria on which I would evaluate the charting library:
- Should be easy to implement and customize.
- Must support developments in React as well as React-Native 
- Project must be actively maintained and backed by a strong team or organization.

I went through few notable React supported chart projects, evaluating them against my criteria. The evaluation was quite superficial due to time limits still Victory Charts as a choice had following reasons:
- Quite popular and trending react chart library
- Documentation is better compared to other popular libraries viz. Bizcharts, visx, etc.
- Has sufficient Samples / Gallery.
- Witnessed room for customizations.
- Project supports React-Native developments.
- Formidable actively develops and maintains this project. Their decade worth experience and use cases, both past and future, must have influenced the solution.

Evaluations that were ignored:
- Build size
- Perfomance implications due to support for only SVG and not Canvas.

## Websocket Server:

The websocket server URL provided in the assignment sheet is ws://city-w.herokuapp.com/ Subscribing to this URL wouldn't fetch response data as the server responds to a successful handshake request from browser only over wss protocol rather than ws.

The wss protocol establishes a WebSocket over an encrypted TLS connection, while the ws protocol uses an unencrypted connection.

For above reasons, websocket URL has been corrected to **wss**://city-w.herokuapp.com/

## Features built vs Time Taken:
| Features built | Time taken |
| --- | ---: | 
| [See Live data on table](#see-live-data-on-table) | 1h | 
| [See, category based, colored Live data on table](#see-category-based-colored-live-data-on-table) | 15m | 
| [See Live data on chart for selected city](#see-live-data-on-chart-for-selected-city) | 5h 20m | 
| [Multi-select cities on table for Live data on chart](#multi-select-cities-on-table-for-live-data-on-chart) | 20m |
| [See Live data across multiple cities through chart](#see-live-data-across-multiple-cities-through-chart) | 20m | 
| [Chart with tooltip](#chart-with-tooltip) | 20m | 
| [Chart with zoom feature](#chart-with-zoom-feature) | 15m | 
| [Option to have tabbed browsing using Tailwind](#option-to-have-tabbed-browsing-using-tailwind) | 50m | 

Check [breakdown of efforts](#breakdown-of-efforts-for-development) for more details:

### Breakdown of efforts for Development:

#### See Live data on table
| Pre Analysis tasks | Time taken |
| --- | ---: | 
| Check websocket connection and identify response data | 10m |
| Identify data structure for table | 15m |

| Development | Time taken |
| --- | ---: | 
| Create Table structure - UI | 5m |
| Map data from websocket connection to table | 30m* |

*Spike created: Initially analysed data structure using Map object didn't work out so had to be replaced with an Object

#### See, category based, colored Live data on table
| Pre Analysis tasks | Time taken |
| --- | ---: | 

| Development | Time taken |
| --- | ---: | 
| Adding dynamic classes based on values provided to color code | 15m |

#### See Live data on chart for selected city
| Pre Analysis tasks | Time taken |
| --- | ---: | 
| Finalize on Chart Library | 1h |
| POC on charts | 4h |
| Identify data structure for chart – Single city data | 10m |

| Development | Time taken |
| --- | ---: | 
| Map table data to chart data | 5m |
| Plot chart from data – Single city | 5m |

#### Multi-select cities on table for Live Data on chart 
| Pre Analysis tasks | Time taken |
| --- | ---: | 

| Development | Time taken |
| --- | ---: | 
| Users being able select / deselect city from table | 20m |

#### See Live data across multiple cities through chart
| Pre Analysis tasks | Time taken |
| --- | ---: | 

| Development | Time taken |
| --- | ---: | 
| Use data to populate multiple cities on chart | 20m |

#### Chart with tooltip
| Pre Analysis tasks | Time taken |
| --- | ---: | 

| Development | Time taken |
| --- | ---: | 
| Tooltip on chart | 20m* |

*Spike created: Tooltip showcased multiple instances of same AQI at specific points. 

#### Chart with zoom feature
| Pre Analysis tasks | Time taken |
| --- | ---: | 

| Development | Time taken |
| --- | ---: | 
| Zoom on chart | 15m |

#### Option to have tabbed browsing using Tailwind
| Pre Analysis tasks | Time taken |
| --- | ---: | 
| POC’s for Tailwind CSS | 30m |

| Development | Time taken |
| --- | ---: | 
| Tabbed layout creation | 20m |


## Deployment and Automation:

## Total Time invested:

As per table - [Features built vs Time Taken](#features-built-vs-time-taken) - Total time taken: 8h 10m 
Project Documentation - 4h
Project creation - 10m
Project deployment -  

## Further work:
- Test cases 
- Data showcase on clicking _Historical_ tab. 

## Spikes
- Project setup
- Deployment
- Design and interactions
- Making chart responsive
- Working with Axes and containers for charts
- Tooltip issue – showcasing multiple data points for same time instance
