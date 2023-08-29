class CreateSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :spots do |t|
      t.string :name
      t.string :lat_lng
      t.string :about
      t.string :style

      t.timestamps
    end
  end
end
