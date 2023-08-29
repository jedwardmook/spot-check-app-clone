class AddAttributesToSpot < ActiveRecord::Migration[6.1]
  def change
    add_column :spots, :attributes, :string, array: true
  end
end
