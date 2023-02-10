import React from 'react';
import { ChartComponent } from '../Shared/ChartComponent';
import HomeForm from './HomeForm';
import HomeTable from './HomeTable';

export default function Home() {
   
    const [prices, setPrices] = React.useState([]);
    const [watermark, setWatermark] = React.useState("Please start searching...");

    function sendCallback(prices, watermark) {
        setPrices(prices);
        setWatermark(watermark);
    }

    return(
        <div>
            <HomeForm submit={sendCallback}/>
            <ChartComponent data={prices} watermark={watermark}></ChartComponent>
            <HomeTable prices={prices}/>
        </div>
    );
}