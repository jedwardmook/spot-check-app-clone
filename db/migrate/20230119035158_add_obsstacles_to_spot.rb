class AddObsstaclesToSpot < ActiveRecord::Migration[6.1]
  def change
    add_column :spots, :flat_bar, :boolean
    add_column :spots, :handrail, :boolean
    add_column :spots, :manual_pad, :boolean
    add_column :spots, :gap, :boolean
    add_column :spots, :ledge, :boolean
    add_column :spots, :transition, :boolean
    add_column :spots, :bank, :boolean
    add_column :spots, :stairs, :boolean
  end
end
