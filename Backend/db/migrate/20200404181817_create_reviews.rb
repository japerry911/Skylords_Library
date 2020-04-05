class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews, id: false, force: :cascade do |t|
      t.string :id, null:false, primary_key: true
      t.integer :rating
      t.text :description
      t.references :user, null: false, foreign_key: true, type: :string 
      t.references :book, null: false, foreign_key: true, type: :string
      t.timestamps
    end
  end
end
