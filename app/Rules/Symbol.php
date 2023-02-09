<?php

namespace App\Rules;

use Illuminate\Support\Collection;
use Illuminate\Contracts\Validation\InvokableRule;

class Symbol implements InvokableRule
{
    public function __construct(
        protected Collection $symbols,
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     * @return void
     */
    public function __invoke($attribute, $value, $fail)
    {
        if (!$this->symbols->contains(strtoupper($value))) {
            $fail('Entered :attribute does not exist.');
        }
    }
}
