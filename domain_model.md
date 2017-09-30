# User Stories to Domain Model

## Scenario

### 1.
Thermostat starts at 20 degrees

### 2.
You can increase the temperature with an up function
### 3.
You can decrease the temperature with a down function
### 4.
The minimum temperature is 10 degrees
### 5.
If power saving mode is on, the maximum temperature is 25 degrees
### 6.
If power saving mode is off, the maximum temperature is 32 degrees
### 7.
Power saving mode is on by default
### 8.
You can reset the temperature to 20 with a reset function
### 9.
You can ask about the thermostat's current energy usage: < 18 is low-usage, < 25 is medium-usage, anything else is high-usage.
(In the challenges where we add an interface, low-usage will be indicated with green, medium-usage indicated with black, high-usage indicated with red.)

## Nouns in User Stories
- Thermostat

## Verbs in User Stories
- temp
- up
- down
- power saver status
- power saver on
- power saver off
- reset temp
- energy useage


##  Functional representation of that story

| Objects         | Messages                                                                                  |
|-----------------|-------------------------------------------------------------------------------------------|
| Thermostat      |temp<br>up<br>down<br>power_saver_status<br>power_saver_on<br>power_saver_off<br>reset_temp<br>energy_useage |


## How our Objects will use Messages to communicate with one another
Thermostat <-- temperature --> temperature

Thermostat <-- up

Thermostat <-- down

Thermostat <-- power_saver_status --> power_status

Thermostat <-- power_saver_on

Thermostat <-- power_saver_off

Thermostat <-- reset_temp

Thermostat <-- energy_useage --> usage
