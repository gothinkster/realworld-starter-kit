class ChangeArticles < ActiveRecord::Migration[7.1]
  def change
    change_column_null :articles, :title, false
    change_column_null :articles, :body, false
  end
end
