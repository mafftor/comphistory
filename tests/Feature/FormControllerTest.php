<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FormControllerTest extends TestCase
{
    /**
     * @return void
     */
    public function test_that_submit_fails_with_incorrect_type_of_request()
    {
        $response = $this->get('/api/submit');

        $response->assertStatus(405);
    }

    /**
     * @return void
     */
    public function test_that_submit_fails_with_no_parameters()
    {
        $response = $this->post('/api/submit');

        $response->assertStatus(302);
    }

    /**
     * @return void
     */
    public function test_that_submit_suceeed_with_parameters()
    {
        $response = $this->post('/api/submit', [
            "symbol" => "GOOG",
            "start_date" => "09.02.2022",
            "end_date" => "09.02.2023",
            "email" => "test@test",
        ]);

        $response->assertStatus(200);
    }

    /**
     * @return void
     */
    public function test_that_submit_fails_with_incorrect_symbol()
    {
        $response = $this->post('/api/submit', [
            "symbol" => "INVALID_SYMBOL",
            "start_date" => "09.02.2022",
            "end_date" => "09.02.2023",
            "email" => "test@test",
        ]);

        $response->assertStatus(302);
    }
}
