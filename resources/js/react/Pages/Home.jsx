import React from 'react';
import axios from 'axios';
import { ChartComponent } from '../Shared/ChartComponent';

export default function Home(){
    const initialFormState = {
        symbol: "goog",
        start_date: "01.02.2023",
        end_date: "08.02.2023",
        email: "test@test"
    };

    const [form, setForm] = React.useState(initialFormState);
    const [prices, setPrices] = React.useState([]);
    const [chart, setChart] = React.useState([]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    function sendRequest() {
        let data = {
            symbol: form.symbol,
            start_date: form.start_date,
            end_date: form.end_date,
            email: form.email
        };
      
        axios
            .post('/api/submit', data)
            .then(response => {
                setPrices(response.data.prices);
                setChart(response.data.chart);
            })
            .catch(e => {
              console.log(e);
            });
    }

    return(
        <div>
            <div>
                <div>
                    <label htmlFor="symbol">Company Symbol</label>
                    <input 
                        type="text"
                        id="symbol"
                        name="symbol"
                        value={form.symbol}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="start_date">Start Date</label>
                    <input 
                        type="text"
                        id="start_date"
                        name="start_date"
                        value={form.start_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="end_date">End Date</label>
                    <input 
                        type="text"
                        id="end_date"
                        name="end_date"
                        value={form.end_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button onClick={sendRequest}>Submit!</button>
                </div>
            </div>

            <ChartComponent data={chart}></ChartComponent>

            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                </tr>
                </thead>
                <tbody>
                {prices && 
                    prices.map((price, index) => (
                        <tr key={index}>
                            <td>{price.time}</td>
                            <td>{price.open}</td>
                            <td>{price.high}</td>
                            <td>{price.low}</td>
                            <td>{price.close}</td>
                            <td>{price.volume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}