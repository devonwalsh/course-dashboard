class RemoveCategoryId < ActiveRecord::Migration[6.1]
  def change
    remove_column :courses_users, :category_id, :integer
  end
end
