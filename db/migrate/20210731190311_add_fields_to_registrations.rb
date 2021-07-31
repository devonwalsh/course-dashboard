class AddFieldsToRegistrations < ActiveRecord::Migration[6.1]
  def change
    add_column :registrations, :start_date, :date
    add_column :registrations, :end_date, :date
    add_column :registrations, :description, :string
    add_column :registrations, :notes, :string
  end
end
