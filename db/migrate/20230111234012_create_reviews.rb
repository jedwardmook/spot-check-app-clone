class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :spot_id
      t.integer :rating
      t.integer :bust_rating
      t.string :body
      t.integer :user_id

      t.timestamps
    end
  end
end
