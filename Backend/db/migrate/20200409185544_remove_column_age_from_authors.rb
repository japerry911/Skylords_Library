class RemoveColumnAgeFromAuthors < ActiveRecord::Migration[6.0]
  def change
    remove_column :authors, :age
  end
end
