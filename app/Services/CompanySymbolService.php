<?php 

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class CompanySymbolService {
    static $data;

    public function fetch(): CompanySymbolService {
        self::$data = Cache::remember('companySymbols', 24*60*60, function () {
            $response = Http::timeout(30)->get(env('COMPANY_SYMBOLS_URL'));

            return $response->collect()->keyBy('Symbol');
        });

        return $this;
    }

    public function getCompanySymbols(): Collection  {
        return self::$data->pluck('Symbol');
    }

    public function getCompany(string $symbol): array  {
        return self::$data->get($symbol);
    }
}