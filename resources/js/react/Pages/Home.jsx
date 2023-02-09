import React from 'react';
import axios from 'axios';
import { ChartComponent } from '../Shared/ChartComponent';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

export default function Home(){
    let initialStartDate = new Date();
    initialStartDate.setMonth(initialStartDate.getMonth() - 2);
    const initialFormState = {
        symbol: "GOOG",
        start_date: initialStartDate,
        end_date: new Date(),
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
            start_date: form.start_date.toLocaleDateString(),
            end_date: form.end_date.toLocaleDateString(),
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
                <p key={i} className="mt-2 text-sm text-red-600 dark:text-red-500">{msg}</p>
            ))}</>
        )
    }

    return(
        <div>
            <div className="m-4 flex justify-between content-center">
                <div className="relative">
                    <input 
                        type="text"
                        id="symbol"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        name="symbol"
                        placeholder=" "
                        value={form.symbol}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="symbol" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Symbol</label>
                    {displayErrors('symbol')}
                </div>
                <div className="relative z-10">
                    <label htmlFor="start_date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Start Date</label>
                    <DatePicker
                        id="start_date"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        selected={form.start_date}
                        selectsStart
                        startDate={form.start_date}
                        endDate={form.end_date}
                        dateFormat="dd.MM.yyyy"
                        maxDate={form.end_date}
                        onChange={(date) => setForm({...form, start_date: date})}
                    />
                    {displayErrors('start_date')}
                </div>
                <div className="relative z-10">
                    <label htmlFor="end_date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End Date</label>
                    <DatePicker
                        id="end_date"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        selected={form.end_date}
                        selectsEnd
                        startDate={form.start_date}
                        endDate={form.end_date}
                        maxDate={new Date()}
                        minDate={form.start_date}
                        dateFormat="dd.MM.yyyy"
                        onChange={(date) => setForm({...form, end_date: date})}
                    />
                    {displayErrors('end_date')}
                </div>
                <div className="relative">
                    <input 
                        type="email" 
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        name="email"
                        placeholder=" "
                        value={form.email}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    {displayErrors('email')}
                </div>
                <div>
                    <button onClick={sendRequest} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Search</button>
                </div>
            </div>

            <ChartComponent data={prices} watermark={watermark}></ChartComponent>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Open</th>
                    <th className="px-6 py-3">High</th>
                    <th className="px-6 py-3">Low</th>
                    <th className="px-6 py-3">Close</th>
                    <th className="px-6 py-3">Volume</th>
                </tr>
                </thead>
                <tbody>
                {prices && 
                    prices.map((price, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{new Date(price.time * 1000).toDateString()}</td>
                            <td className="px-6 py-4">{price.open}</td>
                            <td className="px-6 py-4">{price.high}</td>
                            <td className="px-6 py-4">{price.low}</td>
                            <td className="px-6 py-4">{price.close}</td>
                            <td className="px-6 py-4">{price.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}