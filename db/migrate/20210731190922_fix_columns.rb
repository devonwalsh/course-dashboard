class FixColumns < ActiveRecord::Migration[6.1]
  def change
    add_column :courses, :description, :string
    remove_column :registrations, :description, :string
  end
end
