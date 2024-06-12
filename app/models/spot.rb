class Spot < ApplicationRecord
    belongs_to :user
    has_many :reviews, dependent: :destroy
    validates :name, presence: true, uniqueness: true
    validates :address, presence: true
    validates :lat, presence: true
    validates :lng, presence: true

    has_many_attached :images

    def lat_lng
        {lat: self.lat, lng: self.lng}
    end

    def ratings_average
        ratings_array = self.reviews.map {|review| review.rating}
        ratings_sum = ratings_array.reduce(0) {|sum, num| sum + num }
        (ratings_sum.to_f/ratings_array.length).round(2)
    end

    def bust_average
        bust_array = self.reviews.map {|review| review.bust_rating}
        bust_sum = bust_array.reduce(0) {|sum, num| sum + num }
        chance_of_bust = (bust_sum.to_f/bust_array.length).round(2)
        case chance_of_bust
            when 0
                "Zero"
            when 0.1..2
                "Low"
            when 2..2.9
                "Medium"
            when 3..4
                "High"
        end
    end

    def image_urls
        if images.attached?
            images.map do |image|
                Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
            end
        end
    end

end
