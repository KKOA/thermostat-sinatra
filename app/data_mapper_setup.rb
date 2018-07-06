require 'data_mapper'
require 'dm-postgres-adapter'

require_relative 'models/thermostat'
require_relative 'models/city'
require_relative 'dbconfig.rb'
# Specify Database connection
local_source = "postgres://#{USER}:#{PASS}@#{HOST}/#{DB}"
DataMapper.setup(:default, local_source)
# DataMapper.setup(:default, ENV['DATABASE_URL'] || local_source)

DataMapper.finalize
# checks the models for validity and initializes
# all properties associated with relationships
DataMapper.auto_upgrade!
# DataMapper.auto_migrate!
# build any new columns or tables we added

require_relative 'seeds.rb' # prepoulate database
