class AddSpotNameToReviews < ActiveRecord::Migration[6.1]
  def change
    add_column :reviews, :spot_name, :string
  end
end
