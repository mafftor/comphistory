import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {
	const { data } = props;
	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: '#161a1e' }, // lines color #25293080
					textColor: 'black',
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});

			const mainSeries = chart.addCandlestickSeries({
				upColor: '#0ecb81', 
				downColor: '#f6465d', 
				borderVisible: false,
				wickUpColor: '#0ecb81', 
				wickDownColor: '#f6465d',
			});
			mainSeries.priceScale().applyOptions({
				scaleMargins: {
					top: 0.1,
					bottom: 0.3,
				},
			});
			mainSeries.setData(data);

			const newSeries = chart.addHistogramSeries({  
				// color: '#26a69a',
				priceFormat: {
					type: 'volume',
				},
				priceScaleId: '',
			});
			newSeries.priceScale().applyOptions({
				scaleMargins: {
					top: 0.85,
					bottom: 0,
				},
			});
			newSeries.setData(data);

			chart.timeScale().fitContent();

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};