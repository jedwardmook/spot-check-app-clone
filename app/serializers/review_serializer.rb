class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :spot_id, :rating, :body, :user_id, :review_author, :clean_date, :author_image, :spot_name, :bust_possibility
end
