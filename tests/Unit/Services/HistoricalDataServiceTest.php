<?php

namespace Tests\Unit\Services;

use App\Services\HistoricalDataService;
use Tests\TestCase;
use Illuminate\Support\Facades\Http;
use Mockery\MockInterface;

class HistoricalDataServiceTest extends TestCase
{
    /**
     * @return void
     */
    public function test_that_fetch_is_successful()
    {
        $symbol = 'GOOG';

        $response = $this->mock(\Illuminate\Http\Client\Response::class, function (MockInterface $mock) {
            $mock->shouldReceive('json')->once()->andReturn(['prices' => []]);
        });
        $pendingRequest = $this->mock(\Illuminate\Http\Client\PendingRequest::class, function (MockInterface $mock) use ($response) {
            $mock->shouldReceive('get')->once()->andReturn($response);
        });

        Http::shouldReceive('withHeaders')
            ->once()
            ->andReturn($pendingRequest);

        $service = new HistoricalDataService();
        $service->fetch($symbol);

        $this->assertTrue(true);
    }

    /**
     * @dataProvider provideResponseJson
     */
    public function test_that_filtering_works($symbol, $start_date, $end_date, $responseJson, $expectedResult)
    {
        $response = $this->mock(\Illuminate\Http\Client\Response::class, function (MockInterface $mock) use ($responseJson) {
            $mock->shouldReceive('json')->once()->andReturn($responseJson);
        });
        $pendingRequest = $this->mock(\Illuminate\Http\Client\PendingRequest::class, function (MockInterface $mock) use ($response) {
            $mock->shouldReceive('get')->once()->andReturn($response);
        });

        Http::shouldReceive('withHeaders')
            ->once()
            ->andReturn($pendingRequest);

        $service = new HistoricalDataService();
        $service->fetch($symbol)->filterWithDates($start_date, $end_date);
        $actualResult = $service->getPricesData();

        $this->assertEquals([], array_diff_key($actualResult, $expectedResult));
    }

    public function provideResponseJson()
    {
        return [
            'Correct set of prices' => [
                'GOOG',
                1675780200,
                1675866600,
                [
                    'prices' => [
                        [
                            "date" => 1675965132,
                            "open" => 100.54000091553,
                            "high" => 100.61000061035,
                            "low" => 93.870002746582,
                            "close" => 94,
                            "volume" => 56492477,
                            "adjclose" => 94,
                        ],
                        [
                            "date" => 1675866600,
                            "open" => 102.69000244141,
                            "high" => 103.58000183105,
                            "low" => 98.455001831055,
                            "close" => 100,
                            "volume" => 73451800,
                            "adjclose" => 100,
                        ],
                        [
                            "date" => 1675780200,
                            "open" => 103.62999725342,
                            "high" => 108.66999816895,
                            "low" => 103.547996521,
                            "close" => 108.04000091553,
                            "volume" => 33738800,
                            "adjclose" => 108.04000091553,
                        ],
                    ]
                ], 
                [
                    [
                        "open" => 103.62999725342,
                        "high" => 108.66999816895,
                        "low" => 103.547996521,
                        "close" => 108.04000091553,
                        "adjclose" => 108.04000091553,
                        "time" => 1675780200,
                        "value" => 33738800,
                        "color" => "#0ecb81",
                    ],
                    [
                        "open" => 102.69000244141,
                        "high" => 103.58000183105,
                        "low" => 98.455001831055,
                        "close" => 100,
                        "adjclose" => 100,
                        "time" => 1675866600,
                        "value" => 73451800,
                        "color" => "#f6465d",
                    ],
                ]
            ],
        ];
    }
}
