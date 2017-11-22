# Thermostat

This program that allow the user to
- control the temperature
- switch between the power saving modes
- reset the temperature back to the default of 20 &#8451;
- select their nearest city and return the outdoor temperature for that city. ( This is achieved through an Ajax requests to a third party api, 'http://openweathermap.org/api' )
- save the temperature and their selected city to the database. This is automatically load the next they visit the page.

<p>The minimum temperature is 10 &#8451;. Each power saving mode has their own max temperature.</p>
<p>An error message appears when the user tries to perform an invalid operation.</p>
<p>
 A confirmation message is displayed when the user successfully save to the database.</p>

The last feature is showing the energy usage which changes colours relative to the indoor temperature.
- green for low energy energy usage
- white for medium energy usage
- red for high energy usage

## Screenshot
![Thermostat](https://github.com/KKOA/thermostat-sinatra/blob/master/ScreenShot.png)

## Approach

The project was start by creating
[domain model](https://github.com/KKOA/thermostat-sinatra/blob/master/domain_model.md) for a standalone thermostat.

Afterward we proceed to acquire the necessary software and technology to both build test and construct the necessary classes for the thermostat.

The initial thermostat was created using TDD(Test Driven Development) and pair programming with a colleague ([Marcus Rands](https://github.com/Marcus-UK)).
The thermostat included the following features
- increase temperature
- decrease temperature
- reset Temperature
- get power status

Later on, I made my own copy of the repo and continued to implement the features in the domain model.

After adding all the features in domain model to the thermostat, I proceed to further develop the program into a web app that could both retrieve the outdoor temperature and remember the last indoor temperature & city it was saved as.

## Technologies
- Vanilla Javascript
- AJAX
- JQuery
- Jasmine
- sinatra
- rubocop
- DataMapper
- postgres
- shotgun

## How run application
- Clone or download the repository
- Install postgres
- Open terminal/command line and type following
```
psql
CREATE DATABASE [your_database_name]
```
This will create an empty database
- Get Apikey from [openweather api](http://openweathermap.org/api)
- Create apike.js in public/assets/js/
- Open apikey.js and assign your apikey from openweather to key as string
E.g.
```
var key = '[Your_key]';
```
- Create file called dbconfig.rb in app folder and store store database login credentials
E.g.
```
HOST = [host_name].freeze
DB = "[database_name]".freeze
USER = 'user_name'.freeze
PASS = '[password]'.freeze
```

- bundle exec shotgun
- Open a browser and navigate to
```
http://localhost:9393/
```

- to view the jasmine test navigate to public/assets and open SpecRunner.html in a browser

## Author
[Keith Amoah](https://github.com/KKOA/cv)

## Contributor
[Marcus Rands](https://github.com/Marcus-UK)
