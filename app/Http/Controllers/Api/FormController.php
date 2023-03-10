<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Rules\Symbol;
use App\Services\CompanySymbolService;
use App\Services\HistoricalDataService;
use App\Mail\FormSubmitted;
use Illuminate\Support\Facades\Mail;

class FormController extends Controller
{
    public function __construct(
        private CompanySymbolService $companySymbolService,
        private HistoricalDataService $historicalDataService,
    ) {}

    public function form(Request $request) {
        $validated = $request->validate([
            'symbol' => ['required', new Symbol($this->companySymbolService->fetch()->getCompanySymbols())],
            'start_date' => ['required', 'date', 'before_or_equal:end_date', 'before_or_equal:today'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date', 'before_or_equal:today'],
            'email' => ['required', 'email'],
        ]);

        // Fetch and filter the historical data
        $this->historicalDataService->fetch($validated['symbol'])
            ->filterWithDates(strtotime($validated['start_date']), strtotime($validated['end_date'] . '23:59:59'));

        // Send an email about form is submitted
        Mail::to($validated['email'])->send(new FormSubmitted($validated, $this->companySymbolService));

        return [
            'prices' => $this->historicalDataService->getPricesData(),
            'symbol' => strtoupper($validated['symbol']),
        ];
    }
}
