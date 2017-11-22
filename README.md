# Thermostat

This program that allow the user to
- control temperature,
- switch power saving mode on or off
- reset temperature back default of 20 degrees
- select their nearest and return outdoor Temperature ( This is achieved through Ajax requests third party api, 'http://openweathermap.org/api' )
- save temperature, power saving mode and their selected city to database. This automatically load the next visit the page.

<p>The minimum temperature is 10. Each power saving mode has their max temperature.</p>
<p>An error message appears when the user tries to perform an invalid operation. An confirmation message is displayed when successfully save to the database.</p>

The last feature is showing the usage which changes colours relative to the temperature.

## Screenshot
![Thermostat](https://github.com/KKOA/thermostat-sinatra/blob/master/ScreenShot.png) 

## Approach
[domain models](https://github.com/KKOA/thermostat-sinatra/blob/master/domain_model.md])
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
- Get Apikey from openweather api
- Create apike.js in public/assets/js/
- Open apikey.js and assign your apikey from openweather to key as string
E.g.
```
var key = '[Your_key]';
```
- Create file called dbconfig.rb in app folder and store store database login credintials
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

- to view the jasmine test navigate to public/assets and open SpecRunner.html
