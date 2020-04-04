class CreateAuthors < ActiveRecord::Migration[6.0]
  def change
    create_table :authors, id: false, force: :cascade do |t|
      t.string :id, null:false, primary_key: true
      t.string :name
    end
  end
end
