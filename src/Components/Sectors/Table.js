import { useEffect, useState } from "react";

export default function TableSector({ dataSet, setCityOnChart }) {
    const rows = [];
    const refreshTime = new Date();

    function getUpdatedTime(time) {
        const timeDiff = (refreshTime.getTime() - (new Date(time)).getTime()) / 1000
        // console.log(timeDiff);
        let updatedAtDetail;
        switch(true) {
            case (timeDiff <= 1):
                updatedAtDetail = 'Updated few seconds ago';
                break;
            case (timeDiff > 1 && timeDiff < 3600):
                updatedAtDetail = 'Updated few minutes ago';
                break;
            default: 
                return time;
        }

        return updatedAtDetail;
    }

    function toggleSelection(e) {
        e.target.parentElement.classList.toggle('bg-coolGray-300');
    }

    function getAQSCategory(data) {
        const val = Math.round(data);
        let txtColor = '' 

        switch(true) {
            case (val > 0 && val <= 50):
                txtColor = 'text-green-600';
                break;
            case (val > 50 && val <= 100):
                txtColor = 'text-green-200';
                break;
            case (val > 100 && val <= 200):
                txtColor = 'text-amber-300';
                break;
            case (val > 200 && val <= 300):
                txtColor = 'text-amber-500';
                break;
            case (val > 300 && val <= 400):
                txtColor = 'text-red-500';
                break;
            case (val > 400 && val <= 500):
                txtColor = 'text-red-900';
                break;
            default:
                txtColor = 'black' 
                break;
        }

        return txtColor;
    }

    for(let x in dataSet) {
        rows.push((<div data-cityId={x} className={`grid grid-cols-3 gap-2`} onClick={toggleSelection} key={x} >
            <span className='text-center'>{x}</span>  
            <span className={`bg-black font-bold text-center ${getAQSCategory(dataSet[x].val)}`}>{(dataSet[x].val).toFixed(2)}</span>
            <span className={`text-sm font-light`}>{getUpdatedTime(dataSet[x].time)}</span>
        </div>))
    } 

    return <div onClick={setCityOnChart}>
        {rows.length > 0 && <div className={`grid grid-cols-3 gap-2 text-white bg-coolGray-600 font-serif`}> 
            <span className="font-bold text-center">City</span>
            <span className="font-bold text-center">AQI (Air Quality Index)</span>
            <span className="font-bold text-center">Last Refreshed</span>  
        </div>}
        {rows}
    </div>
}