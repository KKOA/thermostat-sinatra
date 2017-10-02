require 'data_mapper'
require 'dm-postgres-adapter'

require_relative 'models/thermostat'
require_relative 'models/city'

# Specify Database connection
local_source = "postgres://localhost/my_thermostat_#{ENV['RACK_ENV']}"
DataMapper.setup(:default, ENV['DATABASE_URL'] || local_source)

DataMapper.finalize
# checks the models for validity and initializes all properties associated with relationships
DataMapper.auto_upgrade!
# build any new columns or tables we added
