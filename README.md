# Getting started

This is just Laravel&React application with nice chart to show you the history of company's shares (I guess ).

## Installation
* `npm i & npm run build`
* `composer install`
* Make a copy of `.env.example` name it `.env`
* Run `php artisan key:generate`
* Run docker containers `./vendor/bin/sail up -d --build`

## Configuration
In order to let your application work, you need to set environment variables in `.env` file.

<b>Requried set to be filled:</b>
* `RAPID_API_KEY=`
* `RAPID_HOST=`
* `RAPID_URL=`
* `COMPANY_SYMBOLS_URL=`

## How to use
* Goto `http://localhost` to open website
* Goto `http://localhost:8025` to open `Mailpit` service to monitor all outgoing emails

## How to run tests
* To run tests and check code coverage `./vendor/bin/sail artisan test --coverage` <i>(my own code coverage 100%, Laravel project in total 85.9%)</i>
* Be happy 😌 🇺🇦