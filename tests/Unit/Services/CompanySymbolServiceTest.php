<?php

namespace Tests\Unit\Services;

use App\Services\CompanySymbolService;
use PHPUnit\Framework\TestCase;
use Illuminate\Support\Facades\Cache;

class CompanySymbolServiceTest extends TestCase
{
    /**
     * @dataProvider provideData
     * @return void
     */
    public function test_that_fetch_is_successful($expectedResult)
    {
        Cache::shouldReceive('rememberForever')
                    ->once()
                    ->with('companySymbols', \Closure::class)
                    ->andReturn($expectedResult);

        $service = new CompanySymbolService();
        $service->fetch();

        $this->assertTrue(true);
    }

    /**
     * @dataProvider provideData
     * @return void
     */
    public function test_that_company_symbol_exists($data)
    {
        $expectedResult = collect(['GOOG', 'AAIT']);

        Cache::shouldReceive('rememberForever')
                    ->once()
                    ->with('companySymbols', \Closure::class)
                    ->andReturn($data);

        $service = new CompanySymbolService();
        $actualResult = $service->fetch()->getCompanySymbols();

        $this->assertTrue($actualResult->diff($expectedResult)->isEmpty());
    }

    /**
     * @dataProvider provideData
     * @return void
     */
    public function test_that_company_data_exist($data)
    {
        $symbol = 'GOOG';

        Cache::shouldReceive('rememberForever')
                    ->once()
                    ->with('companySymbols', \Closure::class)
                    ->andReturn($data);

        $service = new CompanySymbolService();
        $actualResult = $service->fetch()->getCompany($symbol);

        $this->assertEquals($symbol, $actualResult['Symbol']);
    }

    public function provideData()
    {
        return [
            [
                collect([
                    'GOOG' => [
                        "Company Name" => "Google Inc.",
                        "Financial Status" => "N",
                        "Market Category" => "Q",
                        "Round Lot Size" => 100.0,
                        "Security Name" => "Google Inc. - Class C Capital Stock",
                        "Symbol" => "GOOG",
                        "Test Issue" => "N",
                    ],
                    'AAIT' => [
                        "Company Name" => "iShares MSCI All Country Asia Information Technology Index Fund",
                        "Financial Status" => "N",
                        "Market Category" => "G",
                        "Round Lot Size" => 100.0,
                        "Security Name" => "iShares MSCI All Country Asia Information Technology Index Fund",
                        "Symbol" => "AAIT",
                        "Test Issue" => "N",
                    ],
                ])
            ],
        ];
    }
}
