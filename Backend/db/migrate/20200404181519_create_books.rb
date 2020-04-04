class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books, id: false, force: :cascade do |t|
      t.string :id, null: false, primary_key: true
      t.string :title
      t.references :author, null: false, foreign_key: true, type: :string
    end
  end
end
