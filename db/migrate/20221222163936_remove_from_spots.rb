class RemoveFromSpots < ActiveRecord::Migration[6.1]
  def change
    remove_column :spots, :rating, :integer
  end
end
