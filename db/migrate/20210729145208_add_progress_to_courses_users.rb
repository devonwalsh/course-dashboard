class AddProgressToCoursesUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :courses_users, :progress, :integer
  end
end
