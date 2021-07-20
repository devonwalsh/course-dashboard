class UsersCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :users_courses, :id => false do |t|
      t.integer :user_id
      t.integer :course_id
      t.integer :category_id
    end
  end
end
