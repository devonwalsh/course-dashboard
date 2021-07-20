class CreateLessons < ActiveRecord::Migration[6.1]
  def change
    create_table :lessons do |t|
      t.integer :course_id
      t.string :title
      t.boolean :completed

      t.timestamps
    end
  end
end
