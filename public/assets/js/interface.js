$(document).ready(function() {
    var myThermostat = new Thermostat();

    function clearMsg()
    {
      $('#msg').html('');
    }

    function colorText() {
        usage = myThermostat.getEnergyUsage();
        if (usage === 'low-usage') {
            $('#in-display').css('color', '#ADFF2F');
        } else if (usage === 'medium-usage') {
            $('#in-display').css('color', 'white');
        } else {
            $('#in-display').css('color', '#800000');
        }
    }

    function getWeatherInfo(city, appid) {
        if (city === '' || city === undefined) {
            $('#out-display #city').html("");
            $('#out-display #outTemp').html("");
            return;
        }
        appid = '&APPID=' + appid;
        var unit = '&units=metric';
        var urlx = 'http://api.openweathermap.org/data/2.5/weather?q=';
        urlx += city;
        urlx += appid;
        urlx += unit;

        $.ajax({
            url: urlx,
            type: "GET",
            dataType: "jsonp",
            beforeSend: function() {
                var output = "<img src='/assets/imgs/loading.gif' height='50px'>";
                $('#out-display').html(output);
            },
            error: function() {
                $('#msg').text('Could not retrieve weather data for city specified');
                $('#out-display').html('');
            },

            success: function(response)
            {
                $('#out-display img').remove();
                var city = response.name;
                var temp = Math.floor(response.main.temp);
                var weather = response.weather[0].main;
                cityhtml = "<span id=\"city\">" + city + "</span><br>";
                temphtml = "<span id=\"outTemp\">" + temp + "</span> &#8451;";
                $('#out-display').append(cityhtml);
                $('#out-display').append(temphtml);
            }

        });
    }

    $('#inTemp').text(myThermostat.getTemp());

    $("#temp-up").click(function() {
        if (myThermostat.isMaxTemp()) {
          $('#msg').addClass('err');
          $('#msg').removeClass('confirmation');
            $('#msg').html("Cannot exceed max temperature");
        } else {
            clearMsg();
            myThermostat.raiseTemp();
            $('#inTemp').text(myThermostat.getTemp());
        }
        colorText();
    });

    $("#temp-down").click(function() {
        if (myThermostat._isMinTemp() == false) {
            clearMsg();
            myThermostat.lowerTemp();
            $('#inTemp').text(myThermostat.getTemp());
        } else {
            $('#msg').addClass('err');
            $('#msg').removeClass('confirmation');
            $('#msg').html("Cannot set below " + MIN_TEMP + " &#8451;");
        }
        colorText();
    });

    $("#temp-reset").click(function() {
        myThermostat.resetTemp();
        clearMsg();
        $('#inTemp').text(myThermostat.getTemp());
        colorText();
    });

    $("#psm-on").click(function()
    {
      clearMsg();
        if(myThermostat.getPSM()==='Off')
        {
          $(this).prop('disabled', true);
          $('#psm-off').prop('disabled', false);
          myThermostat.turnOnPSM();
          console.log(myThermostat);
          $('#psm-mode').text(myThermostat.getPSM());
          $('#inTemp').text(myThermostat.getTemp());
          $('#power-saving-status').text(myThermostat.getPSM());
        }
        colorText();
    });



    $("#psm-off").click(function()
    {
      clearMsg();
        console.log(myThermostat.getPSM());
        if(myThermostat.getPSM()==='On')
        {
          $(this).prop('disabled', true);
          $('#psm-on').prop('disabled', false);
          myThermostat.turnOffPSM();
          console.log(myThermostat);
          $('#psm-mode').text(myThermostat.getPSM());
          $('#inTemp').text(myThermostat.getTemp());
          $('#power-saving-status').text(myThermostat.getPSM());
        }
        colorText();
    });



    $("#current-city").change(function() {
        var city = $('#current-city').val();
        getWeatherInfo(city, key);
    });

    function updateSelectCity()
    {
      $.ajax({
          url: "/cities",
          type: "get",
          beforeSend: function() {},
          data: {},
          error: function() {},
          success: function(cities)
          {
              var output = '';
              for (var key in cities)
              {
                if (cities.hasOwnProperty(key))
                {
                    output += `<option value=\"${cities[key]['name']}\"`;
                    if(cities[key]['selected'] === true)
                    {
                      output += ' selected';
                    }
                    output += `>${cities[key]['name']}</option>`;
                }
              }
              $("#current-city").html(output);
          }
      });
    }

    $("#save").click(function() {
        if ($('#inTemp').text() === '' || $('#city').text() === '') {
            $('#msg').text('City must not be empty');
        } else {
            $('#msg').text('');
            $.ajax({
                url: "/save",
                type: "post",
                beforeSend: function() {},
                data: {
                    temperature: $('#inTemp').text(),
                    city: $('#city').text()
                },
                error: function() {
                  $('#msg').addClass('err');
                  $('#msg').removeClass('confirmation');
                    $('#msg').text('Could not save data');
                    $('.select-city').html('');
                },
                success: function(cities) {
                  $('#msg').addClass('confirmation');
                  $('#msg').removeClass('err');
                  $('#msg').text('Data Saved');
                    updateSelectCity();
                }
            });
        }
    });

    $('#psm-on').prop('disabled', true);
    $('#psm-off').prop('disabled', false);

    $.ajax({
        url: "/get_data",
        type: "get",
        beforeSend: function() {},
        data: {
            temperature: $('#inTemp').text(),
            city: $('#city').text()
        },
        error: function() {
            $('#msg').addClass('err');
            $('#msg').removeClass('confirmation');
            $('#msg').text('Could not retrieve data');
            $('.select-city').html('');
        },
        success: function(response) {
            var temperature = response.temperature;
            var city = response.city;
            if (temperature === '' || city === '') {
                return;
            }
            // Check temperature does not exceed max temperature
            if (myThermostat.isMaxTemp)
            {
              temperature = MAX_TEMP_PSM_ON;
            }
            myThermostat.setTemp(temperature);
            $('#inTemp').text(myThermostat.getTemp());
            getWeatherInfo(response.city, key);
            colorText();
        },
        timeout: 1500
    });
});
