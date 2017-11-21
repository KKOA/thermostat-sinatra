/*jshint esversion: 6 */


const DEFAULT_TEMP = 20;
const MIN_TEMP = 10;
const MAX_TEMP = 32;
const MAX_TEMP_PSM_ON = 25;

function Thermostat() {
  this.temp = DEFAULT_TEMP;
  this.psm = 'on';
}

Thermostat.prototype.setTemp = function(temperature) {
  this.temp = temperature
};

Thermostat.prototype.getTemp = function() {
  return this.temp;
};

Thermostat.prototype.raiseTemp = function() {
  if (this.isMaxTemp()) {
    return;
    }
    this.temp += 1;
};

Thermostat.prototype._isMinTemp = function() {
  return this.temp === MIN_TEMP;
};

Thermostat.prototype.isMaxTemp = function() {
  if (this._isPSMOn() === false) {
    return this.getTemp() === MAX_TEMP;
  }
  return this.getTemp() === MAX_TEMP_PSM_ON;
}


Thermostat.prototype.lowerTemp = function() {
  if(this._isMinTemp()=== false)
  {
    this.temp -= 1;
  }
};

Thermostat.prototype.resetTemp = function(number) {
  this.temp = DEFAULT_TEMP;
};

Thermostat.prototype.getPSM = function() {
  return this.psm;
};


Thermostat.prototype.turnOffPSM = function() {
  if(this._isPSMOn() === true)
  {
    this.psm = 'off';
  }
};

Thermostat.prototype._isPSMOn = function() {
  return this.psm ==='on';
};

Thermostat.prototype.turnOnPSM = function() {
  if(this._isPSMOn() === false )
  {
    this.psm = 'on';
    if(this.temp > MAX_TEMP_PSM_ON)
    {
      this.temp = MAX_TEMP_PSM_ON
    }
  }
};

Thermostat.prototype.getEnergyUsage = function() {
  temp = this.temp;
  if(temp < 18)
  {
    return 'low-usage';
  }
  else if (temp < 25)
  {
    return 'medium-usage';
  }
  return 'high-usage';
};
