class RemoveAttributesToSpot < ActiveRecord::Migration[6.1]
  def change
    remove_column :spots, :attributes, :string, array: true
  end
end
