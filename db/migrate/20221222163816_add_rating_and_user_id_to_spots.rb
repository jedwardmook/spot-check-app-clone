class AddRatingAndUserIdToSpots < ActiveRecord::Migration[6.1]
  def change
    add_column :spots, :rating, :integer
    add_column :spots, :user_id, :integer
  end
end
