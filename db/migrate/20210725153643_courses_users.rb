class CoursesUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :courses_users, :id => false do |t|
      t.integer :user_id
      t.integer :course_id
    end
  end
end
