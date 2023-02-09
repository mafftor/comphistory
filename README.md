* `npm i & npm run build`
* `composer install`
* Make a copy of `.env.example` name it `.env`
* Run `php artisan key:generate`
* Run docker containers `./vendor/bin/sail up -d --build`
* Goto `http://localhost` to open website
* Goto `http://localhost:8025` to open `Mailpit` service to monitor all outgoing emails
* Run tests and check code coverage `./vendor/bin/sail artisan test --coverage` <i>(my own code coverage 100%, Laravel porject in total 85.9%)</i>
* Be happy 😌 🇺🇦