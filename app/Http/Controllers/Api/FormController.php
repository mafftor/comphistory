<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use App\Rules\Symbol;
use Illuminate\Support\Collection;

class FormController extends Controller
{
    public function form(Request $request) {
        $validated = $request->validate([
            'symbol' => ['required', new Symbol($this->companySymbols())],
            'start_date' => ['required', 'date', 'before_or_equal:end_date', 'before_or_equal:today'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date', 'before_or_equal:today'],
            'email' => ['required', 'email'],
        ]);

        $response = Http::withHeaders([
            'X-RapidAPI-Key' => '',
            'X-RapidAPI-Host' => ''
        ])
        ->get('', [
            'symbol' => $validated['symbol'],
            'region' => 'US',
        ]);

        $start_date = strtotime($validated['start_date']);
        $end_date = strtotime($validated['end_date'] . '23:59:59');

        $prices = collect($response->json()['prices']);
        $prices = $prices->filter(function ($item) use ($start_date, $end_date) {
            return $item['date'] >= $start_date && $item['date'] <= $end_date;
        });

        return [
            'prices' => $prices,
        ];
    }

    private function companySymbols(): Collection  {
        return Cache::rememberForever('companySymbols', function () {
            $response = Http::get('https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed_json/data/a5bc7580d6176d60ac0b2142ca8d7df6/nasdaq-listed_json.json');

            return $response->collect()->pluck('Symbol');
        });
    }
}
