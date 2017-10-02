# ENV['RACK_ENV'] ||= 'development'
ENV['RACK_ENV'] = 'test'
require 'sinatra/base'
require_relative 'data_mapper_setup'
require 'json'

class Server < Sinatra::Base
  get '/' do
    @title = 'Thermostat'
    erb(:index)
  end

  get '/cities' do
    content_type :json
    @cities = City.all.to_json
    # content_type :json
    # @cities.map do |city|
    #     city.name
    # end.to_json
  end

  # post '/save' do
  #   thermostat = Thermostat.get(1)
  #
  #   thermostat.temperature = params[:temperature]
  #   thermostat.city = params[:city] || thermostat.city
  #   thermostat.save
  # end

  post '/save' do


    if(Thermostat.get(1).nil?)
      Thermostat.create(:temperature => params[:temperature], :city => params[:city])
    else
      @thermostat = Thermostat.get(1)
      @thermostat.temperature = params[:temperature]
      @thermostat.city = params[:city]
      @thermostat.save
    end

  end

  get '/x' do
    puts Thermostat.get(1).nil?
    # @thermostat.count.zero?
    # [].zer
  end

  get '/get_data' do

    @thermostat = Thermostat.get(1)

    content_type :json
    if(Thermostat.get(1).nil?)
      return {:temperature => '' , :city => ''}.to_json
    else
      @thermostat = Thermostat.get(1)
      {:temperature => @thermostat.temperature , :city => @thermostat.city}.to_json
    end
  end

  run! if app_file == $PROGRAM_NAME
end
