class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.string :title
      t.string :source
      t.integer :category_id
      t.integer :progress
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
