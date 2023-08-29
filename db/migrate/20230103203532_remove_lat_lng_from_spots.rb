class RemoveLatLngFromSpots < ActiveRecord::Migration[6.1]
  def change
    remove_column :spots, :lat_lng, :string
  end
end
