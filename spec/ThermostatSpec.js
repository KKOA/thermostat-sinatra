describe("Thermostat", function () {

  var myThermostat;

  beforeEach(function () {
    myThermostat = new Thermostat();
  });

  describe("getTemp", function () {
    it("returns default temperature of " + DEFAULT_TEMP, function () {
      expect(myThermostat.getTemp()).toEqual(DEFAULT_TEMP);
    });
  });
  describe("raiseTemp", function () {
    it("increase temperature by 1", function () {
      myThermostat.raiseTemp();
      expect(myThermostat.getTemp()).toEqual(DEFAULT_TEMP + 1);
    });
    describe("PSM off", function ()
    {
      it("Return MAX TEMP ( "+ MAX_TEMP +" )", function () {
        myThermostat.turnOffPSM();
        for (var i = 1 ; i < 16 ; i++ )
        {
            myThermostat.raiseTemp();
        }
        expect(myThermostat.getTemp()).toEqual(MAX_TEMP);
      });
    });

    describe("PSM on", function ()
    {
      it("Return MAX TEMP PSM ON ( "+ MAX_TEMP_PSM_ON +" )", function () {
        for (var i = 1 ; i < 16 ; i++ )
        {
            myThermostat.raiseTemp();
        }
        expect(myThermostat.getTemp()).toEqual(MAX_TEMP_PSM_ON);
      });
    });
  });

  describe("lowerTemp", function () {
    it("reduce temperature by 1", function () {
      myThermostat.lowerTemp();
      expect(myThermostat.getTemp()).toEqual(DEFAULT_TEMP - 1);
    });

    it("prevent reduce temperature ( "+MIN_TEMP+" )", function () {
      for (var i = 1 ; i < 20 ; i++ )
      {
          myThermostat.lowerTemp();
      }
      expect(myThermostat.getTemp()).toEqual(MIN_TEMP);
    });
  });

  describe("getPSM", function () {
    it("return true by default", function () {
      expect(myThermostat.getPSM()).toEqual('on');
    });
  });

  describe("turnOffPSM", function () {
    it("return off", function () {
      myThermostat.turnOffPSM();
      expect(myThermostat.getPSM()).toEqual('off');
    });
  });
  describe("turnOnPSM", function () {
    it("return on, on intialize", function () {
      expect(myThermostat.getPSM()).toEqual('on');
    });
    describe("turn off and on PSM", function () {
      it("return on", function () {
        myThermostat.turnOffPSM();
        myThermostat.turnOnPSM();
        expect(myThermostat.getPSM()).toEqual('on');
      });
    });
    describe("turn off, raise by 7 and on PSM", function () {
      it ("return MAX TEMP PSM ON ( "+ MAX_TEMP_PSM_ON +" )" , function () {
        myThermostat.turnOffPSM();
        for (var i = 1 ; i < 8 ; i++ )
        {
            myThermostat.raiseTemp();
        }
        myThermostat.turnOnPSM();
        expect(myThermostat.getTemp()).toEqual(MAX_TEMP_PSM_ON);
      });
    });
  });

  describe("resetTemp", function () {
    it("set tempeature back to default ( " + DEFAULT_TEMP + " )", function () {
      myThermostat.resetTemp();
      expect(myThermostat.getTemp()).toEqual(DEFAULT_TEMP);
    });
  });

  describe("getEnergyUsage", function () {
    it("return low-usage", function () {
      for (var i = 1 ; i < 5 ; i++ )
      {
          myThermostat.lowerTemp();
      }
      expect(myThermostat.getEnergyUsage()).toEqual('low-usage')
    });

    it("return medium-usage", function ()
    {
      for (var i = 1 ; i < 4 ; i++ )
      {
          myThermostat.raiseTemp();
      }
      expect(myThermostat.getEnergyUsage()).toEqual('medium-usage')
    });


    it("return high-usage", function () {
      for (var i = 1 ; i < 8 ; i++ )
      {
          myThermostat.raiseTemp();
      }
      expect(myThermostat.getEnergyUsage()).toEqual('high-usage')
    });
  });


});
