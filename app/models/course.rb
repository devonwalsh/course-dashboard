class Course < ApplicationRecord
    has_many :lessons
    has_and_belongs_to_many :users
    belongs_to :category
end
