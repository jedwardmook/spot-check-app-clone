class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :bio, :favorites_array, :reviews, :photo_url
end