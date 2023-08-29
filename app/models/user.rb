class User < ApplicationRecord
    has_secure_password
    has_one_attached :photo 
    validates :username, presence: true, uniqueness: true
    validates :username, length: {minimum: 6, maximum: 10}
    validates :password, presence: true, unless: -> { self.id !=nil }
    validates :password_confirmation, presence: true, unless: -> { self.id != nil }
    has_many :spots
    has_many :reviews
    has_many :favorites

    def photo_url
        if photo.attached?
            Rails.application.routes.url_helpers.rails_blob_path(photo, only_path: true)
        else
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
        end
    end

    def favorites_array
        self.favorites.map {|favorite| favorite.spot_id}
    end

end
