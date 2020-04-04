class CreateReaders < ActiveRecord::Migration[6.0]
  def change
    create_table :readers, id: false, force: :cascade do |t|
      t.string :id, null: false, primary_key: true
      t.string :name
      t.integer :age
    end
  end
end
