## What I used

1. Framework - Express;
2. DB - MongoDB;
3. Tests - Jest and SuperTest to make HTTP requests to endpoints;
4. Moment for get months between dates to check is product selling month or longer.

# Instruction

To set data in DB install npm packages and run `npm run test`. It will set data in DB and also run tests for "Typical use case" that was described in test task, some various tests and tests for each endpoints.

So to start server run `npm run dev`. It should start server for you on port 3000. Port you can change in `/config/dev.env`

***

Also I left in repository Postman Collection with endpoints. First folder `Use case` is contain endpoints which are used for "Typical use case" that was described in test task. Request's url hardcoded with `localhost:/3000`. Change if you need.

## Details or things on which I want to point

1. Only Cashier can create `Order` and `Bill`;
2. Cashier can create `Order` and change status from `Выполнен` to `Оплачен`. Also can see order but with statuses `Создан` and `Оплачен`;
3. Consulter can see `Order` only with status `Создан` and update to `Выполнен`;
4. Booker can see `Order` without any limits and set filters to search orders;
5. Date filters only in format: `YYYY-MM-DD`.
6. Products with month selling or longer get discount - 20%.
7. Also tried to make discount system. Tested and watch looks like working but I fell like something can go wrong. :)