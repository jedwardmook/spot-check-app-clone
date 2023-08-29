class ChangeDatatypesForLatLngInSpots < ActiveRecord::Migration[6.1]
  def change
    change_column :spots, :lat, :float
    change_column :spots, :lng, :float
  end
end
