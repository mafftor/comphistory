<?php 

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class HistoricalDataService {
    protected Collection $prices;

    public function fetch($symbol): HistoricalDataService 
    {
        $response = Http::withHeaders([
            'X-RapidAPI-Key' => env('RAPID_API_KEY'),
            'X-RapidAPI-Host' => env('RAPID_HOST')
        ])
            ->get(env('RAPID_URL'), [
                'symbol' => $symbol,
                'region' => 'US',
            ]);

        $this->prices = collect($response->json()['prices']);

        return $this;
    }

    public function filterWithDates($start_date, $end_date): HistoricalDataService
    {
        $this->prices = $this->prices->filter(function ($item) use ($start_date, $end_date) {
            return !isset($item['type']) && ($item['date'] >= $start_date && $item['date'] <= $end_date);
        });

        return $this;
    }

    public function getPricesData(): array 
    {
        $chart = $this->prices->sortBy('date');
        $chart = $chart->map(function ($item) {
            $item['time'] = $item['date'];
            $item['value'] = $item['volume'];
            $item['color'] = $item['open'] > $item['close'] ? '#f6465d': '#0ecb81';
            unset($item['date'], $item['volume']);

            return $item;
        });

        return $chart->values()->all();
    }
}