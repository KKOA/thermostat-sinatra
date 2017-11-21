class City
  include DataMapper::Resource
  property :id, Serial
  property :name, String
  property :selected, Boolean
end
