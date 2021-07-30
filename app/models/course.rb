class Course < ApplicationRecord
    has_many :lessons
    has_many :registrations
    has_many :users, through: :registrations
    belongs_to :category
end
