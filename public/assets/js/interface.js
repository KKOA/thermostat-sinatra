$(document).ready(function () {
    var myThermostat = new Thermostat();

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

    function getWeatherInfo(city, appid)
    {
      console.log(city,appid);
      if (city === 'Please select city' || city === undefined)
      {
        return;
      }
      appid = '&APPID=' + appid;
       var unit = '&units=metric';
       var urlx = 'http://api.openweathermap.org/data/2.5/weather?q=';
       urlx += city;
       urlx += appid;
       urlx += unit;

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
          $('#out-display').html('');
        },

        success: function(response){
          // setTimeout(function () {
            console.log(response);
            var city = response.name;
            var temp = Math.floor(response.main.temp);
            var weather = response.weather[0].main;
            $('#city').text(city);
            $('#outTemp').text(temp);
            var output = "<span id=\"city\">" + city + "</span> :";
            output += " <span id=\"outTemp\">" + temp + "</span> &#8451;";
            $('#out-display').html(output);
          // }, 1500);
        }

      });
    }


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

      $( "#current-city" ).change(function() {
        var city = $('#current-city').val();
        getWeatherInfo(city,key);
      });

      $( "#save" ).click(function() {
        console.log($('#inTemp').text());
        console.log($('#city').text());
        $.ajax({
          url : "/save",
          type : "post",
          beforeSend : function () {
          },
          data:{ temperature: $('#inTemp').text(),city: $('#city').text()
          },
          error: function () {
            $('#err-msg').text('Could not save data');
            $('.select-city').html('');
          },
          success: function (cities) {
            $('#err-msg').text('Data Saved');
          }
        });
      });

      $.ajax({
        url : "/get_data",
        type : "get",
        beforeSend : function () {
        },
        data:{ temperature: $('#inTemp').text(),city: $('#city').text()
        },
        error: function () {
          $('#err-msg').text('Could not retrieve data');
          $('.select-city').html('');
        },
        success: function (response) {
          console.log(response);
          console.log(myThermostat.getTemp());
          myThermostat.setTemp(response.temperature);
          console.log(myThermostat.getTemp());
          $('#inTemp').text(myThermostat.getTemp());
        }
      });
});
