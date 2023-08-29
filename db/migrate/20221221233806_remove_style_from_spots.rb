class RemoveStyleFromSpots < ActiveRecord::Migration[6.1]
  def change
    remove_column :spots, :style, :string
  end
end
