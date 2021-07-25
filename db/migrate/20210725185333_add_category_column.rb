class AddCategoryColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :courses_users, :category_id, :integer
  end
end
