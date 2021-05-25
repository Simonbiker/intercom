# Intercom

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.

## Development server

Run `start:proxy:server` for the proxy server and the server that is holding the mock database. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The mock database is to simulate a production database.
To run `npm run server` and navigate to `http://localhost:5000/customers`

## Dev notes

The mock server was created so I could access the raw data close to production.
By subscribing to the service I was able to loop over all the data I needed in `CustomerListComponent`.

All the calculations needed to get the list of customers inside the hundred km radius have been done function `checkingDistenceFromCustomersToIntercom` inside `CustomerListComponent`.

All the data has been outputted to the front end and has been recorded in console logs. All console logs can be accessed by turning the `debug` to true.

Testing was done in a number of ways.
First by checking all the customer latitudes and longitude manually in google maps and creating a list of them within the radius.<br/>
Second by checking console logs after the calculation was done and within if statement.<br/>
Third creating a list of customers that where within the radius and checking that the radian number was less than zero. The console log that best represents this is `inside 100k:` on line 112 inside `CustomerListComponent`
To see an image of the console check list-within-100k.png in assets folder and test-images.

Thank you for spending the time reviewing this.

## Running Angular & Node.js

You can download Nodejs `https://nodejs.org/en/`
If you don't have angular on your file you might need to run `npm install -g @angular/cli`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
