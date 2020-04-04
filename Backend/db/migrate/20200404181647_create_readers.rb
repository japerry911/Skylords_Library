class CreateReaders < ActiveRecord::Migration[6.0]
  def change
    create_table :readers, id: false, force: :cascade do |t|
      t.string :id, null: false
      t.string :name
      t.string :age
    end
  end
end
