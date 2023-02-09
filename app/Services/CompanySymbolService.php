<?php 

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class CompanySymbolService {
    public function companySymbols(): Collection  {
        return Cache::rememberForever('companySymbols', function () {
            $response = Http::get(env('COMPANY_SYMBOLS_URL'));

            return $response->collect()->pluck('Symbol');
        });
    }
}