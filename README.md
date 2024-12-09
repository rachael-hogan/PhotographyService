## Run Frontend
cd Frontend
npm run start

## Run Backend
cd Backend 
cd src
php -S localhost:8000

## Run Tests
cd Backend
./vendor/bin/phpunit --bootstrap vendor/autoload.php tests/PhotographersTest.php
