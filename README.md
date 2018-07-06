# Thermostat
 
This is a program that allows the user to
- control the temperature
- switch between the power saving modes
- reset the temperature back to the default of 20 ℃
- select their nearest city and return the outdoor temperature for that city. (This is achieved through an Ajax request to a third party api, 'http://openweathermap.org/api' )
- save the temperature and their selected city to the database. This is automatically loaded the next they visit the page.

The minimum temperature is 10 ℃. Each power saving mode has their own max temperature.
 
An error message appears when the user tries to perform an invalid operation.
 
A confirmation message is displayed when the user successfully saves to the database.
 

The last feature shows the energy usage which changes colours relative to the indoor temperature.
 - green for low energy usage
- white for medium energy usage
- red for high energy usage
## Screenshot
![Thermostat](https://github.com/KKOA/thermostat-sinatra/blob/master/ScreenShot.png)
 
## Approach

[Marcus Rands](https://github.com/Marcus-UK) & I intial start  by creating a [domain model](https://github.com/KKOA/thermostat-sinatra/blob/master/domain_model.md) for a standalone thermostat.
 
 
Afterwards, we proceeded to acquire the necessary software & technology to both build the MVP(Minumum Viable Product).
 
The initial thermostat was created using TDD(Test Driven Development) and we took it in turn to be in the driver seat for this project. The thermostat included the following features
 - increase temperature
- decrease temperature
- reset Temperature
- get power status

Later on, I made my own copy of the repository & continued to implement the features in the domain model.
 
After adding all the features in the domain model to the thermostat, I proceeded to further develop the program into a web app that could both retrieve the outdoor temperature and remember the last indoor temperature & the city it was saved as.
 
## Technologies
- Vanilla JavaScript
- AJAX
- JQuery
- Jasmine
- Sinatra
- Rubocop
- DataMapper
- Postgres
- Shotgun

## Set up Application

This installation assumes that following is installed
- Postgres

```
git clone https://github.com/KKOA/thermostat-sinatra
```

Open terminal / command line and type following

```
psql
CREATE DATABASE [your_database_name]
```

This will create an empty database.
 
Get an Apikey from [OpenWeatherMap api](http://openweathermap.org/api).

Create an environmental variable on your machine with the name 'THERMOSTAT_OPEN_WEATHER_MAP_API_KEY' and assign the apikey. 


Create a file called 'dbconfig.rb' in 'app' folder & store your database login credentials in this file.

E.g.
```
HOST = "[host_name]".freeze
DB = "[database_name]".freeze
USER = "[user_name]".freeze
PASS = "[password]".freeze
```

## How to run the application

Navigate to the top level of clone/downlaod repository on your machine using the terminal/command line & type following 
```
bundle exec shotgun
```
and then hit enter key. This will start server.

Open a browser & navigate to
```
http://localhost:9393/
```
To view the jasmine test, navigate to 'public/assets' folder & open SpecRunner.html in a browser.
 
 
## Author
[Keith Amoah](https://github.com/KKOA/cv)
 
## Contributor
[Marcus Rands](https://github.com/Marcus-UK)
