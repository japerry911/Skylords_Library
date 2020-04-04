class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books, id: false, force: :cascade do |t|
      t.string :id, null: false
      t.string :title
      t.references :author, null: false, foreign_key: true
    end
  end
end
