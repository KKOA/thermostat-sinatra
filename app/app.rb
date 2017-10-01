ENV['RACK_ENV'] ||= 'development'

require 'sinatra/base'
# require_relative 'data_mapper_setup'

class App < Sinatra::Base
  get '/' do
    @title = 'Thermostat'
    erb(:index)
  end

  run! if app_file == $PROGRAM_NAME
end
