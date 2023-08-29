class SpotSerializer < ActiveModel::Serializer
  has_many :reviews
  attributes :id, :name, :lat, :lng, :about, :address, :lat_lng, :flat_bar, :handrail, :manual_pad, :gap, :ledge, :transition, :bank, :stairs, :ratings_average, :bust_average, :user_id, :image_urls
end
