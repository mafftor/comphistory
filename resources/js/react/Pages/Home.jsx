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
    const [isLoading, setIsLoading] = React.useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: name === 'symbol' ? value.toUpperCase() : value });
    };

    function sendRequest(e) {
        e.preventDefault();

        setErrors([]);
        setIsLoading(true);
        setPrices([]);

        let data = {
            symbol: form.symbol,
            start_date: form.start_date.toLocaleDateString('uk-UA'),
            end_date: form.end_date.toLocaleDateString('uk-UA'),
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
            })
            .finally(e => {
                setIsLoading(false);
            })
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
            <form className="m-4 flex justify-between content-center" onSubmit={sendRequest}>
                <div className="relative">
                    <input 
                        type="text"
                        id="symbol"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        name="symbol"
                        placeholder=" "
                        value={form.symbol}
                        onChange={handleInputChange}
                        required
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
                        onChangeRaw={(e) => {
                            e.preventDefault();
                        }}
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
                        onChangeRaw={(e) => {
                            e.preventDefault();
                        }}
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
                        required
                    />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    {displayErrors('email')}
                </div>
                <div>
                    <button type="submit" disabled={isLoading} className="disabled:opacity-75 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        {isLoading ? <span><svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                        </svg>Loading...</span> : <span>Submit</span>}
                    </button>
                </div>
            </form>

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