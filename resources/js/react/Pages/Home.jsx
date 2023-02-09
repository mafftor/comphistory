import React from 'react';
import axios from 'axios';
import { ChartComponent } from '../Shared/ChartComponent';

export default function Home(){
    const initialFormState = {
        symbol: "GOOG",
        start_date: "01.01.2023",
        end_date: "08.02.2023",
        email: "test@test"
    };

    const [form, setForm] = React.useState(initialFormState);
    const [errors, setErrors] = React.useState([]);
    const [prices, setPrices] = React.useState([]);
    const [watermark, setWatermark] = React.useState("Please start searching...");

    const handleInputChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    function sendRequest() {
        setErrors([]);

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
                setWatermark(response.data.symbol)
            })
            .catch(e => {
                setErrors(e.response.data);
              console.log(e);
            });
    }

    function displayErrors(field) {
        return (
            <>{errors.errors && errors.errors[field] &&
            errors.errors[field].map((msg, i) => (
                <p key={i} class="mt-2 text-sm text-red-600 dark:text-red-500">{msg}</p>
            ))}</>
        )
    }

    return(
        <div>
            <div class="m-4 flex justify-between content-center">
                <div className="relative">
                    <input 
                        type="text"
                        id="symbol"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        name="symbol"
                        placeholder=" "
                        value={form.symbol}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="symbol" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Symbol</label>
                    {displayErrors('symbol')}
                </div>
                <div className="relative">
                    <input 
                        type="text"
                        id="start_date"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        name="start_date"
                        placeholder=" "
                        value={form.start_date}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="start_date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Start Date</label>
                    {displayErrors('start_date')}
                </div>
                <div className="relative">
                    <input 
                        type="text"
                        id="end_date"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        name="end_date"
                        placeholder=" "
                        value={form.end_date}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="end_date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End Date</label>
                    {displayErrors('end_date')}
                </div>
                <div className="relative">
                    <input 
                        type="email" 
                        id="email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        name="email"
                        placeholder=" "
                        value={form.email}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    {displayErrors('email')}
                </div>
                <div>
                    <button onClick={sendRequest} class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Search</button>
                </div>
            </div>

            <ChartComponent data={prices} watermark={watermark}></ChartComponent>

            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th class="px-6 py-3">Date</th>
                    <th class="px-6 py-3">Open</th>
                    <th class="px-6 py-3">High</th>
                    <th class="px-6 py-3">Low</th>
                    <th class="px-6 py-3">Close</th>
                    <th class="px-6 py-3">Volume</th>
                </tr>
                </thead>
                <tbody>
                {prices && 
                    prices.map((price, index) => (
                        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td class="px-6 py-4">{new Date(price.time * 1000).toDateString()}</td>
                            <td class="px-6 py-4">{price.open}</td>
                            <td class="px-6 py-4">{price.high}</td>
                            <td class="px-6 py-4">{price.low}</td>
                            <td class="px-6 py-4">{price.close}</td>
                            <td class="px-6 py-4">{price.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}