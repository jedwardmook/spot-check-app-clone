class AddLatAndLngToSpots < ActiveRecord::Migration[6.1]
  def change
    add_column :spots, :lat, :integer
    add_column :spots, :lng, :integer
  end
end
