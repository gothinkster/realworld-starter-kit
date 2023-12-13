class RenameNameToUsername < ActiveRecord::Migration[6.0]
  def change
    rename_column :users, :name, :username
  end
end
