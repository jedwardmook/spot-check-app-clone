class Review < ApplicationRecord
    belongs_to :user
    belongs_to :spot
    validates :bust_rating, presence: true
    validates :rating, presence: true
    validates :user_id, :uniqueness => { :scope => :spot_id,
        :message => "has left a review. Please edit your review." }

    def review_author
        self.user.username
    end

    def author_image
        if self.user.photo.attached?
            Rails.application.routes.url_helpers.rails_blob_path(self.user.photo, only_path: true)
        else
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
        end
    end

    def clean_date
        created = self.created_at.strftime("%b %d %Y")
    end

    def spot_name
        self.spot.name
    end

    def bust_possibility
        case bust_rating
        when 0
            "Zero"
        when 1..1.9
            "Low"
        when 2..2.9
            "Medium"
        when 3..4
            "High"
        end
    end

end
