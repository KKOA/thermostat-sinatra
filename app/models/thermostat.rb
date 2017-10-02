class Thermostat

  include DataMapper::Resource

  property :id, Serial
  property :temperature, Float
  property :city, String

end
