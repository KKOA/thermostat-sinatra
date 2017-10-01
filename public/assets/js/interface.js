$(document).ready(function () {
    var myThermostat = new Thermostat();
    // console.log(key + 'd');
    // var appid = '&APPID=7ccc367902b839bf72c41f4b9ad2bcce';
    // var city = 'London';
    // var unit = '&units=metric';
    // var url = 'http://api.openweathermap.org/data/2.5/weather?q=';// + city + appid + unit;
    // url += city;
    // url += appid;
    // url += unit;
    //
    // console.log(url);
    // var x;
    //  var data = $.get(url, function(response) {
    //     console.log(response);
    //     // var dataJson = response.responseJSON['main']['temp'];
    //     // console.log(temp['main']);
    //     // console.log(temp['weather'][0]['main']);
    //     var city = response['name'];
    //     var temp = Math.floor(response['main']['temp']);
    //     console.log(city);
    //     var weather = response['weather'][0]['main'];
    //     // var msg ="Temp in "+city+ " : "+temp;
    //     $('#city').text(city);
    //     $('#outTemp').text(temp);
    //  });

    function generateCities() {
      var cities =
      [
        "Please select city",
        "London",
        "Amsterdam",
        "Ankara",
        "Athens",
        "Paris",
        "Berlin"
      ];

      var options = cities.map(function(city)
      {
        return "<option value='" + city + "'>" + city + "</option>";
      });

      $('#current-city').html(options);
    }

    getWeatherInfo('London', key);
    generateCities();

    function getWeatherInfo(city, appid) {
      // console.log(key);
      if (city === 'Please select city' || city === undefined)
      {
        return;
      }
      appid = '&APPID=' + appid;
      //  var appid = '&APPID=7ccc367902b839bf72c41f4b9ad2bcce';
       var unit = '&units=metric';
       var urlx = 'http://api.openweathermap.org/data/2.5/weather?q=';// + city + appid + unit;
       urlx += city;
       urlx += appid;
       urlx += unit;
        // console.log(url);
      //   $.get(url, function(response) {
      //     // console.log(response);
      //     var city = response.name;
      //     var temp = Math.floor(response['main']['temp']);
      //     // var weather = response['weather'][0]['main'];
      //     $('#city').text(city);
      //     $('#outTemp').text(temp);
      //  });
      console.log(urlx);
      $.ajax({
        url : urlx,
        type : "GET",
        dataType : "jsonp",
        beforeSend : function () {
          var output = "<img src='/assets/imgs/loading.gif' height='50px'>";
          $('#out-display').html(output);
        },
        error: function(){
          $('#err-msg').text('Could not retrieve weather data for city specified');
        },

        success: function(response){
          setTimeout(function () {
            console.log(response);
            var city = response.name;
            var temp = Math.floor(response.main.temp);
            var weather = response.weather[0].main;
            $('#city').text(city);
            $('#outTemp').text(temp);
            var output = "<span id=\"city\">" + city + "</span> :";
            output += " <span id=\"outTemp\">" + temp + "</span> &#8451;";
            $('#out-display').html(output);
          }, 1500);
        }

      });
    }

     $( "#current-city" ).change(function() {
        var city = $('#current-city').val();
        // console.log(city);
        // console.log(key);
        getWeatherInfo(city,key);
      });



    function colorText ()
    {
      usage = myThermostat.getEnergyUsage();
      if (usage === 'low-usage')
      {
        $('#in-display').css('color', '#ADFF2F');
      } else if(usage === 'medium-usage')
      {
        $('#in-display').css('color', 'white');
      } else
      {
    $('#in-display').css('color', '#800000');
      }
    }

    colorText();
    $('#inTemp').text(myThermostat.getTemp());

    $( "#temp-up").click(function() {
      if (myThermostat.isMaxTemp())
      {
        $('#err-msg').html("Cannot exceed max temperature");
      }
      else
      {
        $('#err-msg').html('');
        myThermostat.raiseTemp();
        $('#inTemp').text(myThermostat.getTemp());
      }
      colorText();
    });

    $( "#temp-down" ).click(function () {
      if(myThermostat._isMinTemp() == false)
      {
        $('#err-msg').html('');
        myThermostat.lowerTemp();
        $('#inTemp').text(myThermostat.getTemp());
      }
      else
      {
        $('#err-msg').html("Cannot set temperature below min "+ MIN_TEMP +" &#8451;");
      }
      colorText();
    });

    $("#temp-reset" ).click(function () {
      myThermostat.resetTemp();
      $('#err-msg').html('');
      $('#inTemp').text(myThermostat.getTemp());
      colorText();
    });

    $("#psm-on" ).click(function () {
      $('#err-msg').html('');
      if(myThermostat.getPSM() === 'off')
      {
        myThermostat.turnOnPSM();
        $(this).text(myThermostat.getPSM());
        $('#inTemp').text(myThermostat.getTemp());
        $('#power-saving-status').text(myThermostat.getPSM());
      }
      else
      {
        myThermostat.turnOffPSM();
        $(this).text(myThermostat.getPSM());
        $('#inTemp').text(myThermostat.getTemp());
        $('#power-saving-status').text(myThermostat.getPSM());
      }
      colorText();
    });
});
