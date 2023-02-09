import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {
	const { data, watermark } = props;
	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: '#161a1e' },
					textColor: '#848e9c',
				},
				grid: {
					vertLines: {
					  color: "#21252c"
					},
					horzLines: {
					  color: "#21252c"
					}
				},
				crosshair: {
					mode: CrosshairMode.Normal
				},
				watermark: {
					text: watermark,
					fontSize: 128,
					color: "rgba(256, 256, 256, 0.04)",
					visible: true
				},
				rightPriceScale: {
					visible: true,
				},
				leftPriceScale: {
					visible: true,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});

			const mainSeries = chart.addCandlestickSeries();
			mainSeries.priceScale().applyOptions({
				scaleMargins: {
					top: 0.1,
					bottom: 0.3,
				},
			});
			mainSeries.setData(data);

			const newSeries = chart.addHistogramSeries({  
				priceFormat: {
					type: 'volume',
				},
				priceScaleId: 'left',
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
		[data, watermark]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};