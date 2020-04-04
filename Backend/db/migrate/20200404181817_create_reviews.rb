class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews, id: false, force: :cascade do |t|
      t.string :id, null:false 
      t.integer :rating
      t.references :reader, null: false, foreign_key: true
      t.references :book, null: false, foreign_key: true
    end
  end
end
