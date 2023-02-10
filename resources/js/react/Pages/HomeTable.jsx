import React from 'react';

export default function HomeTable(props) {
    const { prices } = props;

    return(
        <>
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
        </>
    );
}