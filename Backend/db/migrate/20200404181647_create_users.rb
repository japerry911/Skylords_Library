class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: false, force: :cascade do |t|
      t.string :id, null: false, primary_key: true
      t.string :name
      t.integer :age
    end
  end
end
