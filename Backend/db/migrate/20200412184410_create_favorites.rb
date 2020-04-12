class CreateFavorites < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites, id: false, force: :cascade do |t|
      t.string :id, null: false, primary_key: true 
      t.references :user, null: false, foreign_key: true, type: :string
      t.references :book, null: false, foreign_key: true, type: :string
    end
  end
end
